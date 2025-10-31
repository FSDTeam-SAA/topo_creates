'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import ReactDOMServer from 'react-dom/server'
import { MapPin } from 'lucide-react'
import { useLocationStore } from '@/zustand/useLocationStore'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

const MarkerBig = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center">
    <MapPin size={45} className="text-red-700 fill-white" />
    <div className="bg-white px-2 py-1 rounded text-xs font-medium text-red-700 shadow mt-1">
      {label}
    </div>
  </div>
)

const MarkerSmall = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center">
    <MapPin size={30} className="text-red-700 fill-white" />
    <div className="bg-white px-1 py-0.5 rounded text-[10px] font-medium text-red-700 shadow mt-1">
      {label}
    </div>
  </div>
)

const ShoppinghMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  const { latitude, longitude, lenders } = useLocationStore()

  useEffect(() => {
    if (!mapContainer.current) return

    if (!map.current) {
      mapboxgl.accessToken = MAPBOX_TOKEN

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [longitude || 90.4036, latitude || 23.7797],
        zoom: 12,
      })
    }

    // ✅ Remove old markers
    document.querySelectorAll('.mapboxgl-marker').forEach((e) => e.remove())

    // ✅ If lenders exist → add their markers
    lenders.forEach((lender, index) => {
      const [lng, lat] = lender.location.coordinates

      const MarkerComp =
        index === 0 ? (
          <MarkerBig label={'Nearest Lender'} />
        ) : (
          <MarkerSmall label={'Nearby Lender'} />
        )

      const el = document.createElement('div')
      el.innerHTML = ReactDOMServer.renderToString(MarkerComp)

      new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map.current!)
    })

    // ✅ Center map on FIRST lender if available
    if (lenders[0]) {
      map.current.setCenter(lenders[0].location.coordinates)
      map.current.setZoom(13)
    }
  }, [latitude, longitude, lenders])

  return (
    <div className="w-full h-[350px] rounded overflow-hidden shadow bg-gray-200">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}

export default ShoppinghMap
