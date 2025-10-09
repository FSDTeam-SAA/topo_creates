'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DBUser } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { AlertCircleIcon, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import type { User } from '@/zustand/useUserStore'

interface GetApiRes {
  status: boolean
  message: {
    url: string
    message: string
  }
}

export interface UserResponse {
  status: boolean
  message: string
  data: DBUser
}

interface DocumentVerificationProps {
  user: User | null
}

const DocumentVerification = ({ user }: DocumentVerificationProps) => {
  // ✅ user null হলে কোনো call করবে না
  const {
    data: kycRes,
    refetch: fetchKyc,
    isFetching,
  } = useQuery<GetApiRes>({
    queryKey: ['kyc-check'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/kyc/verify`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      return res.json()
    },
    enabled: false,
  })

  const {
    data: userRes,
    isLoading,
    isError,
    error,
  } = useQuery<UserResponse>({
    queryKey: ['user', user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      return res.json()
    },
    enabled: !!user, // ✅ শুধুমাত্র user থাকলে call হবে
  })

  useEffect(() => {
    if (kycRes?.status) {
      window.location.href = kycRes.message.url
    }
  }, [kycRes])

  if (!user) return null

  if (isLoading) {
    return null
  }

  if (isError) {
    return <p>{(error as Error).message}</p>
  }

  if (userRes && !userRes.data.kycVerified) {
    return (
      <Alert
        variant="destructive"
        className="flex items-center justify-between"
      >
        <div className="flex items-start gap-x-2">
          <AlertCircleIcon />
          <div>
            <AlertTitle>Document verification required</AlertTitle>
            <AlertDescription>
              Please upload your documents to continue using all features.
            </AlertDescription>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => fetchKyc()}
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Verifying...
            </>
          ) : (
            'Verify Now'
          )}
        </Button>
      </Alert>
    )
  }

  return null
}

export default DocumentVerification
