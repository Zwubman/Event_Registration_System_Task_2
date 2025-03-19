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




