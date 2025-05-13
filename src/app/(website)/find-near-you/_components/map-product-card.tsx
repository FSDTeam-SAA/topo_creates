import Image from "next/image";
import { Truck, MapPin } from "lucide-react";

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

export default function MapProductCard({
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
      <div className="flex items-center gap-[20px] md:gap-[25px] lg:gap-[30px]  md:mb-[25px] lg:mb-[30px]">
        <div>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={196}
            height={257}
            className="w-full md:w-[196px] h-[203px] md:h-[238px] object-cover"
          />
        </div>

        <div className="w-full relative">
          <div className="w-full flex flex-col md:flex-row items-start md:items-center">
            <div className="flex-1 ">
              <h3 className="text-xl md:text-[25px] lg:text-[30px] font-light text-black leading-[25px] md:leading-[30px] lg:leading-[36px] uppercase tracking-[0.10rem]">
                {name}
              </h3>
              <p className="text-lg md:text-[20px] lg:text-[24px] font-normal text-black leading-[20px] md:leading-[24px] lg:leading-[28px] tracking-[0.15rem] py-[12px] md:py-[14px] lg:py-[16px]">
                {price} / {days} Days
              </p>
              <p className="text-base md:text-[17px] lg:text-lg font-normal text-black leading-[20px] md:leading-[22px] lg:leading-[24px] tracking-[0rem]">
                Size: {size}
              </p>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-[10px] md:gap-[13px] lg:gap-[15px] py-[12px] md:py-[14px] lg:py-[16px]">
                {shipping && (
                  <div className="flex items-center gap-[10px] md:gap-[13px] lg:gap-[15px]">
                    <Truck width={25} height={20} />
                    <span className="text-base font-normal text-black leading-[20px] tracking-[0.20rem] uppercase">
                      SHIPPING
                    </span>
                  </div>
                )}

                {pickup && (
                  <div className="flex items-center gap-[10px] md:gap-[13px] lg:gap-[15px]">
                    <MapPin className="w-[17px] h-[20px]" />
                    <span className="text-base font-normal text-black leading-[20px] tracking-[0.20rem] uppercase">
                      PICKUP
                    </span>
                  </div>
                )}
              </div>

              <p className="text-lg md:text-xl lg:text-[24px] text-black font-normal leading-[120%]">
                {description}
              </p>
            </div>

            <div className="hidden md:block">
              <button className="bg-white border-b border-black text-black py-2 md:py-3 lg:py-4 text-base uppercase tracking-[0.2043m]">
                BOOK NOW
              </button>
            </div>
          </div>
          <div
            className={`hidden md:block w-full absolute -bottom-3 border-b border-black `}
          />
          <div
            className={`block md:hidden w-full absolute border-b border-black ${
              pickup && shipping ? "-bottom-2" : "-bottom-6"
            }`}
          />
        </div>
      </div>
      <div className="block md:hidden pb-[25px]">
        <div className="w-full flex items-center justify-center">
          <button className="w-full my-4 rounded-md bg-black  text-white py-2 text-xl md:text-2xl lg:text-[26px] uppercase tracking-[0.2043m]">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}
