"use client"

import { useState } from "react"
import type { RentalDuration } from "@/types/product"

interface RentalDurationTabsProps {
  price: number
  baseRentalFee: number
  onDurationChange: (duration: RentalDuration) => void
}

export function RentalDurationTabs({ baseRentalFee, onDurationChange }: RentalDurationTabsProps) {
  const [activeDuration, setActiveDuration] = useState<RentalDuration>("4")

  const handleDurationChange = (duration: RentalDuration) => {
    setActiveDuration(duration)
    onDurationChange(duration)
  }

  return (
    <div className="flex border-b border-black">
      <button
        className={`w-1/2 py-4 text-center ${activeDuration === "4" ? "border-b-2 border-black" : ""}`}
        onClick={() => handleDurationChange("4")}
      >
        4 DAY RENT
      </button>
      <button
        className={`w-1/2 py-4 text-center ${activeDuration === "8" ? "border-b-2 border-black" : ""}`}
        onClick={() => handleDurationChange("8")}
      >
        8 DAY RENT (${baseRentalFee * 2})
      </button>
    </div>
  )
}
