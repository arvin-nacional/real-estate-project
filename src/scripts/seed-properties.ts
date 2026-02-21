import { propertiesSeed } from '../endpoints/seed/properties'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

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

async function seedProperties() {
  const token = await login()

  console.log('🏠 Starting property seed...')
  console.log(`Found ${propertiesSeed.length} properties to seed`)

  let successCount = 0
  let errorCount = 0

  for (const propertyData of propertiesSeed) {
    try {
      console.log(`\nProcessing: ${propertyData.title}`)

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
          body: JSON.stringify(propertyData),
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
          body: JSON.stringify(propertyData),
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
