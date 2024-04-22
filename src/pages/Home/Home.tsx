import { useState, useEffect } from "react";
import Login from "components/Login/Login";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-center w-full items-center">
      {!isLoggedIn ? (
        <div className="w-80 bg-white rounded-md p-4 mx-4">
          <Login setIsLoggedIn={setIsLoggedIn} />
        </div>
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
