import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Smartphone, Star, Users, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2 fill-current" />
              #1 Personal Finance App
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Take Control of Your
              <span className="gradient-text block animate-pulse">Financial Future</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Track expenses, manage budgets, and achieve your financial goals with our intuitive
              personal finance management platform. Start building wealth today.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-semibold text-gray-900">50K+ Users</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-semibold text-gray-900">4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-semibold text-gray-900">$2M+ Saved</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/get-started" className="btn-primary flex items-center justify-center group transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary transform hover:scale-105 transition-all duration-200">
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-green-500" />
                Bank-level security
              </div>
              <div className="flex items-center">
                <Smartphone className="h-4 w-4 mr-1 text-blue-500" />
                Mobile & Web
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-purple-500" />
                Real-time insights
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="animate-slide-up">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">This Month</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="stat-card hover:bg-primary-50 transition-colors duration-200">
                    <p className="text-sm text-primary-600 font-medium">Total Balance</p>
                    <p className="text-2xl font-bold text-gray-900">$12,450</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5.2% from last month
                    </p>
                  </div>
                  <div className="stat-card hover:bg-red-50 transition-colors duration-200">
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
                      <span className="text-gray-900 font-medium">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Savings Goal</span>
                      <span className="text-gray-900 font-medium">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-xl shadow-lg animate-bounce-slow hover:shadow-xl transition-shadow duration-200">
                <p className="text-sm font-medium">Recent Transaction</p>
                <p className="text-lg font-bold">-$45.99</p>
                <p className="text-xs opacity-90">Grocery Store</p>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <p className="text-sm font-medium">Income This Month</p>
                <p className="text-lg font-bold">+$4,200</p>
                <p className="text-xs opacity-90">Salary & Freelance</p>
              </div>

              {/* Additional Floating Elements */}
              <div className="absolute top-1/2 -right-8 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg animate-pulse">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="absolute bottom-1/4 -left-8 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Shield className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;