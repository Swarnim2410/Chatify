import express from "express";
import { sendMessage,getMessages } from "../controllers/message.controller.js";
const router = express.Router()
import protectRoute from '../middleware/protectRoute.js'

//protect route is used to get sender id who is currently logged in through jwt token verification
router.post("/send/:id",protectRoute, sendMessage)
router.get("/:id", protectRoute, getMessages);
export default router