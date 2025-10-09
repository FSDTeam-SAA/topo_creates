'use client'

import { useState, useEffect } from 'react'
import { useChat } from '@/hooks/useChat'
import { useConversations } from '@/hooks/useConversations'
import ChatLayout from '@/components/chat/chatLayout'

interface Conversation {
  id: string
  orderId: string
  preview: string
  timestamp: string
  participants: Array<{
    _id: string
    firstName: string
    lastName: string
    email: string
    role: 'USER' | 'LENDER'
  }>
}

interface FormattedMessage {
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

  // Fetch conversations
  const {
    data: conversationsResponse,
    isLoading: conversationsLoading,
    error: conversationsError,
    refetch: refetchConversations,
  } = useConversations()

  // Fetch messages for active conversation
  const {
    messages,
    isLoading: messagesLoading,
    isConnected,
    refetch: refetchMessages,
  } = useChat(activeConversation)

  // Format conversations data according to your API response
  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any
  const conversations: Conversation[] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conversationsResponse?.data?.data?.map((conv: any) => ({
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
    })) || []

  // Set first conversation as active by default
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      console.log(
        '🎯 Setting default active conversation:',
        conversations[0].id
      )
      setActiveConversation(conversations[0].id)
    }
  }, [conversations, activeConversation])

  // Handle conversation selection
  const handleSelectConversation = async (id: string) => {
    console.log('🔄 Switching to conversation:', id)
    setActiveConversation(id)

    // Refetch messages for the new conversation
    if (id) {
      try {
        await refetchMessages()
      } catch (error) {
        console.error('❌ Error refetching messages:', error)
      }
    }
  }

  // Format messages for ChatLayout according to your messages API response
  const formattedMessages: FormattedMessage[] = messages.map((msg) => ({
    _id: msg._id,
    message: msg.message,
    sender: {
      _id: msg.sender._id,
      firstName: msg.sender.firstName,
      role: (msg.sender as { role?: 'USER' | 'LENDER' }).role,
    },
    createdAt: msg.createdAt,
  }))

  // Show loading state
  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading conversations...</p>
        </div>
      </div>
    )
  }

  // Show error state
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

  // Show empty state
  if (!conversations.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No conversations found</p>
          <p className="text-gray-400 text-sm">
            Start a new conversation to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="">
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
