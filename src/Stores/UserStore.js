import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  currentUser: null,
  userAttributes: null,
  userSubmit: false,
  setCurrentUser: (user) => set((state) => ({ currentUser: user })),
  setUserAttributes: (attributes) =>
    set((state) => ({ userAttributes: attributes })),
  setUserSubmit: (submit) => set((state) => ({ userSubmit: submit })),
});

export const useUserStore = create(devtools(store));
