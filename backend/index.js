//imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";

//route imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();
const PORT = process.env.PORT_NUMBER || 3000;

const __dirname = path.resolve();

//connecting database -->
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
