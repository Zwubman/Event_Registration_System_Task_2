import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";

// User sign up function
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;
    const isExist = await User.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (isExist) {
      res.status(400).json({ message: "User already exist" });
    }
    //Create new user
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

// User sign in
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
    //Generate access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    //Generate refresh token
    const refreshToken = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    //Store token in cookie
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.json({ message: "Log In successfully.", accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can not log in." });
  }
};

//User Register for the event
export const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, phone, email } = req.body;
    const eventId = req.params;
    const userId = req.user._id;

    const event = await Event.findOne({ _id: eventId });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
    }

    //Check the capacity of the event is full or not
    const capacity = event.availableSlot;
    const numberOfRegisterd = event.registeredUsers.length;
    if (numberOfRegisterd >= capacity) {
      res.status(401).json({
        message: "Registration failed. No available slots for this event.",
      });
    }

    const isRegistered = event.registeredUsers.some(
      (regUser) => regUser.userId.toString() === userId.toString()
    );

    //Check if the user is already registered for the event or not
    if (isRegistered) {
      res
        .status(400)
        .json({ message: "User is already registered for this event" });
    }

    //Register user for event
    event.registeredUsers.push({
      userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    });

    await event.save();

    res
      .status(200)
      .json({ message: "User registered successfully for the event." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration fail." });
  }
};
