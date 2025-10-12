const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Get User Profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
    });
  }
});

// Update User Profile
router.patch('/profile', [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const allowedFields = ['firstName', 'lastName', 'phone', 'dateOfBirth', 'profilePicture'];
    const updates = {};
    
    // Only include allowed fields in updates
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user profile',
    });
  }
});

// Update User Preferences
router.patch('/preferences', [
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'])
    .withMessage('Invalid currency'),
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Theme must be light, dark, or auto'),
  body('notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notification preference must be boolean'),
  body('notifications.push')
    .optional()
    .isBoolean()
    .withMessage('Push notification preference must be boolean'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { currency, theme, notifications } = req.body;
    const updates = {};

    if (currency) updates['preferences.currency'] = currency;
    if (theme) updates['preferences.theme'] = theme;
    if (notifications?.email !== undefined) updates['preferences.notifications.email'] = notifications.email;
    if (notifications?.push !== undefined) updates['preferences.notifications.push'] = notifications.push;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user preferences',
    });
  }
});

// Add Financial Goal
router.post('/financial-goals', [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Goal name is required and must be less than 100 characters'),
  body('targetAmount')
    .isNumeric()
    .withMessage('Target amount must be a number')
    .custom(value => value > 0)
    .withMessage('Target amount must be greater than 0'),
  body('targetDate')
    .isISO8601()
    .withMessage('Please provide a valid target date'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category must be less than 50 characters'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, targetAmount, targetDate, category, currentAmount } = req.body;

    const newGoal = {
      name,
      targetAmount,
      currentAmount: currentAmount || 0,
      targetDate: new Date(targetDate),
      category: category || 'General',
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { financialGoals: newGoal } },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.status(201).json({
      success: true,
      data: {
        user,
        goal: user.financialGoals[user.financialGoals.length - 1],
      },
    });
  } catch (error) {
    console.error('Add financial goal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding financial goal',
    });
  }
});

// Update Financial Goal
router.patch('/financial-goals/:goalId', [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Goal name must be less than 100 characters'),
  body('targetAmount')
    .optional()
    .isNumeric()
    .withMessage('Target amount must be a number')
    .custom(value => value > 0)
    .withMessage('Target amount must be greater than 0'),
  body('currentAmount')
    .optional()
    .isNumeric()
    .withMessage('Current amount must be a number')
    .custom(value => value >= 0)
    .withMessage('Current amount must be non-negative'),
  body('targetDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid target date'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category must be less than 50 characters'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { goalId } = req.params;
    const updates = {};

    // Build update object
    Object.keys(req.body).forEach(key => {
      if (['name', 'targetAmount', 'currentAmount', 'targetDate', 'category'].includes(key)) {
        updates[`financialGoals.$.${key}`] = key === 'targetDate' ? new Date(req.body[key]) : req.body[key];
      }
    });

    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'financialGoals._id': goalId },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Financial goal not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Update financial goal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating financial goal',
    });
  }
});

// Delete Financial Goal
router.delete('/financial-goals/:goalId', async (req, res) => {
  try {
    const { goalId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { financialGoals: { _id: goalId } } },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Delete financial goal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting financial goal',
    });
  }
});

// Get User Statistics
router.get('/stats', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    const stats = {
      totalGoals: user.financialGoals.length,
      completedGoals: user.financialGoals.filter(goal => 
        goal.currentAmount >= goal.targetAmount
      ).length,
      totalTargetAmount: user.financialGoals.reduce((sum, goal) => sum + goal.targetAmount, 0),
      totalCurrentAmount: user.financialGoals.reduce((sum, goal) => sum + goal.currentAmount, 0),
      subscriptionDaysRemaining: user.subscriptionEndDate ? 
        Math.max(0, Math.ceil((new Date(user.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24))) : 0,
    };

    res.status(200).json({
      success: true,
      data: {
        stats,
        user: {
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionEndDate: user.subscriptionEndDate,
        },
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
    });
  }
});

module.exports = router;