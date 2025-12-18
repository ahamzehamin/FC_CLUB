import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / windowHeight) * 100;

      setIsVisible(scrollTop > 300);
      setScrollProgress(scrollPercent);
    };

    const handleProgressCircle = () => {
      const progressCircle = document.querySelector('.progress-circle path');
      if (progressCircle) {
        const pathLength = progressCircle.getTotalLength();
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        const dashArrayValue = pathLength * (scrollPercent / 100);
        progressCircle.style.strokeDashoffset = pathLength - dashArrayValue;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleProgressCircle);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleProgressCircle);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="footer-wrapper footer-layout1" style={{ backgroundImage: "url('/assets/img/bg/footer-1-bg.png')" }}>
        <div className="container">
          <div className="contact-card">
            <div className="info-card">
              <div className="info-card_icon">
                <i className="fas fa-location-dot"></i>
              </div>
              <div className="info-card_content">
                <p className="info-card_text">Gym Location</p>
                <a href="https://www.google.com/maps" className="info-card_link">Marina Lane Berlin</a>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card_icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-card_content">
                <p className="info-card_text">Email Address</p>
                <a href="mailto:health@Fitmas.com" className="info-card_link">health@Fitmas.com</a>
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

          <div className="widget-area">
            <div className="row justify-content-between">
              <div className="col-md-6 col-xl-3">
                <div className="widget footer-widget">
                  <div className="widget-about">
                    <div className="footer-logo">
                      <img src="/assets/img/logo-white.svg" alt="Fitmas" />
                    </div>
                    <p className="about-text">A gym, also known as a fitness center or health club, is a facility dedicated to physical fitness and exercise gyms and typically offer a range of equipment and services.</p>
                    <div className="social-btn">
                      <a href="https://twitter.com/" tabindex="0"><i className="fab fa-twitter"></i></a>
                      <a href="https://linkedin.com/" tabindex="0"><i className="fab fa-linkedin-in"></i></a>
                      <a href="https://www.discord.com/" tabindex="0"><i className="fab fa-discord"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-auto">
                <div className="widget widget_nav_menu footer-widget">
                  <h3 className="widget_title">Quick Links</h3>
                  <div className="menu-all-pages-container">
                    <ul className="menu">
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/services/general-fitness">Our Mission</Link></li>
                      <li><Link to="/team">Meet The Teams</Link></li>
                      <li><Link to="/gallery">Our Projects</Link></li>
                      <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-auto">
                <div className="widget footer-widget">
                  <h3 className="widget_title">Gallery</h3>
                  <div className="sidebar-gallery">
                    <div className="gallery-thumb">
                      <img src="/assets/img/widget/insta-feed1.png" alt="Gallery Image" />
                      <a href="/assets/img/widget/insta-feed1.png" className="gallery-btn popup-image">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                    <div className="gallery-thumb">
                      <img src="/assets/img/widget/insta-feed2.png" alt="Gallery Image" />
                      <a href="/assets/img/widget/insta-feed2.png" className="gallery-btn popup-image">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                    <div className="gallery-thumb">
                      <img src="/assets/img/widget/insta-feed3.png" alt="Gallery Image" />
                      <a href="/assets/img/widget/insta-feed3.png" className="gallery-btn popup-image">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                    <div className="gallery-thumb">
                      <img src="/assets/img/widget/insta-feed4.png" alt="Gallery Image" />
                      <a href="/assets/img/widget/insta-feed4.png" className="gallery-btn popup-image">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                    <div className="gallery-thumb">
                      <img src="/assets/img/widget/insta-feed5.png" alt="Gallery Image" />
                      <a href="/assets/img/widget/insta-feed5.png" className="gallery-btn popup-image">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                    <div className="gallery-thumb">
                      <img src="/assets/img/widget/insta-feed6.png" alt="Gallery Image" />
                      <a href="/assets/img/widget/insta-feed6.png" className="gallery-btn popup-image">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-3">
                <div className="widget footer-widget">
                  <h3 className="widget_title">Get Newsletter</h3>
                  <p className="footer-text">Get 10% off your first order! Hurry up</p>
                  <form className="newsletter-form">
                    <div className="form-group">
                      <i className="far fa-envelope"></i>
                      <input className="form-control" type="email" placeholder="Email Address" required="" />
                    </div>
                    <button type="submit" className="btn style2">SUBSCRIBE</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-wrap">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-auto align-self-center">
                <p className="copyright-text text-center">© 2023 <a href="#">Fitmas.</a> All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll To Top */}
      <div className={`scroll-top ${isVisible ? 'active' : ''}`} onClick={scrollToTop}>
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>
      </div>
    </>
  );
};

export default Footer;
