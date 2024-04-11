//imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//route imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


const app = express();
app.use(express.json());
app.use(cookieParser())
dotenv.config();
const PORT = process.env.PORT_NUMBER || 3000;

//connecting database -->
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
