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
  const [toastMessage, setToastMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers starting with 6-9
    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }
    
    // Consent validation
    if (!formData.consent) {
      newErrors.consent = "You must agree to the terms to register";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = message;
      toast.className = `toast toast-${type}`;
      toast.style.display = "block";
      
      setTimeout(() => {
        toast.style.display = "none";
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: Date.now().toString(),
        phone: formData.phone,
        email: formData.email,
        fullName: formData.fullName.trim(),
        isRegistered: true,
        registrationDate: new Date().toISOString(),
        profile: {
          isComplete: false,
          name: formData.fullName.trim(),
          email: formData.email,
          phone: formData.phone
        }
      };
      
      // Save to localStorage
      localStorage.setItem("nyaypaksh_user", JSON.stringify(userData));
      localStorage.setItem("nyaypaksh_temp_register", JSON.stringify(formData));
      
      // Call parent handler if provided
      if (onRegister && typeof onRegister === "function") {
        onRegister(userData);
      } else {
        // Fallback: directly set user in localStorage and navigate
        console.log("onRegister prop not provided, using localStorage directly");
      }
      
      // Show success message
      showToast("Registration successful! Redirecting to login...", "success");
      
      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate("/login", { 
          state: { 
            message: "Registration successful! Please login with OTP.",
            registeredEmail: formData.email,
            registeredPhone: formData.phone
          } 
        });
      }, 1000);
      
    } catch (error) {
      console.error("Registration error:", error);
      showToast("Registration failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;
    
    // Phone number input handling
    if (name === "phone") {
      // Remove non-numeric characters
      processedValue = value.replace(/\D/g, '');
      // Limit to 10 digits
      if (processedValue.length > 10) {
        processedValue = processedValue.slice(0, 10);
      }
    }
    
    // Email input handling
    if (name === "email") {
      processedValue = value.toLowerCase();
    }
    
    // Full name input handling
    if (name === "fullName") {
      // Allow only letters and spaces
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
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
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName">
            Full Name *
            {!errors.fullName && formData.fullName && (
              <span className="valid-indicator"> ✓</span>
            )}
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`form-input ${errors.fullName ? 'error' : formData.fullName ? 'valid' : ''}`}
            disabled={isSubmitting}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Mobile Number *
            {!errors.phone && formData.phone.length === 10 && (
              <span className="valid-indicator"> ✓</span>
            )}
          </label>
          <div className="phone-input-group">
            <span className="country-code">+91</span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength="10"
              className={`form-input ${errors.phone ? 'error' : formData.phone.length === 10 ? 'valid' : ''}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email Address *
            {!errors.email && formData.email && (
              <span className="valid-indicator"> ✓</span>
            )}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={`form-input ${errors.email ? 'error' : formData.email ? 'valid' : ''}`}
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className={`checkbox-label ${errors.consent ? 'error-label' : ''}`}>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className={errors.consent ? 'error' : ''}
              disabled={isSubmitting}
            />
            <span className="checkbox-text">
              I certify that the information provided is correct and I agree to the 
              <Link to="/terms" className="link" target="_blank"> Terms & Conditions</Link> and 
              <Link to="/privacy" className="link" target="_blank"> Privacy Policy</Link>
              {formData.consent && <span className="valid-indicator"> ✓</span>}
            </span>
          </label>
          {errors.consent && <span className="error-text">{errors.consent}</span>}
        </div>

        <button 
          type="submit" 
          className={`auth-button ${isSubmitting ? 'loading' : ''}`}
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
            <Link to="/login" className="link" onClick={(e) => isSubmitting && e.preventDefault()}>
              Login here
            </Link>
          </p>
        </div>
      </form>

      {/* Toast Notification */}
      {toastMessage && (
        <div id="toast" className={`toast ${toastMessage.includes("success") ? "toast-success" : "toast-error"}`}>
          {toastMessage}
        </div>
      )}

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner-large"></div>
            <p>Creating your account...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Default prop to prevent error
RegisterPage.defaultProps = {
  onRegister: (userData) => {
    console.log("Registration successful:", userData);
    // Default implementation that doesn't throw error
  }
};

export default RegisterPage;
