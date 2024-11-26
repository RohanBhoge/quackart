// Using following controller functions we will create multiple routes.
// We will create file in rout folder to rout the following function.

import userModel from "../models/useModel.js";
import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

// Rout for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User is does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Creadentioals." });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

//Create Token;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE);
};

// Rout for user register
const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    // is user aldready exist.

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User aldready exist." });
    }

    //Validating email and strong password.
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email.",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password is not valid",
      });
    }

    //Hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user.
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    //Create token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: message.error,
    });
  }
};

// Rout for admin login.
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRETE);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Creadintials" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: message.error,
    });
  }
};

const user = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { loginUser, registerUser, adminLogin, user };
