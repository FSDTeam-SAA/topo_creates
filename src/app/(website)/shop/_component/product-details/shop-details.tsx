'use client'

import { useShoppingStore } from '@/zustand/shopingStore'
import ShoppingRent from './shopping-rent'
import DeliveryOption from './delivery-option'
import PriceBreakDown from './price-breakdown'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import ShopDetailsSkeleton from '@/skeleton/ShopDetailsSkeleton'

// ------------------
// Types
// ------------------

interface ShippingDetails {
  isLocalPickup?: boolean
  isShippingAvailable?: boolean
}

interface ProductData {
  _id: string
  dressName: string
  basePrice: number
  insuranceFee?: number
  rrpPrice?: number
  lenderIds?: string[]
  listingIds?: string[]
  sizes?: string[]
  colors?: string[]
  slug?: string
  masterDressId?: string
  thumbnail?: string
  media?: string[]
  occasions?: string[]
  createdAt?: string
  updatedAt?: string
  shippingDetails?: ShippingDetails
  bookedDates?: string[][]
}

interface ShopDetailsProps {
  singleProduct: {
    data?: ProductData
  }
  isLoading?: boolean
}

// ------------------
// Component
// ------------------

const ShopDetails: React.FC<ShopDetailsProps> = ({
  singleProduct,
  isLoading,
}) => {
  const { rent, setRent } = useShoppingStore()
  const pathName = usePathname()
  const data = singleProduct?.data

  console.log('shopping details page', data)

  if (isLoading) return <ShopDetailsSkeleton />

  if (!data) return <p>No product data found.</p>

  // For display only: add $15 to 8-day rent
  const displayPrice = rent === '8' ? data.basePrice + 15 : data.basePrice

  return (
    <div className="lg:min-h-[660px] font-avenir">
      {pathName?.startsWith('/shop/checkout') &&
      !pathName.includes('/confirmation') ? (
        <h1 className="font-light opacity-75 text-[18px] tracking-[0.5rem] uppercase mb-8">
          Order Summary
        </h1>
      ) : (
        <div>
          <h1 className="font-light opacity-75 text-[18px] tracking-[0.5rem] uppercase">
            {data.dressName}
          </h1>

          <p className="tracking-wider mt-2 opacity-75 uppercase">
            $ {displayPrice} / {rent === '4' ? '4 days' : '8 days'}
          </p>
        </div>
      )}

      {pathName?.startsWith('/shop/checkout') &&
        !pathName.includes('/confirmation') && (
          <div className="flex items-start gap-2 border-b border-black">
            <div>
              <Image
                src={data.thumbnail ?? '/placeholder.png'}
                alt={data.dressName}
                width={1000}
                height={1000}
                className="w-[120px] h-[120px] object-cover"
              />
            </div>

            <div className="pt-6">
              <h1 className="font-light text-sm lg:text-lg opacity-75 tracking-[0.1rem] uppercase">
                {data.dressName}
              </h1>
              <p className="tracking-wider mt-2 opacity-75 uppercase text-sm lg:text-lg">
                ${displayPrice} / {rent === '4' ? '4 days' : '8 days'}
              </p>

              <p className="tracking-wider mt-2 opacity-75 uppercase text-sm lg:text-base">
                Dress ID: {data.masterDressId}
              </p>
            </div>
          </div>
        )}

      {/* Rent Option */}
      <div className="mt-12 opacity-75 flex items-center gap-5">
        <button
          onClick={() => setRent('4')}
          className={`w-1/2 pb-2 uppercase ${
            rent === '4'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-transparent'
          }`}
        >
          4 day rent
        </button>

        <button
          onClick={() => setRent('8')}
          className={`w-1/2 pb-2 uppercase ${
            rent === '8'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-transparent'
          }`}
        >
          8 day rent (+$15)
        </button>
      </div>

      {/* Other Components */}
      <ShoppingRent />
      <DeliveryOption masterDressId={singleProduct?.data?._id || ''} />
      <PriceBreakDown singleProduct={singleProduct} />
    </div>
  )
}

export default ShopDetails
