import { create } from "zustand";

interface IFilter {
  search: string;
  setSearch: (value: string) => void;
  fourDayRental: boolean;
  setFourDayRental: (value: boolean) => void;
  localPickup: number;
  setLocalPickup: (value: number) => void;
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
  fourDayRental: false,
  localPickup: 2,
  eventDate: "",
  minPrice: "",
  maxPrice: "",
  size: "",
};

export const useFilterStore = create<IFilter>((set) => ({
  ...initialState,
  setSearch: (value: string) => set({ search: value }),
  setFourDayRental: (value: boolean) => set({ fourDayRental: value }),
  setLocalPickup: (value: number) => set({ localPickup: value }),
  setEventDate: (value: string) => set({ eventDate: value }),
  setMinPrice: (value: string) => set({ minPrice: value }),
  setMaxPrice: (value: string) => set({ maxPrice: value }),
  setSize: (value: string) => set({ size: value }),
}));
