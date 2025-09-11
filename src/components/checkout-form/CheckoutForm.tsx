"use client";
import { Upload } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useShoppingStore } from "@/zustand/shopingStore";

const CheckoutForm = () => {
  const { fullName, email, phone, address, idPreview, setField, isConfirm } =
    useShoppingStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setField("idVerification", file);
  };

  return (
    <div className="font-avenir">
      <div>
        {/* Header */}
        <h1 className="font-light opacity-75 text-[18px] tracking-[0.5rem] uppercase">
          checkout
        </h1>

        {/* Customer Details Section */}
        <div className="mt-5">
          <h2 className="text-[16px] font-light text-black mb-8 border-b border-black pb-2 opacity-75 tracking-[0.2rem]">
            CUSTOMER DETAILS
          </h2>

          {isConfirm &&  idPreview ? (
            <div>
              <h1 className="block text-sm text-black mb-2 uppercase opacity-75">
                Full Name : {fullName}
              </h1>
              <h1 className="block text-sm text-black mb-2 uppercase opacity-75">
                Email : {email}
              </h1>
              <h1 className="block text-sm text-black mb-2 uppercase opacity-75">
                Phone Number : {phone}
              </h1>
              <h1 className="block text-sm text-black mb-2 uppercase opacity-75">
                Address: {address}
              </h1>
              <h1 className="block text-sm text-black mb-2 uppercase opacity-75">
                ID Verification :
              </h1>

              {idPreview && (
                <Image
                  src={idPreview}
                  alt="ID Preview"
                  width={1000}
                  height={1000}
                  className="h-32 w-32 mb-2"
                />
              )}
            </div>
          ) : (
            <div>
              <div className="space-y-8">
                {/* Full Name */}
                <div>
                  <label className="block text-sm text-black mb-2 uppercase opacity-75">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-black pb-2 text-black opacity-75 placeholder-gray-400 focus:outline-none focus:border-black uppercase"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm text-black mb-2 uppercase opacity-75">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setField("email", e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-black pb-2 text-black opacity-75 placeholder-gray-400 focus:outline-none focus:border-black uppercase"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm text-black mb-2 uppercase opacity-75">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-black pb-2 text-black opacity-75 placeholder-gray-400 focus:outline-none focus:border-black uppercase"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm text-black mb-2 uppercase opacity-75">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setField("address", e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-black pb-2 text-black opacity-75 placeholder-gray-400 focus:outline-none focus:border-black uppercase"
                  />
                </div>

                {/* ID Verification */}
                <div>
                  <label className="block text-sm text-black mb-4 uppercase opacity-75">
                    ID Verification <span className="text-red-500">*</span>
                  </label>

                  <div className="border-b border-black p-8 text-center">
                    <input
                      type="file"
                      id="id-upload"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="id-upload" className="cursor-pointer">
                      {idPreview ? (
                        <Image
                          src={idPreview}
                          alt="ID Preview"
                          width={1000}
                          height={1000}
                          className="mx-auto h-32 object-contain mb-2"
                        />
                      ) : (
                        <Upload className="w-8 h-8 mx-auto mb-4 opacity-50 font-thin" />
                      )}
                      <p className="text-sm text-black opacity-75 uppercase">
                        {idPreview ? "Change file" : "Click to upload"}
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-6 leading-relaxed">
                Upload a valid photo ID to complete your booking. No 3D field
                will be placed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
