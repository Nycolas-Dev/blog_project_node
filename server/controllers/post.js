import Posts from "../models/posts.js";
import Comments from "../models/comments.js";

function calculateReadingTime(content) {
  const wordsPerMinute = 250;
  const totalWords = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(totalWords / wordsPerMinute);
  return readingTime;
}

//Create a post

export const createPost = async (req,res,next)=>{
  try {

    const newPost = new Posts({
      ...req.body,
      reading_time: calculateReadingTime(req.body.content),
    });

    await newPost.save();
    res.status(200).send("Post has been created.");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

//Update a post

export const updatePost = async (req,res,next)=>{
  try {
    let updateBody = {...req.body};

    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.id,
      { $set: updateBody },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
}

//Delete an post

export const deletePost = async (req,res,next)=>{
  try {
    const postId = req.body.data._id;
    await Comments.deleteMany({ post: postId });
    await Posts.findByIdAndDelete(postId)
    res.status(200).json("Post has been deleted.");
  } catch (err) {
    next(err);
  }
}

//Get an post

export const getPost = async (req,res,next)=>{
  try {
    const post = await Posts.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

//Get all post

export const getAllPost = async (req,res,next)=>{
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
}