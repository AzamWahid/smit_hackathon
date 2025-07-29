import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const uploadOnCloudinary = async (file) => {
  try {
    console.log(file, "==>>> file")
    const result = await cloudinary.uploader.upload(file.path)

    // console.log(result , "====> cloud")
    setTimeout(() => fs.unlink(file.path, (err) => console.log(err)), 5000)
    return result
  } catch (err) { console.log(err) }
}