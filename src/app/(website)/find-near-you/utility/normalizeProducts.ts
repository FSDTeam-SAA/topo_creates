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

  // Extra fields
  lenderId?: string
  lenderName?: string
  approvalStatus?: string
  brand?: string
  colour?: string
  condition?: string
  material?: string
  insurance?: boolean
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface ApiProduct {
  _id?: string
  id?: string
  dressId?: string
  dressName?: string
  name?: string
  price?: string
  rentalPrice?: { fourDays?: number; eightDays?: number }
  size?: string
  media?: string[]
  image?: string
  description?: string
  pickupOption?: string
  latitude?: number
  longitude?: number
  days?: number
  lenderId?: {
    _id?: string
    fullName?: string
    email?: string
    latitude?: number
    longitude?: number
  }

  // 🆕 Extra props
  approvalStatus?: string
  brand?: string
  colour?: string
  condition?: string
  material?: string
  insurance?: boolean
  status?: string
  createdAt?: string
  updatedAt?: string
}

// 🟢 Default fallback → Thai Town, Sydney
const DEFAULT_LAT = -33.8786
const DEFAULT_LNG = 151.2069

export function normalizeProducts(
  products?: ApiProduct[] | null
): ProductCardData[] {
  if (!products || products.length === 0) return []

  return products.map((product, idx) => {
    // Normalize pickup/shipping from pickupOption
    const pickupOption = product.pickupOption?.toLowerCase() || ''

    const pickup =
      pickupOption === 'pickup' ||
      pickupOption === 'both' ||
      pickupOption.includes('pickup')

    const shipping =
      pickupOption === 'shipping' ||
      pickupOption === 'both' ||
      pickupOption.includes('shipping') ||
      pickupOption.includes('australia')

    return {
      id: product._id || product.id || product.dressId || idx,
      name: product.dressName || product.name || 'No Name',
      price: product.rentalPrice?.fourDays
        ? `$${product.rentalPrice.fourDays}`
        : product.price || '$XX',
      size: product.size || 'N/A',
      image: product.media?.[0] || product.image || '/images/dress.png',
      description: product.description || '',
      pickup,
      shipping,
      days: product.days ?? 4,
      latitude: product.latitude ?? product.lenderId?.latitude ?? DEFAULT_LAT,
      longitude:
        product.longitude ?? product.lenderId?.longitude ?? DEFAULT_LNG,

      // 🆕 Extra props mapping
      lenderId: product.lenderId?._id,
      lenderName: product.lenderId?.fullName,
      approvalStatus: product.approvalStatus,
      brand: product.brand,
      colour: product.colour,
      condition: product.condition,
      material: product.material,
      insurance: product.insurance,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  })
}
