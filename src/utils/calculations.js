export const calcStepGoal = (gender, weight, bodyFat, targetWeightLoss) => {
  const toKg = 2.20462;
  const currentWeightKG = weight / toKg;
  const currentFatMass = currentWeightKG * (bodyFat / 100);
  const currentFatFreeMass = currentWeightKG - currentFatMass;
  const targetWeightLossKG = currentWeightKG * (targetWeightLoss / 100);
  const targetWeightKG = currentWeightKG - targetWeightLossKG;
  const targetFatMassKG = currentFatMass - targetWeightLossKG;
  const targetBodyFat = (targetFatMassKG / targetWeightKG) * 100;
  console.log(currentWeightKG);
  console.log(currentFatMass);
  console.log(currentFatFreeMass);
  console.log(targetWeightLossKG);
  console.log(targetWeightKG);
  console.log(targetFatMassKG);
  console.log(targetBodyFat);
  console.log(targetBodyFat ** 1.3405);
  console.log(39377.34 / targetBodyFat ** 1.3405);
  const steps =
    gender === "male"
      ? (39377.34 / targetBodyFat ** 1.3405) * currentFatMass
      : (261425.4 / targetBodyFat ** 1.8797) * currentFatMass;
  return steps;
};

export const calcTotalSteps = (steps) => {
  console.log("calculating total steps...", steps);
  let totalSteps = 0;
  for (let i = 0; i < steps?.length; i++) {
    totalSteps += Number(steps[i].steps.S);
  }
  return totalSteps;
};

export const calcWeightDiff = (oldWeight, newWeight) => {
  console.log("calculating weight loss...");
  const loss = Number(oldWeight) - Number(newWeight);
  return loss;
};

export const calcAge = (birthdate) => {
  const today = new Date();
  const dob = new Date(Number(birthdate));
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  console.log(today, birthdate, dob, age, m);
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const calcHeight = (feet, inches) => {
  return Number(feet) * 12 + Number(inches);
};
