import { Users } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/feature.js";

// get all users
export const getMyprofile = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// new register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await Users.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);

  user = await Users.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "Registered SuccessFully", 201);
};

// login users
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email }).select("+password");
  // console.log(user.password);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Envalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  // console.log(isMatch);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Envalid email or password",
    });
  }

  sendCookie(user, res, `Welcome back, ${user.name}`, 200);
};

// getting user detail by id
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.envNODE_ENV === "Development" ? "lax" : "none",
      secure: process.envNODE_ENV === "Development" ? false : true,
    });

  res.json({
    success: true,
    user: req.user,
  });
};
