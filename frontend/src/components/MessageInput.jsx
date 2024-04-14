import { useState } from "react";
import { BsSend } from "react-icons/bs";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const MessageInput = () => {
  const selectedOne = useSelector((state) => state.select);
  const userData = useSelector((state) => state.user);
  // console.log(selectedOne);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-black"
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
