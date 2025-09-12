// src/app/insurance-policy/page.tsx
import React from 'react'
import PolicyLayout from '@/components/policies/PolicyLayout'

export default function InsurancePolicyPage() {
  return (
    <PolicyLayout
      title="Insurance Policy"
      description="Muse Gala is committed to protecting both our valued customers and lending partners. This insurance policy offers peace of mind for renters in the event of accidental damage, while giving lenders confidence that their garments are supported."
    >
      {/* Intro continuation */}
      <p>
        Below is a clear overview of what is covered, how damage is classified,
        and how reimbursements are processed.
      </p>

      {/* 1. Insurance Coverage */}
      <section>
        <h2 className="text-base font-medium mb-6 tracking-wide">
          1. Insurance Coverage
        </h2>
        <div className="space-y-6 ml-4">
          <div>
            <h3 className="font-bold mb-3">Optional Insurance Fee</h3>
            <p className="ml-4">
              Customers have the option to add insurance during checkout for a
              $5 flat fee per item. This provides coverage for common minor
              issues and select major damage events that may occur during the
              rental period.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">What the $5 Insurance Covers</h3>
            <ul className="space-y-2 ml-8 list-disc">
              <li>Minor stains (e.g. makeup, light food or wine)</li>
              <li>Broken zippers, hooks, or buttons</li>
              <li>Loose threads or small seam repairs</li>
              <li>Surface dust, pilling, or deodorant marks</li>
              <li>Wrinkling or creasing that requires steaming</li>
              <li>
                Select major issues (e.g. large tears or deep stains), subject
                to case-by-case review and approval
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">What Insurance Does Not Cover</h3>
            <ul className="space-y-2 ml-8 list-disc">
              <li>Lost, stolen, or unreturned items</li>
              <li>Total destruction or deliberate misuse</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">
              Definition of Total Destruction or Misuse
            </h3>
            <ul className="space-y-2 ml-8 list-disc">
              <li>Burned, shredded, or melted garments</li>
              <li>Permanent dye or ink stains</li>
              <li>Items significantly resized or altered</li>
              <li>
                Garments rendered unwearable due to neglect, improper
                laundering, or mistreatment
              </li>
            </ul>
            <p className="mt-3 ml-4">
              If the customer does not purchase insurance, they accept full
              financial responsibility for any damage or loss as determined by
              the lender and Muse Gala.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Damage Fee Structure */}
      <section>
        <h2 className="font-medium mb-6 tracking-wide">
          2. Damage Fee Structure
        </h2>
        <div className="space-y-6 ml-4">
          {/* Minor Damage */}
          <div>
            <h3 className="font-bold mb-3">Minor Damage</h3>
            <p className="ml-4">
              Defined as cosmetic or repairable issues that do not affect the
              structural integrity or resale value of the item.
            </p>
            <p className="mt-3 ml-4">Examples include:</p>
            <ul className="space-y-2 ml-8 list-disc">
              <li>Light stains (e.g. makeup or wine)</li>
              <li>Broken zippers, hooks, or buttons</li>
              <li>Loose threads or minor seam splits</li>
              <li>Small snags or pilling</li>
              <li>Wrinkles or creasing requiring steaming</li>
            </ul>

            <p className="mt-3 ml-4">If insurance was purchased:</p>
            <ul className="space-y-2 ml-8 list-disc">
              <li>A $30 flat payout is issued automatically to the lender</li>
              <li>
                If repairs exceed $30, lenders may submit a valid receipt for
                additional reimbursement:
              </li>
            </ul>

            <div className="ml-8">
              <p className="font-medium mt-3">
                RRP of Item → Maximum Additional Reimbursement
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Under $200 → Up to $50</li>
                <li>$200–$400 → Up to $60</li>
                <li>Over $400 → Up to $75</li>
              </ul>
            </div>

            <p className="mt-3 ml-4">If insurance was not purchased:</p>
            <p className="ml-8">
              The customer will be charged the lender’s pre-set minor damage
              fee, as outlined in the booking agreement.
            </p>
          </div>

          {/* Major Damage */}
          <div>
            <h3 className="font-bold mb-3">Major Damage</h3>
            <p className="ml-4">
              Defined as unrepairable or extensive damage that impacts the
              item’s structure, wearability, or value.
            </p>
            <p className="mt-3 ml-4">Examples include:</p>
            <ul className="space-y-2 ml-8 list-disc">
              <li>
                Deep or permanent stains (e.g. ink, red wine, dye transfer)
              </li>
              <li>Large rips, tears, or holes</li>
              <li>Structural damage (e.g. boning, inner lining, fastenings)</li>
              <li>Burn marks, melting, or shrinkage from heat</li>
              <li>
                Alterations that affect the garment’s intended fit or design
              </li>
            </ul>

            <p className="mt-3 ml-4">If insurance was purchased:</p>
            <ul className="space-y-2 ml-8 list-disc">
              <li>
                The lender must submit photographic evidence and a repair quote
                or replacement receipt
              </li>
              <li>
                Muse Gala will review and may approve reimbursement up to:
              </li>
            </ul>

            <div className="ml-8">
              <p className="font-medium mt-3">
                RRP of Item → Maximum Reimbursement
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Under $300 → Up to $100</li>
                <li>$300–$600 → Up to $150</li>
                <li>Over $600 → Up to $200</li>
              </ul>
            </div>

            <p className="mt-3 ml-4">If insurance was not purchased:</p>
            <p className="ml-8">
              The customer will be charged either the full repair cost, the
              lender’s major damage fee, or the full replacement value,
              depending on the extent of the damage.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Claims Process */}
      <section>
        <h2 className="font-medium mb-6 tracking-wide">3. Claims Process</h2>
        <p className="mb-4 ml-4">
          Lenders must submit a claim within 48 hours of receiving the returned
          item. Claims should include:
        </p>
        <ul className="space-y-2 ml-8 list-disc">
          <li>Clear images of the damage</li>
          <li>
            A valid repair quote or replacement invoice (for major damage)
          </li>
        </ul>
        <p className="mt-3 ml-4">
          Muse Gala will review the evidence and process any approved payouts
          within 5 business days.
        </p>
      </section>

      {/* 4. Additional Notes */}
      <section>
        <h2 className="font-medium mb-6 tracking-wide">4. Additional Notes</h2>
        <ul className="space-y-3 ml-4 list-disc">
          <li>
            The $5 insurance fee is non-refundable once a booking is confirmed
          </li>
          <li>
            Repeated garment misuse may result in customer account suspension
          </li>
          <li>
            Muse Gala reserves the right to reject any fraudulent or excessive
            claims
          </li>
          <li>All amounts are listed in Australian Dollars (AUD)</li>
        </ul>
      </section>
    </PolicyLayout>
  )
}
