// zustand/shopingStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BookingSummary {
  orderId: string
  dressName: string
  rentalStartDate: string
  rentalEndDate: string
  deliveryMethod: string
  totalPaid: number
  size: string
}

interface PromoCodeData {
  id: string
  code: string
  discountType: 'FLAT' | 'PERCENTAGE'
  discountValue: number
  expiresAt: string
}

interface IShoppingStore {
  rent: string
  setRent: (value: string) => void

  startDate: Date | null
  endDate: Date | null
  setStartDate: (date: Date | null) => void
  setEndDate: (date: Date | null) => void

  fullName: string
  email: string
  phone: string
  address: string
  idVerification: File | null
  idPreview: string | null
  setField: (field: keyof IShoppingStore, value: string | File | null) => void

  isConfirm: boolean
  setIsConfirm: (value: boolean) => void

  deliveryOption: 'shipping' | 'pickup'
  setDeliveryOption: (value: 'shipping' | 'pickup') => void

  selectedSize: string
  setSelectedSize: (value: string) => void

  bookingSummary: BookingSummary | null
  setBookingSummary: (summary: BookingSummary) => void
  clearBookingSummary: () => void

  currentBookingId: string | null
  setCurrentBookingId: (value: string | null) => void

  // Promo code state
  promoCode: string
  setPromoCode: (value: string) => void
  appliedPromo: PromoCodeData | null
  setAppliedPromo: (promo: PromoCodeData | null) => void
  clearPromoCode: () => void
}

const initialState = {
  rent: '4',
  startDate: null,
  endDate: null,
  fullName: '',
  email: '',
  phone: '',
  address: '',
  idVerification: null,
  idPreview: null,
  isConfirm: false,
  deliveryOption: 'shipping' as 'shipping' | 'pickup',
  selectedSize: '',
  bookingSummary: null,
  currentBookingId: null,
  promoCode: '',
  appliedPromo: null,
}

export const useShoppingStore = create<IShoppingStore>()(
  persist(
    set => ({
      ...initialState,

      setRent: value => set({ rent: value }),

      setStartDate: date => set({ startDate: date }),
      setEndDate: date => set({ endDate: date }),

      setField: (field, value) =>
        set(state => {
          if (field === 'idVerification' && value instanceof File) {
            return {
              ...state,
              idVerification: value,
              idPreview: URL.createObjectURL(value),
            }
          }
          return { ...state, [field]: value }
        }),

      setIsConfirm: value => set({ isConfirm: value }),
      setDeliveryOption: value => set({ deliveryOption: value }),
      setSelectedSize: value => set({ selectedSize: value }),

      setBookingSummary: summary => set({ bookingSummary: summary }),
      clearBookingSummary: () => set({ bookingSummary: null }),

      setCurrentBookingId: value => set({ currentBookingId: value }),

      // Promo code actions
      setPromoCode: value => set({ promoCode: value }),
      setAppliedPromo: promo => set({ appliedPromo: promo }),
      clearPromoCode: () => set({ promoCode: '', appliedPromo: null }),
    }),
    {
      name: 'shopping-store',
      partialize: state => ({
        rent: state.rent,
        deliveryOption: state.deliveryOption,
        selectedSize: state.selectedSize,
        bookingSummary: state.bookingSummary,
        currentBookingId: state.currentBookingId,
        promoCode: state.promoCode,
        appliedPromo: state.appliedPromo,
      }),
    },
  ),
)
