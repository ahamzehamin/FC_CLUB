import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get('/api/team');
      setTeamMembers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="team-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Our Team</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li className="active">TEAM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Our Trainer</span>
            <h2 className="sec-title">Meet Our Amazing Team</h2>
            <p className="sec-text">Professional trainers dedicated to helping you achieve your fitness goals</p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="loading"></div>
            </div>
          ) : (
            <div className="row global-carousel team-slider-1 slider-shadow" data-slide-show="4">
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <div key={member._id} className="col-lg-4 col-md-6">
                    <div className="team-card">
                      <div className="team-card_img">
                        <img src={`/assets/img/team/${member.image}`} alt={member.name} />
                      </div>
                      <div className="team-card_content">
                        <h4 className="team-card_title">
                          <a href={`/team/${member.slug}`}>{member.name}</a>
                        </h4>
                        <span className="team-card_desig">{member.position}</span>
                        <div className="team-card_bio">
                          <p>{member.bio}</p>
                        </div>
                        {member.specialization && (
                          <div className="team-specialization">
                            {member.specialization.map((spec, idx) => (
                              <span key={idx} className="spec-tag">{spec}</span>
                            ))}
                          </div>
                        )}
                        <div className="social-btn">
                          {member.social?.twitter && (
                            <a href={member.social.twitter} aria-label="Twitter">
                              <i className="fab fa-twitter"></i>
                            </a>
                          )}
                          {member.social?.linkedin && (
                            <a href={member.social.linkedin} aria-label="LinkedIn">
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                          )}
                          {member.social?.facebook && (
                            <a href={member.social.facebook} aria-label="Facebook">
                              <i className="fab fa-facebook"></i>
                            </a>
                          )}
                          {member.social?.discord && (
                            <a href={member.social.discord} aria-label="Discord">
                              <i className="fab fa-discord"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No team members available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-bottom" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="title-area text-center mb-40">
            <h2 className="sec-title">Why Choose Our Team?</h2>
            <p className="sec-text">Experienced professionals with proven results</p>
          </div>
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-card_icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <h6 className="feature-card_subtitle">Certified Experts</h6>
                <p className="feature-card_text">All our trainers are certified fitness professionals with years of experience.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-card_icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h6 className="feature-card_subtitle">Personal Care</h6>
                <p className="feature-card_text">Individual attention and customized fitness programs for each client.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-card_icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <h6 className="feature-card_subtitle">Proven Results</h6>
                <p className="feature-card_text">Track record of helping clients achieve their fitness goals successfully.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
