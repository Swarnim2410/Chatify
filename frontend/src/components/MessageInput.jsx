import { useState } from "react";
import { BsSend } from "react-icons/bs";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { triggerRedux } from "../redux/trigger";
import useConversation from "../zustand/useConversation";

const MessageInput = () => {
  const selectedOne = useSelector((state) => state.select);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(selectedOne);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [triggered, setTriggered] = useState(false);

  const { messages, setMessages } = useConversation();
  // const [trigger, setTrigger] = useState(false);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_DOMAIN}/messages/send/${
          selectedOne._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: userData._id, message: message }),
        }
      );

      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      setMessage("");
      setTriggered(!triggered);
      dispatch(triggerRedux(triggered));
      setMessages([...messages, responseData]);
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // console.log(message);
  return (
    <form className="px-4 my-3" onSubmit={sendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
