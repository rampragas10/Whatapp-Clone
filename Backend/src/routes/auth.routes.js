import express from "express";
import { register,login } from "../controllers/auth.controller.js";

const router = express.Router();

// @route   POST api/auth/login
// @desc    Login user and return JWT token
router.post("/login", login);

// @route   POST api/auth/register
// @desc    Register user and return JWT token
router.post("/register", register);


export default router;
