import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  // ─── Avatar ───
  const [avatarPreview, setAvatarPreview] = useState(null);

  // ─── Form state ───
  const [form, setForm] = useState({
    title: "श्री",
    name: "",
    gender: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    pincode: "",
    state: "",
    district: "",
    ac: "",
    consent: false,
  });

  // ─── Load saved data ───
  useEffect(() => {
    const savedProfile = localStorage.getItem("nyaypaksh_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.form) {
          setForm(profile.form);
        }
        if (profile.avatarPreview) {
          setAvatarPreview(profile.avatarPreview);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
  }, []);

  // ─── Update form helper ───
  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // ─── Avatar upload ───
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ─── Generate Membership Number ───
  const generateMembershipNumber = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `NPP-${year}${month}-${random}`;
  };

  // ─── Save Profile ───
  const handleSave = () => {
    // Validate required fields
    if (!form.name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!form.mobile || form.mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!form.email || !form.email.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }
    if (!form.state) {
      alert("Please select your state");
      return;
    }
    if (!form.consent) {
      alert("Please agree to receive party updates");
      return;
    }

    // Generate membership data
    const membershipNumber = generateMembershipNumber();
    const joinedDate = new Date();
    const validTillDate = new Date(joinedDate);
    validTillDate.setFullYear(validTillDate.getFullYear() + 1);

    // Format dates for display
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const joinedDateStr = formatDate(joinedDate);
    const validTillStr = formatDate(validTillDate);

    console.log("Generated Membership:", {
      number: membershipNumber,
      joined: joinedDateStr,
      validTill: validTillStr
    });

    // Get existing user data
    const existingUserStr = localStorage.getItem("nyaypaksh_user");
    let userData = {};
    if (existingUserStr) {
      try {
        userData = JSON.parse(existingUserStr);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    // Update user data
    const updatedUserData = {
      ...userData,
      fullName: form.name,
      email: form.email,
      phone: form.mobile,
      membershipNumber: membershipNumber
    };

    // Prepare profile data
    const profileData = {
      form: form,
      avatarPreview: avatarPreview,
      isComplete: true,
      membershipInfo: {
        membershipNumber: membershipNumber,
        joinedDate: joinedDate.toISOString(),
        joinedDateDisplay: joinedDateStr,
        validTill: validTillDate.toISOString(),
        validTillDisplay: validTillStr,
        generatedAt: new Date().toISOString()
      }
    };

    // Save to localStorage
    localStorage.setItem("nyaypaksh_user", JSON.stringify(updatedUserData));
    localStorage.setItem("nyaypaksh_profile", JSON.stringify(profileData));
    localStorage.setItem("nyaypaksh_profile_complete", "true");
    
    // Also save membership separately for easy access
    const membershipData = {
      membershipNumber: membershipNumber,
      joinedDate: joinedDate.toISOString(),
      joinedDateDisplay: joinedDateStr,
      validTill: validTillDate.toISOString(),
      validTillDisplay: validTillStr,
      status: "pending",
      termsAccepted: false
    };
    localStorage.setItem("nyaypaksh_membership", JSON.stringify(membershipData));

    // Set flag for dashboard success message
    sessionStorage.setItem("profile_just_saved", "true");

    // Show success message
    alert(`✅ Profile saved successfully!\n\nYour Membership Details:\n• Number: ${membershipNumber}\n• Joined: ${joinedDateStr}\n• Valid Till: ${validTillStr}\n\nYou will need to accept the terms on the dashboard to activate your membership.`);

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-badge">NYAYA PAKSHAK PROFILE</div>
        <h1 className="profile-main-title">न्याय पक्षक विवरण</h1>
        <p className="profile-subtitle">Complete your profile to generate membership card</p>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Sidebar - Avatar */}
        <div className="profile-sidebar">
          <label className="sidebar-label">प्रोफ़ाइल फोटो</label>
          
          <div className="avatar-circle" onClick={() => document.getElementById("avatarInput").click()}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="avatar-img" />
            ) : (
              <svg viewBox="0 0 120 120" className="avatar-placeholder">
                <circle cx="60" cy="60" r="60" fill="#e8611a" opacity="0.2" />
                <circle cx="60" cy="45" r="18" fill="#1a3c5e" opacity="0.6" />
                <ellipse cx="60" cy="90" rx="28" ry="20" fill="#1a3c5e" opacity="0.6" />
              </svg>
            )}
          </div>

          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />

          <button className="avatar-upload-btn" onClick={() => document.getElementById("avatarInput").click()}>
            फोटो अपडेट करें
          </button>

          <p className="avatar-hint">कृपया अपनी नवीनतम फोटो अपलोड करें।</p>

          <div className="preview-box">
            <h4>Membership Information:</h4>
            <p><strong>Will be generated after saving:</strong></p>
            <p>• Unique Membership Number</p>
            <p>• 1 Year Validity</p>
            <p>• Digital Membership Card</p>
          </div>
        </div>

        {/* Form Area */}
        <div className="profile-form-area">
          <h2 className="form-section-title">PERSONAL DETAILS</h2>

          <div className="form-grid">
            {/* Row 1 */}
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Title</label>
                <select className="field-input" value={form.title} onChange={(e) => updateForm("title", e.target.value)}>
                  <option value="श्री">श्री</option>
                  <option value="श्रीमती">श्रीमती</option>
                  <option value="सुश्री">सुश्री</option>
                </select>
              </div>

              <div className="form-field">
                <label className="field-label">Name *</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="अपना नाम दर्ज करें"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Gender</label>
                <div className="gender-pills">
                  {["Male", "Female", "Other"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`gender-pill ${form.gender === g ? "active" : ""}`}
                      onClick={() => updateForm("gender", g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Email Address *</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="आपका ईमेल दर्ज करें"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Mobile Number *</label>
                <div className="mobile-wrapper">
                  <span className="mobile-prefix">+91</span>
                  <input
                    type="tel"
                    className="field-input mobile-main"
                    placeholder="मोबाइल नंबर दर्ज करें"
                    value={form.mobile}
                    onChange={(e) => updateForm("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">Date of Birth</label>
                <input
                  type="date"
                  className="field-input"
                  value={form.dob}
                  onChange={(e) => updateForm("dob", e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Address</label>
                <textarea
                  className="field-input field-textarea"
                  placeholder="अपना पता दर्ज करें"
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  rows="3"
                />
              </div>

              <div className="form-field">
                <label className="field-label">Pincode</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="पिन कोड दर्ज करें"
                  value={form.pincode}
                  onChange={(e) => updateForm("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength="6"
                />
              </div>

              <div className="form-field">
                <label className="field-label">State *</label>
                <select 
                  className="field-input" 
                  value={form.state} 
                  onChange={(e) => updateForm("state", e.target.value)}
                >
                  <option value="">राज्य चुनें</option>
                  <option value="तेलंगाना">तेलंगाना</option>
                  <option value="आंध्र प्रदेश">आंध्र प्रदेश</option>
                  <option value="कर्नाटक">कर्नाटक</option>
                  <option value="महाराष्ट्र">महाराष्ट्र</option>
                  <option value="तमिलनाडु">तमिलनाडु</option>
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="form-row form-row-2col">
              <div className="form-field">
                <label className="field-label">District</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="जिला दर्ज करें"
                  value={form.district}
                  onChange={(e) => updateForm("district", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Assembly Constituency (AC)</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="विधानसभा क्षेत्र दर्ज करें"
                  value={form.ac}
                  onChange={(e) => updateForm("ac", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="consent-box">
            <label className="consent-label">
              <input
                type="checkbox"
                className="consent-checkbox"
                checked={form.consent}
                onChange={(e) => updateForm("consent", e.target.checked)}
              />
              <span className="consent-text">
                मैं यह प्रतिज्ञा करता/करती हूँ कि मुझे पार्टी के नियमित अपडेट प्राप्त हों। *
              </span>
            </label>
          </div>

          {/* Save Button */}
          <div className="save-btn-wrap">
            <button className="save-btn" onClick={handleSave}>
              Save Profile & Generate Membership →
            </button>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <h4>Important:</h4>
            <p>• Fields marked with * are required</p>
            <p>• Membership number will be generated automatically</p>
            <p>• Membership validity: 1 year from registration</p>
            <p>• You need to accept terms on dashboard to activate membership</p>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .profile-page {
          font-family: 'Segoe UI', 'Noto Sans Devanagari', sans-serif;
          background: #fef8f0;
          min-height: 100vh;
          padding: 0;
        }
        
        .profile-header {
          background: linear-gradient(135deg, #fde4d0, #fcd9bd);
          padding: 25px 30px;
          text-align: center;
          border-bottom: 3px solid #e8611a;
        }
        
        .profile-badge {
          display: inline-block;
          background: white;
          border: 2px solid #e8611a;
          border-radius: 20px;
          padding: 5px 15px;
          font-size: 12px;
          font-weight: bold;
          color: #e8611a;
          margin-bottom: 10px;
        }
        
        .profile-main-title {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: #1a3c5e;
        }
        
        .profile-subtitle {
          margin: 8px 0 0;
          font-size: 14px;
          color: #666;
        }
        
        .profile-content {
          max-width: 1200px;
          margin: 25px auto;
          padding: 0 20px;
          display: flex;
          gap: 25px;
        }
        
        .profile-sidebar {
          width: 250px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .sidebar-label {
          font-size: 14px;
          font-weight: 700;
          color: #333;
          margin-bottom: 12px;
        }
        
        .avatar-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          border: 4px solid #e8611a;
          margin-bottom: 15px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .avatar-upload-btn {
          background: white;
          border: 2px solid #e8611a;
          color: #e8611a;
          border-radius: 20px;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 10px;
        }
        
        .avatar-upload-btn:hover {
          background: #e8611a;
          color: white;
        }
        
        .avatar-hint {
          font-size: 11px;
          color: #666;
          text-align: center;
          margin: 0 0 15px;
          max-width: 180px;
        }
        
        .preview-box {
          background: #f0f7ff;
          border: 1px solid #c2e0ff;
          border-radius: 8px;
          padding: 12px;
          width: 100%;
        }
        
        .preview-box h4 {
          margin: 0 0 8px;
          font-size: 13px;
          color: #1a3c5e;
        }
        
        .preview-box p {
          margin: 5px 0;
          font-size: 11px;
          color: #555;
        }
        
        .profile-form-area {
          flex: 1;
        }
        
        .form-section-title {
          margin: 0 0 20px;
          font-size: 17px;
          font-weight: 700;
          color: #1a3c5e;
          border-bottom: 2px solid #e8611a;
          padding-bottom: 6px;
        }
        
        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }
        
        .form-row-2col {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .form-field {
          display: flex;
          flex-direction: column;
        }
        
        .field-label {
          font-size: 12px;
          font-weight: 600;
          color: #444;
          margin-bottom: 6px;
        }
        
        .field-input {
          padding: 10px 12px;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          font-size: 13px;
          outline: none;
          background: white;
        }
        
        .field-input:focus {
          border-color: #e8611a;
        }
        
        .field-textarea {
          resize: vertical;
          min-height: 50px;
        }
        
        .gender-pills {
          display: flex;
          gap: 6px;
        }
        
        .gender-pill {
          flex: 1;
          padding: 8px;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          background: white;
          font-size: 12px;
          font-weight: 500;
          color: #555;
          cursor: pointer;
        }
        
        .gender-pill.active {
          border-color: #e8611a;
          background: #fff5ed;
          color: #e8611a;
        }
        
        .mobile-wrapper {
          display: flex;
          align-items: center;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }
        
        .mobile-prefix {
          background: #f5f5f5;
          padding: 10px 12px;
          font-size: 13px;
          color: #666;
          border-right: 1.5px solid #ddd;
        }
        
        .mobile-main {
          border: none;
          flex: 1;
        }
        
        .consent-box {
          background: #f7f9fc;
          border-radius: 10px;
          padding: 15px 18px;
          margin-top: 20px;
        }
        
        .consent-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        
        .consent-checkbox {
          width: 18px;
          height: 18px;
          accent-color: #e8611a;
        }
        
        .consent-text {
          font-size: 13px;
          color: #444;
        }
        
        .save-btn-wrap {
          margin-top: 25px;
          display: flex;
          justify-content: center;
        }
        
        .save-btn {
          background: #e8611a;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 14px 60px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }
        
        .save-btn:hover {
          background: #d45515;
        }
        
        .info-box {
          margin-top: 20px;
          padding: 12px 15px;
          background: #edf7ff;
          border: 1px solid #c2e0ff;
          border-radius: 8px;
          font-size: 12px;
          color: #1a3c5e;
        }
        
        .info-box h4 {
          margin: 0 0 6px;
          font-size: 13px;
        }
        
        .info-box p {
          margin: 4px 0;
        }
        
        @media (max-width: 768px) {
          .profile-content {
            flex-direction: column;
          }
          
          .profile-sidebar {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .form-row-2col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default ProfilePage;
