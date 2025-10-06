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

      if (!res.ok) {
        throw new Error('Failed to fetch conversations')
      }

      return res.json()
    },
    enabled: !!accessToken,
  })
}
