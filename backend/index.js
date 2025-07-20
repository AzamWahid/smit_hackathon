import { connectDB } from './utils/connectDB.js';
import express from 'express';
import dotenv from 'dotenv'


const app = express();


app.use(express.json());


dotenv.config();

connectDB();


app.listen(7700, () => {
    console.log("server Started 7700")
})