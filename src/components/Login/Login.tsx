import React, { useState } from "react";
import Input from "components/Input/Input";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: LoginProps) => {
  // Initialize state for email and password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // Initialize state for error message
  const [error, setError] = useState<string>("");

  // Function to handle login
  const handleLogin = (): void => {
    // Retrieve stored email and password from localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    // Check if entered credentials match stored credentials
    if (email === storedEmail && password === storedPassword) {
      // Set login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      setError("");
      // Log in user
      console.log("Login successful!");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
