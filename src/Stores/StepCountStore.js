import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  totalSteps: null,
  stepGoal: null,
  weightLoss: null,
  countsData: [],
  currentCounts: [],
};
const store = (set) => ({
  ...initialState,
  setTotalSteps: (steps) => set((state) => ({ totalSteps: steps })),
  setStepGoal: (goal) => set((state) => ({ stepGoal: goal })),
  setWeightLoss: (loss) => set((state) => ({ weightLoss: loss })),
  setCountsData: (counts) => set((state) => ({ countsData: counts })),
  addCount: (count) =>
    set((state) => ({ currentCounts: [...state.currentCounts, count] })),
  reset: () => set(initialState),
});

export const useStepCountStore = create(
  devtools(persist(store, { name: "steps" }))
);
