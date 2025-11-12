/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import clsx from 'clsx'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const OrderHistory = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([])
  const [pagination, setPagination] = useState<{
    currentPage: number
    totalPages: number
    totalData: number
  } | null>(null)

  const [page, setPage] = useState(1)

  // ✅ API Call
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['customer-bookings', page],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/all?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      )
      return res.json()
    },
    enabled: !!session?.user?.accessToken,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  })

  // ✅ Sync Data
  useEffect(() => {
    if (!data?.data?.bookings) return

    setPagination({
      currentPage: data.data.paginationInfo.currentPage,
      totalPages: data.data.paginationInfo.totalPages,
      totalData: data.data.paginationInfo.totalData,
    })

    setOrders((prev) => {
      if (page === 1) return data.data.bookings
      const existingIds = new Set(prev.map((b) => b.id))
      const uniqueNew = data.data.bookings.filter(
        (b: any) => !existingIds.has(b.id)
      )
      return [...prev, ...uniqueNew]
    })
  }, [data, page])

  // ✅ Prefetch Next Page
  useEffect(() => {
    if (!data?.data?.paginationInfo) return

    if (page < data.data.paginationInfo.totalPages) {
      queryClient.prefetchQuery({
        queryKey: ['customer-bookings', page + 1],
        queryFn: async () => {
          const res = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/api/v1/customer/bookings/all?page=${page + 1}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
              },
            }
          )
          return res.json()
        },
      })
    }
  }, [data, page, queryClient, session?.user?.accessToken])

  return (
    <div className="w-full">
      <section>
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <h2 className="text-2xl tracking-widest font-light">
              Order History
            </h2>
            {/* <p className="text-base sm:text-lg md:text-2xl font-light tracking-widest">
              April 10, 2023 - Today
            </p> */}
          </div>
          <hr className="mt-4 border border-black" />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                {[
                  'Order Date',
                  'Event Date',
                  'Payment',
                  'Delivery Status',
                  'Total Cost',
                  'Tracking',
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 sm:px-6 lg:px-10 text-left text-gray-600 font-normal text-sm whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Loading orders...
                  </td>
                </tr>
              )}

              {!isLoading && orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}

              {orders.map((order) => {
                const orderDate = new Date(order.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }
                )
                const startDate = new Date(
                  order.rentalStartDate
                ).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
                const endDate = new Date(
                  order.rentalEndDate
                ).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })

                const statusColor =
                  order.deliveryStatus === 'Delivered'
                    ? 'green'
                    : order.deliveryStatus === 'Pending'
                    ? 'yellow'
                    : 'red'

                return (
                  <tr key={order.id} className="border-b">
                    <td className="py-6 px-4 sm:px-6 lg:px-10 text-base text-gray-900 border-r font-light tracking-wide border-gray-300">
                      {orderDate}
                    </td>
                    <td className="py-6 px-4 sm:px-6 lg:px-10 text-base font-light tracking-wide text-gray-900 border-r border-gray-300 whitespace-nowrap">
                      {startDate} - {endDate}
                    </td>
                    <td className="py-6 px-4 sm:px-6 lg:px-10 font-light tracking-wide text-base text-gray-900 border-r border-gray-300">
                      {order.paymentStatus}
                    </td>
                    <td className="py-6 px-4 sm:px-6 lg:px-10 font-light tracking-wide text-base text-gray-900 border-r border-gray-300">
                      <span
                        className={clsx('px-2 py-1 rounded-full text-xs', {
                          'bg-green-100 text-green-800':
                            statusColor === 'green',
                          'bg-yellow-100 text-yellow-800':
                            statusColor === 'yellow',
                          'bg-red-100 text-red-800': statusColor === 'red',
                        })}
                      >
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="py-6 px-4 sm:px-6 lg:px-10 text-base text-gray-900 border-r border-gray-300 font-light tracking-wide">
                      ${order.totalAmount}
                    </td>
                    <td className="py-6 px-4 sm:px-6 lg:px-10 text-base text-gray-900 font-light tracking-wide">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-xs p-0 h-auto text-blue-600 font-light tracking-wide"
                        asChild
                      >
                        <Link href="/account/chats">TRACK ORDER</Link>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination */}
        {pagination && orders.length > 0 && (
          <div className="text-center mt-8 md:mt-12">
            <p className="text-gray-600 mb-4">
              Showing {orders.length} of {pagination.totalData} orders
            </p>

            {page < pagination.totalPages && (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isFetching}
                className="inline-block border-b border-black font-light px-6 py-2 text-[14px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                {isFetching ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default OrderHistory
