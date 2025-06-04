"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images =
    product.images.length > 0
      ? product.images
      : [{ src: "/placeholder.svg", alt: "Product image" }];

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); // Change image every 1s

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div className="flex flex-col h-full">
      <Link
        href={`/product/${product.slug}`}
        className="group flex flex-col flex-grow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0); // Reset to first image when hover ends
        }}
      >
        <div className="overflow-hidden mb-4 aspect-[2/3] w-full relative">
          <Image
            src={images[currentImageIndex]?.src}
            alt={images[currentImageIndex]?.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="text-center space-y-1 mt-auto">
          <h3 className="text-lg tracking-widest">{product.name}</h3>
          <p className="text-sm tracking-wider">
            RENT ${product.price} | RRP ${Math.round(product.price * 3.5)}
          </p>
        </div>
      </Link>
    </div>
  );
}
