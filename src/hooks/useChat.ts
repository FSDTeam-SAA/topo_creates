import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSocketStore } from '@/zustand/socketStore'

interface Message {
  _id: string
  text: string
  sender: string
  chatRoom: string
  createdAt: string
}

export const useChat = (roomId?: string) => {
  const queryClient = useQueryClient()
  const { socket } = useSocketStore()

  const { data: messages } = useQuery<Message[]>({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      if (!roomId) return []
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message/${roomId}`
      )
      return res.json()
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
