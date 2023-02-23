import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  currentView: 1,
  setCurrentView: (view) => set((state) => ({ currentView: view })),
});

export const useDialogStore = create(devtools(store));
