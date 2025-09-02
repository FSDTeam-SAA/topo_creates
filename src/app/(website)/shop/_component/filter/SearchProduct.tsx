import React from "react";

const SearchProduct = () => {
  return (
    <div>
      <input
        type="text"
        className="border-b border-black pb-1 focus:outline-none w-full placeholder:font-avenir placeholder:tracking-widest placeholder:text-black/50"
        placeholder="SEARCH"
      />
    </div>
  );
};

export default SearchProduct;
