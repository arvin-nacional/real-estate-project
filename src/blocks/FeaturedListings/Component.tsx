'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { FeaturedListingsBlock as FeaturedListingsBlockProps } from '@/payload-types'
import { PropertyCard } from '@/components/PropertyCard/index'
import { Button } from '@/components/ui/button'

export const FeaturedListingsBlock: React.FC<FeaturedListingsBlockProps> = ({
  heading,
  subheading,
  maxListings = 6,
  showFilters = true,
  showViewAllButton = true,
}) => {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all')
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('all')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/properties')
        const data = await response.json()
        
        let filteredProperties = data.docs || []
        
        // Apply filters
        if (filter !== 'all') {
          filteredProperties = filteredProperties.filter((p: any) => p.listingType === filter)
        }
        
        if (propertyTypeFilter !== 'all') {
          filteredProperties = filteredProperties.filter((p: any) => p.propertyType === propertyTypeFilter)
        }
        
        // Only show featured properties
        filteredProperties = filteredProperties.filter((p: any) => p.featured)
        
        // Limit to maxListings
        setProperties(filteredProperties.slice(0, maxListings))
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filter, propertyTypeFilter, maxListings])

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'land', label: 'Land' },
    { value: 'commercial', label: 'Commercial' },
  ]

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {subheading && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {/* Listing Type Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('sale')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'sale'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => setFilter('rent')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'rent'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                For Rent
              </button>
            </div>

            {/* Property Type Filter */}
            <select
              value={propertyTypeFilter}
              onChange={(e) => setPropertyTypeFilter(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground border-0 focus:ring-2 focus:ring-primary"
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No featured properties found matching your criteria.
            </p>
          </div>
        )}

        {/* View All Button */}
        {showViewAllButton && (
          <div className="text-center">
            <Link href="/properties">
              <Button size="lg" className="px-8">
                View All Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
