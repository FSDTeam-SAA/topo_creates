'use client'

import Link from 'next/link'
import { useShoppingStore } from '@/zustand/shopingStore'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const { bookingSummary, clearBookingSummary } = useShoppingStore()
  // const router = useRouter()

  // Redirect if no booking summary
  // useEffect(() => {
  //   if (!bookingSummary) {
  //     // router.push('/shop')
  //   }
  // }, [bookingSummary, router])

  // if (!bookingSummary) {
  //   return null // or a loading spinner
  // }

  return (
    <div className="text-center mt-8 px-4">
      <h1 className="text-3xl md:text-5xl font-avenir tracking-[10px] uppercase">
        Thank you for your booking!
      </h1>
      <p className="font-avenir tracking-[4px] uppercase mt-5 opacity-75 text-sm md:text-base">
        Your rental has been confirmed. You&apos;ll receive an email shortly
        with full details.
      </p>

      <div className="mt-16 space-y-2 max-w-2xl mx-auto">
        <h1 className="font-avenir uppercase opacity-75 tracking-[2px] mb-5 text-lg">
          Booking Summary
        </h1>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Order ID:{' '}
          <span className="font-semibold">{bookingSummary?.orderId}</span>
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Dress:{' '}
          <span className="font-semibold">{bookingSummary?.dressName}</span>
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Size: <span className="font-semibold">{bookingSummary?.size}</span>
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Rental Period:{' '}
          <span className="font-semibold">
            {bookingSummary?.rentalStartDate} - {bookingSummary?.rentalEndDate}
          </span>
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Delivery Method:{' '}
          <span className="font-semibold">
            {bookingSummary?.deliveryMethod}
          </span>
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Total Paid:{' '}
          <span className="font-semibold">${bookingSummary?.totalPaid}</span>
        </p>
      </div>

      <div className="mt-16">
        <Link href="/shop">
          <button
            onClick={() => clearBookingSummary()}
            className="font-avenir opacity-75 border-b border-black pb-1 uppercase tracking-widest hover:opacity-100 transition-opacity"
          >
            Go To Shop
          </button>
        </Link>
      </div>
    </div>
  )
}
