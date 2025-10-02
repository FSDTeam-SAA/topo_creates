'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { MapPin } from 'lucide-react'
import ReactDOMServer from 'react-dom/server'

const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'your-mapbox-token-here'

const CustomMarker = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center cursor-pointer">
    <MapPin size={30} className="text-[#800000] fill-white" />
    <div className="bg-white px-2 py-1 rounded text-xs font-medium text-[#800000] mt-1 whitespace-nowrap shadow">
      {label}
    </div>
  </div>
)

interface FindNearMapProps {
  center?: [number, number]
  zoom?: number
  width?: string | number
  height?: string | number
  markers?: { coords: [number, number]; label: string }[]
}

const ShoppinghMap = ({
  center = [151.2093, -33.8688], // Sydney coordinates
  zoom = 12,
  width = '100%',
  height = 200,
  markers = [
    { coords: [151.2093, -33.8688], label: 'Sydney Town' }, // default marker
  ],
}: FindNearMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    try {
      if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'your-mapbox-token-here') {
        throw new Error('Invalid Mapbox token')
      }

      mapboxgl.accessToken = MAPBOX_TOKEN

      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center,
        zoom,
        attributionControl: false,
      })

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      // Add multiple markers
      markers.forEach(({ coords, label }) => {
        const markerElement = document.createElement('div')
        markerElement.innerHTML = ReactDOMServer.renderToString(
          <CustomMarker label={label} />
        )

        // make sure innerHTML actually becomes a DOM node
        const wrapper = document.createElement('div')
        wrapper.innerHTML = markerElement.innerHTML

        new mapboxgl.Marker({ element: wrapper, anchor: 'bottom' })
          .setLngLat(coords)
          .addTo(map.current!)
      })

      // Fit map to first marker (so map opens centered there)
      if (markers.length > 0) {
        map.current.setCenter(markers[0].coords)
        map.current.setZoom(zoom)
      }
    } catch (err) {
      console.error('Map initialization error:', err)
    }

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [center, zoom, markers])

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg bg-gray-200"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        maxHeight: '200px',
      }}
    >
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}

export default ShoppinghMap
