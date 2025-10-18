import Report from "../models/Report.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import { connectDB } from "../utils/connectDB.js";
// import Gemini call util later

// 📄 Upload Report (PDF/image)
export const uploadReport = async (req, res) => {
  try {
    if (!req.file) return errorHandler(res, 400, "Please select a file");
    // console.log(req)
    await connectDB();
    const uploadRes = await uploadOnCloudinary(req.file); // allow pdf/image
    const report = await Report.create({
      userId: req.userId,
      originalName: req.file.originalname,
      cloudUrl: uploadRes.secure_url,
      cloudPublicId: uploadRes.public_id,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    return successHandler(res, 200, "Report uploaded successfully", report);
  } catch (err) {
    console.log(err);
    return errorHandler(res, 500, "Upload failed", err.message);
  }
};

// 🤖 Analyze Report (Gemini later)
export const analyzeReport = async (req, res) => {
  try {
    const { id } = req.params;
    await connectDB();
    const report = await Report.findById(id);
    if (!report) return errorHandler(res, 404, "Report not found");

    // 🔹 Temporary mocked response for now (replace with Gemini later)
    const insight = {
      summary_en: "Your blood test shows mild vitamin D deficiency.",
      summary_roman: "Aapke test me halka Vitamin D kami nazar aayi hai.",
      vitals: [{ type: "Vitamin D", value: "18 ng/mL", normal: "30+" }],
      questions_for_doctor: [
        "Should I take supplements?",
        "Do I need sunlight exposure?",
      ],
    };

    report.insight = insight;
    report.analyzed = true;
    await report.save();

    return successHandler(res, 200, "AI Summary generated", report);
  } catch (err) {
    console.log(err);
    return errorHandler(res, 500, "Analyze failed", err.message);
  }
};
