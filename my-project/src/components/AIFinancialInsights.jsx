import React, { useState } from 'react';
import { Brain, Lightbulb, TrendingUp, DollarSign, PieChart, Target } from 'lucide-react';

const AIFinancialInsights = () => {
  const [activeInsight, setActiveInsight] = useState(0);
  
  const insights = [
    {
      icon: TrendingUp,
      title: "Smart Spending Analysis",
      description: "AI-powered insights into your spending patterns and recommendations for optimization",
      color: "bg-blue-500",
      features: [
        "Automatic expense categorization",
        "Spending trend predictions",
        "Personalized budget recommendations",
        "Unusual transaction alerts"
      ]
    },
    {
      icon: Target,
      title: "Goal Achievement Predictor",
      description: "AI calculates the best path to reach your financial goals based on your current habits",
      color: "bg-green-500",
      features: [
        "Goal timeline predictions",
        "Savings rate optimization",
        "Investment strategy suggestions",
        "Risk assessment analysis"
      ]
    },
    {
      icon: PieChart,
      title: "Investment Advisor",
      description: "Personalized investment recommendations based on your risk profile and goals",
      color: "bg-purple-500",
      features: [
        "Portfolio diversification analysis",
        "Risk tolerance assessment",
        "Market trend insights",
        "Rebalancing recommendations"
      ]
    },
    {
      icon: Lightbulb,
      title: "Smart Savings Tips",
      description: "AI identifies opportunities to save money based on your spending behavior",
      color: "bg-yellow-500",
      features: [
        "Subscription optimization",
        "Cashback opportunities",
        "Bill negotiation suggestions",
        "Energy saving tips"
      ]
    }
  ];

  const stats = [
    { number: "95%", label: "Prediction Accuracy", description: "for spending forecasts" },
    { number: "2.3x", label: "Faster Goal Achievement", description: "with AI guidance" },
    { number: "$580", label: "Average Monthly Savings", description: "found by our AI" },
    { number: "24/7", label: "Always Available", description: "AI assistant support" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Financial Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced AI assistant analyzes your financial data to provide personalized insights, 
            predictions, and recommendations to optimize your financial health.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* AI Features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Feature Tabs */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Intelligent Financial Features</h3>
            <div className="space-y-4">
              {insights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                      activeInsight === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setActiveInsight(index)}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 ${insight.color} rounded-lg flex items-center justify-center mr-4`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">{insight.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{insight.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feature Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 ${insights[activeInsight].color} rounded-lg flex items-center justify-center mr-4`}>
                {React.createElement(insights[activeInsight].icon, { className: "h-6 w-6 text-white" })}
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{insights[activeInsight].title}</h4>
            </div>
            
            <p className="text-gray-600 mb-6">{insights[activeInsight].description}</p>
            
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-900 mb-4">Key Features:</h5>
              {insights[activeInsight].features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Try This Feature
              </button>
            </div>
          </div>
        </div>

        {/* AI Demo Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Experience AI-Powered Finance</h3>
              <p className="text-blue-100 mb-6">
                See how our AI assistant can transform your financial management. Get instant insights, 
                personalized recommendations, and predictive analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                  Start Free Trial
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </div>
            
            {/* AI Chat Preview */}
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Brain className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <p className="text-sm text-blue-100">
                  "Based on your spending patterns, I notice you could save $120/month by optimizing your subscriptions and switching to a better phone plan. Would you like me to show you the details?"
                </p>
              </div>
              <div className="text-right">
                <div className="bg-blue-500 rounded-lg p-3 inline-block">
                  <p className="text-sm">Yes, show me how!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFinancialInsights;