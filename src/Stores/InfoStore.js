import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  age: 0,
  gender: "male",
  weight: 0,
  height: 0,
  bodyFat: 0,
  targetWeight: 0,
  waist: 0,
  neck: 0,
  setAge: (age) => set((state) => ({ age: age })),
  setGender: (gender) => set((state) => ({ gender: gender })),
  setWeight: (weight) => set((state) => ({ weight: weight })),
  setHeight: (height) => set((state) => ({ height: height })),
  setBodyFat: (bodyFat) => set((state) => ({ bodyFat: bodyFat })),
  setTargetWeight: (targetWeight) =>
    set((state) => ({ targetWeight: targetWeight })),
  setWaist: (waist) => set((state) => ({ waist: waist })),
  setNeck: (neck) => set((state) => ({ neck: neck })),
});

export const useInfoStore = create(devtools(store));
