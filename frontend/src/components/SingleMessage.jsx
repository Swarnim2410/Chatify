import React from 'react'

const SingleMessage = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://avatar.iran.liara.run/public/girl?username=new"
            alt="user image"
          />
        </div>
      </div>
      <div className='chat-bubble  text-black bg-blue-500'>Hi!What is upp?</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:40</div>
    </div>
  );
}

export default SingleMessage