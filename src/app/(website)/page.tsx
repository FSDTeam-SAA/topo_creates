import Image from "next/image";
import MarketingForm from "./_components/markeitng-form";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-y-16">
      <div className="text-center space-y-5 flex flex-col items-center">
        <Image
          src="/logos/logo_black.png"
          width={100}
          height={100}
          alt="logo"
        />
        <h1 className="font-normal text-[30px] uppercase tracking-widest">
          The muse arrives soon
        </h1>
        <p className="text-sm text-gray-700">
          We’re setting the scene. The dresses are waiting. Join the list before
          the doors open.
        </p>
      </div>
      <MarketingForm />
    </div>
  );
};

export default Page;
