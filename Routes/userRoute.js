import mongoose from "mongoose";
import express from "express";
import { signUp, signIn, userRegistration, cancelRegistration } from "../Controllers/userController.js";
import { verifyToken, checkAdminRole } from "../Middlewares/authMiddleware.js"


const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/registration/:eventId", verifyToken,  userRegistration);
router.delete("/cacel-registration/:enventId", verifyToken, cancelRegistration);


export default router;