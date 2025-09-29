import RentalDates from './RentalDates'

interface ShippingRentProps {
  bookedDates?: string[][]
}

const ShoppingRent: React.FC<ShippingRentProps> = ({ bookedDates = [] }) => {
  return (
    <div className="font-avenir uppercase mt-10">
      <h1 className=" opacity-75 tracking-widest border-b border-black pb-1">
        Select Rental Dates
      </h1>

      <div>
        <RentalDates bookedDates={bookedDates} />
      </div>
    </div>
  )
}

export default ShoppingRent
