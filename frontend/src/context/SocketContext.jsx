import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";


const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  const userData = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (userData) {
      const socket = io("https://chatify-x1xy.onrender.com", {
        query: {
          userId: userData._id,
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        // console.log(onlineUsers);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userData]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
