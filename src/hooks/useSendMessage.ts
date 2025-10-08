/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '@/zustand/useUserStore'

interface MessagePayload {
  text?: string
  chatRoom: string
  file?: File
}

export const useSendMessage = () => {
  // const queryClient = useQueryClient()
  const { user } = useUserStore()
  const accessToken = user?.accessToken || ''
  const senderId = user?.id || ''

  return useMutation({
    mutationFn: async (payload: MessagePayload) => {
      const formData = new FormData()
      formData.append('roomId', payload.chatRoom)
      formData.append('sender', senderId)
      if (payload.text) formData.append('message', payload.text)
      if (payload.file) formData.append('file', payload.file)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }
      )

      if (!res.ok) throw new Error('Failed to send message')
      const result = await res.json()
      return result.data
    },

    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['conversations'] })
    // },
  })
}
