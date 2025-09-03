'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Navigation, Search, X } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react'

// Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css'

export interface PreciseLocationData {
  longitude: number
  latitude: number
  address: string
  placeName: string
  city?: string
  state?: string
  country: string
  postcode?: string
  suburb?: string
  precision: 'exact' | 'approximate' | 'interpolated'
}

interface AustraliaLocationSelectorProps {
  accessToken: string
  onLocationSelect: (location: PreciseLocationData) => void
  initialLocation?: PreciseLocationData
  placeholder?: string
  className?: string
  mapHeight?: string
  showCurrentLocation?: boolean
}

export default function AustraliaLocationSelector({
  accessToken,
  onLocationSelect,
  initialLocation,
  placeholder = 'Search for exact locations in Australia...',
  className = '',
  mapHeight = '500px',
  showCurrentLocation = true,
}: AustraliaLocationSelectorProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedLocation, setSelectedLocation] =
    useState<PreciseLocationData | null>(initialLocation || null)
  const [showResults, setShowResults] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const parseAustralianLocation = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (feature: any, lng?: number, lat?: number): PreciseLocationData => {
      const coordinates = lng && lat ? [lng, lat] : feature.geometry.coordinates
      const context = feature.context || []
      let precision: 'exact' | 'approximate' | 'interpolated' = 'approximate'
      if (
        feature.properties?.accuracy === 'rooftop' ||
        feature.place_type?.includes('address')
      ) {
        precision = 'exact'
      } else if (feature.properties?.accuracy === 'interpolated') {
        precision = 'interpolated'
      }

      const state =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context.find((c: any) => c.id.includes('region'))?.text ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context.find((c: any) => c.id.includes('district'))?.text

      const suburb =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context.find((c: any) => c.id.includes('locality'))?.text ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context.find((c: any) => c.id.includes('neighborhood'))?.text

      return {
        longitude: Number(coordinates[0].toFixed(8)),
        latitude: Number(coordinates[1].toFixed(8)),
        address: feature.place_name,
        placeName: feature.text || feature.place_name,
        city:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          context.find((c: any) => c.id.includes('place'))?.text || undefined,
        suburb: suburb,
        state: state,
        country: 'Australia',
        postcode:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          context.find((c: any) => c.id.includes('postcode'))?.text ||
          undefined,
        precision: precision,
      }
    },
    []
  ) // no external deps → safe to memoize

  const reverseGeocodeAustralia = useCallback(
    async (lng: number, lat: number) => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}&types=address,poi,place&country=AU&limit=1&language=en`
        )
        const data = await response.json()
        if (data.features && data.features.length > 0) {
          const feature = data.features[0]
          const location = parseAustralianLocation(feature, lng, lat)
          setSelectedLocation(location)
          onLocationSelect(location)
        }
      } catch (error) {
        console.error('Reverse geocoding error:', error)
      }
    },
    [accessToken, onLocationSelect, parseAustralianLocation]
  )

  const addPreciseMarker = useCallback(
    (lng: number, lat: number) => {
      if (!map.current) return
      // Remove existing marker
      if (marker.current) {
        marker.current.remove()
      }
      // Add new precise marker with custom styling
      const markerElement = document.createElement('div')
      markerElement.className = 'precise-marker'
      markerElement.style.cssText = `
      width: 20px;
      height: 20px;
      background: #ef4444;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
    `
      marker.current = new mapboxgl.Marker({
        element: markerElement,
        draggable: true,
      })
        .setLngLat([lng, lat])
        .addTo(map.current)

      // Handle marker drag for precise positioning
      marker.current.on('dragend', () => {
        if (marker.current) {
          const lngLat = marker.current.getLngLat()
          reverseGeocodeAustralia(lngLat.lng, lngLat.lat)
        }
      })
    },
    [reverseGeocodeAustralia] // ✅ Now safe to include
  )

  const handleMapClick = useCallback(
    (e: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat
      addPreciseMarker(lng, lat)
      reverseGeocodeAustralia(lng, lat)
    },
    [addPreciseMarker, reverseGeocodeAustralia]
  )

  // Initialize map with Australia focus
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = accessToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-day-v1', // Better for precise location selection
      center: initialLocation
        ? [initialLocation.longitude, initialLocation.latitude]
        : [133.7751, -25.2744], // Geographic center of Australia
      zoom: initialLocation ? 16 : 4, // Higher zoom for initial location, lower for Australia overview
      pitch: 0, // Flat view for better precision
      bearing: 0,
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add scale control for distance reference
    map.current.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric',
      }),
      'bottom-left'
    )

    // Add click handler for map
    map.current.on('click', handleMapClick)

    // Add initial marker if location provided
    if (initialLocation) {
      addPreciseMarker(initialLocation.longitude, initialLocation.latitude)
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [accessToken, initialLocation, addPreciseMarker, handleMapClick])

  const searchAustralianLocations = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([])
        setShowResults(false)
        return
      }
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${accessToken}&types=address,poi,place&country=AU&proximity=133.7751,-25.2744&limit=10&language=en`
        )
        const data = await response.json()
        setSearchResults(data.features || [])
        setShowResults(true)
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      }
    },
    [accessToken]
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectSearchResult = (feature: any) => {
    const location = parseAustralianLocation(feature)
    const [lng, lat] = feature.geometry.coordinates

    setSelectedLocation(location)
    setSearchQuery(feature.place_name)
    setShowResults(false)
    onLocationSelect(location)

    // Fly to location with high zoom for precision
    if (map.current) {
      map.current.flyTo({
        center: [lng, lat],
        zoom: 16,
        pitch: 0,
        bearing: 0,
      })
    }
    addPreciseMarker(lng, lat)
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      return
    }

    setIsGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords

        // Check if location is within Australia bounds (rough check)
        if (
          latitude >= -44 &&
          latitude <= -10 &&
          longitude >= 113 &&
          longitude <= 154
        ) {
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 16,
            })
          }
          addPreciseMarker(longitude, latitude)
          reverseGeocodeAustralia(longitude, latitude)
        } else {
          alert('Your current location appears to be outside Australia.')
        }
        setIsGettingLocation(false)
      },
      (error) => {
        console.error('Geolocation error:', error)
        alert('Unable to get your current location.')
        setIsGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  const clearSelection = () => {
    setSelectedLocation(null)
    setSearchQuery('')
    if (marker.current) {
      marker.current.remove()
      marker.current = null
    }
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && searchQuery !== selectedLocation?.address) {
        searchAustralianLocations(searchQuery)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedLocation?.address, searchAustralianLocations])

  const getPrecisionColor = (precision: string) => {
    switch (precision) {
      case 'exact':
        return 'bg-green-100 text-green-800'
      case 'interpolated':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className={`w-full relative space-y-4 ${className}`}>
      <div className="flex gap-2 relative">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setShowResults(false)
              }}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {showCurrentLocation && (
          <Button
            variant="outline"
            size="default"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className="flex items-center gap-2 bg-transparent"
          >
            <Navigation className="h-4 w-4" />
            {isGettingLocation ? 'Getting...' : 'My Location'}
          </Button>
        )}
      </div>

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <Card className="absolute top-10 left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto">
          <CardContent className="p-0">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => selectSearchResult(result)}
                className="w-full text-left p-3 hover:bg-muted transition-colors border-b last:border-b-0 flex items-start gap-2"
              >
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">
                    {result.text}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {result.place_name}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {result.place_type?.includes('address') && (
                      <Badge variant="secondary" className="text-xs">
                        Exact Address
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Selected Location Display */}
      {selectedLocation && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <MapPin className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">
                      {selectedLocation.placeName}
                    </h3>
                    <Badge
                      className={`text-xs ${getPrecisionColor(
                        selectedLocation.precision
                      )}`}
                    >
                      {selectedLocation.precision}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {selectedLocation.address}
                  </p>

                  {/* Precise Coordinates */}
                  <div className="bg-muted p-2 rounded text-xs font-mono mb-2">
                    <div>Lat: {selectedLocation.latitude.toFixed(8)}</div>
                    <div>Lng: {selectedLocation.longitude.toFixed(8)}</div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {selectedLocation.suburb && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedLocation.suburb}
                      </Badge>
                    )}
                    {selectedLocation.city && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedLocation.city}
                      </Badge>
                    )}
                    {selectedLocation.state && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedLocation.state}
                      </Badge>
                    )}
                    {selectedLocation.postcode && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedLocation.postcode}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <div
        ref={mapContainer}
        className="w-full rounded-lg border overflow-hidden"
        style={{ height: mapHeight }}
      />

      <Alert className="flex items-center">
        <MapPin className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Click anywhere on the map for precise coordinates (±1.1mm accuracy).
          Drag the marker to fine-tune position. Red marker shows exact selected
          location within Australia.
        </AlertDescription>
      </Alert>
    </div>
  )
}
