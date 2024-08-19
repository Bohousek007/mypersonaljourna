//---------- Import Dependencies ----------//
const express = require('express');                      // Import Express framework for handling routes
const router = express.Router();                         // Create a new router instance for user-related routes
const bcrypt = require('bcrypt');                        // Import bcrypt for password hashing and comparison
const User = require('../models/user');                  // Import the User model for database interaction
//----------------------------------------//


//---------- User Registration Route ----------//
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body; // Destructure the request body to extract user details

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' }); // Return error if passwords don't match
    }

    // Check if email is already in use
    const existingUser = await User.findOne({ email });                  // Query the database for an existing user with the same email
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });    // Return error if email is already taken
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);              // Hash the password with bcrypt

    // Create a new user and save to the database
    const newUser = new User({ firstName, lastName, email, password: hashedPassword }); // Create a new user instance with hashed password
    await newUser.save();                                                // Save the user to the database

    res.status(201).json({ message: 'User registered successfully!' });  // Return success message upon successful registration
  } catch (error) {
    res.status(500).json({ error: 'User registration failed', details: error }); // Return error message if registration fails
  }
});
//---------------------------------------------//


//---------- User Login Route ----------//
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;                                // Destructure the request body to extract email and password

    // Find the user by email
    const user = await User.findOne({ email });                          // Query the database for a user with the provided email
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' }); // Return error if user is not found
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);       // Compare the provided password with the stored hashed password
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' }); // Return error if passwords don't match
    }

    res.status(200).json({ message: 'Login successful!' });              // Return success message upon successful login
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error });     // Return error message if login fails
  }
});
//---------------------------------------//


//---------- Export Router ----------//
module.exports = router;                                                 // Export the router for use in other parts of the application
//----------------------------------//
