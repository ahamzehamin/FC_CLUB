import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeamDetails = () => {
  const { slug } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainerDetails();
  }, [slug]);

  const fetchTrainerDetails = async () => {
    try {
      const response = await axios.get(`/api/team/${slug}`);
      setTrainer(response.data.data);
    } catch (error) {
      console.error('Error fetching trainer details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="team-details-page">
        <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-content">
                  <h1 className="breadcumb-title">Loading Trainer...</h1>
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

  if (!trainer) {
    return (
      <div className="team-details-page">
        <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-content">
                  <h1 className="breadcumb-title">Trainer Not Found</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space">
          <div className="container text-center">
            <p>The trainer you're looking for doesn't exist.</p>
            <a href="/team" className="btn style2 mt-3">View All Trainers</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="team-details-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">{trainer.name}</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li><a href="/team">TEAM</a></li>
                  <li className="active">{trainer.name}</li>
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
              <div className="trainer-image">
                <img
                  src={`/assets/img/team/${trainer.image}`}
                  alt={trainer.name}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="trainer-details">
                <div className="title-area mb-30">
                  <span className="sub-title">Our Trainer</span>
                  <h2 className="sec-title">{trainer.name}</h2>
                </div>

                <div className="trainer-position">
                  <h4>{trainer.position}</h4>
                </div>

                <div className="trainer-specializations mb-30">
                  <h5>Specializations:</h5>
                  {trainer.specialization && (
                    <div className="spec-list">
                      {trainer.specialization.map((spec, idx) => (
                        <span key={idx} className="spec-badge">{spec}</span>
                      ))}
                    </div>
                  )}
                </div>

                {trainer.bio && (
                  <div className="trainer-bio mb-40">
                    <h5>About {trainer.name}:</h5>
                    <p>{trainer.bio}</p>
                  </div>
                )}

                {trainer.experience && (
                  <div className="trainer-experience mb-40">
                    <h5>Experience:</h5>
                    <p>{trainer.experience}</p>
                  </div>
                )}

                <div className="trainer-social mb-40">
                  <h5>Connect With Me:</h5>
                  <div className="social-links">
                    {trainer.social?.twitter && (
                      <a href={trainer.social.twitter} className="social-link">
                        <i className="fab fa-twitter"></i> Twitter
                      </a>
                    )}
                    {trainer.social?.linkedin && (
                      <a href={trainer.social.linkedin} className="social-link">
                        <i className="fab fa-linkedin-in"></i> LinkedIn
                      </a>
                    )}
                    {trainer.social?.facebook && (
                      <a href={trainer.social.facebook} className="social-link">
                        <i className="fab fa-facebook"></i> Facebook
                      </a>
                    )}
                    {trainer.social?.discord && (
                      <a href={trainer.social.discord} className="social-link">
                        <i className="fab fa-discord"></i> Discord
                      </a>
                    )}
                  </div>
                </div>

                <div className="btn-wrap">
                  <a href="/contact" className="btn style2">Book a Session</a>
                  <a href="/team" className="btn border">View All Trainers</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Trainers Section */}
      <div className="space-bottom bg-smoke3">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Meet Our Team</span>
            <h2 className="sec-title">Other Expert Trainers</h2>
            <p className="sec-text">Professional training from certified fitness experts</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-2.png" alt="Sarah Johnson" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title">
                    <a href="/team/sarah-johnson">Sarah Johnson</a>
                  </h4>
                  <span className="team-card_desig">Personal Trainer</span>
                  <div className="social-btn">
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-3.png" alt="Mike Davis" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title">
                    <a href="/team/mike-davis">Mike Davis</a>
                  </h4>
                  <span className="team-card_desig">Fitness Coach</span>
                  <div className="social-btn">
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-4.png" alt="Lisa Chen" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title">
                    <a href="/team/lisa-chen">Lisa Chen</a>
                  </h4>
                  <span className="team-card_desig">Nutrition Specialist</span>
                  <div className="social-btn">
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-bottom" style={{ backgroundColor: '#007bff' }}>
        <div className="container">
          <div className="cta-content text-center text-white">
            <h2>Ready to Start Your Fitness Journey?</h2>
            <p>Join our fitness center today and get personal training from our expert team!</p>
            <div className="btn-wrap justify-content-center mt-40">
              <a href="/pricing" className="btn" style={{ backgroundColor: 'white', color: '#007bff' }}>
                View Pricing Plans
              </a>
              <a href="/contact" className="btn border" style={{ borderColor: 'white', color: 'white' }}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
