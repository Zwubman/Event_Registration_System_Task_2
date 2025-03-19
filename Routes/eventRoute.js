import express from "express";
import { createEvent, getAllEvent } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create-event", createEvent);
router.get("/get-event", getAllEvent);

export default router;
