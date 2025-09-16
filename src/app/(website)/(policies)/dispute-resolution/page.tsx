// src/app/dispute-resolution/page.tsx
import React from 'react'
import PolicyLayout from '@/components/policies/PolicyLayout'

export default function DisputeResolutionPage() {
  return (
    <PolicyLayout
      title="Dispute Resolution"
      description="A streamlined dispute resolution process aligned with insurance, damage, and loss policies — designed for fairness, transparency, and timely outcomes."
    >
      <ul className="list-disc ml-6 space-y-3 ">
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
              Examples: automatic $30 payout for insured minor damage, lost item
              fees if bookings show no return.
            </li>
          </ul>
        </li>

        <li>
          <span className="font-normal">Admin Decision Review</span>
          <p className="ml-6 mt-2 text-gray-600">
            Admin reviews booking details, insurance status, submitted evidence,
            lender fees, and account history before making a final decision.
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
            Example note: “Approved $30 payout to lender under insurance policy.
            Stain confirmed via evidence. Customer not charged.”
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
        Summary — A clear, fair workflow for resolving conflicts across the Muse
        Gala platform, ensuring transparency and platform protection.
      </p>
    </PolicyLayout>
  )
}
