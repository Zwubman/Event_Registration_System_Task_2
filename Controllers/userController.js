import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;
    const isExist = await User.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (isExist) {
      res.status(400).json({ message: "User already exist" });
    }

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: role,
      phone: phone,
    });
    await user.save();
    res.status(200).json({ message: "User signUp successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentail" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );

    const refreshToken = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.json({ message: "Log In successfully.", accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can not log in." });
  }
};
