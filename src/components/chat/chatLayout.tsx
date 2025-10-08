'use client'

import { useMemo } from 'react'
import ChatList from './chatList'
import ChatHeader from './chatHeader'
import ChatMessages from './chatMessages'
import ChatInput from './chatInput'
import { useSendMessage } from '@/hooks/useSendMessage'
import { useUserStore } from '@/zustand/useUserStore'
import { useSession } from 'next-auth/react'

interface ChatLayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conversations: any[]
  activeConversation: string
  onSelect: (id: string) => void
  messages: {
    _id: string
    message: string
    sender: {
      _id: string
      firstName: string
      role?: 'USER' | 'LENDER'
    }
    createdAt: string
  }[]
}

export default function ChatLayout({
  conversations,
  activeConversation,
  onSelect,
  messages,
}: ChatLayoutProps) {
  const { mutate: sendMessage } = useSendMessage()
  const { data: session } = useSession()
  const { user } = useUserStore()

  // ✅ Get current user ID - try Zustand first, fallback to session
  const currentUserId = user?.id || session?.user?.id

  // 🧠 Format messages - ALWAYS call hook unconditionally
  const formattedMessages = useMemo(() => {
    if (!currentUserId || !messages.length) return []

    console.log('🔄 Formatting messages with userId:', currentUserId)

    return messages.map((m) => {
      const isMine = m.sender._id === currentUserId

      // Debug first and last message only
      if (m === messages[0] || m === messages[messages.length - 1]) {
        console.log('💬 Format:', {
          messageId: m._id.substring(0, 8),
          senderId: m.sender._id,
          currentUserId,
          isMine: isMine ? '✅ RIGHT (black)' : '❌ LEFT (gray)',
        })
      }

      return {
        id: m._id,
        content: m.message,
        sender: isMine,
        timestamp: new Date(m.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
    })
  }, [messages, currentUserId])

  // 📨 Handle sending new message
  const handleSendMessage = (text: string, file?: File) => {
    if (!activeConversation) return
    sendMessage({
      text,
      chatRoom: activeConversation,
      file,
    })
  }

  // ✅ Don't render if no user ID
  if (!currentUserId) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    )
  }

  return (
    <div className="font-sans px-4 sm:px-6 md:px-8 pb-5">
      <div className="flex flex-col md:flex-row md:h-[600px] gap-6 rounded-lg overflow-hidden mb-[100px]">
        {/* Sidebar Chat List */}
        <ChatList
          conversations={conversations}
          activeConversation={activeConversation}
          onSelect={onSelect}
        />

        {/* Main Chat Window */}
        <div className="w-full md:w-2/3 flex flex-col">
          <ChatHeader
            orderId={
              conversations.find((c) => c.id === activeConversation)?.orderId
            }
          />

          <div className="flex-1 flex flex-col border border-[#E6E6E6] mt-5 rounded-xl overflow-hidden">
            {/* ✅ Chat Messages */}
            <ChatMessages messages={formattedMessages} />

            {/* ✅ Input */}
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}
