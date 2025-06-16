"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Search, X, Trash2, Upload } from "lucide-react";
import Image from "next/image";

// Product type definition
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function CheckoutPage() {
  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    idVerification: "",
  });

  // ID preview state
  const [idPreview, setIdPreview] = useState<string | null>(null);

  // Order details state
  const [orderDetails, setOrderDetails] = useState({
    rentalOption: "4day",
    startDate: "",
    endDate: "",
    deliveryOption: "shipping",
    postCode: "",
  });

  // Products state - sample data
  const [products, setProducts] = useState<Product[]>([
    {
      id: "dress-001",
      name: "ELEGANT FLOWING DRESS",
      price: 220.0,
      image: "/elegant-flowing-dress.png",
    },
    {
      id: "dress-002",
      name: "EVENING GOWN",
      price: 180.0,
      image: "/elegant-evening-gown.png",
    },
  ]);

  // Price state
  const [pricing, setPricing] = useState({
    rentalFee: 400.0, // Sum of all product prices
    insurance: 5.0,
    shipping: 10.0,
    additionalFee: 0.0,
    total: 415.0,
  });

  // Size guide state
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Calculate total pricing
  useEffect(() => {
    const baseRentalFee = products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    const additionalFee =
      orderDetails.rentalOption === "8day" ? 15.0 * products.length : 0.0;

    setPricing({
      rentalFee: baseRentalFee,
      insurance: 5.0,
      shipping: 10.0,
      additionalFee: additionalFee,
      total: baseRentalFee + 5.0 + 10.0 + additionalFee,
    });
  }, [products, orderDetails.rentalOption]);

  // Handle customer details change
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle file upload for ID verification
    if (name === "idVerification" && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setIdPreview(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle order details change
  interface OrderDetails {
    rentalOption: string;
    startDate: string;
    endDate: string;
    deliveryOption: string;
    postCode: string;
  }

  const handleOrderChange = (name: keyof OrderDetails, value?: string) => {
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If start date changes, calculate end date based on rental option
    if (name === "startDate" && value) {
      const startDate = new Date(value);
      const days = orderDetails.rentalOption === "4day" ? 4 : 8;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + days);

      // Format the date as YYYY-MM-DD for the input
      const formattedEndDate = endDate.toISOString().split("T")[0];

      setOrderDetails((prev) => ({
        ...prev,
        endDate: formattedEndDate,
      }));
    }
  };

  // Update end date when rental option changes
  useEffect(() => {
    if (orderDetails.startDate) {
      const startDate = new Date(orderDetails.startDate);
      const days = orderDetails.rentalOption === "4day" ? 4 : 8;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + days);

      // Format the date as YYYY-MM-DD for the input
      const formattedEndDate = endDate.toISOString().split("T")[0];

      setOrderDetails((prev) => ({
        ...prev,
        endDate: formattedEndDate,
      }));
    }
  }, [orderDetails.rentalOption, orderDetails.startDate]);

  // Handle form submission
  const handleSubmit = () => {
    const allData = {
      customerDetails,
      orderDetails,
      products,
      pricing,
    };

    console.log("Checkout Data:", allData);
  };

  // Handle removing ID preview
  const handleRemoveIdPreview = () => {
    setIdPreview(null);
    setCustomerDetails((prev) => ({
      ...prev,
      idVerification: "",
    }));
  };

  // Handle removing a product
  const handleRemoveProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-20">
      <h1 className="text-3xl font-bold mb-8">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Customer Details */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold border-b-[1px] border-b-black/50 pb-2 mb-4">
            CUSTOMER DETAILS
          </h2>

          <div className="space-y-2">
            <Label className="text-[24px] font-normal" htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              className="border-0 border-b-[1px] rounded-none border-b-black/50 focus-visible:ring-0 "
              id="fullName"
              name="fullName"
              value={customerDetails.fullName}
              onChange={handleCustomerChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[24px] font-normal" htmlFor="emailAddress">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              className="border-0 border-b-[1px] rounded-none border-b-black/50 focus-visible:ring-0"
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={customerDetails.emailAddress}
              onChange={handleCustomerChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[24px] font-normal" htmlFor="phoneNumber">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              className="border-0 border-b-[1px] rounded-none border-b-black/50 focus-visible:ring-0"
              id="phoneNumber"
              name="phoneNumber"
              value={customerDetails.phoneNumber}
              onChange={handleCustomerChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[24px] font-normal" htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              className="border-0 border-b-[1px] rounded-none border-b-black/50 focus-visible:ring-0"
              id="address"
              name="address"
              value={customerDetails.address}
              onChange={handleCustomerChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[24px] font-normal" htmlFor="idVerification">
              ID Verification <span className="text-red-500">*</span>
            </Label>
            {!idPreview ? (
              <div className=" rounded-md p-6 text-center">
                <div className="flex justify-center mb-4">
                  {/* <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div> */}
                </div>
                <Input
                  id="idVerification"
                  name="idVerification"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCustomerChange}
                />
                <Label
                  htmlFor="idVerification"
                  className="cursor-pointer text-sm border-2 border-dashed border-gray-400 rounded-md p-4 flex flex-col items-center justify-center"
                >
                  <Upload className="h-[100px] w-[100px] mx-auto my-5  " />
                </Label>

                <p className="border-0 border-t-[1px] rounded-none border-b-black pt-5">
                  {" "}
                  Upload a valid photo ID to complete your booking. No $1 hold
                  will be placed.
                </p>
              </div>
            ) : (
              <div className="relative border rounded-md overflow-hidden">
                <Image
                  height={200}
                  width={400}
                  src={idPreview || "/placeholder.svg"}
                  alt="ID Verification"
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={handleRemoveIdPreview}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="bg-black bg-opacity-70 text-white text-xs p-2 absolute bottom-0 w-full">
                  ID Verification Uploaded
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">ORDER SUMMARY</h2>

          {/* Products list */}
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-start gap-4 border-b pb-4"
              >
                <div className="w-20 h-20 bg-gray-200 rounded">
                  <Image
                    height={100}
                    width={100}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${product.price.toFixed(2)} /{" "}
                    {orderDetails.rentalOption === "4day" ? "4 DAYS" : "8 DAYS"}
                  </p>
                  <p className="text-sm text-gray-600">
                    DRESS ID: {product.id}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div>
            <Tabs
              defaultValue="4day"
              className="w-full"
              onValueChange={(value) =>
                handleOrderChange("rentalOption", value)
              }
            >
              <TabsList className="grid w-full grid-cols-2 ">
                <TabsTrigger className="bg-none" value="4day ">
                  4 DAY RENT
                </TabsTrigger>
                <TabsTrigger value="8day">
                  8 DAY RENT(+$15 PER ITEM)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label>SELECT RENTAL DATES</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="sr-only">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={orderDetails.startDate}
                  onChange={(e) =>
                    handleOrderChange("startDate", e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="sr-only">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={orderDetails.endDate}
                  onChange={(e) => handleOrderChange("endDate", e.target.value)}
                  className="w-full"
                  readOnly
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {orderDetails.rentalOption === "4day"
                ? "4-day rental period will be automatically calculated"
                : "8-day rental period will be automatically calculated (+$15 per item)"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>DELIVERY OPTION</Label>
            <Tabs
              defaultValue="shipping"
              className="w-full"
              onValueChange={(value) =>
                handleOrderChange("deliveryOption", value)
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shipping">SHIPPING</TabsTrigger>
                <TabsTrigger value="pickup">LOCAL PICKUP</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label htmlFor="postCode">POST CODE</Label>
            <div className="relative">
              <Input
                id="postCode"
                name="postCode"
                value={orderDetails.postCode}
                onChange={(e) => handleOrderChange("postCode", e.target.value)}
              />
              <Button
                size="icon"
                className="absolute right-0 top-0"
                variant="ghost"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-32   rounded-md mt-2">
              {/* Map placeholder */}
              <iframe
                className="w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2190.686032446237!2d-111.79177313086753!3d34.64661204100477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872daba16066fa05%3A0xbe4cb7b316b5f970!2zTiBEYXZlIFdpbmdmaWVsZCBSZCwgTGFrZSBNb250ZXp1bWEsIEFaIDg2MzM1LCDgpq7gpr7gprDgp43gppXgpr_gpqgg4Kav4KeB4KaV4KeN4Kak4Kaw4Ka-4Ka34KeN4Kaf4KeN4Kaw!5e0!3m2!1sbn!2sbd!4v1747378180721!5m2!1sbn!2sbd"
              ></iframe>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">PRICE BREAKDOWN</h3>
            <div className="flex justify-between">
              <span>RENTAL FEE ({products.length} ITEMS)</span>
              <span>${pricing.rentalFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>INSURANCE</span>
              <span>${pricing.insurance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SHIPPING</span>
              <span>${pricing.shipping.toFixed(2)}</span>
            </div>
            {pricing.additionalFee > 0 && (
              <div className="flex justify-between">
                <span>ADDITIONAL FEE (8-DAY RENTAL)</span>
                <span>${pricing.additionalFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold border-t pt-2">
              <span>TOTAL</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              className="flex justify-between items-center w-full"
              onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
            >
              <h3 className="font-bold">SIZE GUIDE</h3>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isSizeGuideOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSizeGuideOpen && (
              <div className="border p-4 rounded-md space-y-4 mt-2">
                <div className="flex justify-between items-center">
                  <span>Tight Fit</span>
                  <span>True to Size</span>
                  <span>Relaxed Fit</span>
                </div>
                <div className="h-1 bg-gray-200 relative">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <p>
                    This item fits true to size. We recommend selecting your
                    normal size.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600 mt-4">
            <p>
              INSURANCE INCLUDED: YOUR $5 INSURANCE COVERS MINOR WEAR & TEAR.{" "}
              <a href="#" className="underline">
                LEARN MORE
              </a>{" "}
              ABOUT WHAT&apos;S COVERED.
            </p>
          </div>

          <Button className="w-full mt-6" onClick={handleSubmit}>
            CONFIRM & PAY
          </Button>
        </div>
      </div>
    </div>
  );
}
