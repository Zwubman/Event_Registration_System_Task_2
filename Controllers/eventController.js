import mongoose from "mongoose";
import Event from "../Models/eventModel.js";

//create event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      availableSlot,
      speakers,
      agenda,
    } = req.body;
    const isExist = await Event.findOne({ title, date, location });

    if (isExist) {
      res.status(400).json({ message: "The event is already exist" });
    }

    const event = await new Event({
      title,
      description,
      date,
      time,
      location,
      availableSlot,
      speakers,
      agenda: agenda.map((item) => ({
        time: item.time,
        topic: item.topic,
      })),
    });

    await event.save();
    res.status(200).json({ message: "Event created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Event can't create." });
  }
};

// get all event that have been created
export const getAllEvent = async (req, res) => {
  try {
    const events = await Event.find().select(
      "title description date time location availableSlot"
    );

    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can'n not fetch event." });
  }
};

// To veiw the detail of the event
export const viewDetails = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Check if eventId is a valid MongoDB ObjectId
    

    const event = await Event.findById(eventId).select("agenda speakers");

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't access event's detail" });
  }
};


//To 
