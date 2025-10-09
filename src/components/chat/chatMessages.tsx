'use client'

import { useEffect, useRef, useState } from 'react'

interface Message {
  id: string
  content: string
  sender: boolean
  timestamp: string
  rawSenderId?: string
}

interface MessageProps {
  messages: Message[]
  currentUserId: string
  chatRoomId?: string // ✅ optional: for scroll reset when switching
  isLoading?: boolean
}

export default function ChatMessages({
  messages,

  chatRoomId,
  isLoading,
}: MessageProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  // ✅ Order messages correctly (oldest → newest)
  const orderedMessages = [...messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  // ✅ Scroll to bottom on new message (real-time)
  useEffect(() => {
    if (!containerRef.current || !isAutoScroll) return
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [orderedMessages.length, isAutoScroll])

  // ✅ Scroll to bottom when conversation changes
  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'auto',
    })
    setIsAutoScroll(true) // Reset auto-scroll when switching chats
  }, [chatRoomId]) // ✅ triggers when user switches chat

  // ✅ Disable auto-scroll when user scrolls up
  const handleScroll = () => {
    if (!containerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100
    setIsAutoScroll(isAtBottom)
  }

  // ✅ Loading State
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-400 text-sm">Loading messages...</p>
        </div>
      </div>
    )
  }

  // ✅ Empty State
  if (!orderedMessages?.length) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">No messages yet</p>
          <p className="text-gray-400 text-xs">Start a conversation!</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 bg-white"
    >
      <div className="flex flex-col gap-3">
        {orderedMessages.map((message, index) => {
          const isMyMessage = message.sender

          // Extract time portion for grouping (e.g., "11:06 AM")
          const currentTime = message.timestamp
          const previousTime =
            index > 0 ? orderedMessages[index - 1]?.timestamp : null

          // Show timestamp separator only when time changes (not for every message)
          const showTimestamp = index === 0 || currentTime !== previousTime

          return (
            <div key={message.id}>
              {/* Timestamp separator */}
              {showTimestamp && (
                <div className="text-center my-2">
                  <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border">
                    {message.timestamp}
                  </span>
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`flex ${
                  isMyMessage ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    isMyMessage
                      ? 'bg-[#000000] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="break-words whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
