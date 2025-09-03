'use client'

import { useState } from 'react'
import ProductCard from './product-card'
import ViewToggle from './view-toggle'

// Strict type for ProductCard
interface ProductCardData {
  id: string | number
  name: string
  price: string
  days: number
  size: string
  image: string
  description: string
  shipping: boolean
  pickup: boolean
}

// Default demo products
const demoProducts: ProductCardData[] = [
  {
    id: '1',
    name: 'Dress Name',
    price: '$XX',
    days: 4,
    size: 'XL',
    image: '/images/dress.png',
    description: 'Dress description',
    shipping: true,
    pickup: true,
  },
  {
    id: '2',
    name: 'Dress Name',
    price: '$XX',
    days: 4,
    size: 'XL',
    image: '/images/dress.png',
    description: 'Dress description',
    shipping: true,
    pickup: false,
  },
]

// API product type
interface ApiProduct {
  id?: string
  dressName?: string
  name?: string
  price?: string
  rentalPrice?: { fourDays?: number; eightDays?: number }
  size?: string
  media?: string[]
  image?: string
  description?: string
  pickupOption?: 'Both' | 'Pickup' | 'Shipping'
}

interface ProductListProps {
  products?: ApiProduct[] | null
}

export default function ProductList({ products }: ProductListProps) {
  const [showMore, setShowMore] = useState(false)

  // Normalize API product into ProductCardData
  const normalize = (product: ApiProduct, idx: number): ProductCardData => ({
    id: product.id || idx,
    name: product.dressName || product.name || 'No Name',
    price: product.rentalPrice?.fourDays
      ? `$${product.rentalPrice.fourDays}`
      : product.price || '$XX',
    size: product.size || 'N/A',
    image: product.media?.[0] || product.image || '/images/dress.png',
    description: product.description || '',
    pickup:
      product.pickupOption === 'Both' || product.pickupOption === 'Pickup',
    shipping:
      product.pickupOption === 'Both' || product.pickupOption === 'Shipping',
    days: 4,
  })

  //  Fix duplication issue
  const hasProducts = products && products.length > 0
  const normalizedProducts: ProductCardData[] = hasProducts
    ? products.map(normalize)
    : demoProducts

  const displayedProducts = showMore
    ? normalizedProducts
    : normalizedProducts.slice(0, 4)

  return (
    <section className="container mx-auto px-4">
      <ViewToggle />

      {/*  Full-width cards */}
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
