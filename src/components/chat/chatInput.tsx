'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Paperclip } from 'lucide-react'

interface Props {
  onSend: (text: string, file?: File) => void
}

export default function ChatInput({ onSend }: Props) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSend = () => {
    if (!message.trim() && !file) return
    onSend(message, file || undefined)
    setMessage('')
    setFile(null)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="p-4 bg-white border-t">
      <div className="flex items-center gap-2">
        {/* File Upload */}
        <label className="cursor-pointer">
          <Paperclip className="h-5 w-5 text-gray-500" />
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
          />
        </label>

        {/* Message Input */}
        <input
          placeholder={file ? `Attached: ${file.name}` : 'Type your message'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="rounded-full py-4 px-5 border w-full outline-none bg-white text-sm"
        />

        {/* Send Button */}
        <Button
          type="button"
          onClick={handleSend}
          size="icon"
          className="rounded-full bg-black hover:bg-gray-800 p-4"
        >
          <Send className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
