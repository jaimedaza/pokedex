import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavBarProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ setIsLoggedIn }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="fixed top-0 max-w-screen-xl w-full bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img className="w-28" src="/pokedexlogo.png" alt="pokedexlogo" />
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isMenuOpen ? "" : "hidden"}  w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-sky-700 rounded md:p-0 hover:text-yellow-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dummy"
                className="block py-2 px-3 text-sky-700 rounded md:p-0 hover:text-yellow-500"
              >
                Dummy
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="text-sky-700  bg-yellow-400 font-bold hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-center"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
