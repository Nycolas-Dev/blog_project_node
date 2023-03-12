import express from "express";
import { updateUser, deleteUser, getUser, getAllUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyHimself } from "../utils/verifyToken.js";

const router = express.Router();

//GET ALL USER
router.get("/all", verifyToken, getAllUser);

//UPDATE USER
router.put("/:id", verifyToken, verifyHimself, updateUser);

//DELETE USER
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

//GET USER
router.get("/:id", verifyToken, getUser);

//GET USER
router.get("/", verifyToken, getUser);



export default router;