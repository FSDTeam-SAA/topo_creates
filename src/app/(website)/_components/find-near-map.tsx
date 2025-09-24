/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { MapPin, Truck, X } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import Image from 'next/image'
import {
  ProductCardData,
  normalizeProducts,
} from '../find-near-you/utility/normalizeProducts'
import Link from 'next/link'

const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'your-mapbox-token-here'

interface Marker {
  lat: number
  lng: number
  title?: string
  products?: ProductCardData[]
}

const CustomMarker = ({
  title,
  active,
}: {
  title?: string
  active?: boolean
}) => (
  <div
    className="flex flex-col items-center justify-center cursor-pointer"
    style={{ transform: 'translateY(-100%)' }}
  >
    <MapPin
      size={30}
      className={`text-[#800000] transition-all ${
        active ? 'scale-110 fill-white' : 'fill-white'
      }`}
    />
    {title && (
      <div
        className={`bg-white px-2 py-1 rounded text-xs font-medium text-[#800000] mt-1 whitespace-nowrap ${
          active ? 'font-bold' : ''
        }`}
      >
        {title}
      </div>
    )}
  </div>
)

const ProductPopover = ({
  products,
  position,
  onClose,
}: {
  products?: ProductCardData[]
  position: { top: number; left: number }
  onClose: () => void
}) => {
  console.log('ProductPopover products:', products)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  if (!products || products.length === 0) return null

  return (
    <div
      ref={popoverRef}
      className="fixed z-[9999] bg-white rounded-lg shadow-2xl border border-gray-200 w-[340px] max-h-[400px] overflow-y-auto"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50 sticky top-0 z-10">
        <h3 className="font-normal text-sm text-gray-800">
          {products.length} Dresses Available
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={16} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="divide-y divide-gray-200 font-inter ">
        {products.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`}>
            <div
              key={product.id}
              className="flex gap-5 p-3 hover:bg-gray-50 transition"
            >
              {/* Image */}
              <div className="w-28 h-28 relative flex-shrink-0">
                <Image
                  src={
                    product?.image ||
                    (product as any)?.media?.[0] ||
                    '/images/dress.png'
                  }
                  alt={
                    product?.name ??
                    (product as any)?.dressName ??
                    'Product image'
                  }
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* Info */}

              <div className="flex-1 flex flex-col justify-between uppercase tracking-[.05em]">
                <div className="space-y-3">
                  <div className="text-sm font-light text-gray-800 line-clamp-1">
                    {product?.name ?? (product as any)?.dressName ?? 'Untitled'}
                  </div>

                  {/* Shipping & Pickup */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-[10px] md:gap-[13px] lg:gap-[15px] text-xs text-gray-900">
                    {product?.shipping && (
                      <div className="flex items-center gap-[5px] md:gap-[8px] capitalize">
                        <Truck width={20} height={16} />
                        <span>SHIPPING</span>
                      </div>
                    )}

                    {product?.pickup && (
                      <div className="flex items-center gap-[5px] md:gap-[8px]">
                        <MapPin className="w-[16px] h-[16px]" />
                        <span>PICKUP</span>
                      </div>
                    )}

                    {!product?.shipping && !product?.pickup && (
                      <div className="flex items-center gap-3">
                        <Truck className="size-5" />
                        <span className="text-base tracking-[.1em] font-light text-gray-700">
                          SHIPPING
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    Size: {product?.size ?? 'N/A'}
                  </div>
                </div>

                <div className="text-sm font-light text-gray-800">
                  {(product as any)?.rentalPrice?.fourDays ??
                    product?.price ??
                    '—'}{' '}
                  / 4 Days
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

interface FindNearMapProps {
  products?: ProductCardData[]
  center?: [number, number]
  zoom?: number
  width?: string | number
  height?: string | number
}

const FindNearMap = ({
  products = [],
  center = [151.2093, -33.8688],
  zoom = 12,
  width = '100%',
  height = 400,
}: FindNearMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null)
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })

  // normalize
  const normalizedProducts = normalizeProducts(products as any)
  console.log('this is map site products', normalizedProducts)

  // group products by coordinates
  const markersMap = new Map<string, Marker>()
  normalizedProducts
    .filter((p) => p.latitude && p.longitude)
    .forEach((p) => {
      const key = `${p.latitude},${p.longitude}`
      if (!markersMap.has(key)) {
        markersMap.set(key, {
          lat: p.latitude,
          lng: p.longitude,
          title: p.name,
          products: [p],
        })
      } else {
        markersMap.get(key)!.products!.push(p)
      }
    })

  const markers: Marker[] = Array.from(markersMap.values())

  const handleMarkerClick = useCallback((marker: Marker) => {
    if (map.current) {
      const point = map.current.project([marker.lng, marker.lat])
      setPopoverPosition({ top: point.y, left: point.x })
      setActiveMarker(marker)
      //  Don't zoom in
      map.current.panTo([marker.lng, marker.lat])
    }
  }, [])

  const closePopover = useCallback(() => setActiveMarker(null), [])

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    try {
      if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'your-mapbox-token-here') {
        throw new Error('Invalid Mapbox token')
      }

      mapboxgl.accessToken = MAPBOX_TOKEN

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: center,
        zoom: zoom,
        maxZoom: 13,
        attributionControl: false,
      })

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      markers.forEach((marker) => {
        const markerElement = document.createElement('div')
        markerElement.innerHTML = ReactDOMServer.renderToString(
          <CustomMarker
            title={'click to view'}
            active={
              activeMarker?.lat === marker.lat &&
              activeMarker?.lng === marker.lng
            }
          />
        )

        markerElement.addEventListener('click', (e) => {
          e.stopPropagation()
          handleMarkerClick(marker)
        })

        new mapboxgl.Marker({ element: markerElement, anchor: 'bottom' })
          .setLngLat([marker.lng, marker.lat])
          .addTo(map.current!)
      })

      map.current.on('click', closePopover)

      if (markers.length > 1) {
        const bounds = new mapboxgl.LngLatBounds()
        markers.forEach((marker) => bounds.extend([marker.lng, marker.lat]))
        map.current.fitBounds(bounds, { padding: 50, maxZoom: 13 }) // limit zoom to 13
      }
    } catch (err) {
      console.error('Map initialization error:', err)
    }

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [markers, center, zoom, handleMarkerClick, closePopover, activeMarker])

  return (
    <div
      className="relative"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      <div
        ref={mapContainer}
        className="w-full h-full rounded-lg shadow-lg bg-gray-200 relative"
        onClick={closePopover}
      >
        {activeMarker && (
          <ProductPopover
            products={activeMarker.products}
            position={popoverPosition}
            onClose={closePopover}
          />
        )}
      </div>
    </div>
  )
}

export default FindNearMap
