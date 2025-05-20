// Using following controller functions we will create multiple routes.
// We will create file in rout folder to rout the following function.

import userModel from "../models/useModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import createToken from "../utils/createToken.js";
import hashedPassword from "../utils/hashPassword.js";

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "User aldready exist.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email.",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password shuld be at least 8 characters long",
      });
    }

    //Create new user.
    const newUser = new userModel({
      name,
      email,
      password: await hashedPassword(password),
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User is does not exist.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Creadentioals.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

export { loginUser, registerUser, getUserDetails };
