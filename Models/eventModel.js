import mongoose, { mongo } from "mongoose";


const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true, 
    },
    time: {
        type: string,
        required: true, 
    },
    location: {
        type: String,
        required: true,
    },
    availableSlot: {
        type: Number,
        required: true,
    },
    speakers: [
        {
            type: String
        }
    ],
    agenda: [
        {
            time: {
                type: String,
                required: false,
            },
            topic:{
                type: String, 
                required: false,
            }
        }
    ]

});

const Event = mongoose.model("Event", eventSchema);
export default Event;