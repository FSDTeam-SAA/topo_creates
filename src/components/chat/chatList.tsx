'use client'
import { Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conversations: any[]
  activeConversation: string
  onSelect: (id: string) => void
}

export default function ChatList({
  conversations,
  activeConversation,
  onSelect,
}: Props) {
  return (
    <div className="w-full md:w-1/3">
      <div className="p-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#595959]" />
          <Input
            placeholder="SEARCH MESSAGE....."
            className="pl-11 py-4 border-[#E6E6E6] focus-visible:ring-0 text-sm"
          />
        </div>
      </div>

      <div className="overflow-y-auto scrollbar-hide max-h-[400px] md:max-h-[544px]">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50 border-b ${
              activeConversation === conversation.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => onSelect(conversation.id)}
          >
            <div className="bg-gray-200 rounded-full p-2 flex-shrink-0">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">
                  Order #{conversation.orderId}
                </p>
                <span className="text-xs text-gray-500">
                  {conversation.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {conversation.preview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
