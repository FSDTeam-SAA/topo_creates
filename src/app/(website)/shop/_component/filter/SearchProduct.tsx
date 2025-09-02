'use client'
import { useFilterStore } from "@/zustand/filterStore";
import React from "react";

const SearchProduct = () => {
  const { setSearch } = useFilterStore();

  return (
    <div>
      <input
        type="text"
        className="border-b border-black pb-1 focus:outline-none w-full placeholder:font-avenir placeholder:tracking-widest placeholder:text-black/50"
        placeholder="SEARCH"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchProduct;
