import { useShoppingStore } from '@/zustand/shopingStore'
import ShoppingRent from './shopping-rent'
import DeliveryOption from './delivery-option'
import PriceBreakDown from './price-breakdown'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import ShopDetailsSkeleton from '@/skeleton/ShopDetailsSkeleton'

interface RentalPrice {
  fourDays?: string | number
  eightDays?: string | number
}

interface ProductData {
  dressName?: string
  rentalPrice?: RentalPrice
  media?: string[]
  dressId?: string
  bookedDates?: string[][]
}

interface ShopDetailsProps {
  singleProduct: {
    data?: ProductData
  }
  isLoading: boolean
}

const ShopDetails: React.FC<ShopDetailsProps> = ({
  singleProduct,
  isLoading,
}) => {
  const { rent, setRent } = useShoppingStore()

  const pathName = usePathname()

  const data = singleProduct?.data

  if (isLoading) return <ShopDetailsSkeleton />

  return (
    <div className="lg:min-h-[660px] font-avenir">
      {pathName?.startsWith('/shop/checkout') &&
      !pathName.includes('/confirmation') ? (
        <h1 className="font-light opacity-75 text-[18px] tracking-[0.5rem] uppercase mb-8">
          order summery
        </h1>
      ) : (
        <div>
          <h1 className="font-light opacity-75 text-[18px] tracking-[0.5rem] uppercase">
            {data?.dressName}
          </h1>

          <p className="tracking-wider mt-2 opacity-75 uppercase">
            {rent === '4'
              ? `$${data?.rentalPrice?.fourDays} / 4 days`
              : `$${data?.rentalPrice?.eightDays} / 8 days`}
          </p>
        </div>
      )}

      {pathName?.startsWith('/shop/checkout') &&
        !pathName.includes('/confirmation') && (
          <div className="flex items-start gap-2 border-b border-black">
            <div>
              <Image
                src={data?.media?.[0] ?? '/placeholder.png'}
                alt="media.png"
                width={1000}
                height={1000}
                className="w-[150px] h-[150px]"
              />
            </div>

            <div>
              <h1 className="font-light opacity-75 tracking-[0.1rem] uppercase">
                {data?.dressName}
              </h1>
              <p className="tracking-wider mt-2 opacity-75 uppercase text-sm">
                {rent === '4'
                  ? `$${data?.rentalPrice?.fourDays} / 4 days`
                  : `$${data?.rentalPrice?.eightDays} / 8 days`}
              </p>

              <p className="tracking-wider mt-2 opacity-75 uppercase text-sm">
                Dress Id : {data?.dressId}
              </p>
            </div>
          </div>
        )}

      <div className="mt-16 opacity-75 flex items-center gap-5">
        <button
          onClick={() => setRent('4')}
          className={`w-1/2 pb-2 uppercase ${
            rent === '4' ? 'border-b-2 border-black' : 'border-b-2 border-white'
          }`}
        >
          4 day rent
        </button>

        <button
          onClick={() => setRent('8')}
          className={`w-1/2 pb-2 uppercase ${
            rent === '8' ? 'border-b-2 border-black' : 'border-b-2 border-white'
          }`}
        >
          8 day rent(+$15)
        </button>
      </div>

      <ShoppingRent bookedDates={singleProduct?.data?.bookedDates} />

      <DeliveryOption />

      <PriceBreakDown singleProduct={singleProduct} />
    </div>
  )
}

export default ShopDetails
