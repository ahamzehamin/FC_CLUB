import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      {/* Breadcrumb */}
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">About Us</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li className="active">ABOUT US</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-lg-2 text-lg-end">
              <div className="about-thumb mb-5 mb-lg-0">
                <img className="about-img-1" src="/assets/img/normal/about_1-1.png" alt="img" />
                <img className="about-img-2 jump" src="/assets/img/normal/about_1-2.png" alt="img" />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="about-content-wrap">
                <div className="title-area mb-0">
                  <span className="sub-title">More About Us</span>
                  <h2 className="sec-title">Unlock Your Full Potential,
                    Achieve Your Goals.</h2>
                  <p className="sec-text">Welcome to Fitmas. your ultimate destination for achieving your fitness goals. We understand the importance of leading a healthy lifestyle and provide a top-notch fitness facility to support you in your fitness journey.
                  </p>
                  <div className="about-tab-1">
                    <div className="filter-menu-active">
                      <button data-filter=".cat1" className="active" type="button">Our Mission</button>
                      <button data-filter=".cat2" type="button">Our Vision</button>
                      <button data-filter=".cat3" type="button">Our Goal</button>
                    </div>
                    <div className="filter-active-cat1">
                      <div className="filter-item cat1">
                        <div className="about-tab-icon">
                          <img src="/assets/img/icon/about-icon.svg" alt="img" />
                        </div>
                        <p className="about-tab-text">Gyms play a vital role in promoting an active and healthy lifestyle. They provide a supportive and motivating environment for individuals to engage in regular physical activity.</p>
                      </div>
                      <div className="filter-item cat2">
                        <div className="about-tab-icon">
                          <img src="/assets/img/icon/about-icon.svg" alt="img" />
                        </div>
                        <p className="about-tab-text">Gyms play a vital role in promoting an active and healthy lifestyle. They provide a supportive and motivating environment for individuals to engage in regular physical activity.</p>
                      </div>
                      <div className="filter-item cat3">
                        <div className="about-tab-icon">
                          <img src="/assets/img/icon/about-icon.svg" alt="img" />
                        </div>
                        <p className="about-tab-text">Gyms play a vital role in promoting an active and healthy lifestyle. They provide a supportive and motivating environment for individuals to engage in regular physical activity.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-wrap mt-40">
                  <a href="/contact" className="btn">Make Appointment</a>
                  <div className="about-info-wrap">
                    <div className="icon"><i className="fas fa-phone-volume"></i></div>
                    <div className="details">
                      <p className="about-info-title">Need Help?</p>
                      <a className="about-info-link" href="tel:+25825692582">(+258) 2569 2582</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="service-area-2 space-bottom overflow-hidden">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Our Services</span>
            <h2 className="sec-title">Service We Provide</h2>
          </div>
        </div>
        <div className="container">
          <div className="row global-carousel service-slider-2 slider-shadow" data-slide-show="3">
            <div className="col-lg-4 col-md-6">
              <div className="service-card style2">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_2-1.svg" alt="img" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5"><a href="/services/general-fitness">Gym Fitness Class</a></h4>
                  <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods.</p>
                  <a href="/services/general-fitness" className="link-btn"><i className="fas fa-arrow-right"></i> Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card style2">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_2-2.svg" alt="img" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5"><a href="/services/power-lifting">Power Lifting</a></h4>
                  <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods.</p>
                  <a href="/services/power-lifting" className="link-btn"><i className="fas fa-arrow-right"></i> Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card style2">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_2-3.svg" alt="img" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5"><a href="/services/body-building">Body Building</a></h4>
                  <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods.</p>
                  <a href="/services/body-building" className="link-btn"><i className="fas fa-arrow-right"></i> Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta-area space" style={{ backgroundImage: "url('/assets/img/bg/cta-bg1.png')" }}>
        <div className="container">
          <div className="row justify-content-lg-end justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="cta-wrap text-center text-lg-start">
                <div className="title-area">
                  <span className="sub-title">Make An Appointment</span>
                  <h2 className="sec-title text-white">Get a Free Consultancy
                    Right Now Here!</h2>
                </div>
                <div className="btn-wrap mt-40">
                  <a href="/contact" className="btn style2">Make Appointment</a>
                  <div className="about-info-wrap style3">
                    <div className="icon"><i className="fas fa-phone-volume"></i></div>
                    <div className="details">
                      <p className="about-info-title text-white">Need Help?</p>
                      <a className="about-info-link" href="tel:+25825692582">(+258) 2569 2582</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <div className="team-area-1 space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Our Trainer</span>
            <h2 className="sec-title">Meet Our Amazing Team</h2>
          </div>
          <div className="row global-carousel team-slider-1 slider-shadow" data-slide-show="4">
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-1.png" alt="img" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title"><a href="/team/george-thomas">George Thomas</a></h4>
                  <span className="team-card_desig">CEO/Founder</span>
                  <div className="social-btn">
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.discord.com/"><i className="fab fa-discord"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-2.png" alt="img" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title"><a href="/team/mike-johnson">Mike Johnson</a></h4>
                  <span className="team-card_desig">Personal Trainer</span>
                  <div className="social-btn">
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.discord.com/"><i className="fab fa-discord"></i></a>
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

export default About;
