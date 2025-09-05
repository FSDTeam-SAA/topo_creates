import { create } from "zustand"
import type { ApiProduct } from "@/app/(website)/find-near-you/utility/normalizeProducts"

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
  pagination: { totalPages: number; totalItems: number } | null
  setState: (state: Partial<FindNearYouState>) => void
  resetPage: () => void
  nextPage: () => void
  setAllProducts: (products: ApiProduct[]) => void
  setPagination: (pagination: { totalPages: number; totalItems: number } | null) => void
}

export const useFindNearYouStore = create<FindNearYouState>((set) => ({
  selectedLocation: null,
  radius: 2,
  size: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  page: 1,
  allProducts: [],
  pagination: null,
  setState: (state) => set((prev) => ({ ...prev, ...state })),
  resetPage: () => set({ page: 1 }),
  nextPage: () => set((prev) => ({ page: prev.page + 1 })),
  setAllProducts: (products) => set((prev) => ({ ...prev, allProducts: products })),
  setPagination: (pagination) => set((prev) => ({ ...prev, pagination })),
}))
