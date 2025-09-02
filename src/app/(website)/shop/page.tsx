import HowItWork from "@/components/HowItWork";
import GiveAndTake from "@/components/section/GiveAndTake";
import React from "react";
import FilterProduct from "./_component/FilterProduct";
import AllProduct from "./_component/AllProduct";
import { FilterDrawer } from "./_component/FilterDrawer";

const page = () => {
  return (
    <div className="mt-20 container mx-auto py-8">
      <div className="text-center">
        <h1 className=" uppercase headerClass">Shop</h1>
        <p className=" uppercase sub-title text-black/70">
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

        <div className="flex-1">
          <AllProduct />
        </div>
      </div>

      <HowItWork />

      <GiveAndTake />
    </div>
  );
};

export default page;
