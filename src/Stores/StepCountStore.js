import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  totalSteps: 0,
  stepGoal: 0,
  countsData: [],
  currentCounts: [],
  setTotalSteps: (steps) => set((state) => ({ totalSteps: steps })),
  setStepGoal: (goal) => set((state) => ({ stepGoal: goal })),
  setCountsData: (counts) => set((state) => ({ countsData: counts })),
  addCount: (count) =>
    set((state) => ({ currentCounts: [...state.currentCounts, count] })),
});

export const useStepCountStore = create(devtools(store));
