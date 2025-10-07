/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

interface MessagePayload {
  text?: string
  chatRoom: string
  sender: string
  file?: File
}

export const useSendMessage = (roomId: string) => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken || ''

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
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }
      )

      if (!res.ok) throw new Error('Failed to send message')
      const result = await res.json()
      return result.data
    },

    onSuccess: () => {
      // ⚠️ socket নিজে থেকেই নতুন মেসেজ পাঠাবে, তাই এখানে append করার দরকার নেই
      // শুধু conversation sidebar রিফ্রেশ করার জন্য invalidate করো
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })
}
