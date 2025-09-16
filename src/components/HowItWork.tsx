import { CalendarDays } from 'lucide-react'
import Image from 'next/image'

const HowItWork = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 pt-[50px] text-center">
        <h2 className="headerClass ">HOW IT WORKS</h2>
        <p className="sub-title mb-16">
          WE MADE IT SIMPLE. YOU MAKE IT STYLISH.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              {/* <Image
                src="/images/hiw1.png"
                alt="Seamless Management"
                width={34}
                height={34}
              /> */}

              <CalendarDays className="size-8" />
            </div>
            <h3 className="text-[22px] tracking-widest font-inter">BOOK</h3>
            <p className="text-[14px] font-inter">
              Choose your size and rental dates and what&lsquo;s available
              instantly.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src="/images/dress.svg"
                alt="Seamless Management"
                width={30}
                height={30}
              />
            </div>
            <h3 className="text-[22px] tracking-widest font-inter">WEAR</h3>
            <p className="text-[14px] font-inter">
              Collect locally or enjoy fast delivery to your door your look,
              your way.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src="/images/return.svg"
                alt="Seamless Management"
                width={34}
                height={34}
              />
            </div>
            <h3 className="text-[22px] tracking-widest font-inter">RETURN</h3>
            <p className="text-[14px] font-inter">
              Drop it off or use the included return label. No stress, no dry
              cleaning.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWork
