import React from "react";
import { useSelector } from "react-redux";

import { extractTime } from "../utils/extractTime";
const SingleMessage = ({ message }) => {
  const userData = useSelector((state) => state.user);
  const selected = useSelector((state) => state.select);
  const time = extractTime(message.createdAt);

  const fromMe = message.senderId === userData._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? userData.profilePic : selected.profilePic;
  const bubbleBgColor = fromMe ? "bg-green-500" : "";
  const shakeClass = message.shouldShake ?  "shake" : ""
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user image" />
        </div>
      </div>
      <div
        className={`chat-bubble  text-black  ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {time}
      </div>
    </div>
  );
};

export default SingleMessage;
