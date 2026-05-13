import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { config } from '../config/config.js';
import jwt from 'jsonwebtoken';

//generate JWT token
const generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });

  res.cookie("token", token, {
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    secure: process.env.NODE_ENV === "production"? true : false, // only send cookie over HTTPS in production
    sameSite: "strict", // CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
    return token;
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ token, user });
  } catch (error) {   
    res.status(500).json({ message: error.message });
    }
};

