import React from 'react'

export default function LenderTermsConditions() {
  return (
    <div className="min-h-screen container mx-auto px-8 py-12 font-avenir">
      {/* Header */}
      <div className="text-center space-y-5 mb-12">
        <h1 className="text-3xl tracking-[0.35rem] uppercase font-normal text-gray-900">
          Lender Terms & Conditions
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-10 text-gray-800 font-inter leading-[30px] tracking-[.08em] font-light">
        {/* 1. Eligibility */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            1. Eligibility
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              To list on MUSE GALA, you must be a registered business with a
              minimum of 10 different items available for rent.
            </li>
            <li>
              You must agree to keep your availability calendar updated and
              respond to bookings promptly.
            </li>
          </ul>
        </section>

        {/* 2. Listings & Approval */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            2. Listings & Approval
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              All listings must be submitted for admin approval before going
              live.
            </li>
            <li>
              Dress descriptions, pricing, and availability must be accurate.
            </li>
            <li>
              Photos must be high quality and reflect the true state of the
              item.
            </li>
          </ul>
        </section>

        {/* 3. Availability & Declines */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            3. Availability & Declines
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              If a dress is booked outside of the platform, you must immediately
              update its availability on your dashboard.
            </li>
            <li>
              If you are selected for an order, you must accept or decline
              within 6 hours. If declined, the booking is automatically
              reassigned to another lender.
            </li>
          </ul>
        </section>

        {/* 4. Communication */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            4. Communication
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              You may only see the customer&apos;s first name and surname
              initial.
            </li>
            <li>
              You may contact them via the platform messaging system (e.g., for
              pickup coordination).
            </li>
          </ul>
        </section>

        {/* 5. Fulfillment Responsibilities */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            5. Fulfillment Responsibilities
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              For shipped orders, you are responsible for packaging and
              dispatching the item promptly.
            </li>
            <li>
              For local pickups, you must provide clear pickup instructions and
              confirm return in the system once received back.
            </li>
          </ul>
        </section>

        {/* 6. Payouts */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            6. Payouts
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              Payouts are processed fortnightly to your registered payment
              method.
            </li>
            <li>
              During the 0% commission launch period, no deductions will be made
              (only for the rental of the item).
            </li>
            <li>
              MUSE GALA may deduct insurance-related or dispute-based costs if
              applicable.
            </li>
          </ul>
        </section>

        {/* 7. Disputes & Risk */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            7. Disputes & Risk
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              If an item is returned damaged, or not returned at all, report the
              issue via your dashboard.
            </li>
            <li>
              MUSE GALA will mediate disputes and may charge the
              customer&lsquo;s payment method on your behalf.
            </li>
            <li>
              You must not request payment directly from the customer outside of
              the platform.
            </li>
          </ul>
        </section>

        {/* 8. Platform Usage */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            8. Platform Usage
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              You may not redirect customers away from MUSE GALA or encourage
              off-platform bookings.
            </li>
            <li>Abuse of the platform may result in removal.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
