import { useState } from "react";
import { validateEmail, validatePassword } from "utils/utils";

export const useLogin = (setIsLoggedIn: React.Dispatch<boolean>) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = (): void => {
    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one number, one special character, and have a minimum length of 6 characters."
      );
      return;
    }

    // Store email and password in localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // Set isLoggedIn flag in local storage and state
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);

    // Reset form fields
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  // Function to clear error message when typing
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    handleLogin,
    clearErrorMessage,
  };
};
