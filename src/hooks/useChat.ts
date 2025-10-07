import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useSocketStore } from '@/zustand/socketStore'
import { useSession } from 'next-auth/react'

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
  const { data: session, status } = useSession()
  const accessToken = session?.user?.accessToken
  const hasJoinedRef = useRef(false)
  const currentRoomRef = useRef<string | undefined>()

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
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const json: MessageResponse = await res.json()
      return json?.data?.messages || []
    },
    enabled: !!roomId && !!accessToken && status === 'authenticated',
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!socket || !roomId || !isConnected) return

    // Leave previous room if switching
    if (currentRoomRef.current && currentRoomRef.current !== roomId) {
      socket.emit('leaveRoom', currentRoomRef.current)
      console.log('👋 Left previous room:', currentRoomRef.current)
      hasJoinedRef.current = false
    }

    // Join new room only once (backend expects just roomId, not room-${roomId})
    if (!hasJoinedRef.current) {
      socket.emit('joinRoom', roomId) // Backend will add 'room-' prefix
      hasJoinedRef.current = true
      currentRoomRef.current = roomId
      console.log('📡 Joined socket room:', roomId)
    }

    const handleNewMessage = (msg: Message) => {
      console.log('📩 New message received:', msg)

      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) => {
        // Prevent duplicate messages
        const exists = old.some((m) => m._id === msg._id)
        if (exists) {
          console.log('⚠️ Duplicate message ignored')
          return old
        }
        return [...old, msg]
      })

      // Also invalidate conversations to update preview
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    }

    const handleMessageEdited = (msg: Message) => {
      console.log('✏️ Message edited:', msg)
      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) => {
        return old.map((m) => (m._id === msg._id ? msg : m))
      })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    }

    const handleMessageDeleted = ({ messageId }: { messageId: string }) => {
      console.log('🗑️ Message deleted:', messageId)
      queryClient.setQueryData<Message[]>(['messages', roomId], (old = []) => {
        return old.filter((m) => m._id !== messageId)
      })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    }

    const handleMessageRead = ({ userId }: { userId: string }) => {
      console.log('👁️ Messages marked as read by:', userId)
      // Optionally update readBy status
      queryClient.invalidateQueries({ queryKey: ['messages', roomId] })
    }

    // Register all socket listeners
    socket.on('message:new', handleNewMessage)
    socket.on('message:edited', handleMessageEdited)
    socket.on('message:deleted', handleMessageDeleted)
    socket.on('message:read', handleMessageRead)

    return () => {
      // Cleanup all listeners
      socket.off('message:new', handleNewMessage)
      socket.off('message:edited', handleMessageEdited)
      socket.off('message:deleted', handleMessageDeleted)
      socket.off('message:read', handleMessageRead)

      if (roomId) {
        socket.emit('leaveRoom', roomId)
        console.log('👋 Left room on cleanup:', roomId)
      }
      hasJoinedRef.current = false
      currentRoomRef.current = undefined
    }
  }, [socket, roomId, isConnected, queryClient])

  return { messages, refetch, isLoading }
}
