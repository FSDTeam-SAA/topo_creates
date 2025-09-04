'use client'

import { useState } from 'react'
import ProductCard from './product-card'
import ViewToggle from './view-toggle'
import { ApiProduct, ProductCardData, normalizeProducts } from '../utility/normalizeProducts'

interface ProductListProps {
  products?: ApiProduct[] | null
}

export default function ProductList({ products }: ProductListProps) {
  const [showMore, setShowMore] = useState(false)

  const normalizedProducts: ProductCardData[] = normalizeProducts(products)

  const displayedProducts = showMore
    ? normalizedProducts
    : normalizedProducts.slice(0, 4)

  return (
    <section className="container mx-auto px-4">
      <ViewToggle />

      <div className="mb-8 grid grid-cols-1 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {!showMore && normalizedProducts.length > 4 && (
        <div className="text-center pt-6">
          <button
            onClick={() => setShowMore(true)}
            className="uppercase border-b border-black pb-1"
          >
            Load More
          </button>
        </div>
      )}

      <p className="text-sm text-center mt-6 uppercase">
        Showing {displayedProducts.length} of {normalizedProducts.length}{' '}
        dresses near you
      </p>
    </section>
  )
}
