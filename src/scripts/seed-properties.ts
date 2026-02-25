import { propertiesSeed } from '../endpoints/seed/properties'
import { Blob } from 'buffer'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/**
 * Generate a consistent numeric seed from a string (for Picsum)
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

async function login(): Promise<string> {
  const email = process.argv[2] || 'demo-author@example.com'
  const password = process.argv[3] || 'password'

  console.log(`Logging in as ${email}...`)

  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error(`Login failed (${res.status}): ${await res.text()}`)
  }

  const data = await res.json()
  return data.token
}

/**
 * Fetches an image from Lorem Picsum and uploads it to Payload Media (S3)
 * Uses slug-based seed for consistent images per property
 */
async function uploadImageFromPicsum(
  token: string,
  propertySlug: string,
  altText: string,
  width = 1200,
  height = 800,
): Promise<string | null> {
  try {
    // Use Lorem Picsum with slug-based seed for consistent images
    const seed = hashString(propertySlug)
    const imageUrl = `https://picsum.photos/seed/${seed}/${width}/${height}`
    console.log(`    📷 Fetching image from Picsum (seed: ${seed})...`)

    const imageRes = await fetch(imageUrl)
    if (!imageRes.ok) {
      console.error(`    ❌ Failed to fetch image: ${imageRes.status}`)
      return null
    }

    const imageBuffer = await imageRes.arrayBuffer()
    const blob = new Blob([imageBuffer], { type: 'image/jpeg' })

    // Create FormData for multipart upload
    const formData = new FormData()
    formData.append('file', blob as unknown as globalThis.Blob, `property-${propertySlug}.jpg`)
    formData.append('alt', altText)

    // Upload to Payload Media collection
    const uploadRes = await fetch(`${BASE_URL}/api/media`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: formData,
    })

    if (!uploadRes.ok) {
      const errText = await uploadRes.text()
      console.error(`    ❌ Failed to upload image: ${uploadRes.status} - ${errText}`)
      return null
    }

    const mediaDoc = await uploadRes.json()
    console.log(`    ✅ Uploaded image: ${mediaDoc.doc.id}`)
    return mediaDoc.doc.id
  } catch (error) {
    console.error(`    ❌ Image upload error:`, error instanceof Error ? error.message : error)
    return null
  }
}

/**
 * Check if a media item already exists with a given filename pattern
 */
async function findExistingMedia(token: string, slug: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/media?where[filename][contains]=property-${slug}&limit=1`,
      { headers: { Authorization: `JWT ${token}` } },
    )
    const data = await res.json()
    if (data.docs?.length > 0) {
      return data.docs[0].id
    }
  } catch {
    // Ignore errors, will upload fresh
  }
  return null
}

async function seedProperties() {
  const token = await login()
  const skipImages = process.argv.includes('--skip-images')

  console.log('🏠 Starting property seed...')
  console.log(`Found ${propertiesSeed.length} properties to seed`)
  if (skipImages) {
    console.log('⏭️  Skipping image uploads (--skip-images flag)')
  }

  let successCount = 0
  let errorCount = 0

  for (const propertyData of propertiesSeed) {
    try {
      console.log(`\nProcessing: ${propertyData.title}`)

      // Prepare property data with potential image
      const dataToSave = { ...propertyData }

      // Upload featured image (unless skipped or already has one)
      if (!skipImages && !propertyData.featuredImage && propertyData.slug) {
        // Check if media already exists (for re-runs)
        let mediaId = await findExistingMedia(token, propertyData.slug)

        if (!mediaId) {
          mediaId = await uploadImageFromPicsum(
            token,
            propertyData.slug,
            `${propertyData.title} - Featured Image`,
          )
        } else {
          console.log(`    📷 Using existing image: ${mediaId}`)
        }

        if (mediaId) {
          dataToSave.featuredImage = mediaId
        }
      }

      // Check if property already exists
      const checkRes = await fetch(
        `${BASE_URL}/api/properties?where[slug][equals]=${propertyData.slug}&limit=1`,
        { headers: { Authorization: `JWT ${token}` } },
      )
      const existing = await checkRes.json()

      if (existing.docs?.length > 0) {
        console.log(`  ⚠️  Already exists, updating...`)
        const updateRes = await fetch(`${BASE_URL}/api/properties/${existing.docs[0].id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify(dataToSave),
        })
        if (!updateRes.ok) throw new Error(`Update failed: ${updateRes.status}`)
        console.log(`  ✅ Updated: ${propertyData.title}`)
      } else {
        const createRes = await fetch(`${BASE_URL}/api/properties`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify(dataToSave),
        })
        if (!createRes.ok) {
          const errBody = await createRes.text()
          throw new Error(`Create failed (${createRes.status}): ${errBody}`)
        }
        console.log(`  ✅ Created: ${propertyData.title}`)
      }

      successCount++
    } catch (error) {
      console.error(
        `  ❌ Failed: ${propertyData.title}`,
        error instanceof Error ? error.message : error,
      )
      errorCount++
    }
  }

  console.log(`\n========================================`)
  console.log(`Seed complete: ${successCount} succeeded, ${errorCount} failed`)
  console.log(`========================================`)
}

seedProperties().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
