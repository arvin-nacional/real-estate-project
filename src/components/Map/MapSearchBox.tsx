'use client'

import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

interface MapSearchBoxProps {
  onResult?: (result: {
    placeName: string
    center: [number, number]
    bbox?: [number, number, number, number]
  }) => void
  onClear?: () => void
  placeholder?: string
  className?: string
  map?: mapboxgl.Map | null
}

export const MapSearchBox: React.FC<MapSearchBoxProps> = ({
  onResult,
  onClear,
  placeholder = 'Search by location...',
  className = '',
  map,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const geocoderRef = useRef<MapboxGeocoder | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) return

    mapboxgl.accessToken = token

    const geocoder = new MapboxGeocoder({
      accessToken: token,
      mapboxgl: mapboxgl as any,
      countries: 'us',
      types: 'region,district,place,locality,neighborhood,address,poi',
      placeholder,
      marker: false,
      flyTo: false,
    })

    geocoderRef.current = geocoder

    containerRef.current.appendChild(geocoder.onAdd(map ?? (undefined as any)))

    geocoder.on('result', (e: any) => {
      const { result } = e
      onResult?.({
        placeName: result.place_name,
        center: result.center as [number, number],
        bbox: result.bbox as [number, number, number, number] | undefined,
      })
    })

    geocoder.on('clear', () => {
      onClear?.()
    })

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.onRemove()
        geocoderRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={className}>
      <div ref={containerRef} className="mapbox-search-box" />
      <style jsx global>{`
        .mapbox-search-box .mapboxgl-ctrl-geocoder {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-shadow: none;
          border: 1px solid hsl(var(--border));
          border-radius: var(--radius);
          font-family: inherit;
          font-size: 14px;
          background: hsl(var(--card));
        }
        .mapbox-search-box .mapboxgl-ctrl-geocoder--input {
          color: hsl(var(--foreground));
          padding: 8px 12px 8px 36px;
          height: 40px;
        }
        .mapbox-search-box .mapboxgl-ctrl-geocoder--input:focus {
          outline: none;
          box-shadow: 0 0 0 2px hsl(var(--ring));
        }
        .mapbox-search-box .mapboxgl-ctrl-geocoder--input::placeholder {
          color: hsl(var(--muted-foreground));
        }
        .mapbox-search-box .mapboxgl-ctrl-geocoder--icon-search {
          top: 10px;
          left: 10px;
          fill: hsl(var(--muted-foreground));
        }
        .mapbox-search-box .mapboxgl-ctrl-geocoder--icon-close {
          margin-top: 4px;
        }
        .mapbox-search-box .mapboxgl-ctrl-geocoder .suggestions {
          border: 1px solid hsl(var(--border));
          border-radius: var(--radius);
          background: hsl(var(--card));
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .mapbox-search-box .mapboxgl-ctrl-geocoder .suggestions li a {
          color: hsl(var(--foreground));
          padding: 8px 12px;
        }
        .mapbox-search-box .mapboxgl-ctrl-geocoder .suggestions li a:hover,
        .mapbox-search-box .mapboxgl-ctrl-geocoder .suggestions li.active a {
          background: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
        }
      `}</style>
    </div>
  )
}
