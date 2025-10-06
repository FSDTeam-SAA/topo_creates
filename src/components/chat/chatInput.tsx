'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

interface Props {
  onSend: (text: string) => void
}

export default function ChatInput({ onSend }: Props) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (!message.trim()) return
    onSend(message)
    setMessage('')
  }

  return (
    <div className="p-4 bg-white">
      <div className="flex items-center gap-2">
        <input
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
          className="rounded-full py-4 px-5 border w-full outline-none bg-white text-sm"
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="rounded-full bg-black hover:bg-gray-800 p-4"
        >
          <Send className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
    </div>
  )
}
