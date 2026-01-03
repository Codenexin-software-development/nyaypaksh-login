import React, { useState } from 'react';
import logo from '../logo.jpg';
import './HomePage.css';

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    name: '',
    email: '',
    state: '',
    terms: false
  });
  const [showOTPModal, setShowOTPModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleJoinFormSubmit = (e) => {
    e.preventDefault();
    setShowOTPModal(true);
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    alert('Registration successful! Welcome to Nyay Paksh.');
    setShowOTPModal(false);
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header>
        <nav>
          <div className="nav-container">
            <div className="logo-section">
              <img src={logo} alt="Nyay Paksh Logo" className="logo" />
              <div className="logo-text">
                <h1>Nyay Paksh</h1>
              </div>
            </div>
            
            <div className="nav-menu">
              <ul className="nav-links">
                <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
                <li><a href="#"><i className="fas fa-calendar-alt"></i> Events</a></li>
                <li><a href="#"><i className="fas fa-newspaper"></i> News</a></li>
                <li><a href="#"><i className="fas fa-users"></i> About Us</a></li>
                <li><a href="#join-section"><i className="fas fa-handshake"></i> Join Us</a></li>
              </ul>
              
              <div className="nav-actions">
                <div className="language-selector">
                  <i className="fas fa-globe"></i>
                  <select>
                    <option>English</option>
                    <option>हिंदी</option>
                    <option>தமிழ்</option>
                    <option>বাংলা</option>
                  </select>
                </div>
                <button className="donate-btn">
                  <i className="fas fa-heart"></i> Donate Now
                </button>
                <button 
                  className="mobile-menu-btn" 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
              <li><a href="#"><i className="fas fa-calendar-alt"></i> Events</a></li>
              <li><a href="#"><i className="fas fa-newspaper"></i> News</a></li>
              <li><a href="#"><i className="fas fa-users"></i> About Us</a></li>
              <li><a href="#join-section"><i className="fas fa-handshake"></i> Join Us</a></li>
              <li><a href="#"><i className="fas fa-heart"></i> Donate</a></li>
            </ul>
          </div>
        </nav>
        
        {/* Hero Banner */}
        <div className="hero-banner">
          <div className="hero-content">
            <h2>Building a Just India for Everyone</h2>
            <p>Join the movement for equality, transparency, and progressive governance</p>
            <a href="#join-section" className="cta-button">Become a Member <i className="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Join Section */}
        <section className="join-section" id="join-section">
          <div className="container">
            <div className="section-header">
              <h2>Join Nyay Paksh Today</h2>
              <p>Be a part of India's fastest growing political movement for justice and equality</p>
            </div>
            
            <div className="join-container">
              <div className="join-left-panel">
                <h3>Why Join Us?</h3>
                <ul className="benefits-list">
                  <li><i className="fas fa-check-circle"></i> Fight for social justice and equality</li>
                  <li><i className="fas fa-check-circle"></i> Transparent and accountable leadership</li>
                  <li><i className="fas fa-check-circle"></i> Progressive policies for all citizens</li>
                  <li><i className="fas fa-check-circle"></i> Community-driven decision making</li>
                  <li><i className="fas fa-check-circle"></i> Opportunity to shape India's future</li>
                </ul>
                
                <div className="testimonial">
                  <div className="testimonial-content">
                    <p>"Joining Nyay Paksh was the best decision I made. I finally feel my voice matters in our democracy."</p>
                    <div className="testimonial-author">
                      <img src={logo} alt="User" />
                      <div>
                        <h4>Amit Kumar</h4>
                        <p>Member since 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="join-form-panel">
                <div className="form-header">
                  <h3>Quick Registration</h3>
                  <p>Start your journey with a missed call or mobile registration</p>
                </div>
                
                <div className="missed-call-card">
                  <div className="missed-call-icon">
                    <i className="fas fa-phone-volume"></i>
                  </div>
                  <div className="missed-call-info">
                    <p>Give a missed call on</p>
                    <div className="call-number">88 00 00 2024</div>
                    <p>We'll call you back instantly</p>
                  </div>
                </div>
                
                <div className="divider">
                  <span>OR</span>
                </div>
                
                <form onSubmit={handleJoinFormSubmit} className="join-form">
                  <div className="form-group">
                    <label htmlFor="mobile">Enter your mobile number</label>
                    <div className="mobile-input">
                      <div className="country-code">+91</div>
                      <input 
                        type="tel" 
                        id="mobile" 
                        name="mobile"
                        placeholder="98765 43210" 
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      placeholder="Enter your full name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select 
                      id="state" 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select your state</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="terms-agreement">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      required 
                    />
                    <label htmlFor="terms">
                      I certify that the information provided is correct and I agree to the <a href="#">Terms & Conditions</a>
                    </label>
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    <i className="fas fa-paper-plane"></i> Send OTP & Continue
                  </button>
                </form>
                
                <div className="secure-info">
                  <i className="fas fa-shield-alt"></i>
                  <span>Your information is secure and will not be shared</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Core Principles</h2>
              <p>The pillars that guide our vision for a better India</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: 'rgba(15, 59, 95, 0.1)' }}>
                  <i className="fas fa-balance-scale" style={{ color: '#0F3B5F' }}></i>
                </div>
                <h3>Justice</h3>
                <p>Ensuring equal rights and opportunities for every citizen, regardless of background.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: 'rgba(224, 138, 46, 0.1)' }}>
                  <i className="fas fa-university" style={{ color: '#E08A2E' }}></i>
                </div>
                <h3>Transparency</h3>
                <p>Open governance with full disclosure of party funding and decision-making processes.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: 'rgba(18, 58, 85, 0.1)' }}>
                  <i className="fas fa-hands-helping" style={{ color: '#123A55' }}></i>
                </div>
                <h3>Inclusivity</h3>
                <p>Representation for all communities, genders, and socio-economic groups in our leadership.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: 'rgba(242, 166, 90, 0.1)' }}>
                  <i className="fas fa-leaf" style={{ color: '#F2A65A' }}></i>
                </div>
                <h3>Sustainability</h3>
                <p>Progressive policies for environmental protection and sustainable development.</p>
              </div>
            </div>
          </div>
        </section>
        
       </main>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-about">
              <div className="footer-logo">
                <img src={logo} alt="Logo" />
              </div>
              <p>Nyay Paksh is a progressive political party committed to social justice, transparency, and inclusive governance for all Indians.</p>
              <div className="footer-newsletter">
                <h4>Stay Updated</h4>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your email address" />
                  <button type="submit"><i className="fas fa-paper-plane"></i></button>
                </div>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="link-column">
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Our Vision</a></li>
                  <li><a href="#">Leadership</a></li>
                  <li><a href="#">Manifesto</a></li>
                </ul>
              </div>
              
              <div className="link-column">
                <h3>Get Involved</h3>
                <ul>
                  <li><a href="#">Join as Member</a></li>
                  <li><a href="#">Volunteer</a></li>
                  <li><a href="#">Donate</a></li>
                  <li><a href="#">Campaign</a></li>
                  <li><a href="#">Internships</a></li>
                </ul>
              </div>
              
              <div className="link-column">
                <h3>Resources</h3>
                <ul>
                  <li><a href="#">News & Media</a></li>
                  <li><a href="#">Press Releases</a></li>
                  <li><a href="#">Publications</a></li>
                  <li><a href="#">Research</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-social">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon youtube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="social-icon linkedin">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-icon whatsapp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-info">
              <p>&copy; 2026 Nyay Paksh Party. All Rights Reserved.</p>
              <div className="footer-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Code of Conduct</a>
              </div>
            </div>
            <div className="footer-contact">
              <p><i className="fas fa-envelope"></i> contact@nyaipaksh.org</p>
              <p><i className="fas fa-phone"></i> +91 11 1234 5678</p>
              <p><i className="fas fa-map-marker-alt"></i> New Delhi, India</p>
            </div>
          </div>
        </div>
      </footer>

      {/* OTP Modal for Join Form */}
      {showOTPModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => setShowOTPModal(false)}
            >
              &times;
            </button>
            <div className="modal-header">
              <h3>Verify Your Number</h3>
              <p>Enter the 6-digit OTP sent to your mobile number</p>
            </div>
            <form onSubmit={handleOTPSubmit}>
              <div className="otp-inputs">
                {[...Array(6)].map((_, index) => (
                  <input key={index} type="text" maxLength="1" className="otp-digit" />
                ))}
              </div>
              <button type="submit" className="verify-btn">Verify & Complete Registration</button>
              <div className="otp-resend">
                <p>Didn't receive OTP? <a href="#">Resend in 30s</a></p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;