import React, { useEffect, useState } from 'react';
import './style.css';

const Home = ({ variant = 'home-1' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle hero slider transitions
  useEffect(() => {
    if (variant === 'home-1') {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 2); // Cycle between 2 slides
      }, 5000); // 5 seconds per slide

      return () => clearInterval(interval);
    } else if (variant === 'home-2') {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 2); // Cycle between 2 slides for home-2
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [variant]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (variant === 'home-2') {
    return <HomeVariant2 />;
  }

  if (variant === 'home-3') {
    return <HomeVariant3 />;
  }

  // Default Home-1
  return (
    <div className="home-page">
      {/* Hero Section - Home 1 */}
      <div className="hero-wrapper hero-1" id="hero">
        <div className="global-carousel" id="heroSlider1" data-fade="true" data-slide-show="1" data-lg-slide-show="1" data-md-slide-show="1" data-sm-slide-show="1" data-xs-slide-show="1" data-arrows="true" data-xl-arrows="true" data-ml-arrows="true">
          {/* Slide 1 */}
          <div className={`hero-slider ${currentSlide === 0 ? 'active' : ''}`} style={{ backgroundImage: "url('/assets/img/hero/hero_bg_1_1.png')" }}>
            <div className="hero-shape1 shape-mockup movingX" data-bottom="165px" data-right="0">
              <img src="/assets/img/hero/hero_shape_1.png" alt="img"/>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-7 col-md-9">
                  <div className="hero-style1">
                    <span className="hero-subtitle" data-ani="slideinup" data-ani-delay="0s">Welcome To Our Company</span>
                    <h1 className="hero-title text-white" data-ani="slideinup" data-ani-delay="0.1s">The Best
                      <span>Fitness</span> Studio
                      In Town</h1>
                    <div className="btn-group" data-ani="slideinup" data-ani-delay="0.2s">
                      <button onClick={() => window.location.href = '#/contact'}>Make Appointment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className={`hero-slider ${currentSlide === 1 ? 'active' : ''}`} style={{ backgroundImage: "url('/assets/img/hero/hero_bg_1_2.png')" }}>
            <div className="hero-shape1 shape-mockup movingX" data-bottom="165px" data-right="0">
              <img src="/assets/img/hero/hero_shape_1.png" alt="img"/>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-7 col-md-9">
                  <div className="hero-style1">
                    <span className="hero-subtitle" data-ani="slideinup" data-ani-delay="0s">Welcome To Our Company</span>
                    <h1 className="hero-title text-white" data-ani="slideinup" data-ani-delay="0.1s">The Best
                      <span>Fitness</span> Studio
                      In Town</h1>
                    <div className="btn-group" data-ani="slideinup" data-ani-delay="0.2s">
                      <button onClick={() => window.location.href = '#/contact'}>Make Appointment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="hero-arrow">
          <button onClick={() => goToSlide((currentSlide - 1 + 2) % 2)} className="slick-arrow slick-prev">PREV</button>
          <button onClick={() => goToSlide((currentSlide + 1) % 2)} className="slick-arrow slick-next">NEXT</button>
        </div>
        {/* Slide indicators */}
        <div className="hero-dots">
          <button className={`dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => goToSlide(0)}></button>
          <button className={`dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => goToSlide(1)}></button>
        </div>
      </div>

      {/* feature Area */}
      <div className="space">
        <div className="container">
          <div className="feature-area">
            <div className="row gx-0">
              <div className="col-lg-4">
                <div className="feature-card">
                  <div className="feature-card_bg">
                    <img src="/assets/img/bg/feature-card_bg1.png" alt="img" />
                  </div>
                  <div className="feature-card_icon">
                    <img src="/assets/img/icon/feature-icon1-1.svg" alt="img" />
                  </div>
                  <h6 className="feature-card_subtitle">Healthier Life</h6>
                  <h4 className="feature-card_title"><a href="/services">Achieve Your Goals</a></h4>
                  <p className="feature-card_text">We believe that with the right guidance, support, and mindset, you can accomplish anything you set your mind to.</p>
                  <a href="/contact" className="btn style2">View Class Schedule</a>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="feature-card feature-card-active">
                  <div className="feature-card_bg">
                    <img src="/assets/img/bg/feature-card_bg1.png" alt="img" />
                  </div>
                  <div className="feature-card_icon">
                    <img src="/assets/img/icon/feature-icon1-2.svg" alt="img" />
                  </div>
                  <h6 className="feature-card_subtitle">Healthier Life</h6>
                  <h4 className="feature-card_title"><a href="/services">Best Institute Certificate</a></h4>
                  <p className="feature-card_text">We believe that with the right guidance, support, and mindset, you can accomplish anything you set your mind to.</p>
                  <a href="/contact" className="btn style2">View Class Schedule</a>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="feature-card">
                  <div className="feature-card_bg">
                    <img src="/assets/img/bg/feature-card_bg1.png" alt="img" />
                  </div>
                  <div className="feature-card_icon">
                    <img src="/assets/img/icon/feature-icon1-3.svg" alt="img" />
                  </div>
                  <h6 className="feature-card_subtitle">Healthier Life</h6>
                  <h4 className="feature-card_title"><a href="/services">Train Day and Night</a></h4>
                  <p className="feature-card_text">We believe that with the right guidance, support, and mindset, you can accomplish anything you set your mind to.</p>
                  <a href="/contact" className="btn style2">View Class Schedule</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Area */}
      <div className="space-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-thumb mb-5 mb-lg-0">
                <img className="about-img-1" src="/assets/img/normal/about_1-1.png" alt="img" />
                <img className="about-img-2 jump" src="/assets/img/normal/about_1-2.png" alt="img" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content-wrap">
                <div className="title-area mb-0">
                  <span className="sub-title">More About Us</span>
                  <h2 className="sec-title">Unlock Your Full Potential,
                    Achieve Your Goals.</h2>
                  <p className="sec-text">Welcome to Fitmas. your ultimate destination for achieving your fitness goals. We understand the importance of leading a healthy lifestyle and provide a top-notch fitness facility to support you in your fitness journey. </p>
                </div>
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
                <button onClick={() => window.location.href = '#/about'} className="btn">Learn More About Us</button>
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

      {/* Services Section */}
      <div className="service-bg-area" style={{ backgroundImage: "url('/assets/img/bg/service-bg.png')" }}>
        <div className="sec-shape-top">
          <img src="/assets/img/bg/sec-shape-top.png" alt="img" />
        </div>
        <div className="service-area-1 space overflow-hidden">
          <div className="container">
            <div className="title-area">
              <span className="sub-title">Our Features</span>
              <h2 className="sec-title text-white">Services We're Offering</h2>
            </div>
          </div>
        <div className="container-fluid p-0">
            <div className="row global-carousel service-slider-1" data-slide-show="4" data-ml-slide-show="3" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1" data-dots="false">
              {/* Service cards will be dynamically rendered from API */}
              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_1-1.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Tons of Equipment</button></h4>
                    <p className="service-card_text">Lacinia montes est odio tpor volutpat rhoncus quisque sagittis</p>
                    <a href="#/service-details" className="link-btn" tabindex="0">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_1-2.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Rows of Cardio</button></h4>
                    <p className="service-card_text">Lacinia montes est odio tpor volutpat rhoncus quisque sagittis</p>
                    <a href="#/service-details" className="link-btn" tabindex="0">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_1-3.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Heart Pumping</button></h4>
                    <p className="service-card_text">Lacinia montes est odio tpor volutpat rhoncus quisque sagittis</p>
                    <a href="#/service-details" className="link-btn" tabindex="0">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_1-4.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Strength Training</button></h4>
                    <p className="service-card_text">Lacinia montes est odio tpor volutpat rhoncus quisque sagittis</p>
                    <a href="#/service-details" className="link-btn" tabindex="0">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Why-choose-us Area */}
        <div className="wcu-area-1 space-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="wcu-thumb">
                  <img className="img-1" src="/assets/img/normal/wcu_1-2.png" alt="img"/>
                  <div className="img-2 jump">
                    <img src="/assets/img/normal/wcu_1-1.png" alt="img"/>
                  </div>
                  <div className="wcu-grid jump2">
                    <div className="icon">
                      <img src="/assets/img/icon/wcu-icon_1-1.svg" alt="img"/>
                    </div>
                    <div className="details">
                      <h3 className="wcu-grid_year"><span className="counter-number">25</span>+</h3>
                      <span className="wcu-grid_text">Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="wcu-wrap">
                  <div className="title-area mb-50">
                    <span className="sub-title">Why Choose Us?</span>
                    <h2 className="sec-title text-white">Why Choose Us?</h2>
                    <p className="sec-text text-white">Sed ut perspiciatis unde omnis iste natus voluptatem accusantium dolore mque laudantium aperiam eaquecy inventore veritatis</p>
                  </div>
                  <div className="accordion-area accordion" id="faqAccordion">

                    <div className="accordion-card active">
                      <div className="accordion-header" id="collapse-item-1">
                        <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1"> What are your gym's operating hours?</button>
                      </div>
                      <div id="collapse-1" className="accordion-collapse collapse show" aria-labelledby="collapse-item-1" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          <p className="faq-text">Our standard membership provides access to our gym facilities during regular operating hours. This option is ideal for individuals who prefer independent workouts and want to make use of our state</p>
                        </div>
                      </div>
                    </div>


                    <div className="accordion-card ">
                      <div className="accordion-header" id="collapse-item-2">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2"> What amenities and facilities does your gym offer?</button>
                      </div>
                      <div id="collapse-2" className="accordion-collapse collapse " aria-labelledby="collapse-item-2" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          <p className="faq-text">Professionally are many variations of passages the majority have suffered alteration in some fo injected humour, or randomised words believable.</p>
                        </div>
                      </div>
                    </div>


                    <div className="accordion-card ">
                      <div className="accordion-header" id="collapse-item-3">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-3" aria-expanded="false" aria-controls="collapse-3"> Do you provide personal training services?</button>
                      </div>
                      <div id="collapse-3" className="accordion-collapse collapse " aria-labelledby="collapse-item-3" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          <p className="faq-text">Contributors are many variations of passages the majority have suffered alteration in some fo injected humour, or randomised words believable.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sec-shape-bottom">
          <img src="/assets/img/bg/sec-shape-bottom.png" alt="img"/>
        </div>

        {/* Service Area 02 */}
        <div className="service-area-2 space overflow-hidden">
          <div className="container">
            <div className="title-area text-center">
              <span className="sub-title">Our Services</span>
              <h2 className="sec-title">Service We Provide</h2>
            </div>
          </div>
          <div className="container">
            <div className="row global-carousel service-slider-2 slider-shadow" data-slide-show="3" data-ml-slide-show="3" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1" data-xs-slide-show="1" data-dots="false">
              <div className="col-lg-4 col-md-6">
                <div className="service-card style2">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_2-1.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Gym Fitness Class</button></h4>
                    <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                    <a href="#/service-details" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card style2">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_2-2.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Power Lifting</button></h4>
                    <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                    <a href="#/service-details" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card style2">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_2-3.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Body Building</button></h4>
                    <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                    <a href="#/service-details" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card style2">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_2-1.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Gym Fitness Class</button></h4>
                    <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                    <a href="#/service-details" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card style2">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_2-2.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Power Lifting</button></h4>
                    <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                    <a href="#/service-details" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card style2">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_2-3.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/service-details'}>Body Building</button></h4>
                    <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                    <a href="#/service-details" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Testimonials Section */}
      <div className="testimonial-area-1 overflow-hidden">
        <div className="testimonial-bg-thumb1">
          <div className="thumb">
            <img src="/assets/img/testimonial/testi_bg1.png" alt="img" />
          </div>
        </div>
        <div className="space">
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-xl-8 col-lg-9">
                <div className="testi-box-wrap1 text-center" style={{ backgroundImage: "url('/assets/img/testimonial/testi_box-bg.png')" }}>
                  <div className="title-area">
                    <span className="sub-title">Feedbacks</span>
                    <h2 className="sec-title text-white">Trusted Testimonials</h2>
                  </div>
                  <div className="row global-carousel testi-slider-1" data-slide-show="1">
                    <div className="col-lg-6">
                      <div className="testi-box">
                        <div className="testi-box_thumb">
                          <img src="/assets/img/testimonial/testi_1_1.png" alt="testimonial client photo" />
                          <div className="block-quote">
                            <i className="fas fa-quote-right"></i>
                          </div>
                        </div>
                        <div className="testi-box_content">
                          <p className="testi-box_text">"I have been a member of Fitmas for over a year now, and it has been a game-changer for my fitness journey. The gym has a fantastic range of equipment that caters to all my workout needs...."</p>
                          <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="testi-box">
                        <div className="testi-box_thumb">
                          <img src="/assets/img/testimonial/testi_1_2.png" alt="testimonial client photo" />
                          <div className="block-quote">
                            <i className="fas fa-quote-right"></i>
                          </div>
                        </div>
                        <div className="testi-box_content">
                          <p className="testi-box_text">"I have been a member of Fitmas for over a year now, and it has been a game-changer for my fitness journey. The gym has a fantastic range of equipment that caters to all my workout needs...."</p>
                          <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="testi-box">
                        <div className="testi-box_thumb">
                          <img src="/assets/img/testimonial/testi_1_3.png" alt="testimonial client photo" />
                          <div className="block-quote">
                            <i className="fas fa-quote-right"></i>
                          </div>
                        </div>
                        <div className="testi-box_content">
                          <p className="testi-box_text">"I have been a member of Fitmas for over a year now, and it has been a game-changer for my fitness journey. The gym has a fantastic range of equipment that caters to all my workout needs...."</p>
                          <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="testi-slider-controller" data-sliderNavfor=".testi-slider-1">
                    <a className="indicatior-btn active">
                      <div className="testi-box_profile">
                        <h4 className="testi-box_name">Andrew Daniel</h4>
                        <span className="testi-box_desig">Gym Student</span>
                      </div>
                    </a>
                    <a className="indicatior-btn">
                      <div className="testi-box_profile">
                        <h4 className="testi-box_name">Mike Harison</h4>
                        <span className="testi-box_desig">Gym Student</span>
                      </div>
                    </a>
                    <a className="indicatior-btn">
                      <div className="testi-box_profile">
                        <h4 className="testi-box_name">William Henry</h4>
                        <span className="testi-box_desig">Gym Student</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Area */}
      <div className="counter-area-1" style={{ backgroundImage: "url('/assets/img/bg/counter-bg1.png')" }}>
        <div className="counter-sec-shape-top">
          <img src="/assets/img/bg/sec-shape-top.png" alt="img" />
        </div>
        <div className="counter-wrap1 space">
          <div className="container">
            <div className="row gy-40 justify-content-between">
              <div className="col-sm-6 col-xl-auto">
                <div className="counter-card">
                  <div className="counter-card_icon">
                    <img src="/assets/img/icon/counter-icon_1-1.svg" alt="counter icon" />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-card_number"><span className="counter-number">4.8</span>K</h2>
                    <p className="counter-card_text">JOBS COMPLETED</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-auto">
                <div className="counter-card">
                  <div className="counter-card_icon">
                    <img src="/assets/img/icon/counter-icon_1-2.svg" alt="activity counter icon" />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-card_number"><span className="counter-number">325</span></h2>
                    <p className="counter-card_text">MEDIA ACTIVITIES</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-auto">
                <div className="counter-card">
                  <div className="counter-card_icon">
                    <img src="/assets/img/icon/counter-icon_1-3.svg" alt="expert counter icon" />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-card_number"><span className="counter-number">598</span></h2>
                    <p className="counter-card_text">SKILLED EXPERTS</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-auto">
                <div className="counter-card">
                  <div className="counter-card_icon">
                    <img src="/assets/img/icon/counter-icon_1-4.svg" alt="client counter icon" />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-card_number"><span className="counter-number">36</span>K</h2>
                    <p className="counter-card_text">HAPPY CLIENTS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="counter-sec-shape-bottom">
          <img src="/assets/img/bg/sec-shape-bottom.png" alt="img" />
        </div>
      </div>

      {/* Team Area */}
      <div className="team-area-1 space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Our Trainer</span>
            <h2 className="sec-title">Meet Our Amazing Team</h2>
          </div>
          <div className="row global-carousel team-slider-1 slider-shadow" data-slide-show="4" data-ml-slide-show="4" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1" data-xs-slide-show="1" data-center-mode="true">
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-1.png" alt="img" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team-details'}>George Thomas</button></h4>
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
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team-details'}>Mike Johnson</button></h4>
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
                  <img src="/assets/img/team/team-3.png" alt="img" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team-details'}>Amelia Harper</button></h4>
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
                  <img src="/assets/img/team/team-4.png" alt="img" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team-details'}>Oliver Samuel</button></h4>
                  <span className="team-card_desig">CEO/Founder</span>
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

      {/* Pricing Plan Area */}
      <div className="pricing-area">
        <div className="container">
          <div className="title-area text-center">
            <h3 className="sub-title">Pricing Plan</h3>
            <h2 className="sec-title">Our Pricing Plan</h2>
          </div>
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card">
                <div className="pricing-card_bg">
                  <img src="/assets/img/bg/pricing-card1-bg.png" alt="img" />
                </div>
                <div className="pricing-card_icon">
                  <img src="/assets/img/icon/picing-icon_1-1.svg" alt="img" />
                </div>
                <h3 className="pricing-card_title">Basic Membership</h3>
                <h4 className="pricing-card_price"><span className="currency">$</span>19<span className="duration">/month</span></h4>
                <p className="pricing-card_content">This category typically offers access to the gym's facilities and equipment.</p>
                <div className="checklist">
                  <ul>
                    <li><i className="far fa-check-circle"></i>12 trainings</li>
                    <li><i className="far fa-check-circle"></i>Free shower & lockers</li>
                    <li><i className="far fa-check-circle"></i>Personal yoga mat</li>
                    <li><i className="far fa-check-circle"></i>Free parking</li>
                  </ul>
                </div>
                <button onClick={() => window.location.href = '#/pricing'} className="btn style2">Choose This Plan</button>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card pricing-card_active">
                <div className="pricing-card_bg">
                  <img src="/assets/img/bg/pricing-card1-bg.png" alt="img" />
                </div>
                <div className="pricing-card_icon">
                  <img src="/assets/img/icon/picing-icon_1-2.svg" alt="img" />
                </div>
                <h3 className="pricing-card_title">Standard Membership</h3>
                <h4 className="pricing-card_price"><span className="currency">$</span>39<span className="duration">/month</span></h4>
                <p className="pricing-card_content">This category typically offers access to the gym's facilities and equipment.</p>
                <div className="checklist">
                  <ul>
                    <li><i className="far fa-check-circle"></i>12 trainings</li>
                    <li><i className="far fa-check-circle"></i>Free shower & lockers</li>
                    <li><i className="far fa-check-circle"></i>Personal yoga mat</li>
                    <li><i className="far fa-check-circle"></i>Free parking</li>
                  </ul>
                </div>
                <button onClick={() => window.location.href = '#/pricing'} className="btn style2">Choose This Plan</button>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card">
                <div className="pricing-card_bg">
                  <img src="/assets/img/bg/pricing-card1-bg.png" alt="img" />
                </div>
                <div className="pricing-card_icon">
                  <img src="/assets/img/icon/picing-icon_1-3.svg" alt="img" />
                </div>
                <h3 className="pricing-card_title">Ultimate Membership</h3>
                <h4 className="pricing-card_price"><span className="currency">$</span>69<span className="duration">/month</span></h4>
                <p className="pricing-card_content">This category typically offers access to the gym's facilities and equipment.</p>
                <div className="checklist">
                  <ul>
                    <li><i className="far fa-check-circle"></i>12 trainings</li>
                    <li><i className="far fa-check-circle"></i>Free shower & lockers</li>
                    <li><i className="far fa-check-circle"></i>Personal yoga mat</li>
                    <li><i className="far fa-check-circle"></i>Free parking</li>
                  </ul>
                </div>
                <button onClick={() => window.location.href = '#/pricing'} className="btn style2">Choose This Plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Area */}
      <section className="goal-area space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-lg-2 text-lg-end">
              <div className="goal-thumb-1 mb-40 mb-lg-0">
                <img src="/assets/img/normal/goal_1-1.png" alt="fitness training gym photo" />
                <div className="goal-badge-wrap">
                  <div className="goal-badge">We Have Train More Than  <span className="counter-number">1580</span>+ Students</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="title-area">
                <span className="sub-title">Fitmas Goal</span>
                <h2 className="sec-title">Unlock Your Full Potential, Achieve Your Fitness Goals.</h2>
              </div>
              <div className="about-grid">
                <div className="about-grid_icon">
                  <img src="/assets/img/icon/goal-icon_1-1.svg" alt="img" />
                </div>
                <div className="about-grid_content">
                  <h4 className="about-grid_title">Free Fitness Training</h4>
                  <p className="about-grid_text">Pedal your way to fitness in our specialized indoor cycling studio. Equipped with stationary bikes...</p>
                </div>
              </div>
              <div className="about-grid">
                <div className="about-grid_icon">
                  <img src="/assets/img/icon/goal-icon_1-2.svg" alt="img" />
                </div>
                <div className="about-grid_content">
                  <h4 className="about-grid_title">Cardio and Strength</h4>
                  <p className="about-grid_text">Pedal your way to fitness in our specialized indoor cycling studio. Equipped with stationary bikes...</p>
                </div>
              </div>
              <button onClick={() => window.location.href = '#/service-details'} className="btn btn-border2">Read Details</button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-area space bg-smoke3">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Blog Posts</span>
            <h2 className="sec-title">Read Our Latest Articles</h2>
          </div>
          <div className="row global-carousel blog-slider" data-slide-show="3" data-lg-slide-show="2" data-md-slide-show="2" data-sm-slide-show="1" data-xs-slide-show="1" data-dots="false" data-md-dots="true">
            <div className="col-md-6 col-lg-4">
              <div className="blog-card">
                <div className="blog-img">
                  <img src="/assets/img/blog/blog_1_1.png" alt="blog image" />
                </div>
                <div className="blog-content" style={{ backgroundImage: "url('/assets/img/blog/blog_card1_bg.png')" }}>
                  <div className="blog-meta">
                    <button onClick={() => window.location.href = '#/blog'}><i className="fal fa-calendar"></i>15 Dec 2023</button>
                    <button onClick={() => window.location.href = '#/blog'}><i className="far fa-user"></i>by Andrew</button>
                  </div>
                  <h3 className="blog-title box-title"><button onClick={() => window.location.href = '#/blog-details'}>Nutrition Tips and Advice for Gym Goers</button></h3>
                  <p className="blog-text">These specialized memberships are designed to make fitness accessible and affordable for these specific...</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="blog-card">
                <div className="blog-img">
                  <img src="/assets/img/blog/blog_1_2.png" alt="blog image" />
                </div>
                <div className="blog-content" style={{ backgroundImage: "url('/assets/img/blog/blog_card1_bg.png')" }}>
                  <div className="blog-meta">
                    <button onClick={() => window.location.href = '#/blog'}><i className="fal fa-calendar"></i>15 Dec 2023</button>
                    <button onClick={() => window.location.href = '#/blog'}><i className="far fa-user"></i>by Andrew</button>
                  </div>
                  <h3 className="blog-title box-title"><button onClick={() => window.location.href = '#/blog-details'}>Uncover Your True Potential at Fitmas</button></h3>
                  <p className="blog-text">If you're visiting the area or want to bring a friend along for a workout, we offer day passes and guest passes...</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="blog-card">
                <div className="blog-img">
                  <img src="/assets/img/blog/blog_1_3.png" alt="blog image" />
                </div>
                <div className="blog-content" style={{ backgroundImage: "url('/assets/img/blog/blog_card1_bg.png')" }}>
                  <div className="blog-meta">
                    <button onClick={() => window.location.href = '#/blog'}><i className="fal fa-calendar"></i>15 Dec 2023</button>
                    <button onClick={() => window.location.href = '#/blog'}><i className="far fa-user"></i>by Andrew</button>
                  </div>
                  <h3 className="blog-title box-title"><button onClick={() => window.location.href = '#/blog-details'}>Offer discounted options for students seniors</button></h3>
                  <p className="blog-text">We understand the importance of fitness for the whole family. Our family option allows multiple family...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// HomeVariant2 - BMI Calculator & Schedule
