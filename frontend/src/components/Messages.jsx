import React, { useState, useRef } from "react";
import SingleMessage from "./SingleMessage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "../hooks/useListenMessages";
import useConversation from "../zustand/useConversation";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  // const [msgs, setMsgs] = useState("");
  const { messages, setMessages } = useConversation();
  useListenMessages();

  const userData = useSelector((state) => state.user);
  const selected = useSelector((state) => state.select);
  const trigger = useSelector((state) => state.trigger);
  // console.log(trigger);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/messages/${selected._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: userData._id }),
          }
        );

        const responseData = await response.json();
        console.log(responseData);
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
  }, [selected?._id]);

  // console.log(messages);
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <SingleMessage message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
