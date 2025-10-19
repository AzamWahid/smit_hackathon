import express from "express";
import multer from "multer";
import { uploadReport, analyzeReport, getReports } from "../controller/reportController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addVital, getVitals } from "../controller/vitalController.js";

const vitalRouter = express.Router();


// Protected routes
vitalRouter.post("/add", verifyToken, addVital);
vitalRouter.get("/getAll", verifyToken, getVitals);

export default vitalRouter;
