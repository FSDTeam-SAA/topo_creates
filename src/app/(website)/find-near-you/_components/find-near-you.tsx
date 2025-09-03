/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { MapPin, Filter, ChevronDown, ChevronUp, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import AustraliaLocationSelector from '@/components/ui/australia-location-selector'
import ProductList from './product-list'

export default function FindNearYou() {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number
    longitude: number
    placeName: string
  } | null>(null)

  const [radius, setRadius] = useState(50) // default 50 km
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // UI Toggles
  const [showMap, setShowMap] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Filter States
  const [size, setSize] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const mapboxtoken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  const fetchProducts = async () => {
    if (!selectedLocation) return
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        latitude: String(selectedLocation.latitude),
        longitude: String(selectedLocation.longitude),
        radius: String(radius),
      })

      if (size) queryParams.append('size', size)
      if (category) queryParams.append('category', category)
      if (minPrice) queryParams.append('minPrice', minPrice)
      if (maxPrice) queryParams.append('maxPrice', maxPrice)

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/v1/admin/?${queryParams.toString()}`
      )
      const data = await res.json()
      setProducts(data?.data || [])
    } catch (err) {
      console.error('API fetch failed', err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  console.log('Selected Location:', selectedLocation)
  console.log('Radius:', radius)
  console.log('Products:', products)

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-center text-2xl font-bold uppercase lg:my-16 mb-8">
        Find Near You
      </h1>

      {/* Toggle Buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2"
        >
          <Map size={16} />
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          Filters{' '}
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Location Selector with toggle */}
      {showMap && (
        <div className="mb-6">
          <AustraliaLocationSelector
            accessToken={mapboxtoken || ''}
            onLocationSelect={(data) => {
              setSelectedLocation({
                latitude: data.latitude,
                longitude: data.longitude,
                placeName: data.placeName,
              })
            }}
            placeholder="Search for your business location..."
            mapHeight="300px"
          />
        </div>
      )}

      {/* Radius Slider */}
      <div className="mb-6">
        <p className="font-medium mb-2">
          Radius: <span className="font-bold">{radius} km</span>
        </p>
        <Slider
          defaultValue={[50]}
          max={200}
          step={5}
          className="w-full"
          onValueChange={(val) => setRadius(val[0])}
        />
      </div>

      {/* Extra Filters (collapsible) */}
      {showFilters && (
        <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
          <p className="font-semibold mb-4">Filter Options</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[45px] lg:gap-[60px]">
            {/* Size */}
            <div>
              <Label className="text-lg text-black font-normal leading-[28px] tracking-[0.15em]">
                Size
              </Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="w-full border-b shadow-none border-t-0 border-r-0 border-l-0 border-black rounded-none pt-5 pb-3 h-auto focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label className="text-lg text-black font-normal leading-[28px] tracking-[0.15em]">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full border-b border-t-0 shadow-none border-r-0 border-l-0 border-black rounded-none pt-5 pb-3 h-auto focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="cocktail">Cocktail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="w-full flex items-end gap-4">
              <div className="w-full">
                <Label className="text-lg text-black font-normal leading-[28px] tracking-[0.15em]">
                  Price Range
                </Label>
                <div className="flex items-center gap-2 border-b border-black pb-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="text-lg shadow-none font-normal text-black tracking-[0.15px] border-none rounded-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <span className="text-2xl text-black px-2">—</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="text-lg shadow-none font-normal text-black tracking-[0.15px] border-none rounded-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Button */}
      <Button
        onClick={fetchProducts}
        className="w-full uppercase tracking-wider"
        disabled={!selectedLocation || loading}
      >
        {loading ? 'Searching...' : 'Search Near You'}
        <MapPin size={18} className="ml-2" />
      </Button>

      {/* Product List */}
      <div className="mt-10">
        <ProductList products={products} />
      </div>
    </section>
  )
}
