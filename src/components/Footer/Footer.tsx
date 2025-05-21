'use client'
import { Facebook, Instagram, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import LenderTermsConditions from '../tmc/lender -terms-Conditions'
import CustomerTermsConditionsDialog from '../tmc/customer-terms-conditions-dialog'
import { FaTiktok } from "react-icons/fa6";


const Footer = () => {
  const [open,setOpne] = useState(false)
  const [open1,setOpne1] = useState(false)
  return (
    <footer className="w-full  bg-white">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* CUSTOMER SECTION */}
        <div className="space-y-4">
          <h3 className="text-[25px] lg:text-[30px] font-medium tracking-wider">CUSTOMER</h3>
          <nav className="flex flex-col space-y-2 text-xl">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              How It Works
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Return Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Insurance Policy
            </Link>
          </nav>
        </div>

        {/* LENDERS SECTION */}
        <div className="space-y-4">
          <h3 className="text-[25px] lg:text-[30px] font-medium tracking-wider">LENDERS</h3>
          <nav className="flex flex-col space-y-2 text-xl">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Become a Lender
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Lender FAQ
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Lender Login
            </Link>
            <Link onClick={()=>setOpne(true)} href="" className="text-gray-600 hover:text-gray-900">
              Lender Terms & Conditions
            </Link>
            <LenderTermsConditions open={open} setOpen={setOpne}/>
          </nav>
        </div>

        {/* COMPANY SECTION */}
        <div className="space-y-4">
          <h3 className="text-[25px] lg:text-[30px] font-medium tracking-wider">COMPANY</h3>
          <nav className="flex flex-col space-y-2 text-xl">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link onClick={()=>setOpne1(true)} href="" className="text-gray-600 hover:text-gray-900">
              Terms & Conditions
            </Link>
            <CustomerTermsConditionsDialog open={open1} setOpen={setOpne1}/>
            <Link  href="#" className="text-gray-600 hover:text-gray-900">
              Dispute Resolution
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Refund Policy
            </Link>
          </nav>
        </div>

        {/* STAY CONNECTED SECTION */}
        <div className="space-y-4">
          <h3 className="text-[25px] lg:text-[30px] font-medium tracking-wider">STAY CONNECTED</h3>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-900">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-900">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="TikTok" className="text-gray-600 hover:text-gray-900">
              <FaTiktok className="h-6 w-6"/>
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 text-xl">Subscribe to our newsletter</p>
            <div className="flex">
              <Input type="email" placeholder="your-Email@example.com" className="rounded-r-none border-r-0" />
              <button
                type="button"
                aria-label="Subscribe"
                className="flex items-center justify-center rounded-l-none rounded-r-md border border-gray-300 bg-white px-3 hover:bg-gray-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              By subscribing, you agree to our{" "}
              <Link href="#" className="text-gray-700 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* LOGO AND PAYMENT METHODS */}
      <div className="mt-12 flex flex-col items-center justify-between space-y-6  pt-8 md:flex-row md:space-y-0">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex space-x-4">
          <Image src="/images/amex.png" alt="Mastercard" width={50} height={30} className="h-8 w-auto" />
            <Image
              src="/images/ipay.png"
              alt="American Express"
              width={50}
              height={30}
              className="h-8 w-auto"
            />
            <Image src="/images/gpay.png" alt="Apple Pay" width={50} height={30} className="h-8 w-auto" />
            <Image src="/images/pay.png" alt="Google Pay" width={50} height={30} className="h-8 w-auto" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div>
            <Image src={'/logos/Logo_black.png'} width={500} height={500} alt='logo' className='w-16 h-16'/>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">MUSE GALA</span>
          </div>
          
        </div>
        <div>

        </div>
      </div>
    </div>
    <p className='text-center border-t border-gray-700 py-4'>© MUSE GALA 2025</p>
  </footer>
  )
}

export default Footer
