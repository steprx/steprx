const regexEmail = /^\w\w*(?:(?:\.|-)?\w+)*@\w+\-?\w*(?:\.[a-z]{2,})+$/i;
const regexPass =
  /^(?=(?:[a-zA-Z\d!"#$%^&*()\-=.])*[a-z])(?=(?:[a-zA-Z\d!"#$%^&*()\-=.])*[A-Z])(?=(?:[a-zA-Z\d!"#$%^&*()\-=.])*[0-9])(?=(?:[a-zA-Z\d!"#$%^&*()\-=.])*[!"#$%^&*()\-=.])(?=(?:[a-zA-Z\d!"#$%^&*()\-=.]){8,64})/;
const regexName = /^[a-z]+[-']?[a-z]+$/i;

export const validateEmail = (email) => {
  const emailValid = regexEmail.test(email);
  console.log(email, "validating");
  if (emailValid) {
    console.log(email, "email valid");
    return true;
  }
  return false;
};
export const validatePass = (pass) => {
  const passValid = regexPass.test(pass);
  if (passValid) {
    console.log(pass, "pass valid");
    return true;
  }
  return false;
};
export const validateName = (name) => {
  const nameValid = regexName.test(name);
  if (nameValid) {
    console.log(name, "name valid");
    return true;
  }
  return false;
};
