// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import type { Product } from "@/types/product";

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const images =
//     product.images.length > 0
//       ? product.images
//       : [{ src: "/placeholder.svg", alt: "Product image" }];

//   useEffect(() => {
//     if (!isHovered || images.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 1500); // Increased to 1.5s for smoother feel

//     return () => clearInterval(interval);
//   }, [isHovered, images.length]);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     // Smooth transition back to first image
//     setTimeout(() => {
//       setCurrentImageIndex(0);
//     }, 150);
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <Link
//         href={`/product/${product.slug}`}
//         className="group flex flex-col flex-grow"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="overflow-hidden mb-4 aspect-[2/3] w-full relative">
//           <Image
//             src={images[currentImageIndex]?.src}
//             alt={images[currentImageIndex]?.alt}
//             fill
//             className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
//           />
//         </div>
//         <div className="text-center space-y-1 mt-auto">
//           <h3 className="text-lg tracking-widest transition-colors duration-300 group-hover:text-gray-700">
//             {product.name}
//           </h3>
//           <p className="text-sm tracking-wider transition-colors duration-300 group-hover:text-gray-600">
//             RENT ${product.price} | RRP ${Math.round(product.price * 3.5)}
//           </p>
//         </div>
//       </Link>
//     </div>
//   );
// }




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
    }, 1500); // 1.5s interval for smoother cycling

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
        href={`/product/${product.slug}`}
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
              className="w-full bg-white py-2 rounded hover:bg-gray-200 transition duration-300 text-black"
              onClick={(e) => e.preventDefault()} // prevent navigating on button click
            >
              BOOK NOW
            </button>
          </div>
        </div>
        <div className="text-center space-y-1 mt-auto">
          <h3 className="text-lg tracking-widest transition-colors duration-300 group-hover:text-gray-700">
            {product.name}
          </h3>
          <p className="text-sm tracking-wider transition-colors duration-300 group-hover:text-gray-600">
            RENT ${product.price} | RRP ${Math.round(product.price * 3.5)}
          </p>
        </div>
      </Link>
    </div>
  );
}
