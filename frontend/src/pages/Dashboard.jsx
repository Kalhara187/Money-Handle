import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, BarChart3, PieChart, Plus, Download, Filter } from 'lucide-react';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [salaryType, setSalaryType] = useState('fixed');
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [dashboardData] = useState({
    currentMonth: {
      income: 5200,
      expenses: 3800,
      savings: 1400,
      growth: 8.33
    },
    yearToDate: {
      income: 45600,
      expenses: 32400,
      savings: 13200
    },
    incomeByMonth: [4200, 4500, 4800, 4600, 4800, 5200, 5100, 4900, 5300, 5200],
    topIncomeCategories: [
      { name: 'Salary', amount: 4200, color: 'bg-blue-500' },
      { name: 'Freelance', amount: 800, color: 'bg-green-500' },
      { name: 'Investments', amount: 200, color: 'bg-purple-500' }
    ],
    recentTransactions: [
      { date: '2025-10-08', description: 'Salary Deposit', amount: 4200, type: 'income' },
      { date: '2025-10-05', description: 'Freelance Project', amount: 800, type: 'income' },
      { date: '2025-10-03', description: 'Dividend Payment', amount: 150, type: 'income' },
      { date: '2025-10-01', description: 'Investment Returns', amount: 50, type: 'income' }
    ]
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
            <p className="text-gray-600">Track your income and expenses in real-time</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Salary Type:</label>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="fixed">Fixed</option>
                <option value="variable">Variable</option>
              </select>
            </div>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={2025}>2025</option>
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
            </select>

            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* This Month Income */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                +{dashboardData.currentMonth.growth}%
                <TrendingUp className="h-4 w-4 ml-1" />
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(dashboardData.currentMonth.income)}
            </div>
            <p className="text-gray-600 text-sm">Income This Month</p>
          </div>

          {/* This Month Expenses */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-red-600 text-sm font-medium">Expenses</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(dashboardData.currentMonth.expenses)}
            </div>
            <p className="text-gray-600 text-sm">Spent This Month</p>
          </div>

          {/* This Month Savings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-blue-600 text-sm font-medium">Saved</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(dashboardData.currentMonth.savings)}
            </div>
            <p className="text-gray-600 text-sm">Savings This Month</p>
          </div>

          {/* Year to Date */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-purple-600 text-sm font-medium">YTD</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(dashboardData.yearToDate.income)}
            </div>
            <p className="text-gray-600 text-sm">Year to Date Income</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Income Trend Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Income Trend</h3>
              <BarChart3 className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {months.slice(0, 10).map((month, index) => {
                const amount = dashboardData.incomeByMonth[index];
                const maxAmount = Math.max(...dashboardData.incomeByMonth);
                const width = (amount / maxAmount) * 100;
                
                return (
                  <div key={month} className="flex items-center">
                    <div className="w-12 text-sm text-gray-600">{month.slice(0, 3)}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 mx-3 relative">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-8 rounded-full flex items-center justify-end pr-3"
                        style={{ width: `${width}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Income Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Income Sources</h3>
              <button className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
                <Plus className="h-4 w-4 mr-1" />
                Add Source
              </button>
            </div>
            
            <div className="space-y-4">
              {dashboardData.topIncomeCategories.map((category, index) => {
                const totalIncome = dashboardData.topIncomeCategories.reduce((sum, cat) => sum + cat.amount, 0);
                const percentage = ((category.amount / totalIncome) * 100).toFixed(1);
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 ${category.color} rounded-full mr-3`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500">{percentage}% of total</div>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(category.amount)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Salary Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Salary Details</h3>
            <div className="text-sm text-gray-500">
              Type: {salaryType === 'fixed' ? 'Fixed Salary' : 'Variable Salary'}
            </div>
          </div>

          {salaryType === 'fixed' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Monthly Fixed Salary</div>
                  <div className="text-sm text-gray-500">Consistent monthly income</div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(4200)}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Your fixed salary provides stability and predictable income. This amount is deposited regularly each month.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-medium text-gray-900">Base Salary</div>
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(3000)}</div>
                  <div className="text-sm text-gray-500">Fixed component</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-gray-900">Bonuses</div>
                  <div className="text-2xl font-bold text-yellow-600">{formatCurrency(800)}</div>
                  <div className="text-sm text-gray-500">Performance-based</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-medium text-gray-900">Commissions</div>
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(400)}</div>
                  <div className="text-sm text-gray-500">Sales incentives</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Variable salary includes base pay plus additional earnings from bonuses and commissions. This can fluctuate based on performance and sales.
              </div>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Income Transactions</h3>
            <button className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Type</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{transaction.description}</td>
                    <td className="py-3 px-4 text-right font-semibold text-green-600">
                      +{formatCurrency(transaction.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Income
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;