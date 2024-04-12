import React from "react";
import { useState } from "react";
const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = data;

    if (username && password) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVER_DOMAIN}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const responseData = await response.json();
        // console.log(responseData);

        if (responseData.redirect) {
          console.log("Login is successfull");
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Enter all details");
    }
  };

  // console.log(data);

  return (
    <div className="relative mx-auto w-full max-w-md bg-black px-6 pt-10 pb-8 shadow-xl sm:rounded-xl sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">Sign in</h1>
          <p className="mt-2 text-gray-500">
            Sign in below to access your account
          </p>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="relative mt-6">
              <input
                type="username"
                name="username"
                id="username"
                value={data.username}
                onChange={handleOnChange}
                placeholder="Enter your username"
                className="peer mt-1 w-full px-2 py-1 focus:border-gray-500 focus:outline-none"
                autoComplete="off"
              />
              <label
                htmlFor="email"
                className="absolute top-0 left-0 -mt-5 ml-1 text-sm text-slate-200 opacity-75 transition-all duration-100 ease-in-out pointer-events-none"
              >
                Username
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleOnChange}
                placeholder="Enter your Password"
                className="peer mt-1 w-full  px-2 py-1  focus:border-gray-500 focus:outline-none"
              />
              <label
                htmlFor="password"
                className="absolute top-0 left-0 -mt-5 ml-1 text-sm text-slate-200 opacity-75 transition-all duration-100 ease-in-out pointer-events-none"
              >
                Password
              </label>
            </div>
            <div className="my-6">
              <button
                type="submit"
                className="w-full rounded-md bg-slate-600 hover:bg-slate-700 px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
              >
                Sign in
              </button>
            </div>
            <p className="text-center text-sm text-whie">
              Don't have an account yet?
              <a
                href="#!"
                className="font-semibold  hover:underline focus:text-gray-800 focus:outline-none text-blue-700 pl-1"
              >
                Sign up
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
