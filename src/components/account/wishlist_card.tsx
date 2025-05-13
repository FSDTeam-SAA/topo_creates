import Image from "next/image";
import React from "react";

const WishlistCard = () => {
  return (
    <div className="mb-24">
      <div  className="flex flex-col">
        <div className="relative aspect-[3/4] mb-2">
          <Image
            src="https://as1.ftcdn.net/v2/jpg/02/63/75/22/1000_F_263752218_3uvpwtuYiq10lNqgXz9xHOltRdgHbKBU.jpg"
            alt="Olivia Dress"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-2xl font-normal text-center text-black mb-[10px]">Olivia Dress</h3>
        <p className="text-sm font-normal text-black text-center">RENT $XX | RRP $XX</p>
      </div>
    </div>
  );
};

export default WishlistCard;
