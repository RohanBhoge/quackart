import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRouts.js";
import productRouter from "./routes/productRouts.js";
import cartRouter from "./routes/cartRouts.js";

dotenv.config();
// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () =>
  console.log(`sever started on port 
     ${port}`)
);
