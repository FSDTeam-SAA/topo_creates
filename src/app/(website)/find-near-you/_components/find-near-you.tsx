/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import {
  MapPin,
  Filter,
  ChevronDown,
  ChevronUp,
  Map,
  AlertCircle,
} from 'lucide-react'
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
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import type { ApiProduct } from '../utility/normalizeProducts'

export default function FindNearYou() {
  const pathname = usePathname()
  const isMapPage = pathname === '/find-near-you/map'

  // Location
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number
    longitude: number
    placeName: string
  } | null>(null)

  // Filters
  const [radius, setRadius] = useState(2)
  const [size, setSize] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // UI
  const [showMap, setShowMap] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Pagination
  const [page, setPage] = useState(1)
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([])
  const [pagination, setPagination] = useState<{
    totalPages: number
    totalItems: number
  } | null>(null)

  const mapboxtoken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  // Fetcher
  const fetchProducts = async () => {
    if (!selectedLocation) return []

    const queryParams = new URLSearchParams({
      latitude: String(selectedLocation.latitude),
      longitude: String(selectedLocation.longitude),
      radius: String(radius * 1000),
      page: String(page),
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
    if (!res.ok) throw new Error('Failed to fetch products')

    const data = await res.json()
    setPagination(data?.pagination || null)

    if (page === 1) {
      setAllProducts(data?.data || [])
    } else {
      setAllProducts((prev) => [...prev, ...(data?.data || [])])
    }

    console.log('Fetched Products:', data || [])

    return data?.data || []
  }

  const { isFetching, isError, error, refetch, isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: fetchProducts,
    enabled: false,
    retry: 1,
  })

  return (
    <section className="container mx-auto py-12 mt-16 md:mt-20">
      <h1 className="text-center text-xl md:text-4xl lg:text-[56px] uppercase font-normal tracking-[5px] lg:tracking-[20px] mb-6 font-avenir">
        Find Near You
      </h1>
      <p className="text-center text-lg md:text-xl lg:text-2xl font-normal tracking-[3px] lg:tracking-[10px] mb-8 font-avenir">
        FIND YOUR DRESS NEAR YOU FOR LOCAL PICK UP
      </p>

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

      {/* Location Selector */}
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
        <p className="font-normal mb-2">
          Radius: <span className="font-light">{radius} km</span>
        </p>
        <Slider
          defaultValue={[2]}
          max={50}
          step={2}
          className="w-full"
          onValueChange={(val) => setRadius(val[0])}
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
          <p className="font-normal text-xl mb-4">Filter Options</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[45px] lg:gap-[60px]">
            {/* Size */}
            <div>
              <Label className="text-lg text-black font-thin">Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="w-full border-b shadow-none rounded-none pt-5 pb-3 h-auto">
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
              <Label className="text-lg text-black font-thin">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full border-b shadow-none rounded-none pt-5 pb-3 h-auto">
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
                <Label className="text-lg text-black font-thin">
                  Price Range
                </Label>
                <div className="flex items-center gap-2 border-b border-black pb-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="text-2xl text-black px-2">—</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Button */}
      <Button
        onClick={() => {
          setPage(1)
          refetch()
        }}
        className="w-full uppercase tracking-wider"
        disabled={!selectedLocation || isFetching}
      >
        {isFetching ? 'Searching...' : 'Search Near You'}
        <MapPin size={18} className="ml-2" />
      </Button>

      {/* Error */}
      {isError && (
        <div className="mt-6 flex items-center gap-2 text-red-600">
          <AlertCircle className="size-5" />
          <span>{(error as Error)?.message || 'Something went wrong'}</span>
        </div>
      )}

      {/* Skeleton */}
      {isLoading || isFetching ? (
        <div className="mt-10 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-full h-40 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : null}

      {/* Products */}
      {!isMapPage && allProducts.length > 0 && (
        <div className="mt-10">
          <ProductList products={allProducts} />

          {pagination && page < pagination.totalPages && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setPage((p) => p + 1)
                  refetch()
                }}
                disabled={isFetching}
              >
                {isFetching ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isFetching && allProducts.length === 0 && !isError && (
        <div className="mt-16 text-center space-y-5">
          <AlertCircle className="mx-auto mb-3 text-gray-400 size-24" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-700">
            No Dresses Found
          </h3>
          <p className="text-gray-500 mt-1">
            Try adjusting your filters or increasing the radius.
          </p>
        </div>
      )}
    </section>
  )
}
