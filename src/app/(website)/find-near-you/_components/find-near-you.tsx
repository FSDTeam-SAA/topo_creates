"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function FindNearYou() {
  const [postCode, setPostCode] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <section className="container mx-auto pb-6 pt-12">
      <div className="text-center py-[30px] md:py-[40px] lg:py-[50px]">
        <h1 className="text-[40px] md:text-[48px] lg:text-[56px] font-light leading-[64px] text-black uppercase tracking-[20px]">
          Find Near You
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-black font-normal pt-[10px] md:pt-[13px] lg:pt-[15px]">
          FIND YOUR DRESS NEAR YOU FOR LOCAL PICK UP
        </p>
      </div>

      <div className="py-[30px] md:py-[40px] lg:py-[50px]">
        <div className="relative">
          <input
            type="text"
            placeholder="POST CODE"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            className="w-full border-b border-black text-xl md:text-2xl lg:text-3xl font-normal text-black uppercase leading-[36px] placeholder:text-xl md:placeholder:text-2xl lg:placeholder:text-3xl placeholder:text-black placeholder:font-normal placeholder:leading-[36px] py-2 pr-10 focus:outline-none focus:border-black"
          />
          <button className="absolute right-0 top-6">
            <Search size={18} />
          </button>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[45px] lg:gap-[60px] pt-[30px] md:pt-[45px] lg:pt-[60px]">
          <div>
            <label className="text-lg md:text-xl lg:text-2xl text-black font-normal leading-[28px] tracking-[0.15em]">
              Size
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border-b border-black focus:outline-none focus:border-black pt-5 pb-3"
            >
              <option
                className="text-lg md:text-xl lg:text-2xl font-normal text-black leadintg-[28px] tracking-[0.15px] "
                value=""
              >
                Please Select
              </option>
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px]"
                value="xs"
              >
                XS
              </option>
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px]"
                value="s"
              >
                S
              </option>
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px]"
                value="m"
              >
                M
              </option>
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px]"
                value="l"
              >
                L
              </option>
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px]"
                value="xl"
              >
                XL
              </option>
            </select>
          </div>

          <div>
            <label className="text-lg md:text-xl lg:text-2xl text-black font-normal leading-[28px] tracking-[0.15em]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-b border-black focus:outline-none focus:border-black pt-5 pb-3"
            >
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px] "
                value=""
              >
                Please Select
              </option>
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px] "
                value="evening"
              >
                Evening
              </option>
              <option
                className="v font-normal text-black leadintg-[28px] tracking-[0.15px] "
                value="casual"
              >
                Casual
              </option>
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px] "
                value="wedding"
              >
                Wedding
              </option>
              <option
                className="*:text-base font-normal text-black leadintg-[28px] tracking-[0.15px] "
                value="cocktail"
              >
                Cocktail
              </option>
            </select>
          </div>

          <div className="w-full flex items-end justify-center gap-5">
            <div className=" ">
              <label className="text-lg md:text-xl lg:text-2xl text-black font-normal leading-[28px] tracking-[0.15em]">
                Price Range
              </label>
              <div className="w-full border-b border-black pb-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full text-lg md:text-xl lg:text-2xl font-normal text-black leadintg-[28px] tracking-[0.15px] outlint-none focus:outline-none"
                />
              </div>
            </div>
            <div className="w-[10%] py-4 ">—</div>
            <div className="w-[60%] border-b border-black pb-3">
              <input
                type="number"
                placeholder="MAX"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full text-lg md:text-xl lg:text-2xl font-normal text-black leadintg-[28px] tracking-[0.15px] outlint-none focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
