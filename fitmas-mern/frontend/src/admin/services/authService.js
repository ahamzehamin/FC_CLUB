import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance for admin API
const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Login admin user
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { data } = response.data;

      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await adminApi.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await adminApi.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Change password
  changePassword: async (passwords) => {
    try {
      const response = await adminApi.put('/auth/change-password', passwords);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await adminApi.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  },

  // Get stored user data
  getUser: () => {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('adminToken');
  },
};

export default adminApi;
