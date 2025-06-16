"use client"
import Image from "next/image";
import React from "react";

const HowItWork = () => {
  const howItWorksData = [
    {
      id: 1,
      img: "/images/book.png",
      title: "BOOK",
      description: (
        <>
          Choose your size and rental dates <br /> see what&#39;s available
          instantly.
        </>
      ),
    },
    {
      id: 2,
      img: "/images/wear.png",
      title: "Wear",
      description: (
        <>
          Collect locally or enjoy fast delivery to your door <br /> your look,
          your way.
        </>
      ),
    },
    {
      id: 3,
      img: "/images/return.png",
      title: "Return",
      description: (
        <>
          Drop it off or use the included return label. <br /> No stress, no dry
          cleaning.
        </>
      ),
    },
  ];
  return (
    <div className="mt-24">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-[45px] lg:text-[56px] leading-[64px] tracking-[20px] text-black text-center uppercase font-normal pb-[10px] md:pb-[13px] lg:pb-[15px]">
          How it works
        </h2>
        <p className="text-2xl md:text-[27px] lg:text-3xl font-normal text-black leading-[36px] text-center">
          We made it simple. You make it stylish.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-0 pt-[40px] md:pt-[70x] lg:pt-[100px]">
          {howItWorksData?.map((item) => {
            return (
              <div key={item.id}>
                <div className="w-full flex items-center justify-center ">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={60}
                    height={60}
                    className={`item?.id === 2 ? "w-[32px] h-[60px" : "w-[60px] h-[60px]`}
                  />
                </div>
                <h4 className="text-2xl md:text-[28px] lg:text-[32px] font-normal text-black leading-[48px] text-center">
                  {item.title}
                </h4>
                <p className="text-base 4xl:text-[17px] 5xl:text-lg font-normal text-black leading-[24px] text-center pt-[10px] md:pt-[13px] lg:pt-[15px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
