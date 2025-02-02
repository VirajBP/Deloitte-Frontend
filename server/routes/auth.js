const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Auth routes
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      userType
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      userType: user.userType,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Signin attempt for email:', email); // Debug log

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found'); // Debug log
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch'); // Debug log
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful for user type:', user.userType); // Debug log

    res.json({
      token,
      userType: user.userType,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Server error during signin:', error); // Debug log
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

module.exports = router;
