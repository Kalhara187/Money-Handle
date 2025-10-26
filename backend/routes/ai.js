const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const { securityLogger } = require('../middleware/logging');

const router = express.Router();

// All AI routes are protected
router.use(protect);

// Input sanitization middleware for AI requests
const sanitizeAIInput = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters')
    .matches(/^[^<>{}]*$/)
    .withMessage('Message contains invalid characters'),
  body('context')
    .optional()
    .isObject()
    .withMessage('Context must be an object'),
];

// Financial calculation endpoints
router.post('/calculate/budget', sanitizeAIInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      securityLogger('INVALID_AI_REQUEST', { errors: errors.array(), userId: req.user.id });
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array(),
      });
    }

    const { message, context } = req.body;

    // Extract numbers from message (income and expenses)
    const numbers = message.match(/[\d,]+\.?\d*/g)?.map(num => parseFloat(num.replace(/,/g, ''))) || [];

    if (numbers.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide income and at least one expense amount',
      });
    }

    const income = numbers[0];
    const expenses = numbers.slice(1);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp, 0);
    const remaining = income - totalExpenses;
    const savingsRate = ((remaining / income) * 100).toFixed(1);

    const result = {
      income,
      totalExpenses,
      remaining,
      savingsRate: parseFloat(savingsRate),
      recommendation: remaining > 0 ? 'Great! You have money left to save.' : 'Consider reducing expenses.',
      breakdown: expenses.map((exp, index) => ({
        category: `Expense ${index + 1}`,
        amount: exp,
      })),
    };

    res.status(200).json({
      success: true,
      data: {
        calculation: result,
        response: `💰 **Budget Analysis Results:**

**Monthly Income:** $${income.toLocaleString()}
**Total Expenses:** $${totalExpenses.toLocaleString()}
**Remaining Amount:** $${remaining.toLocaleString()}
**Savings Rate:** ${savingsRate}%

${result.recommendation}`,
      },
    });
  } catch (error) {
    console.error('Budget calculation error:', error);
    securityLogger('AI_CALCULATION_ERROR', { error: error.message, userId: req.user.id });
    res.status(500).json({
      success: false,
      message: 'Error calculating budget',
    });
  }
});

router.post('/calculate/savings-goal', sanitizeAIInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      securityLogger('INVALID_AI_REQUEST', { errors: errors.array(), userId: req.user.id });
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array(),
      });
    }

    const { message } = req.body;
    const numbers = message.match(/[\d,]+\.?\d*/g)?.map(num => parseFloat(num.replace(/,/g, ''))) || [];

    if (numbers.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Please provide target amount, current savings, and timeframe in months',
      });
    }

    const [targetAmount, currentSavings, timeframe] = numbers;
    const needed = targetAmount - currentSavings;
    const monthlyTarget = (needed / timeframe).toFixed(2);

    const result = {
      targetAmount,
      currentSavings,
      amountNeeded: needed,
      monthlyTarget: parseFloat(monthlyTarget),
      timeframe,
      progress: ((currentSavings / targetAmount) * 100).toFixed(1),
    };

    res.status(200).json({
      success: true,
      data: {
        calculation: result,
        response: `🎯 **Savings Goal Analysis:**

**Target Amount:** $${targetAmount.toLocaleString()}
**Current Savings:** $${currentSavings.toLocaleString()}
**Amount Needed:** $${needed.toLocaleString()}
**Monthly Target:** $${monthlyTarget}
**Timeframe:** ${timeframe} months
**Current Progress:** ${result.progress}%

💡 **Tip:** Consider automating this monthly amount to reach your goal faster!`,
      },
    });
  } catch (error) {
    console.error('Savings goal calculation error:', error);
    securityLogger('AI_CALCULATION_ERROR', { error: error.message, userId: req.user.id });
    res.status(500).json({
      success: false,
      message: 'Error calculating savings goal',
    });
  }
});

router.post('/calculate/loan', sanitizeAIInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      securityLogger('INVALID_AI_REQUEST', { errors: errors.array(), userId: req.user.id });
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array(),
      });
    }

    const { message } = req.body;
    const numbers = message.match(/[\d,]+\.?\d*/g)?.map(num => parseFloat(num.replace(/,/g, ''))) || [];

    if (numbers.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Please provide loan amount, interest rate (%), and years',
      });
    }

    const [principal, rate, years] = numbers;
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const result = {
      principal,
      rate,
      years,
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPaid: (monthlyPayment * numPayments).toFixed(2),
      totalInterest: ((monthlyPayment * numPayments) - principal).toFixed(2),
    };

    res.status(200).json({
      success: true,
      data: {
        calculation: result,
        response: `💳 **Loan Payment Analysis:**

**Loan Amount:** $${principal.toLocaleString()}
**Interest Rate:** ${rate}%
**Loan Term:** ${years} years
**Monthly Payment:** $${result.monthlyPayment}
**Total Amount Paid:** $${result.totalPaid}
**Total Interest:** $${result.totalInterest}

💡 **Tip:** Making extra payments can significantly reduce your total interest!`,
      },
    });
  } catch (error) {
    console.error('Loan calculation error:', error);
    securityLogger('AI_CALCULATION_ERROR', { error: error.message, userId: req.user.id });
    res.status(500).json({
      success: false,
      message: 'Error calculating loan payment',
    });
  }
});

// General AI chat endpoint
router.post('/chat', sanitizeAIInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      securityLogger('INVALID_AI_REQUEST', { errors: errors.array(), userId: req.user.id });
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array(),
      });
    }

    const { message, context } = req.body;

    // Simple response logic (can be enhanced with actual AI integration)
    let response = '';

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      response = "✨ Hello! I'm your AI financial assistant. How can I help you with your money management today?";
    } else if (message.toLowerCase().includes('budget')) {
      response = "💰 I'd love to help you with budgeting! Tell me your monthly income and main expenses, and I'll analyze your financial situation.";
    } else if (message.toLowerCase().includes('save') || message.toLowerCase().includes('saving')) {
      response = "🎯 Smart saving is key to financial freedom! What savings goal would you like to work on?";
    } else if (message.toLowerCase().includes('invest')) {
      response = "📈 Investing can grow your wealth over time! What type of investment are you interested in learning about?";
    } else if (message.toLowerCase().includes('debt')) {
      response = "💳 Managing debt effectively is important. What kind of debt are you dealing with?";
    } else {
      response = "💡 I'm here to help with all your financial questions! Try asking about budgeting, saving, investing, or debt management.";
    }

    res.status(200).json({
      success: true,
      data: {
        response,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('AI chat error:', error);
    securityLogger('AI_CHAT_ERROR', { error: error.message, userId: req.user.id });
    res.status(500).json({
      success: false,
      message: 'Error processing chat message',
    });
  }
});

// Get AI conversation history (placeholder for future implementation)
router.get('/history', async (req, res) => {
  try {
    // In a real implementation, this would fetch from database
    res.status(200).json({
      success: true,
      data: {
        history: [],
        message: 'Conversation history feature coming soon!',
      },
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching conversation history',
    });
  }
});

module.exports = router;
