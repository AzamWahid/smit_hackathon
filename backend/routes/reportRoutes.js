import express from "express";
import multer from "multer";
import { uploadReport, analyzeReport, getReports } from "../controller/reportController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const reportRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/" });


// Protected routes
reportRouter.post("/upload", verifyToken, upload.single("file"), uploadReport);
reportRouter.get("/getReports", verifyToken, getReports);
reportRouter.post("/:id/analyze", verifyToken, analyzeReport);

export default reportRouter;
