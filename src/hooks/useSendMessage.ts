import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSocketStore } from '@/zustand/socketStore'

interface MessagePayload {
  text?: string
  chatRoom: string
  sender: string
  file?: File // optional file support
}

export const useSendMessage = (roomId: string) => {
  const { socket } = useSocketStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: MessagePayload) => {
      const formData = new FormData()
      formData.append('roomId', payload.chatRoom)
      formData.append('sender', payload.sender)
      if (payload.text) formData.append('', payload.text)
      if (payload.file) formData.append('file', payload.file)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      return res.json()
    },
    onSuccess: (newMsg) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['messages', roomId], (old: any = []) => [
        ...old,
        newMsg,
      ])
      socket?.emit('message:new', newMsg)
    },
  })
}
