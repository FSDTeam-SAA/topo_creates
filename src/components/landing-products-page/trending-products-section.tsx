'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { TrendingProduct } from '@/types/trending-products'

type TrendingApiResponse = {
  status: boolean
  message: string
  data: TrendingProduct[]
}

const CARD_WIDTH = 290
const CARD_HEIGHT = 350

const TrendingNow = () => {
  const { data, isLoading } = useQuery<TrendingApiResponse>({
    queryKey: ['trending-now'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/master-dresses?limit=4`,
      )
      return res.json()
    },
    staleTime: 1000 * 60 * 5,
  })

  const products = data?.data ?? []

  return (
    <section className="">
      {/* 🔹 Header */}
      <div className="text-center mb-12 space-y-5">
        <h2 className="uppercase tracking-[12px] text-lg md:text-xl lg:text-2xl font-light">
          Trending Now
        </h2>

        <Link
          href="/shop"
          className="inline-block mt-3 text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-70 transition"
        >
          Explore the Edit
        </Link>
      </div>

      {/* 🔹 Responsive Grid with fixed card width */}
      <div className="flex justify-center">
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${CARD_WIDTH}px, 1fr))`,
            maxWidth: `${CARD_WIDTH * 4 + 96}px`,
            width: '100%',
          }}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
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

                    <p className="text-xs text-gray-500 mt-1 tracking-widest">
                      Rent ${product.basePrice} | RRP ${product.rrpPrice}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingNow
