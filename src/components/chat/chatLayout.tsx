'use client'

import { useMemo, useState } from 'react'
import ChatList from './chatList'
import ChatHeader from './chatHeader'
import ChatMessages from './chatMessages'
import ChatInput from './chatInput'
import { useSendMessage } from '@/hooks/useSendMessage'
import { useUserStore } from '@/zustand/useUserStore'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Attachment {
  url: string
  type: string
  fileName: string
  size: number
  mimeType: string
}

interface ChatLayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conversations: any[]
  activeConversation: string
  onSelect: (id: string) => void
  messages: {
    _id: string
    message: string
    sender: {
      _id: string
      firstName: string
      role?: 'USER' | 'LENDER'
    }
    attachments: Attachment[]
    createdAt: string
  }[]
  isLoading?: boolean
  isConnected?: boolean
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
}

export default function ChatLayout({
  conversations,
  activeConversation,
  onSelect,
  messages,
  isLoading = false,
  isConnected = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
}: ChatLayoutProps) {
  const { mutate: sendMessage, isPending: isSending } = useSendMessage()
  const { data: session } = useSession()
  const { user } = useUserStore()
  const [localLoading, setLocalLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // ✅ Mobile sidebar toggle

  // ✅ Get current user ID
  const currentUserId = user?.id || session?.user?.id

  // 🔄 Handle conversation switch with loading state
  const handleSelectConversation = async (id: string) => {
    setLocalLoading(true)
    await onSelect(id)
    setIsSidebarOpen(false) // ✅ Close sidebar after selecting chat on mobile
    setTimeout(() => setLocalLoading(false), 300)
  }

  // 🧠 Optimized message formatting with memoization
  const formattedMessages = useMemo(() => {
    if (!currentUserId || !messages.length) return []

    return messages.map((m) => {
      const isMine = m.sender._id === currentUserId
      return {
        id: m._id,
        content: m.message,
        sender: isMine,
        timestamp: m.createdAt,
        rawSenderId: m.sender._id,
        attachments: m.attachments,
      }
    })
  }, [messages, currentUserId])

  // 📨 Optimized message sending
  const handleSendMessage = async (text: string, file?: File) => {
    if (!activeConversation || (!text.trim() && !file)) return

    sendMessage({
      text: text?.trim(),
      chatRoom: activeConversation,
      file,
    })
  }

  // ⏳ Loading state for user data
  if (!currentUserId) {
    return (
      <div className="flex items-center justify-center h-[300px] md:h-[500px] lg:h-[650px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="font-sans pb-5 relative">
      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-sm">
          Connecting to chat...
        </div>
      )}

      <div className="flex flex-col md:flex-row md:h-[600px] lg:h-[700px] gap-4 rounded-lg overflow-hidden relative">
        {/* ✅ Mobile Sidebar Toggle */}
        <div className="md:hidden flex justify-between items-center bg-white p-3 border rounded-lg mb-3 sticky top-0 z-20">
          <h2 className="font-light tracking-widest text-gray-700 text-lg">
            Messages
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="rounded-full p-2"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </Button>
        </div>

        {/* ✅ Sidebar with Animation */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              className="fixed inset-y-0 left-0 z-50 bg-white shadow-lg p-3 w-[85%] max-w-[320px] md:hidden overflow-y-auto"
            >
              <ChatList
                conversations={conversations}
                activeConversation={activeConversation}
                onSelect={handleSelectConversation}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Overlay when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 md:hidden z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* ✅ Desktop Sidebar */}
        <div className="hidden md:block w-1/3">
          <ChatList
            conversations={conversations}
            activeConversation={activeConversation}
            onSelect={handleSelectConversation}
          />
        </div>

        {/* ✅ Main Chat Window */}
        <div className="w-full md:w-2/3 flex flex-col border border-[#E6E6E6] rounded-xl bg-white shadow-sm">
          <ChatHeader
            name={conversations.find((c) => c.id === activeConversation)?.name}
            orderId={
              conversations.find((c) => c.id === activeConversation)?.orderId
            }
          />

          {/* ✅ Messages area - fixed for mobile */}
          <div className="flex-1 flex flex-col overflow-hidden h-[60vh] md:h-auto">
            {(isLoading || localLoading) && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-sm text-gray-500">
                  Loading messages...
                </span>
              </div>
            )}

            <ChatMessages
              messages={formattedMessages}
              currentUserId={currentUserId}
              chatRoomId={activeConversation}
              isLoading={isLoading || localLoading}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />

            <div className="border-t">
              <ChatInput
                onSend={handleSendMessage}
                disabled={isSending || !isConnected}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
