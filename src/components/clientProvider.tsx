'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/zustand/useUserStore'
import { useSocketStore } from '@/zustand/socketStore'
import { Session } from 'next-auth'

interface Props {
  session: Session | null
}

export default function ClientProvider({ session }: Props) {
  const { setUser, clearUser } = useUserStore()
  const { connectSocket, disconnectSocket } = useSocketStore()

  useEffect(() => {
    if (session?.user?.id) {
      setUser({
        id: session?.user?.id,
        firstName: session?.user?.firstName || '',
        lastName: session?.user?.name || '',
        email: session?.user?.email || '',
        profileImage: session?.user?.image || '',
        accessToken: session?.user?.accessToken || '',
        role: session?.user?.role || '',
      })
      connectSocket(session.user.id)
    } else {
      clearUser()
      disconnectSocket()
    }

    return () => {
      disconnectSocket()
      clearUser()
    }
  }, [session])

  return null
}
