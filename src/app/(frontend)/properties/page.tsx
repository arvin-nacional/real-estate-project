import type { Metadata } from 'next/types'
import type { Where } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PropertyFilters } from './PropertyFilters'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export default async function PropertiesPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: SearchParams
}) {
  const searchParams = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const propertyType =
    typeof searchParams.propertyType === 'string' ? searchParams.propertyType : undefined
  const listingType =
    typeof searchParams.listingType === 'string' ? searchParams.listingType : undefined
  const minPrice =
    typeof searchParams.minPrice === 'string' ? Number(searchParams.minPrice) : undefined
  const maxPrice =
    typeof searchParams.maxPrice === 'string' ? Number(searchParams.maxPrice) : undefined
  const bedrooms =
    typeof searchParams.bedrooms === 'string' ? Number(searchParams.bedrooms) : undefined
  const bathrooms =
    typeof searchParams.bathrooms === 'string' ? Number(searchParams.bathrooms) : undefined
  const city = typeof searchParams.city === 'string' ? searchParams.city : undefined
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  const where: Where[] = [{ _status: { equals: 'published' } }]

  if (propertyType) {
    where.push({ propertyType: { equals: propertyType } })
  }
  if (listingType) {
    where.push({ listingType: { equals: listingType } })
  }
  if (minPrice && !isNaN(minPrice)) {
    where.push({ price: { greater_than_equal: minPrice } })
  }
  if (maxPrice && !isNaN(maxPrice)) {
    where.push({ price: { less_than_equal: maxPrice } })
  }
  if (bedrooms && !isNaN(bedrooms)) {
    where.push({ bedrooms: { greater_than_equal: bedrooms } })
  }
  if (bathrooms && !isNaN(bathrooms)) {
    where.push({ bathrooms: { greater_than_equal: bathrooms } })
  }
  if (city) {
    where.push({ city: { contains: city } })
  }

  const properties = await payload.find({
    collection: 'properties',
    depth: 1,
    limit: 12,
    page,
    sort: '-createdAt',
    where: {
      and: where,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-8">
        <h1 className="text-3xl font-bold mb-2">Properties</h1>
        <p className="text-muted-foreground">
          Browse our curated collection of properties.
          {properties.totalDocs > 0 && (
            <span>
              {' '}
              Showing {properties.totalDocs}{' '}
              {properties.totalDocs === 1 ? 'property' : 'properties'}.
            </span>
          )}
        </p>
      </div>

      <PropertyFilters
        properties={properties.docs}
        totalPages={properties.totalPages}
        currentPage={properties.page ?? 1}
        initialFilters={{
          propertyType,
          listingType,
          minPrice: minPrice?.toString(),
          maxPrice: maxPrice?.toString(),
          bedrooms: bedrooms?.toString(),
          bathrooms: bathrooms?.toString(),
          city,
        }}
      />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Properties | Real Estate',
    description: 'Browse our curated collection of real estate properties for sale and rent.',
  }
}
