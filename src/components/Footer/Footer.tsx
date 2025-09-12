'use client'
import { ArrowRight, Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
// import { useState } from 'react'
import { FaTiktok } from 'react-icons/fa6'
// import CustomerTermsConditionsDialog from '../tmc/customer-terms-conditions-dialog'
// import LenderTermsConditions from '../tmc/lender -terms-Conditions'
import { Button } from '../ui/button'

const Footer = () => {
  // const [open, setOpne] = useState(false)
  // const [open1, setOpne1] = useState(false)
  return (
    <footer className="w-full  bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* CUSTOMER SECTION */}
          <div className="space-y-4">
            <h3 className="text-[18px] font-medium tracking-wider">CUSTOMER</h3>
            <nav className="flex flex-col space-y-2 text-[14px]">
              <Link
                href="/how-it-works/#faq"
                className="text-gray-600 hover:text-gray-900"
              >
                FAQ
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-600 avenir-text hover:text-gray-900"
              >
                How It Works
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
              <Link
                href="/refund-policy"
                className="text-gray-600 hover:text-gray-900"
              >
                Refund Policy
              </Link>
              <Link
                href="/insurance-policy"
                className="text-gray-600 hover:text-gray-900"
              >
                Insurance Policy
              </Link>
              <Link
                href="/dispute-resolution-policy"
                className="text-gray-600 hover:text-gray-900"
              >
                Dispute Resolution Policy
              </Link>
            </nav>
          </div>

          {/* LENDERS SECTION */}
          <div className="space-y-4">
            <h3 className="text-[18px] font-medium tracking-wider">LENDERS</h3>
            <nav className="flex flex-col space-y-2 text-[14px]">
              <Link
                href="/become-lender"
                className="text-gray-600 hover:text-gray-900"
              >
                Become a Lender
              </Link>
              <Link
                href="lender-faq"
                className="text-gray-600 hover:text-gray-900"
              >
                Lender FAQ
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Lender Login
              </Link>
              <Link
                // onClick={() => setOpne(true)}
                href="lender-terms-and-conditions"
                className="text-gray-600 hover:text-gray-900"
              >
                Lender Terms & Conditions
              </Link>
              {/* <LenderTermsConditions open={open} setOpen={setOpne} /> */}
            </nav>
          </div>

          {/* COMPANY SECTION */}
          <div className="space-y-4">
            <h3 className="text-[18px] font-medium tracking-wider">COMPANY</h3>
            <nav className="flex flex-col space-y-2 text-[14px]">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="terms-and-conditions"
                className="text-gray-600 hover:text-gray-900"
              >
                Terms & Conditions
              </Link>
              {/* <CustomerTermsConditionsDialog open={open1} setOpen={setOpne1} /> */}
              <Link
                href="/dispute-resolution"
                className="text-gray-600 hover:text-gray-900"
              >
                Dispute Resolution
              </Link>
              <Link
                href="/refund-policy"
                className="text-gray-600 hover:text-gray-900"
              >
                Refund Policy
              </Link>
            </nav>
          </div>

          {/* STAY CONNECTED SECTION */}
          <div className="space-y-4">
            <h3 className="text-[18px] font-medium tracking-wider">
              STAY CONNECTED
            </h3>
            <div className="flex space-x-4 ">
              <Link
                href="#"
                aria-label="Facebook"
                className="text-gray-600 hover:text-gray-900"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-gray-900"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                aria-label="TikTok"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaTiktok className="h-6 w-6" />
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 text-[15px]">
                Subscribe to our newsletter
              </p>
              <div className="flex relative flex-col sm:flex-row justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Email@example.com"
                  className="border  border-t-0 border-l-0 border-r-0 border-[#000000] text-[14px]  px-2 py-[10px] mb-4 sm:mb-0 sm:flex-1 outline-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-0 absolute right-0 sm:ml-2"
                >
                  <ArrowRight className="h-5 w-6" />
                </Button>
              </div>
              <p className="text-[12px] text-gray-500">
                By subscribing, you agree to our{' '}
                <Link href="#" className="text-gray-700 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* LOGO AND PAYMENT METHODS */}
        <div className="mt-12 flex flex-col items-center justify-between space-y-6  pt-8 md:flex-row md:space-y-0 relative pb-10">
          <div className="flex flex-col gap-y-10 items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex space-x-4 mb-10 md:mb-0">
              <Image
                src="/images/footer/amex.svg"
                alt="Mastercard"
                width={30}
                height={30}
                className="h-5 w-auto"
              />
              <Image
                src="/images/footer/apple.svg"
                alt="American Express"
                width={30}
                height={30}
                className="h-5 w-auto"
              />
              <Image
                src="/images/footer/gpay.svg"
                alt="Apple Pay"
                width={30}
                height={30}
                className="h-5 w-auto"
              />
              <Image
                src="/images/footer/payoneer.svg"
                alt="Google Pay"
                width={30}
                height={30}
                className="h-5 w-auto"
              />
            </div>
          </div>

          <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 my-5">
            <div>
              <Image
                src={'/logo-black.svg'}
                width={300}
                height={300}
                alt="logo"
                className="w-12 h-12"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[16px] font-light">MUSE GALA</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <p className="text-center border-t border-gray-600  py-4 text-[14px]">
        © MUSE GALA 2025
      </p>
    </footer>
  )
}

export default Footer
