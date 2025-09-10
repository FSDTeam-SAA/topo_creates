"use client";
import { useParams } from "next/navigation";
import React from "react";
import ShopCard from "./shop-card";
import ShopDetails from "./shop-details";
import { useQuery } from "@tanstack/react-query";
import StyledByYou from "@/components/product/styled_By_You";
import HowItWork from "@/components/HowItWork";
import GiveAndTake from "@/components/section/GiveAndTake";

const ProductDetails = () => {
  const params = useParams();

  const { data: singleProduct = {}, isLoading } = useQuery({
    queryKey: ["single-product"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/dress/${params.id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const allImages = singleProduct?.data?.media || [];

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="lg:flex-1">
          <ShopCard allImages={allImages} isLoading={isLoading} />
        </div>

        <div className="lg:w-[35%]">
          <ShopDetails singleProduct={singleProduct} />
        </div>
      </div>

      <div>
        <StyledByYou />
      </div>

      <div>
        <HowItWork />
      </div>

      <div>
        <GiveAndTake />
      </div>
    </div>
  );
};

export default ProductDetails;
