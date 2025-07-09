import { MapPin, Truck } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  days: number;
  size: string;
  image: string;
  description: string;
  shipping: boolean;
  pickup: boolean;
  location?: { lat: number; lng: number };
}

export default function ProductCard({
  name,
  price,
  days,
  size,
  image,
  description,
  shipping,
  pickup,
}: ProductCardProps) {
  return (
    <div>
      <div className="flex items-center gap-[20px] md:gap-[35px] lg:gap-[50px] mt-[20px] mb-[15px] md:my-[25px] lg:my-[30px]">
        <div>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={324}
            height={424}
            className="w-full md:w-[324px] h-[283px] md:h-[424px] object-cover"
          />
        </div>

        <div className="w-full relative">
          <div className="w-full flex flex-col md:flex-row items-center">
            <div className="flex-1 ">
              <h3 className="text-[16px]   font-normal text-black leading-[30px] md:leading-[45px] lg:leading-[60px] uppercase tracking-[10%] ">
                {name}
              </h3>
              <p className="text-[16px] font-normal text-black leading-[24px] md:leading-[35px] lg:leading-[46px] tracking-[0.10rem] py-[20px] md:py-[28px] lg:py-[36px]">
                {price} / {days} Days
              </p>
              <p className="text-[16px] font-normal text-black leading-[24px] md:leading-[32px] lg:leading-[40px] tracking-[0rem]">
                Size: {size}
              </p>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-[10px] md:gap-[13px] lg:gap-[15px] py-[20px] md:py-[28px] lg:py-[36px]">
                {shipping && (
                  <div className="flex items-center gap-[10px] md:gap-[13px] lg:gap-[15px]">
                    <Truck className="size-5" />
                    <span className="text-[] font-normal text-black leading-[24px] md:leading-[28px] lg:leading-[33px] tracking-[0.20rem]">
                      SHIPPING
                    </span>
                  </div>
                )}

                {pickup && (
                  <div className="flex items-center gap-[10px] md:gap-[13px] lg:gap-[15px]">
                    <MapPin className="size-5" />
                    <span className="text-[16px] font-normal text-black leading-[24px] md:leading-[28px] lg:leading-[33px] tracking-[0.20rem]">
                      PICKUP
                    </span>
                  </div>
                )}
              </div>

              <p className="text-[12px] text-black font-normal leading-[120%]">
                {description}
              </p>
            </div>

            <div className="hidden md:block">
              <button className="bg-white border-b border-black text-black py-2 md:py-3 lg:py-4 text-[16px] uppercase tracking-[0.2043m]">
                BOOK NOW
              </button>
            </div>
          </div>
          <div
            className={`hidden md:block w-full absolute -bottom-8 border-b border-black `}
          />
          <div
            className={`block md:hidden w-full absolute border-b border-black ${
              pickup && shipping ? "-bottom-3" : "-bottom-8"
            }`}
          />
        </div>
      </div>
      <div className="block md:hidden">
        <div className="w-full flex items-center justify-center">
          <button className="w-full my-4 rounded-md bg-black  text-white py-2 text-xl md:text-2xl lg:text-[26px] uppercase tracking-[0.2043m]">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}
