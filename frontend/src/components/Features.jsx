import React from 'react';
import { 
  PieChart, 
  Target, 
  CreditCard, 
  TrendingUp, 
  Bell, 
  BarChart3
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: PieChart,
      title: "Expense Tracking",
      description: "Automatically categorize and track all your expenses with smart AI-powered insights.",
      color: "text-blue-600"
    },
    {
      icon: Target,
      title: "Budget Planning",
      description: "Set realistic budgets and get alerts when you're approaching your limits.",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Investment Tracking",
      description: "Monitor your investment portfolio and track performance across multiple accounts.",
      color: "text-purple-600"
    },
    {
      icon: CreditCard,
      title: "Bill Management",
      description: "Never miss a payment with automated bill tracking and payment reminders.",
      color: "text-red-600"
    },
    {
      icon: BarChart3,
      title: "Financial Reports",
      description: "Get detailed insights with customizable reports and spending analytics.",
      color: "text-indigo-600"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Receive intelligent notifications about unusual spending and opportunities to save.",
      color: "text-yellow-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
            ✨ Powerful Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Money
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of financial tools helps you take control of your money,
            plan for the future, and achieve your financial goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Financial Life?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of users who have already taken control of their finances.
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;