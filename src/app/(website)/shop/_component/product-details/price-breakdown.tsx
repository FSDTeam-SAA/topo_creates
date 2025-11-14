/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useShoppingStore } from '@/zustand/shopingStore'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUserStore } from '@/zustand/useUserStore'
import { useLocationStore } from '@/zustand/useLocationStore'

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
  const {
    rent,
    isConfirm,
    setIsConfirm,
    startDate,
    endDate,
    deliveryOption,
    selectedSize,
    setSelectedSize,
    fullName,
    email,
    phone,
    address,
    bookingSummary,
    setBookingSummary,
  } = useShoppingStore()

  const { data: session } = useSession()
  const token = session?.user?.accessToken
  const router = useRouter()
  const pathName = usePathname()

  const data = singleProduct?.data

  const { user } = useUserStore()
  const isKycVerified = user?.kycVerified

  const { lenders } = useLocationStore()

  // Auto-select first size if not selected and on shop page
  useEffect(() => {
    if (
      !selectedSize &&
      data?.sizes &&
      data.sizes.length > 0 &&
      !pathName?.startsWith('/shop/checkout')
    ) {
      setSelectedSize(data.sizes[0])
    }
  }, [data?.sizes, selectedSize, setSelectedSize, pathName])

  // PRICE CALCULATION
  const basePrice = Number(data?.basePrice ?? 0)
  const displayPrice = rent === '8' ? basePrice + 15 : basePrice

  const insurance = Number(data?.insuranceFee ?? 0)
  const shippingAvailable = data?.shippingDetails?.isShippingAvailable
  const localPickup = data?.shippingDetails?.isLocalPickup

  const shippingCost =
    deliveryOption === 'shipping' && shippingAvailable ? 30 : 0
  const total = displayPrice + insurance + shippingCost

  // FORMAT DATES FOR API
  const formatDate = (date: Date | null) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // FORMAT DATES FOR DISPLAY
  const formatDisplayDate = (date: Date | null) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // CREATE BOOKING (for Rent Now button - shop page)
  const createBookingForRentNow = useMutation({
    mutationFn: async () => {
      const bookingData: any = {
        masterdressId: data?._id,
        rentalStartDate: formatDate(startDate),
        rentalEndDate: formatDate(endDate),
        rentalDurationDays: rent === '4' ? 4 : 8,
        size: selectedSize,
        deliveryMethod: deliveryOption === 'shipping' ? 'Shipping' : 'Pickup',
      }

      // Add pickup-specific fields
      if (deliveryOption === 'pickup' && lenders.length > 0) {
        bookingData.tryOnRequested = true
        bookingData.selectedLender = [
          {
            _id: lenders[0]._id,
            email: lenders[0].email,
            location: {
              type: lenders[0].location.type,
              coordinates: lenders[0].location.coordinates,
            },
            distance: lenders[0].distance,
          },
        ]
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      )

      const responseData = await res.json()
      if (!res.ok)
        throw new Error(responseData?.message || 'Failed to create booking')
      return responseData
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Booking created successfully!', {
        position: 'bottom-right',
      })
      // Redirect to checkout page
      setTimeout(() => {
        router.push(`/shop/checkout/${data?._id}`)
      }, 1000)
    },
    onError: (err: any) => {
      toast.error(err.message || 'Booking failed', { position: 'bottom-right' })
    },
  })

  // CREATE BOOKING (for Confirm & Pay button - checkout page)
  const createBookingForPayment = useMutation({
    mutationFn: async () => {
      const bookingData: any = {
        masterdressId: data?._id,
        rentalStartDate: formatDate(startDate),
        rentalEndDate: formatDate(endDate),
        rentalDurationDays: rent === '4' ? 4 : 8,
        size: selectedSize,
        deliveryMethod: deliveryOption === 'shipping' ? 'Shipping' : 'Pickup',
      }

      // Add pickup-specific fields
      if (deliveryOption === 'pickup' && lenders.length > 0) {
        bookingData.tryOnRequested = true
        bookingData.selectedLender = [
          {
            _id: lenders[0]._id,
            email: lenders[0].email,
            location: {
              type: lenders[0].location.type,
              coordinates: lenders[0].location.coordinates,
            },
            distance: lenders[0].distance,
          },
        ]
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
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

      // Save booking summary to store BEFORE updating
      setBookingSummary({
        orderId: bookingId,
        dressName: data?.dressName || 'N/A',
        rentalStartDate: formatDisplayDate(startDate),
        rentalEndDate: formatDisplayDate(endDate),
        deliveryMethod:
          deliveryOption === 'shipping' ? 'Shipping' : 'Local Pickup',
        totalPaid: total,
        size: selectedSize || 'N/A',
      })

      // First update booking with customer details, then proceed to payment
      updateBooking.mutate(bookingId)
    },
    onError: (err: any) => {
      toast.error(err.message || 'Booking failed', { position: 'bottom-right' })
    },
  })

  console.log('bookings summary', bookingSummary)

  // UPDATE BOOKING (new mutation to update address, phone, etc.)
  const updateBooking = useMutation({
    mutationFn: async (bookingId: string) => {
      const updateData = {
        address: address,
        phone: phone,
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/${bookingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      )

      const responseData = await res.json()
      if (!res.ok)
        throw new Error(responseData?.message || 'Failed to update booking')
      return { bookingId, ...responseData }
    },
    onSuccess: () => {
      // After updating booking, redirect to payment info page
      createCheckout.mutate()
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update booking details', {
        position: 'bottom-right',
      })
    },
  })

  // SAVE PAYMENT INFO (redirect to card info page)
  const createCheckout = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/savePaymentInfo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const responseData = await res.json()
      if (!res.ok)
        throw new Error(responseData?.message || 'Failed to save payment info')
      return responseData
    },
    onSuccess: (res) => {
      const url = res?.data?.url
      if (url) {
        window.location.href = url
      } else {
        toast.error('Payment setup failed, try again later')
      }
    },
    onError: (err: any) => {
      toast.error(err.message || 'Payment setup failed', {
        position: 'bottom-right',
      })
    },
  })

  // HANDLERS
  const handleCheckout = () => {
    if (!token) {
      toast.error('You must be signed in to continue!')
      setTimeout(() => router.push('/signin'), 2000)
      return
    }

    if (!isKycVerified) {
      toast.error('KYC verification is required before renting.', {
        position: 'bottom-right',
      })
      return
    }

    if (!fullName || !email || !phone || !address) {
      toast.error('Please complete all required fields!')
      return
    }

    if (!startDate || !endDate) {
      toast.error('Please select rental dates!')
      return
    }

    if (!selectedSize) {
      toast.error('Please select a size!')
      return
    }

    if (deliveryOption === 'pickup' && lenders.length === 0) {
      toast.error('No nearby lenders found. Please choose shipping instead.')
      return
    }

    setIsConfirm(true)
  }

  const handleConfirmPay = () => {
    createBookingForPayment.mutate()
  }

  const handleRentNow = () => {
    if (!token) {
      toast.error('Please login to continue.', {
        position: 'bottom-right',
      })

      setTimeout(() => {
        router.push('/login')
      }, 1000)

      return
    }

    if (!isKycVerified) {
      toast.error('KYC verification is required before renting.', {
        position: 'bottom-right',
      })
      return
    }

    if (!startDate || !endDate) {
      toast.error('Please select rental dates!')
      return
    }

    if (!selectedSize) {
      toast.error('Please select a size!')
      return
    }

    if (deliveryOption === 'pickup' && lenders.length === 0) {
      toast.error('No nearby lenders found. Please choose shipping instead.')
      return
    }

    // Create booking (NO payment yet)
    createBookingForRentNow.mutate()
  }

  // UI
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

          {deliveryOption === 'shipping' && shippingAvailable && (
            <div className="flex items-center justify-between opacity-75 tracking-widest">
              <span>Shipping</span>
              <span>${shippingCost}</span>
            </div>
          )}

          {deliveryOption === 'pickup' && localPickup && (
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

        {/* SIZE DROPDOWN */}
        {data?.sizes && data.sizes.length > 0 && (
          <div className="mt-8 lg:mt-10">
            <label className="block text-sm tracking-widest opacity-75 mb-1">
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
                    className="uppercase tracking-widest cursor-pointer"
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
                onClick={handleConfirmPay}
                disabled={
                  createBookingForPayment.isPending ||
                  updateBooking.isPending ||
                  createCheckout.isPending
                }
                className="opacity-75 tracking-widest uppercase disabled:opacity-50"
              >
                {createBookingForPayment.isPending ||
                updateBooking.isPending ||
                createCheckout.isPending
                  ? 'Processing...'
                  : 'Confirm & Pay'}
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                className="opacity-75 tracking-widest uppercase"
              >
                Confirm & Pay
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={handleRentNow}
            disabled={createBookingForRentNow.isPending}
            className="opacity-75 tracking-widest uppercase disabled:opacity-50"
          >
            {createBookingForRentNow.isPending ? 'Processing...' : 'Rent Now'}
          </button>
        )}
      </div>
    </div>
  )
}

export default PriceBreakDown
