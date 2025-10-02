import React, { useState } from 'react'
import ShoppinghMap from '../shopping-map'

const DeliveryOption = () => {
  const [option, setOption] = useState('shipping')

  // let content;

  return (
    <div className="font-avenir uppercase mt-10">
      <h1 className=" opacity-75 tracking-widest border-b border-black pb-1">
        Delivery Option
      </h1>

      <div className="mt-8 opacity-75 flex items-center gap-5">
        <button
          onClick={() => setOption('shipping')}
          className={`w-1/2 pb-2 uppercase tracking-widest ${
            option === 'shipping'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-white'
          }`}
        >
          Shipping
        </button>

        <button
          onClick={() => setOption('local')}
          className={`w-1/2 pb-2 uppercase tracking-widest ${
            option === 'local'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-white'
          }`}
        >
          Local Pickup
        </button>
      </div>

      {/* shipping Content */}
      <div>
        {option === 'shipping' ? (
          <p className="pt-5 md:pt-10 font-light text-sm font-sans tracking-[0.1rem]">
            $10 shipping fee (includes prepaid return label) Estimated delivery:
            1-2 business days
          </p>
        ) : (
          <div className="pt-5 w-full">
            <ShoppinghMap />
          </div>
        )}
      </div>
    </div>
  )
}

export default DeliveryOption
