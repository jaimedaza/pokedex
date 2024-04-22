import React, { useState } from "react";
import Input from "components/Input/Input";
import { validateEmail, validatePassword } from "utils/utils";

const SignUp = () => {
  // Initialize state for email and password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Initialize state for success and error messages
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to handle sign up
  const handleSignUp = (): void => {
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
    // Reset form fields and display success message
    setEmail("");
    setPassword("");
    setSuccessMessage("Sign up successful! You can now log in.");
    setErrorMessage("");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
