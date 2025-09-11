import { Upload } from "lucide-react";
import React from "react";

const CheckoutForm = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // if (file) {
    //   setFormData((prev) => ({ ...prev, idVerification: file }));
    // }

    console.log("file  : ", file);
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

          {/* Form Fields */}
          <div className="space-y-8">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-black mb-2 uppercase opacity-75">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-0 border-b border-black pb-2 text-black opacity-75 placeholder-gray-400 focus:outline-none focus:border-black"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm text-black mb-2 uppercase opacity-75">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-0 border-b border-black pb-2 text-black opacity-75 placeholder-gray-400 focus:outline-none focus:border-black"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-black mb-2 uppercase opacity-75">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className="w-full bg-transparent border-0 border-b border-black pb-2 text-black opacity-75 placeholder-gray-400 focus:outline-none focus:border-black"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-black mb-2 uppercase opacity-75">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-0 border-b border-black pb-2 text-black opacity-75 placeholder-gray-400 focus:outline-none focus:border-black"
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
                  <Upload className="w-8 h-8 mx-auto mb-4 opacity-50 font-thin" />
                  {/* {formData.idVerification ? (
                    <p className="text-sm text-black">
                      {formData.idVerification.name}
                    </p>
                  ) : (
                    <p className="text-sm text-black">Click to upload</p>
                  )} */}
                </label>
              </div>
            </div>
          </div>

          {/* Upload Instructions */}
          <p className="text-xs text-gray-600 mt-6 leading-relaxed">
            Upload a valid photo ID to complete your booking. No 3D field will
            be placed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
