import { create } from "zustand";

interface IFilter {
  search: string;
  setSearch: (value: string) => void;
  rental: string;
  setRental: (value: string) => void;
  localPickup: string;
  setLocalPickup: (value: string) => void;
  eventDate: string;
  setEventDate: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  size: string;
  setSize: (value: string) => void;
}

const initialState = {
  search: "",
  rental: "",
  localPickup: "",
  eventDate: "",
  minPrice: "",
  maxPrice: "",
  size: "",
};

export const useFilterStore = create<IFilter>((set) => ({
  ...initialState,
  setSearch: (value: string) => set({ search: value }),
  setRental: (value: string) => set({ rental: value }),
  setLocalPickup: (value: string) => set({ localPickup: value }),
  setEventDate: (value: string) => set({ eventDate: value }),
  setMinPrice: (value: string) => set({ minPrice: value }),
  setMaxPrice: (value: string) => set({ maxPrice: value }),
  setSize: (value: string) => set({ size: value }),
}));
