'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Bath, BedDouble, Maximize, MapPin } from 'lucide-react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

export type PropertyCardData = {
  slug?: string | null
  title?: string | null
  propertyType?: string | null
  listingType?: string | null
  price?: number | null
  bedrooms?: number | null
  bathrooms?: number | null
  area?: number | null
  city?: string | null
  state?: string | null
  featuredImage?: MediaType | string | null
}

function formatPrice(price: number, listingType?: string | null): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

  return listingType === 'rent' ? `${formatted}/mo` : formatted
}

function formatPropertyType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export const PropertyCard: React.FC<{
  className?: string
  property: PropertyCardData
}> = ({ className, property }) => {
  const {
    slug,
    title,
    propertyType,
    listingType,
    price,
    bedrooms,
    bathrooms,
    area,
    city,
    state,
    featuredImage,
  } = property

  const href = `/properties/${slug}`
  const location = [city, state].filter(Boolean).join(', ')

  return (
    <article
      className={cn(
        'group border border-border rounded-lg overflow-hidden bg-card transition-shadow hover:shadow-lg',
        className,
      )}
    >
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          {featuredImage && typeof featuredImage !== 'string' ? (
            <Media
              resource={featuredImage}
              size="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          <div className="absolute top-3 left-3 flex gap-2">
            <span
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-semibold text-white',
                listingType === 'rent' ? 'bg-blue-600' : 'bg-green-600',
              )}
            >
              {listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            {propertyType && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white">
                {formatPropertyType(propertyType)}
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          {price != null && (
            <p className="text-xl font-bold text-foreground mb-1">
              {formatPrice(price, listingType)}
            </p>
          )}

          {title && <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1">{title}</h3>}

          {location && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
              <MapPin className="size-3.5 shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-3">
            {bedrooms != null && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="size-4" />
                <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
              </div>
            )}
            {bathrooms != null && (
              <div className="flex items-center gap-1.5">
                <Bath className="size-4" />
                <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
              </div>
            )}
            {area != null && (
              <div className="flex items-center gap-1.5">
                <Maximize className="size-4" />
                <span>{area.toLocaleString()} sqft</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
