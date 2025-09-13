"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="text-center mt-8">
      <h1 className="text-5xl font-avenir tracking-[10px] uppercase">
        Thank you for your booking!
      </h1>
      <p className="font-avenir tracking-[4px] uppercase mt-5 opacity-75">
        Your rental has been confirmed. You’ll receive an email shortly with
        full details.
      </p>

      <div className="mt-16 space-y-2">
        <h1 className="font-avenir  uppercase opacity-75 tracking-[2px] mb-5">
          Booking Summary
        </h1>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Order ID:{" "}
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Dress:{" "}
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Rental Period:{" "}
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Delivery Method:{" "}
        </p>
        <p className="font-avenir text-sm uppercase opacity-75 tracking-[2px]">
          Total Paid:
        </p>
      </div>

      <div className="mt-16">
        <Link href={`/shop`}>
          <button className="font-avenir opacity-75 border-b border-black pb-1 uppercase tracking-widest">
            Go To Shop
          </button>
        </Link>
      </div>
    </div>
  );
}
