import React from 'react'

export default function CustomerTermsConditions() {
  return (
    <div className="min-h-screen container mx-auto px-8 py-12 font-avenir pt-[100px]">
      {/* Header */}
      <div className="text-center space-y-5 mb-12">
        <h1 className="text-3xl tracking-[0.35rem] uppercase font-normal text-gray-900">
          Customer Terms & Conditions
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-10 text-gray-800 font-inter leading-[30px] tracking-[.08em] font-light">
        {/* 1. Booking & Rental Agreement */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            1. Booking & Rental Agreement
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              By placing a rental order on MUSE GALA, you agree to pay the full
              rental price, platform fees, shipping costs, and insurance.
            </li>
            <li>
              You must book your rental at least 2 days in advance of your event
              date.
            </li>
            <li>
              You are responsible for selecting the correct rental dates, size,
              and delivery or pickup option.
            </li>
          </ul>
        </section>

        {/* 2. Shipping & Delivery */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            2. Shipping & Delivery
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Outbound shipping is $10, paid at checkout.</li>
            <li>
              Return shipping is included — we provide a prepaid return label,
              which you must print and attach for return.
            </li>
            <li>
              You are responsible for returning the item on or before the
              agreed-upon return date. Late returns may incur additional
              charges.
            </li>
          </ul>
        </section>

        {/* 3. Local Pickup Terms */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            3. Local Pickup Terms
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              If you select local pickup, you agree to either drop the item back
              off or pay $10 for return shipping at checkout.
            </li>
            <li>
              Try-ons are permitted at pickup. If the item is unsuitable, you
              may swap the item or request a credit toward your next rental.
              Refunds are not guaranteed.
            </li>
            <li>
              Once the item has left the premises, the booking is confirmed and
              considered non-refundable.
            </li>
          </ul>
        </section>

        {/* 4. Payment & Fees */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            4. Payment & Fees
          </h2>
          <p className="text-gray-600 mb-3">
            In addition to the rental cost, the following charges apply:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>$10 platform fee</li>
            <li>$5 insurance</li>
            <li>$10 outbound shipping</li>
            <li>$15 for 5-day rentals (optional)</li>
          </ul>
          <p className="text-gray-600 mt-3">
            Payments are processed securely via our third-party payment
            provider.
          </p>
        </section>

        {/* 5. ID Verification */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            5. ID Verification
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              You must verify your identity before your first rental to protect
              both you and our lenders.
            </li>
            <li>
              This process may involve submitting ID or completing a secure
              digital verification step.
            </li>
          </ul>
        </section>

        {/* 6. Item Condition & Damage */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            6. Item Condition & Damage
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              Insurance covers minor wear (e.g., makeup or deodorant marks).
            </li>
            <li>
              You are responsible for significant damage (tear, or loss). If
              this occurs, we may charge the payment method on file for the full
              replacement value.
            </li>
            <li>Do not attempt to clean or alter the item yourself.</li>
          </ul>
        </section>

        {/* 7. Returns & Swaps */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            7. Returns & Swaps
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Return an item using the return shipping label.</li>
            <li>
              Size swaps may result in late fees or need to rent a second item
              if the first item is unavailable.
            </li>
            <li>
              Late returns will incur a fee of $15 per day if the item is
              unavailable.
            </li>
          </ul>
        </section>

        {/* 8. Disputes */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            8. Disputes
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              If you receive the wrong item, or the item arrives damaged,
              contact us within 24 hours of receipt.
            </li>
            <li>
              Disputes will be handled by our platform support team in
              collaboration with the lender.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
