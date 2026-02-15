import { config } from 'dotenv'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { propertiesSeed } from '../endpoints/seed/properties'

// Load environment variables
config()

// Debug: Check if environment variables are loaded
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Set' : 'Not set')

async function seedProperties() {
  const payload = await getPayload({ config: payloadConfig })

  console.log('🏠 Starting property seed...')
  console.log(`Found ${propertiesSeed.length} properties to import`)

  let successCount = 0
  let errorCount = 0

  for (const propertyData of propertiesSeed) {
    try {
      console.log(`\nProcessing: ${propertyData.title}`)

      // Check if property already exists
      const existing = await payload.find({
        collection: 'properties',
        where: {
          slug: {
            equals: propertyData.slug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ⚠️  Property already exists, updating...`)

        await payload.update({
          collection: 'properties',
          id: existing.docs[0].id,
          data: propertyData as any,
        })

        console.log(`  ✅ Updated: ${propertyData.title}`)
      } else {
        await payload.create({
          collection: 'properties',
          data: propertyData as any,
        })

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

  process.exit(0)
}

seedProperties().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
