import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: ["JS", "PHP"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.model("Users", userSchema);