import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  weights: [],
  addWeight: (weight) =>
    set((state) => ({ weights: [...state.weights, weight] })),
});

export const useWeightStore = create(devtools(store));
