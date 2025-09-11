import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-12 text-center">
      <h1 className="sub-title">
        THANK YOU FOR YOUR BOOKING!
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-12 max-w-7xl my-5">
        YOUR RENTAL HAS BEEN CONFIRMED. YOU&lsquo;LL RECEIVE AN EMAIL SHORTLY WITH FULL DETAILS.
      </p>

      <div className="w-full max-w-xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-6">BOOKING SUMMARY</h2>

        <div className="space-y-3 mb-10 text-center">
          <div className="mb-2">
            <span className="font-medium">Order ID: </span>
            <span>#MG-129384</span>
          </div>

          <div className="mb-2">
            <span className="font-medium">Dress: </span>
            <span>Zimmermann Silk Gown</span>
          </div>

          <div className="mb-2">
            <span className="font-medium">Rental Period: </span>
            <span>May 12 - May 15 (4-Day Rental)</span>
          </div>

          <div className="mb-2">
            <span className="font-medium">Delivery Method: </span>
            <span>Shipping - Estimated Arrival May 11</span>
          </div>

          <div className="mb-2">
            <span className="font-medium">Total Paid: </span>
            <span>$150</span>
          </div>
        </div>

        <Link href="/shop">GO TO SHOP</Link>
      </div>
    </div>
  )
}

export default page
