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

  // 🔍 Debug user information
  console.log('🔍 USER DEBUG:', {
    zustandUser: user,
    sessionUser: session?.user,
    currentUserId,
    messagesCount: messages.length,
  })

  // 🧠 Format messages properly
  const formattedMessages = useMemo(() => {
    if (!currentUserId || !messages.length) {
      console.log('❌ No currentUserId or messages')
      return []
    }

    console.log('🔄 Formatting messages with userId:', currentUserId)

    const formatted = messages.map((m) => {
      const isMine = m.sender._id === currentUserId

      // Debug each message
      console.log('💬 Message Analysis:', {
        messageId: m._id.substring(0, 8),
        senderId: m.sender._id,
        currentUserId,
        isMine: isMine ? '✅ MY MESSAGE' : '❌ OTHER USER',
        content: m.message.substring(0, 50),
      })

      return {
        id: m._id,
        content: m.message,
        sender: isMine, // true = my message, false = other user
        timestamp: new Date(m.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        rawSenderId: m.sender._id, // For additional debugging
      }
    })

    console.log('🎯 Final formatted messages:', formatted)
    return formatted
  }, [messages, currentUserId])

  // 📨 Handle sending new message
  const handleSendMessage = (text: string, file?: File) => {
    if (!activeConversation) {
      console.log('❌ No active conversation')
      return
    }

    console.log('📤 Sending message:', { text, file, activeConversation })
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
            <ChatMessages
              messages={formattedMessages}
              currentUserId={currentUserId}
            />

            {/* ✅ Input */}
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}
