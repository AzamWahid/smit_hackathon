import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;

    const baseName = file.originalname
      .split(".")[0]
      .replace(/[^a-zA-Z0-9-_]/g, "_");

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",   // 👈 handles PDF correctly
      public_id: baseName,
      format: "pdf",           // 👈 ensures .pdf extension
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    fs.unlinkSync(file.path);

    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
