import React from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import { useEffect } from "react";
import useConversation from "../zustand/useConversation.jsx";
import { set } from "mongoose";
import notificationSound from "../utils/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play()
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
