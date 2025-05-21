import React from "react";
import WishlistCard from "./wishlist_card";

const YourWishlist = () => {
  return (
    <div>
      <section>
        <div className="mb-11">
          <h2 className="text-3xl  tracking-widest font-normal mb-6 ">
            Your Wishlist
          </h2>

          <hr className="border border-b border-[#000000]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[30px]">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <WishlistCard key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default YourWishlist;
