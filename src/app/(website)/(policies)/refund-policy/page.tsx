import React from 'react'

export default function Page() {
  return (
    <div className="min-h-screen container mx-auto px-8 py-12 pt-[100px] font-avenir">
      {/* Header */}
      <div className="text-center space-y-5 mb-12">
        <h1 className="text-3xl tracking-[0.35rem] uppercase font-normal text-gray-900">
          Refund Policy
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-10 text-gray-800 font-inter leading-[30px] tracking-[.08em] font-light">
        {/* Introduction */}
        <div className="space-y-4">
          <p className="text-gray-600">
            Muse Gala operates under a strict no-refund policy for
            change-of-mind bookings, incorrect sizing, or dissatisfaction with
            style. Each garment is reserved exclusively for your selected rental
            period, which means lenders may forgo other bookings once your order
            is confirmed.
          </p>
          <p className="text-gray-600">
            However, in limited circumstances, a refund or credit may be
            considered. These are outlined below.
          </p>
        </div>

        {/* 1. Eligible Refund Scenarios */}
        <section>
          <h2 className="text-lg font-light tracking-[.1em] mb-4">
            1. Eligible Refund Scenarios
          </h2>
          <div className="space-y-6 ml-6">
            <div>
              <h3 className="font-normal mb-2">Item Did Not Arrive</h3>
              <ul className="list-disc ml-6 text-gray-600 space-y-2">
                <li>
                  If your rental does not arrive by the scheduled rental start
                  date and no suitable replacement can be provided, a full
                  refund will be issued.
                </li>
                <li>Shipping and insurance fees are non-refundable.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-normal mb-2">
                Item Arrived Damaged or Incorrect
              </h3>
              <p className="ml-6 text-gray-600 mb-2">
                If the item arrives heavily stained, damaged, unwearable, or is
                not the item or size you ordered, and no suitable alternative is
                available:
              </p>
              <ul className="list-disc ml-12 text-gray-600 space-y-2">
                <li>You must notify Muse Gala within 24 hours of delivery</li>
                <li>Supporting photographic evidence is required</li>
              </ul>
              <p className="ml-6 text-gray-600 mt-3">Possible outcomes:</p>
              <ul className="list-disc ml-12 text-gray-600 space-y-2">
                <li>A full or partial refund</li>
                <li>A Muse Gala credit</li>
                <li>A rescheduled rental</li>
              </ul>
              <p className="ml-6 text-gray-600 mt-3">
                Items must be unworn to be eligible. Refunds will not be granted
                for worn items.
              </p>
            </div>

            <div>
              <h3 className="font-normal mb-2">
                Booking Canceled by Muse Gala or Lender
              </h3>
              <p className="ml-6 text-gray-600">
                If your order is canceled due to availability or unforeseen
                issues on the part of Muse Gala or the lender, a full refund
                will be processed automatically.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Non-Refundable Scenarios */}
        <section>
          <h2 className="text-lg font-light tracking-[.1em] mb-4">
            2. Non-Refundable Scenarios
          </h2>
          <p className="ml-6 text-gray-600 mb-2">
            Refunds will not be issued in the following cases:
          </p>
          <ul className="list-disc ml-12 text-gray-600 space-y-2">
            <li>Change of mind after booking</li>
            <li>Incorrect fit or style preference</li>
            <li>Failure to try on garment before booking (if available)</li>
            <li>The garment was not worn during the rental period</li>
            <li>Late return or misuse of the item</li>
            <li>Failure to collect the item within the pickup window</li>
          </ul>
        </section>

        {/* 3. Refund Processing */}
        <section>
          <h2 className="text-lg font-light tracking-[.1em] mb-4">
            3. Refund Processing
          </h2>
          <p className="ml-6 text-gray-600 mb-2">If a refund is approved:</p>
          <ul className="list-disc ml-12 text-gray-600 space-y-2">
            <li>It will be processed within 5–7 business days</li>
            <li>Funds returned to the original payment method</li>
            <li>Email confirmation once refund is issued</li>
          </ul>
        </section>

        {/* 4. Store Credit */}
        <section>
          <h2 className="text-lg font-light tracking-[.1em] mb-4">
            4. Store Credit
          </h2>
          <p className="ml-6 text-gray-600 mb-2">
            Customers may opt for store credit instead of a refund. Store
            credits:
          </p>
          <ul className="list-disc ml-12 text-gray-600 space-y-2">
            <li>Valid for 12 months from issue date</li>
            <li>Applicable to any Muse Gala rental</li>
            <li>Non-transferable & non-refundable once issued</li>
          </ul>
        </section>

        {/* 5. Submitting a Refund Request */}
        <section>
          <h2 className="text-lg font-light tracking-[.1em] mb-4">
            5. Submitting a Refund Request
          </h2>
          <p className="ml-6 text-gray-600 mb-2">To request a refund:</p>
          <ul className="list-disc ml-12 text-gray-600 space-y-2">
            <li>
              Log in to your account and submit a support ticket within 48 hours
            </li>
            <li>Include order number, explanation, and photos if relevant</li>
            <li>Muse Gala responds within 2 business days</li>
          </ul>
        </section>

        {/* 6. Important Notes */}
        <section>
          <h2 className="text-lg font-light tracking-[.1em] mb-4">
            6. Important Notes
          </h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>
              Refunds are case-by-case, aligned with Muse Gala policies &
              Australian Consumer Law.
            </li>
            <li>
              Abuse of the refund process or excessive requests may result in
              account restrictions.
            </li>
          </ul>
        </section>

        {/* Summary */}
        <p className="font-light font-inter text-sm tracking-[0.1em] text-gray-800 border-t pt-4">
          Summary — Muse Gala maintains a fair refund process that balances
          customer protection with lender commitments.
        </p>
      </div>
    </div>
  )
}
