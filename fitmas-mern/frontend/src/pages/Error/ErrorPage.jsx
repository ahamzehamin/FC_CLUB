import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-wrapper" style={{ backgroundImage: "url('/assets/img/bg/error-bg.jpg')" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="error-content">
                <div className="error-thumb">
                  <img src="/assets/img/error/error.png" alt="404 Error" />
                </div>
                <h1 className="error-title">404</h1>
                <h2 className="error-subtitle">Page Not Found</h2>
                <p className="error-text">
                  Sorry, the page you are looking for doesn't exist or has been moved.
                  Try going back to the homepage or contact us if you need help.
                </p>
                <div className="error-actions">
                  <Link to="/" className="btn style2">
                    <i className="fas fa-home"></i> Back to Home
                  </Link>
                  <Link to="/contact" className="btn border">
                    <i className="fas fa-envelope"></i> Contact Us
                  </Link>
                </div>
                <div className="error-search">
                  <p>Or search for what you're looking for:</p>
                  <div className="search-box">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="error-links-section bg-smoke3 space">
        <div className="container">
          <div className="title-area text-center mb-40">
            <h3 className="sec-title">Popular Pages</h3>
            <p>You might want to visit these pages instead</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <Link to="/" className="error-link-card">
                <div className="error-link-icon">
                  <i className="fas fa-home"></i>
                </div>
                <h4>Home</h4>
                <p>Main homepage</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <Link to="/services" className="error-link-card">
                <div className="error-link-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                <h4>Services</h4>
                <p>Our services</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <Link to="/team" className="error-link-card">
                <div className="error-link-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4>Team</h4>
                <p>Our trainers</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <Link to="/contact" className="error-link-card">
                <div className="error-link-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h4>Contact</h4>
                <p>Get in touch</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
