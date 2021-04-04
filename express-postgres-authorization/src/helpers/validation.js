import bcrypt from 'bcrypt';

export const isValidEmail = (email) => {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regEx.test(email);
};

export const validatePassword = (password) => {
  // if (password.length <= 5 || password === '') {
  if (password === '') {
    return false;
  }
  return true;
};

export const isEmpty = (str) => {
  if (str === undefined || str === '') {
    return true;
  }
  if (str.replace(/\s/g, '').length) {
    return false;
  }
  return true;
};

export const comparePassword = (hashedPassword, password) =>
  bcrypt.compare(password, hashedPassword);

// export const minimumLength = (str) => {
//   if (str.length < 2) return false;
//   return true;
// };
