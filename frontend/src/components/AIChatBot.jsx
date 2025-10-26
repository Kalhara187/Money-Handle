import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, RefreshCw, Calculator, Calendar, CreditCard, PieChart, Target, Bell, Sparkles, Zap, DollarSign, TrendingUp } from 'lucide-react';
import { aiAPI } from '../services/ai.js';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "✨ Welcome to MoneyBot! ✨\n\nI'm your intelligent financial companion, ready to transform how you manage money! 🚀\n\n🌟 What I can do for you:\n💰 Smart Budget Analysis\n📈 Investment Calculations  \n🎯 Savings Goal Planning\n💳 Loan & Payment Calculator\n� Financial Reminders\n� Expense Insights\n\nLet's make your financial dreams a reality! What would you like to explore first?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState({
    name: '',
    currentTask: null,
    pendingData: {}
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      "✨ Hey there! I'm your smart financial companion ready to unlock your money potential! What amazing goal shall we work on today? 🌟",
      "🚀 Hello! Your personal finance wizard is here! I can crunch numbers, plan budgets, and make your financial dreams come true! What's your mission? �",
      "🎉 Welcome to the future of finance! I'm MoneyBot, your AI-powered wealth builder. Let's create some financial magic together! ✨"
    ],
    budget: [
      "🎯 Fantastic choice! Smart budgeting is your pathway to financial freedom! Let me analyze your numbers and create a personalized strategy 📊✨",
      "💪 Budgeting mastery incoming! I'll transform your income and expenses into a powerful financial roadmap. Let's build wealth together! 🚀"
    ],
    savings: [
      "🌟 Excellent! Saving money is like planting seeds for your future wealth! � Tell me your target amount and timeline, and I'll craft the perfect savings strategy! 💎",
      "💫 Smart saver alert! I'll calculate the optimal monthly savings plan to reach your goals faster than you thought possible! ⚡"
    ],
    investment: [
      "📈 Investment genius mode activated! I'll help you calculate potential returns and design a winning portfolio strategy! Let's grow your wealth exponentially! 🚀�",
      "🎲 Ready to multiply your money? I'll analyze investment opportunities and show you the path to financial abundance! ✨📊"
    ],
    debt: [
      "I'll help you create a debt payoff plan with calculations! 💳",
      "Let me calculate the best debt repayment strategy for you. 💪"
    ],
    calculator: [
      "I can perform financial calculations for you! What would you like to calculate?",
      "Let me help you with some quick financial math. What numbers should I work with?"
    ],
    reminder: [
      "I can set up bill reminders and financial alerts for you! �",
      "Let me help you organize your financial schedule and reminders."
    ],
    account: [
      "I can help you manage your accounts and track balances! 💼",
      "Let me assist you with account management and organization."
    ]
  };

  // System task handlers
  const systemTasks = {
    calculateBudget: (income, expenses) => {
      const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
      const remaining = parseFloat(income) - totalExpenses;
      const savingsRate = (remaining / parseFloat(income)) * 100;
      
      return {
        income: parseFloat(income),
        totalExpenses,
        remaining,
        savingsRate: savingsRate.toFixed(1),
        recommendation: remaining > 0 ? 'Great! You have money left to save.' : 'You may need to reduce expenses.'
      };
    },
    
    calculateSavingsGoal: (targetAmount, currentSavings, timeframe) => {
      const needed = parseFloat(targetAmount) - parseFloat(currentSavings);
      const monthlyNeeded = needed / parseInt(timeframe);
      
      return {
        targetAmount: parseFloat(targetAmount),
        currentSavings: parseFloat(currentSavings),
        amountNeeded: needed,
        monthlyTarget: monthlyNeeded.toFixed(2),
        timeframe: parseInt(timeframe)
      };
    },
    
    calculateLoanPayment: (principal, rate, years) => {
      const monthlyRate = parseFloat(rate) / 100 / 12;
      const numPayments = parseInt(years) * 12;
      const monthlyPayment = (parseFloat(principal) * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      return {
        principal: parseFloat(principal),
        rate: parseFloat(rate),
        years: parseInt(years),
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPaid: (monthlyPayment * numPayments).toFixed(2),
        totalInterest: (monthlyPayment * numPayments - parseFloat(principal)).toFixed(2)
      };
    },
    
    setReminder: (type, amount, date, description) => {
      const reminder = {
        id: Date.now(),
        type,
        amount: parseFloat(amount),
        date: new Date(date),
        description,
        status: 'active'
      };
      
      // In a real app, this would save to a database
      localStorage.setItem(`reminder_${reminder.id}`, JSON.stringify(reminder));
      
      return reminder;
    },
    
    createExpenseCategory: (category, budget, period) => {
      const categoryData = {
        name: category,
        budget: parseFloat(budget),
        period,
        spent: 0,
        remaining: parseFloat(budget)
      };
      
      return categoryData;
    }
  };

  const quickReplies = [
    { text: "💰 Calculate Budget", icon: Calculator, gradient: "from-green-400 to-emerald-500" },
    { text: "🎯 Set Savings Goal", icon: Target, gradient: "from-blue-400 to-indigo-500" }, 
    { text: "💳 Loan Calculator", icon: CreditCard, gradient: "from-purple-400 to-pink-500" },
    { text: "🔔 Set Reminder", icon: Bell, gradient: "from-orange-400 to-red-500" },
    { text: "📊 Track Expenses", icon: PieChart, gradient: "from-teal-400 to-cyan-500" },
    { text: "💡 Financial Tips", icon: Sparkles, gradient: "from-yellow-400 to-amber-500" }
  ];

  const parseUserInput = (message) => {
    // Extract numbers from message
    const numbers = message.match(/[\d,]+\.?\d*/g)?.map(num => parseFloat(num.replace(/,/g, ''))) || [];
    
    // Extract dates
    const datePattern = /(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})|(\d{4}[-\/]\d{1,2}[-\/]\d{1,2})/g;
    const dates = message.match(datePattern) || [];
    
    // Extract percentages
    const percentages = message.match(/\d+\.?\d*%/g)?.map(p => parseFloat(p.replace('%', ''))) || [];
    
    return { numbers, dates, percentages };
  };

  const handleSystemTask = (taskType, userMessage, data) => {
    switch (taskType) {
      case 'budget_calculation':
        if (data.numbers.length >= 2) {
          const income = data.numbers[0];
          const expenses = data.numbers.slice(1).map((amount, index) => ({ 
            category: `Expense ${index + 1}`, 
            amount 
          }));
          const result = systemTasks.calculateBudget(income, expenses);
          
          return `💰 **Budget Calculation Results:**
          
**Monthly Income:** $${result.income.toLocaleString()}
**Total Expenses:** $${result.totalExpenses.toLocaleString()}
**Remaining Amount:** $${result.remaining.toLocaleString()}
**Savings Rate:** ${result.savingsRate}%

${result.recommendation}

Would you like me to help you optimize this budget or set up expense categories?`;
        }
        return "To calculate your budget, please provide your monthly income and your main expenses. For example: 'My income is $5000, expenses are $1200 rent, $500 food, $300 utilities'";

      case 'savings_goal':
        if (data.numbers.length >= 3) {
          const result = systemTasks.calculateSavingsGoal(data.numbers[0], data.numbers[1], data.numbers[2]);
          
          return `🎯 **Savings Goal Analysis:**
          
**Target Amount:** $${result.targetAmount.toLocaleString()}
**Current Savings:** $${result.currentSavings.toLocaleString()}
**Amount Needed:** $${result.amountNeeded.toLocaleString()}
**Monthly Target:** $${result.monthlyTarget}
**Timeframe:** ${result.timeframe} months

💡 **Tip:** Consider automating this monthly amount to reach your goal!

Would you like me to set up a reminder for your monthly savings target?`;
        }
        return "To calculate your savings plan, tell me: target amount, current savings, and timeframe in months. For example: 'I want to save $10000, I have $2000, in 24 months'";

      case 'loan_calculation':
        if (data.numbers.length >= 3) {
          const result = systemTasks.calculateLoanPayment(data.numbers[0], data.numbers[1], data.numbers[2]);
          
          return `💳 **Loan Payment Analysis:**
          
**Loan Amount:** $${result.principal.toLocaleString()}
**Interest Rate:** ${result.rate}%
**Loan Term:** ${result.years} years
**Monthly Payment:** $${result.monthlyPayment}
**Total Amount Paid:** $${result.totalPaid}
**Total Interest:** $${result.totalInterest}

Would you like me to show you how extra payments could reduce your total interest?`;
        }
        return "For loan calculations, provide: loan amount, interest rate (%), and years. For example: 'Loan of $200000 at 4.5% for 30 years'";

      case 'set_reminder':
        if (data.numbers.length >= 1 && data.dates.length >= 1) {
          const reminder = systemTasks.setReminder('bill', data.numbers[0], data.dates[0], userMessage);
          
          return `🔔 **Reminder Set Successfully!**
          
**Type:** Bill Payment
**Amount:** $${reminder.amount}
**Date:** ${reminder.date.toLocaleDateString()}
**Description:** ${reminder.description}

I'll help you stay on top of this payment! Would you like to set up more reminders?`;
        }
        return "To set a reminder, include amount and date. For example: 'Remind me to pay $150 rent on 2025-11-01' or 'Set reminder for $50 utilities on 10/25/2025'";

      default:
        return "I can help you with budget calculations, savings goals, loan payments, and setting reminders. What would you like me to help you with?";
    }
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    const data = parseUserInput(userMessage);
    
    // Handle system tasks
    if (message.includes('calculate') || message.includes('budget') && (data.numbers.length > 0)) {
      return handleSystemTask('budget_calculation', userMessage, data);
    } else if ((message.includes('save') || message.includes('saving') || message.includes('goal')) && data.numbers.length >= 2) {
      return handleSystemTask('savings_goal', userMessage, data);
    } else if ((message.includes('loan') || message.includes('mortgage') || message.includes('payment')) && data.numbers.length >= 3) {
      return handleSystemTask('loan_calculation', userMessage, data);
    } else if (message.includes('remind') || (message.includes('set') && (data.numbers.length > 0 || data.dates.length > 0))) {
      return handleSystemTask('set_reminder', userMessage, data);
    }
    
    // Regular conversation responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return predefinedResponses.greeting[Math.floor(Math.random() * predefinedResponses.greeting.length)];
    } else if (message.includes('budget')) {
      return predefinedResponses.budget[Math.floor(Math.random() * predefinedResponses.budget.length)];
    } else if (message.includes('save') || message.includes('saving')) {
      return predefinedResponses.savings[Math.floor(Math.random() * predefinedResponses.savings.length)];
    } else if (message.includes('invest') || message.includes('investment')) {
      return predefinedResponses.investment[Math.floor(Math.random() * predefinedResponses.investment.length)];
    } else if (message.includes('debt') || message.includes('loan')) {
      return predefinedResponses.debt[Math.floor(Math.random() * predefinedResponses.debt.length)];
    } else if (message.includes('calculate') || message.includes('math')) {
      return predefinedResponses.calculator[Math.floor(Math.random() * predefinedResponses.calculator.length)];
    } else if (message.includes('reminder') || message.includes('alert')) {
      return predefinedResponses.reminder[Math.floor(Math.random() * predefinedResponses.reminder.length)];
    } else if (message.includes('account') || message.includes('balance')) {
      return predefinedResponses.account[Math.floor(Math.random() * predefinedResponses.account.length)];
    } else if (message === 'menu') {
      return `🔧 **System Tasks I Can Perform:**

📊 **Budget Calculator** - "Calculate budget: income $5000, rent $1200, food $500"
🎯 **Savings Planner** - "Save $10000, have $2000, in 24 months"  
� **Loan Calculator** - "Loan $200000 at 4.5% for 30 years"
� **Set Reminders** - "Remind me $150 rent on 2025-11-01"
📈 **Expense Tracking** - "Track expenses for groceries"
� **Financial Analysis** - Get personalized advice

Just describe what you want to do and I'll help you complete the task!`;
    } else if (message.includes('thank')) {
      return "You're welcome! 😊 Is there any other financial task I can help you with?";
    } else {
      return `I can help you perform these financial tasks:

💰 **Calculate budgets** with income and expenses
🎯 **Plan savings goals** with target amounts and timelines  
💳 **Calculate loan payments** with rates and terms
🔔 **Set bill reminders** with amounts and dates
📊 **Track expenses** by category
📈 **Analyze spending** patterns

Try saying something like "Calculate my budget" or "Set a reminder" and I'll walk you through it! What would you like to do?`;
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Try to use backend API first
      const response = await aiAPI.sendMessage({ message: inputMessage });
      const botResponse = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('AI API error:', error);
      // Fallback to local response
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "✨ Welcome back to MoneyBot! ✨\n\nI'm your intelligent financial companion, ready to transform how you manage money! 🚀\n\n🌟 What I can do for you:\n💰 Smart Budget Analysis\n📈 Investment Calculations  \n🎯 Savings Goal Planning\n💳 Loan & Payment Calculator\n� Financial Reminders\n� Expense Insights\n\nLet's make your financial dreams a reality! What would you like to explore first?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setUserContext({ name: '', currentTask: null, pendingData: {} });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-10 right-12 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 active:scale-95 group relative overflow-hidden"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur opacity-75 animate-pulse"></div>
          
          {/* Main icon with animation */}
          <div className="relative z-10">
            <MessageCircle className="h-6 w-6 animate-bounce" />
          </div>
          
          {/* Sparkle animation */}
          <div className="absolute top-1 right-1">
            <Sparkles className="h-3 w-3 text-yellow-300 animate-pulse" />
          </div>
          
          {/* Notification pulse with gradient */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce">
            <div className="w-full h-full bg-white rounded-full animate-ping opacity-75"></div>
          </div>
          
          {/* Enhanced tooltip */}
          <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg transform group-hover:scale-105">
            <div className="flex items-center space-x-2">
              <Zap className="h-3 w-3 text-yellow-400" />
              <span>Chat with MoneyBot AI ✨</span>
            </div>
            <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-100 backdrop-blur-lg transition-all duration-500 ease-out transform ${
        isMinimized 
          ? 'w-96 h-72 translate-x-0 scale-100' 
          : 'w-96 h-2/3 translate-x-0 scale-100'
      }`}>
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-900/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"></div>
          <div className="flex items-center relative z-10">
            <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm border border-white/10 shadow-lg">
              <Bot className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center">
                MoneyBot 
                <Sparkles className="h-4 w-4 ml-1 text-yellow-300 animate-spin" />
              </h3>
              <p className="text-xs text-white/80 flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                AI Financial Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 relative z-10">
            <button
              onClick={clearChat}
              title="Clear chat"
              className="hover:bg-white/20 p-2 rounded-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/10"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Expand" : "Minimize"}
              className="hover:bg-white/20 p-2 rounded-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/10"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              title="Close chat"
              className="hover:bg-red-400/20 p-2 rounded-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages with gradient background */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-white relative">
              {/* Decorative background elements */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary-100/20 to-transparent rounded-full blur-xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-xl"></div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex relative z-10 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} transform transition-all duration-300 hover:scale-105`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border border-gray-300'
                    }`}>
                      {message.sender === 'user' ? 
                        <User className="h-4 w-4" /> : 
                        <Bot className="h-4 w-4" />
                      }
                    </div>
                    <div className={`p-3 rounded-2xl text-sm shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white border border-primary-500/20'
                        : 'bg-gradient-to-br from-white to-gray-50 text-gray-800 border border-gray-200'
                    }`}>
                      <div className="whitespace-pre-line leading-relaxed">{message.text}</div>
                      <p className={`text-xs mt-2 flex items-center ${
                        message.sender === 'user' ? 'text-primary-100' : 'text-gray-400'
                      }`}>
                        <span className="mr-1">⏰</span>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-lg border border-gray-300">
                      <Bot className="h-4 w-4 text-gray-700 animate-pulse" />
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 p-3 rounded-2xl shadow-lg border border-gray-200">
                      <div className="flex space-x-1 items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        <span className="text-xs text-gray-500 ml-2">AI thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 bg-gradient-to-r from-gray-50 to-white">
                <p className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {quickReplies.map((reply, index) => {
                    const IconComponent = reply.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.text)}
                        className={`group relative overflow-hidden text-sm bg-gradient-to-br ${reply.gradient} hover:shadow-lg text-white px-3 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="font-medium text-xs">{reply.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Enhanced Input Area */}
            <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-white to-gray-50">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about budgeting, saving, investing... ✨"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                    maxLength={200}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ''}
                  title="Send message"
                  className="bg-gradient-to-br from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-sm"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-gray-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Powered by AI
                </div>
                <div className="text-xs text-gray-400">
                  {inputMessage.length}/200
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatBot;