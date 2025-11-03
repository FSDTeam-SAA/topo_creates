import React from 'react'
import SearchProduct from './filter/SearchProduct'
import Rental from './filter/Rental'
import { LocalPickup } from './filter/LocalPickup'
// import EventDate from './filter/EventDate'
import Price from './filter/Price'
import Size from './filter/Size'

const FilterProduct = () => {
  return (
    <div className=" space-y-5">
      <SearchProduct />
      <Rental />
      <LocalPickup />
      {/* <EventDate /> */}
      <Price />
      <Size />
    </div>
  )
}

export default FilterProduct
