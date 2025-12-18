import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Determine header layout based on current route
  const isHeaderLayout3 = location.pathname === '/home-3' || location.pathname.includes('/home-3');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsSideMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Header Top - Only for layout1 (home-1 and home-2) */}
      {!isHeaderLayout3 && (
        <div className={`header-top d-lg-block ${isScrolled ? 'd-none' : 'd-none d-lg-block'}`}>
          <div className="container-fluid">
            <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
              <div className="col-auto d-none d-lg-block">
                <div className="header-links">
                  <ul>
                    <li>
                      <i className="far fa-envelope"></i>
                      <a href="mailto:fitmas@company.com">fitmas@company.com</a>
                    </li>
                    <li>
                      <i className="far fa-clock"></i>
                      Mon - Sat: 8.00 am-7.00 pm
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-auto">
                <div className="header-links">
                  <ul>
                    <li>
                      <div className="social-links">
                        <span className="me-3">Visit our social pages</span>
                        <a href="https://www.facebook.com/" aria-label="Facebook">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.twitter.com/" aria-label="Twitter">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.linkedin.com/" aria-label="LinkedIn">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.pinterest.com/" aria-label="Pinterest">
                          <i className="fab fa-pinterest-p"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Layout 1 (Home-1, Home-2, and all other pages) */}
      {!isHeaderLayout3 && (
        <header className={`nav-header header-layout1 ${isScrolled ? 'sticky-active' : ''}`}>
          <div className="sticky-wrapper">
            <div className="menu-area">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-start justify-content-between">
                  <div className="col-auto">
                    <div className="header-logo">
                      <Link to="/">
                        <img src="/assets/img/logo.svg" alt="Fitmas" />
                      </Link>
                    </div>
                  </div>

                  <div className="col-auto">
                    <nav className="main-menu d-none d-lg-inline-block">
                      <ul>
                        <li className="menu-item-has-children">
                          <Link to="#" className={location.pathname === '/' || location.pathname.startsWith('/home') ? 'active' : ''}>
                            Home
                          </Link>
                          <ul className="sub-menu">
                            <li><Link to="/">Home 01</Link></li>
                            <li><Link to="/home-2">Home 02</Link></li>
                            <li><Link to="/home-3">Home 03</Link></li>
                          </ul>
                        </li>

                        <li>
                          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                            About
                          </Link>
                        </li>

                        <li className="menu-item-has-children">
                          <Link to="/services" className={location.pathname.startsWith('/services') ? 'active' : ''}>
                            Service
                          </Link>
                          <ul className="sub-menu">
                            <li><Link to="/services">Service</Link></li>
                            <li><Link to="/services/general-fitness">Service Details</Link></li>
                          </ul>
                        </li>

                        <li className="menu-item-has-children">
                          <Link to="#" className={location.pathname.startsWith('/team') || location.pathname.startsWith('/gallery') || location.pathname.startsWith('/projects') ? 'active' : ''}>
                            Pages
                          </Link>
                          <ul className="sub-menu">
                            <li><Link to="/team">Team Page</Link></li>
                            <li><Link to="/gallery">Gallery Page</Link></li>
                            <li><Link to="/projects">Project Page</Link></li>
                            <li><Link to="/pricing">Pricing Page</Link></li>
                          </ul>
                        </li>

                        <li className="menu-item-has-children">
                          <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>
                            Blog
                          </Link>
                          <ul className="sub-menu">
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/blog/nutrition-tips">Blog Details</Link></li>
                          </ul>
                        </li>

                        <li>
                          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </nav>

                    <div className="navbar-right d-inline-flex d-lg-none">
                      <button type="button" className="menu-toggle icon-btn" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
                        <i className="far fa-bars"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-auto ms-auto d-lg-block d-none">
                    <div className="navbar-right-desc">
                      <i className="fas fa-phone-volume"></i>
                      <a href="tel:+2590256215">+259 (0) 256 215</a>
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="header-button">
                      <Link to="/contact" className="btn d-xl-block d-none">
                        Get a Quote
                      </Link>
                      <button type="button" className="btn btn-border sideMenuToggler" onClick={toggleSideMenu}>
                        <i className="far fa-bars"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Header Layout 3 (Home-3) */}
      {isHeaderLayout3 && (
        <header className={`nav-header header-layout3 ${isScrolled ? 'sticky-active' : ''}`}>
          <div className="sticky-wrapper2">
            <div className="menu-area">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-start justify-content-between">
                  <div className="col-auto d-lg-none">
                    <div className="header-logo">
                      <Link to="/">
                        <img src="/assets/img/logo.svg" alt="Fitmas" />
                      </Link>
                    </div>
                  </div>

                  <div className="col-auto d-xl-block d-none">
                    <div className="header-button">
                      <button type="button" className="btn btn-border4 sideMenuToggler" onClick={toggleSideMenu}>
                        <i className="far fa-bars"></i>
                      </button>
                      <button type="button" className="search-btn searchBoxToggler" onClick={toggleSearch}>
                        <i className="fa-regular fa-magnifying-glass"></i>Search
                      </button>
                    </div>
                  </div>

                  <div className="col-auto me-lg-auto d-none d-lg-inline-block">
                    <nav className="main-menu">
                      <ul>
                        <li className="menu-item-has-children">
                          <Link to="#" className={location.pathname === '/' || location.pathname.startsWith('/home') ? 'active' : ''}>
                            Home
                          </Link>
                          <ul className="sub-menu">
                            <li><Link to="/">Home 01</Link></li>
                            <li><Link to="/home-2">Home 02</Link></li>
                            <li><Link to="/home-3">Home 03</Link></li>
                          </ul>
                        </li>

                        <li>
                          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                            About
                          </Link>
                        </li>

                        <li className="menu-item-has-children">
                          <Link to="/services" className={location.pathname.startsWith('/services') ? 'active' : ''}>
                            Service
                          </Link>
                          <ul className="sub-menu">
                            <li><Link to="/services">Service</Link></li>
                            <li><Link to="/services/general-fitness">Service Details</Link></li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <div className="col-auto ms-auto d-xl-block d-none">
                    <div className="header-logo">
                      <Link to="/">
                        <img src="/assets/img/logo2.svg" alt="Fitmas" />
                      </Link>
                      <a className="sticky-logo" href="/">
                        <img src="/assets/img/logo.svg" alt="Fitmas" />
                      </a>
                      <span className="border-left"></span>
                      <span className="border-right"></span>
                    </div>
                  </div>

                  <div className="col-auto d-lg-block d-none">
                    <nav className="main-menu">
                      <ul>
                        <li className="menu-item-has-children">
                          <Link to="#" className={location.pathname.startsWith('/team') || location.pathname.startsWith('/gallery') || location.pathname.startsWith('/projects') ? 'active' : ''}>
                            Pages
                          </Link>
                          <ul className="sub-menu">
                            <li><Link to="/team">Team Page</Link></li>
                            <li><Link to="/gallery">Gallery Page</Link></li>
                            <li><Link to="/projects">Project Page</Link></li>
                            <li><Link to="/pricing">Pricing Page</Link></li>
                          </ul>
                        </li>

                        <li className="menu-item-has-children">
                          <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>
                            Blog
                          </Link>
                          <ul className="sub-menu">
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/blog/nutrition-tips">Blog Details</Link></li>
                          </ul>
                        </li>

                        <li>
                          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <div className="col-auto d-xl-block d-none">
                    <Link to="/contact" className="btn btn-border4">
                      JOIN CLASS NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu-wrapper ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-area text-center">
          <button className="menu-toggle" onClick={toggleMobileMenu}>
            <i className="fal fa-times"></i>
          </button>
          <div className="mobile-logo">
            <Link to="/" onClick={closeAllMenus}>
              <img src="/assets/img/logo.svg" alt="Fitmas" />
            </Link>
          </div>
          <div className="mobile-menu">
            <ul>
              <li className="menu-item-has-children">
                <Link to="#" onClick={(e) => e.preventDefault()}>Home</Link>
                <ul className="sub-menu">
                  <li><Link to="/" onClick={closeAllMenus}>Home 01</Link></li>
                  <li><Link to="/home-2" onClick={closeAllMenus}>Home 02</Link></li>
                  <li><Link to="/home-3" onClick={closeAllMenus}>Home 03</Link></li>
                </ul>
              </li>
              <li><Link to="/about" onClick={closeAllMenus}>About</Link></li>
              <li className="menu-item-has-children">
                <Link to="/services" onClick={closeAllMenus}>Service</Link>
                <ul className="sub-menu">
                  <li><Link to="/services" onClick={closeAllMenus}>Service</Link></li>
                  <li><Link to="/services/general-fitness" onClick={closeAllMenus}>Service Details</Link></li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <Link to="#" onClick={(e) => e.preventDefault()}>Pages</Link>
                <ul className="sub-menu">
                  <li><Link to="/team" onClick={closeAllMenus}>Team Page</Link></li>
                  <li><Link to="/gallery" onClick={closeAllMenus}>Gallery Page</Link></li>
                  <li><Link to="/projects" onClick={closeAllMenus}>Project Page</Link></li>
                  <li><Link to="/pricing" onClick={closeAllMenus}>Pricing Page</Link></li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <Link to="/blog" onClick={closeAllMenus}>Blog</Link>
                <ul className="sub-menu">
                  <li><Link to="/blog" onClick={closeAllMenus}>Blog</Link></li>
                  <li><Link to="/blog/nutrition-tips" onClick={closeAllMenus}>Blog Details</Link></li>
                </ul>
              </li>
              <li><Link to="/contact" onClick={closeAllMenus}>Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div className={`sidemenu-wrapper ${isSideMenuOpen ? 'show' : ''}`}>
        <div className="sidemenu-content">
          <button type="button" className="closeButton sideMenuCls" onClick={toggleSideMenu}>
            <i className="far fa-times"></i>
          </button>
          <div className="widget footer-widget">
            <div className="widget-about">
              <div className="footer-logo">
                <Link to="/" onClick={closeAllMenus}>
                  <img src="/assets/img/logo-white.svg" alt="Fitmas" />
                </Link>
              </div>
              <p className="about-text">
                A gym, also known as a fitness center or health club, is a facility
                dedicated to physical fitness and exercise gyms and typically offer a range.
              </p>
              <div className="social-btn style2">
                <a href="https://www.facebook.com/" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com/" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://pinterest.com/" aria-label="Pinterest">
                  <i className="fab fa-pinterest-p"></i>
                </a>
                <a href="https://instagram.com/" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="widget widget_nav_menu footer-widget">
            <h3 className="widget_title">Quick Links</h3>
            <ul className="menu">
              <li><Link to="/about" onClick={closeAllMenus}>About Us</Link></li>
              <li><Link to="/services/general-fitness" onClick={closeAllMenus}>Our Mission</Link></li>
              <li><Link to="/team" onClick={closeAllMenus}>Meet The Teams</Link></li>
              <li><Link to="/projects" onClick={closeAllMenus}>Our Projects</Link></li>
              <li><Link to="/contact" onClick={closeAllMenus}>Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      <div className={`popup-search-box ${isSearchOpen ? 'active' : ''}`}>
        <button className="searchClose" onClick={toggleSearch}>
          <i className="fal fa-times"></i>
        </button>
        <form action="#" className="search-form">
          <input type="text" placeholder="Search Here.." />
          <button type="submit"><i className="fal fa-search"></i></button>
        </form>
      </div>
    </>
  );
};

export default Header;
