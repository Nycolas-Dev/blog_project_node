import express from "express";
import { createComment, updateComment, deleteComment, getComment, getAllComment } from "../controllers/comment.js";
import { verifyAdmin, verifyToken, verifyHimself } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE COMMENT
router.post("/create", verifyToken, createComment);

//GET ALL COMMENT
router.get("/all/:id", verifyToken, getAllComment);

//UPDATE COMMENT
router.put("/:id", verifyToken, verifyHimself, updateComment);

//DELETE COMMENT
router.delete("/:id", verifyToken, verifyAdmin, deleteComment);

//GET COMMENT
router.get("/:id", verifyToken, getComment);



export default router;