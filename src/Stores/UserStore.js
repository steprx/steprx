import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  currentUser: null,
  userSubmit: false,
  setCurrentUser: (user) => set((state) => ({ currentUser: user })),
  setUserSubmit: (submit) => set((state) => ({ userSubmit: submit })),
});

export const useUserStore = create(devtools(store));
