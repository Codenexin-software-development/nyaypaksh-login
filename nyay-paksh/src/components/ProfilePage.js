import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileSection.css";

function ProfilePage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("personal");
  const [gender, setGender] = useState("Male");
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );

  // Personal details state - updated with all fields
  const [personalDetails, setPersonalDetails] = useState({
    title: "",
    fullName: "",
    mobile: "",
    dob: "",
    caste: "",
    education: "",
    referredBy: "",
    email: "",
    category: "",
    voterId: ""
  });

  // Dropdown options
  const titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
  const educationOptions = [
    "Select Qualification",
    "High School",
    "Intermediate/Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate/PhD",
    "Other"
  ];
  const categoryOptions = [
    "Select Category",
    "General",
    "OBC",
    "SC",
    "ST",
    "Other"
  ];

  const [familyMembers, setFamilyMembers] = useState([]);

  const [contactDetails, setContactDetails] = useState({
    address: "",
    pincode: "",
    state: "Telangana",
    district: "",
    ac: "",
    pc: "",
  });

  const [socialDetails, setSocialDetails] = useState({
    whatsapp: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* ---------------- PERSONAL DETAILS HANDLERS ---------------- */
  const handlePersonalChange = (field, value) => {
    setPersonalDetails({
      ...personalDetails,
      [field]: value
    });
  };

  /* ---------------- FAMILY ---------------- */
  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { name: "", gender: "Male", relation: "", mobile: "", dob: "" },
    ]);
  };

  const updateFamily = (i, key, value) => {
    const copy = [...familyMembers];
    copy[i][key] = value;
    setFamilyMembers(copy);
  };

  const removeFamily = (i) => {
    const copy = [...familyMembers];
    copy.splice(i, 1);
    setFamilyMembers(copy);
  };

  /* ---------------- CONTACT DETAILS HANDLERS ---------------- */
  const handleContactChange = (field, value) => {
    setContactDetails({
      ...contactDetails,
      [field]: value
    });
  };

  /* ---------------- SOCIAL DETAILS HANDLERS ---------------- */
  const handleSocialChange = (field, value) => {
    setSocialDetails({
      ...socialDetails,
      [field]: value
    });
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    // Combine all data
    const profileData = {
      personal: personalDetails,
      family: familyMembers,
      contact: contactDetails,
      social: socialDetails,
      gender,
      profileImage
    };
    
    console.log("Saving profile data:", profileData);
    alert("Profile saved successfully ✅");
  };

  const handleSaveAndNext = () => {
    handleSave();
    const tabs = ["personal", "family", "contact", "social"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  // Tab names as per screenshot
  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "family", label: "Family" },
    { id: "contact", label: "Contact" },
    { id: "social", label: "Social" }
  ];

  return (
    <div className="page-container">
      {/* ---------------- COMPLETE PROFILE BANNER ---------------- */}
      <div className="profile-banner">
        <h2>Complete Your Profile</h2>
        <p>Please provide accurate details to continue</p>
      </div>

      {/* ---------------- NAVBAR ---------------- */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-text">NYAY PAKSH</span>
          <span className="logo-subtext">PARTY</span>
        </div>
        <nav>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/profile" className="nav-link active">Profile</Link>
          <Link to="/donations" className="nav-link">Donations</Link>
          <Link to="/refer" className="nav-link">Refer a Member</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
        </nav>
      </header>

      {/* ---------------- CONTENT ---------------- */}
      <div className="container">
        <h2 className="title">UPDATE PROFILE</h2>

        {/* TABS */}
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="card">
          {/* PROFILE PHOTO SECTION */}
          <div className="profile-section">
            <h3 className="section-title">Profile Photo</h3>
            <div className="avatar-container">
              <input
                type="file"
                id="upload"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
              <img
                src={profileImage}
                alt="Profile"
                className="avatar"
                onClick={() => document.getElementById("upload").click()}
              />
              <p className="avatar-hint">Click to change photo</p>
            </div>
          </div>

          {/* ---------------- PERSONAL DETAILS ---------------- */}
          {activeTab === "personal" && (
            <div className="form-section">
              <h3 className="section-title">PERSONAL DETAILS</h3>
              <p className="required-note">* Required fields</p>
              
              <div className="form">
                {/* First Row: Title & Full Name */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required">Title</label>
                    <select
                      value={personalDetails.title}
                      onChange={(e) => handlePersonalChange("title", e.target.value)}
                      className="form-input"
                    >
                      <option value="">Select Title</option>
                      {titleOptions.map(title => (
                        <option key={title} value={title}>{title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label required">Full Name</label>
                    <input 
                      type="text"
                      placeholder="Enter full name"
                      value={personalDetails.fullName}
                      onChange={(e) => handlePersonalChange("fullName", e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Second Row: Mobile & Date of Birth */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required">Mobile Number</label>
                    <input 
                      type="tel"
                      placeholder="Enter mobile number"
                      value={personalDetails.mobile}
                      onChange={(e) => handlePersonalChange("mobile", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input 
                      type="date"
                      value={personalDetails.dob}
                      onChange={(e) => handlePersonalChange("dob", e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Third Row: Caste & Education */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Caste (optional)</label>
                    <input 
                      type="text"
                      placeholder="Enter caste"
                      value={personalDetails.caste}
                      onChange={(e) => handlePersonalChange("caste", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Education Qualification</label>
                    <select
                      value={personalDetails.education}
                      onChange={(e) => handlePersonalChange("education", e.target.value)}
                      className="form-input"
                    >
                      {educationOptions.map(edu => (
                        <option key={edu} value={edu}>{edu}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Fourth Row: Referred By */}
                <div className="form-group">
                  <label className="form-label">Referred By (Membership Code)</label>
                  <input 
                    type="text"
                    placeholder="Enter referral code (optional)"
                    value={personalDetails.referredBy}
                    onChange={(e) => handlePersonalChange("referredBy", e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Divider */}
                <hr className="form-divider" />

                {/* Fifth Row: Gender & Email */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required">Gender</label>
                    <div className="gender-options">
                      {["Male", "Female", "Other"].map(g => (
                        <button
                          key={g}
                          type="button"
                          className={`gender-btn ${gender === g ? "active" : ""}`}
                          onClick={() => setGender(g)}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email ID</label>
                    <input 
                      type="email"
                      placeholder="Enter email address"
                      value={personalDetails.email}
                      onChange={(e) => handlePersonalChange("email", e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Sixth Row: Category & Voter ID */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      value={personalDetails.category}
                      onChange={(e) => handlePersonalChange("category", e.target.value)}
                      className="form-input"
                    >
                      {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Voter ID</label>
                    <input 
                      type="text"
                      placeholder="Enter voter ID number"
                      value={personalDetails.voterId}
                      onChange={(e) => handlePersonalChange("voterId", e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="actions">
                  <button className="btn primary" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="btn secondary" onClick={handleSaveAndNext}>
                    Save & Continue
                  </button>
                </div>

                {/* Back Button */}
                <button className="back-btn" onClick={() => navigate(-1)}>
                  ← Back to Home
                </button>
              </div>
            </div>
          )}

          {/* ---------------- FAMILY ---------------- */}
          {activeTab === "family" && (
            <div className="form-section">
              <h3 className="section-title">FAMILY DETAILS</h3>
              <div className="form">
                <button className="btn add-btn" onClick={addFamilyMember}>
                  + Add Family Member
                </button>

                {familyMembers.map((member, index) => (
                  <div key={index} className="family-member-card">
                    <div className="family-row">
                      <input 
                        placeholder="Name" 
                        value={member.name}
                        onChange={e => updateFamily(index, "name", e.target.value)}
                        className="form-input"
                      />
                      <input 
                        placeholder="Relation" 
                        value={member.relation}
                        onChange={e => updateFamily(index, "relation", e.target.value)}
                        className="form-input"
                      />
                      <input 
                        placeholder="Mobile" 
                        value={member.mobile}
                        onChange={e => updateFamily(index, "mobile", e.target.value)}
                        className="form-input"
                      />
                      <input 
                        type="date" 
                        value={member.dob}
                        onChange={e => updateFamily(index, "dob", e.target.value)}
                        className="form-input"
                      />
                      <button 
                        className="remove-btn"
                        onClick={() => removeFamily(index)}
                        title="Remove member"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}

                <div className="actions">
                  <button className="btn primary" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn secondary" onClick={handleSaveAndNext}>
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- CONTACT ---------------- */}
          {activeTab === "contact" && (
            <div className="form-section">
              <h3 className="section-title">CONTACT DETAILS</h3>
              <div className="form">
                <input
                  placeholder="Address"
                  value={contactDetails.address}
                  onChange={e => handleContactChange("address", e.target.value)}
                  className="form-input"
                />
                <div className="form-row">
                  <input
                    placeholder="Pincode"
                    value={contactDetails.pincode}
                    onChange={e => handleContactChange("pincode", e.target.value)}
                    className="form-input"
                  />
                  <input
                    placeholder="State"
                    value={contactDetails.state}
                    onChange={e => handleContactChange("state", e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <input
                    placeholder="District"
                    value={contactDetails.district}
                    onChange={e => handleContactChange("district", e.target.value)}
                    className="form-input"
                  />
                  <input
                    placeholder="Assembly Constituency (AC)"
                    value={contactDetails.ac}
                    onChange={e => handleContactChange("ac", e.target.value)}
                    className="form-input"
                  />
                </div>
                <input
                  placeholder="Parliamentary Constituency (PC)"
                  value={contactDetails.pc}
                  onChange={e => handleContactChange("pc", e.target.value)}
                  className="form-input"
                />

                <div className="actions">
                  <button className="btn primary" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn secondary" onClick={handleSaveAndNext}>
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- SOCIAL ---------------- */}
          {activeTab === "social" && (
            <div className="form-section">
              <h3 className="section-title">SOCIAL MEDIA LINKS</h3>
              <div className="form">
                <input 
                  placeholder="WhatsApp Number" 
                  value={socialDetails.whatsapp}
                  onChange={e => handleSocialChange("whatsapp", e.target.value)}
                  className="form-input"
                />
                <input 
                  placeholder="Facebook Profile URL" 
                  value={socialDetails.facebook}
                  onChange={e => handleSocialChange("facebook", e.target.value)}
                  className="form-input"
                />
                <input 
                  placeholder="Instagram Profile URL" 
                  value={socialDetails.instagram}
                  onChange={e => handleSocialChange("instagram", e.target.value)}
                  className="form-input"
                />
                <input 
                  placeholder="Twitter Profile URL" 
                  value={socialDetails.twitter}
                  onChange={e => handleSocialChange("twitter", e.target.value)}
                  className="form-input"
                />

                <div className="actions">
                  <button className="btn primary" onClick={handleSave}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
