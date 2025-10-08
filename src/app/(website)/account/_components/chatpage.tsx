/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import ChatLayout from '@/components/chat/chatLayout'
import { useChat } from '@/hooks/useChat'
import { useConversations } from '@/hooks/useConversations'

export default function ChatPage() {
  const { data, isError, error, isFetching } = useConversations()
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  )

  // 🗂️ Memoize conversation list to prevent re-creation
  const conversations = useMemo(() => {
    return (
      data?.data?.data?.map((item: any) => {
        const user = item.participants.find((p: any) => p.role === 'USER')
        const firstName = user?.firstName || 'Unknown'
        return {
          id: item._id,
          orderId: firstName,
          preview: item.lastMessage || 'No messages yet',
          timestamp: new Date(
            item.lastMessageAt || item.createdAt
          ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }
      }) || []
    )
  }, [data])

  // 🧠 Determine active chat room
  const activeRoomId = activeConversation || conversations?.[0]?.id

  // ✅ Only fetch messages for active room
  const { messages } = useChat(activeRoomId)

  if (isFetching)
    return (
      <div className="flex justify-center flex-col py-10 items-center gap-2">
        <Loader2 className="animate-spin size-8" />
        <p>Loading chats...</p>
      </div>
    )

  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        {(error as Error)?.message}
      </p>
    )

  return (
    <ChatLayout
      conversations={conversations}
      activeConversation={activeRoomId}
      onSelect={setActiveConversation}
      messages={messages || []}
    />
  )
}
