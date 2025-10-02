import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ApiProduct } from '@/app/(website)/find-near-you/utility/normalizeProducts'

interface Pagination {
  totalPages: number
  totalItems: number
  currentPage: number
}

interface Location {
  latitude: number
  longitude: number
  placeName: string
}

interface FindNearYouState {
  selectedLocation: Location | null
  radius: number
  size: string
  category: string
  minPrice: string
  maxPrice: string
  page: number
  allProducts: ApiProduct[]
  pagination: Pagination | null

  // Actions
  setState: (partial: Partial<FindNearYouState>) => void
  resetPage: () => void
  nextPage: () => void
  setAllProducts: (
    products: ApiProduct[] | ((prev: ApiProduct[]) => ApiProduct[])
  ) => void
  appendProducts: (products: ApiProduct[]) => void
  setPagination: (pagination: Pagination | null) => void
  resetAll: () => void
}

export const useFindNearYouStore = create<FindNearYouState>()(
  persist(
    (set) => ({
      selectedLocation: null,
      radius: 10,
      size: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      page: 1,
      allProducts: [],
      pagination: null,

      // Actions
      setState: (partial) => set((state) => ({ ...state, ...partial })),
      resetPage: () => set({ page: 1 }),
      nextPage: () => set((state) => ({ page: state.page + 1 })),
      setAllProducts: (products) =>
        set((state) => ({
          allProducts:
            typeof products === 'function'
              ? products(state.allProducts)
              : products,
        })),
      appendProducts: (products) =>
        set((state) => ({ allProducts: [...state.allProducts, ...products] })),
      setPagination: (pagination) => set({ pagination }),
      resetAll: () =>
        set({
          selectedLocation: null,
          radius: 10,
          size: '',
          category: '',
          minPrice: '',
          maxPrice: '',
          page: 1,
          allProducts: [],
          pagination: null,
        }),
    }),
    {
      name: 'find-near-you-storage', // localStorage key
      partialize: (state) => ({
        selectedLocation: state.selectedLocation,
      }),
    }
  )
)
