import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const response = await axios.get('/api/pricing');
      setPricingPlans(response.data.data || []);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Pricing Plans</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li className="active">PRICING</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pricing-area space">
        <div className="container">
          <div className="title-area text-center">
            <h3 className="sub-title">Pricing Plan</h3>
            <h2 className="sec-title">Our Pricing Plan</h2>
            <p className="sec-text">Choose the perfect membership plan for your fitness journey</p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="loading"></div>
            </div>
          ) : (
            <div className="row gy-4 justify-content-center">
              {pricingPlans.length > 0 ? (
                pricingPlans.map((plan) => (
                  <div key={plan._id} className={`col-lg-4 col-md-6 ${plan.isPopular ? 'popular' : ''}`}>
                    <div className={`pricing-card ${plan.isPopular ? 'pricing-card_active' : ''}`}>
                      <div className="pricing-card_bg">
                        <img src="/assets/img/bg/pricing-card1-bg.png" alt="pricing background" />
                      </div>
                      <div className="pricing-card_icon">
                        <img src={`/assets/img/icon/${plan.icon}`} alt={plan.planName} />
                      </div>
                      <h3 className="pricing-card_title">{plan.planName}</h3>
                      <h4 className="pricing-card_price">
                        <span className="currency">$</span>{plan.price}
                        <span className="duration">/{plan.duration}</span>
                      </h4>
                      <p className="pricing-card_content">{plan.description}</p>
                      <div className="checklist">
                        <ul>
                          {plan.features && plan.features.map((feature, idx) => (
                            <li key={idx}>
                              <i className="far fa-check-circle"></i> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="btn style2">
                        {plan.isPopular ? 'Get Started Today' : 'Choose This Plan'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No pricing plans available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-bottom bg-smoke3">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Frequently Asked Questions</span>
            <h2 className="sec-title">Common Questions</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion-area accordion" id="pricingAccordion">
                <div className="accordion-card active">
                  <div className="accordion-header" id="faq-1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-faq-1">
                      What payment methods do you accept?
                    </button>
                  </div>
                  <div id="collapse-faq-1" className="accordion-collapse collapse show" data-bs-parent="#pricingAccordion">
                    <div className="accordion-body">
                      <p className="faq-text">We accept all major credit cards, debit cards, and PayPal for your convenience.</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-card">
                  <div className="accordion-header" id="faq-2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-faq-2">
                      Can I cancel my membership anytime?
                    </button>
                  </div>
                  <div id="collapse-faq-2" className="accordion-collapse collapse" data-bs-parent="#pricingAccordion">
                    <div className="accordion-body">
                      <p className="faq-text">Yes, you can cancel your membership at any time without any cancellation fees.</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-card">
                  <div className="accordion-header" id="faq-3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-faq-3">
                      Is there a trial period?
                    </button>
                  </div>
                  <div id="collapse-faq-3" className="accordion-collapse collapse" data-bs-parent="#pricingAccordion">
                    <div className="accordion-body">
                      <p className="faq-text">We offer a 7-day trial period for all new members to try our facilities risk-free.</p>
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

export default Pricing;
