'use client'

import { useEffect, useRef } from 'react'

interface Message {
  id: string
  content: string
  sender: boolean // true = current user, false = other user
  timestamp: string
  rawSenderId?: string // For debugging
}

interface MessageProps {
  messages: Message[]
  currentUserId: string
}

export default function ChatMessages({
  messages,
  currentUserId,
}: MessageProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // ✅ Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }

    const timer = setTimeout(scrollToBottom, 100)
    return () => clearTimeout(timer)
  }, [messages])

  // 🔍 Debug rendered messages
  useEffect(() => {
    console.log('🎯 Rendering messages in ChatMessages:', {
      total: messages.length,
      currentUserId,
      messages: messages.map((msg, index) => ({
        index,
        id: msg.id.substring(0, 8),
        sender: msg.sender ? 'ME' : 'OTHER',
        rawSenderId: msg.rawSenderId,
        content: msg.content.substring(0, 30),
      })),
    })
  }, [messages, currentUserId])

  if (!messages?.length) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No messages yet</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 scrollbar-hide bg-white"
    >
      <div className="flex flex-col gap-3">
        {messages.map((message) => {
          const isMyMessage = message.sender

          return (
            <div
              key={message.id}
              className={`flex ${
                isMyMessage ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                  isMyMessage
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="break-words">{message.content}</p>
                <span
                  className={`block text-xs mt-1 ${
                    isMyMessage ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
