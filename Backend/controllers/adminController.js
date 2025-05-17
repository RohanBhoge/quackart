import adminModel from "../models/adminModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const exist = await adminModel.findOne({ email: email });
    if (exist) {
      return res.json({
        success: false,
        message: "Admin already exists",
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
        message: "Password is not valid",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newAdmin = new adminModel({
      name,
      email,
      password: hashedpassword,
    });

    const admin = await newAdmin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRETE);

    res.json({
      success: true,
      message: "Admin registered successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: message.error,
    });
  }
};

export { adminRegister };
