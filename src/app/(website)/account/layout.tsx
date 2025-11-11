'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Headers from './_components/headers'
import { useUserStore } from '@/zustand/useUserStore'

interface LayoutProps {
  children: ReactNode
}

export default function AccountLayout({ children }: LayoutProps) {
  const [tab, setTab] = useState('Account Info')
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUserStore()

  console.log('user account', user)
  // Automatically set active tab based on route
  useEffect(() => {
    if (pathname.includes('/chats')) setTab('Chats')
    else if (pathname.includes('/dispute')) setTab('Dispute')
    else setTab('Account Info')
  }, [pathname])

  // Route navigation based on selected tab
  useEffect(() => {
    if (tab === 'Chats' && user?.kycVerified) router.push('/account/chats')
    else if (tab === 'Dispute' && user?.kycVerified)
      router.push('/account/dispute')
    else if (tab === 'Account Info') router.push('/account')
  }, [tab, router, user?.kycVerified])

  return (
    <div className="w-full pt-12 md:pt-16 lg:pt-20">
      <Headers setTab={setTab} tab={tab} user={user} />
      <div className="">{children}</div>
    </div>
  )
}
