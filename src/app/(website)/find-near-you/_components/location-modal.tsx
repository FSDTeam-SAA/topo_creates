'use client'

import { useState, useRef, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

import Map, { Marker  } from 'react-map-gl'

interface LocationModalProps {
  open: boolean
  onClose: () => void
  onSearch: (location: { lat: number; lng: number }, radius: number) => void
}

export default function LocationModal({
  open,
  onClose,
  onSearch,
}: LocationModalProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 23.8103,
    lng: 90.4125,
  })
  const [radius, setRadius] = useState(10)
  const [mapLoaded, setMapLoaded] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapClick = useCallback((e: any) => {
    if (e?.lngLat) setLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng })
  }, [])

  const handleSearch = () => {
    onSearch(location, radius)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-4">
        <DialogTitle className="text-xl font-semibold">
          Select Location & Radius
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-600 mb-4">
          Click on the map to choose a location, then adjust the radius below.
        </DialogDescription>

        {/* Mapbox */}
        <div className="h-80 w-full rounded-md overflow-hidden">
          {open && process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
            <Map
              ref={mapRef}
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              initialViewState={{
                longitude: location.lng,
                latitude: location.lat,
                zoom: 10,
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onLoad={() => setMapLoaded(true)}
              onClick={handleMapClick}
            >
              {mapLoaded && (
                <Marker latitude={location.lat} longitude={location.lng} />
              )}
            </Map>
          )}
        </div>

        {/* Radius Slider */}
        <div className="mt-6">
          <p className="mb-2 text-sm text-gray-600">
            Radius: <span className="font-medium">{radius} km</span>
          </p>
          <Slider
            value={[radius]}
            min={1}
            max={100}
            step={1}
            onValueChange={(val) => setRadius(val[0])}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSearch} className="bg-black text-white">
            Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
