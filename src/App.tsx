import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "pages/Home/Home";
import NavBar from "components/NavBar/NavBar";
import Login from "components/Login/Login";
import DetailsPage from "pages/Details/Details";

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
      <div className="bg-sky-900">
        {!isLoggedIn ? (
          <div className="container mx-auto min-h-screen bg-sky-700 flex max-w-screen-xl">
            <div className="flex justify-center w-full items-center">
              <Login setIsLoggedIn={setIsLoggedIn} />
            </div>
          </div>
        ) : (
          <>
            <div className="container mx-auto bg-sky-700 flex max-w-screen-xl">
              <NavBar setIsLoggedIn={setIsLoggedIn} />
              <div className="flex container mx-auto min-h-[calc(100vh-4.625rem)] mt-[4.625rem] py-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dummy" element={<h1>DUMMY!!!</h1>} />
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
