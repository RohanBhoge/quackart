import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  user,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

// Following are the three routs for user.
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/users", user);

export default userRouter;
