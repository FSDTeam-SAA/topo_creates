import { styledByYouProducts } from "@/data/product-data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StyledByYou = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl tracking-[0.3em] mb-2">STYLED BY YOU</h2>
          <div className="flex justify-center">
            <Link
              href="#"
              className="text-sm tracking-widest border-b border-black pb-1"
            >
              EXPLORE THE EDIT
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {styledByYouProducts.map((styledProduct) => (
            <div key={styledProduct.id} className="flex flex-col">
              <Link href={`/product/${styledProduct.slug}`} className="group">
                <div className="overflow-hidden mb-4">
                  <Image
                    src={styledProduct.images[0]?.src || "/placeholder.svg"}
                    alt={styledProduct.images[0]?.alt || "Product image"}
                    width={400}
                    height={600}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="uppercase tracking-widest text-sm">
                    {styledProduct.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyledByYou;
