import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, RefreshCw, Calculator, Calendar, CreditCard, PieChart, Target, Bell } from 'lucide-react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm MoneyBot, your personal finance assistant. I can help you with:\n\n💰 Budget calculations\n📊 Expense tracking\n🎯 Goal setting\n📅 Bill reminders\n💳 Account management\n\nWhat would you like to do today?",
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
      "Hi! I'm here to help you with your finances. What would you like to do? 😊",
      "Hello! I can help you with budgeting, calculations, and financial planning. What's on your mind? 💭",
      "Welcome to Money Handle! I'm your AI assistant ready to help with financial tasks. 🚀"
    ],
    budget: [
      "Great! I can help you create a budget. Let me calculate this for you. 📊",
      "Budgeting is key to financial success! 💪 Let me help you set up a personalized budget plan."
    ],
    savings: [
      "I'll help you calculate your savings goals! 🎯 What amount are you trying to save and by when?",
      "Let me help you create a savings plan with automatic calculations. 💡"
    ],
    investment: [
      "I can help calculate investment returns and create a portfolio plan! 📈",
      "Let me assist you with investment calculations and tracking. 🎲"
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
    "💰 Calculate Budget",
    "🎯 Set Savings Goal", 
    "💳 Loan Calculator",
    "🔔 Set Reminder",
    "📊 Track Expenses",
    "💡 Financial Tips"
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

  const handleSendMessage = () => {
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

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
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
        text: "Hi! I'm MoneyBot, your personal finance assistant. I can help you with:\n\n💰 Budget calculations\n📊 Expense tracking\n🎯 Goal setting\n📅 Bill reminders\n💳 Account management\n\nWhat would you like to do today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setUserContext({ name: '', currentTask: null, pendingData: {} });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative"
        >
          <MessageCircle className="h-6 w-6" />
          {/* Notification pulse */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with MoneyBot 💬
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">MoneyBot</h3>
              <p className="text-xs text-primary-100">Financial Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              title="Clear chat"
              className="hover:bg-primary-500 p-1 rounded transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Expand" : "Minimize"}
              className="hover:bg-primary-500 p-1 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              title="Close chat"
              className="hover:bg-primary-500 p-1 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.sender === 'user' ? 
                        <User className="h-3 w-3" /> : 
                        <Bot className="h-3 w-3" />
                      }
                    </div>
                    <div className={`p-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-line">{message.text}</div>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-1">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-700 px-2 py-2 rounded transition-colors border hover:border-primary-200 flex items-center justify-center"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about budgeting, saving, investing..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  maxLength={200}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ''}
                  title="Send message"
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1 text-xs text-gray-400 text-right">
                {inputMessage.length}/200
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatBot;