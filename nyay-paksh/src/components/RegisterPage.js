import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import nppLogo from "../assets/npp.png";
import "./AuthPages.css";

const RegisterPage = ({ onRegister }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    fullName: "",
    consent: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phone || formData.phone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your full name (min. 3 characters)";
    }
    
    if (!formData.consent) {
      newErrors.consent = "You must agree to the terms to register";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        phone: formData.phone,
        email: formData.email,
        fullName: formData.fullName,
        isRegistered: true,
        registrationDate: new Date().toISOString(),
        profile: null // Will be filled in profile page
      };
      
      // Save to localStorage
      localStorage.setItem("nyaypaksh_user", JSON.stringify(userData));
      localStorage.setItem("nyaypaksh_temp_register", JSON.stringify(formData));
      
      // Call parent handler
      onRegister(userData);
      
      // Navigate to login page
      navigate("/login", { 
        state: { 
          message: "Registration successful! Please login with OTP." 
        } 
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="auth-container">
      {/* Header */}
      <div className="auth-header">
        <img src={nppLogo} alt="NPP Logo" className="auth-logo" />
        <h1 className="auth-title">न्याय पक्ष पार्टी</h1>
        <p className="auth-subtitle">Register New Account</p>
      </div>

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Mobile Number *</label>
          <div className="phone-input-group">
            <span className="country-code">+91</span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              className={`form-input ${errors.phone ? 'error' : ''}`}
            />
          </div>
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className={errors.consent ? 'error' : ''}
            />
            <span>
              I certify that the information provided is correct and I agree to the 
              <Link to="/terms" className="link"> Terms & Conditions</Link> and 
              <Link to="/privacy" className="link"> Privacy Policy</Link>
            </span>
          </label>
          {errors.consent && <span className="error-text">{errors.consent}</span>}
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Registering...
            </>
          ) : (
            "Register Account"
          )}
        </button>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="link">Login here</Link>
          </p>
        </div>
      </form>

      {/* Toast */}
      <div id="toast" className="toast"></div>
    </div>
  );
};

export default RegisterPage;