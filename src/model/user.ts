import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  auth0Id: {
    type: String,
    required: true,
    unique: true
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;