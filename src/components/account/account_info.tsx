"use client";
import { CircleCheckBig } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const AccountInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "mehedi",
    lastName: "hasan",
    email: "email@gmail.com",
    phone: "0154754545454",
    address: "DHAKA",
    passport: "**************** ",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setIsEditing(false);
  };
  return (
    <div>
      <section className="">
        <div className=" mb-[65px]">
          <h2 className="text-xl  tracking-widest font-normal mb-6 ">
            Account Info
          </h2>
          <hr className="border border-black border-b" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div>
            <p className="text-[24px] font-normal mb-4">Full Name</p>
            {isEditing ? (
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border-b outline-none border-gray-300 pb-1 mb-4 w-full text-sm"
              />
            ) : (
              <p className=" pb-1 mb-4">{formData.fullName}</p>
            )}

            <p className="text-[24px] font-normal mb-4">Email</p>
            {isEditing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-b outline-none border-gray-300 pb-1 mb-4 w-full text-sm"
              />
            ) : (
              <p className=" pb-1 mb-4">{formData.email}</p>
            )}

            <p className="text-[24px] font-normal mb-4">Shipping Address</p>
            {isEditing ? (
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border-b outline-none border-gray-300 pb-1 mb-4 w-full text-sm"
              />
            ) : (
              <p className=" pb-1 mb-4">
                {formData.address} <span className="text-gray-400"></span>
              </p>
            )}
          </div>
          <div>
            <p className="text-[24px] font-normal mb-4">Last Name</p>
            {isEditing ? (
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border-b outline-none border-gray-300 pb-1 mb-4 w-full text-sm"
              />
            ) : (
              <p className="pb-1 mb-4">{formData.lastName}</p>
            )}

            <p className="text-[24px] font-normal mb-4">Phone</p>
            {isEditing ? (
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-b outline-none border-gray-300 pb-1 mb-4 w-full text-sm"
              />
            ) : (
              <p className=" pb-1 mb-4">{formData.phone}</p>
            )}
            <p className="text-[24px] font-normal mb-4">ID/Passport</p>
            {isEditing ? (
              <input
                name="passport"
                value={formData.passport}
                onChange={handleChange}
                className="border-b outline-none tracking-[10px] border-gray-300 pb-1 mb-4 w-full text-sm"
              />
            ) : (
              <div className="relative">
                <p className=" pb-1 mb-4 tracking-[10px]">
                  {formData.passport}
                </p>
                <CircleCheckBig className="absolute top-0 text-[#891D33] w-5 h-5 left-80" />
              </div>
            )}

            <div className="flex justify-end mt-4">
              {isEditing ? (
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  className="text-xs rounded-none border border-gray-300 hover:bg-transparent hover:text-black"
                >
                  SAVE
                </Button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[16px] rounded-none border-b border-[#000000] pb-2 hover:bg-transparent hover:text-black"
                >
                  EDIT INFO
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountInfo;
