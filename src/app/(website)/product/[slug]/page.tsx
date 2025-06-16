/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Heart,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DatePicker } from "@/components/date-picker";
import { DeliveryOptions } from "@/components/delivery-options";
import { SizeGuide } from "@/components/size-guide";
import { RentalDurationTabs } from "@/components/rental-duration-tabs";
import { PriceBreakdown } from "@/components/price-breakdown";
import { ProductThumbnails } from "@/components/product-thumbnails";
import type {
  DeliveryOption,
  Product,
  ProductSize,
  RentalDuration,
} from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { addDays, startOfDay } from "date-fns";
import { getProductBySlug } from "@/data/product-data";
import GiveAndTake from "@/components/section/GiveAndTake";
import StyledByYou from "@/components/product/styled_By_You";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    undefined
  );
  const [selectedDuration, setSelectedDuration] = useState<RentalDuration>("4");
  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOption>("shipping");
  const [product, setProduct] = useState<Product | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  // Find the correct product based on the slug
  useEffect(() => {
    const foundProduct = getProductBySlug(params.slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.defaultSize);
      calculateTotalPrice(foundProduct, selectedDuration, deliveryOption);
    }
  }, [deliveryOption, params.slug, selectedDuration]);

  // Calculate end date based on start date and duration
  useEffect(() => {
    if (startDate) {
      const days = selectedDuration === "4" ? 4 : 8;
      setEndDate(addDays(startDate, days - 1)); // -1 because the start date counts as day 1
    } else {
      setEndDate(null);
    }
  }, [startDate, selectedDuration]);

  // Calculate total price based on product, duration, and delivery option
  const calculateTotalPrice = (
    product: Product,
    duration: RentalDuration,
    deliveryOpt: DeliveryOption
  ) => {
    // Base rental fee for 4 days
    const baseRentalFee = product.rentalFee;

    // Calculate rental fee based on duration
    let rentalFee = baseRentalFee;
    if (duration === "8") {
      rentalFee = baseRentalFee * 2; // Double the price for 8 days
    }

    // Add insurance fee
    let price = rentalFee + product.insuranceFee;

    // Add shipping fee if shipping is selected
    if (deliveryOpt === "shipping") {
      price += product.shippingFee;
    }

    setTotalPrice(price);
  };

  // Update price when options change
  useEffect(() => {
    if (product) {
      calculateTotalPrice(product, selectedDuration, deliveryOption);
    }
  }, [product, selectedDuration, deliveryOption]);

  const handleDurationChange = (duration: RentalDuration) => {
    setSelectedDuration(duration);

    // Recalculate end date if start date is selected
    if (startDate) {
      const days = duration === "4" ? 4 : 8;
      setEndDate(addDays(startDate, days - 1));
    }
  };

  const handleDeliveryOptionChange = (option: DeliveryOption) => {
    setDeliveryOption(option);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast({
        title: "Error",
        description: "Please select a size",
        duration: 3000,
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select rental dates",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Success",
      description: "Item added to bag successfully!",
      duration: 3000,
    });
    router.push("/checkout");

    // Here you would typically add the item to a cart state or context
  };

  // Get tomorrow as the minimum selectable date
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return startOfDay(tomorrow);
  };

  // Handle navigation in the zoom modal
  const navigateImage = (direction: "next" | "prev") => {
    if (!product) return;

    if (direction === "next") {
      setSelectedImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  // If product is not found
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white mt-[60px]">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto py-[50px] px-4">
        {/* Product Images */}
        <div className="grid md:grid-cols-5 gap-3 items-start">
          <div className="hidden md:block">
            <ProductThumbnails
              images={product.images}
              onSelect={setSelectedImageIndex}
              selectedIndex={selectedImageIndex}
            />
          </div>
          <div className="md:col-span-4 relative">
            <Image
              src={
                product.images[selectedImageIndex]?.src || "/placeholder.svg"
              }
              alt={product.images[selectedImageIndex]?.alt || "Product image"}
              width={600}
              height={900}
              className="w-full aspect-[2/3] object-cover border border-gray-100"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="bg-white/80 p-2 hover:bg-white transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <span className="sr-only">Add to bag</span>
              </button>
              <button className="bg-white/80 p-2 hover:bg-white transition-colors">
                <Heart className="w-5 h-5" />
                <span className="sr-only">Add to wishlist</span>
              </button>
            </div>
            <button
              className="absolute bottom-4 right-4 bg-white/80 p-2 hover:bg-white transition-colors"
              onClick={() => setIsZoomModalOpen(true)}
              aria-label="View larger image"
            >
              <ZoomIn className="w-5 h-5" />
              <span className="sr-only">Zoom</span>
            </button>

            {/* Image Zoom Modal */}
            {isZoomModalOpen && (
              <div
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setIsZoomModalOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="image-modal-title"
              >
                <div
                  className="relative max-w-4xl max-h-[90vh] w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomModalOpen(false);
                    }}
                    aria-label="Close image view"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="relative h-full">
                    <Image
                      src={
                        product.images[selectedImageIndex]?.src ||
                        "/placeholder.svg"
                      }
                      alt={
                        product.images[selectedImageIndex]?.alt ||
                        "Product image"
                      }
                      width={1200}
                      height={1800}
                      className="mx-auto max-h-[80vh] w-auto object-contain"
                      id="image-modal-title"
                    />

                    {product.images.length > 1 && (
                      <>
                        <button
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateImage("prev");
                          }}
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateImage("next");
                          }}
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {product.images.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            selectedImageIndex === index
                              ? "bg-white"
                              : "bg-white/40"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(index);
                          }}
                          aria-label={`View image ${index + 1}`}
                          aria-current={
                            selectedImageIndex === index ? "true" : "false"
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-[60px]">
          <div>
            <h1 className="lg:text-5xl md:text-4xl text-2xl tracking-[20px] mb-3 font-normal">
              {product.name}
            </h1>
            <p className="tracking-[10%] leading-[30px] font-normal lg:text-2xl md:text-2xl text-xl">
              ${product.price} / {selectedDuration} DAYS
            </p>
          </div>

          <RentalDurationTabs
            price={product.price}
            onDurationChange={handleDurationChange}
            baseRentalFee={product.rentalFee}
          />

          <div className="space-y-4">
            <h3 className="uppercase tracking-[0.2rem] leading-[20px] text-[14px]">
              SELECT RENTAL DATES
            </h3>
            <div className="h-[1px] bg-black w-full"></div>
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Start date"
                value={startDate}
                onChange={setStartDate}
                minDate={getMinDate()}
              />
              <DatePicker
                label="End date"
                value={endDate}
                onChange={setEndDate}
                disabled={true} // End date is calculated automatically
              />
            </div>
          </div>

          <DeliveryOptions onOptionChange={handleDeliveryOptionChange} />

          <PriceBreakdown
            rentalFee={
              selectedDuration === "8"
                ? product.rentalFee * 2
                : product.rentalFee
            }
            insuranceFee={product.insuranceFee}
            shippingFee={
              deliveryOption === "shipping" ? product.shippingFee : 0
            }
            total={totalPrice}
          />

          <button
            className="w-full py-4 border-t border-b border-black uppercase tracking-[0.20rem] leading-[20px] hover:bg-black hover:text-white transition-colors"
            onClick={handleAddToBag}
          >
            BUY NOW
          </button>

          <SizeGuide
            availableSizes={product.sizes}
            defaultSize={product.defaultSize}
            onSizeChange={setSelectedSize}
          />

          <div className="flex flex-wrap gap-x-4 text-[14px] leading-[20px] tracking-[0.2rem] uppercase">
            <p className="tracking-widest">
              INSURANCE INCLUDED: YOUR $5 INSURANCE COVERS MINOR WEAR & TEAR.
              <span className="underline">LEARN MORE</span> ABOUT WHAT'S COVERED.
            </p>
          </div>
        </div>
      </div>

      {/* Styled By You Section */}
      <StyledByYou />

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="md:text-3xl lg:text-5xl text-2xl tracking-[20px] leading-[20px] mb-4">HOW IT WORKS</h2>
        <p className="mb-12">WE MADE IT SIMPLE. YOU MAKE IT STYLISH.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="text-xl tracking-widest">BOOK</h3>
            <p className="text-sm">
              Choose your size and rental dates and what's available instantly.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 className="text-xl tracking-widest">WEAR</h3>
            <p className="text-sm">
              Collect locally or enjoy fast delivery to your door your look,
              your way.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3 className="text-xl tracking-widest">RETURN</h3>
            <p className="text-sm">
              Drop it off or use the included return label. No stress, no dry
              cleaning.
            </p>
          </div>
        </div>
      </div>

      <GiveAndTake />
    </div>
  );
}
