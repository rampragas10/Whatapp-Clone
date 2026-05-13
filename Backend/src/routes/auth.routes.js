import express from "express";
import { register,login ,logout,updateProfile} from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// @route   POST api/auth/login
// @desc    Login user and return JWT token
router.post("/login", login);

// @route   POST api/auth/register
// @desc    Register user and return JWT token
router.post("/register", register);

// @route   POST api/auth/logout
// @desc    Logout user
router.post("/logout", logout);

// @route   PUT api/auth/profile
// @desc    Update user profile
router.put("/profile", authUser, updateProfile);

router.put("/update-profile", protectRoute, updateProfile);

// @route   GET api/auth/check
// @desc    Check if user is authenticated
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);



export default router;
