import { connectDB } from './utils/connectDB.js';
import express from 'express';
import dotenv from 'dotenv'
import { authRouter } from './routes/authRoute.js';


const app = express();


app.use(express.json());


dotenv.config();

connectDB();

app.use('/api/auth', authRouter);


app.listen(7700, () => {
    console.log("server Started 7700")
})