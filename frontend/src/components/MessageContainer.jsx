import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const selectedOne = useSelector((state) => state.select);
  const user = "User";
  // console.log(selectedOne);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedOne.fullName ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To : </span>
            <span className="text-gray-900 font-bold">
              {selectedOne.fullName ? selectedOne.fullName : user}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const userData = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {userData.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
