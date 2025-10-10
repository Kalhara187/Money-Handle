import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm MoneyBot, your personal finance assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      "Hi! I'm here to help you with your finances. What would you like to know?",
      "Hello! I can help you with budgeting, saving, and financial planning. What's on your mind?",
      "Welcome to Money Handle! I'm your AI assistant. How can I assist you today?"
    ],
    budget: [
      "Great question about budgeting! I recommend the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Would you like me to help you create a personalized budget?",
      "Budgeting is key to financial success! Start by tracking your income and expenses. Our app can automatically categorize your spending. Want to learn more about our budgeting features?"
    ],
    savings: [
      "Saving money is a smart goal! I suggest starting with an emergency fund of 3-6 months of expenses. Then focus on specific goals like retirement or a house down payment. What's your savings goal?",
      "Here are some savings tips: Automate your savings, cut unnecessary subscriptions, and use our goal tracking feature. Want me to show you how to set up automatic savings?"
    ],
    investment: [
      "Investing is a great way to grow your wealth! For beginners, I recommend starting with low-cost index funds or ETFs. Always invest money you won't need for at least 5 years. Want to learn about our investment tracking features?",
      "Investment strategy depends on your goals and risk tolerance. Our app can help you track your portfolio performance. Are you interested in learning about different investment options?"
    ],
    debt: [
      "Managing debt is crucial for financial health. I recommend the debt avalanche method: pay minimums on all debts, then extra on the highest interest rate debt. Our debt tracker can help you visualize your progress!",
      "Debt can feel overwhelming, but you can tackle it! Consider the debt snowball method if you need motivation. Want me to explain different debt payoff strategies?"
    ],
    features: [
      "Money Handle offers many features: expense tracking, budget creation, goal setting, bill reminders, and investment monitoring. Which feature interests you most?",
      "Our app includes: automatic transaction categorization, spending insights, financial goal tracking, and secure bank connections. Want a demo of any specific feature?"
    ],
    help: [
      "I'm here to help! I can answer questions about budgeting, saving, investing, debt management, and our app features. You can also type 'menu' to see quick options.",
      "No problem! I can assist with financial planning, explain our features, or help you get started. What would you like to learn about?"
    ]
  };

  const quickReplies = [
    "How to budget?",
    "Saving tips",
    "Investment advice",
    "App features",
    "Debt management"
  ];

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
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
    } else if (message.includes('feature') || message.includes('what can') || message.includes('demo')) {
      return predefinedResponses.features[Math.floor(Math.random() * predefinedResponses.features.length)];
    } else if (message.includes('help') || message.includes('support')) {
      return predefinedResponses.help[Math.floor(Math.random() * predefinedResponses.help.length)];
    } else if (message === 'menu') {
      return "Here are some topics I can help with:\n• Budgeting and expense tracking\n• Saving strategies\n• Investment basics\n• Debt management\n• App features and demos\n\nJust ask me about any of these topics!";
    } else {
      return "That's an interesting question! While I'm focused on personal finance topics, I'd be happy to help you with budgeting, saving, investing, or explain our app features. You can also contact our support team for more specific assistance.";
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
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
        id: messages.length + 2,
        text: getResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
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
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-primary-500 p-1 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
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
                      <p className="whitespace-pre-line">{message.text}</p>
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
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
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
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ''}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatBot;