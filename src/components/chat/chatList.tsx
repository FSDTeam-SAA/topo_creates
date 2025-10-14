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
  console.log('conversations ', conversations)

  return (
    <div className="w-full">
      {/* Search + Filter Row */}
      <div className="flex items-center justify-between gap-3 p-3 mb-4">
        {/* Search Field (Left) */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-[#595959]" />
          <Input
            placeholder="Search messages..."
            className="pl-11 py-5 border-[#E6E6E6] focus-visible:ring-0 text-sm"
          />
        </div>

        {/* Status Filter (Right) */}
        {/* <Select>
          <SelectTrigger className="w-[120px] border-[#E6E6E6] text-sm focus-visible:ring-0">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {/* Conversation List */}
      <div className="overflow-y-auto scrollbar-hide max-h-[400px] md:max-h-[544px]">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 flex items-start gap-3 cursor-pointer rounded-lg hover:bg-gray-50/80 border-b ${
              activeConversation === conversation.id ? 'bg-slate-100' : ''
            }`}
            onClick={() => onSelect(conversation.id)}
          >
            <div className="bg-gray-200 rounded-full p-2 flex-shrink-0">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center ">
                <p className="font-normal tracking-wider text-[12px] md:text-sm">
                  {conversation.name}
                </p>
                <span className="text-xs text-gray-500">
                  {conversation.timestamp}
                </span>
              </div>
              <p className="text-sm mt-2 text-gray-500 truncate">
                {conversation.preview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
