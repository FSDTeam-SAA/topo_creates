"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Map media strings to objects with src and alt
  const images =
    product?.media && product.media.length > 0
      ? product.media.map((url) => ({ src: url, alt: product.dressName }))
      : [{ src: "/placeholder.svg", alt: "Product image" }];

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // 1.5s interval

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      setCurrentImageIndex(0);
    }, 150);
  };

  return (
    <div className="flex flex-col h-full">
      <Link
        href={`/shop/${product._id}`}
        className="group flex flex-col flex-grow"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden mb-4 aspect-[2/3] w-full relative">
          <Image
            src={images[currentImageIndex]?.src}
            alt={images[currentImageIndex]?.alt}
            fill
            className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <button
              className="w-full bg-white py-2 rounded hover:bg-gray-200 transition duration-300 text-black text-[14px]"
              onClick={(e) => e.preventDefault()}
            >
              BOOK NOW
            </button>
          </div>
        </div>
        <div className="text-center space-y-1 mt-auto">
          <h3 className="text-[14px] tracking-widest transition-colors duration-300 group-hover:text-gray-700">
            {product.dressName}
          </h3>
          <p className="text-[10px] tracking-wider transition-colors duration-300 group-hover:text-gray-600">
            RENT ${product?.rentalPrice?.fourDays} | RRP $
            {Math.round(product?.rentalPrice?.fourDays * 3.5)}
          </p>
        </div>
      </Link>
    </div>
  );
}
