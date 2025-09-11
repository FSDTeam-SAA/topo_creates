import React from 'react'

export default function DisputeResolution() {
  return (
    <div className="min-h-screen container mx-auto px-8 py-12 font-avenir">
      {/* Header */}
      <div className="text-center space-y-5 mb-12">
        <h1 className="text-3xl tracking-[0.35rem] uppercase font-normal text-gray-900">
          Dispute Resolution
        </h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto font-light">
          A streamlined dispute resolution process aligned with insurance,
          damage, and loss policies — designed for fairness, transparency, and
          timely outcomes.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-10 text-gray-800 leading-relaxed font-light">
        <ul className="list-disc ml-6 space-y-3">
          <li>
            <span className="font-normal">Confirm Insurance Coverage</span>
            <ul className="list-disc ml-6 mt-2 space-y-2 font-light text-gray-600">
              <li>
                If insurance was added → platform payout logic applies; customer
                not charged.
              </li>
              <li>
                If no insurance → customer charged based on lender-set fees or
                admin decision.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-normal">Identify Dispute Type</span>
            <p className="ml-6 mt-2 text-gray-600">
              Disputes are categorized by the initiating party (customer or
              lender). Required inputs may include photo evidence, booking
              history, or timestamps.
            </p>
          </li>

          <li>
            <span className="font-normal">
              Automated Flagging or Manual Review
            </span>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-600">
              <li>AI pre-screens disputes where automation is available.</li>
              <li>
                Examples: automatic $30 payout for insured minor damage, lost
                item fees if bookings show no return.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-normal">Admin Decision Review</span>
            <p className="ml-6 mt-2 text-gray-600">
              Admin reviews booking details, insurance status, submitted
              evidence, lender fees, and account history before making a final
              decision.
            </p>
          </li>

          <li>
            <span className="font-normal">Admin Resolution Actions</span>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-600">
              <li>
                Possible outcomes include platform payout, customer fee, store
                credit, partial refund, or escalation.
              </li>
              <li>
                Every dispute must be logged with internal notes summarizing the
                decision.
              </li>
            </ul>
            <p className="ml-6 mt-3 text-sm italic text-gray-500">
              Example note: “Approved $30 payout to lender under insurance
              policy. Stain confirmed via evidence. Customer not charged.”
            </p>
          </li>

          <li>
            <span className="font-normal">Automation Opportunities</span>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-600">
              <li>Auto-resolution for insured minor damages</li>
              <li>Email templates for quicker communication</li>
              <li>
                Automatic escalation if no admin action is taken within 3 days
              </li>
            </ul>
          </li>
        </ul>

        <p className="font-normal text-gray-900 border-t pt-4">
          Summary — A clear, fair workflow for resolving conflicts across the
          Muse Gala platform, ensuring transparency and platform protection.
        </p>
      </div>
    </div>
  )
}
