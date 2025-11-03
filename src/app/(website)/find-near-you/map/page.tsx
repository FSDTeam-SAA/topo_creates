/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useFindNearYouStore } from '@/zustand/useFindNearYouStore'
import FindNearYou from '../_components/find-near-you'
// import MapView from '../_components/map-view'
import MapProductCard from '../_components/map-product-card'
import HowItWork from '@/components/HowItWork'
// import { ProductGrid } from '@/components/product/product-grid'
// import { getTrendingProducts } from '@/data/product-data'
import { MapPinOff } from 'lucide-react'
import FindNearMap from '../../_components/find-near-map'
import { normalizeProducts } from '../utility/normalizeProducts'

export default function MapPage() {
  const { allProducts } = useFindNearYouStore()

  console.log('All Products:', allProducts)

  const hasProducts = allProducts && allProducts.length > 0

  return (
    <main className="min-h-screen bg-white">
      {/* Location Search + Filters */}
      <FindNearYou />

      {/* Map + Product List */}
      <section className="container mx-auto mb-12">
        {hasProducts ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-6">
            {/* Left → Map */}
            <div className="relative w-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              {/* <MapView products={allProducts} /> */}
              <FindNearMap
                products={normalizeProducts(allProducts)}
                height={650}
              />
            </div>

            {/* Right → Product Cards */}
            <div className="grid-cols-1 gap-6 px-2 pr-2 overflow-y-auto max-h-[650px] hidden md:grid">
              {allProducts.map((p, idx) => {
                const id = (p as any)?._id ?? (p as any)?.dressId ?? idx
                const name = (p as any)?.dressName ?? 'No Name'

                // ✅ size array handling
                const sizeRaw = (p as any)?.size
                const size = Array.isArray(sizeRaw)
                  ? sizeRaw.join(', ')
                  : sizeRaw ?? 'N/A'

                // ✅ image fallback
                const image =
                  Array.isArray((p as any)?.media) &&
                  (p as any).media.length > 0
                    ? (p as any).media[0]
                    : '/placeholder.svg'

                // ✅ price removed ✅

                // ✅ brand
                const brand = (p as any)?.brand ?? 'Unknown'

                // ✅ category
                const category = (p as any)?.category ?? 'N/A'

                // ✅ pickupOption normalizer
                const pickupOption = (
                  (p as any)?.pickupOption || ''
                ).toLowerCase()

                const pickup =
                  pickupOption.includes('pickup') || pickupOption === 'both'

                const shipping =
                  pickupOption.includes('shipping') ||
                  pickupOption.includes('australia') ||
                  pickupOption === 'both'

                return (
                  <MapProductCard
                    key={id}
                    id={id}
                    name={name}
                    size={size}
                    image={image}
                    brand={brand}
                    category={category}
                    shipping={shipping}
                    pickup={pickup}
                  />
                )
              })}
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center text-center py-8 lg:py-16">
            <MapPinOff className="h-20 w-20 text-gray-400 mb-4" />
            <h3 className="text-lg md:text-xl font-normal text-gray-700">
              No Products Found
            </h3>
            <p className="text-gray-500 mt-2 max-w-sm font-light">
              Please select a location and adjust your filters to see available
              dresses on the map.
            </p>
          </div>
        )}
      </section>

      {/* Bottom Sections */}
      <HowItWork />
      {/* <ProductGrid
        title="TRENDING NOW"
        subtitle="EXPLORE THE EDIT"
        products={trendingProducts}
      /> */}
    </main>
  )
}
