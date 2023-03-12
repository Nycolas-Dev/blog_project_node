import express from "express";
import { createPost, updatePost, deletePost, getPost, getAllPost } from "../controllers/post.js";
import { verifyAdmin, verifyToken, verifyHimself } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE 
router.post("/create", verifyToken, createPost);

//GET ALL POST
router.get("/all", verifyToken, getAllPost);

//UPDATE LIKE ON POST
router.put("/like/:id", verifyToken, updatePost);

//UPDATE POST
router.put("/:id", verifyToken, verifyHimself, updatePost);

//DELETE POST
router.delete("/:id", verifyToken, verifyHimself, deletePost);

//GET POST
router.get("/:id", verifyToken, getPost);



export default router;