import { MapPin, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
// import Link from 'next/link'

export interface ProductCardProps {
  id: string | number
  name: string
  price: string
  days: number
  size: string
  image: string
  description?: string
  shipping?: boolean
  pickup?: boolean
  location?: { lat: number; lng: number }
}

export default function ProductCard({
  id,
  name,
  price,
  days,
  size,
  image,
  description = '',
  shipping,
  pickup,
}: ProductCardProps) {
  // console.log('Rendering ProductCard:', {
  //   id,
  //   name,
  //   price,
  //   days,
  //   size,
  //   image,
  //   description,
  //   shipping,
  //   pickup,
  // })
  return (
    <div key={id}>
      <div className="flex items-center justify-between gap-[20px] md:gap-[35px] lg:gap-[50px] mt-[20px] mb-[15px] md:my-[25px] lg:my-[30px]">
        {/* Product Image */}
        <div>
          <Image
            src={image || '/images/dress.png'}
            alt={name}
            width={400}
            height={400}
            className="w-[423px] h-[400px] object-cover flex-shrink-0"
          />
        </div>

        {/* Product Info */}
        <div className="w-full relative">
          <div className="w-full flex flex-col md:flex-row items-center">
            <div className="flex-1">
              <h3 className="text-[14px] md:text-lg  font-light text-black leading-[30px] md:leading-[45px] lg:leading-[60px] uppercase tracking-[0.1em]">
                {name}
              </h3>
              <p className="text-[14px] font-light text-black leading-[24px] md:leading-[35px] lg:leading-[46px] tracking-[0.10rem] py-[10px]">
                {price} / {days} Days
              </p>
              <p className="text-[14px] font-light text-black leading-[24px] md:leading-[32px] lg:leading-[40px]">
                Size: {size}
              </p>

              {/* Shipping & Pickup Info */}
              {(shipping || pickup) && (
                <div className="flex flex-wrap items-center gap-[15px] py-[20px]">
                  {shipping && (
                    <div className="flex items-center gap-[8px]">
                      <Truck className="size-5" />
                      <span className="text-[14px] font-light text-black leading-[24px] md:leading-[28px] lg:leading-[33px] tracking-[0.20rem]">
                        SHIPPING
                      </span>
                    </div>
                  )}

                  {pickup && (
                    <div className="flex items-center gap-[8px]">
                      <MapPin className="size-5" />
                      <span className="text-[16px] font-normal text-black leading-[24px] md:leading-[28px] lg:leading-[33px] tracking-[0.20rem]">
                        PICKUP
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-[12px] md:text-sm text-gray-700 font-light leading-[120%]">
                {description}
              </p>
            </div>

            {/* Desktop Button */}

            <Link href={`/shop/${id}`}>
              <div className="hidden md:block">
                <button className="bg-white border-b border-black text-black py-2 md:py-3 lg:py-4 text-[14px] font-light uppercase tracking-[0.2043em]">
                  BOOK NOW
                </button>
              </div>
            </Link>
          </div>

          {/* Borders depending on shipping/pickup */}
          <div className="hidden md:block w-full absolute -bottom-8 border-b border-black" />
          <div
            className={`block md:hidden w-full absolute border-b border-black ${
              shipping || pickup ? '-bottom-3' : '-bottom-8'
            }`}
          />
        </div>
      </div>

      {/* Mobile BOOK NOW */}
      <div className="block md:hidden">
        <Link href={`/shop/${id}`}>
          <div className="w-full flex items-center justify-center">
            {/* <Link href={'/shop/68b3eb7ef693b00788c36268'}> */}
            <button className="inline-block border-b border-black font-light px-6 py-2 text-[14px] uppercase tracking-widest text-lg md:text-xl hover:bg-black hover:text-white">
              BOOK NOW
            </button>
            {/* </Link> */}
          </div>
        </Link>
      </div>
    </div>
  )
}
