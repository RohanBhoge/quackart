import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  user,
  getUserDetails,
} from "../controllers/userControllers.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

// Following are the three routs for user.
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/users", user);
userRouter.get("/user-details", authUser, getUserDetails);

export default userRouter;