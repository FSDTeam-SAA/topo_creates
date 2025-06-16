
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="px-5 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#891D33] md:grid-cols-1 h-[794px] w-full flex flex-col justify-center items-center">
          <Image
            src="/images/about_logo.png"
            alt="about logo"
            width={166}
            height={142}
            className="object-cover"
          />
          <div className="pt-5 md:pt-6 lg:pt-[30px]">
            <Image
              src="/images/muse_gala.png"
              alt="muse gala"
              width={463}
              height={54}
              className="w-full h-[54px]"
            />
          </div>
        </div>
        <div className="md:grid-cols-1 bg-white w-full flex flex-col justify-center pl-[25px] md:pl-[45px] lg:pl-[65px] md:pr-[50px] lg:pr-[100px]">
          <h2 className="text-10 md:text-[45px] lg:text-[56px] leading-[64px] text-black text-center uppercase font-normal">
            about
          </h2>
          <p className="text-base md:text-[17px] lg:text-lg font-normal leading-[24px] text-black text-center pt-5 md:pt-6 lg:pt-[30px]">
            We connect Australia’s leading boutique rental collections with
            women who dress to own every moment, offering a seamless blend of
            curated style, effortless booking, and thoughtful experiences.
          </p>
          <p className="text-base md:text-[17px] lg:text-lg font-normal leading-[24px] text-black text-center">
            Every dress on Muse Gala is carefully selected from trusted boutique
            partners, ensuring a wardrobe that feels as personal, elevated, and
            one-of-a-kind as you are.
          </p>
          <p className="text-base md:text-[17px] lg:text-lg font-normal leading-[24px] text-black text-center">
            Founded with the vision of redefining rental, Muse Gala was created
            to inspire self-expression through fashion — giving women access to
            iconic pieces without the commitment of ownership.
          </p>
          <p className="text-base md:text-[17px] lg:text-lg font-normal leading-[24px] text-black text-center">
            From weddings to celebrations, curated edits to last-minute moments,
            Muse Gala exists to make your event look unforgettable, effortless,
            and uniquely yours.
          </p>
          <h3 className="text-4xl md:text-[42px] lg:text-[48px] text-black font-normal uppercase leading-[48px] text-center pt-[40px] md:pt-[60px] lg:pt-[90px]">
            OUR PROMISE
          </h3>
          <p className="text-base md:text-[17px] lg:text-lg font-normal leading-[24px] text-black text-center pt-5 md:pt-6 lg:pt-[30px]">
            At Muse Gala, we believe renting should feel just as special as
            wearing
          </p>
          <p className="text-base md:text-[17px] lg:text-lg font-normal leading-[24px] text-black text-center pt-5 md:pt-7 lg:pt-9">
            We are committed to curating boutique collections with care,
            offering real-time availability, local pickup options, and seamless
            returns — making every step as effortless as finding your next look.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
