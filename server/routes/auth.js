import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// //CREATEALL FOR INITIATE PROJECT WITH DATA
// router.post("/createall", createAllUser);

export default router;
