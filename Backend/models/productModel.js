import mongoose from "mongoose";

const productShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    sizes: {
      type: Array,
      requied: true,
    },
    bestSeller: {
      type: Boolean,
    },
    date: {
      type: Number,
      requied: true,
    },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productShema);

export default productModel;
