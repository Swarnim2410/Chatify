import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
router.post("/", protectRoute, getUsersForSidebar);
export default router;
