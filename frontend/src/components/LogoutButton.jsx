import React from "react";
import { BiLogOut } from "react-icons/bi";
import { logoutRedux } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { unselectedRedux } from "../redux/selectedConversation";
import { removeAllConversations } from "../redux/allConversations";
import { untriggerRedux } from "../redux/trigger";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (responseData.message) {
        toast.success("Logout successfully");
        dispatch(logoutRedux());
        dispatch(unselectedRedux());
        dispatch(removeAllConversations());
        dispatch(untriggerRedux());
        localStorage.removeItem("token");

        // Dispatch custom event to notify token update
        window.dispatchEvent(new Event("tokenUpdated"));
        navigate("/");
      } else {
        toast.error("Invalid details");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };
  return (
    <div className="mt-auto" onClick={handleSubmit}>
      <BiLogOut className="w-6 h-6 text-black cursor-pointer" />
    </div>
  );
};

export default LogoutButton;
