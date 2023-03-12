import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Posts',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("Comments", commentSchema);