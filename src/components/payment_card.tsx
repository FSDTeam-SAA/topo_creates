import clsx from "clsx";
import React from "react";
import { Card } from "./ui/card";

const Paymentcard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <MembershipCard
        title="Muse Member"
        price="$0+"
        benefits={[
          "Free shipping on all orders over $100",
          "Early access to new styles",
          "Style and trend updates",
        ]}
      />

      <MembershipCard
        title="Muse Star"
        price="$300+"
        benefits={[
          '$20 "Welcome to Silver" voucher',
          "$15 birthday voucher",
          "Surprise perks: bonus credits, small gifts",
        ]}
        highlighted
      />

      <MembershipCard
        title="Muse Gold"
        price="$600+"
        benefits={[
          '$30 "Welcome to Gold" voucher',
          "$30 birthday voucher",
          "Free insurance on 1 rental per year",
          "Priority customer support",
        ]}
      />
    </div>
  );
};

export default Paymentcard;

interface MembershipCardProps {
  title: string;
  price: string;
  benefits: string[];
  highlighted?: boolean;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  title,
  price,
  benefits,
  highlighted = false,
}) => {
  return (
    <Card
      className={clsx(
        "rounded-none p-6 flex flex-col items-center text-center h-full",
        highlighted ? "border-2 border-[#891D33]" : "border border-black"
      )}
    >
      <h3 className="text-cl font-medium mb-6">{title}</h3>
      <p className="text-2xl font-semibold mb-6">{price}</p>
      <ul className="text-[13px] space-y-3">
        {benefits.map((benefit, idx) => (
          <li key={idx}>{benefit}</li>
        ))}
      </ul>
    </Card>
  );
};
