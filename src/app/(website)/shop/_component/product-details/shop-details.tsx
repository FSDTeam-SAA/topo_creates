import { useShoppingStore } from "@/zustand/shopingStore";
import ShoppingRent from "./shopping-rent";

interface RentalPrice {
  fourDays?: string | number;
  eightDays?: string | number;
}

interface ProductData {
  dressName?: string;
  rentalPrice?: RentalPrice;
}

interface ShopDetailsProps {
  singleProduct: {
    data?: ProductData;
  };
}

const ShopDetails: React.FC<ShopDetailsProps> = ({ singleProduct }) => {
  const { rent, setRent } = useShoppingStore();

  const data = singleProduct?.data;

  console.log("singleProduct : ", data);

  return (
    <div className="lg:min-h-[660px] font-avenir">
      <h1 className="font-bold text-2xl tracking-[0.5rem] uppercase">
        {data?.dressName}
      </h1>

      <p className="tracking-wider mt-2 opacity-75 uppercase">
        {rent === "4"
          ? `${data?.rentalPrice?.fourDays} / 4 days`
          : `${data?.rentalPrice?.eightDays} / 8 days`}
      </p>

      <div className="mt-16 opacity-75 flex items-center gap-5">
        <button
          onClick={() => setRent("4")}
          className={`w-1/2 pb-2 uppercase ${
            rent === "4" ? "border-b-2 border-black" : "border-b-2 border-white"
          }`}
        >
          4 day rent
        </button>

        <button
          onClick={() => setRent("8")}
          className={`w-1/2 pb-2 uppercase ${
            rent === "8" ? "border-b-2 border-black" : "border-b-2 border-white"
          }`}
        >
          8 day rent(+$15)
        </button>
      </div>

      <ShoppingRent />
    </div>
  );
};

export default ShopDetails;
