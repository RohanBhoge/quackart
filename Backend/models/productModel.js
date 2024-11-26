import mongoose from "mongoose";

//  In the model we create the schema where we write the operation to handle deta.

// Mongoose.Shema is a controctor.
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
