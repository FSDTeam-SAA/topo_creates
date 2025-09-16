import HowItWork from '@/components/HowItWork'
import FindNearYou from './_components/find-near-you'
import { ProductGrid } from '@/components/product/product-grid'
import { getTrendingProducts } from '@/data/product-data'
// import ViewToggle from './_components/view-toggle'

export default function FindNearYouPage() {
  const trendingProducts = getTrendingProducts()

  return (
    <main className="min-h-screen bg-white pt-[100px]">
      <FindNearYou />

      <div className="space-y-8 md:space-y-12">
        <HowItWork />
        <ProductGrid
          title="TRENDING NOW"
          subtitle="EXPLORE THE EDIT"
          products={trendingProducts}
        />
      </div>
    </main>
  )
}
