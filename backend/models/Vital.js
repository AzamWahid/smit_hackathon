import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bp: { type: String },       // e.g., "120/80"
  sugar: { type: Number },    // e.g., 98
  weight: { type: Number },   // kg
  notes: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Vital", vitalSchema);
