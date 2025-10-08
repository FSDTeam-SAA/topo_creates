// socketStore.ts
import { io, Socket } from 'socket.io-client'
import { create } from 'zustand'

interface SocketState {
  socket: Socket | null
  isConnected: boolean
  connectSocket: (userId: string) => void
  disconnectSocket: () => void
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string) => void
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,

  connectSocket: (userId) => {
    const existingSocket = get().socket
    if (existingSocket && existingSocket.connected) return // ✅ prevent multiple connections

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      query: { userId },
      transports: ['websocket'],
      withCredentials: true,
      reconnection: true,
    })

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id)
      set({ isConnected: true })
    })

    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason)
      set({ isConnected: false })
    })

    set({ socket })
  },

  disconnectSocket: () => {
    const socket = get().socket
    if (socket) {
      console.log('👋 Socket manually disconnected')
      socket.disconnect()
      set({ socket: null, isConnected: false })
    }
  },

  joinRoom: (roomId) => {
    const socket = get().socket
    if (socket && roomId) {
      socket.emit('joinRoom', roomId)
      console.log('🚀 Joined room:', roomId)
    }
  },

  leaveRoom: (roomId) => {
    const socket = get().socket
    if (socket && roomId) {
      socket.emit('leaveRoom', roomId)
      console.log('🚪 Left room:', roomId)
    }
  },
}))
