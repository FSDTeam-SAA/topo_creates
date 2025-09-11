import { create } from "zustand";

interface IShoppingStore {
  rent: string;
  setRent: (value: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  idVerification: File | null;
  idPreview: string | null;
  setField: (field: keyof IShoppingStore, value: string | File | null) => void;

  isConfirm: boolean;
  setIsConfirm: (value: boolean) => void;
}

const initialState = {
  rent: "4",
  startDate: null,
  endDate: null,
  fullName: "",
  email: "",
  phone: "",
  address: "",
  idVerification: null,
  idPreview: null,
  isConfirm: false,
};

export const useShoppingStore = create<IShoppingStore>((set) => ({
  ...initialState,
  setRent: (value) => set({ rent: value }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setField: (field, value) => {
    set((state) => {
      if (field === "idVerification" && value instanceof File) {
        return {
          ...state,
          idVerification: value,
          idPreview: URL.createObjectURL(value),
        };
      }
      return { ...state, [field]: value };
    });
  },
  setIsConfirm: (value) => set({ isConfirm: value }),
}));
