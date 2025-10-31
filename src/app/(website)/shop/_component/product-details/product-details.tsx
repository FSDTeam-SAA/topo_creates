'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import ShopCard from './shop-card'
import ShopDetails from './shop-details'
import { useQuery } from '@tanstack/react-query'
import StyledByYou from '@/components/product/styled_By_You'
import HowItWork from '@/components/HowItWork'
import GiveAndTake from '@/components/section/GiveAndTake'

// ------------------- TYPES -------------------
interface ShippingDetails {
  isLocalPickup: boolean
  isShippingAvailable: boolean
}

export interface Product {
  _id: string
  dressName: string
  listingIds: string[]
  lenderIds: string[]
  sizes: string[]
  colors: string[]
  occasions: string[]
  media: string[]
  thumbnail: string
  shippingDetails: ShippingDetails
  insuranceFee: number
  basePrice: number
  rrpPrice: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  slug: string
  masterDressId: string
  __v: number
}

export interface SingleProductResponse {
  status: boolean
  message: string
  data: Product
}

// ------------------- COMPONENT -------------------
const ProductDetails = () => {
  const params = useParams()

  const { data, isLoading } = useQuery<SingleProductResponse>({
    queryKey: ['single-product', params.id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/master-dress/${params.id}`
      )
      if (!res.ok) throw new Error('Failed to fetch product')
      return res.json()
    },
  })

  const singleProduct = data?.data
  const thumbnailImage = singleProduct?.thumbnail ?? ''
  const allImages = singleProduct?.media ?? []

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="lg:flex-1">
          <ShopCard
            thumbnailImage={thumbnailImage}
            allImages={allImages}
            isLoading={isLoading}
          />
        </div>

        <div className="lg:w-[40%]">
          <ShopDetails
            singleProduct={{ data: singleProduct }}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="mt-4 md:mt-8 space-y-4">
        <StyledByYou />
        <HowItWork />
        <GiveAndTake />
      </div>
    </div>
  )
}

export default ProductDetails
