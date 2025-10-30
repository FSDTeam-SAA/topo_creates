'use client'

import { ProductCard } from '@/components/product/product-card'
import { Product } from '@/types/product'
import { useFilterStore } from '@/zustand/filterStore'
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const AllProduct = () => {
  const {
    search,
    size,
    minPrice,
    maxPrice,
    fourDayRental,
    page,
    nextPage,
    setPage,
  } = useFilterStore()

  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<{
    itemsPerPage: number
    totalItems: number
    totalPages: number
  } | null>(null)

  const queryClient = useQueryClient()

  // Reset page & product list when filters change
  useEffect(() => {
    setPage(1)
    setProducts([])
  }, [search, size, minPrice, maxPrice, fourDayRental, setPage])

  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: [
      'all-products',
      search,
      size,
      minPrice,
      maxPrice,
      fourDayRental,
      page,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/master-dresses?search=${search}&size=${size}&min=${minPrice}&max=${maxPrice}&fourDaysSelected=${fourDayRental}&page=${page}`
      )
      const data = await res.json()
      return data
    },
    placeholderData: keepPreviousData, // keeps old data visible while fetching next page
    staleTime: 1000 * 60 * 5, // 5 minutes cache time (no refetch within 5 min)
    refetchOnWindowFocus: false, // prevent unnecessary refetch
  })

  // Sync fetched data into local state safely
  useEffect(() => {
    if (data?.data) {
      setPagination({
        itemsPerPage: data.pagination.itemsPerPage,
        totalItems: data.pagination.totalItems,
        totalPages: data.pagination.totalPages,
      })

      setProducts((prev) => {
        if (page === 1) return data.data // reset for first page
        // prevent duplicates when loading more
        const existingIds = new Set(prev.map((p) => p._id))
        const uniqueNew = data.data.filter(
          (p: Product) => !existingIds.has(p._id)
        )
        return [...prev, ...uniqueNew]
      })
    }
  }, [data, page])

  // Prefetch next page (smooth UX)
  useEffect(() => {
    if (data?.pagination?.totalPages && page < data.pagination.totalPages) {
      queryClient.prefetchQuery({
        queryKey: [
          'all-products',
          search,
          size,
          minPrice,
          maxPrice,
          fourDayRental,
          page + 1,
        ],
        queryFn: async () => {
          const res = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/api/v1/admin/master-dresses?search=${search}&size=${size}&min=${minPrice}&max=${maxPrice}&fourDaysSelected=${fourDayRental}&page=${
              page + 1
            }`
          )
          return res.json()
        },
      })
    }
  }, [data, page, queryClient, search, size, minPrice, maxPrice, fourDayRental])

  return (
    <div>
      {/* Product Grid */}
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
      {isSuccess && products.length === 0 && (
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

          {/* Load More Button */}
          {page < pagination.totalPages && (
            <button
              onClick={() => nextPage()}
              disabled={isFetching}
              className="inline-block border-b border-black font-light px-6 py-2 text-[14px] uppercase tracking-widest text-base hover:bg-black hover:text-white transition-all"
            >
              {isFetching ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}

      {/* Loader for “Load More” (only after page > 1) */}
      {isFetching && page > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllProduct
