export const calcStepGoal = (gender, weight, bodyFat, targetWeight) => {
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
  return steps;
};

export const calcTotalSteps = (stepCounts) => {
  let totalSteps = parseInt(0);
  for (let i = 0; i < stepCounts?.length; i++) {
    totalSteps += parseInt(stepCounts[i].steps);
  }
  return totalSteps;
};

export const calcWeightDiff = (weights) => {
  console.log(weights);
};