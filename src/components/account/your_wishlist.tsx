import React from 'react'
import WishlistCard from './wishlist_card'

const YourWishlist = () => {
  return (
    <div>
      <section>
        <div className="mb-11">
          <h2 className="text-xl md:text-2xl tracking-widest font-light mb-6 border-black border-b-[1px] pb-5 md:pb-8">
            Your Wishlist
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[30px]">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <WishlistCard key={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default YourWishlist
