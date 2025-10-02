import Paymentcard from '../payment_card'

const MuseClub = () => {
  const progressValue = 70

  return (
    <div className="w-full">
      <section>
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-xl tracking-widest font-light border-black border-b-[1px] pb-5 mb-4 sm:mb-6">
            Muse Club
          </h2>
        </div>

        {/* Spend Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <p className="sm:text-lg md:text-xl lg:text-[30px] font-light tracking-[.2rem]">
            Your Annual Spend: $625
          </p>
          <p className="text-xl md:text-[24px] lg:text-[30px] font-light tracking-[.2rem]">
            $375 more to reach Muse Icon
          </p>
        </div>

        {/* Progress Bar with custom fill color */}
        <div className="mb-10">
          <div className="relative w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 rounded transition-all duration-300"
              style={{
                width: `${progressValue}%`,
                backgroundColor: progressValue > 0 ? '#891D33' : 'transparent',
              }}
            ></div>
          </div>
          <div className="flex justify-between text-[14px] text-gray-700 mt-10 md:mt-16">
            <span className="font-light tracking-wider">$0 Member</span>
            <span className=" font-light tracking-wider">$300 Silver</span>
            <span className="font-light tracking-wider">$600 Gold</span>
          </div>
        </div>

        {/* Payment Cards */}
        <div>
          <Paymentcard />
        </div>
      </section>
    </div>
  )
}

export default MuseClub
