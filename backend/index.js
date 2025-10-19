import { connectDB } from './utils/connectDB.js';
import express from 'express';
import dotenv from 'dotenv'
import { authRouter } from './routes/authRoute.js';
import { userRouter } from './routes/userRoute.js';
import cors from 'cors'
import reportRouter from './routes/reportRoutes.js';
import cookieParser from "cookie-parser";
import vitalRouter from './routes/vitalRoute.js';


const app = express();


const allowedOrigins = [
  "http://localhost:5173",          // local dev
  "https://smitfe.vercel.app",     // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies, auth headers
  })
);




app.use(express.json());
app.use(cookieParser());


dotenv.config();

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/reports', reportRouter);
app.use('/api/vitals', vitalRouter);

if (process.env.NODE_ENV !== 'production') {
    app.listen(7700, () => {
        console.log("server Started 7700")
    })
}


export default app;