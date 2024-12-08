import mongoose from "mongoose";
// Connecting mongoose to database.
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
};

export default connectDB;