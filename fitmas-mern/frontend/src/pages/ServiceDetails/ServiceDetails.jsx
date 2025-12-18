import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [slug]);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`/api/services/${slug}`);
      setService(response.data.data);
    } catch (error) {
      console.error('Error fetching service details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="service-details-page">
        <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-content">
                  <h1 className="breadcumb-title">Loading Service...</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space">
          <div className="container text-center">
            <div className="loading"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="service-details-page">
        <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-content">
                  <h1 className="breadcumb-title">Service Not Found</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space">
          <div className="container text-center">
            <p>The service you're looking for doesn't exist.</p>
            <a href="/services" className="btn style2 mt-3">View All Services</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-details-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">{service.title}</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li><a href="/services">SERVICES</a></li>
                  <li className="active">{service.title}</li>
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
              <div className="service-details-image">
                <img
                  src={`/assets/img/service/${service.image || 'service-detail.jpg'}`}
                  alt={service.title}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="service-details-content">
                <div className="title-area mb-30">
                  <span className="sub-title">Service Details</span>
                  <h2 className="sec-title">{service.title}</h2>
                </div>
                <p className="service-description">{service.description}</p>

                {service.features && service.features.length > 0 && (
                  <div className="service-features">
                    <h3>What We Offer:</h3>
                    <ul>
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <i className="fas fa-check-circle"></i> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="service-icon mb-30">
                  <div className="icon">
                    <img src={`/assets/img/icon/${service.icon}`} alt={service.title} />
                  </div>
                </div>

                <div className="btn-wrap">
                  <a href="/contact" className="btn style2">Get This Service</a>
                  <a href="/services" className="btn border">View All Services</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="space-bottom bg-smoke3">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Explore More</span>
            <h2 className="sec-title">Other Services</h2>
            <p className="sec-text">Check out our other professional fitness services</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_1-2.svg" alt="Cardio Training" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5">
                    <a href="/services/cardio-training">Cardio Training</a>
                  </h4>
                  <p className="service-card_text">Build cardiovascular endurance with expert guidance.</p>
                  <a href="/services/cardio-training" className="link-btn">
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_1-3.svg" alt="Strength Training" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5">
                    <a href="/services/strength-training">Strength Training</a>
                  </h4>
                  <p className="service-card_text">Build muscle and strength with professional training programs.</p>
                  <a href="/services/strength-training" className="link-btn">
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_1-4.svg" alt="Nutrition Guidance" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5">
                    <a href="/services/nutrition-guidance">Nutrition Guidance</a>
                  </h4>
                  <p className="service-card_text">Get personalized nutrition plans for your fitness goals.</p>
                  <a href="/services/nutrition-guidance" className="link-btn">
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
