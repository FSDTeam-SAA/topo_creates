import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTrendingProducts } from "@/data/product-data";
import HowItWork from "@/components/HowItWork";
import ServiceFeatures from "@/components/ServiceFeatures";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import StyledByYou from "@/components/product/styled_By_You";

export default function Home() {
  const trendingProducts = getTrendingProducts();
  return (
    <>
      <div
        className=" h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/hero.webp)` }}
      >
        <div className="flex justify-center items-center h-full flex-col gap-y-5">
          <h1 className="text-white text-[35px] md:text-[45px] lg:text-[56px] leading-[64px] tracking-[10px] md:tracking-[20px] text-center font-avenir">
            EFFORTLESS FASHION HIRE
          </h1>

          <Button
            variant="link"
            className="underline text-white leading-[20px] tracking-[20%] text-[20px] font-nimbus uppercase"
          >
            <Link href="/login">Browse to Edit</Link>
          </Button>
        </div>
      </div>
      <div className=" bg-white">
        <ProductGrid
          title="TRENDING NOW"
          subtitle="EXPLORE THE EDIT"
          products={trendingProducts}
        />

        {/* FIND YOUR DRESS NEAR YOUr map */}
        <div className="flex flex-col md:flex-row w-full ">
          {/* Text content section */}
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center ">
            <div className="max-w-3xl mx-auto md:mx-0">
              <h1 className=" font-bold tracking-wider mb-6 sub-title">
                FIND YOUR DRESS NEAR YOU
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                Discover rentals ready for pick up. Real time availability.
              </p>
              {/* <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white transition-colors uppercase tracking-wider font-medium py-6 px-8"
          >
            Explore nearby dresses
          </Button> */}
              <Link
                href="#"
                className="inline-block border-b border-black px-6 py-2 text-xl uppercase tracking-widest hover:bg-black hover:text-white"
              >
                Start Listing Today
              </Link>
            </div>
          </div>

          {/* Map section */}
          <div className="w-full md:w-1/2  md:h-auto relative">
            {/* Map image */}
            <Image
              src="/images/Map.png"
              alt="map"
              width={500}
              height={500}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        <HowItWork />
        <ProductGrid
          title="THE MUSE EDIT"
          subtitle="EXPLORE THE EDIT"
          products={trendingProducts}
        />

        <ServiceFeatures />

        {/* style by you  */}

         <StyledByYou/>

        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-9xl">
          {/* Header */}
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest mb-8 sub-title">
              MUSE GALS SAY
            </h1>
            <div className="flex justify-center">
              {/* <Button
                variant="link"
                className="text-black hover:text-gray-700 border-b border-black rounded-none px-0 font-light tracking-wider"
              >
                BROWSE THE EDIT
              </Button> */}
              <Link
                href="#"
                className="inline-block border-b border-black px-6 py-2 text-xl uppercase tracking-widest hover:bg-black hover:text-white"
              >
                BROWSE THE EDIT
              </Link>
            </div>
          </header>

          {/* MUSE GALS SAY */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-24">
            <div className="flex flex-col space-y-4 justify-between min-h-[116px]">
              <p className="text-[18px]  ">
                I found my dress in five minutes — and actually loved everything
                I saw.
              </p>
              <span className="text-[14px] text-gray-600">
                @HIRINGWITHGRACE
              </span>
            </div>

            <div className="flex flex-col space-y-4 justify-between min-h-[116px]">
              <p className="text-[18px]">
                So much easier than chasing DMs. I booked and picked up the next
                day.
              </p>
              <span className="text-xs text-gray-600">@ELLAWEARSDIT</span>
            </div>

            <div className="flex flex-col space-y-4 justify-between min-h-[116px]">
              <p className="text-[18px]">
                I used to scroll 10 pages to find one decent dress. This was
                curated, clean, and just better.
              </p>
              <span className="text-[14px] text-gray-600">@STYLEDBYBAE</span>
            </div>

            <div className="flex flex-col space-y-4 justify-between min-h-[116px]">
              <p className="text-[18px]">
                It feels more like shopping at a boutique than a rental site.
              </p>
              <span className="text-[14px] text-gray-600">@THEFORMALEDIT</span>
            </div>
          </section>

          {/* List With Us */}
          <section className="text-center mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-widest mb-6 sub-title">
              LIST WITH US
            </h2>
            <p className=" text-[18px] mb-8 max-w-2xl mx-auto">
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
                href="#"
                className="inline-block border-b border-black px-6 py-2 text-xl uppercase tracking-widest hover:bg-black hover:text-white"
              >
                BECOME A LENDER
              </Link>
            </div>
          </section>

          {/* Referral */}
          <section className="text-center mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-widest mb-6 sub-title">
              GET $10, GIVE $10
            </h2>
            <p className="text-[18px] mb-8 max-w-2xl mx-auto">
              Get $10 off your first rental when you join. Share your code and
              give friends $10 too.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your-Email@example.com"
                className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 mb-4 sm:mb-0 sm:flex-1"
              />
              <Button variant="ghost" size="icon" className="ml-0 sm:ml-2">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
