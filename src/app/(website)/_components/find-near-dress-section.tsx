import { cn } from "@/lib/utils";
import Link from "next/link";
import FindNearMap from "./find-near-map";

const FindNearDressSection = () => {
  return (
    <div className="flex flex-col md:flex-row w-full container mx-auto">
      {/* Text content section */}
      <div className="flex flex-col justify-center w-full md:w-1/2 mb-8 md:mb-0">
        <div>
          <h1 className={cn("headerClass ")}>FIND YOUR DRESS NEAR YOU</h1>
          <p className="text-[14px] opacity-75 my-5">
            Discover rentals ready for pick up. Real time availability.
          </p>
          <Link
            href="/find-near-you"
            className="inline-block border-b border-black py-1 text-[14px] uppercase hover:bg-black hover:text-white "
          >
            <button className="opacity-80 font-avenir tracking-[0.2rem]">EXPLORE NEARBY DRESSES</button>
          </Link>
        </div>
      </div>

      {/* Map section */}
      <div className="w-full md:w-1/2">
        <FindNearMap />
      </div>
    </div>
  );
};

export default FindNearDressSection;
