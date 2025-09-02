"use client";

import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

const AllProduct = () => {
  const { data: allProduct, isLoading } = useQuery({
    queryKey: ["all-product"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin`
      );
      const data = res.json();

      return data;
    },
  });

  console.log("allProduct : ", allProduct);

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
    </div>
  );
};

export default AllProduct;
