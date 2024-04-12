import React, { useEffect, useState } from "react";
import SingleConversation from "./SingleConversation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getRandomEmoji } from "../utils/emojis";
const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(conversations);
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVER_DOMAIN}/users`,
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
        setConversations(responseData);
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation,idx) => {
        return(
        <SingleConversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />)
      })}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
