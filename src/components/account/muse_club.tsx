import Paymentcard from "../payment_card";

const MuseClub = () => {
  const progressValue = 70;

  return (
    <div className="w-full">
      <section>
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-xltracking-wide font-normal mb-4 sm:mb-6">
            Muse Club
          </h2>
          <hr className="border border-black" />
        </div>

        {/* Spend Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <p className="text-xl sm:text-2xl lg:text-[32px] font-normal">
            Your Annual Spend: $625
          </p>
          <p className="text-xl sm:text-2xl lg:text-[32px] font-normal">
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
                backgroundColor: progressValue > 0 ? "#891D33" : "transparent",
              }}
            ></div>
          </div>
          <div className="flex justify-between text-sm sm:text-base text-gray-700 mt-4 sm:mt-6">
            <span className="text-base sm:text-lg font-normal">$0 Member</span>
            <span className="text-base sm:text-lg font-normal">
              $300 Silver
            </span>
            <span className="text-base sm:text-lg font-normal">$600 Gold</span>
          </div>
        </div>

        {/* Payment Cards */}
        <div>
          <Paymentcard />
        </div>
      </section>
    </div>
  );
};

export default MuseClub;
