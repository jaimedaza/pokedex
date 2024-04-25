import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "pages/Home/Home";
import NavBar from "components/NavBar/NavBar";
import Login from "components/Login/Login";
import DetailsPage from "pages/Details/Details";
import FavoritesPage from "pages/Favorites/Favorites";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div
        className="bg-sky-900 bg-cover bg-top h-screen overflow-y-scroll"
        style={{ backgroundImage: "url('/forest.jpg')" }}
      >
        {!isLoggedIn ? (
          <div className="container mx-auto min-h-screen flex max-w-screen-lg">
            <div className="flex justify-center w-full items-center">
              <Login setIsLoggedIn={setIsLoggedIn} />
            </div>
          </div>
        ) : (
          <>
            <div className="container mx-auto flex max-w-screen-lg">
              <NavBar setIsLoggedIn={setIsLoggedIn} />
              <div className="flex container mx-auto h-[calc(100vh-4.625rem)] mt-[4.625rem] pb-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/details/:name" element={<DetailsPage />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
