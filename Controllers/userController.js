import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const isExist = await User.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (isExist) {
      res.status(400).send("User already exist");
    }

    const user = new User(firstName, lastName, email, hashedPassword, role);
    await user.save();
    res.status(200).send("User successfully signUp.");
  } catch (error) {
    console.error("signUp error: ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
