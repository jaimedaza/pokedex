export function validatePassword(password: string) {
  // Regular expressions for each requirement
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  // Check if the password meets all requirements
  const hasUppercase = uppercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);
  const hasMinLength = password.length >= 6;

  // Return true if all conditions are met, false otherwise
  return hasUppercase && hasNumber && hasSpecialChar && hasMinLength;
}
export const validateEmail = (email: string) => {
  // Regular expression for validating email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
