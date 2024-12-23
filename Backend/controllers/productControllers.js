//  Function for add product
import connectCloudinary from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

connectCloudinary();

// Function for adding
const addProduct = async (req, res) => {
  try {
    // geting following information from postman request.
    const {
      name,
      discription,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    // geting images from postman trough request.
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // storing above images on cludinary.
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Uploading Images to cloudinary.
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image", // Optional, default is "image"
          });

          return result.secure_url; // Returns the uploaded image's URL
        } catch (err) {
          console.error("Cloudinary Upload Error:", err);
          throw err; // Rethrow to let the parent function handle it
        }
      })
    );

    const productData = {
      name,
      discription,
      category,
      price: Number(price.slice(0, -1)),
      subcategory,
      bestseller: bestseller === "bestseller" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Function for list product

const addListProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Function for remove product

const removeProduct = async (req, res) => {
  try {
    const remove = await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Function for single product

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const Product = await productModel.findById(productId);
    res.json({ success: true, Product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, addListProduct, removeProduct, singleProduct };
