import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/contact', formData);
      setMessage('Thank you! Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setMessage('Sorry, there was an error sending your message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Contact Us</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li className="active">CONTACT</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="row gy-40">
            <div className="col-xl-6">
              <div className="contact-form-area">
                <div className="title-area mb-30">
                  <span className="sub-title">Get In Touch</span>
                  <h2 className="sec-title">Send Us a Message</h2>
                </div>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                          placeholder="Your Message"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn style2" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
                {message && (
                  <div className={`alert mt-3 ${message.includes('error') ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-6">
              <div className="contact-info-area">
                <div className="title-area mb-30">
                  <span className="sub-title">Contact Info</span>
                  <h2 className="sec-title">Get In Touch</h2>
                </div>
                <div className="contact-info-wrap">
                  <div className="info-card">
                    <div className="info-card_icon">
                      <i className="fas fa-location-dot"></i>
                    </div>
                    <div className="info-card_content">
                      <p className="info-card_text">Our Location</p>
                      <h6 className="info-card_subtitle">Marina Lane Berlin</h6>
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="info-card_icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="info-card_content">
                      <p className="info-card_text">Email Address</p>
                      <h6 className="info-card_subtitle">health@Fitmas.com</h6>
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="info-card_icon">
                      <i className="fas fa-phone-volume"></i>
                    </div>
                    <div className="info-card_content">
                      <p className="info-card_text">Phone Number</p>
                      <h6 className="info-card_subtitle">(+189) 2538-2145</h6>
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="info-card_icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="info-card_content">
                      <p className="info-card_text">Working Hours</p>
                      <h6 className="info-card_subtitle">Mon - Sat: 8.00 am-7.00 pm</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
