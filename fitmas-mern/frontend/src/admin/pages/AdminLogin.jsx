import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated && !loading) {
      navigate('/admin');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!formData.password.trim()) {
      toast.error('Password is required');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      // Error is already handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-login-loading">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="logo-section">
              <div className="logo-icon">
                <i className="fas fa-dumbbell"></i>
              </div>
              <h1>Fitmas Admin</h1>
              <p>Content Management System</p>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-blog"></i>
                <span>Manage Blog Posts</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-images"></i>
                <span>Media Library</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-chart-bar"></i>
                <span>Analytics Dashboard</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <span>User Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-container">
            <div className="login-header">
              <h2>Welcome Back</h2>
              <p>Please sign in to your admin account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <div className="input-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <div className="input-icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/admin/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="btn-spinner"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <Link to="/" className="back-link">
                <i className="fas fa-arrow-left"></i>
                Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
