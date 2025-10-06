import Image from 'next/image'
import React from 'react'

const WishlistCard = () => {
  return (
    <div className="mb-24">
      <div className="flex flex-col">
        <div className="relative aspect-[3/4] mb-5">
          <Image
            src="https://as1.ftcdn.net/v2/jpg/02/63/75/22/1000_F_263752218_3uvpwtuYiq10lNqgXz9xHOltRdgHbKBU.jpg"
            alt="Olivia Dress"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-lg md:text-xl tracking-widest font-light text-center text-black mb-[10px]">
          Olivia Dress
        </h3>
        <p className="text-[12px] md:text-sm font-light text-black text-center tracking-widest">
          RENT $XX | RRP $XX
        </p>
      </div>
    </div>
  )
}

export default WishlistCard
