import express from "express";
import { createEvent } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create-event", createEvent);

export default router;
