// API Configuration
// In development, use relative URLs to leverage Vite proxy
// In production, use the full API URL from environment variable
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNIN: `${API_BASE_URL}/api/auth/signin`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  ME: `${API_BASE_URL}/api/auth/me`,
  
  // User endpoints
  UPDATE_PROFILE: `${API_BASE_URL}/api/user/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/user/change-password`,
};

// Helper function to make authenticated requests
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, mergedOptions);
  
  // Handle 401 Unauthorized
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
  }

  return response;
};

export default API_BASE_URL;
