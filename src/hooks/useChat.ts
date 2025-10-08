import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useCallback } from 'react'
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
  // const listenersAttachedRef = useRef(false)

  // ✅ Optimized message fetching with proper caching
  const {
    data: messages = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery<Message[]>({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      if (!roomId || !accessToken) {
        console.log('❌ Missing roomId or accessToken')
        return []
      }

      console.log('🔥 Fetching messages for room:', roomId)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!res.ok) {
          console.log('❌ API response not ok:', res.status)
          throw new Error(`Failed to fetch messages: ${res.status}`)
        }

        const json: MessageResponse = await res.json()

        console.log('✅ Messages fetched successfully:', {
          roomId,
          count: json?.data?.messages?.length || 0,
          messages: json?.data?.messages?.map((m) => ({
            id: m._id.substring(0, 8),
            senderId: m.sender._id,
            content: m.message.substring(0, 20),
          })),
        })

        return json?.data?.messages || []
      } catch (error) {
        console.error('❌ Error fetching messages:', error)
        return []
      }
    },
    enabled: !!roomId && !!accessToken,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    retryDelay: 1000,
  })

  // 🔌 Optimized room joining/leaving
  useEffect(() => {
    if (!socket || !isConnected || !roomId) return

    const joinRoom = async () => {
      if (currentRoomRef.current !== roomId) {
        // Leave previous room
        if (currentRoomRef.current) {
          socket.emit('leaveRoom', currentRoomRef.current)
          console.log('🚪 Left room:', currentRoomRef.current)

          // Clear previous room messages from cache to avoid flickering
          queryClient.removeQueries({
            queryKey: ['messages', currentRoomRef.current],
          })
        }

        // Join new room
        socket.emit('joinRoom', roomId)
        console.log('🚀 Joined room:', roomId)
        currentRoomRef.current = roomId

        // Prefetch messages for smooth experience
        await queryClient.prefetchQuery({
          queryKey: ['messages', roomId],
          queryFn: async () => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message/${roomId}`,
              { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            const json = await res.json()
            return json?.data?.messages || []
          },
        })
      }
    }

    joinRoom()
  }, [socket, isConnected, roomId, accessToken, queryClient])

  // 📡 Optimized socket listeners with useCallback
  const handleNewMessage = useCallback(
    (msg: Message) => {
      console.log('📨 New message received:', {
        messageId: msg._id,
        senderId: msg.sender._id,
        room: msg.chatRoom,
        currentRoom: currentRoomRef.current,
      })

      const targetRoom = msg.chatRoom

      queryClient.setQueryData<Message[]>(
        ['messages', targetRoom],
        (old = []) => {
          // Prevent duplicates
          if (old.some((m) => m._id === msg._id)) {
            console.log('⚠️ Duplicate message, skipping')
            return old
          }
          console.log('✅ Adding new message to cache')
          return [...old, msg]
        }
      )
    },
    [queryClient]
  )

  const handleMessageEdited = useCallback(
    (msg: Message) => {
      console.log('✏️ Message edited:', msg._id)
      const targetRoom = msg.chatRoom

      queryClient.setQueryData<Message[]>(
        ['messages', targetRoom],
        (old = []) => old.map((m) => (m._id === msg._id ? msg : m))
      )
    },
    [queryClient]
  )

  const handleMessageDeleted = useCallback(
    ({ messageId, chatRoom }: { messageId: string; chatRoom: string }) => {
      console.log('🗑️ Message deleted:', messageId)
      queryClient.setQueryData<Message[]>(['messages', chatRoom], (old = []) =>
        old.filter((m) => m._id !== messageId)
      )
    },
    [queryClient]
  )

  // 📡 Attach optimized socket listeners
  useEffect(() => {
    if (!socket || !isConnected) return

    console.log('🔌 Setting up socket listeners...')

    socket.on('message:new', handleNewMessage)
    socket.on('message:edited', handleMessageEdited)
    socket.on('message:deleted', handleMessageDeleted)

    return () => {
      console.log('🧹 Cleaning up socket listeners...')
      socket.off('message:new', handleNewMessage)
      socket.off('message:edited', handleMessageEdited)
      socket.off('message:deleted', handleMessageDeleted)
    }
  }, [
    socket,
    isConnected,
    handleNewMessage,
    handleMessageEdited,
    handleMessageDeleted,
  ])

  // 🔄 Manual refetch with loading state
  const manualRefetch = useCallback(async () => {
    if (!roomId) return
    console.log('🔄 Manually refetching messages...')
    await refetch()
  }, [refetch, roomId])

  return {
    messages,
    refetch: manualRefetch,
    isLoading: isLoading || isFetching,
    isConnected,
  }
}
