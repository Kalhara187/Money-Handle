import React from 'react';
import { CheckCircle, Shield, TrendingUp, Users, Smartphone, BarChart3, Bell, CreditCard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Get detailed insights into your spending patterns with AI-powered analytics and personalized recommendations.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption and multi-factor authentication to keep your financial data completely secure.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Never miss a bill payment or unusual spending with intelligent notifications and reminders.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: CreditCard,
      title: 'Account Linking',
      description: 'Connect all your bank accounts, credit cards, and investment accounts in one secure platform.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: TrendingUp,
      title: 'Goal Tracking',
      description: 'Set and track financial goals with visual progress indicators and milestone celebrations.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Access your finances anywhere with our responsive web app and dedicated mobile applications.',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const benefits = [
    'Real-time transaction tracking',
    'Automated categorization',
    'Custom budget creation',
    'Investment portfolio monitoring',
    'Bill payment reminders',
    'Spending trend analysis',
    'Family account sharing',
    'Export financial reports'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Powerful Features for Modern Finance</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Discover all the tools you need to take complete control of your financial life. 
              From smart analytics to secure account linking, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of features is designed to simplify your financial management 
              and help you make better money decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Money Handle?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We've built the most comprehensive personal finance platform that grows with your needs. 
                Whether you're just starting out or managing complex finances, we have the tools you need.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Monthly Overview</h3>
                    <span className="text-sm text-green-600 font-medium">+12.5%</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Income</span>
                      <span className="font-semibold">$5,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expenses</span>
                      <span className="font-semibold">$3,800</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-900 font-semibold">Savings</span>
                      <span className="font-semibold text-green-600">$1,400</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who are already transforming their financial lives with Money Handle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-started"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </a>
            <a
              href="/signin"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;