'use client'

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { HomepageSection } from '@/types/home-page-section'
import Link from 'next/link'

type ApiResponse = {
  status: boolean
  message: string
  data: HomepageSection[]
}

const StyledByYou = () => {
  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ['homepage-sections'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homepageSections`,
      )
      return res.json()
    },
    staleTime: 1000 * 60 * 5,
  })

  const section = data?.data?.find(
    item => item.sectionName.toLowerCase() === 'style by you',
  )

  //  only show if active
  if (isLoading || !section || section.status !== 'active') return null

  if (isLoading || !section) return null

  return (
    <section className="">
      {/* 🔹 Header */}
      <div className="text-center mb-14">
        <h2 className="uppercase tracking-[10px]  text-lg md:text-3xl font-light">
          {section.sectionName}
        </h2>

        <p className="mt-3 text-sm md:text-sm uppercase tracking-widest text-gray-700">
          {section.content}
        </p>

        <Link href={'/shop'}>
          <p className="mt-4 text-[10px] uppercase tracking-[5px] underline text-gray-800">
            explore more
          </p>
        </Link>
      </div>

      {/* 🔹 Image Grid */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {section.image.map((img, index) => (
            <div
              key={index}
              className="
                relative overflow-hidden
                aspect-[3/4]
                bg-gray-100
              "
            >
              <Image
                src={img.url}
                alt={img.filename}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StyledByYou
