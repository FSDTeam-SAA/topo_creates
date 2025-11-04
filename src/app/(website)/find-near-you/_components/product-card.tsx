import { MapPin, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface ProductCardProps {
  id: string | number
  name: string
  size: string | string[] | null
  image: string
  description?: string
  shipping?: boolean
  pickup?: boolean
  location?: { lat: number; lng: number }
}

export default function ProductCard({
  id,
  name,
  size,
  image,
  description = '',
  shipping,
  pickup,
}: ProductCardProps) {
  // ✅ Size handling (array or string or null)
  const displaySize = Array.isArray(size) ? size.join(', ') : size || 'N/A'

  return (
    <div key={id}>
      <div className="flex items-center justify-between gap-[15px] md:gap-[25px] lg:gap-[30px]">
        {/* ✅ Product Image */}
        <div>
          <Image
            src={image || '/images/dress.png'}
            alt={name}
            width={300}
            height={300}
            className="w-[323px] h-[280px] object-cover flex-shrink-0"
          />
        </div>

        {/* ✅ Product Info */}
        <div className="w-full relative ">
          <div className="w-full flex flex-col md:flex-row lg:flex-col items-center lg:items-start space-y-5">
            <div className="flex-1">
              {/* Title */}
              <h3 className="text-[14px] md:text-lg font-light text-black leading-[35px] md:leading-[40px] uppercase tracking-[0.1em]">
                {name}
              </h3>

              {/* ✅ Size */}
              <p className="text-[14px] font-light text-black leading-[24px] md:leading-[32px] lg:leading-[40px]">
                Size: {displaySize}
              </p>

              {/* ✅ Shipping & Pickup Info */}
              {(shipping || pickup) && (
                <div className="flex flex-wrap items-center gap-[10px] py-3">
                  {shipping && (
                    <div className="flex items-center gap-[8px]">
                      <Truck className="size-5" />
                      <span className="text-[14px] font-light text-black leading-[24px] tracking-[0.20rem]">
                        SHIPPING
                      </span>
                    </div>
                  )}

                  {pickup && (
                    <div className="flex items-center gap-[8px]">
                      <MapPin className="size-5" />
                      <span className="text-[16px] font-normal text-black leading-[24px] tracking-[0.20rem]">
                        PICKUP
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* ✅ Description */}
              <p className="text-[12px] md:text-sm text-gray-700 font-light">
                {description.slice(0, 60)}...
              </p>
            </div>

            {/* ✅ BOOK NOW (Desktop) */}
            <Link href={`/shop/${encodeURIComponent(name)}`}>
              <div className="hidden md:block mt-3">
                <button className="inline-block border-b border-black font-light px-6 py-2 text-[14px] uppercase tracking-widest text-base hover:bg-black hover:text-white">
                  BOOK NOW
                </button>
              </div>
            </Link>
          </div>

          {/* ✅ Borders */}
          <div className="hidden md:block lg:hidden w-full absolute -bottom-8 border-b border-black" />
          <div className="block md:hidden w-full absolute border-b border-black -bottom-3" />
        </div>
      </div>

      {/* ✅ Mobile BOOK NOW */}
      <div className="block md:hidden mt-1">
        <Link href={`/shop/${id}`}>
          <div className="w-full flex items-center justify-center">
            <button className="inline-block border-b my-4 border-black font-light px-6 py-2 text-[14px] uppercase tracking-widest text-lg md:text-xl hover:bg-black hover:text-white">
              BOOK NOW
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}
