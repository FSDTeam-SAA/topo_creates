/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useRef } from 'react'
import { useUserStore } from '@/zustand/useUserStore'
import { useSocketStore } from '@/zustand/socketStore'
import { Session } from 'next-auth'
import { useQuery } from '@tanstack/react-query'

interface Props {
  session: Session | null
}

interface UserResponse {
  status: boolean
  message: string
  data: {
    _id: string
    firstName?: string
    lastName?: string
    email?: string
    role?: string
    profileImage?: string
    phoneNumber?: string
    bio?: string
    kycVerified?: boolean
  }
}

export default function ClientProvider({ session }: Props) {
  const { setUser, clearUser } = useUserStore()
  const { connectSocket, disconnectSocket } = useSocketStore()
  const initializedRef = useRef(false)

  const userId = session?.user?.id
  const accessToken = session?.user?.accessToken
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  const {
    data: userRes,
    isSuccess,
    isError,
  } = useQuery<UserResponse>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/v1/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data')
      }

      const data = await res.json()
      return data
    },
    enabled: !!userId && !!accessToken,
    staleTime: 0, //  ensures fresh fetch on route change
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (isSuccess && userRes?.data && !initializedRef.current) {
      const u = userRes.data
      setUser({
        id: u._id,
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        email: u.email || '',
        profileImage: u.profileImage || '',
        role: u.role || '',
        phoneNumber: u.phoneNumber || '',
        bio: u.bio || '',
        kycVerified: u.kycVerified ?? false,
        accessToken: accessToken || '',
      })

      connectSocket(u._id)
      initializedRef.current = true
      console.log('✅ User initialized & socket connected:', u._id)
    }

    if ((!userId || isError) && initializedRef.current) {
      clearUser()
      disconnectSocket()
      initializedRef.current = false
      console.log('❌ User cleared (logout or error)')
    }
  }, [isSuccess, userRes, isError, userId])

  return null
}
