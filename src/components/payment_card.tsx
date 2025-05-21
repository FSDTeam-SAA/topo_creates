import React from "react";
import { Card } from "./ui/card";

const Paymentcard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[60px]">
      {/* Muse Member Card */}
      <Card className="border rounded-none border-black p-4 flex flex-col items-center text-center h-full">
        <h3 className="text-[32PX] font-normal mb-[30PX]">Muse Member</h3>
        <p className="text-6xl font-normal  mb-[30PX]">$0+</p>
        <p className="text-2xl font-normal mb-4">
          Free shipping on all orders over $100
        </p>
        <p className="text-2xl font-normal mb-4">Early access to new styles</p>
        <p className="text-2xl font-normal pb-16">Style and trend updates</p>
      </Card>

      {/* Muse Star Card - Highlighted */}
      <Card className="border-[5px] border-[#891D33] rounded-none p-4 flex flex-col items-center text-center h-full">
        <h3 className="text-[32PX] font-normal mb-[30PX]">Muse Star</h3>
        <p className="text-6xl font-normal  mb-[30PX]">$300+</p>
        <p className="text-2xl font-normal  mb-4">
          $20 Welcome to Silver Voucher
        </p>
        <p className="text-2xl font-normal  mb-4">$15 Birthday Voucher</p>
        <p className="text-2xl font-normal pb-16">
          Surprise perks (bonus credits, small gifts)
        </p>
      </Card>

      {/* Muse Gold Card */}
      <Card className="border rounded-none border-black p-4 flex flex-col items-center text-center h-full">
        <h3 className="text-[32PX] font-normal mb-[30PX]">Muse Gold</h3>
        <p className="text-6xl font-normal  mb-[30PX]">$600+</p>
        <p className="text-2xl font-normal  mb-4">
          $30 Welcome to Gold Voucher
        </p>
        <p className="text-2xl font-normal  mb-4">$30 Birthday Voucher</p>
        <p className="text-2xl font-normal  mb-4">
          Free insurance on 1 rental per year
        </p>
        <p className="text-2xl font-normal  mb-4 pb-16">
          Priority customer support
        </p>
      </Card>
    </div>
  );
};

export default Paymentcard;
