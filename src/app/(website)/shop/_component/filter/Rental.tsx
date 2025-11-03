'use client'

import { useFilterStore } from '@/zustand/filterStore'

const Rental = () => {
  const { setFourDayRental } = useFilterStore()

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center gap-3">
        <input className="h-4 w-4" type="checkbox" id="XXS" />
        <label
          htmlFor="XXS"
          className="font-avenir tracking-[0.2rem] opacity-75 uppercase"
        >
          Available Near Me
        </label>
      </div> */}

      <div className="flex items-center gap-3">
        <input
          className="h-4 w-4"
          type="checkbox"
          id="XXS"
          onChange={() => setFourDayRental(true)}
        />
        <label
          htmlFor="XXS"
          className="font-avenir tracking-[0.2rem] opacity-75 uppercase"
        >
          4-Day Rental
        </label>
      </div>

      <div className="flex items-center gap-3">
        <input className="h-4 w-4" type="checkbox" id="XXS" />
        <label
          htmlFor="XXS"
          className="font-avenir tracking-[0.2rem] opacity-75 uppercase"
        >
          8-DAY RENTAL
        </label>
      </div>
    </div>
  )
}

export default Rental
