import { create } from 'zustand'

interface IFilter {
  search: string
  setSearch: (value: string) => void

  fourDayRental: boolean
  setFourDayRental: (value: boolean) => void

  shipping: boolean
  localPickup: boolean
  selectShipping: () => void
  selectLocalPickup: () => void

  minPrice: string
  setMinPrice: (value: string) => void

  maxPrice: string
  setMaxPrice: (value: string) => void

  size: string
  setSize: (value: string) => void

  page: number
  resetPage: () => void
  nextPage: () => void
  setPage: (value: number) => void
}

const initialState = {
  search: '',
  fourDayRental: false,

  shipping: true, // ✅ default
  localPickup: false, // ✅ default

  minPrice: '',
  maxPrice: '',
  size: '',
  page: 1,
}

export const useFilterStore = create<IFilter>((set) => ({
  ...initialState,

  setSearch: (value) => set({ search: value }),
  setFourDayRental: (value) => set({ fourDayRental: value }),

  // ✅ radio behavior
  selectShipping: () =>
    set({
      shipping: true,
      localPickup: false,
      page: 1,
    }),

  selectLocalPickup: () =>
    set({
      shipping: false,
      localPickup: true,
      page: 1,
    }),

  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),
  setSize: (value) => set({ size: value }),

  resetPage: () => set({ page: 1 }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  setPage: (value) => set({ page: value }),
}))
