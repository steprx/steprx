import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  currentCounts: [],
  addCount: (count) =>
    set((state) => ({ currentCounts: [...state.currentCounts, count] })),
});

export const useStepCountStore = create(devtools(store));
