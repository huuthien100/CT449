export const validateFullName = (fullName) => {
  if (fullName.length < 8) return "Họ tên phải có tối thiểu 8 kí tự";
  else if (fullName.length > 30) return "Họ tên phải có tối đa 30 kí tự";
  return "";
};
export const validatePhone = (phone) => {
  if (phone.length !== 10) return "Số điện thoại phải có đúng 10 kí tự";
  return "";
};

export const validateAddress = (address) => {
  if (address.length < 10) return "Địa chỉ phải có tối thiểu 10 kí tự";
  return "";
};

export const validatePassword = (passowrd) => {
  if (passowrd.length < 8) return "Password phải có tối thiểu 8 kí tự";
  return "";
};
