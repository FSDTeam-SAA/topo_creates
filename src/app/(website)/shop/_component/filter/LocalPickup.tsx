'use client'
import Link from 'next/link'

export function LocalPickup() {
  return (
    <div className="w-full pt-5 pb-3">
      <Link
        href="/find-near-you"
        className="uppercase font-avenir tracking-widest opacity-75 border-b border-black pb-2 block"
      >
        local pickup
      </Link>
    </div>
  )
}
