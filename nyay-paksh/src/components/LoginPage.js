import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.jpg';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setShowOTPModal(true);
      console.log(`OTP sent to +91 ${mobileNumber}`);
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    
    if (enteredOTP.length === 6) {
      // Successful login - redirect to home page
      navigate('/home');
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="login-page">
      {/* Simple Header */}
      <header className="login-header">
        <div className="login-nav">
          <div className="login-logo">
            <img 
              src={logo} 
              alt="Nyay Paksh Logo" 
              className="logo-image"
            />
            <div className="logo-text-large">
              <h1>Nyay Paksh</h1>
              <p>For a Just and Equal India</p>
            </div>
          </div>
          
          <button className="donate-btn-nav">
            <i className="fas fa-heart"></i> Make a Donation
          </button>
        </div>
      </header>

      {/* Login Content - Centered */}
      <main className="login-content">
        <div className="login-container-center">
          {/* Logo above the missed call section - Nyay Paksh style circular border */}
          <div className="center-logo-nyaypaksh">
            <div className="logo-border">
              <div className="logo-circle">
                <img 
                  src={logo} 
                  alt="Nyay Paksh Logo" 
                  className="center-logo-image"
                />
              </div>
            </div>
          </div>
          <br></br>
          <div className="login-card-nyaypaksh">
            <div className="login-card-header-nyaypaksh">
              <h2>Give a missed call on</h2>
              <div className="missed-call-number-nyaypaksh">
                <span>88 00 00 2024</span>
              </div>
              <p className="missed-call-text-nyaypaksh">and become a part of the Nyay Paksh</p>
            </div>
            
            <div className="login-divider-nyaypaksh">
              <span>OR</span>
            </div>
            
            <div className="login-form-container">
              <h3>Enter Your Mobile Number *</h3>
              <form onSubmit={handleMobileSubmit} className="login-form-simple">
                <div className="mobile-input-large-nyaypaksh">
                  <div className="country-code-large-nyaypaksh">+91</div>
                  <input 
                    type="tel" 
                    placeholder="98765 43210" 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength="10"
                    required 
                    autoFocus
                  />
                </div>
                
                <button type="submit" className="send-otp-btn-nyaypaksh">
                  Send OTP
                </button>
              </form>
              
              <div className="terms-check-nyaypaksh">
                <input type="checkbox" id="terms-check" required />
                <label htmlFor="terms-check">
                  I certify that the above provided information is correct and there is no misinformation
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="login-footer">
        <div className="footer-simple">
          <div className="footer-contact-simple">
            <p><i className="fas fa-envelope"></i> contact@nyaipaksh.org</p>
            <p><i className="fas fa-phone"></i> +91 11 1234 5678</p>
            <p><i className="fas fa-map-marker-alt"></i> New Delhi, India</p>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2026 Nyay Paksh Party. All Rights Reserved.</p>
            <div className="footer-links-simple">
              <a href="#">Privacy Policy</a>
              <span> | </span>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="modal-overlay">
          <div className="modal-content otp-modal">
            <button 
              className="modal-close" 
              onClick={() => {
                setShowOTPModal(false);
                setOtp(['', '', '', '', '', '']);
              }}
            >
              &times;
            </button>
            
            <div className="modal-header">
              <div className="modal-logo">
                <img 
                  src={logo} 
                  alt="Nyay Paksh Logo" 
                  className="modal-logo-image"
                />
                <h3>Nyay Paksh</h3>
              </div>
              <h2>Verify Your Number</h2>
              <p>Enter the 6-digit OTP sent to <strong>+91 {mobileNumber}</strong></p>
            </div>
            
            <form onSubmit={handleOTPSubmit}>
              <div className="otp-inputs-large">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    maxLength="1"
                    className="otp-digit-large"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              
              <button type="submit" className="verify-btn-large">
                <i className="fas fa-check-circle"></i> Verify & Continue
              </button>
              
              <div className="otp-footer">
                <p>Didn't receive OTP? <button 
                  type="button"
                  className="resend-btn"
                  onClick={() => alert('OTP resent to your mobile number')}
                >
                  Resend OTP
                </button></p>
                <p className="otp-timer">
                  <i className="fas fa-clock"></i> OTP expires in: <span className="timer">04:59</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;