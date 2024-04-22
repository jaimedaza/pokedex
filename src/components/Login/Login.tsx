import React, { useState } from "react";
import Input from "components/Input/Input";
import { validateEmail, validatePassword } from "utils/utils";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: LoginProps) => {
  // Initialize state for email and password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Initialize state for error messages
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to handle sign up
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

    // Reset form fields and display success message
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  // Function to clear error message when typing
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col">
      <img className="mb-4" src="/pokedexlogo.png" alt="pokedexlogo" />
      <div className="mb-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          onFocus={clearErrorMessage}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          onFocus={clearErrorMessage}
        />
      </div>
      <button
        className="rounded py-2 px-1 bg-yellow-500 text-sky-900 font-bold"
        onClick={handleLogin}
      >
        Login
      </button>
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default Login;
