"use client";

import HowItWork from "@/components/HowItWork";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/product/product-skeleton";
import { SearchBar } from "@/components/product/search-bar";
import { ShopFilters } from "@/components/product/shop-filters";
import GiveAndTake from "@/components/section/GiveAndTake";
import { getMoreProducts } from "@/data/product-data";
import { filterProducts, type FilterOptions } from "@/lib/filter-utils";
import { useCallback, useEffect, useState } from "react";

// Number of products to show per "page"
const PRODUCTS_PER_PAGE = 8;

export default function ShopPage() {
  // Get all products
  const allProducts = getMoreProducts(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    availableNearMe: false,
    rentalDurations: [],
    pickupLocation: "",
    pickupDistance: 50, // Default to 50km
    eventDate: "",
    priceRange: 1000,
    colors: [],
    sizes: [],
    designers: [],
    categories: [],
    locations: [],
  });
  const [visibleProducts, setVisibleProducts] =
    useState<number>(PRODUCTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters to products
  const filteredProducts = filterProducts(allProducts, {
    ...filters,
    searchQuery,
  });

  // Reset visible products count when filters change
  useEffect(() => {
    setVisibleProducts(PRODUCTS_PER_PAGE);
  }, [filters, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleLoadMore = useCallback(() => {
    if (isLoading) return; // Prevent multiple clicks

    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      setVisibleProducts((prev) => prev + PRODUCTS_PER_PAGE);
      setIsLoading(false);
    }, 1200); // Slightly longer delay to show the skeleton loading
  }, [isLoading]);

  // Get the products to display based on current page
  const hasMoreProducts = filteredProducts.length > visibleProducts;
  const remainingProducts = filteredProducts.length - visibleProducts;
  const nextBatchSize = Math.min(remainingProducts, PRODUCTS_PER_PAGE);

  return (
    <div className="container mx-auto  py-8 mt-20">
      <div className="text-center mb-12">
        <h1 className="headerClass">SHOP</h1>
        <p className=" text-[13px] text-gray-600">
          CURATED DESIGNER RENTALS FOR EVERY MOMENT.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <SearchBar onSearch={handleSearch} />
          <ShopFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className="w-full lg:w-3/4">
          {/* Main product grid */}
          <ProductGrid title="" products={allProducts} />

          {/* Skeleton loader when loading more products */}
          {isLoading && (
            <div className="mt-8">
              <ProductGridSkeleton count={nextBatchSize} />
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg tracking-wider">
                No products match your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilters({
                    availableNearMe: false,
                    rentalDurations: [],
                    pickupLocation: "",
                    pickupDistance: 50,
                    eventDate: "",
                    priceRange: 1000,
                    colors: [],
                    sizes: [],
                    designers: [],
                    categories: [],
                    locations: [],
                  });
                }}
                className="mt-4 text-sm tracking-widest border-b border-black pb-1"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}

          {hasMoreProducts && !isLoading && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="text-sm tracking-widest border-b border-black pb-1"
              >
                LOAD MORE
              </button>
            </div>
          )}
          <HowItWork />

          <GiveAndTake />

          {!hasMoreProducts && filteredProducts.length > 0 && (
            <div className="text-center mt-8 text-sm text-gray-500 tracking-wider">
              You&#39;ve reached the end of the collection
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
