import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  age: null,
  gender: null,
  weight: null,
  height: null,
  bodyFat: null,
  targetWeightLoss: null,
  waist: null,
  neck: null,
};
const store = (set) => ({
  ...initialState,
  setAge: (age) => set((state) => ({ age: age })),
  setGender: (gender) => set((state) => ({ gender: gender })),
  setWeight: (weight) => set((state) => ({ weight: weight })),
  setHeight: (height) => set((state) => ({ height: height })),
  setBodyFat: (bodyFat) => set((state) => ({ bodyFat: bodyFat })),
  setTargetWeight: (targetWeightLoss) =>
    set((state) => ({ targetWeightLoss: targetWeightLoss })),
  setWaist: (waist) => set((state) => ({ waist: waist })),
  setNeck: (neck) => set((state) => ({ neck: neck })),
  reset: () => set(initialState),
});

export const useInfoStore = create(devtools(persist(store, { name: "info" })));
