import Image from 'next/image'
import React from 'react'
import ContactForm from './_components/contactForm'

const page = () => {
  return (
    <div className="mb-24 font-avenir pt-[100px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className=" md:grid-cols-1 h-[500px] md:h-[794px] w-full flex flex-col justify-center items-center px-[1rem]">
          <Image
            src="/images/contact_banner.jpg"
            alt="contact logo"
            width={1000}
            height={1000}
            quality={90}
            priority
            className="object-cover h-full w-full"
          />
        </div>

        <div className="md:grid-cols-1 bg-white w-full flex flex-col justify-center px-[1rem] lg:pr-16 ">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default page
