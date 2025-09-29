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
  // const trendingProductsRaw = getTrendingProducts()
  // Map trending products to Product type (adjust mapping as needed)
  // const trendingProducts = trendingProductsRaw.map((p: any, idx: number) => ({
  //   _id: p.id ?? `trending-${idx}`,
  //   lenderId: '', // Provide actual lenderId if available
  //   dressId: p.id ?? `trending-${idx}`,
  //   dressName: p.name,
  //   size: p.sizes?.[0] ?? 'N/A',
  //   media: p.images?.map((img: any) => img.src) ?? ['/placeholder.svg'],
  //   rentalPrice: {
  //     fourDays: p.rentalFee ?? 0,
  //     eightDays: p.rentalFee ? p.rentalFee * 2 : 0,
  //   },
  //   pickupOption: 'shipping', // or set as needed
  //   slug: p.slug,
  //   description: p.description,
  //   // Required Product fields with defaults or mapped values
  //   brand: p.brand ?? 'Unknown',
  //   status: p.status ?? 'available',
  //   colour: p.colour ?? 'Unknown',
  //   condition: p.condition ?? 'Unknown',
  //   location: p.location ?? { lat: 0, lng: 0, address: 'Unknown' },
  //   createdAt: p.createdAt ?? new Date().toISOString(),
  //   updatedAt: p.updatedAt ?? new Date().toISOString(),
  //   owner: p.owner ?? '',
  //   isActive: p.isActive ?? true,
  //   isDeleted: p.isDeleted ?? false,
  //   category: p.category ?? 'Unknown',
  //   tags: p.tags ?? [],
  //   views: p.views ?? 0,
  //   // Add any other required Product fields with defaults or mapped values
  // }))
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
                const size = (p as any)?.size ?? 'N/A'
                const image =
                  Array.isArray((p as any)?.media) &&
                  (p as any).media.length > 0
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
