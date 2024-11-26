// Summary of What Happens in the User Model File:
// Schema Definition: You define what data (like name, email, password) the user will have.
// Password Hashing: Before saving a user, the plain text password is hashed for security.
// Password Comparison: You define a method to compare a plain password with a hashed password (for login).
// Database Interactions: The model provides functions like save(), findOne(), and more to interact with the database.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
