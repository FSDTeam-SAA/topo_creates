import React from "react";

const page = () => {
  return (
    <div className="container mx-auto px-8 pt-8 pb-24 font-avenir">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-avenir tracking-[0.5rem] text-gray-900 uppercase">
          REFUND POLICY
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-12 text-gray-800 leading-relaxed">
        {/* Introduction */}
        <div className="space-y-4">
          <p>
            Muse Gala operates under a strict no-refund policy for
            change-of-mind bookings, incorrect sizing, or dissatisfaction with
            style. Each garment is reserved exclusively for your selected rental
            period, which means lenders may forgo other bookings once your order
            is confirmed.
          </p>
          <p>
            However, in limited circumstances, a refund or credit may be
            considered. These are outlined below.
          </p>
        </div>

        {/* 1. Eligible Refund Scenarios */}
        <section>
          <h2 className="text-base font-medium mb-6 tracking-wide">
            1. Eligible Refund Scenarios
          </h2>

          <div className="space-y-6 ml-4">
            <div>
              <h3 className="font-bold mb-3">Item Did Not Arrive</h3>
              <ul className="space-y-2 ml-4">
                <li>
                  • If your rental does not arrive by the scheduled rental start
                  date and no suitable replacement can be provided, a full
                  refund will be issued.
                </li>
                <li>• Shipping and insurance fees are non-refundable.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">
                Item Arrived Damaged or Incorrect
              </h3>
              <p className="mb-3 ml-4">
                If the item arrives heavily stained, damaged, unwearable, or is
                not the item or size you ordered, and no suitable alternative is
                available:
              </p>
              <ul className="space-y-2 ml-4">
                <li>
                  • You must notify Muse Gala within 24 hours of delivery or
                  pickup
                </li>
                <li>• Supporting photographic evidence is required</li>
              </ul>
              <p className="mt-3 ml-4">
                Possible outcomes may include:
              </p>
              <ul className="space-y-2 ml-8">
                <li>• A full or partial refund</li>
                <li>• A Muse Gala credit</li>
                <li>• A rescheduled rental</li>
              </ul>
              <p className="mt-3 ml-4">
                Items must be unworn to be eligible. Refunds will not be granted
                for worn items.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-3">
                Booking Canceled by Muse Gala or Lender
              </h3>
              <p className="ml-4">
                If your order is canceled due to availability or other
                unforeseen issues on the part of Muse Gala or the lender, a full
                refund will be processed automatically.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Non-Refundable Scenarios */}
        <section>
          <h2 className="font-medium mb-6 tracking-wide">
            2. Non-Refundable Scenarios
          </h2>
          <p className="mb-4 ml-4">
            Refunds will not be issued in the following circumstances:
          </p>
          <ul className="space-y-2 ml-8">
            <li>• Change of mind after booking</li>
            <li>• Incorrect fit or style preference</li>
            <li>
              • Failure to try on the garment prior to booking (where available)
            </li>
            <li>• The garment was not worn during the rental period</li>
            <li>• Late return or misuse of the item</li>
            <li>
              • Failure to collect the item within the agreed pickup window
            </li>
          </ul>
        </section>

        {/* 3. Refund Processing */}
        <section>
          <h2 className="text-base font-medium mb-6 tracking-wide">
            3. Refund Processing
          </h2>
          <p className="mb-4 ml-4">If a refund is approved:</p>
          <ul className="space-y-2 ml-8">
            <li>• It will be processed within 5–7 business days</li>
            <li>• Funds will be returned to the original payment method</li>
            <li>
              • You will receive confirmation via email once the refund has been
              issued
            </li>
          </ul>
        </section>

        {/* 4. Store Credit */}
        <section>
          <h2 className="font-medium mb-6 tracking-wide">
            4. Store Credit
          </h2>
          <p className="mb-4 ml-4">
            In some situations, customers may opt for store credit instead of a
            refund. Store credits:
          </p>
          <ul className="space-y-2 ml-8">
            <li>• Are valid for 12 months from issue date</li>
            <li>• May be applied to any future Muse Gala rental</li>
            <li>• Are non-transferable and non-refundable once issued</li>
          </ul>
        </section>

        {/* 5. Submitting a Refund Request */}
        <section>
          <h2 className="font-medium mb-6 tracking-wide">
            5. Submitting a Refund Request
          </h2>
          <p className=" mb-4 ml-4">To request a refund:</p>
          <ul className="space-y-2 ml-8">
            <li>
              • Log in to your account and submit a support ticket within 48
              hours of the issue
            </li>
            <li>
              • Include your order number, a detailed explanation, and photos if
              relevant
            </li>
            <li>
              • Muse Gala will respond within 2 business days with an outcome or
              next steps
            </li>
          </ul>
        </section>

        {/* 6. Important Notes */}
        <section>
          <h2 className="font-medium mb-6 tracking-wide">
            6. Important Notes
          </h2>
          <ul className="space-y-3 ml-4">
            <li>
              • Refund approvals are assessed case-by-case, in accordance with
              Muse Gala policies and Australian Consumer Law.
            </li>
            <li>
              • Abuse of the refund process or excessive refund requests may
              result in account restrictions.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default page;
