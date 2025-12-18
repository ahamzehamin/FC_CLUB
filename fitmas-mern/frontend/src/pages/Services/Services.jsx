import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Our Services</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li className="active">SERVICES</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Our Services</span>
            <h2 className="sec-title">What We Offer</h2>
            <p className="sec-text">Professional fitness services tailored to help you achieve your goals</p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="loading"></div>
            </div>
          ) : (
            <div className="row">
              {services.length > 0 ? (
                services.map((service) => (
                  <div key={service._id} className="col-xl-4 col-md-6">
                    <div className="service-card style2">
                      <div className="service-card_icon">
                        <img src={`/assets/img/icon/${service.icon}`} alt={service.title} />
                      </div>
                      <div className="service-card_content">
                        <h4 className="service-card_title h5">
                          <a href={`/services/${service.slug}`}>{service.title}</a>
                        </h4>
                        <p className="service-card_text">{service.description}</p>
                        {service.features && service.features.length > 0 && (
                          <ul className="service-features">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx}>• {feature}</li>
                            ))}
                          </ul>
                        )}
                        <a href={`/services/${service.slug}`} className="link-btn">
                          <i className="fas fa-arrow-right"></i> Read More
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No services available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
