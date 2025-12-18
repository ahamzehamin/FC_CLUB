import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getUser();

        if (token && storedUser) {
          // Verify token is still valid by making a request
          await authService.getProfile();
          setUser(storedUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Token is invalid, clear storage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);

      if (response.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        return response;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout API fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);

      if (response.success) {
        const updatedUser = { ...user, profile: { ...user.profile, ...profileData } };
        setUser(updatedUser);
        localStorage.setItem('adminUser', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully');
        return response;
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  // Change password
  const changePassword = async (passwords) => {
    try {
      const response = await authService.changePassword(passwords);

      if (response.success) {
        toast.success('Password changed successfully');
        return response;
      }
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(error.message || 'Failed to change password');
      throw error;
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const response = await authService.getProfile();

      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('adminUser', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return user?.permissions?.[permission] === true;
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
    hasRole,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
