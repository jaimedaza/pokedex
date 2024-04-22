import React, { useState, useEffect } from "react";

import Login from "components/Login/Login";
import SignUp from "components/SignUp/SignUp";

const Home: React.FC = () => {
  // Initialize state for login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // Initialize state for form display (true for login, false for sign-up)
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Remove login status from localStorage
    localStorage.removeItem("isLoggedIn");
    // Update login status
    setIsLoggedIn(false);
  };

  const toggleForm = (): void => {
    setShowLoginForm((prevValue) => !prevValue);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          {showLoginForm ? <Login setIsLoggedIn={setIsLoggedIn} /> : <SignUp />}
          <button onClick={toggleForm}>
            {showLoginForm ? "Sign Up" : "Login"}
          </button>
        </>
      ) : (
        <div>
          <h1 className="text-3xl font-bold underline text-red-600">
            Simple React Typescript Tailwind Sample
          </h1>
          <h2>Welcome to the Home Page!</h2>
          <p>This is the content for logged-in users.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
