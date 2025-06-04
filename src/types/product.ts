export type ProductSize = "XS" | "S" | "M" | "L" | "XL"

export type DeliveryOption = "shipping" | "local-pickup"

export type RentalDuration = "4" | "8"

export interface ProductImage {
  src: string
  alt: string
}

export interface Product {
  id: string
  name: string,
  price: number
  images: ProductImage[]
  sizes: ProductSize[]
  defaultSize?: ProductSize
  description: string
  rentalFee: number
  insuranceFee: number
  shippingFee: number
  slug: string
}

export interface SizeGuideOption {
  label: string
  value: string
}

export const sizeGuideOptions: SizeGuideOption[] = [
  { label: "Tight Fit", value: "tight" },
  { label: "True to Size", value: "true" },
  { label: "Relaxed Fit", value: "relaxed" },
]


