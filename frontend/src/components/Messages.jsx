import React, { useState } from "react";
import SingleMessage from "./SingleMessage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import MessageSkeleton from "./MessageSkeleton";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState("");

  const userData = useSelector((state) => state.user);
  const selected = useSelector((state) => state.select);
  // console.log(selected);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVER_DOMAIN}/messages/${selected._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: userData._id }),
          }
        );

        const responseData = await response.json();
        if (responseData.error) {
          throw new Error(responseData.error);
        }
        setMessages(responseData);
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selected?._id) {
      getMessages();
    }
  }, [selected?._id, setMessages]);

  console.log(messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <SingleMessage key={message._id} message={message} />
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