const HomeVariant2 = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section - Home 2 */}
      <div className="hero-wrapper hero-2" id="hero">
        <div className="global-carousel" id="heroSlider2" data-fade="true" data-slide-show="1" data-lg-slide-show="1" data-md-slide-show="1" data-sm-slide-show="1" data-xs-slide-show="1" data-arrows="true" data-xl-arrows="true" data-ml-arrows="true">
          <div className="hero-slider" style={{ backgroundImage: "url('/assets/img/hero/hero_bg_2_1.png')" }}>
            <div className="hero-shape2-1 shape-mockup movingX" data-bottom="-165px" data-left="0">
              <img src="/assets/img/hero/hero_shape_2-1.png" alt="img" />
            </div>
            <div className="hero-shape2-2 shape-mockup jump2" data-bottom="-50px" data-right="-10%">
              <img src="/assets/img/hero/hero_shape_2-2.png" alt="img" />
            </div>
            <div className="hero-shape2-3 shape-mockup jump2" data-top="-30%" data-left="-30%">
              <img src="/assets/img/hero/hero_shape_2-3.png" alt="img" />
            </div>
            <div className="container">
              <div className="row justify-content-lg-end justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-9">
                  <div className="hero-style2">
                    <span className="hero-subtitle fw-medium">Grow Your</span>
                    <h1 className="hero-title text-white">Strength</h1>
                    <span className="hero-subtitle fw-semibold">WITH Fitmas</span>
                    <div className="btn-group">
                      <button onClick={() => window.location.href = '#/contact'}>Make Appointment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slider" style={{ backgroundImage: "url('/assets/img/hero/hero_bg_2_2.png')" }}>
            <div className="hero-shape2-1 shape-mockup movingX" data-bottom="-165px" data-left="0">
              <img src="/assets/img/hero/hero_shape_2-1.png" alt="img" />
            </div>
            <div className="hero-shape2-2 shape-mockup jump2" data-bottom="-50px" data-right="-10%">
              <img src="/assets/img/hero/hero_shape_2-2.png" alt="img" />
            </div>
            <div className="hero-shape2-3 shape-mockup jump2" data-top="-30%" data-left="-30%">
              <img src="/assets/img/hero/hero_shape_2-3.png" alt="img" />
            </div>
            <div className="container">
              <div className="row justify-content-lg-end justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-9">
                  <div className="hero-style2">
                    <span className="hero-subtitle fw-medium">Grow Your</span>
                    <h1 className="hero-title text-white">Strength</h1>
                    <span className="hero-subtitle fw-semibold">WITH Fitmas</span>
                    <div className="btn-group">
                      <button onClick={() => window.location.href = '#/contact'}>Make Appointment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-arrow">
          <button onClick={() => setCurrentHeroSlide((currentHeroSlide - 1 + 2) % 2)} className="slick-arrow slick-prev">PREV</button>
          <button onClick={() => setCurrentHeroSlide((currentHeroSlide + 1) % 2)} className="slick-arrow slick-next">NEXT</button>
        </div>
      </div>

      {/* BMI Calculator Section */}
      <div className="service-bg2-area space overflow-hidden">
        <div className="bmi-area-1 space">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="title-area mb-30">
                  <span className="sub-title">TEST YOUR BMI</span>
                  <h2 className="sec-title text-white fw-semibold">BODY MASS INDEX</h2>
                  <p className="sec-text">BMI is a widely used tool for assessing body weight relative to height. It can provide a general indication of whether an individual falls within a healthy weight range.</p>
                </div>
                <div className="bmi-table mb-lg-0 mb-40">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">BMI</th>
                        <th scope="col">WEIGHT STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><th scope="row">Below 18.5</th><td>Underweight</td></tr>
                      <tr><th scope="row">18.5 - 24.9</th><td>Healthy</td></tr>
                      <tr><th scope="row">25.0 - 29.9</th><td>Overweight</td></tr>
                      <tr><th scope="row">30.0 - Above</th><td>Obese</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-6 align-self-end">
                <div className="bmi-calculator-form">
                  <h4 className="form-title">Book Your Seat:</h4>
                  <form className="bmi-form" id="form" name="bmiCalc">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input className="form-control style-border" placeholder="Weight / KG" type="text" name="weight" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input className="form-control style-border" placeholder="Height / CM" type="text" name="height" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input type="number" className="form-control style-border" name="age" placeholder="Age" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input type="text" className="form-control style-border" name="sex" placeholder="Sex" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input className="form-control style-border" placeholder="Your BMI" type="text" name="bmi" />
                    </div>
                    <div className="form-group">
                      <input placeholder="This Means" className="form-control style-border" type="text" name="meaning" />
                    </div>
                    <div className="btn style3">
                      <input type="button" value="Calculate BMI" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="service-area-1 space-bottom overflow-hidden">
          <div className="container">
            <div className="title-area">
              <span className="sub-title">Our Features</span>
              <h2 className="sec-title text-white fw-semibold">SERVICES WE'RE OFFERING</h2>
            </div>
          </div>
          <div className="container-fluid p-0">
            <div className="row global-carousel service-slider-1 style2" data-slide-show="4" data-ml-slide-show="3" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1" data-xs-slide-show="1" data-dots="false">
              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_1-1.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/services'}>Tons of Equipment</button></h4>
                    <p className="service-card_text">Lacinia montes est odio tpor volutpat rhoncus quisque sagittis</p>
                    <a href="#/services" className="link-btn" tabindex="0">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_1-2.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/services'}>Rows of Cardio</button></h4>
                    <p className="service-card_text">Lacinia montes est odio tpor volutpat rhoncus quisque sagittis</p>
                    <a href="#/services" className="link-btn" tabindex="0">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_1-3.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/services'}>Heart Pumping</button></h4>
                    <p className="service-card_text">Lacinia montes est odio tpor volutpat rhoncus quisque sagittis</p>
                    <a href="#/services" className="link-btn" tabindex="0">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-card_icon">
                    <img src="/assets/img/icon/service-icon_1-4.svg" alt="img" />
                  </div>
                  <div className="service-card_content">
                    <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/services'}>Strength Training</button></h4>
                    <p className="service-card_text">Lacinia montes est odio tpor volutpat rhoncus quisque sagittis</p>
                    <a href="#/services" className="link-btn" tabindex="0">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sec-shape2-bottom">
          <img src="/assets/img/bg/sec-shape2-top.png" alt="img" />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="wcu-area-1 space-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="wcu-thumb">
                <img className="img-1" src="/assets/img/normal/wcu_1-2.png" alt="img" />
                <div className="img-2 jump">
                  <img src="/assets/img/normal/wcu_1-1.png" alt="img" />
                </div>
                <div className="wcu-grid jump2">
                  <div className="icon">
                    <img src="/assets/img/icon/wcu-icon_1-1.svg" alt="img" />
                  </div>
                  <div className="details">
                    <h3 className="wcu-grid_year"><span className="counter-number">25</span>+</h3>
                    <span className="wcu-grid_text">Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="wcu-wrap">
                <div className="title-area mb-50">
                  <span className="sub-title">Why Choose Us?</span>
                  <h2 className="sec-title text-white">Why Choose Us?</h2>
                  <p className="sec-text text-white">Sed ut perspiciatis unde omnis iste natus voluptatem accusantium dolore mque laudantium aperiam eaquecy inventore veritatis</p>
                </div>
                <div className="accordion-area accordion" id="faqAccordion">
                  <div className="accordion-card active">
                    <div className="accordion-header" id="collapse-item-1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1">What are your gym's operating hours?</button>
                    </div>
                    <div id="collapse-1" className="accordion-collapse collapse show" aria-labelledby="collapse-item-1" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        <p className="faq-text">Our standard membership provides access to our gym facilities during regular operating hours. This option is ideal for individuals who prefer independent workouts and want to make use of our state</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-card">
                    <div className="accordion-header" id="collapse-item-2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2">What amenities and facilities does your gym offer?</button>
                    </div>
                    <div id="collapse-2" className="accordion-collapse collapse" aria-labelledby="collapse-item-2" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        <p className="faq-text">Professionally are many variations of passages the majority have suffered alteration in some fo injected humour, or randomised words believable.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-card">
                    <div className="accordion-header" id="collapse-item-3">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-3" aria-expanded="false" aria-controls="collapse-3">Do you provide personal training services?</button>
                    </div>
                    <div id="collapse-3" className="accordion-collapse collapse" aria-labelledby="collapse-item-3" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        <p className="faq-text">Contributors are many variations of passages the majority have suffered alteration in some fo injected humour, or randomised words believable.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-shape-bottom">
        <img src="/assets/img/bg/sec-shape-bottom.png" alt="img" />
      </div>

      {/* Service Area 02 */}
      <div className="service-area-2 space overflow-hidden">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Our Services</span>
            <h2 className="sec-title">Service We Provide</h2>
          </div>
        </div>
        <div className="container">
          <div className="row global-carousel service-slider-2 slider-shadow" data-slide-show="3" data-ml-slide-show="3" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1" data-xs-slide-show="1" data-dots="false">
            <div className="col-lg-4 col-md-6">
              <div className="service-card style2">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_2-1.svg" alt="img" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/services'}>Gym Fitness Class</button></h4>
                  <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                  <a href="#/services" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card style2">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_2-2.svg" alt="img" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/services'}>Power Lifting</button></h4>
                  <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                  <a href="#/services" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card style2">
                <div className="service-card_icon">
                  <img src="/assets/img/icon/service-icon_2-3.svg" alt="img" />
                </div>
                <div className="service-card_content">
                  <h4 className="service-card_title h5"><button onClick={() => window.location.href = '#/services'}>Body Building</button></h4>
                  <p className="service-card_text">High-intensity workouts that alternate between intense bursts of exercise and short recovery periods...</p>
                  <a href="#/services" className="link-btn" tabindex="0"><i className="fas fa-arrow-right"></i> Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Area */}
      <div className="counter-area-1" style={{ backgroundImage: "url('/assets/img/bg/counter-bg1.png')" }}>
        <div className="counter-sec-shape-top">
          <img src="/assets/img/bg/sec-shape-top.png" alt="img" />
        </div>
        <div className="counter-wrap1 space">
          <div className="container">
            <div className="row gy-40 justify-content-between">
              <div className="col-sm-6 col-xl-auto">
                <div className="counter-card">
                  <div className="counter-card_icon">
                    <img src="/assets/img/icon/counter-icon_1-1.svg" alt="counter icon" />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-card_number"><span className="counter-number">4.8</span>K</h2>
                    <p className="counter-card_text">JOBS COMPLETED</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-auto">
                <div className="counter-card">
                  <div className="counter-card_icon">
                    <img src="/assets/img/icon/counter-icon_1-2.svg" alt="activity counter icon" />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-card_number"><span className="counter-number">325</span></h2>
                    <p className="counter-card_text">MEDIA ACTIVITIES</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-auto">
                <div className="counter-card">
                  <div className="counter-card_icon">
                    <img src="/assets/img/icon/counter-icon_1-3.svg" alt="expert counter icon" />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-card_number"><span className="counter-number">598</span></h2>
                    <p className="counter-card_text">SKILLED EXPERTS</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-auto">
                <div className="counter-card">
                  <div className="counter-card_icon">
                    <img src="/assets/img/icon/counter-icon_1-4.svg" alt="client counter icon" />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-card_number"><span className="counter-number">36</span>K</h2>
                    <p className="counter-card_text">HAPPY CLIENTS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="counter-sec-shape-bottom">
          <img src="/assets/img/bg/sec-shape-bottom.png" alt="img" />
        </div>
      </div>

      {/* Team Area */}
      <div className="team-area-1 space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Our Trainer</span>
            <h2 className="sec-title">Meet Our Amazing Team</h2>
          </div>
          <div className="row global-carousel team-slider-1 slider-shadow" data-slide-show="4" data-ml-slide-show="4" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1" data-xs-slide-show="1" data-center-mode="true">
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-1.png" alt="img" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team'}>George Thomas</button></h4>
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
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team'}>Mike Johnson</button></h4>
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
                  <img src="/assets/img/team/team-3.png" alt="img" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team'}>Amelia Harper</button></h4>
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
                  <img src="/assets/img/team/team-4.png" alt="img" />
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team'}>Oliver Samuel</button></h4>
                  <span className="team-card_desig">CEO/Founder</span>
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

