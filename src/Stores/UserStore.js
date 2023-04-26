import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  currentUser: null,
  userInfo: null,
  weighIns: null,
  userAttributes: null,
  uuid: null,
  session: null,
};
const store = (set) => ({
  ...initialState,
  setCurrentUser: (user) => set((state) => ({ currentUser: user })),
  setUserInfo: (info) => set((state) => ({ userInfo: info })),
  setWeighIns: (weighIn) => set((state) => ({ weighIns: weighIn })),
  setUserAttributes: (attributes) =>
    set((state) => ({ userAttributes: attributes })),
  setUuid: (uuid) => set((state) => ({ uuid: uuid })),
  setSession: (session) => set((state) => ({ session: session })),
  reset: () => set(initialState),
});

export const useUserStore = create(devtools(persist(store, { name: "user" })));
