import Image from "next/image"

export default function ServiceFeatures() {
  const features = [
    {
      imageSrc: "/images/homeIcon1.png",
      title: "VERIFIED BOUTIQUES ONLY",
      description: "",
    },
    {
      imageSrc: "/images/homeIcon2.png",
      title: "BOOK INSTANTLY,",
      description: "NO WAITING",
    },
    {
      imageSrc: "/images/homeIcon3.png",
      title: "PICKUP LOCALLY",
      description: "OR SHIP FAST",
    },
    {
      imageSrc: "/images/homeIcon4.png",
      title: "LOYALTY REWARDS",
      description: "AND PERKS",
    },
    {
      imageSrc: "/images/homeIcon5.png",
      title: "OPTIONAL INSURANCE",
      description: "FOR PEACE OF MIND",
    },
  ]

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Top row - 3 icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-12">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src={feature.imageSrc || "/placeholder.svg"}
                  alt={feature.title}
                  width={50}
                  height={50}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-sm font-medium tracking-wider mb-1">{feature.title}</h3>
              {feature.description && <p className="text-sm tracking-wider">{feature.description}</p>}
            </div>
          ))}
        </div>

        {/* Bottom row - 2 icons centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {features.slice(3, 5).map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src={feature.imageSrc || "/placeholder.svg"}
                  alt={feature.title}
                  width={50}
                  height={50}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-sm font-medium tracking-wider mb-1">{feature.title}</h3>
              {feature.description && <p className="text-sm tracking-wider">{feature.description}</p>}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
