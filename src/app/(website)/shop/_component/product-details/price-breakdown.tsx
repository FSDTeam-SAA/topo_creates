'use client'
import { useShoppingStore } from '@/zustand/shopingStore'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface RentalPrice {
  fourDays?: string | number
  eightDays?: string | number
}

interface ProductData {
  _id?: string
  dressName?: string
  rentalPrice?: RentalPrice
  size?: string
}

interface ShopDetailsProps {
  singleProduct: {
    data?: ProductData
  }
}

const PriceBreakDown = ({ singleProduct }: ShopDetailsProps) => {
  const rent = useShoppingStore((state) => state.rent)
  const session = useSession()
  const token = session?.data?.user?.accessToken
  const router = useRouter()

  const pathName = usePathname()

  console.log('access token', token)

  const { isConfirm, setIsConfirm, idPreview, startDate, endDate } =
    useShoppingStore()

  const data = singleProduct?.data

  const rentalFee =
    rent === '4'
      ? Number(data?.rentalPrice?.fourDays ?? 0)
      : Number(data?.rentalPrice?.eightDays ?? 0)

  const insurance = 15
  const shipping = 30
  const total = rentalFee + insurance + shipping

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
            listingId: data?._id,
            rentalStartDate: startDate,
            rentalEndDate: endDate,
            rentalDurationDays: rent === '4' ? 4 : 8,
            size: data?.size,
            deliveryMethod: 'Shipping',
          }),
        }
      )

      const responseData = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to create booking')
      }

      return responseData
    },
    onSuccess: (bookingResponse) => {
      const bookingId = bookingResponse?.data?.id

      if (bookingId) {
        createCheckout.mutate(bookingId)
      } else {
        toast.error('Booking failed: no bookingId returned')
        console.error('No bookingId returned', bookingResponse)
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong with booking', {
        position: 'bottom-right',
      })
    },
  })
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

      const responseData = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(
          responseData?.message || 'Failed to create checkout session'
        )
      }

      return responseData
    },
    onSuccess: (paymentResponse) => {
      if (paymentResponse.status && paymentResponse.data?.checkoutUrl) {
        window.location.href = paymentResponse.data.checkoutUrl
      } else {
        toast.error(paymentResponse?.data?.message || 'Payment failed', {
          position: 'bottom-right',
        })
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong with checkout', {
        position: 'bottom-right',
      })
    },
  })

  const handleCheckout = () => {
    if (!token) {
      toast.error('You must be signed in to continue!', {
        position: 'bottom-right',
      })
      setTimeout(() => {
        router.push('/signin')
      }, 2000)
      return
    }

    createBooking.mutate()
  }

  const handleCheckoutForm = () => {
    if (!token) {
      toast.error('You must be signed in to continue!', {
        position: 'bottom-right',
      })
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      return
    }

    if (idPreview === null) {
      toast.error('Please complete all required fields!', {
        position: 'bottom-right',
      })
      return
    }
    setIsConfirm(true)
  }

  return (
    <div className="font-avenir uppercase mt-10">
      <h1 className="opacity-75 tracking-widest border-b border-black pb-1">
        Price Breakdown
      </h1>

      <div className="mt-4">
        <div className="space-y-3 text-sm border-b border-black pb-2">
          <div className="opacity-75 tracking-widest flex items-center justify-between">
            <span>Rental Fee</span>
            <span>${rentalFee}</span>
          </div>

          <div className="opacity-75 tracking-widest flex items-center justify-between">
            <span>Insurance</span>
            <span>${insurance}</span>
          </div>

          <div className="opacity-75 tracking-widest flex items-center justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
        </div>

        <div className="mt-2">
          <div className="opacity-75 tracking-widest flex items-center justify-between">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      <div className="text-center border-b-2 border-gray-500 pb-1 mt-10">
        {pathName?.startsWith('/shop/checkout') &&
        !pathName.includes('/confirmation') ? (
          <div>
            {isConfirm === true ? (
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
                className="opacity-75 tracking-widest uppercase disabled:opacity-50"
              >
                Confirm & Pay
              </button>
            )}
          </div>
        ) : (
          <Link href={`/shop/checkout/${data?._id}`}>
            <button className="opacity-75 tracking-widest uppercase disabled:opacity-50">
              Buy Now
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default PriceBreakDown
