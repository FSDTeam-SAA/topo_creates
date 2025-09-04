'use client'

import HowItWork from '@/components/HowItWork'
import FindNearYou from '../_components/find-near-you'
import MapView from '../_components/map-view'
import { ProductGrid } from '@/components/product/product-grid'
import { getTrendingProducts } from '@/data/product-data'
import ViewToggle from '../_components/view-toggle'
import { ApiProduct } from '../utility/normalizeProducts'

interface MapPageProps {
  products?: ApiProduct[] | null
}

export default function MapPage({ products }: MapPageProps) {
  const trendingProducts = getTrendingProducts()

  return (
    <main className="min-h-screen bg-white">
      {/*  Location Search */}
      <FindNearYou />

      {/*  Toggle */}
      <section className="container mx-auto">
        <ViewToggle />
      </section>

      {/*  Map + Product List */}
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Left → Map */}
        <div className="relative w-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <MapView products={products} />
        </div>

        {/* Right → Product List */}
        <div className="grid grid-cols-1 gap-6 overflow-y-auto pr-2 max-h-[500px]">
          <MapView.List products={products} />
        </div>
      </section>

      {/*  Bottom Sections */}
      <HowItWork />
      <ProductGrid
        title="TRENDING NOW"
        subtitle="EXPLORE THE EDIT"
        products={trendingProducts}
      />
    </main>
  )
}
