import Vital from "../models/Vital.js";
import { connectDB } from "../utils/connectDB.js";
import { successHandler, errorHandler } from "../utils/responseHandler.js";

// Add new vitals
export const addVital = async (req, res) => {
  try {
    await connectDB();
    console.log(req.body)
    const { bp, sugar, weight, notes, date } = req.body;

    const vital = await Vital.create({
      userId: req.userId,
      bp,
      sugar,
      weight,
      notes,
      date: date || new Date(),
    });

    return successHandler(res, 201, "Vitals added successfully", vital);
  } catch (err) {
    console.log(err);
    return errorHandler(res, 500, "Failed to add vitals", err.message);
  }
};

// Get all vitals for user
export const getVitals = async (req, res) => {
  try {
    await connectDB();
    const vitals = await Vital.find({ userId: req.userId }).sort({ date: -1 });
    return successHandler(res, 200, "Vitals fetched", vitals);
  } catch (err) {
    console.log(err);
    return errorHandler(res, 500, "Failed to fetch vitals", err.message);
  }
};
