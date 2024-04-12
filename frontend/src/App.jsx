import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux, logoutRedux } from "./redux/userSlice.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [token, setToken] = useState(() =>
    JSON.parse(window.localStorage.getItem("token"))
  );

  useEffect(() => {
    const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenFromStorage);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(loginRedux(token));
    } else {
      dispatch(logoutRedux());
    }
  }, [dispatch, token]);

  // console.log(token);
  // console.log(user);

  return (
    <div className="bg-white p-4 h-screen flex items-center justify-center bg-[url('/bg.png')]">
      <Routes>
        <Route
          path="/"
          element={user._id ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user._id ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user._id ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
