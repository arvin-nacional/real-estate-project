'use client'

import React, { useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, Map, List, SlidersHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PropertyCard, type PropertyCardData } from '@/components/PropertyCard'
import { PropertyMap, type MapProperty } from '@/components/Map/PropertyMap'
import { MapSearchBox } from '@/components/Map/MapSearchBox'

type Filters = {
  propertyType?: string
  listingType?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
  bathrooms?: string
  city?: string
}

export const PropertyFilters: React.FC<{
  properties: (PropertyCardData & { latitude?: number | null; longitude?: number | null })[]
  totalPages: number
  currentPage: number
  initialFilters: Filters
  initialMapCenter?: [number, number]
}> = ({ properties, totalPages, currentPage, initialFilters, initialMapCenter }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split')
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const updateFilters = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }

      if (key !== 'page') {
        params.delete('page')
      }

      router.push(`/properties?${params.toString()}`)
    },
    [router, searchParams],
  )

  const updateMultipleFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })

      params.delete('page')
      router.push(`/properties?${params.toString()}`)
    },
    [router, searchParams],
  )

  const clearFilters = useCallback(() => {
    router.push('/properties')
  }, [router])

  const hasActiveFilters = Object.values(initialFilters).some(Boolean)

  const handleGeocoderResult = useCallback(
    (result: {
      placeName: string
      center: [number, number]
      bbox?: [number, number, number, number]
    }) => {
      // Extract city name from place_name
      const parts = result.placeName.split(',')
      const cityName = parts[0]?.trim()

      updateMultipleFilters({
        city: cityName,
        lat: String(result.center[1]),
        lng: String(result.center[0]),
      })
    },
    [updateMultipleFilters],
  )

  const handleGeocoderClear = useCallback(() => {
    updateMultipleFilters({
      city: undefined,
      lat: undefined,
      lng: undefined,
    })
  }, [updateMultipleFilters])

  const mapProperties: MapProperty[] = properties

  return (
    <div className="container">
      {/* Search & View Toggle Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Mapbox Geocoding Search */}
        <div className="flex-1">
          <MapSearchBox
            onResult={handleGeocoderResult}
            onClear={handleGeocoderClear}
            placeholder="Search by location..."
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
          <Button
            variant={viewMode === 'split' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('split')}
            className="gap-1.5 hidden lg:flex"
          >
            <Map className="size-4" />
            <List className="size-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="gap-1.5"
          >
            <List className="size-4" />
            List
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('map')}
            className="gap-1.5"
          >
            <Map className="size-4" />
            Map
          </Button>
        </div>

        {/* Filter Toggle */}
        <Button
          variant={showFilters ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-1.5"
        >
          <SlidersHorizontal className="size-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-primary-foreground text-primary size-5 rounded-full text-xs flex items-center justify-center">
              {Object.values(initialFilters).filter(Boolean).length}
            </span>
          )}
        </Button>
      </div>

      {/* Collapsible Filter Bar */}
      {showFilters && (
        <div className="bg-card border border-border rounded-lg p-4 mb-4 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              value={initialFilters.propertyType ?? 'all'}
              onValueChange={(value) => updateFilters('propertyType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={initialFilters.listingType ?? 'all'}
              onValueChange={(value) => updateFilters('listingType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Listing Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Buy & Rent</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={initialFilters.bedrooms ?? 'all'}
              onValueChange={(value) => updateFilters('bedrooms', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Beds</SelectItem>
                <SelectItem value="1">1+ Bed</SelectItem>
                <SelectItem value="2">2+ Beds</SelectItem>
                <SelectItem value="3">3+ Beds</SelectItem>
                <SelectItem value="4">4+ Beds</SelectItem>
                <SelectItem value="5">5+ Beds</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={initialFilters.bathrooms ?? 'all'}
              onValueChange={(value) => updateFilters('bathrooms', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Baths</SelectItem>
                <SelectItem value="1">1+ Bath</SelectItem>
                <SelectItem value="2">2+ Baths</SelectItem>
                <SelectItem value="3">3+ Baths</SelectItem>
                <SelectItem value="4">4+ Baths</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Input
              type="number"
              placeholder="Min Price"
              defaultValue={initialFilters.minPrice ?? ''}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateFilters('minPrice', (e.target as HTMLInputElement).value || undefined)
                }
              }}
            />
            <Input
              type="number"
              placeholder="Max Price"
              defaultValue={initialFilters.maxPrice ?? ''}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateFilters('maxPrice', (e.target as HTMLInputElement).value || undefined)
                }
              }}
            />
            <div /> {/* Spacer */}
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="gap-2">
                <X className="size-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={viewMode === 'split' ? 'flex flex-col lg:flex-row gap-4' : 'flex flex-col gap-4'}
      >
        {/* Map Panel */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div
            className={
              viewMode === 'split'
                ? 'lg:w-1/2 h-[400px] lg:h-[calc(100vh-240px)] sticky top-24'
                : 'h-[calc(100vh-240px)]'
            }
          >
            <PropertyMap
              properties={mapProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
              center={initialMapCenter}
              zoom={initialMapCenter ? 11 : 4}
              className="w-full h-full"
            />
          </div>
        )}

        {/* Listings Panel */}
        {(viewMode === 'split' || viewMode === 'list') && (
          <div className={viewMode === 'split' ? 'lg:w-1/2' : ''}>
            {properties.length > 0 ? (
              <div
                className={
                  viewMode === 'split'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-4 lg:max-h-[calc(100vh-240px)] lg:overflow-y-auto lg:pr-2'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'
                }
              >
                {properties.map((property, index) => (
                  <div
                    key={property.slug ?? index}
                    onMouseEnter={() => setSelectedProperty(property.slug ?? null)}
                    onMouseLeave={() => setSelectedProperty(null)}
                    className={
                      selectedProperty === property.slug
                        ? 'ring-2 ring-primary rounded-lg transition-shadow'
                        : 'transition-shadow'
                    }
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No properties found</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your filters to find what you&apos;re looking for.
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => updateFilters('page', String(currentPage - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground px-4">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => updateFilters('page', String(currentPage + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
