// utils/normalizeProducts.ts

export interface ProductCardData {
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

export interface ApiProduct {
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

// Demo fallback
export const demoProducts: ProductCardData[] = [
  {
    id: '1',
    name: 'Demo Dress',
    price: '$50',
    days: 4,
    size: 'M',
    image: '/images/dress.png',
    description: 'Demo description',
    shipping: true,
    pickup: true,
  },
  {
    id: '2',
    name: 'Another Dress',
    price: '$70',
    days: 4,
    size: 'L',
    image: '/images/dress.png',
    description: 'Demo description',
    shipping: true,
    pickup: false,
  },
]

export function normalizeProducts(products?: ApiProduct[] | null): ProductCardData[] {
  if (products && products.length > 0) {
    return products.map((product, idx) => ({
      id: product.id || idx,
      name: product.dressName || product.name || 'No Name',
      price: product.rentalPrice?.fourDays
        ? `$${product.rentalPrice.fourDays}`
        : product.price || '$XX',
      size: product.size || 'N/A',
      image: product.media?.[0] || product.image || '/images/dress.png',
      description: product.description || '',
      pickup: product.pickupOption === 'Both' || product.pickupOption === 'Pickup',
      shipping: product.pickupOption === 'Both' || product.pickupOption === 'Shipping',
      days: 4,
    }))
  }
  return demoProducts
}
