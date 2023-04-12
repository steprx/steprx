import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  currentView: 1,
};
const store = (set) => ({
  ...initialState,
  setCurrentView: (view) => set((state) => ({ currentView: view })),
  reset: () => set(initialState),
});

export const useDialogStore = create(devtools(store));
