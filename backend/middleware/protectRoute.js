import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
  try {
    // console.log(req.body);
    // const token = req.cookies.jwt;
    // console.log(token);
    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ error: "Unauthorized User - No token present" });
    // }
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if (!decoded) {
    //   return res
    //     .status(401)
    //     .json({ error: "Unauthorized User - Invalid token" });
    // }
    const user = await User.findById(req.body.data).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    //we will get all details (except password) in req.user and that we can use in sendMessage
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
export default protectRoute;
