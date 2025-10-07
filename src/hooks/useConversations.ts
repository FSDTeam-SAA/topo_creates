import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useConversations = () => {
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken || ''

  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message/chatrooms`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      if (!res.ok) throw new Error('Failed to fetch conversations')
      return res.json()
    },
    enabled: Boolean(accessToken),

    // v5-compatible options
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false, // or "ifStale" if you prefer to refetch only when outdated
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 10, // replaces `cacheTime`
    placeholderData: (previousData) => previousData, // keeps old data instantly visible
  })
}
