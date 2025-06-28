import { cn } from "@/lib/utils";
import Link from "next/link";
import FindNearMap from "./find-near-map";

const FindNearDressSection = () => {
  return (
    <div className="flex flex-col md:flex-row w-full container mx-auto">
      {/* Text content section */}
      <div className=" flex flex-col justify-center  flex-1 mb-8 md:mb-0">
        <div>
          <h1 className={cn("headerClass")}>FIND YOUR DRESS NEAR YOU</h1>
          <p className="sub-title mb-8 ">
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
            className="inline-block border-b border-black px-6 py-2 text-[14px] uppercase tracking-widest hover:bg-black hover:text-white"
          >
            EXPLORE NEARBY DRESSES
          </Link>
        </div>
      </div>

      {/* Map section */}
      <FindNearMap />
    </div>
  );
};

export default FindNearDressSection;
