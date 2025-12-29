'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TrendingProduct } from '@/types/trending-products'

type MuseApiResponse = {
  status: boolean
  message: string
  data: TrendingProduct[]
}

const CARD_WIDTH = 290
const CARD_HEIGHT = 350
const ITEM_COUNT = 5

// shuffle the products array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const TheMuseEdit = () => {
  const { data, isLoading } = useQuery<MuseApiResponse>({
    queryKey: ['the-muse-edit'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/master-dresses`,
      )
      return res.json()
    },
    staleTime: 0, // force freshness
  })

  //  Shuffle + pick 5

  const products = useMemo(() => {
    if (!data?.data?.length) return []
    return shuffleArray(data.data).slice(0, ITEM_COUNT)
  }, [data])

  return (
    <section className="pt-8">
      {/* 🔹 Header */}
      {/* 🔹 Header */}
      <div className="text-center mb-12 space-y-5">
        <h2 className="uppercase tracking-[12px] text-lg md:text-xl lg:text-2xl font-light">
          THE MUSE EDIT
        </h2>

        <Link
          href="/shop"
          className="inline-block mt-3 text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-70 transition"
        >
          Explore the Edit
        </Link>
      </div>

      {/* 🔹 Responsive Grid */}
      <div className="flex justify-center">
        <div
          className="
      grid gap-8
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
    "
          style={{ maxWidth: '1500px' }}
        >
          {isLoading
            ? Array.from({ length: ITEM_COUNT }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                  className="mx-auto animate-pulse"
                >
                  <div className="h-full bg-gray-200" />
                </div>
              ))
            : products.map(product => (
                <Link
                  key={product._id}
                  href={`/shop/${product._id}`}
                  className="mx-auto group"
                  style={{ width: CARD_WIDTH }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: CARD_HEIGHT }}
                  >
                    <Image
                      src={product.thumbnail || product.media?.[0]}
                      alt={product.dressName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center mt-4">
                    <h3 className="text-sm font-light uppercase tracking-wide">
                      {product.dressName}
                    </h3>

                    {/* <p className="text-xs text-gray-500 mt-1 tracking-widest">
                      Rent ${product.basePrice} | RRP ${product.rrpPrice}
                    </p> */}
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  )
}

export default TheMuseEdit
