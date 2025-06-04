import Image from "next/image";
import React from "react";
import MapProductList from "./map-product-list";

const MapView = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6 lg:gap-[30px]">
        <div className="md:col-span-3">
          <Image src="/images/google-map.png" alt="Map" width={867} height={1118} className="w-full" />
        </div>
        <div className="md:col-span-2">
          <MapProductList />
        </div>
      </div>
    </div>
  );
};

export default MapView;
