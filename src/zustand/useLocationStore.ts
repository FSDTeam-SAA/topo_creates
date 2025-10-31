// /zustand/useLocationStore.ts
import { create } from 'zustand'

interface Lender {
  _id: string
  email: string
  location: {
    type: string
    coordinates: [number, number]
  }
  distance: number
}

interface LocationStore {
  latitude: number | null
  longitude: number | null
  lenders: Lender[]
  setLocation: (lat: number, lng: number) => void
  setLenders: (data: Lender[]) => void
}

export const useLocationStore = create<LocationStore>((set) => ({
  latitude: null,
  longitude: null,
  lenders: [],
  setLocation: (latitude, longitude) => set({ latitude, longitude }),
  setLenders: (lenders) => set({ lenders }),
}))
