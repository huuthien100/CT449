export const validateFullName = (fullName) => {
  if (fullName.length < 8) return "Full Name must be at least 8 characters long";
  else if (fullName.length > 30) return "Full name can only be up to 30 characters";
  return "";
};
export const validatePhone = (phone) => {
  if (phone.length !== 10) return "The phone number must be exactly 10 characters";
  return "";
};

export const validateAddress = (address) => {
  if (address.length < 10) return "Address must be at least 10 characters long";
  return "";
};

export const validatePassword = (passowrd) => {
  if (passowrd.length < 8) return "Password must be at least 8 characters long";
  return "";
};