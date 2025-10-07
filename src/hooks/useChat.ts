import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSocketStore } from '@/zustand/socketStore'
import { useSession } from 'next-auth/react'

interface Attachment {
  url: string
  type: string
  fileName: string
  size: number
  mimeType: string
}

interface Sender {
  _id: string
  firstName: string
  lastName: string
  profileImage: string
}

interface Message {
  _id: string
  chatRoom: string
  sender: Sender
  message: string
  attachments: Attachment[]
  readBy: string[]
  createdAt: string
  updatedAt: string
}

interface MessageResponse {
  status: boolean
  message: string
  data: {
    messages: Message[]
    pagination: {
      total: number
      page: number
      limit: number
      pages: number
    }
  }
}

export const useChat = (roomId?: string) => {
  const queryClient = useQueryClient()
  const { socket } = useSocketStore()
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken

  const { data: messages } = useQuery<Message[]>({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      if (!roomId) return []
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message/${roomId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const json: MessageResponse = await res.json()
      return json?.data?.messages || []
    },
    enabled: !!roomId,
  })

  useEffect(() => {
    if (!socket || !roomId) return

    socket.emit('joinRoom', roomId)

    socket.on('message:new', (newMsg: Message) => {
      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) => [
        ...old,
        newMsg,
      ])
    })

    socket.on('message:edited', (updatedMsg: Message) => {
      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) =>
        old.map((m) => (m._id === updatedMsg._id ? updatedMsg : m))
      )
    })

    socket.on('message:deleted', ({ messageId }: { messageId: string }) => {
      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) =>
        old.filter((m) => m._id !== messageId)
      )
    })

    return () => {
      socket.off('message:new')
      socket.off('message:edited')
      socket.off('message:deleted')
    }
  }, [socket, roomId])

  return { messages }
}
