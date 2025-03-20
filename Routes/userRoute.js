import mongoose from "mongoose";
import express from "express";
import { signUp, signIn, userRegistration } from "../Controllers/userController.js";


const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/registration", userRegistration);


export default router;