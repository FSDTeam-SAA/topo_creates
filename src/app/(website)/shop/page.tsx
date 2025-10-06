import HowItWork from '@/components/HowItWork'
import GiveAndTake from '@/components/section/GiveAndTake'
import React from 'react'
import FilterProduct from './_component/FilterProduct'
import AllProduct from './_component/AllProduct'
import { FilterDrawer } from './_component/FilterDrawer'

const page = () => {
  return (
    <div className=" container mx-auto pb-8 pt-[100px]">
      <div className="text-center">
        <h1 className=" uppercase headerClass font-light">Shop</h1>
        <p className="font-avenir text-sm font-light uppercase sub-title text-black/70 !tracking-[.2rem]">
          Curated designer rentals for every moment.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-10 mt-10">
        <div>
          <FilterDrawer />
        </div>

        <div className="hidden lg:block w-[25%]">
          <FilterProduct />
        </div>

        <div className="flex-1 mb-5 md:mb-8">
          <AllProduct />
        </div>
      </div>

      <div className="space-y-6 md:space-y-10">
        <HowItWork />

        <GiveAndTake />
      </div>
    </div>
  )
}

export default page
