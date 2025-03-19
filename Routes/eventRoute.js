import express from "express";
import { createEvent, getAllEvent, viewDetails } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create-event", createEvent);
router.get("/get-event", getAllEvent);
router.get("/details/:id", viewDetails);

export default router;
