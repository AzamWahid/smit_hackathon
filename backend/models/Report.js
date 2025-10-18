import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalName: String,
    cloudUrl: String,
    cloudPublicId: String,
    mimetype: String,
    size: Number,
    analyzed: {
      type: Boolean,
      default: false,
    },
    insight: {
      summary_en: String,
      summary_roman: String,
      vitals: Array,
      questions_for_doctor: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
