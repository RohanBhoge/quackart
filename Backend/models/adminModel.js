import mongoose from "mongoose";

const adminShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const adminModel = mongoose.models.admin || mongoose.model("Admin", adminShema);

export default adminModel;
