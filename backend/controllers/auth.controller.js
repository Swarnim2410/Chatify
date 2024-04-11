import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

//Login -->
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: "Enter valid credentials", redirect: false });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      message: `Welcome ${user.fullName}`,
      redirect: true,
    });
  } catch (error) {
    console.log("Login error", error.message);
    res.status(500).json({ error: "Internal Server Error", redirect: false });
  }
};

// Signup -->
export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } =
      req.body;
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ error: "Passwords do not matched", redirect: false });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "User already exists with same username",
        redirect: false,
      });
    }
    const email_id = await User.findOne({ email });
    if (email_id) {
      return res.status(400).json({
        error: "User already exists with same email-id",
        redirect: false,
      });
    }

    //hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      email,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // console.log(newUser);

    if (newUser) {
      //generate JWT token -->

      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        message: "Succesfully registered",
        redirect: true,
      });
    } else {
      res.status(500).json({ error: "Invalid data", redirect: false });
    }
  } catch (error) {
    console.log("Signup error", error.message);
    res.status(500).json({ error: "Internal Server Error", redirect: false });
  }
};

// Logout -->
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error", error.message);
    res.status(500).json({ error: "Internal Server Error", redirect: false });
  }
};
