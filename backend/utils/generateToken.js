import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // console.log(6);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // in millisecond
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict",
  });
  return token
};

export default generateTokenAndSetCookie;
