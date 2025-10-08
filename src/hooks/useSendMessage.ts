import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserStore } from '@/zustand/useUserStore'

interface MessagePayload {
  text?: string
  chatRoom: string
  file?: File
}

export const useSendMessage = () => {
  const { user } = useUserStore()
  const accessToken = user?.accessToken || ''
  const senderId = user?.id || ''
  const queryClient = useQueryClient()

  console.log('🔧 useSendMessage hook initialized:', {
    hasUser: !!user,
    senderId,
    accessToken: accessToken ? 'YES' : 'NO',
  })

  return useMutation({
    mutationFn: async (payload: MessagePayload) => {
      console.log('📤 Sending message payload:', payload)

      const formData = new FormData()
      formData.append('roomId', payload.chatRoom)
      formData.append('sender', senderId)
      if (payload.text) formData.append('message', payload.text)
      if (payload.file) formData.append('file', payload.file)

      console.log('📤 FormData contents:', {
        roomId: payload.chatRoom,
        sender: senderId,
        hasText: !!payload.text,
        hasFile: !!payload.file,
      })

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Don't set Content-Type for FormData, let browser set it
          },
          body: formData,
        }
      )

      if (!res.ok) {
        const errorText = await res.text()
        console.error('❌ Failed to send message:', res.status, errorText)
        throw new Error(`Failed to send message: ${res.status}`)
      }

      const result = await res.json()
      console.log('✅ Message sent successfully:', result)
      queryClient.invalidateQueries({
        queryKey: ['conversations', payload.chatRoom],
      })

      return result.data
    },
  })
}
