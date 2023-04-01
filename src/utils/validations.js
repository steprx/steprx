const emailRegex =
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
const passwordRegex =
/^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&\\,><':;|_~`=+\- ]{8,256}$/g;

export const validateRegister = (inputs) => {
  const firstNameRegex = /^[a-zA-Z](?:[ '.\-a-zA-Z]*[a-zA-Z\'\-])?$/g;
  const lastNameRegex = /^[a-zA-Z](?:[ '.\-a-zA-Z]*[a-zA-Z\'\-])?$/g;
  console.log("Validated!");
  if (
    passwordRegex.test(inputs.password) &&
    emailRegex.test(inputs.email) &&
    lastNameRegex.test(inputs.lastName) &&
    firstNameRegex.test(inputs.firstName)
  ) {
    return true;
  }
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

