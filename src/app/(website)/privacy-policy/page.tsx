import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen container mx-auto px-8 py-12 font-avenir">
      {/* Header */}
      <div className="text-center space-y-5 mb-12">
        <h1 className="text-3xl tracking-[0.35rem] uppercase font-normal text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base mx-auto font-light">
          Muse Gala respects your privacy and is committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your data, in compliance with the
          Australian Privacy Principles under the Privacy Act 1988 (Cth).
        </p>
      </div>

      {/* Content */}
      <div className="space-y-10 text-gray-800 leading-relaxed font-light">
        <ul className="list-disc ml-6 space-y-6">
          <li>
            <span className="font-normal">Information We Collect</span>
            <p className="ml-6 mt-2 text-gray-600">
              We collect personal details such as name, email, phone, billing
              and shipping address, account credentials, and payment
              information. Lenders may also provide business details, ABNs, and
              payout information. Technical data such as IP address, device,
              browser, and usage patterns are also collected via cookies and
              analytics.
            </p>
          </li>

          <li>
            <span className="font-normal">Use of Information</span>
            <p className="ml-6 mt-2 text-gray-600">
              Your data is used to provide services, process payments, fulfill
              bookings, improve platform performance, manage accounts, and
              ensure security. With your consent, it may also be used for
              marketing updates and promotional offers.
            </p>
          </li>

          <li>
            <span className="font-normal">Disclosure of Information</span>
            <p className="ml-6 mt-2 text-gray-600">
              Information may be shared with trusted third-party providers (e.g.
              payment processors, couriers, technical support) only as required.
              If mandated by law, data may be shared with government
              authorities. We do not sell or rent personal information to third
              parties.
            </p>
          </li>

          <li>
            <span className="font-normal">Data Security</span>
            <p className="ml-6 mt-2 text-gray-600">
              We apply reasonable measures to protect data against unauthorized
              access, misuse, or loss. Payments are processed via secure,
              PCI-compliant gateways and not stored on our servers. Only
              authorised staff may access personal information.
            </p>
          </li>

          <li>
            <span className="font-normal">Data Retention</span>
            <p className="ml-6 mt-2 text-gray-600">
              Data is retained only as long as required for service or legal
              obligations. Once no longer necessary, it is securely deleted or
              anonymised.
            </p>
          </li>

          <li>
            <span className="font-normal">Marketing Communications</span>
            <p className="ml-6 mt-2 text-gray-600">
              You may opt in to receive updates and offers from Muse Gala and
              unsubscribe at any time. Transactional communications (e.g.
              confirmations, delivery updates) will always be sent.
            </p>
          </li>

          <li>
            <span className="font-normal">Cookies and Website Analytics</span>
            <p className="ml-6 mt-2 text-gray-600">
              Cookies are used to enhance experience, track performance, and
              deliver personalised content. Blocking cookies may limit
              functionality.
            </p>
          </li>

          <li>
            <span className="font-normal">Access and Correction</span>
            <p className="ml-6 mt-2 text-gray-600">
              You may access or update your information anytime via your
              account. For corrections, contact us and we will respond within a
              reasonable timeframe.
            </p>
          </li>

          <li>
            <span className="font-normal">Third-Party Links</span>
            <p className="ml-6 mt-2 text-gray-600">
              Our platform may link to third-party sites. Muse Gala is not
              responsible for their privacy practices and encourages you to
              review their policies.
            </p>
          </li>

          <li>
            <span className="font-normal">Policy Updates</span>
            <p className="ml-6 mt-2 text-gray-600">
              We may update this Privacy Policy from time to time. Changes will
              be posted here with an updated effective date. Continued use of
              the platform constitutes acceptance of revised terms.
            </p>
          </li>

          <li>
            <span className="font-normal">Contact</span>
            <p className="ml-6 mt-2 text-gray-600">
              For privacy-related questions or requests, contact us at:
              <br />
              <span className="font-medium">Email:</span>{' '}
              support@musegala.com.au
            </p>
          </li>
        </ul>

        <p className="font-normal text-gray-900 border-t pt-4">
          Summary — Muse Gala is committed to protecting your privacy by
          ensuring transparency, security, and compliance with applicable
          privacy laws.
        </p>
      </div>
    </div>
  )
}
