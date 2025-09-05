/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useFindNearYouStore } from '@/zustand/useFindNearYouStore'
import FindNearYou from '../_components/find-near-you'
import MapView from '../_components/map-view'
import MapProductCard from '../_components/map-product-card'
import HowItWork from '@/components/HowItWork'
import { ProductGrid } from '@/components/product/product-grid'
import { getTrendingProducts } from '@/data/product-data'

export default function MapPage() {
  const { allProducts } = useFindNearYouStore()
  const trendingProducts = getTrendingProducts()
  console.log('All Products:', allProducts)

  return (
    <main className="min-h-screen bg-white">
      {/* Location Search + Filters */}
      <FindNearYou />

      {/* Map + Product List */}
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Left → Map */}
        <div className="relative w-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <MapView products={allProducts} />
        </div>

        {/* Right → Product Cards */}
        <div className="grid grid-cols-1 gap-6 px-2 pr-2 overflow-y-auto max-h-[650px]">
          {allProducts?.length ? (
            allProducts.map((p, idx) => {
              const id = (p as any)?._id ?? (p as any)?.dressId ?? idx
              const name = (p as any)?.dressName ?? 'No Name'
              const size = (p as any)?.size ?? 'N/A'
              const image =
                Array.isArray((p as any)?.media) && (p as any).media.length > 0
                  ? (p as any).media[0]
                  : '/placeholder.svg'

              const four = (p as any)?.rentalPrice?.fourDays
              const eight = (p as any)?.rentalPrice?.eightDays
              const price = String(four ?? eight ?? '')
              const days = four != null ? 4 : eight != null ? 8 : 0

              // pickupOption normalizer
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
                  price={price}
                  days={days}
                  size={size}
                  image={image}
                  shipping={shipping}
                  pickup={pickup}
                />
              )
            })
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No products to display on map.
            </p>
          )}
        </div>
      </section>

      {/* Bottom Sections */}
      <HowItWork />
      <ProductGrid
        title="TRENDING NOW"
        subtitle="EXPLORE THE EDIT"
        products={trendingProducts}
      />
    </main>
  )
}
