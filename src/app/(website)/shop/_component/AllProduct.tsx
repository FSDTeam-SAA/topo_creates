"use client";

import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/types/product";
import { useFilterStore } from "@/zustand/filterStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const AllProduct = () => {
  const { search } = useFilterStore();

  const { data: allProduct, isLoading } = useQuery({
    queryKey: ["all-product", search],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin?search=${search}`
      );
      const data = res.json();

      return data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="flex flex-col h-full animate-pulse">
                <div className="overflow-hidden mb-4 aspect-[2/3] w-full bg-gray-200 rounded-md" />
                <div className="text-center space-y-2 mt-auto">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))
          : allProduct?.data?.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      {allProduct?.data.length === 0 && (
        <div className="text-center min-h-[calc(100vh-400px)] flex flex-col items-center justify-center">
          <Image
          src={'/no-product.webp'}
          alt="no-product.png"
          width={1000}
          height={1000}
          className="h-[300px] w-[300px] mx-auto"
          />
          <h1 className="uppercase font-avenir text-xl tracking-[15px]">No Product Available</h1>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
