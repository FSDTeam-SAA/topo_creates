'use client'

interface MessageProps {
  messages: {
    id: string
    content: string
    sender: string
    timestamp: string
  }[]
}

export default function ChatMessages({ messages }: MessageProps) {
  if (!messages?.length) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">No messages yet</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Optional: show first timestamp as session start */}
      <div className="text-center mb-2 scrollbar-hide">
        <span className="text-xs text-gray-400 bg-white px-2">
          {messages[0].timestamp}
        </span>
      </div>

      {messages.map((message) => {
        const isUser = message.sender === 'user'

        return (
          <div
            key={message.id}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-4 py-2 text-sm shadow-sm ${
                isUser
                  ? 'bg-black text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="break-words">{message.content}</p>
              <span className="block text-[10px] text-gray-400 text-right mt-1">
                {message.timestamp}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
