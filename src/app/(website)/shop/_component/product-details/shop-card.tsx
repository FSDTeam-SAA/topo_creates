'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface ShopCardProps {
  allImages: string[]
  thumbnailImage: string
  isLoading: boolean
}

const ShopCard = ({ thumbnailImage, allImages, isLoading }: ShopCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Always start with thumbnail first, then all media
  const images = [thumbnailImage, ...allImages].filter(Boolean)

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-5 animate-pulse">
        {/* Left Sidebar Skeleton */}
        <div className="flex flex-row lg:flex-col gap-5 lg:w-[20%] w-full overflow-x-auto lg:overflow-visible">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border min-w-[150px] lg:h-[150px] h-[100px] bg-gray-300 rounded"
            />
          ))}
        </div>

        {/* Main Image Skeleton */}
        <div className="flex-1 min-h-[400px] lg:h-[660px] relative">
          <div className="w-full h-full bg-gray-300 rounded-lg" />
          <div className="flex items-center gap-5 absolute right-4 top-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Sidebar Thumbnails */}
      <div className="flex flex-row lg:flex-col gap-5 lg:w-[20%] w-full overflow-x-auto lg:overflow-visible">
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`min-w-[150px] lg:h-[150px] h-[100px] cursor-pointer rounded overflow-hidden border-[2px] ${
              currentImageIndex === index
                ? 'border-gray-500'
                : 'border-transparent'
            }`}
          >
            <Image
              src={src || '/placeholder.jpg'}
              alt={`image-${index}`}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Image Display */}
      <div className="flex-1 min-h-[400px] lg:h-[660px] relative">
        <Image
          src={images[currentImageIndex] || '/placeholder.jpg'}
          alt={`main-image-${currentImageIndex}`}
          fill
          className="object-cover rounded-lg"
        />

        <div className="flex items-center gap-5 absolute right-4 top-4 text-white">
          <ShoppingCart className="bg-black/60 p-2 rounded-full w-9 h-9" />
          <Heart className="bg-black/60 p-2 rounded-full w-9 h-9" />
        </div>
      </div>
    </div>
  )
}

export default ShopCard
