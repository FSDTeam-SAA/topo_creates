interface MessageProps {
  messages: {
    id: string
    content: string
    sender: 'user' | 'support'
    timestamp: string
  }[]
}

export default function ChatMessages({ messages }: MessageProps) {
  console.log('message', messages)
  if (!messages?.length)
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">No messages yet</p>
      </div>
    )

  return (
    <>
      <div className="text-center mb-2 scrollbar-hide">
        <span className="text-xs text-gray-400 bg-white px-2">
          {messages[0].timestamp}
        </span>
      </div>

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message?.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-4 py-2 ${
              message.sender === 'user'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
    </>
  )
}
