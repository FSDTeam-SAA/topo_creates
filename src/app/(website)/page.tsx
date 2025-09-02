// import Image from "next/image";
// import MarketingForm from "./_components/markeitng-form";

// const Page = () => {
//   return (
//     <div className="min-h-screen w-full flex flex-col justify-center items-center gap-y-10 container">
//       <div className="text-center space-y-5 flex flex-col items-center">
//         <Image
//           src="/logos/M.svg"
//           sizes=""
//           width={200}
//           height={200}
//           alt="logo"
//         />
//         <h1 className="font-normal text-[30px] uppercase tracking-widest">
//           The muse arrives soon
//         </h1>
//         <p className="text-sm text-gray-700">
//           We’re setting the scene. The dresses are waiting. Join the list before
//           the doors open.
//         </p>
//       </div>
//       <MarketingForm />
//     </div>
//   );
// };

// export default Page;


import React from 'react'
import Home from './landing/page'

const page = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default page