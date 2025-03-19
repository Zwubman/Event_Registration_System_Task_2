import mongoose from "mongoose";
import './DbConfigs/dbConfig.js'
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
app.use(express.json());


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`the server is running on the port ${port}`);
})