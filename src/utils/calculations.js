import { useStepCountStore } from "../Stores/StepCountStore";
import { Health } from "./userOLD";

export const calcStepGoal = () => {
  const { gender, weight, bodyFat, targetWeight } = Health();
  const toKg = 0.453592;
  const wkg = weight * toKg;
  const fmkg = wkg * (bodyFat / 100);
  const ffmkg = wkg - fmkg;
  const targetWkg = targetWeight * toKg;
  const targetFmkg = targetWkg - ffmkg;
  const targetBodyFat = (targetFmkg / targetWkg) * 100;
  const steps =
    gender === "male"
      ? (39377.34 / targetBodyFat ** 1.3405) * fmkg
      : (261425.4 / targetBodyFat ** 1.8797) * fmkg;
  console.log(fmkg, targetBodyFat);
  console.log(39377.34 / targetBodyFat);
  console.log(steps.toFixed(0));
  return steps;
};

export const calcTotalSteps = (stepCounts) => {
  console.log(stepCounts);
  let totalSteps = parseInt(0);
  for (let i = 0; i < stepCounts?.length; i++) {
    totalSteps += parseInt(stepCounts[i].steps);
  }
  console.log(totalSteps);
  return totalSteps;
};

export const calcWeightDiff = (weights) => {
  console.log(weights);
};
