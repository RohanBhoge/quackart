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

    if (
      !name ||
      !discription ||
      !price ||
      !category ||
      !subcategory ||
      !sizes
    ) {
      return res.json({
        success: false,
        message: "Please fill all the fields.",
      });
    }
    // geting images from postman trough request.
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // storing above images on cludinary.
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    if (images.length === 0) {
      return res.json({
        success: false,
        message: "Please upload at least one image.",
      });
    }

    // Uploading Images to cloudinary.
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });

          return result.secure_url;
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

    res.json({
      success: true,
      message: "Product Added.",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//  Function for list product

const addListProduct = async (req, res) => {
  try {
    const products = await productModel.find();

    if (!products) {
      return res.json({
        success: false,
        message: "No products found.",
      });
    }

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//  Function for remove product

const removeProduct = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.json({
        success: false,
        message: "Please provide product ID.",
      });
    }
    const remove = await productModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Product Removed.",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, addListProduct, removeProduct };
