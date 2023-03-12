import Users from "../models/users.js";
import bcrypt from "bcryptjs";

//Update an user

export const updateUser = async (req,res,next)=>{
  try {
    let updateBody = {...req.body};
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      updateBody = { ...updateBody, password: hash };
    }

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: updateBody },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

//Delete an user

export const deleteUser = async (req,res,next)=>{
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

//Get an user

export const getUser = async (req,res,next)=>{
  try {
    const userId = req.params.id ? req.params.id : req.user.id;
    const user = await Users.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

//Get all user

export const getAllUser = async (req,res,next)=>{
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
