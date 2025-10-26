const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { createSendToken, protect } = require('../middleware/auth');
const { securityLogger } = require('../middleware/logging');

const router = express.Router();

// Validation middleware
const signupValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
];

const signinValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),
];

// Sign Up Route
router.post('/signup', signupValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, password, phone, dateOfBirth, plan } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Set subscription end date based on plan (trial period)
    let subscriptionEndDate = new Date();
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 14); // 14-day trial

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      plan: plan || 'basic',
      subscriptionEndDate,
    });

    // Generate and send token
    createSendToken(newUser, 201, res);
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating user account',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
});

// Sign In Route
router.post('/signin', signinValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Authenticate user
    const authResult = await User.getAuthenticated(email, password);

    if (!authResult.success) {
      // Log failed login attempts for security monitoring
      securityLogger('FAILED_LOGIN_ATTEMPT', {
        email,
        reason: authResult.reason,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
      });

      return res.status(401).json({
        success: false,
        message: authResult.reason === 'User not found' ? 'Invalid credentials' : authResult.reason,
      });
    }

    // Generate and send token
    createSendToken(authResult.user, 200, res);
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error signing in',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
});

// Get Current User Route
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
    });
  }
});

// Update Password Route
router.patch('/updatePassword', protect, [
  body('currentPassword')
    .isLength({ min: 1 })
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check if current password is correct
    const isCurrentPasswordValid = await user.correctPassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Generate and send new token
    createSendToken(user, 200, res);
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating password',
    });
  }
});

// Logout Route (client-side mainly, but we can track it)
router.post('/logout', protect, async (req, res) => {
  try {
    // In a more complex app, you might want to blacklist the token
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging out',
    });
  }
});

// Check Email Availability Route
router.post('/check-email', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    res.status(200).json({
      success: true,
      available: !existingUser,
      message: existingUser ? 'Email is already taken' : 'Email is available',
    });
  } catch (error) {
    console.error('Check email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking email availability',
    });
  }
});

module.exports = router;