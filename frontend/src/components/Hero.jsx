import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Smartphone, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Take Control of Your
              <span className="gradient-text block">Financial Future</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Track expenses, manage budgets, and achieve your financial goals with our intuitive 
              personal finance management platform. Start building wealth today.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/get-started" className="btn-primary flex items-center justify-center group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Bank-level security
              </div>
              <div className="flex items-center">
                <Smartphone className="h-4 w-4 mr-1" />
                Mobile & Web
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Real-time insights
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                Global access
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="animate-slide-up">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
                  <span className="text-sm text-gray-500">This Month</span>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="stat-card">
                    <p className="text-sm text-primary-600 font-medium">Total Balance</p>
                    <p className="text-2xl font-bold text-gray-900">$12,450</p>
                    <p className="text-xs text-green-600">+5.2% from last month</p>
                  </div>
                  <div className="stat-card">
                    <p className="text-sm text-primary-600 font-medium">Monthly Spending</p>
                    <p className="text-2xl font-bold text-gray-900">$3,280</p>
                    <p className="text-xs text-red-500">+2.1% from last month</p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Monthly Budget</span>
                      <span className="text-gray-900">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Savings Goal</span>
                      <span className="text-gray-900">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-primary-600 text-white p-4 rounded-xl shadow-lg animate-bounce-slow">
                <p className="text-sm font-medium">Recent Transaction</p>
                <p className="text-lg font-bold">-$45.99</p>
                <p className="text-xs opacity-90">Grocery Store</p>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-4 rounded-xl shadow-lg">
                <p className="text-sm font-medium">Income This Month</p>
                <p className="text-lg font-bold">+$4,200</p>
                <p className="text-xs opacity-90">Salary & Freelance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;