// Home Variant 3 - Complete replica of home-3.html
const HomeVariant3 = () => {
  return (
    <div className="home-page home-3">
      {/* Hero Section - Home 3 */}
      <div className="hero-wrapper hero-3" id="hero" style={{ backgroundImage: "url('/assets/img/hero/hero_bg_3_1.png')" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="hero-style3">
                <h1 className="hero-title text-white">REDEFINE YOUR LIMITS, EMBRACE THE JOURNEY.</h1>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="appointment-form bg-white">
                <h4 className="form-title">BOOK YOUR SEAT:</h4>
                <form action="mail.php" method="POST" className="bmi-form ajax-contact">
                  <div className="form-group">
                    <input type="text" className="form-control style-border2" name="person" placeholder="1 Person" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control style-border2" name="date" placeholder="Starting Date" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control style-border2" name="time" placeholder="Select Time" />
                  </div>
                  <div className="form-group">
                    <input type="number" className="form-control style-border2" name="number" placeholder="Phone No." />
                  </div>
                  <div className="form-btn col-12">
                    <button className="btn fw-bold style5 w-100">MAKE APPOINTMENT</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Area 2 */}
      <div className="feature-area-2 space text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="title-area">
                <span className="sub-title style2">Our Features</span>
                <h2 className="sec-title fw-bold">WELCOME TO OUR GYM & FITNESS STUDIO</h2>
              </div>
            </div>
          </div>
          <div className="row gy-40">
            <div className="col-lg-4">
              <div className="feature-card2">
                <div className="feature-card_img">
                  <img src="/assets/img/normal/feature_1-1.png" alt="No Long Term Contract" />
                  <a href="/services" className="feature-card_icon">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
                <h4 className="feature-card_title"><button onClick={() => window.location.href = '#/services'}>No Long Term Contract</button></h4>
                <p className="feature-card_text">We are proud to offer a gym membership with no long-term contract.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-card2">
                <div className="feature-card_img">
                  <img src="/assets/img/normal/feature_1-2.png" alt="Best Gym Equipment" />
                  <a href="/services" className="feature-card_icon">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
                <h4 className="feature-card_title"><button onClick={() => window.location.href = '#/services'}>Best Gym Equipment</button></h4>
                <p className="feature-card_text">We are proud to offer a gym membership with no long-term contract.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-card2">
                <div className="feature-card_img">
                  <img src="/assets/img/normal/feature_1-3.png" alt="Your Dedicated Gym App" />
                  <a href="/services" className="feature-card_icon">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
                <h4 className="feature-card_title"><button onClick={() => window.location.href = '#/services'}>Your Dedicated Gym App</button></h4>
                <p className="feature-card_text">We are proud to offer a gym membership with no long-term contract.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Area */}
      <div className="space" style={{ backgroundImage: "url('/assets/img/bg/about3-bg.png')" }}>
        <div className="container">
          <div className="row gy-80">
            <div className="col-xl-6 order-xl-2">
              <div className="about-thumb-2">
                <img className="about-img-1" src="/assets/img/normal/about_3-1.png" alt="About img" />
                <div className="about-thumb-num">01</div>
              </div>
            </div>
            <div className="col-xl-6 order-xl-1">
              <div className="about-content-wrap me-xl-4 mb-xl-0 mb-40">
                <div className="title-area mb-0">
                  <span className="sub-title style2">OUR BENEFITS</span>
                  <h2 className="sec-title fw-bold text-white">Unlock Your Potential, Unleash Your Greatness</h2>
                  <p className="sec-text mb-10">Define your specific bodybuilding goals. Determine what you want to achieve in terms of muscle size, strength, and overall physique. Set realistic and measurable goals that will guide your training and nutrition plan. Implement progressive overload principles in your training.</p>
                  <button onClick={() => window.location.href = '#/about'} className="btn style3">LEARN MORE</button>
                </div>
              </div>
            </div>
            <div className="col-xl-6 order-xl-3">
              <div className="about-thumb-2 style2">
                <img className="about-img-1" src="/assets/img/normal/about_3-2.png" alt="About img" />
                <div className="about-thumb-num">02</div>
              </div>
            </div>
            <div className="col-xl-6 order-xl-4">
              <div className="about-content-wrap ms-xl-4">
                <div className="title-area mb-0">
                  <span className="sub-title style2">Students BENEFITS</span>
                  <h2 className="sec-title fw-bold text-white">GET 50% OFF ON YOUR FIRST GYM PLAN</h2>
                  <p className="sec-text mb-10">Pay attention to your nutrition and consume a well-balanced diet that supports muscle growth and recovery. Focus on consuming sufficient protein to provide the building blocks for muscle repair and growth.</p>
                  <div className="checklist">
                    <h6 className="checklist-title text-white fw-semibold">Fitmas Special Services:</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <ul>
                          <li><i className="far fa-circle-check"></i>Emergency Solutions Anytime</li>
                          <li><i className="far fa-circle-check"></i>Affordable price upto 2 years</li>
                        </ul>
                      </div>
                      <div className="col-sm-6">
                        <ul>
                          <li><i className="far fa-circle-check"></i>Emergency Solutions Anytime</li>
                          <li><i className="far fa-circle-check"></i>Reliable & Experienced Team</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => window.location.href = '#/about'} className="btn style3">MAKE AN APPOINTMENT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Area 3 */}
      <div className="counter-area-3 space">
        <div className="container">
          <div className="row gy-4">
            <div className="col-sm-6 col-lg-3">
              <div className="counter-card style3" style={{ backgroundImage: "url('/assets/img/bg/counter-card-bg.png')" }}>
                <div className="media-body">
                  <div className="counter-circle">
                    <div className="progressbar">
                      <div className="circle" data-percent="75">
                        <div className="circle-num">75%</div>
                      </div>
                    </div>
                  </div>
                  <p className="counter-card_text">QUALITY SERVICE</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="counter-card style3" style={{ backgroundImage: "url('/assets/img/bg/counter-card-bg.png')" }}>
                <div className="media-body">
                  <div className="counter-circle">
                    <div className="progressbar">
                      <div className="circle" data-percent="55">
                        <div className="circle-num">55%</div>
                      </div>
                    </div>
                  </div>
                  <p className="counter-card_text">SKILLED MEMBERS</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="counter-card style3" style={{ backgroundImage: "url('/assets/img/bg/counter-card-bg.png')" }}>
                <div className="media-body">
                  <div className="counter-circle">
                    <div className="progressbar">
                      <div className="circle" data-percent="85">
                        <div className="circle-num">85%</div>
                      </div>
                    </div>
                  </div>
                  <p className="counter-card_text">HAPPY CUSTOMERS</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="counter-card style3" style={{ backgroundImage: "url('/assets/img/bg/counter-card-bg.png')" }}>
                <div className="media-body">
                  <div className="counter-circle">
                    <div className="progressbar">
                      <div className="circle" data-percent="35">
                        <div className="circle-num">35%</div>
                      </div>
                    </div>
                  </div>
                  <p className="counter-card_text">PROJECT FAILS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Area 3 */}
      <div className="feature-area-3 space-bottom overflow-hidden">
        <div className="container">
          <div className="title-area">
            <span className="sub-title style2">Our Features</span>
            <h2 className="sec-title fw-bold">WHY SHOULD YOU BELIEVE US</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="feature-tab-button">
                <div className="filter-menu-active">
                  <button data-filter=".cat1" className="active" type="button">Where is your gym located? <i className="fas fa-circle-arrow-right"></i></button>
                  <button data-filter=".cat2" type="button">locker facilities available? <i className="fas fa-circle-arrow-right"></i></button>
                  <button data-filter=".cat3" type="button">parking available at the gym?<i className="fas fa-circle-arrow-right"></i></button>
                  <button data-filter=".cat4" type="button">How do I sign up for a membership?<i className="fas fa-circle-arrow-right"></i></button>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="feature-tab-content filter-active-cat1 mt-xl-0 mt-40">
                <div className="filter-item cat1">
                  <div className="tab-thumb">
                    <img src="/assets/img/normal/feature_3-1.png" alt="feature" />
                  </div>
                  <div className="tab-content mt-n1">
                    <p className="mt-n1"><span className="text-title">Interactiely network holistic convergence before equity invested technologies mesh standards</span> compliant growth strategies and tactical supply chains.</p>
                    <p className="mb-0">Impact products through user friendly manufactured products harness low risk high yield</p>
                    <div className="tab-content_grid">
                      <div className="media-left">
                        <h6 className="tab-content_grid-title">Started Journey</h6>
                        <span className="counter-number">1986</span>
                      </div>
                      <div className="media-body">
                        <div className="checklist">
                          <ul>
                            <li><i className="far fa-circle-check"></i>Emergency Solutions Anytime</li>
                            <li><i className="far fa-circle-check"></i>Affordable price upto 2 years</li>
                            <li><i className="far fa-circle-check"></i>Reliable & Experienced Team</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Area 3 */}
      <div className="team-area-3 space" style={{ backgroundImage: "url('/assets/img/bg/team-bg-3.png')" }}>
        <div className="container">
          <div className="title-area">
            <span className="sub-title style2">Our Team Members</span>
            <h2 className="sec-title text-white fw-bold">MEET OUR AMAZING TEAM</h2>
          </div>
          <div className="row global-carousel team-slider-3" data-slide-show="3" data-ml-slide-show="3" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1" data-xs-slide-show="1">
            <div className="col-lg-4 col-md-6">
              <div className="team-card style2">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-3-1.png" alt="team member" />
                </div>
                <div className="team-card_content">
                  <div className="social-btn">
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.discord.com/"><i className="fab fa-discord"></i></a>
                  </div>
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team'}>Andrew D. Willam</button>
                  </h4>
                  <span className="team-card_desig">Head of Production</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card style2">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-3-2.png" alt="team member" />
                </div>
                <div className="team-card_content">
                  <div className="social-btn">
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.discord.com/"><i className="fab fa-discord"></i></a>
                  </div>
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team'}>Hiltoni W. Marcel</button>
                  </h4>
                  <span className="team-card_desig">Head of Production</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card style2">
                <div className="team-card_img">
                  <img src="/assets/img/team/team-3-3.png" alt="team member" />
                </div>
                <div className="team-card_content">
                  <div className="social-btn">
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.discord.com/"><i className="fab fa-discord"></i></a>
                  </div>
                  <h4 className="team-card_title"><button onClick={() => window.location.href = '#/team'}>Maliona D. Walton</button>
                  </h4>
                  <span className="team-card_desig">Head of Production</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Area 02 */}
      <div className="testimonial-area-2 space overflow-hidden">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="title-area text-center">
                <span className="sub-title style2">Student Feedbacks</span>
                <h2 className="sec-title fw-bold">WHAT THEY'RE TALKING ABOUT US.</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="testi-box-wrap2 text-center">
                <div className="row global-carousel testi-slider-2" data-slide-show="1">
                  <div className="col-lg-6">
                    <div className="testi-box style2">
                      <div className="testi-box_thumb">
                        <img src="/assets/img/testimonial/testi_1_1.png" alt="testimonial" />
                      </div>
                      <div className="testi-box_content">
                        <p className="testi-box_text">"I recently started my fitness journey, and Fitmas has been instrumental in helping me achieve my goals. The trainers are incredibly supportive and understanding of may limitations"..</p>
                      </div>
                      <div className="testi-box_profile">
                        <h4 className="testi-box_name">By David Smith</h4>
                        <span className="testi-box_desig">Boxing Student</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="testi-box style2">
                      <div className="testi-box_thumb">
                        <img src="/assets/img/testimonial/testi_1_2.png" alt="testimonial" />
                      </div>
                      <div className="testi-box_content">
                        <p className="testi-box_text">"I recently started my fitness journey, and Fitmas has been instrumental in helping me achieve my goals. The trainers are incredibly supportive and understanding of may limitations"..</p>
                      </div>
                      <div className="testi-box_profile">
                        <h4 className="testi-box_name">By David Smith</h4>
                        <span className="testi-box_desig">Boxing Student</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testi-arrow">
                  <button className="slick-arrow slick-prev"><i className="fa-light fa-arrow-left"></i></button>
                  <button className="slick-arrow slick-next"><i className="fa-light fa-arrow-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Area 2 */}
      <div className="portfolio-area-2 space-top" style={{ backgroundImage: "url('/assets/img/bg/portfolio-bg-2.png')" }}>
        <div className="container">
          <div className="title-area">
            <h3 className="sub-title style2">Our Features</h3>
            <h2 className="sec-title fw-bold text-white">PHOTOS FROM GALLERY</h2>
          </div>
        </div>
        <div className="container-fluid px-15">
          <div className="row global-carousel portfolio-slider2" data-slide-show="4" data-ml-slide-show="3" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1" data-arrows="false">
            <div className="col-md-6 col-xl-4">
              <div className="project-card">
                <div className="project-img">
                  <img src="/assets/img/project/project2_1.png" alt="project" />
                </div>
                <div className="project-content">
                  <h6 className="project-subtitle">Premier Logistics</h6>
                  <h4 className="project-title"><button onClick={() => window.location.href = '#/gallery'}>Door To Fast Parcel</button></h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="project-card style2">
                <div className="project-img">
                  <img src="/assets/img/project/project2_2.png" alt="project" />
                </div>
                <div className="project-content">
                  <h6 className="project-subtitle">Premier Logistics</h6>
                  <h4 className="project-title"><button onClick={() => window.location.href = '#/gallery'}>Door To Fast Parcel</button></h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="project-card style2">
                <div className="project-img">
                  <img src="/assets/img/project/project2_3.png" alt="project" />
                </div>
                <div className="project-content">
                  <h6 className="project-subtitle">Premier Logistics</h6>
                  <h4 className="project-title"><button onClick={() => window.location.href = '#/gallery'}>Door To Fast Parcel</button></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Area */}
      <section className="goal-area space">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="goal-thumb-3 mb-40 mb-xl-0 me-xl-5">
                <div className="img-1">
                  <img src="/assets/img/normal/goal_3-1.png" alt="goal img" />
                </div>
                <div className="wcu-grid style2 movingX">
                  <div className="icon">
                    <img src="/assets/img/icon/wcu-icon_1-1.svg" alt="icon" />
                  </div>
                  <div className="details">
                    <h3 className="wcu-grid_year"><span className="counter-number">25</span>+</h3>
                    <span className="wcu-grid_text">Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8">
              <div className="title-area">
                <span className="sub-title style2">Fitmas Goal</span>
                <h2 className="sec-title fw-bold">UNLOCK YOUR FULL POTENTIAL, ACHIEVE YOUR FITNESS GOALS.</h2>
              </div>
              <div className="goal-grid-wrap">
                <div className="about-grid style3">
                  <div className="about-grid_icon">
                    <img src="/assets/img/icon/goal-icon_1-1.svg" alt="goal icon" />
                  </div>
                  <div className="about-grid_content">
                    <h4 className="about-grid_title">Free Fitness Training</h4>
                    <p className="about-grid_text">Pedal your way to fitness in our specialized indoor cycling studio. Equipped with stationary bikes...</p>
                  </div>
                </div>
                <div className="about-grid style3">
                  <div className="about-grid_icon">
                    <img src="/assets/img/icon/goal-icon_1-2.svg" alt="goal icon" />
                  </div>
                  <div className="about-grid_content">
                    <h4 className="about-grid_title">Cardio and Strength</h4>
                    <p className="about-grid_text">Pedal your way to fitness in our specialized indoor cycling studio. Equipped with stationary bikes...</p>
                  </div>
                </div>
                <div className="btn-wrap">
                  <button onClick={() => window.location.href = '#/services'} className="btn style6">LEARN MORE</button>
                  <button onClick={() => window.location.href = '#/services'} className="btn btn-border4">VIEW SERVICES</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Area 3 */}
      <section className="blog-area-3 space" style={{ backgroundImage: "url('/assets/img/bg/blog3-bg.png')" }}>
        <div className="blog-bg-thumb shape-mockup img-half img-right">
          <img src="/assets/img/bg/blog3-bg-thumb.png" alt="blog bg" />
        </div>
        <div className="container">
          <div className="title-area">
            <span className="sub-title style2">Fitmas Goal</span>
            <h2 className="sec-title fw-bold text-white">LATEST BLOG INSIGHTS</h2>
          </div>
          <div className="row">
            <div className="col-xl-7 col-lg-8">
              <div className="blog-card style3">
                <div className="blog-date">
                  <span>02</span>AUG
                </div>
                <div className="blog-content">
                  <span className="blog-category">Fitness Health</span>
                  <h3 className="blog-title box-title"><button onClick={() => window.location.href = '#/blog'}>Most Traditional Gym Fitness Blog 2023 Is Here For Your Schedule</button></h3>
                  <div className="blog-meta">
                    <button onClick={() => window.location.href = '#/blog'}><i className="far fa-user"></i> Post by: Admin</button>
                  </div>
                </div>
              </div>
              <div className="blog-card style3">
                <div className="blog-date">
                  <span>02</span>AUG
                </div>
                <div className="blog-content">
                  <span className="blog-category">Fitness Health</span>
                  <h3 className="blog-title box-title"><button onClick={() => window.location.href = '#/blog'}>Most Traditional Gym Fitness Blog 2023 Is Here For Your Schedule</button></h3>
                  <div className="blog-meta">
                    <button onClick={() => window.location.href = '#/blog'}><i className="far fa-user"></i> Post by: Admin</button>
                  </div>
                </div>
              </div>
              <div className="blog-card style3">
                <div className="blog-date">
                  <span>02</span>AUG
                </div>
                <div className="blog-content">
                  <span className="blog-category">Fitness Health</span>
                  <h3 className="blog-title box-title"><button onClick={() => window.location.href = '#/blog'}>Most Traditional Gym Fitness Blog 2023 Is Here For Your Schedule</button></h3>
                  <div className="blog-meta">
                    <button onClick={() => window.location.href = '#/blog'}><i className="far fa-user"></i> Post by: Admin</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goal area 02 */}
      <div className="goal-area-2 space">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-6 align-self-center order-xl-2">
              <div className="goal-thumb-4 mb-xl-0 mb-40">
                <img src="/assets/img/normal/goal_3-2.png" alt="goal img" />
              </div>
            </div>
            <div className="col-xl-6 order-xl-1">
              <div className="title-area">
                <span className="sub-title style2">Fitmas Goal</span>
                <h2 className="sec-title fw-bold">WE CAN GIVE A SHAPE OF YOUR BODY HERE!</h2>
                <p className="sec-text">Our team of experienced and certified trainers is dedicated to guiding and supporting you throughout your fitness journey. We understand that everyone's fitness journey is unique.</p>
                <div className="about-grid-wrap style2 mt-40">
                  <div className="about-grid style4">
                    <div className="about-grid_icon">
                      <img src="/assets/img/icon/wcu-icon_2-1.svg" alt="counter icon" />
                    </div>
                    <div className="about-grid_content">
                      <h4 className="about-grid_counter"><span className="counter-number">1500</span>+</h4>
                      <p className="about-grid_text">Trained People</p>
                    </div>
                  </div>
                  <div className="about-grid style4">
                    <div className="about-grid_icon">
                      <img src="/assets/img/icon/wcu-icon_2-2.svg" alt="counter icon" />
                    </div>
                    <div className="about-grid_content">
                      <h4 className="about-grid_counter"><span className="counter-number">1500</span>+</h4>
                      <p className="about-grid_text">Modern Equipment</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-wrap style2 mt-50">
                <button onClick={() => window.location.href = '#/about'} className="btn style6">MAKE AN APPOINTMENT</button>
                <div className="about-info-wrap style2">
                  <div className="icon bg-white"><i className="fas fa-phone"></i></div>
                  <div className="details">
                    <p className="about-info-title">Need Help?</p>
                    <a className="about-info-link" href="tel:+25825692582">+236-3256.21456</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact area */}
      <div className="contact-area">
        <div className="container">
          <div className="contact-card style2">
            <div className="info-card">
              <div className="info-card_icon">
                <i className="fas fa-location-dot"></i>
              </div>
              <div className="info-card_content">
                <p className="info-card_text">Gym Location</p>
                <a href="https://www.google.com/maps" className="info-card_link">Marina Lane Berlin</a>
              </div>
            </div>
            <div className="info-card style2" style={{ backgroundImage: "url('/assets/img/bg/contact-card-bg.png')" }}>
              <h6 className="info-card_title">Follow Us Now</h6>
              <div className="info-card_content">
                <div className="social-btn">
                  <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                  <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://www.discord.com/"><i className="fab fa-discord"></i></a>
                </div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card_icon">
                <i className="fas fa-phone-volume"></i>
              </div>
              <div className="info-card_content">
                <p className="info-card_text">Phone Number</p>
                <a href="tel:+18925382145" className="info-card_link">(+189) 2538-2145</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="map-sec">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7310056272386!2d89.2286059153658!3d24.00527418490799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b97badc6151%3A0x30b048c9fb2129bc!2s!5e0!3m2!1sen!2sbd!4v1651028958211!5m2!1sen!2sbd" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </div>
  );
};

export default Home;
