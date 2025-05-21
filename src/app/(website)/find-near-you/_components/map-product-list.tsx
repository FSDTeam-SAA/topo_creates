"use client"

import { useState } from "react"
import MapProductCard from "./map-product-card"

// Mock data for products
const products = [
  {
    id: "1",
    name: "Dress Name",
    price: "$XX",
    days: 4,
    size: "XL",
    image: "/images/dress.png",
    description: "Dress discretion",
    shipping: true,
    pickup: true,
  },
  {
    id: "2",
    name: "Dress Name",
    price: "$XX",
    days: 4,
    size: "XL",
    image: "/images/dress.png",
    description: "Dress discretion",
    shipping: true,
    pickup: false,
  },
  {
    id: "3",
    name: "Dress Name",
    price: "$XX",
    days: 4,
    size: "XL",
    image: "/images/dress.png",
    description: "Dress discretion",
    shipping: false,
    pickup: true,
  },
  {
    id: "4",
    name: "Dress Name",
    price: "$XX",
    days: 4,
    size: "XL",
    image: "/images/dress.png",
    description: "Dress discretion",
    shipping: false,
    pickup: true,
  },
  {
    id: "5",
    name: "Dress Name",
    price: "$XX",
    days: 4,
    size: "XL",
    image: "/images/dress.png",
    description: "Dress discretion",
    shipping: true,
    pickup: true,
  },
  {
    id: "6",
    name: "Dress Name",
    price: "$XX",
    days: 4,
    size: "XL",
    image: "/images/dress.png",
    description: "Dress discretion",
    shipping: true,
    pickup: false,
  },
]

export default function MapProductList() {
  const [showMore, setShowMore] = useState(false)

  const displayedProducts = showMore ? products : products.slice(0, 4)

  return (
    <section className="">
      <div className="">
        {displayedProducts.map((product) => (
          <MapProductCard key={product.id} {...product} />
        ))}
      </div>

      {!showMore && products.length > 4 && (
        <div className="text-center pt-[30px] md:pt-[40px] lg:pt-[60px]">
          <button onClick={() => setShowMore(true)} className="text-base font-normal text-black uppercase tracking-[0.20%] border-b border-black pb-1">
            Load More
          </button>
        </div>
      )}
      <p className="text-sm text-black font-normal tracking-[.20rem] leading-[20px] text-center pt-[30px] md:pt-[45px] lg:pt-[60px] uppercase pb-[25px]">Showing 1-25 of 1,200 dresses near you</p>
    </section>
  )
}
