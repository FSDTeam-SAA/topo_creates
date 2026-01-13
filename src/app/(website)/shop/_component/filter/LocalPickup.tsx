'use client'

import { useFilterStore } from '@/zustand/filterStore'

export const LocalPickup = () => {
  const { shipping, localPickup, selectShipping, selectLocalPickup } =
    useFilterStore()

  return (
    <div className="py-6 tracking-widest text-gray-600">
      <h3 className="uppercase tracking-[5px] mb-3 border-b border-black pb-2">
        Delivery
      </h3>

      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="delivery"
            checked={shipping}
            onChange={selectShipping}
          />
          <span>Shipping</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="delivery"
            checked={localPickup}
            onChange={selectLocalPickup}
          />
          <span>Local Pickup</span>
        </label>
      </div>
    </div>
  )
}
