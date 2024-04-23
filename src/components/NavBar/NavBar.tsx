import React from "react";
import { Link } from "react-router-dom";

interface NavBarProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ setIsLoggedIn }: NavBarProps) => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">
          Home
        </Link>
        <Link to="/dummy" className="text-white">
          Dummy
        </Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
