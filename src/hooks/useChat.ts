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
  const { socket, joinRoom, leaveRoom, isConnected } = useSocketStore()
  const { user } = useUserStore()
  const accessToken = user?.accessToken
  const joinedRoomRef = useRef<string | null>(null)

  // ✅ Fetch initial chat messages
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
  })

  // 🔌 Manage room joining + socket listeners
  useEffect(() => {
    if (!socket || !isConnected || !roomId) return

    // join only if room is changed
    if (joinedRoomRef.current !== roomId) {
      if (joinedRoomRef.current) {
        leaveRoom(joinedRoomRef.current)
      }
      joinRoom(roomId)
      joinedRoomRef.current = roomId
    }

    // 📨 Handle new message
    const handleNewMessage = (msg: Message) => {
      console.log('📨 New message received:', msg)
      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) => {
        if (old.some((m) => m._id === msg._id)) return old
        return [...old, msg]
      })
    }

    // ✏️ Handle edit
    const handleMessageEdited = (msg: Message) => {
      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) =>
        old.map((m) => (m._id === msg._id ? msg : m))
      )
    }

    // 🗑️ Handle delete
    const handleMessageDeleted = ({ messageId }: { messageId: string }) => {
      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) =>
        old.filter((m) => m._id !== messageId)
      )
    }

    socket.on('message:new', handleNewMessage)
    socket.on('message:edited', handleMessageEdited)
    socket.on('message:deleted', handleMessageDeleted)

    console.log('✅ Listeners attached for room:', roomId)

    return () => {
      console.log('🧹 Cleaning listeners for room:', roomId)
      socket.off('message:new', handleNewMessage)
      socket.off('message:edited', handleMessageEdited)
      socket.off('message:deleted', handleMessageDeleted)
    }
  }, [socket, roomId, isConnected, joinRoom, leaveRoom, queryClient])

  return { messages, refetch, isLoading }
}
