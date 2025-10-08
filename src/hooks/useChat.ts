import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useSocketStore } from '@/zustand/socketStore'
import { useUserStore } from '@/zustand/useUserStore'

interface Attachment {
  url: string
  type: string
  fileName: string
  size: number
  mimeType: string
}

interface Sender {
  _id: string
  firstName: string
  lastName: string
  profileImage?: string
}

interface Message {
  _id: string
  chatRoom: string
  sender: Sender
  message: string
  attachments: Attachment[]
  readBy: string[]
  createdAt: string
  updatedAt: string
}

interface MessageResponse {
  status: boolean
  message: string
  data: {
    messages: Message[]
  }
}

export const useChat = (roomId?: string) => {
  const queryClient = useQueryClient()
  const { socket, isConnected } = useSocketStore()
  const { user } = useUserStore()
  const accessToken = user?.accessToken
  const currentRoomRef = useRef<string | null>(null)
  const listenersAttachedRef = useRef(false)

  // ✅ Fetch initial messages
  const {
    data: messages = [],
    refetch,
    isLoading,
  } = useQuery<Message[]>({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      if (!roomId || !accessToken) return []
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message/${roomId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const json: MessageResponse = await res.json()
      return json?.data?.messages || []
    },
    enabled: !!roomId && !!accessToken,
    refetchOnWindowFocus: false,
    staleTime: 30000, // ✅ Consider data fresh for 30 seconds
    gcTime: 60000, // ✅ Keep in cache for 1 minute
  })

  // 🔌 Join room when roomId changes
  useEffect(() => {
    if (!socket || !isConnected || !roomId) return

    if (currentRoomRef.current !== roomId) {
      if (currentRoomRef.current) {
        socket.emit('leaveRoom', currentRoomRef.current)
        console.log('🚪 Left room:', currentRoomRef.current)
      }

      socket.emit('joinRoom', roomId)
      console.log('🚀 Joined room:', roomId)
      currentRoomRef.current = roomId
    }
  }, [socket, isConnected, roomId])

  // 📡 Attach socket listeners ONCE per connection
  useEffect(() => {
    if (!socket || !isConnected) return
    if (listenersAttachedRef.current) return

    const handleNewMessage = (msg: Message) => {
      console.log('📨 New message received:', msg)
      console.log('📨 Current room:', currentRoomRef.current)

      // ✅ Always update if message belongs to ANY room we're tracking
      const targetRoom = msg.chatRoom

      queryClient.setQueryData<Message[]>(
        ['messages', targetRoom],
        (old = []) => {
          if (old.some((m) => m._id === msg._id)) {
            console.log('⚠️ Duplicate message, skipping')
            return old
          }
          console.log('✅ Adding new message to cache')
          return [...old, msg]
        }
      )
    }

    const handleMessageEdited = (msg: Message) => {
      console.log('✏️ Message edited:', msg)
      const targetRoom = msg.chatRoom

      queryClient.setQueryData<Message[]>(
        ['messages', targetRoom],
        (old = []) => old.map((m) => (m._id === msg._id ? msg : m))
      )
    }

    const handleMessageDeleted = ({
      messageId,
      chatRoom,
    }: {
      messageId: string
      chatRoom: string
    }) => {
      console.log('🗑️ Message deleted:', messageId)

      queryClient.setQueryData<Message[]>(['messages', chatRoom], (old = []) =>
        old.filter((m) => m._id !== messageId)
      )
    }

    socket.on('message:new', handleNewMessage)
    socket.on('message:edited', handleMessageEdited)
    socket.on('message:deleted', handleMessageDeleted)

    listenersAttachedRef.current = true
    console.log('✅ Socket listeners attached')

    return () => {
      socket.off('message:new', handleNewMessage)
      socket.off('message:edited', handleMessageEdited)
      socket.off('message:deleted', handleMessageDeleted)
      listenersAttachedRef.current = false
      console.log('🧹 Socket listeners removed')
    }
  }, [socket, isConnected, queryClient])

  return { messages, refetch, isLoading }
}
