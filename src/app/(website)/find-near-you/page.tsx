import HowItWork from '@/components/HowItWork'
import FindNearYou from './_components/find-near-you'
import { ProductGrid } from '@/components/product/product-grid'
import { getTrendingProducts } from '@/data/product-data'
// import ViewToggle from './_components/view-toggle'

export default function FindNearYouPage() {
  const trendingProducts = getTrendingProducts()

  return (
    <main className="min-h-screen bg-white">
      <FindNearYou />
      
      <HowItWork />
      <ProductGrid
        title="TRENDING NOW"
        subtitle="EXPLORE THE EDIT"
        products={trendingProducts}
      />
    </main>
  )
}
