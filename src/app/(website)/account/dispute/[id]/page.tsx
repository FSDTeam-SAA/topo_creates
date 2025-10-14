"use client";

import React from "react";
import DisputesDetailsHeader from "./_components/disputes-details-header";
import DisputesDetails from "./_components/disputes-details";
import { useParams } from "next/navigation";
const Page = () => {
  const { id } = useParams();
  

  return (
    <div className="mx-auto container pb-20">
      <DisputesDetailsHeader />

      <div className="mt-8">
        <DisputesDetails id={id as string} />
      </div>
    </div>
  );
};

export default Page;
