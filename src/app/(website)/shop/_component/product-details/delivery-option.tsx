'use client'

import React, { useState } from 'react'
import ShoppinghMap from '../shopping-map'
import { useLocationStore } from '@/zustand/useLocationStore'

const DeliveryOption = ({ masterDressId }: { masterDressId: string }) => {
  const [option, setOption] = useState('shipping')
  const { setLocation, setLenders } = useLocationStore()

  const handleLocalPickup = () => {
    // 1️⃣ Browser থেকে location নিন
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude

        setLocation(lat, lng)

        // 2️⃣ API call করুন
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/lenders/nearby/${masterDressId}?latitude=${lat}&longitude=${lng}`
          )

          const result = await res.json()
          if (result.success) {
            setLenders(result.data)
          }
        } catch (err) {
          console.error('Nearby API Error:', err)
        }
      },
      (err) => {
        console.error('Location Error:', err)
        alert('Please allow location access for Local Pickup.')
      }
    )
  }

  return (
    <div className="font-avenir uppercase mt-10">
      <h1 className=" opacity-75 tracking-widest border-b border-black pb-1">
        Delivery Option
      </h1>

      <div className="mt-8 opacity-75 flex items-center gap-5">
        <button
          onClick={() => {
            setOption('shipping')
          }}
          className={`w-1/2 pb-2 uppercase tracking-widest ${
            option === 'shipping'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-white'
          }`}
        >
          Shipping
        </button>

        <button
          onClick={() => {
            setOption('local')
            handleLocalPickup()
          }}
          className={`w-1/2 pb-2 uppercase tracking-widest ${
            option === 'local'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-white'
          }`}
        >
          Local Pickup
        </button>
      </div>

      <div>
        {option === 'shipping' ? (
          <p className="pt-5 md:pt-10 font-light text-sm font-sans tracking-[0.1rem]">
            $10 shipping fee (includes prepaid return label) Estimated delivery:
            1-2 business days
          </p>
        ) : (
          <div className="pt-5 w-full">
            <ShoppinghMap />
          </div>
        )}
      </div>
    </div>
  )
}

export default DeliveryOption
