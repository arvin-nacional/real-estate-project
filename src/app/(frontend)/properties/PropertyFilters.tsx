'use client'

import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

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
  properties: PropertyCardData[]
  totalPages: number
  currentPage: number
  initialFilters: Filters
}> = ({ properties, totalPages, currentPage, initialFilters }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilters = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }

      // Reset to page 1 when filters change
      if (key !== 'page') {
        params.delete('page')
      }

      router.push(`/properties?${params.toString()}`)
    },
    [router, searchParams],
  )

  const clearFilters = useCallback(() => {
    router.push('/properties')
  }, [router])

  const hasActiveFilters = Object.values(initialFilters).some(Boolean)

  return (
    <div className="container">
      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* City Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by city..."
              defaultValue={initialFilters.city ?? ''}
              className="pl-9"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateFilters('city', (e.target as HTMLInputElement).value || undefined)
                }
              }}
            />
          </div>

          {/* Property Type */}
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

          {/* Listing Type */}
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

          {/* Bedrooms */}
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
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Min Price */}
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

          {/* Max Price */}
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

          {/* Bathrooms */}
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

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters} className="gap-2">
              <X className="size-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {properties.map((property, index) => (
            <PropertyCard key={property.slug ?? index} property={property} />
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
  )
}
