import React from "react";
const SingleConversation = ({
  conversation,
  lastIdx,
  emoji,
  onClick,
  id,
}) => {
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer ${
          id === conversation._id ? "bg-green-600" : ""
        }`}
        onClick={onClick}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default SingleConversation;
