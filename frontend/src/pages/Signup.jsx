import React, { useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [data, setData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowPassword = () => {
    setShowPassword((pre) => !pre);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, username, password, confirmPassword, gender } = data;

    if (username && password && fullName && confirmPassword && gender) {
      try {
        const response = await fetch(
          `/api/auth/signup`,
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
          toast.success("Registration is successful");
          navigate("/login");
          setData({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: "",
          });
        } else {
          toast.error(responseData.error);
        }
      } catch (error) {
        toast.error("Error:", error);
      }
    } else {
      toast.error("Enter all details");
    }
  };

  // console.log(data);

  return (
    <div className="relative mx-auto w-full max-w-md bg-black px-6 pt-10 pb-8 shadow-xl sm:rounded-xl sm:px-10 border rounded-2xl mt-2 mb-2 opacity-85">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">Sign Up</h1>
          <p className="mt-2 text-gray-500">Enter all the details</p>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="relative mt-6">
              <input
                type="fullName"
                name="fullName"
                id="fullName"
                value={data.fullName}
                onChange={handleOnChange}
                placeholder="Enter your Full Name"
                className="peer mt-1 w-full px-2 py-1 focus:border-gray-500 focus:outline-none bg-gray-700 border rounded-lg"
                autoComplete="off"
              />
              <label
                htmlFor="fullName"
                className="absolute top-0 left-0 -mt-5 ml-1 text-sm text-white  transition-all duration-100 ease-in-out pointer-events-none"
              >
                Full Name
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="username"
                name="username"
                id="username"
                value={data.username}
                onChange={handleOnChange}
                placeholder="Enter your username"
                className="peer mt-1 w-full px-2 py-1 focus:border-gray-500 focus:outline-none bg-gray-700 border rounded-lg"
                autoComplete="off"
              />
              <label
                htmlFor="username"
                className="absolute top-0 left-0 -mt-5 ml-1 text-sm text-slate-200 opacity-75 transition-all duration-100 ease-in-out pointer-events-none"
              >
                Username
              </label>
            </div>
            <div className="mb-6">
              <label className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">
                Your password
              </label>
              <div className="flex border rounded-lg focus:border-gray-500 focus:outline-none sm:text-sm  px-2 py-2  text-gray-900 focus:ring-blue-500 w-full  dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <input
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  type={showPassword ? "text" : "password"}
                  className="border-none outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                />
                <div className="flex-col py-1">
                  <span className="cursor-pointer" onClick={handleShowPassword}>
                    {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-6">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm your Password"
                className="peer mt-1 w-full  px-2 py-1  focus:border-gray-500 focus:outline-none bg-gray-700  border rounded-lg"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute top-0 left-0 -mt-5 ml-1 text-sm text-slate-200 opacity-75 transition-all duration-100 ease-in-out pointer-events-none"
              >
                Confirm Password
              </label>
            </div>
            <div className="relative mt-6">
              <select
                name="gender"
                id="gender"
                value={data.gender}
                onChange={handleOnChange}
                className="peer mt-1 w-full px-2 py-1 focus:border-gray-500 focus:outline-none bg-gray-700 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute top-0 left-0 -mt-5 ml-1 text-sm text-slate-200 opacity-75 transition-all duration-100 ease-in-out pointer-events-none"
              >
                Gender
              </label>
            </div>
            <div className="my-6">
              <button
                type="submit"
                className="w-full rounded-md bg-slate-800 hover:bg-slate-900 px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
            <p className="text-center text-sm text-white">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold hover:underline focus:text-gray-800 focus:outline-none text-blue-700 pl-1"
              >
                Sign In
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
