const emailRegex =
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
const passwordRegex =
/^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&\\,><':;|_~`=+\- ]{8,256}$/g;
const numberRegex =
/^\d{1,3}(\.\d{1,2})?$/g;

export const validateRegister = (inputs) => {
  const firstNameRegex = /^[a-zA-Z](?:[ '.\-a-zA-Z]*[a-zA-Z\'\-])?$/g;
  const lastNameRegex = /^[a-zA-Z](?:[ '.\-a-zA-Z]*[a-zA-Z\'\-])?$/g;
  console.log("Validation start");
  if (
    passwordRegex.test(inputs.password) &&
    emailRegex.test(inputs.email) &&
    lastNameRegex.test(inputs.lastName) &&
    firstNameRegex.test(inputs.firstName)
  ) {
    console.log("Validation true");
    return true;
  }
  console.log("Validation false");
  return false;
};

export const validateLogIn = (inputs) => {
  console.log("Validated!");
  if (
    passwordRegex.test(inputs.password) &&
    emailRegex.test(inputs.email) 
  ) {
    return true;
  }
  return false;
};

// age: null,
// weight: null,
// heightFt: null,
// heightIn: null,
// bodyFat: null,
// targetWeight: null,
// waist: null,
// neck: null,

export const validateNumbers = (inputs) => {
  console.log("Validated!");
  if (
    numberRegex.test(inputs.age) &&
    numberRegex.test(inputs.weight) &&
    numberRegex.test(inputs.heightFt) &&
    numberRegex.test(inputs.heightIn) &&
    numberRegex.test(inputs.bodyFat) &&
    numberRegex.test(inputs.targetWeight) &&
    numberRegex.test(inputs.waist) &&
    numberRegex.test(inputs.neck)    
  ) {
    return true;
  }
  return false;
};