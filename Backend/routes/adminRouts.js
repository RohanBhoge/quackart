import express from "express";
import { adminRegister } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/register", adminRegister);

export default adminRouter;
