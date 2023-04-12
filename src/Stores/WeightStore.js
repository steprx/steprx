import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  weights: [],
};
const store = (set) => ({
  ...initialState,
  addWeight: (weight) =>
    set((state) => ({ weights: [...state.weights, weight] })),
  reset: () => set(initialState),
});

export const useWeightStore = create(
  devtools(persist(store, { name: "weight" }))
);
