/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useShoppingStore } from '@/zustand/shopingStore'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ShippingDetails {
  isLocalPickup?: boolean
  isShippingAvailable?: boolean
}

interface ProductData {
  _id?: string
  masterDressId?: string
  dressName?: string
  basePrice?: number
  insuranceFee?: number
  shippingDetails?: ShippingDetails
  sizes?: string[]
}

interface ShopDetailsProps {
  singleProduct: {
    data?: ProductData
  }
}

const PriceBreakDown = ({ singleProduct }: ShopDetailsProps) => {
  const { rent, isConfirm, setIsConfirm, idPreview, startDate, endDate } =
    useShoppingStore()

  const { data: session } = useSession()
  const token = session?.user?.accessToken
  const router = useRouter()
  const pathName = usePathname()

  const data = singleProduct?.data
  const [selectedSize, setSelectedSize] = useState<string>(
    data?.sizes?.[0] || ''
  )

  // ---------------- PRICE CALCULATION ----------------
  const basePrice = Number(data?.basePrice ?? 0)

  // For display only: add $15 to 8-day rent
  const displayPrice = rent === '8' ? basePrice + 15 : basePrice

  const insurance = Number(data?.insuranceFee ?? 0)
  const shippingAvailable = data?.shippingDetails?.isShippingAvailable
  const localPickup = data?.shippingDetails?.isLocalPickup

  const shippingCost = shippingAvailable ? 30 : 0
  const total = displayPrice + insurance + shippingCost

  // ---------------- CREATE BOOKING ----------------
  const createBooking = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            masterdressId: data?._id,
            rentalStartDate: startDate,
            rentalEndDate: endDate,
            rentalDurationDays: rent === '4' ? 4 : 8,
            size: selectedSize,
            deliveryMethod: shippingAvailable ? 'Shipping' : 'Pickup',
          }),
        }
      )

      const responseData = await res.json()
      if (!res.ok)
        throw new Error(responseData?.message || 'Failed to create booking')
      return responseData
    },
    onSuccess: (res) => {
      const bookingId = res?.data?.id
      if (!bookingId) {
        toast.error('No booking ID returned')
        return
      }
      createCheckout.mutate(bookingId)
    },
    onError: (err: any) => {
      toast.error(err.message || 'Booking failed', { position: 'bottom-right' })
    },
  })

  // ---------------- CREATE CHECKOUT SESSION ----------------
  const createCheckout = useMutation({
    mutationFn: async (bookingId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
        }
      )
      const responseData = await res.json()
      if (!res.ok)
        throw new Error(
          responseData?.message || 'Failed to create checkout session'
        )
      return responseData
    },
    onSuccess: (res) => {
      const url = res?.data?.checkoutUrl
      if (url) window.location.href = url
      else toast.error('Payment failed, try again later')
    },
    onError: (err: any) => {
      toast.error(err.message || 'Checkout failed', {
        position: 'bottom-right',
      })
    },
  })

  // ---------------- HANDLERS ----------------
  const handleCheckout = () => {
    if (!token) {
      toast.error('You must be signed in to continue!')
      setTimeout(() => router.push('/signin'), 2000)
      return
    }
    createBooking.mutate()
  }

  const handleCheckoutForm = () => {
    if (!token) {
      toast.error('You must be signed in to continue!')
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    if (!idPreview) {
      toast.error('Please complete all required fields!')
      return
    }

    setIsConfirm(true)
  }

  // ---------------- UI ----------------
  return (
    <div className="font-avenir uppercase mt-10">
      <h1 className="opacity-75 tracking-widest border-b border-black pb-1">
        Price Breakdown
      </h1>

      <div className="mt-4">
        <div className="space-y-3 text-sm border-b border-black pb-2">
          <div className="flex items-center justify-between opacity-75 tracking-widest">
            <span>
              Rental Fee{' '}
              {rent === '8' && <span className="text-xs">(8 days +$15)</span>}
            </span>
            <span>${displayPrice}</span>
          </div>

          <div className="flex items-center justify-between opacity-75 tracking-widest">
            <span>Insurance</span>
            <span>${insurance}</span>
          </div>

          {shippingAvailable && (
            <div className="flex items-center justify-between opacity-75 tracking-widest">
              <span>Shipping</span>
              <span>${shippingCost}</span>
            </div>
          )}

          {localPickup && !shippingAvailable && (
            <div className="flex items-center justify-between opacity-75 tracking-widest">
              <span>Pickup</span>
              <span>Free</span>
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between opacity-75 tracking-widest">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        {/* -------- SIZE DROPDOWN (SHADCN) -------- */}
        {data?.sizes && data.sizes.length > 0 && (
          <div className="mt-8 lg:mt-10">
            <label className="block text-sm tracking-widest  opacity-75 mb-1">
              Select Size
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full bg-transparent uppercase tracking-widest text-sm focus:ring-1 focus:ring-black h-10">
                <SelectValue placeholder="Choose a size" />
              </SelectTrigger>
              <SelectContent>
                {data.sizes.map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                    className="uppercase tracking-widest cursor-pointer "
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="text-center border-b-2 border-gray-500 pb-1 mt-10">
        {pathName?.startsWith('/shop/checkout') &&
        !pathName.includes('/confirmation') ? (
          <div>
            {isConfirm ? (
              <button
                onClick={handleCheckout}
                disabled={createBooking.isPending || createCheckout.isPending}
                className="opacity-75 tracking-widest uppercase disabled:opacity-50"
              >
                {createBooking.isPending || createCheckout.isPending
                  ? 'Processing...'
                  : 'Confirm & Pay'}
              </button>
            ) : (
              <button
                onClick={handleCheckoutForm}
                className="opacity-75 tracking-widest uppercase"
              >
                Confirm & Pay
              </button>
            )}
          </div>
        ) : (
          <Link href={`/shop/checkout/${data?._id}`}>
            <button className="opacity-75 tracking-widest uppercase">
              rent now
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default PriceBreakDown
