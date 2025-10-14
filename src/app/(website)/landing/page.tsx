import HowItWork from '@/components/HowItWork'
// import { ProductGrid } from '@/components/product/product-grid'
import StyledByYou from '@/components/product/styled_By_You'
import ServiceFeatures from '@/components/ServiceFeatures'
import { Button } from '@/components/ui/button'
// import { getTrendingProducts } from '@/data/product-data'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import FindNearDressSection from '../_components/find-near-dress-section'

export default function Home() {
  // const trendingProducts = getTrendingProducts()
  return (
    <div className="space-y-16">
      <div
        className=" h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/Hero_banner.png)` }}
      >
        <div className="flex justify-center items-center h-full flex-col gap-y-5">
          {/* <h1 className="text-white text-[35px] md:text-[45px] lg:text-[56px] leading-[64px] tracking-[10px] md:tracking-[20px] text-center font-avenir">
            EFFORTLESS FASHION HIRE
          </h1> */}

          <Button
            variant="link"
            className="sub-header text-slate-200 mt-[200px] md:text-[24px] lg:text-[36px] font-light leading-[64px] tracking-[.5em]"
          >
            <Link href="/login">EFFORTLESS FASHION HIRE</Link>
          </Button>
        </div>
      </div>
      <div className=" bg-white space-y-16">
        {/* <ProductGrid
          title="TRENDING NOW"
          subtitle="EXPLORE THE EDIT"
          products={trendingProducts}
        /> */}

        {/* FIND YOUR DRESS NEAR YOUr map */}
        <div className="mt-5">
          <FindNearDressSection />
        </div>

        <HowItWork />
        {/* <ProductGrid
          title="THE MUSE EDIT"
          subtitle="EXPLORE THE EDIT"
          products={trendingProducts}
        /> */}

        <ServiceFeatures />

        {/* style by you  */}

        <StyledByYou />

        <div className="container mx-auto  py-8 md:py-12 lg:py-16 space-y-12 md:space-y-24">
          {/* Header */}
          <header className="text-center mb-12 md:mb-16">
            <h1 className="headerClass">MUSE GALS SAY</h1>
            <div className="flex justify-center">
              {/* <Button
                variant="link"
                className="text-black hover:text-gray-700 border-b border-black rounded-none px-0 font-light tracking-wider"
              >
                BROWSE THE EDIT
              </Button> */}
              <Link href="#" className="sub-header">
                BROWSE THE EDIT
              </Link>
            </div>
          </header>

          {/* MUSE GALS SAY */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-24">
            <div className="flex flex-col space-y-4 justify-between min-h-[116px]">
              <p className="text-[16px] font-normal font-inter ">
                I found my dress in five minutes — and actually loved everything
                I saw.
              </p>
              <span className="text-[13px] text-gray-600">
                @HIRINGWITHGRACE
              </span>
            </div>

            <div className="flex flex-col space-y-4 justify-between min-h-[116px]">
              <p className="text-[16px] font-normal font-inter ">
                So much easier than chasing DMs. I booked and picked up the next
                day.
              </p>
              <span className="text-[13px] text-gray-600">@ELLAWEARSDIT</span>
            </div>

            <div className="flex flex-col space-y-4 justify-between min-h-[116px]">
              <p className="text-[16px] font-normal font-inter ">
                I used to scroll 10 pages to find one decent dress. This was
                curated, clean, and just better.
              </p>
              <span className="text-[13px] text-gray-600">@STYLEDBYBAE</span>
            </div>

            <div className="flex flex-col space-y-4 justify-between min-h-[116px]">
              <p className="text-[16px] font-normal font-inter ">
                It feels more like shopping at a boutique than a rental site.
              </p>
              <span className="text-[13px] text-gray-600">@THEFORMALEDIT</span>
            </div>
          </section>

          {/* List With Us */}
          <section className="text-center mb-16">
            <h2 className="headerClass">LIST WITH US</h2>
            <p className=" sub-title max-w-3xl mx-auto mb-8">
              No listing fees. No lock-ins. Just more exposure, more rentals,
              and a seamless dashboard.
            </p>
            <div className="flex justify-center">
              {/* <Button
                variant="link"
                className="text-black hover:text-gray-700 border-b border-black rounded-none px-0 font-light tracking-wider"
              >
                BECOME A LENDER
              </Button> */}

              <Link
                href="/become-lender"
                className="inline-block border-b border-black px-6 py-2 text-[14px] uppercase tracking-widest hover:bg-black hover:text-white"
              >
                BECOME A LENDER
              </Link>
            </div>
          </section>

          {/* Referral */}
          <section className="text-center mb-16 md:mb-24">
            <h2 className="headerClass">GET $10, GIVE $10</h2>
            <p className="sub-title mb-8 max-w-3xl mx-auto">
              Get $10 off your first rental when you join. Share your code and
              give friends $10 too.
            </p>
            <div className="flex relative flex-col sm:flex-row justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email@example.com"
                className="border  border-t-0 border-l-0 border-r-0 border-[#000000]  px-2 py-[10px] mb-4 sm:mb-0 sm:flex-1 outline-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="ml-0 absolute right-0 sm:ml-2"
              >
                <ArrowRight className="h-5 w-6" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
