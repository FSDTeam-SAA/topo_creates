"use client";
import { useShoppingStore } from "@/zustand/shopingStore";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface RentalPrice {
  fourDays?: string | number;
  eightDays?: string | number;
}

interface ProductData {
  _id?: string;
  dressName?: string;
  rentalPrice?: RentalPrice;
}

interface ShopDetailsProps {
  singleProduct: {
    data?: ProductData;
  };
}

const PriceBreakDown = ({ singleProduct }: ShopDetailsProps) => {
  const rent = useShoppingStore((state) => state.rent);
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const data = singleProduct?.data;

  const rentalFee =
    rent === "4"
      ? Number(data?.rentalPrice?.fourDays ?? 0)
      : Number(data?.rentalPrice?.eightDays ?? 0);

  const insurance = 15;
  const shipping = 30;
  const total = rentalFee + insurance + shipping;

  const createBooking = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            listingId: data?._id,
            rentalStartDate: "2025-08-21T10:00:00.000Z",
            rentalEndDate: "2025-08-25T10:00:00.000Z",
            rentalDurationDays: rent === "4" ? 4 : 8,
            size: "M",
            deliveryMethod: "Shipping",
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to create booking");
      return res.json();
    },
    onSuccess: (bookingResponse) => {
      const bookingId = bookingResponse?.data?._id;
      if (bookingId) {
        createCheckout.mutate(bookingId);
      } else {
        console.error("No bookingId returned", bookingResponse);
      }
    },
  });

  const createCheckout = useMutation({
    mutationFn: async (bookingId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
        }
      );

      if (!res.ok) throw new Error("Failed to create checkout session");
      return res.json();
    },
    onSuccess: (paymentResponse) => {
      if (paymentResponse.status && paymentResponse.data?.checkoutUrl) {
        window.location.href = paymentResponse.data.checkoutUrl;
      } else {
        console.error("Failed:", paymentResponse.message);
      }
    },
  });

  const handleCheckout = () => {
    createBooking.mutate();
  };

  return (
    <div className="font-avenir uppercase mt-10">
      <h1 className="opacity-75 tracking-widest border-b border-black pb-1">
        Price Breakdown
      </h1>

      <div className="mt-4">
        <div className="space-y-3 text-sm border-b border-black pb-2">
          <div className="opacity-75 tracking-widest flex items-center justify-between">
            <span>Rental Fee</span>
            <span>${rentalFee}</span>
          </div>

          <div className="opacity-75 tracking-widest flex items-center justify-between">
            <span>Insurance</span>
            <span>${insurance}</span>
          </div>

          <div className="opacity-75 tracking-widest flex items-center justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
        </div>

        <div className="mt-2">
          <div className="opacity-75 tracking-widest flex items-center justify-between">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      <div className="text-center border-b-2 border-gray-500 pb-1 mt-10">
        <button
          onClick={handleCheckout}
          disabled={createBooking.isPending || createCheckout.isPending}
          className="opacity-75 tracking-widest uppercase disabled:opacity-50"
        >
          {createBooking.isPending || createCheckout.isPending
            ? "Processing..."
            : "Buy Now"}
        </button>
      </div>
    </div>
  );
};

export default PriceBreakDown;
