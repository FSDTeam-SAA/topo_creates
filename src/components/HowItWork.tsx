import Image from 'next/image'
import React from 'react'

const HowItWork = () => {
  return (
    <div>
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className=" tracking-[0.3em] mb-4 sub-title">HOW IT WORKS</h2>
        <p className="mb-12 lg:text-[30px]">WE MADE IT SIMPLE. YOU MAKE IT STYLISH.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex justify-center">
          
              

              <Image src="/images/hiw1.png" alt="Seamless Management" width={64} height={64} />

            </div>
            <h3 className="text-3xl tracking-widest">BOOK</h3>
            <p className="text-xl">Choose your size and rental dates and what&lsquo;s available instantly.</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
        
<Image src="/images/hiw2.png" alt="Seamless Management" width={44} height={44} />

            </div>
            <h3 className="text-3xl tracking-widest">WEAR</h3>
            <p className="text-xl">Collect locally or enjoy fast delivery to your door your look, your way.</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
          

<Image src="/images/hiw3.png" alt="Seamless Management" width={64} height={64} />
            </div>
            <h3 className="text-3xl tracking-widest">RETURN</h3>
            <p className="text-xl">Drop it off or use the included return label. No stress, no dry cleaning.</p>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default HowItWork
