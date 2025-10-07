/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ChatList from './chatList'
import ChatHeader from './chatHeader'
import ChatMessages from './chatMessages'
import ChatInput from './chatInput'
import { useSendMessage } from '@/hooks/useSendMessage'
import { useSession } from 'next-auth/react'

interface ChatLayoutProps {
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
  const { mutate: sendMessage } = useSendMessage(activeConversation)
  const { data: session } = useSession()
  const senderId = session?.user?.id || ''
  // const currentUserRole = session?.user?.role || ''

  // Transform messages for ChatMessages component
  const formattedMessages = messages
    .map((m) => ({
      id: m._id,
      content: m.message,
      sender: m.sender?._id === senderId ? 'user' : 'support', //  if current user = sender → right side
      timestamp: new Date(m.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }))
    .reverse()

  // Handle send message
  const handleSendMessage = (text: string, file?: File) => {
    if (!activeConversation || !senderId) return
    sendMessage({
      text,
      file,
      chatRoom: activeConversation,
      sender: senderId,
    })
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

        {/* Main Chat Section */}
        <div className="w-full md:w-2/3 flex flex-col">
          <ChatHeader
            orderId={
              conversations.find((c) => c.id === activeConversation)?.orderId
            }
          />

          <div className="flex-1 flex flex-col border border-[#E6E6E6] mt-5 rounded-xl overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <ChatMessages messages={formattedMessages} />
            </div>

            {/* Input */}
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}
