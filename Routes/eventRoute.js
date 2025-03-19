import express from "express";
import { createEvent, getAllEvent, viewDetails, updateEvent, deleteEvent } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create-event", createEvent);
router.get("/get-event", getAllEvent);
router.get("/details/:id", viewDetails);
router.put("/update-event/:eventId", updateEvent);
router.delete("/delete-event/:eventId", deleteEvent);

export default router;
