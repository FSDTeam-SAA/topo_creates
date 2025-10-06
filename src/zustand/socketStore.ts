import { io, Socket } from 'socket.io-client'
import { create } from 'zustand'

interface SocketState {
  socket: Socket | null
  connectSocket: (userId: string) => void
  disconnectSocket: () => void
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,

  connectSocket: (userId) => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ['websocket'],
      withCredentials: true,
    })

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
      socket.emit('registerUser', userId) // Register to personal room
    })

    set({ socket })
  },

  disconnectSocket: () => {
    set((state) => {
      if (state.socket) state.socket.disconnect()
      return { socket: null }
    })
  },
}))
