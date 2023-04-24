import { useState } from "react";

const nameRegex = /^[a-zA-Z](?:[ '.\-a-zA-Z]*[a-zA-Z\'\-])?$/;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
const passwordRegex =
  /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&\\,><':;|_~`=+\- ]{8,256}$/g;

export const validateFirstName = (firstName) => {
  console.log("Validating first name...");
  // if (firstName === "") {
  //   return "First name cannot be empty";
  // }
  return nameRegex.test(firstName);
};

export const validateLastName = (lastName) => {
  console.log("Validating last name...");
  // if (lastName === "") {
  //   return "Last name cannot be empty";
  // }
  return nameRegex.test(lastName);
};

export const validateEmail = (email) => {
  console.log("Validating email...");
  // if (email === "") {
  //   return "Email cannot be empty";
  // }
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  console.log("Validating password...");
  // if (password === "") {
  //   return "Password cannot be empty";
  // }
  return passwordRegex.test(password);
};

// export const validateUsername = (username) => {
//   if (username === "") {
//     return "Username cannot be empty";
//   }
// };

export const isBlank = (input) => {
  if (input === "") {
    return true;
  }
  return false;
};

export const validateSignUp = (inputs, errors) => {
  if (isBlank(inputs.firstName)) {
    return "First name cannot be blank";
  } else validateFirstName(inputs.firstName);
  validateEmail(inputs.email);
  validateLastName(inputs.lastName);
  validatePassword(inputs.password);
};
