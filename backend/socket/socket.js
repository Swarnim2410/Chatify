import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from 'dotenv'
dotenv.config();
//adding socket.io server on top of the express server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.URL,
    methods: ["GET", "POST"],
  },
});

// console.log(process.env.URL);

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

//{userId: socketId;}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on is used to listen to the events which can be used on client and server both.
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { app, io, server };
