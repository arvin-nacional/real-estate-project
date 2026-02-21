'use client'

import React, { useEffect, useRef, useCallback, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import type { PropertyCardData } from '@/components/PropertyCard'

export type MapProperty = PropertyCardData & {
  latitude?: number | null
  longitude?: number | null
}

interface PropertyMapProps {
  properties: MapProperty[]
  onBoundsChange?: (bounds: { ne: [number, number]; sw: [number, number] }) => void
  onPropertySelect?: (slug: string) => void
  selectedProperty?: string | null
  className?: string
  center?: [number, number]
  zoom?: number
}

const SOURCE_ID = 'properties'
const CLUSTER_LAYER = 'clusters'
const CLUSTER_COUNT_LAYER = 'cluster-count'
const UNCLUSTERED_LAYER = 'unclustered-point'
const UNCLUSTERED_LABEL = 'unclustered-label'

function formatPrice(price: number, listingType?: string | null): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(1)}M`
  }
  if (price >= 1_000) {
    return `$${(price / 1_000).toFixed(0)}K`
  }
  return `$${price}`
}

function buildGeoJSON(properties: MapProperty[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: properties
      .filter((p) => p.latitude != null && p.longitude != null)
      .map((p) => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [p.longitude!, p.latitude!],
        },
        properties: {
          slug: p.slug ?? '',
          title: p.title ?? '',
          price: p.price ?? 0,
          listingType: p.listingType ?? '',
          bedrooms: p.bedrooms ?? 0,
          bathrooms: p.bathrooms ?? 0,
          area: p.area ?? 0,
          city: p.city ?? '',
          state: p.state ?? '',
        },
      })),
  }
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  onBoundsChange,
  onPropertySelect,
  selectedProperty,
  className = '',
  center = [-98.5795, 39.8283],
  zoom = 4,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const [mapReady, setMapReady] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      console.error('Mapbox token is missing. Set NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local')
      return
    }

    mapboxgl.accessToken = token

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center,
      zoom,
      projection: 'mercator',
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      // Add the GeoJSON source with clustering
      map.addSource(SOURCE_ID, {
        type: 'geojson',
        data: buildGeoJSON([]),
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })

      // Cluster circles
      map.addLayer({
        id: CLUSTER_LAYER,
        type: 'circle',
        source: SOURCE_ID,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#16a34a', // green for small clusters
            10,
            '#2563eb', // blue for medium
            30,
            '#7c3aed', // purple for large
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20, // small
            10,
            25, // medium
            30,
            35, // large
          ],
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff',
        },
      })

      // Cluster count labels
      map.addLayer({
        id: CLUSTER_COUNT_LAYER,
        type: 'symbol',
        source: SOURCE_ID,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 13,
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#ffffff',
        },
      })

      // Individual property pins
      map.addLayer({
        id: UNCLUSTERED_LAYER,
        type: 'circle',
        source: SOURCE_ID,
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': ['case', ['==', ['get', 'listingType'], 'rent'], '#2563eb', '#16a34a'],
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      })

      // Price label on individual pins
      map.addLayer({
        id: UNCLUSTERED_LABEL,
        type: 'symbol',
        source: SOURCE_ID,
        filter: ['!', ['has', 'point_count']],
        layout: {
          'text-field': ['concat', '$', ['get', 'price']],
          'text-font': ['DIN Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 11,
          'text-offset': [0, -1.8],
          'text-allow-overlap': false,
        },
        paint: {
          'text-color': '#111827',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1.5,
        },
      })

      // Click cluster → zoom in
      map.on('click', CLUSTER_LAYER, (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: [CLUSTER_LAYER] })
        if (!features.length) return

        const clusterId = features[0].properties?.cluster_id
        const source = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource

        source.getClusterExpansionZoom(clusterId, (err, expansionZoom) => {
          if (err) return
          const geometry = features[0].geometry
          if (geometry.type === 'Point') {
            map.easeTo({
              center: geometry.coordinates as [number, number],
              zoom: expansionZoom ?? map.getZoom() + 2,
            })
          }
        })
      })

      // Click individual pin → show popup
      map.on('click', UNCLUSTERED_LAYER, (e) => {
        const feature = e.features?.[0]
        if (!feature || feature.geometry.type !== 'Point') return

        const coords = feature.geometry.coordinates.slice() as [number, number]
        const props = feature.properties
        if (!props) return

        const price = Number(props.price) || 0
        const fullPrice = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(price)
        const suffix = props.listingType === 'rent' ? '/mo' : ''
        const location = [props.city, props.state].filter(Boolean).join(', ')

        if (popupRef.current) popupRef.current.remove()

        const popup = new mapboxgl.Popup({ offset: 15, maxWidth: '280px' })
          .setLngLat(coords)
          .setHTML(
            `<div style="padding:4px;font-family:system-ui,sans-serif;">
              <a href="/properties/${props.slug}" style="text-decoration:none;color:inherit;">
                <p style="font-weight:700;font-size:15px;margin:0 0 4px;color:#111;">${fullPrice}${suffix}</p>
                <p style="font-size:13px;margin:0 0 4px;color:#111;font-weight:500;">${props.title}</p>
                <p style="font-size:12px;margin:0;color:#666;">
                  ${props.bedrooms} bd · ${props.bathrooms} ba · ${Number(props.area).toLocaleString()} sqft
                </p>
                ${location ? `<p style="font-size:12px;margin:4px 0 0;color:#888;">📍 ${location}</p>` : ''}
              </a>
            </div>`,
          )
          .addTo(map)

        popupRef.current = popup
        onPropertySelect?.(props.slug)
      })

      // Cursor changes
      map.on('mouseenter', CLUSTER_LAYER, () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', CLUSTER_LAYER, () => {
        map.getCanvas().style.cursor = ''
      })
      map.on('mouseenter', UNCLUSTERED_LAYER, () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', UNCLUSTERED_LAYER, () => {
        map.getCanvas().style.cursor = ''
      })

      setMapReady(true)
    })

    map.on('moveend', () => {
      if (onBoundsChange) {
        const bounds = map.getBounds()
        if (bounds) {
          onBoundsChange({
            ne: [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
            sw: [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
          })
        }
      }
    })

    mapRef.current = map

    return () => {
      if (popupRef.current) popupRef.current.remove()
      map.remove()
      mapRef.current = null
      setMapReady(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update GeoJSON data when properties change
  const updateData = useCallback(() => {
    const map = mapRef.current
    if (!map || !mapReady) return

    const source = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource | undefined
    if (!source) return

    const geojson = buildGeoJSON(properties)
    source.setData(geojson)

    // Fit bounds
    const valid = properties.filter((p) => p.latitude != null && p.longitude != null)
    if (valid.length > 1) {
      const bounds = new mapboxgl.LngLatBounds()
      valid.forEach((p) => bounds.extend([p.longitude!, p.latitude!]))
      map.fitBounds(bounds, { padding: 60, maxZoom: 14 })
    } else if (valid.length === 1) {
      map.flyTo({
        center: [valid[0].longitude!, valid[0].latitude!],
        zoom: 13,
      })
    }
  }, [properties, mapReady])

  useEffect(() => {
    updateData()
  }, [updateData])

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full rounded-lg" />
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center px-4">
            Set{' '}
            <code className="bg-muted-foreground/10 px-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> in
            your <code className="bg-muted-foreground/10 px-1 rounded">.env.local</code> to enable
            the map.
          </p>
        </div>
      )}
    </div>
  )
}
