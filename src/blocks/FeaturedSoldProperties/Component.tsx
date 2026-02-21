'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

interface Property {
  id: string
  slug: string
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  city: string
  state: string
  propertyType: string
  listingType: string
  featuredImage?: any
  soldAt?: string
}

interface FeaturedSoldPropertiesProps {
  heading?: string
  subheading?: string
  maxListings?: number
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Property Image — 16:9 */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 bg-gray-200">
          {property.featuredImage ? (
            <Media
              resource={property.featuredImage}
              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <span className="text-gray-500">No Image</span>
            </div>
          )}

          {/* Sold Badge */}
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            SOLD
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">{property.title}</h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">{formatPrice(property.price)}</span>
          <span className="text-sm text-gray-500">
            {formatDate(property.soldAt || new Date().toISOString())}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.area.toLocaleString()} sqft</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 capitalize">{property.propertyType}</span>
          <span className="text-gray-500">
            {property.city}, {property.state}
          </span>
        </div>
      </div>
    </Link>
  )
}

export const FeaturedSoldPropertiesComponent: React.FC<FeaturedSoldPropertiesProps> = ({
  heading = 'Recently Sold Properties',
  subheading = 'Take a look at these amazing properties that found their new owners',
  maxListings = 6,
}) => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/properties?where[featuredSold][equals]=true&limit=${maxListings}`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch sold properties')
        }

        const data = await response.json()
        setProperties(data.docs || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSoldProperties()
  }, [maxListings])

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{heading}</h2>
            <p className="text-gray-600">{subheading}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: maxListings }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{heading}</h2>
          <p className="text-red-600">Error loading sold properties: {error}</p>
        </div>
      </section>
    )
  }

  if (properties.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{heading}</h2>
          <p className="text-gray-600">{subheading}</p>
          <p className="text-gray-500 mt-4">No recently sold properties to display.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{heading}</h2>
          <p className="text-gray-600 text-lg">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* {properties.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/properties?status=sold"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              View All Sold Properties
            </Link>
          </div>
        )} */}
      </div>
    </section>
  )
}
