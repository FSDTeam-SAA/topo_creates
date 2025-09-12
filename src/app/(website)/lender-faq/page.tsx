import React from 'react'

export default function LenderFAQ() {
  return (
    <div className="min-h-screen container mx-auto px-8 py-12 font-avenir">
      {/* Header */}
      <div className="text-center space-y-5 mb-12">
        <h1 className="text-3xl tracking-[0.35rem] uppercase font-normal text-gray-900">
          Lender FAQ
        </h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto font-light font-inter tracking-[.1em]">
          Muse Gala is a curated fashion rental platform that connects boutique
          lenders with style-conscious renters across Australia. Below are
          frequently asked questions from current and prospective lenders.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-10 text-gray-800 font-inter leading-[30px] tracking-[.08em] font-light">
        <ul className="list-decimal ml-6 space-y-8">
          <li>
            <span className="font-light text-lg tracking-[.1em]">
              How do I become a lender?
            </span>
            <p className="ml-6 mt-2 text-gray-600">
              Apply via the{' '}
              <span className="underline">Lender Onboarding Page</span>. Once
              approved, you’ll access your lender dashboard to upload listings,
              manage availability, and begin receiving bookings.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              What are the requirements to list with Muse Gala?
            </span>
            <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-2">
              <li>Operate a verified fashion rental business or boutique</li>
              <li>
                List a minimum of five garments meeting Muse Gala standards
              </li>
              <li>Ensure garments are in excellent, ready-to-rent condition</li>
              <li>Respond to bookings and messages promptly</li>
            </ul>
            <p className="ml-6 mt-2 text-gray-600">
              All listings are reviewed for quality and consistency before
              publication.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              What is the commission structure?
            </span>
            <p className="ml-6 mt-2 text-gray-600">
              Muse Gala operates on a tiered subscription model:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Entry-level plans: ~10% commission per booking</li>
              <li>
                Premium plans: lower or zero commission depending on inclusions
              </li>
            </ul>
            <p className="ml-6 mt-2 text-gray-600">
              Customers also pay a 10% platform fee on top of rental prices (not
              deducted from your earnings). See the subscription plans for full
              details.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              Who pays for shipping?
            </span>
            <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-2">
              <li>Outbound shipping → paid by customer</li>
              <li>
                Return shipping → covered by lender or Muse Gala depending on
                subscription
              </li>
            </ul>
            <p className="ml-6 mt-2 text-gray-600">
              Local pickup is also available and coordinated directly through
              platform messaging.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              What if my item is damaged?
            </span>
            <p className="ml-6 mt-2 text-gray-600">
              If the customer purchased insurance:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>
                Flat payout or tiered reimbursement depending on minor vs. major
                damage
              </li>
              <li>
                Claims must be submitted within 48 hours of return with photo
                evidence
              </li>
            </ul>
            <p className="ml-6 mt-2 text-gray-600">
              Without insurance, customers are liable for damage or replacement
              per your set damage fees. See the{' '}
              <span className="underline">Insurance Policy</span> for details.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              What if a garment is lost or stolen?
            </span>
            <p className="ml-6 mt-2 text-gray-600">
              Muse Gala investigates and may charge the customer the full
              replacement value you provided. Accurate replacement values are
              essential.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              When do I get paid?
            </span>
            <p className="ml-6 mt-2 text-gray-600">
              Payouts are processed via direct deposit within 5 business days of
              satisfactory return, provided no disputes or claims are pending.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              Can I decline a booking?
            </span>
            <p className="ml-6 mt-2 text-gray-600">
              Yes, if the item is unavailable or unsuitable. High acceptance
              rates improve visibility and customer trust.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              How do I manage availability?
            </span>
            <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-2">
              <li>Block dates when items are unavailable</li>
              <li>Mark garments out-of-service (e.g. cleaning, repair)</li>
              <li>Update stock levels and listings anytime</li>
            </ul>
            <p className="ml-6 mt-2 text-gray-600">
              Regular updates prevent double bookings and declines.
            </p>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              Can multiple lenders list the same garment?
            </span>
            <p className="ml-6 mt-2 text-gray-600">
              Yes. Our system auto-assigns bookings based on:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Customer proximity</li>
              <li>Availability</li>
              <li>Fair rotation</li>
              <li>Past performance metrics</li>
            </ul>
          </li>

          <li>
            <span className="font-light text-lg tracking-[.1em]">
              What support does Muse Gala provide?
            </span>
            <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-2">
              <li>Personalised dashboard for listings and bookings</li>
              <li>Insurance and dispute resolution coverage</li>
              <li>Support team assistance and claims management</li>
              <li>National visibility to customers seeking curated rentals</li>
            </ul>
          </li>
        </ul>

        <p className="font-light font-inter text-sm tracking-[0.1em] text-gray-800 border-t pt-4">
          Summary — Muse Gala supports lenders with tools, protection, and
          national reach to grow their rental business confidently.
        </p>
      </div>
    </div>
  )
}
