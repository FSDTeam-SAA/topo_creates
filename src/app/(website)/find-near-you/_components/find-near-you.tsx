"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

export default function FindNearYou() {
  const [postCode, setPostCode] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    // You can later replace this with real query logic
    console.log({
      postCode,
      size,
      category,
      minPrice,
      maxPrice,
    });
  };

  return (
    <section className="container mx-auto pb-6 pt-12">
      <div className="text-center py-[30px] md:py-[40px] lg:py-[50px]">
        <h1 className="headerClass uppercase">Find Near You</h1>
        <p className="sub-title">FIND YOUR DRESS NEAR YOU FOR LOCAL PICK UP</p>
      </div>

      <div className="py-[30px] md:py-[40px] lg:py-[50px]">
        <div className="relative">
          <Input
            type="text"
            placeholder="POST CODE"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            className="w-full border-b border-black text-xl  font-normal text-black uppercase leading-[36px] placeholder:text-black placeholder:font-normal placeholder:leading-[36px] py-2 pr-10 rounded-none border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
            onClick={handleSearch}
          >
            <Search size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[45px] lg:gap-[60px] pt-[30px] md:pt-[45px] lg:pt-[60px]">
          {/* Size */}
          <div>
            <Label className="text-lg  text-black font-normal leading-[28px] tracking-[0.15em]">
              Size
            </Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="w-full border-b shadow-none border-t-0 border-r-0 border-l-0 border-black rounded-none pt-5 pb-3 h-auto focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div>
            <Label className="text-lg  text-black font-normal leading-[28px] tracking-[0.15em]">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full border-b border-t-0 shadow-none border-r-0 border-l-0 border-black rounded-none pt-5 pb-3 h-auto focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="evening">Evening</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="cocktail">Cocktail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="w-full flex items-end gap-4">
            <div className="w-full">
              <Label className="text-lg  text-black font-normal leading-[28px] tracking-[0.15em]">
                Price Range
              </Label>
              <div className="flex items-center gap-2 border-b border-black pb-4">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="text-lg shadow-none font-normal text-black tracking-[0.15px] border-none rounded-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <span className="text-2xl text-black px-2">—</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="text-lg shadow-none  font-normal text-black tracking-[0.15px] border-none rounded-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
