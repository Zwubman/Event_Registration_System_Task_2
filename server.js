import mongoose from "mongoose";
import express from "express";
import './DbConfigs/dbConfig.js'
import dotenv from "dotenv";
import Event from "./Models/eventModel.js";
import User from "./Models/userModel.js";


dotenv.config();
const app = express();
app.use(express.json());


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`the server is running on the port ${port}`);
})