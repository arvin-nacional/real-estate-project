import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import { Bath, BedDouble, Maximize, MapPin, Car, Calendar } from 'lucide-react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import type { Property, Media as MediaType } from '@/payload-types'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'properties',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
  })

  const property = result.docs[0] as Property | undefined

  if (!property) {
    notFound()
  }

  const {
    title,
    propertyType,
    listingType,
    price,
    bedrooms,
    bathrooms,
    garages,
    area,
    address,
    city,
    state,
    zipCode,
    description,
    features,
    featuredImage,
    gallery,
    publishedAt,
  } = property

  const location = [address, city, state, zipCode].filter(Boolean).join(', ')
  const formattedPrice = price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(price)
    : null

  const featureLabels: Record<string, string> = {
    pool: 'Swimming Pool',
    garden: 'Garden',
    garage: 'Garage',
    ac: 'Air Conditioning',
    heating: 'Heating',
    fireplace: 'Fireplace',
    balcony: 'Balcony',
    gym: 'Gym',
    security: 'Security',
    parking: 'Parking',
    laundry: 'Laundry',
    'pet-friendly': 'Pet Friendly',
  }

  return (
    <div className="pt-24 pb-24">
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                listingType === 'rent' ? 'bg-blue-600' : 'bg-green-600'
              }`}
            >
              {listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            {propertyType && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{title}</h1>

          {location && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          {featuredImage && typeof featuredImage !== 'string' && (
            <div className="rounded-lg overflow-hidden aspect-video mb-4">
              <Media resource={featuredImage} size="100vw" className="w-full h-full object-cover" />
            </div>
          )}
          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((item, index) => {
                const image = item.image as MediaType | undefined
                if (!image) return null
                return (
                  <div key={index} className="rounded-lg overflow-hidden aspect-4/3">
                    <Media resource={image} size="25vw" className="w-full h-full object-cover" />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {bedrooms != null && (
                <div className="flex flex-col items-center p-4 bg-card border border-border rounded-lg">
                  <BedDouble className="size-6 text-muted-foreground mb-2" />
                  <span className="text-lg font-semibold">{bedrooms}</span>
                  <span className="text-sm text-muted-foreground">
                    {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </span>
                </div>
              )}
              {bathrooms != null && (
                <div className="flex flex-col items-center p-4 bg-card border border-border rounded-lg">
                  <Bath className="size-6 text-muted-foreground mb-2" />
                  <span className="text-lg font-semibold">{bathrooms}</span>
                  <span className="text-sm text-muted-foreground">
                    {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </span>
                </div>
              )}
              {area != null && (
                <div className="flex flex-col items-center p-4 bg-card border border-border rounded-lg">
                  <Maximize className="size-6 text-muted-foreground mb-2" />
                  <span className="text-lg font-semibold">{area.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">Sq Ft</span>
                </div>
              )}
              {garages != null && (
                <div className="flex flex-col items-center p-4 bg-card border border-border rounded-lg">
                  <Car className="size-6 text-muted-foreground mb-2" />
                  <span className="text-lg font-semibold">{garages}</span>
                  <span className="text-sm text-muted-foreground">
                    {garages === 1 ? 'Garage' : 'Garages'}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <RichText data={description} />
                </div>
              </div>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm"
                    >
                      <span className="size-2 rounded-full bg-green-500 shrink-0" />
                      {featureLabels[feature] ?? feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card border border-border rounded-lg p-6">
              {formattedPrice && (
                <p className="text-2xl font-bold mb-1">
                  {formattedPrice}
                  {listingType === 'rent' && (
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  )}
                </p>
              )}

              {publishedAt && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
                  <Calendar className="size-3.5" />
                  <span>
                    Listed{' '}
                    {new Date(publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property Type</span>
                  <span className="font-medium capitalize">{propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listing Type</span>
                  <span className="font-medium">
                    {listingType === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
                {bedrooms != null && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bedrooms</span>
                    <span className="font-medium">{bedrooms}</span>
                  </div>
                )}
                {bathrooms != null && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bathrooms</span>
                    <span className="font-medium">{bathrooms}</span>
                  </div>
                )}
                {area != null && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-medium">{area.toLocaleString()} sq ft</span>
                  </div>
                )}
                {city && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">City</span>
                    <span className="font-medium">{city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'properties',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
    select: { title: true, city: true, state: true },
  })

  const property = result.docs[0]

  if (!property) {
    return { title: 'Property Not Found' }
  }

  const location = [property.city, property.state].filter(Boolean).join(', ')

  return {
    title: `${property.title}${location ? ` | ${location}` : ''} | Real Estate`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const properties = await payload.find({
    collection: 'properties',
    limit: 1000,
    depth: 0,
    select: { slug: true },
    where: { _status: { equals: 'published' } },
  })

  return properties.docs.map(({ slug }) => ({ slug: slug ?? '' }))
}
