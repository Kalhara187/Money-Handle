import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Plus, Calendar, BarChart3, PieChart } from 'lucide-react';

const IncomeTracker = () => {
  const [currentMonth] = useState(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  const [incomeData] = useState({
    totalIncome: 5200,
    lastMonthIncome: 4800,
    incomeGrowth: 8.33,
    incomeSourcesCount: 3,
    avgMonthlyIncome: 4950
  });

  const [incomeSources] = useState([
    {
      source: 'Primary Job',
      amount: 4200,
      percentage: 80.8,
      color: 'bg-primary-500',
      icon: DollarSign
    },
    {
      source: 'Freelance Work',
      amount: 800,
      percentage: 15.4,
      color: 'bg-blue-500',
      icon: BarChart3
    },
    {
      source: 'Investments',
      amount: 200,
      percentage: 3.8,
      color: 'bg-green-500',
      icon: TrendingUp
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Income This Month
          </h2>
          <p className="text-gray-600 text-lg">
            Track and manage your income sources for {currentMonth}
          </p>
        </div>

        {/* Main Income Card */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Total Income */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 mr-3" />
                <h3 className="text-lg font-medium text-primary-100">{currentMonth}</h3>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">{formatCurrency(incomeData.totalIncome)}</span>
                <p className="text-primary-100 mt-1">Total Income This Month</p>
              </div>
              <div className="flex items-center">
                {incomeData.incomeGrowth > 0 ? (
                  <>
                    <TrendingUp className="h-5 w-5 text-green-300 mr-2" />
                    <span className="text-green-300 font-medium">
                      +{incomeData.incomeGrowth}% from last month
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-5 w-5 text-red-300 mr-2" />
                    <span className="text-red-300 font-medium">
                      {incomeData.incomeGrowth}% from last month
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">{formatCurrency(incomeData.lastMonthIncome)}</div>
                <p className="text-primary-100 text-sm">Last Month</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">{formatCurrency(incomeData.avgMonthlyIncome)}</div>
                <p className="text-primary-100 text-sm">6-Month Average</p>
              </div>
            </div>
          </div>
        </div>

        {/* Income Sources */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sources Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Income Sources</h3>
              <button className="flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors">
                <Plus className="h-4 w-4 mr-1" />
                Add Source
              </button>
            </div>

            <div className="space-y-4">
              {incomeSources.map((source, index) => {
                const IconComponent = source.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${source.color} rounded-lg flex items-center justify-center mr-4`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{source.source}</div>
                        <div className="text-sm text-gray-500">{source.percentage}% of total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(source.amount)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Chart Placeholder */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Income Trend</h3>
              <PieChart className="h-6 w-6 text-gray-400" />
            </div>

            {/* Simple Bar Chart Representation */}
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">Last 6 Months</div>
              
              {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, index) => {
                const amounts = [4200, 4500, 4800, 4600, 4800, 5200];
                const height = (amounts[index] / 5200) * 100;
                
                return (
                  <div key={month} className="flex items-center">
                    <div className="w-12 text-sm text-gray-600">{month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 mx-3 relative">
                      <div 
                        className="bg-primary-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${height}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {formatCurrency(amounts[index])}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Add Income Entry
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
              View Full Report
            </button>
            <button className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomeTracker;