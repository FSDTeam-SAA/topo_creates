'use client'

// import { User } from 'lucide-react'
// import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface MessageProps {
  messages: {
    id: string
    content: string
    sender: boolean
    timestamp: string
  }[]
}

export default function ChatMessages({ messages }: MessageProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // ✅ Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        // ✅ Direct scroll to bottom
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }

    // ✅ Wait for DOM to update, then scroll
    const timer = setTimeout(scrollToBottom, 50)

    return () => clearTimeout(timer)
  }, [messages.length]) // ✅ Only trigger when message count changes

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
        {/* First message timestamp */}
        <div className="text-center mb-2">
          <span className="text-xs text-gray-400 bg-white px-2">
            {messages[0].timestamp}
          </span>
        </div>

        {messages.map((message) => {
          const isUser = message.sender // true = my message

          return (
            <div
              key={message.id}
              className={`flex  ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-4 py-2 text-sm shadow-sm ${
                  !isUser
                    ? 'bg-black text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {/* <User className="rounded-full" /> */}
                <div>
                  <p className="break-words">{message.content}</p>
                  <span
                    className={`block text-[10px] text-right mt-1 ${
                      isUser ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        {/* ✅ Scroll anchor at the bottom */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
