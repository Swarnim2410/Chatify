import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("token")
  );

  useEffect(() => {
    const updateToken = () => {
      setToken(window.localStorage.getItem("token"));
    };

    // Listen for custom event to update token
    window.addEventListener("tokenUpdated", updateToken);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("tokenUpdated", updateToken);
    };
  }, []);

  return (
    <div className="bg-white p-4 h-screen flex items-center justify-center bg-[url('/bg.png')]">
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
