'use client'
import React from 'react'
import ProductDetails from '../_component/product-details/product-details'
import DocumentVerification from '../../account/_components/document-verification'
import { useUserStore } from '@/zustand/useUserStore'

const Page = () => {
  const { user } = useUserStore()

  return (
    <div className="container mx-auto pb-24 pt-[110px]">
      <div className="my-5">
        <DocumentVerification user={user} />
      </div>
      <ProductDetails />
    </div>
  )
}

export default Page
