// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// API service class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get authentication token
  getToken() {
    return this.token || localStorage.getItem('token');
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Make HTTP request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          this.clearToken();
          // Redirect to login or dispatch logout action
          window.location.href = '/signin';
        }
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Authentication API methods
export const authAPI = {
  // Sign up
  signup: async (userData) => {
    const api = new ApiService();
    const response = await api.post('/auth/signup', userData);
    if (response.success && response.token) {
      api.setToken(response.token);
    }
    return response;
  },

  // Sign in
  signin: async (credentials) => {
    const api = new ApiService();
    const response = await api.post('/auth/signin', credentials);
    if (response.success && response.token) {
      api.setToken(response.token);
    }
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    const api = new ApiService();
    return api.get('/auth/me');
  },

  // Update password
  updatePassword: async (passwordData) => {
    const api = new ApiService();
    return api.patch('/auth/updatePassword', passwordData);
  },

  // Logout
  logout: async () => {
    const api = new ApiService();
    try {
      await api.post('/auth/logout');
    } finally {
      api.clearToken();
    }
  },

  // Check email availability
  checkEmail: async (email) => {
    const api = new ApiService();
    return api.post('/auth/check-email', { email });
  },
};

// User API methods
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const api = new ApiService();
    return api.get('/user/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const api = new ApiService();
    return api.patch('/user/profile', profileData);
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    const api = new ApiService();
    return api.patch('/user/preferences', preferences);
  },

  // Add financial goal
  addFinancialGoal: async (goalData) => {
    const api = new ApiService();
    return api.post('/user/financial-goals', goalData);
  },

  // Update financial goal
  updateFinancialGoal: async (goalId, goalData) => {
    const api = new ApiService();
    return api.patch(`/user/financial-goals/${goalId}`, goalData);
  },

  // Delete financial goal
  deleteFinancialGoal: async (goalId) => {
    const api = new ApiService();
    return api.delete(`/user/financial-goals/${goalId}`);
  },

  // Get user statistics
  getStats: async () => {
    const api = new ApiService();
    return api.get('/user/stats');
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const api = new ApiService();
    return api.get('/health');
  },
};

// Auth helper functions
export const authHelpers = {
  // Check if user is logged in
  isLoggedIn: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  },

  // Get user data from token
  getUserFromToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  },

  // Initialize API token on app start
  initializeAuth: () => {
    const api = new ApiService();
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
    }
  },
};

export default ApiService;