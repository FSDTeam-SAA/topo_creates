/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ChatList from './chatList'
import ChatHeader from './chatHeader'
import ChatMessages from './chatMessages'
import ChatInput from './chatInput'
import { useState } from 'react'

export default function ChatLayout({
  conversations,
}: {
  conversations: any[]
}) {
  const [activeConversation, setActiveConversation] = useState('1')

  const activeChat = conversations.find(
    (conv) => conv.id === activeConversation
  )

  const handleSendMessage = (text: string) => {
    console.log('Sending message:', text)
  }

  return (
    <div className="font-sans px-4 sm:px-6 md:px-8 pb-5">
      <div className="flex flex-col md:flex-row md:h-[600px] gap-6 rounded-lg overflow-hidden mb-[100px]">
        <ChatList
          conversations={conversations}
          activeConversation={activeConversation}
          onSelect={setActiveConversation}
        />

        <div className="w-full md:w-2/3 flex flex-col">
          <ChatHeader orderId={activeChat?.orderId} />

          <div className="flex-1 flex flex-col border-[#E6E6E6] border mt-5 rounded-xl overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <ChatMessages messages={activeChat?.messages || []} />
            </div>
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}
