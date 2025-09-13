"use client";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ShopCardProps {
  allImages: string[];
  isLoading: boolean;
}

const ShopCard = ({ allImages, isLoading }: ShopCardProps) => {
  const [currentImage, setCurrentImage] = useState("img-1");

  const img1 = allImages[0];
  const img2 = allImages[1];
  const img3 = allImages[2];
  const img4 = allImages[3];

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-5 animate-pulse">
        {/* Left Sidebar Skeleton */}
        <div className="flex flex-row lg:flex-col gap-5 lg:w-[20%] w-full overflow-x-auto lg:overflow-visible">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="border min-w-[150px] lg:h-[150px] h-[100px] bg-gray-300 rounded"
            />
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 min-h-[400px] lg:h-[660px] relative">
          <div className="w-full h-full bg-gray-300 rounded-lg" />
          <div className="flex items-center gap-5 absolute right-4 top-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Sidebar */}
        <div className="flex flex-row lg:flex-col gap-5 lg:w-[20%] w-full overflow-x-auto lg:overflow-visible">
          {img1 && (
            <div
              onClick={() => setCurrentImage("img-1")}
              className={` min-w-[150px] lg:h-[150px] h-[100px] cursor-pointer ${
                currentImage === "img-1" ? "border border-black" : ""
              }`}
            >
              <Image
                src={img1 || "/placeholder.jpg"}
                alt="img1.png"
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
          )}

          {img2 && (
            <div
              onClick={() => setCurrentImage("img-2")}
              className={` min-w-[150px] lg:h-[150px] h-[100px] cursor-pointer ${
                currentImage === "img-2" ? "border border-black" : ""
              }`}
            >
              <Image
                src={img2 || "/placeholder.jpg"}
                alt="img2.png"
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
          )}

          {img3 && (
            <div
              onClick={() => setCurrentImage("img-3")}
              className={` min-w-[150px] lg:h-[150px] h-[100px] cursor-pointer ${
                currentImage === "img-3" ? "border border-black" : ""
              }`}
            >
              <Image
                src={img3 || "/placeholder.jpg"}
                alt="img3.png"
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
          )}

          {img4 && (
            <div
              onClick={() => setCurrentImage("img-4")}
              className={` min-w-[150px] lg:h-[150px] h-[100px] cursor-pointer ${
                currentImage === "img-4" ? "border border-black" : ""
              }`}
            >
              <Image
                src={img4 || "/placeholder.jpg"}
                alt="img4.png"
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-[400px] lg:h-[660px] cursor-pointer relative">
          {currentImage === "img-1" && (
            <Image
              src={img1 || "/placeholder.jpg"}
              alt="img1.png"
              width={1000}
              height={1000}
              className="w-full h-full absolute rounded-lg"
            />
          )}
          {currentImage === "img-2" && (
            <Image
              src={img2 || "/placeholder.jpg"}
              alt="img2.png"
              width={1000}
              height={1000}
              className="w-full h-full absolute rounded-lg"
            />
          )}
          {currentImage === "img-3" && (
            <Image
              src={img3 || "/placeholder.jpg"}
              alt="img3.png"
              width={1000}
              height={1000}
              className="w-full h-full absolute rounded-lg"
            />
          )}
          {currentImage === "img-4" && (
            <Image
              src={img4 || "/placeholder.jpg"}
              alt="img4.png"
              width={1000}
              height={1000}
              className="w-full h-full absolute rounded-lg"
            />
          )}

          <div className="flex items-center gap-5 absolute right-4 top-4">
            <ShoppingCart />
            <Heart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
