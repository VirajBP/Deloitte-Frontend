const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Auth routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/profile', auth, authController.getProfile);

module.exports = router;
