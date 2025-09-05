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
  latitude: number
  longitude: number
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
  latitude?: number
  longitude?: number
}

// 🟢 Default fallback → Thai Town, Sydney
const DEFAULT_LAT = -33.8786
const DEFAULT_LNG = 151.2069

export function normalizeProducts(
  products?: ApiProduct[] | null
): ProductCardData[] {
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
      pickup:
        product.pickupOption === 'Both' || product.pickupOption === 'Pickup',
      shipping:
        product.pickupOption === 'Both' || product.pickupOption === 'Shipping',
      days: 4,
      latitude: product.latitude ?? DEFAULT_LAT,
      longitude: product.longitude ?? DEFAULT_LNG,
    }))
  }

  return []
}
