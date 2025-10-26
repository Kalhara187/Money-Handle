import ApiService from './api.js';

// AI API methods
export const aiAPI = {
  // Calculate budget
  calculateBudget: async (budgetData) => {
    const api = new ApiService();
    return api.post('/ai/calculate/budget', budgetData);
  },

  // Calculate savings goal
  calculateSavingsGoal: async (goalData) => {
    const api = new ApiService();
    return api.post('/ai/calculate/savings-goal', goalData);
  },

  // Calculate loan payment
  calculateLoan: async (loanData) => {
    const api = new ApiService();
    return api.post('/ai/calculate/loan', loanData);
  },

  // Send chat message
  sendMessage: async (messageData) => {
    const api = new ApiService();
    return api.post('/ai/chat', messageData);
  },

  // Get conversation history
  getHistory: async () => {
    const api = new ApiService();
    return api.get('/ai/history');
  },
};
