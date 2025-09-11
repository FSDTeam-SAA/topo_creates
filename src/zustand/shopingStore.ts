import { create } from "zustand";

interface IShoppingStore {
  rent: string;
  setRent: (value: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const initialState = {
  rent: "4",
  startDate: null,
  endDate: null,
};

export const useShoppingStore = create<IShoppingStore>((set) => ({
  ...initialState,
  setRent: (value) => set({ rent: value }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
