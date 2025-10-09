/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { useChat } from '@/hooks/useChat'
import { useConversations } from '@/hooks/useConversations'
import ChatLayout from '@/components/chat/chatLayout'
import { useUserStore } from '@/zustand/useUserStore'

interface Participant {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: 'USER' | 'LENDER'
}

interface Conversation {
  id: string
  orderId: string
  preview: string
  timestamp: string
  participants: Participant[]
  name: string // 🆕 person you're chatting with
}

interface Message {
  _id: string
  message: string
  sender: {
    _id: string
    firstName: string
    role?: 'USER' | 'LENDER'
  }
  createdAt: string
}

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState<string>('')

  // ✅ Get current logged-in user
  const { user } = useUserStore()

  const {
    data: conversationsResponse,
    isLoading: conversationsLoading,
    error: conversationsError,
    refetch: refetchConversations,
  } = useConversations()

  const {
    messages,
    isLoading: messagesLoading,
    isConnected,
    refetch: refetchMessages,
  } = useChat(activeConversation)

  // ✅ Format conversations properly
  const conversations: Conversation[] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conversationsResponse?.data?.data?.map((conv: any) => {
      // Identify the participant who is NOT the logged-in user
      const chatPartner = conv.participants.find(
        (p: Participant) => p._id !== user?.id
      )

      const name = chatPartner
        ? `${chatPartner.firstName || ''} ${chatPartner.lastName || ''}`.trim()
        : 'Unknown'

      return {
        id: conv._id,
        orderId: conv.bookingId,
        preview: conv.lastMessage || 'No messages yet',
        timestamp: new Date(
          conv.lastMessageAt || conv.updatedAt
        ).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        participants: conv.participants,
        name, // 🆕 Add chat partner name
      }
    }) || []

  // ✅ Set first conversation active by default
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0].id)
    }
  }, [conversations, activeConversation])

  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id)
    if (id) await refetchMessages()
  }

  // ✅ Format messages
  const formattedMessages: Message[] = messages.map((msg) => ({
    _id: msg._id,
    message: msg.message,
    sender: {
      _id: msg.sender._id,
      firstName: msg.sender.firstName,
      role: (msg.sender as { role?: 'USER' | 'LENDER' }).role,
    },
    createdAt: msg.createdAt,
  }))

  // ✅ Handle loading & error UI
  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading conversations...</p>
      </div>
    )
  }

  if (conversationsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading conversations</p>
          <button
            onClick={() => refetchConversations()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!conversations.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No conversations found</p>
      </div>
    )
  }

  return (
    <div>
      <ChatLayout
        conversations={conversations}
        activeConversation={activeConversation}
        onSelect={handleSelectConversation}
        messages={formattedMessages}
        isLoading={messagesLoading}
        isConnected={isConnected}
      />
    </div>
  )
}
