import { create } from 'zustand'

interface IFilter {
  search: string
  setSearch: (value: string) => void
  fourDayRental: boolean
  setFourDayRental: (value: boolean) => void
  localPickup: number
  setLocalPickup: (value: number) => void
  eventDate: string
  setEventDate: (value: string) => void
  minPrice: string
  setMinPrice: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
  size: string
  setSize: (value: string) => void

  // Pagination
  page: number
  resetPage: () => void
  nextPage: () => void
  setPage: (value: number) => void
}

const initialState = {
  search: '',
  fourDayRental: false,
  localPickup: 2,
  eventDate: '',
  minPrice: '',
  maxPrice: '',
  size: '',
  page: 1,
}

export const useFilterStore = create<IFilter>((set) => ({
  ...initialState,
  setSearch: (value) => set({ search: value }),
  setFourDayRental: (value) => set({ fourDayRental: value }),
  setLocalPickup: (value) => set({ localPickup: value }),
  setEventDate: (value) => set({ eventDate: value }),
  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),
  setSize: (value) => set({ size: value }),

  // Pagination actions
  resetPage: () => set({ page: 1 }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  setPage: (value) => set({ page: value }),
}))
