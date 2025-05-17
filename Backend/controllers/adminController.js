import adminModel from "../models/adminModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import createToken from "../utils/createToken.js";

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
        message: "Password should be at least 8 characters long",
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

    const token = createToken(admin._id);

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

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const exist = await adminModel.findOne({ email: email });
    if (!exist) {
      return res.json({
        success: false,
        massage: "Admin is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, exist.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(exist._id);

    res.json({
      success: true,
      Message: "Admin logged in successfully",
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

export { adminRegister, adminLogin };
