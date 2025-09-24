export interface Product {
  _id: string
  lenderId: string
  dressId: string
  dressName: string
  brand: string
  size: string
  status: string
  colour: string
  condition: string
  category: string
  media: string[] // array of image URLs
  description: string
  rentalPrice: {
    fourDays: number
    eightDays: number
  }
  material: string
  careInstructions: string
  occasion: string[]
  insurance: boolean
  pickupOption: string
  approvalStatus: string
  reasonsForRejection?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  lenderName: string
}

// src/app/(website)/types/product.ts
export interface ProductCardData {
  id: string
  name?: string
  image?: string
  price?: number
  size?: string
  shipping?: boolean
  pickup?: boolean
  latitude?: number
  longitude?: number
  rentalPrice?: { fourDays?: string | number }
}
