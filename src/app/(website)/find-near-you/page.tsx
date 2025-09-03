import HowItWork from '@/components/HowItWork'
import FindNearYou from './_components/find-near-you'
import ProductList from './_components/product-list'
import { ProductGrid } from '@/components/product/product-grid'
import { getTrendingProducts } from '@/data/product-data'
import Footer from '@/components/Footer/Footer'

export default function FindNearYouPage() {
  const trendingProducts = getTrendingProducts()
  return (
    <main className="min-h-screen bg-white ">
      <FindNearYou />
      <ProductList />
      <HowItWork />
      <ProductGrid
        title="TRENDING NOW"
        subtitle="EXPLORE THE EDIT"
        products={trendingProducts}
      />
      <Footer />
    </main>
  )
}
