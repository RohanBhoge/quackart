// Storing the images here.
// geting the link from website where we wll store the images.
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();  
const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECREAT_KEY,
  });
};
export default connectCloudinary;
