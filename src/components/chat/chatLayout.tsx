'use client'

import { useMemo, useState } from 'react'
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
  isLoading?: boolean
  isConnected?: boolean
}

export default function ChatLayout({
  conversations,
  activeConversation,
  onSelect,
  messages,
  isLoading = false,
  isConnected = false,
}: ChatLayoutProps) {
  const { mutate: sendMessage, isPending: isSending } = useSendMessage()
  const { data: session } = useSession()
  const { user } = useUserStore()
  const [localLoading, setLocalLoading] = useState(false)

  // ✅ Get current user ID
  const currentUserId = user?.id || session?.user?.id

  // 🔄 Handle conversation switch with loading state
  const handleSelectConversation = async (id: string) => {
    setLocalLoading(true)
    await onSelect(id)
    // Small delay for smooth UX
    setTimeout(() => setLocalLoading(false), 300)
  }

  // 🧠 Optimized message formatting with memoization
  const formattedMessages = useMemo(() => {
    if (!currentUserId || !messages.length) {
      return []
    }

    // console.log('🔄 Formatting messages:', {
    //   userId: currentUserId,
    //   messageCount: messages.length,
    // })

    console.log('my conversations', conversations)

    return messages.map((m) => {
      const isMine = m.sender._id === currentUserId

      return {
        id: m._id,
        content: m.message,
        sender: isMine,
        timestamp: new Date(m.createdAt).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        rawSenderId: m.sender._id,
      }
    })
  }, [messages, currentUserId])

  // 📨 Optimized message sending
  const handleSendMessage = async (text: string, file?: File) => {
    if (!activeConversation || !text.trim()) {
      console.log('❌ Cannot send: no active conversation or empty message')
      return
    }

    console.log('📤 Sending message:', {
      text: text.substring(0, 50),
      hasFile: !!file,
      room: activeConversation,
    })

    sendMessage({
      text: text.trim(),
      chatRoom: activeConversation,
      file,
    })
  }

  // Show loading states
  if (!currentUserId) {
    return (
      <div className=" flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="font-sans px-4 sm:px-6 md:px-8 pb-5">
      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p className="text-sm">Connecting to chat...</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:h-[600px] gap-6 rounded-lg overflow-hidden mb-[100px]">
        {/* Sidebar Chat List */}
        <ChatList
          conversations={conversations}
          activeConversation={activeConversation}
          onSelect={handleSelectConversation}
        />

        {/* Main Chat Window */}
        <div className="w-full md:w-2/3 flex flex-col">
          <ChatHeader
            name={conversations.find((c) => c.id === activeConversation)?.name}
            orderId={
              conversations.find((c) => c.id === activeConversation)?.orderId
            }
          />

          <div className="flex-1 flex flex-col border border-[#E6E6E6] mt-5 rounded-xl overflow-hidden bg-white">
            {/* Loading State */}
            {(isLoading || localLoading) && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-sm text-gray-500">
                  Loading messages...
                </span>
              </div>
            )}

            {/* ✅ Chat Messages */}
            <ChatMessages
              messages={formattedMessages}
              currentUserId={currentUserId}
              isLoading={isLoading || localLoading}
            />

            {/* ✅ Input - Disable when sending */}
            <ChatInput
              onSend={handleSendMessage}
              disabled={isSending || !isConnected}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
