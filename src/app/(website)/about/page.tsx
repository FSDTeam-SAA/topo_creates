import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="mb-24 font-avenir">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-[#891D33] md:grid-cols-1 h-[500px] md:h-[794px] w-full flex flex-col justify-center items-center px-[1rem]">
          <Image
            src="/logo.svg"
            alt="about logo"
            width={1000}
            height={1000}
            className="object-cover h-[122px] w-[146px]"
          />
          <div className="pt-5 md:pt-6 lg:pt-[30px]">
            <Image
              src="/images/muse_gala.png"
              alt="muse gala"
              width={363}
              height={44}
              className="w-full h-[20px] md:h-[30px]"
            />
          </div>
        </div>

        <div className="md:grid-cols-1 bg-white w-full flex flex-col justify-center px-[1rem] lg:pr-16 ">
          <h2 className="headerClass font-avenir uppercase text-center">
            about
          </h2>
          <p className="text-base text-[14px]  leading-[30px] text-black/80 text-center pt-5 md:pt-6 lg:pt-[30px] font-inter">
            We connect Australia’s leading boutique rental collections with
            women who dress to own every moment, offering a seamless blend of
            curated style, effortless booking, and thoughtful experiences.
          </p>
          <p className="text-base text-[14px]  leading-[30px] text-black/80 text-center font-inter">
            Every dress on Muse Gala is carefully selected from trusted boutique
            partners, ensuring a wardrobe that feels as personal, elevated, and
            one-of-a-kind as you are.
          </p>
          <p className="text-base text-[14px]  leading-[30px] text-black/80 text-center font-inter">
            Founded with the vision of redefining rental, Muse Gala was created
            to inspire self-expression through fashion — giving women access to
            iconic pieces without the commitment of ownership.
          </p>
          <p className="text-base text-[14px]  leading-[30px] text-black/80 text-center font-inter">
            From weddings to celebrations, curated edits to last-minute moments,
            Muse Gala exists to make your event look unforgettable, effortless,
            and uniquely yours.
          </p>
          <h3 className="headerClass uppercase text-center pt-[40px] md:pt-[60px] lg:pt-[90px]">
            OUR PROMISE
          </h3>
          <p className="text-base text-[14px]  leading-[30px] text-black/80 text-center font-inter pt-5 md:pt-6 lg:pt-[30px]">
            At Muse Gala, we believe renting should feel just as special as
            wearing
          </p>
          <p className="text-base text-[14px]  leading-[30px] text-black/80 text-center font-inter pt-5 md:pt-7 lg:pt-9">
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
