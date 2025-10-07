import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSocketStore } from '@/zustand/socketStore'
import { useSession } from 'next-auth/react'

interface MessagePayload {
  text?: string
  chatRoom: string
  sender: string
  file?: File
}

export const useSendMessage = (roomId: string) => {
  const { socket } = useSocketStore()
  const queryClient = useQueryClient()
  const session = useSession()
  const accessToken = session?.data?.user?.accessToken || ''

  return useMutation({
    mutationFn: async (payload: MessagePayload) => {
      const formData = new FormData()
      formData.append('roomId', payload.chatRoom)
      formData.append('sender', payload.sender)
      if (payload.text) formData.append('message', payload.text)
      if (payload.file) formData.append('file', payload.file)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      )

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      // Parse response JSON
      const result = await res.json()
      return result.data // 👈 শুধু data অংশ return করো
    },

    onSuccess: async (newMessage) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['messages', roomId], (old: any = []) => [
        ...old,
        newMessage,
      ])

      // Socket event পাঠাও
      socket?.emit('message:new', newMessage)

      // Latest fetch করাও
      await queryClient.invalidateQueries({ queryKey: ['messages', roomId] })
    },
  })
}
