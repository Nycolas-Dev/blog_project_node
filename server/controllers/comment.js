import Comments from "../models/comments.js";

//Create a post

export const createComment = async (req,res,next)=>{
  try {

    const newComment = new Comments(
      req.body
    );

    await newComment.save();
    res.status(200).send("Comment has been created.");
  } catch (err) {
    next(err);
  }
}


//Update a comment

export const updateComment = async (req,res,next)=>{
  try {
    let updateBody = {...req.body};

    const updatedComment = await Comments.findByIdAndUpdate(
      req.params.id,
      { $set: updateBody },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
}

//Delete an comment

export const deleteComment = async (req,res,next)=>{
  try {
    await Comments.findByIdAndDelete(req.body.data._id);
    res.status(200).json("Comment has been deleted.");
  } catch (err) {
    console.log(err)
    next(err);
  }
}

//Get an comment

export const getComment = async (req,res,next)=>{
  try {
    const comment = await Comments.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
}

//Get all comment

export const getAllComment = async (req,res,next)=>{
  try {
    const comments = await Comments.find({ post: req.params.id });
    res.status(200).json(comments);
  } catch (err) {
    console.log(err)
    next(err);
  }
}