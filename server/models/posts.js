import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  reading_time: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Posts", postSchema);