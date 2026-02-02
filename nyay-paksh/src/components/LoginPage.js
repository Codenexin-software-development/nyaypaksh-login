import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./LoginPage.css";
import nppLogo from "../assets/npp.png";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ─── Stages ───
  const [stage, setStage] = useState("phone"); // phone | email | otp

  // ─── Fields ───
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [consent, setConsent] = useState(false);

  // ─── Verification loading ───
  const [isVerifying, setIsVerifying] = useState(false);

  // ─── Timer ───
  const [validitySeconds, setValiditySeconds] = useState(9 * 60 + 31);
  const [resendSeconds, setResendSeconds] = useState(31);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);

  // ─── OTP refs ───
  const otpRefs = useRef([]);
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  // ═══════════════════════════════════════════════════════
  // REGISTRATION SUCCESS MESSAGE (from /register via location.state)
  // ═══════════════════════════════════════════════════════
  const [regMessage, setRegMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setRegMessage(location.state.message);

      // Auto-fill phone + email if register passed them
      if (location.state.registeredPhone) {
        setPhone(location.state.registeredPhone);
      }
      if (location.state.registeredEmail) {
        setEmail(location.state.registeredEmail);
        // If both are filled, jump straight to email stage
        if (location.state.registeredPhone && location.state.registeredPhone.length === 10) {
          setStage("email");
        }
      }

      // Auto-dismiss banner after 5 s
      const timer = setTimeout(() => setRegMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // ═══════════════════════════════════════════════════════
  // VALIDATION
  // ═══════════════════════════════════════════════════════
  const isValidEmail = useCallback(
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    []
  );

  // ═══════════════════════════════════════════════════════
  // PHONE
  // ═══════════════════════════════════════════════════════
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);

    if (value.length === 10 && stage === "phone") {
      setStage("email");
      setTimeout(() => {
        const el = document.getElementById("emailInput");
        if (el) el.focus();
      }, 350);
    }
    if (value.length < 10) setStage("phone");
  };

  const clearPhoneInput = () => {
    setPhone("");
    setStage("phone");
    const el = document.getElementById("phoneInput");
    if (el) el.focus();
  };

  // ═══════════════════════════════════════════════════════
  // EMAIL
  // ═══════════════════════════════════════════════════════
  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);
    if (value && !isValidEmail(value)) {
      setEmailError("कृपया एक सही ईमेल दर्ज करें।");
    } else {
      setEmailError("");
    }
  };

  const clearEmailInput = () => {
    setEmail("");
    setEmailError("");
  };

  // ═══════════════════════════════════════════════════════
  // OTP INPUT
  // ═══════════════════════════════════════════════════════
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "");
    setOtp(newOtp);
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      if (otpRefs.current[index - 1]) otpRefs.current[index - 1].focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .split("")
      .slice(0, 6);
    const newOtp = ["", "", "", "", "", ""];
    digits.forEach((d, i) => { newOtp[i] = d; });
    setOtp(newOtp);
    const last = digits.length - 1;
    if (last < 5 && otpRefs.current[last + 1]) otpRefs.current[last + 1].focus();
    else if (otpRefs.current[5]) otpRefs.current[5].focus();
  };

  // ═══════════════════════════════════════════════════════
  // TIMERS
  // ═══════════════════════════════════════════════════════
  const startTimers = () => {
    setIsTimerActive(true);
    setValiditySeconds(9 * 60 + 31);
    setResendSeconds(31);
    setOtpExpired(false);
  };

  const resendOTP = () => {
    if (resendSeconds > 0) return;
    setResendSeconds(31);
    setOtp(["", "", "", "", "", ""]);
    showToast("OTP पुनः भेजा गया।");
    setIsTimerActive(false);
    setTimeout(() => {
      setValiditySeconds(9 * 60 + 31);
      setIsTimerActive(true);
    }, 100);
    if (otpRefs.current[0]) otpRefs.current[0].focus();
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && validitySeconds > 0) {
      interval = setInterval(() => {
        setValiditySeconds((prev) => {
          if (prev <= 1) {
            setOtpExpired(true);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
        setResendSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTimerActive, validitySeconds]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // ═══════════════════════════════════════════════════════
  // TOAST
  // ═══════════════════════════════════════════════════════
  const showToast = (msg) => {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2800);
    }
  };

  // ═══════════════════════════════════════════════════════
  // BUTTON STATE
  // ═══════════════════════════════════════════════════════
  const evaluateButtonState = () => {
    if (isVerifying) return true;
    if (stage === "otp") return !(otp.every((d) => d.length === 1) && consent);
    if (stage === "email") return !(phone.length === 10 && isValidEmail(email) && consent);
    return !(phone.length === 10 && consent);
  };

  const getButtonText = () => {
    if (isVerifying) return "सत्यापित हो रहा है…";
    return stage === "otp" ? "VERIFY OTP" : "SEND OTP";
  };

  // ═══════════════════════════════════════════════════════
  // MAIN ACTION
  // ═══════════════════════════════════════════════════════
  const handleMainAction = () => {
    // ── email stage → send OTP ──
    if (stage === "email") {
      setStage("otp");
      startTimers();
      showToast(`OTP ${email} पर भेजा गया।`);
      setTimeout(() => {
        if (otpRefs.current[0]) otpRefs.current[0].focus();
      }, 350);
      return;
    }

    // ── otp stage → verify + localStorage logic ──
    if (stage === "otp") {
      setIsVerifying(true);
      const otpCode = otp.join("");
      showToast(`OTP सत्यापित हो रहा है: ${otpCode}…`);

      // Simulate network delay
      setTimeout(() => {
        setIsTimerActive(false);

        // ─── Read stored data ───
        const storedUser = localStorage.getItem("nyaypaksh_user");
        const storedProfile = localStorage.getItem("nyaypaksh_profile");
        let userData;

        if (storedUser) {
          // Returning user — verify phone & email match
          userData = JSON.parse(storedUser);
          if (userData.phone !== phone || userData.email !== email) {
            showToast("❌ जानकारी मेल नहीं खाती। कृपया दोबारा दर्ज करें।");
            setIsVerifying(false);
            return;
          }
        } else {
          // Check temp user saved by RegisterPage
          const tempUser = localStorage.getItem("nyaypaksh_temp_user");
          if (tempUser) {
            userData = JSON.parse(tempUser);
            localStorage.removeItem("nyaypaksh_temp_user");
          } else {
            // Fallback: create new user object for demo
            userData = {
              id: `NPP${Date.now()}`,
              phone: phone,
              email: email,
              fullName: "Member",
              isRegistered: true,
              registrationDate: new Date().toISOString(),
            };
          }
        }

        // ─── Persist authentication ───
        localStorage.setItem("nyaypaksh_user", JSON.stringify(userData));
        localStorage.setItem("nyaypaksh_authenticated", "true");

        // ─── Notify parent App (updates its state) ───
        if (onLogin) onLogin(userData);

        showToast("✓ सफलतापूर्वक लॉगिन! आपका अकाउंट खुल गया।");

        // ─── Smart redirect ───
        setTimeout(() => {
          setIsVerifying(false);
          if (storedProfile) {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/profile", { replace: true });
          }
        }, 1500);
      }, 1600);
    }
  };

  // ─── Enter key shortcut ───
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !evaluateButtonState()) handleMainAction();
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [stage, phone, email, otp, consent, isVerifying]);

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="login-container">

      {/* ─── NAVBAR ─── */}
      <nav className="top-navbar">
        <div className="navbar-left">
          <img
            src={nppLogo}
            alt="NPP Logo"
            style={{ width: 62, height: 62, display: "block", borderRadius: "50%" }}
          />
          <div className="navbar-titles">
            <h2 className="navbar-party-name">न्याय पक्ष पार्टी</h2>
            <p className="navbar-subtitle">जनता द्वारा पार्टी प्रत्याशी का चयन</p>
          </div>
        </div>
        <div className="navbar-right">
          <button className="nav-link-btn">मीडिया</button>
          <button className="nav-link-btn">संपर्क</button>
          <button className="nav-donate-btn">Make a Donation</button>
        </div>
      </nav>

      {/* ─── BG ─── */}
      <div className="bg-layer"></div>

      {/* ─── MAIN ─── */}
      <div className="main-content">
        <div className="modal-wrapper">
          <div className="card">

            {/* Logo */}
            <div className="card-logo">
              <img
                src={nppLogo}
                alt="NPP Logo"
                style={{ width: 72, height: 72, borderRadius: "50%" }}
              />
            </div>

            <h1 className="card-title">न्याय पक्ष लॉगिन</h1>
            <p className="card-info">OTP आपके ईमेल पते पर भेजा जाएगा।</p>

            {/* ── Registration success banner ── */}
            {regMessage && (
              <div style={{
                background: "#edfbf0",
                border: "1px solid #4caf50",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "#2e7d32",
                fontWeight: 500,
              }}>
                <span style={{ fontSize: 18 }}>✓</span>
                <span>{regMessage}</span>
              </div>
            )}

            {/* ──── PHONE ──── */}
            <label className="field-label">मोबाइल नंबर</label>
            <div className="phone-input-row">
              <div className="country-code">
                +91<span className="arrow">▼</span>
              </div>
              <input
                type="tel"
                className="phone-input"
                id="phoneInput"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="मोबाइल नंबर दर्ज करें"
                maxLength="10"
                autoFocus
              />
              {phone && (
                <button className="clear-btn" onClick={clearPhoneInput} aria-label="Clear">×</button>
              )}
            </div>
            <div className="country-label">India</div>

            {/* ──── EMAIL ──── */}
            <div
              className={`field-section ${stage === "email" || stage === "otp" ? "visible" : ""}`}
              id="emailSection"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label className="field-label">ईमेल पता</label>
                {email && (
                  <button
                    onClick={clearEmailInput}
                    aria-label="Clear email"
                    style={{ background: "none", border: "none", color: "#888", fontSize: 12, cursor: "pointer", padding: "2px 8px" }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                type="email"
                className={`email-input ${emailError ? "error" : ""}`}
                id="emailInput"
                value={email}
                onChange={handleEmailChange}
                placeholder="आपका ईमेल दर्ज करें"
              />
              <div className="email-error-msg">{emailError}</div>
            </div>

            {/* ──── OTP ──── */}
            <div
              className={`field-section ${stage === "otp" ? "visible" : ""}`}
              id="otpSection"
            >
              <label className="field-label">OTP दर्ज करें</label>
              <div className="otp-instructions">
                <small style={{ color: "#666", fontSize: 12 }}>
                  ईमेल पर भेजे गए 6-अंकीय OTP को दर्ज करें
                </small>
              </div>

              <div className="otp-boxes" onPaste={handleOtpPaste}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="tel"
                    maxLength="1"
                    className={`otp-box ${otpExpired ? "error" : ""}`}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    disabled={otpExpired || isVerifying}
                  />
                ))}
              </div>

              {stage === "otp" && (
                <>
                  <div className="timer-row">
                    <span className="timer-label">OTP वैधता</span>
                    <span className="timer-value">
                      {otpExpired
                        ? <span className="timer-expired">समाप्त</span>
                        : formatTime(validitySeconds)
                      }
                    </span>
                    <span className="timer-label">फिर से भेज सकते हैं</span>
                    <span className="timer-value">
                      {resendSeconds > 0 ? formatTime(resendSeconds) : "00:00"}
                    </span>
                  </div>
                  <div className="resend-row">
                    OTP प्राप्त नहीं हुआ?
                    <button
                      className="resend-btn"
                      onClick={resendOTP}
                      disabled={resendSeconds > 0 || otpExpired || isVerifying}
                    >
                      पुनः भेजें
                    </button>
                  </div>
                  {otpExpired && (
                    <div style={{ textAlign: "center", color: "#e03a1e", fontSize: 13, marginTop: 10, fontWeight: 500 }}>
                      OTP समाप्त हो गया। कृपया नया OTP प्राप्त करें।
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ──── CONSENT ──── */}
            <div className="consent-row">
              <input
                type="checkbox"
                id="consentCheck"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={isVerifying}
              />
              <label className="consent-text" htmlFor="consentCheck">
                मैं प्रमाणित करता/करती हूँ कि दी गई जानकारी सही है और आवश्यकता पड़ने पर आगे की सूचना हेतु संपर्क किया जा सकता है।
              </label>
            </div>

            {/* ──── MAIN BUTTON ──── */}
            <button
              className="btn-otp"
              onClick={handleMainAction}
              disabled={evaluateButtonState()}
              style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              {getButtonText()}
              {(stage === "email" || stage === "otp") && !evaluateButtonState() && !isVerifying && (
                <span style={{ fontSize: 12, opacity: 0.8 }}>(Enter ↵)</span>
              )}
            </button>

            {/* ──── REGISTER LINK ──── */}
            <div style={{ marginTop: 18, textAlign: "center", fontSize: 13, color: "#666" }}>
              पहले से अकाउंट नहीं है?{" "}
              <Link
                to="/register"
                style={{ color: "#e8611a", fontWeight: 600, textDecoration: "none", marginLeft: 4 }}
              >
                नया पंजीकरण करें
              </Link>
            </div>

            {/* ──── HELP ──── */}
            <div style={{ marginTop: 14, textAlign: "center", fontSize: 12, color: "#666", padding: "0 10px" }}>
              समस्या आ रही है?{" "}
              <button
                onClick={() => alert("सहायता केंद्र: कृपया npp-help@example.com पर ईमेल करें या 1800-XXX-XXXX पर कॉल करें।")}
                style={{ color: "#e8611a", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", marginLeft: 4, fontSize: 12 }}
              >
                सहायता केंद्र
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Toast ─── */}
      <div className="toast" id="toast"></div>

      {/* ─── Loading Overlay (shown while verifying OTP) ─── */}
      {isVerifying && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}>
          <div style={{
            width: 52,
            height: 52,
            border: "4px solid rgba(255,255,255,0.25)",
            borderTop: "4px solid #e8611a",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: 18,
          }}></div>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>सत्यापित हो रहा है…</p>
          <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.7 }}>कृपया प्रतीक्षा करें।</p>
        </div>
      )}

      {/* ─── Scoped styles ─── */}
      <style>{`
        .top-navbar {
          position: relative;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          padding: 14px 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-radius: 0 0 16px 16px;
          margin: 12px 24px 0;
          flex-wrap: wrap;
          gap: 12px;
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .navbar-titles { display: flex; flex-direction: column; }
        .navbar-party-name {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
          color: #1a3c5e;
          font-family: 'Noto Sans Devanagari', sans-serif, Arial;
          letter-spacing: 0.5px;
        }
        .navbar-subtitle {
          margin: 2px 0 0;
          font-size: 13px;
          color: #e8611a;
          font-weight: 500;
          font-family: 'Noto Sans Devanagari', sans-serif, Arial;
        }
        .navbar-right { display: flex; align-items: center; gap: 12px; }
        .nav-link-btn {
          background: #fff;
          border: 1.5px solid #cbd5e0;
          color: #1a3c5e;
          padding: 8px 22px;
          border-radius: 22px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Noto Sans Devanagari', sans-serif, Arial;
        }
        .nav-link-btn:hover { background: #f0f4f8; border-color: #1a3c5e; }
        .nav-donate-btn {
          background: #1a3c5e;
          color: #fff;
          border: none;
          padding: 10px 28px;
          border-radius: 22px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .nav-donate-btn:hover { background: #14304d; }
        .card { border-top: 4px solid #e8611a !important; }
        .card-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 18px;
        }
        .clear-btn {
          background: none;
          border: none;
          color: #888;
          padding: 0 12px;
          cursor: pointer;
          font-size: 18px;
          transition: color 0.2s;
        }
        .clear-btn:hover { color: #e8611a !important; }
        .otp-instructions {
          text-align: center;
          margin-bottom: 15px;
          margin-top: 5px;
        }
        button { font-family: inherit; }
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;