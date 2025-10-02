import Image from 'next/image'
import Link from 'next/link'
import PricingPlan from './pricing-plan'

const BecomeLender = () => {
  return (
    <div>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <div className="container px-4 md:px-6">
            <h1 className="mb-6 text-2xl md:text-4xl font-light tracking-[1rem] font-inter">
              Partner with Muse Gala
            </h1>
            <Link
              href="/become-lender/form"
              className="inline-block border-b border-black px-6 py-2 sub-title text-[12px] font-inter hover:bg-black hover:text-white"
            >
              Start Listing Today
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                  <Image
                    src="/images/pwmg1.png"
                    alt="Trusted Platform"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="mb-2 text-[16px] font-inter uppercase tracking-widest">
                  Trusted Platform
                </h3>
                <p className="text-[13px] text-gray-600">
                  List your dresses on a platform <br /> trusted by thousands of
                  renters.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                  <Image
                    src="/images/pwmg2.png"
                    alt="Wider Audience"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="mb-2 text-[16px] font-inter uppercase tracking-widest">
                  Wider Audience
                </h3>
                <p className="text-[13px] text-gray-600">
                  Expand your reach and <br /> get more bookings.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                  <Image
                    src="/images/pwmg3.png"
                    alt="Seamless Management"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="mb-2 text-[16px] font-inter uppercase tracking-widest">
                  Seamless Management
                </h3>
                <p className="text-[13px] text-gray-600">
                  Manage rentals <br /> with our intuitive tools and support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Expect */}
        <section className="py-12 text-center md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="mb-5  text-3xl font-normal uppercase tracking-widest  sub-title">
              What You Can Expect
            </h2>
            <div className="mx-auto text-[12px] space-y-3">
              <p className="">
                • 80% of listings receive a booking within the first 30 days.
              </p>
              <p>
                • Lenders grow their rental bookings by up to 40% within the
                first 6 months.
              </p>
              <p>
                • 85% of customers prefer booking from curated boutique
                collections.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="mb-10 text-center font-normal uppercase tracking-widest  sub-title">
              How It Works
            </h2>
            <div className="mx-auto max-w-2xl space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex h-8  w-8 flex-shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <span>1</span>
                </div>
                <div>
                  <h3 className="mb-1 text-[16px] font-medium">Sign Up</h3>
                  <p className="text-[14px] text-gray-600">
                    Create your lender account with your business details.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-8  w-8  flex-shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <span>2</span>
                </div>
                <div>
                  <h3 className="mb-1 text-[16px] font-medium">
                    List Your Dresses
                  </h3>
                  <p className="text-[14px] text-gray-600">
                    Upload your inventory with photos, descriptions, and
                    availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-8  w-8  flex-shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <span>3</span>
                </div>
                <div>
                  <h3 className="mb-1 text-[16px] font-medium">
                    Manage Rentals
                  </h3>
                  <p className="text-[14px] text-gray-600">
                    Track bookings, communicate with renters, and receive
                    payment seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support You Can Count On */}
        <section className="py-12 md:py-16">
          <div className="container ">
            <h2 className="mb-10 text-center  font-normal uppercase tracking-widest  sub-title">
              Support You Can Count On
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                  <Image
                    src="/images/become-lendar/sycco1.svg"
                    alt="Dedicated Support"
                    width={54}
                    height={54}
                  />
                </div>
                <h3 className="mb-2 text-[17px] uppercase tracking-widest">
                  Dedicated Support
                </h3>
                <p className="text-[15px] text-gray-600">
                  Our team is here to help you every step from onboarding to
                  daily operations.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                  <Image
                    src="/images/become-lendar/sycco2.svg"
                    alt="Insurance Coverage"
                    width={54}
                    height={54}
                  />
                </div>
                <h3 className="mb-2 text-[17px] uppercase tracking-widest">
                  Insurance Coverage
                </h3>
                <p className="text-[15px] text-gray-600">
                  Optional insurance coverage to protect your dresses against
                  minor accidents.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                  <Image
                    src="/images/become-lendar/sycco3.svg"
                    alt="Dispute Handling"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="mb-2 text-[17px] uppercase tracking-widest">
                  Dispute Handling
                </h3>
                <p className="text-[15px] text-gray-600">
                  We manage disputes and ensure you don&apos;t lose out on
                  getting paid what&apos;s owed.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                  <Image
                    src="/images/sycco4.png"
                    alt="Secure Payments"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="mb-2 text-[17px] uppercase tracking-widest">
                  Secure Payments
                </h3>
                <p className="text-[15px] text-gray-600">
                  Reliable payment processing so you get paid fast and securely
                  after each rental.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <PricingPlan />

        {/* Plan Comparison */}
        <section className="overflow-x-auto py-12 md:py-16">
          <div className="container ">
            <h2 className="mb-10 text-center  font-normal uppercase tracking-widest sub-title">
              Plan Comparison
            </h2>

            <div className="min-w-[768px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="">
                    <th className="py-4 text-left text-lg font-normal"></th>
                    <th className="py-4 text-center text-lg font-normal uppercase">
                      Founder&apos;s Collective
                    </th>
                    <th className="py-4 text-center text-lg font-normal uppercase">
                      Signature
                    </th>
                    <th className="py-4 text-center text-lg font-normal uppercase">
                      Vault Society
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="py-4 text-left text-[15px] font-medium">
                      Perfect For
                    </td>
                    <td className="py-4 text-center text-[14px]">
                      Early boutique getting started
                    </td>
                    <td className="py-4 text-center text-[14px]">
                      Growing to mid-sized boutique
                    </td>
                    <td className="py-4 text-center text-[14px]">
                      Premium, high-volume boutiques
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-4 text-left text-[15px] font-medium">
                      Monthly Fee
                    </td>
                    <td className="py-4 text-center text-[14px]">
                      Free (first 3 months)
                    </td>
                    <td className="py-4 text-center text-[14px]">$49/month</td>
                    <td className="py-4 text-center text-[14px]">$129/month</td>
                  </tr>
                  <tr className="">
                    <td className="py-4 text-left text-[15px] font-medium">
                      Commission
                    </td>
                    <td className="py-4 text-center text-[14px]">0%</td>
                    <td className="py-4 text-center text-[14px]">10%</td>
                    <td className="py-4 text-center text-[14px]">5%</td>
                  </tr>
                  <tr className="">
                    <td className="py-4 text-left text-[15px] font-medium">
                      Return Shipping
                    </td>
                    <td className="py-4 text-center text-[14px]">✕</td>
                    <td className="py-4 text-center text-[14px]">✕</td>
                    <td className="py-4 text-center text-[14px]">
                      Covered by Muse Gala
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-4 text-left text-[15px] font-medium">
                      Events
                    </td>
                    <td className="py-4 text-center text-[14px]">✕</td>
                    <td className="py-4 text-center text-[14px]">
                      Invite Based
                    </td>
                    <td className="py-4 text-center text-[14px]">
                      Guaranteed Invite
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* List With Muse Gala */}
        <section className="py-12 text-center md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="mb-4 text-2xl font-normal uppercase tracking-widest headerClass">
              List With Muse Gala
            </h2>
            <p className="mb-8  sub-title max-w-3xl mx-auto text-gray-600">
              No listing fees. No hidden costs. Just more exposure, more
              rentals, and a seamless dashboard.
            </p>
            <Link
              href="/become-lender/form"
              className="inline-block border-b border-black px-6 py-2 text-[14px] uppercase tracking-widest hover:bg-black hover:text-white"
            >
              Become A Lender
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default BecomeLender
