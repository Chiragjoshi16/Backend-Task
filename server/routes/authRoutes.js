// authRoutes.js

const express = require('express');

// Import necessary libraries and models
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

// Define route handler for user registration
router.post('/signup' , validationMiddleware.validateUserRegistration, async (req, res) => {
  try {
    // Parse the incoming request body to extract username, email, and password
    const { username, email, password } = req.body;

    // Validate the input data to ensure all required fields are present and in the correct format
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide username, email, and password" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user details (username, email, hashed password) to the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token and send it in the response
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/login' , validationMiddleware.validateUserRegistration , async (req, res) => {
    try {
      // Parse the incoming request body to extract username and password
      const { username, password } = req.body;
  
      // Validate the input data to ensure username and password are provided
      if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password" });
      }
  
      // Find the user by username in the database
      const user = await User.findOne({ username });
  
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If passwords don't match, return error
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // If credentials are valid, generate a JWT token and send it in the response
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
