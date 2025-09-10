import { create } from "zustand";

interface IShoppingStore {
  rent: string;
  setRent: (value: string) => void;
}

const initialState = {
  rent: "4",
};

export const useShoppingStore = create<IShoppingStore>((set) => ({
  ...initialState,
  setRent: (value) => set({ rent: value }),
}));
