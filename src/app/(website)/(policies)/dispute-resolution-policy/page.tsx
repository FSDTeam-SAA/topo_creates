import React from 'react'

export default function DisputeResolutionPolicy() {
  return (
    <div className="min-h-screen container mx-auto px-8 py-12 font-avenir">
      {/* Header */}
      <div className="text-center space-y-5 mb-12">
        <h1 className="text-3xl tracking-[0.35rem] uppercase font-normal text-gray-900">
          Dispute Resolution Policy
        </h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base mx-auto font-light font-inter tracking-[.1em]">
          At Muse Gala, we aim to provide a seamless rental experience for both
          customers and lenders. However, we understand that issues may
          occasionally arise. This Dispute Resolution Policy outlines how
          concerns are managed, how resolutions are determined, and what you can
          expect from us as a neutral facilitator.
        </p>
      </div>

      {/* Policy Content */}
      <div className="space-y-10 text-gray-800 font-inter leading-[30px] tracking-[.08em] font-light">
        {/* Scope of Disputes */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            Scope of Disputes
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              Garment not received or delayed beyond the rental start date
            </li>
            <li>Item received is incorrect, damaged, stained, or unwearable</li>
            <li>Item not returned on time or at all</li>
            <li>
              Garment returned with damage not reported or covered by insurance
            </li>
            <li>Customer or lender non-compliance with platform terms</li>
          </ul>
        </section>

        {/* General Principles */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            General Principles
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              Muse Gala acts as a neutral third party to mediate disputes
              between customers and lenders.
            </li>
            <li>
              We may request supporting evidence (e.g. photos, receipts,
              shipment tracking) to resolve the issue fairly.
            </li>
            <li>
              Both parties are expected to respond to communication in a timely
              and respectful manner.
            </li>
            <li>
              All users agree to the platform’s Terms and Conditions, which
              govern dispute resolution.
            </li>
          </ul>
        </section>

        {/* Dispute Resolution Process */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            Dispute Resolution Process
          </h2>

          <ol className="list-decimal ml-6 space-y-6 text-gray-600">
            <li>
              <span className="font-medium">Step 1: Notify Muse Gala</span>
              <p className="ml-6 mt-1">
                Disputes must be raised within 48 hours of the issue occurring
                (e.g. receiving a damaged item or a late return). Use the
                in-platform support form to submit your claim.
              </p>
            </li>

            <li>
              <span className="font-medium">Step 2: Provide Evidence</span>
              <p className="ml-6 mt-1">
                You may be asked to submit the following:
              </p>
              <ul className="list-disc ml-12 mt-2 space-y-2">
                <li>Clear photographs of the item or packaging</li>
                <li>Screenshots of communication (if relevant)</li>
                <li>Shipping receipts or tracking numbers</li>
                <li>Quotes for repairs or replacement (for lenders)</li>
              </ul>
            </li>

            <li>
              <span className="font-medium">Step 3: Muse Gala Review</span>
              <p className="ml-6 mt-1">
                Our team will assess the case based on:
              </p>
              <ul className="list-disc ml-12 mt-2 space-y-2">
                <li>Provided evidence</li>
                <li>Booking details and timeline</li>
                <li>Platform policies and insurance coverage</li>
              </ul>
              <p className="ml-6 mt-2">
                A resolution is typically provided within 2–5 business days.
              </p>
            </li>

            <li>
              <span className="font-medium">Step 4: Resolution Options</span>
              <p className="ml-6 mt-1">
                Depending on the case, the outcome may include:
              </p>
              <ul className="list-disc ml-12 mt-2 space-y-2">
                <li>Refund or partial refund to the customer</li>
                <li>Reimbursement to the lender</li>
                <li>Use of customer insurance coverage</li>
                <li>Store credit</li>
                <li>Booking cancellation with no penalties</li>
              </ul>
            </li>

            <li>
              <span className="font-medium">
                Step 5: Escalation (if unresolved)
              </span>
              <p className="ml-6 mt-1">
                If either party is dissatisfied with the outcome, they may
                request a formal review. Muse Gala will assign a secondary
                reviewer to reassess the case. Final decisions will be binding.
              </p>
            </li>
          </ol>
        </section>

        {/* Failure to Resolve or Respond */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            Failure to Resolve or Respond
          </h2>
          <p className="text-gray-600 mb-2">
            If a party does not respond within a reasonable timeframe (typically
            48 hours), Muse Gala reserves the right to:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Issue a refund or payout in favor of the responsive party</li>
            <li>
              Restrict platform access or suspend the account for non-compliance
            </li>
          </ul>
        </section>

        {/* Important Notes */}
        <section>
          <h2 className="font-light text-lg tracking-[.1em] text-gray-900 mb-3">
            Important Notes
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              All decisions are made in alignment with Muse Gala’s platform
              policies and Australian Consumer Law
            </li>
            <li>
              Customers and lenders are expected to act in good faith and
              provide truthful, timely information
            </li>
            <li>
              Fraudulent claims or abuse of the dispute process may result in
              account termination
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
