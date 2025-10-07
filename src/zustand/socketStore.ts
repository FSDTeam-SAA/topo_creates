import { io, Socket } from 'socket.io-client'
import { create } from 'zustand'

interface SocketState {
  socket: Socket | null
  isConnected: boolean
  connectSocket: (userId: string) => void
  disconnectSocket: () => void
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,

  connectSocket: (userId) => {
    // Prevent duplicate connections
    const existingSocket = get().socket
    if (existingSocket?.connected) {
      console.log('✅ Socket already connected')
      return
    }

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ['websocket'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id)
      // Backend expects just userId, it will add 'user-' prefix
      socket.emit('registerUser', userId)
      console.log('👤 Registered user:', userId)
      set({ isConnected: true })
    })

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected')
      set({ isConnected: false })
    })

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error)
    })

    socket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts')
      socket.emit('registerUser', userId)
    })

    set({ socket })
  },

  disconnectSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.disconnect()
        console.log('👋 Socket manually disconnected')
      }
      return { socket: null, isConnected: false }
    })
  },
}))
