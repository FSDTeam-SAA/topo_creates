'use client'

import { ProductCard } from '@/components/product/product-card'
import { Product } from '@/types/product'
import { useFilterStore } from '@/zustand/filterStore'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Image from 'next/image'

const AllProduct = () => {
  const { search, size, minPrice, maxPrice, fourDayRental, page, nextPage } =
    useFilterStore()

  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<{
    itemsPerPage: number
    totalItems: number
    totalPages: number
  } | null>(null)

  const { isLoading, isFetching } = useQuery({
    queryKey: [
      'all-product',
      search,
      size,
      minPrice,
      maxPrice,
      fourDayRental,
      page,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin?search=${search}&size=${size}&min=${minPrice}&max=${maxPrice}&fourDaysSelected=${fourDayRental}&page=${page}`
      )
      const data = await res.json()

      // Handle products & pagination
      if (page === 1) {
        setProducts(data.data) // reset when new search
      } else {
        setProducts((prev) => [...prev, ...data.data]) // append on load more
      }

      setPagination(data.pagination)

      return data
    },
  })

  return (
    <div>
      {/* Grid of products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 gap-10">
        {isLoading && page === 1
          ? Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="flex flex-col h-full animate-pulse">
                <div className="overflow-hidden mb-4 aspect-[2/3] w-full bg-gray-200 rounded-md" />
                <div className="text-center space-y-2 mt-auto">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))
          : products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      {/* No product available */}
      {!isLoading && products.length === 0 && (
        <div className="text-center min-h-[calc(100vh-400px)] flex flex-col items-center justify-center">
          <Image
            src={'/no-product.webp'}
            alt="no-product.png"
            width={1000}
            height={1000}
            className="h-[300px] w-[300px] mx-auto"
          />
          <h1 className="uppercase font-avenir text-xl tracking-[15px]">
            No Product Available
          </h1>
        </div>
      )}

      {/* Pagination Info */}
      {pagination && products.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Showing {products.length} of {pagination.totalItems} dresses near
            you
          </p>

          {/* Load More button */}
          {page < pagination.totalPages && (
            <button
              onClick={() => nextPage()}
              disabled={isFetching}
              className="inline-block border-b border-black font-light px-6 py-2 text-[14px] uppercase tracking-widest text-base hover:bg-black hover:text-white"
            >
              {isFetching ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default AllProduct
