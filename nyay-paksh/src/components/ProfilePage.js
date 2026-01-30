import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./profile.css";

function ProfilePage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("personal");
  const [gender, setGender] = useState("Male");
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );

  const [familyMembers, setFamilyMembers] = useState([]);

  const [socialDetails, setSocialDetails] = useState({
    whatsapp: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const [contactDetails, setContactDetails] = useState({
    address: "",
    pincode: "",
    state: "Telangana",
    district: "",
    ac: "",
    pc: "",
  });

  // Profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { fullName: "", gender: "Male", relationship: "", mobile: "", dob: "" },
    ]);
  };

  const updateFamilyMember = (index, field, value) => {
    const updated = [...familyMembers];
    updated[index][field] = value;
    setFamilyMembers(updated);
  };

  const removeFamilyMember = (index) => {
    const updated = [...familyMembers];
    updated.splice(index, 1);
    setFamilyMembers(updated);
  };

  // Handle save button click
  const handleSave = () => {
    alert("Profile saved successfully!");
    // In a real app, you would save to backend here
  };

  // Handle save and continue
  const handleSaveAndContinue = () => {
    handleSave();
    
    // Move to next tab based on current tab
    const tabs = ["personal", "family", "contact", "social"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* NAVBAR */}
        <header className="navbar">
          <div className="logo">
            <span className="logo-text">NYAY PAKSH</span>
            <span className="logo-subtext">PARTY</span>
          </div>
          <nav>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <span className="nav-link active">Profile</span>
            <Link to="/donations" className="nav-link">Donations</Link>
            <Link to="/refer" className="nav-link">Refer a Member</Link>
            <Link to="/faq" className="nav-link">FAQ</Link>
          </nav>
        </header>

        {/* MAIN CONTAINER */}
        <div className="container">
          <h2 className="title">UPDATE PROFILE</h2>

          {/* TABS */}
          <div className="tabs">
            {["personal", "family", "contact", "social"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "tab active" : "tab"}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* CARD */}
          <div className="card">
            {/* PROFILE PHOTO */}
            <div className="profile-section">
              <input
                type="file"
                id="profileUpload"
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <div className="avatar-container">
                <img
                  src={profileImage}
                  alt="User"
                  className="avatar"
                  onClick={() =>
                    document.getElementById("profileUpload").click()
                  }
                />
                <div className="avatar-overlay">
                  <span className="camera-icon">📷</span>
                </div>
              </div>
              <p className="profile-label">Profile Photo</p>
            </div>

            {/* PERSONAL DETAILS */}
            {activeTab === "personal" && (
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-header">
                  <h3>PERSONAL DETAILS</h3>
                  <div className="required-note">* Required fields</div>
                </div>
                <div className="grid">
                  <div className="form-group">
                    <label>Title *</label>
                    <select className="form-input" defaultValue="">
                      <option value="">Select Title</option>
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter full name"
                      defaultValue="Mogili Pranathi"
                      required
                    />
                  </div>

                  {/* Gender Selection */}
                  <div className="form-group">
                    <label>Gender *</label>
                    <div className="gender">
                      {["Male", "Female", "Other"].map((g) => (
                        <label
                          key={g}
                          className={`gender-label ${gender === g ? 'selected' : ''}`}
                          onClick={() => setGender(g)}
                        >
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email ID *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="Enter email address" 
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="Enter mobile number" 
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input type="date" className="form-input" required />
                  </div>

                  <div className="form-group">
                    <label>Religion *</label>
                    <select className="form-input" defaultValue="">
                      <option value="">Select Religion</option>
                      <option>Hindu</option>
                      <option>Muslim</option>
                      <option>Christian</option>
                      <option>Sikh</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select className="form-input" defaultValue="">
                      <option value="">Select Category</option>
                      <option>General</option>
                      <option>SC</option>
                      <option>ST</option>
                      <option>OBC</option>
                      <option>Minority</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Caste</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Enter caste (optional)" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Education Qualification *</label>
                    <select className="form-input" defaultValue="">
                      <option value="">Select Qualification</option>
                      <option>B.Tech</option>
                      <option>10th Pass</option>
                      <option>12th Pass</option>
                      <option>Graduate</option>
                      <option>Post Graduate</option>
                      <option>Diploma</option>
                      <option>PhD & Above</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Profession *</label>
                    <select className="form-input" defaultValue="">
                      <option value="">Select Profession</option>
                      <option>Engineer</option>
                      <option>Doctor</option>
                      <option>Teacher</option>
                      <option>Business</option>
                      <option>Student</option>
                      <option>Politician</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Voter ID *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Enter voter ID number" 
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Referred By (Membership Code)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Enter referral code (optional)" 
                    />
                  </div>
                </div>

                <div className="actions">
                  <button type="button" className="btn primary" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button type="button" className="btn secondary" onClick={handleSaveAndContinue}>
                    Save & Continue
                  </button>
                </div>
              </form>
            )}

            {/* FAMILY DETAILS */}
            {activeTab === "family" && (
              <div className="form">
                <div className="form-header">
                  <h3>FAMILY DETAILS</h3>
                  <div className="required-note">* Required fields</div>
                </div>
                
                <button type="button" className="btn add-member-btn" onClick={addFamilyMember}>
                  <span className="btn-icon">+</span> Add Family Member
                </button>

                {familyMembers.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">👨‍👩‍👧‍👦</div>
                    <h4>No Family Members Added</h4>
                    <p>Click "Add Family Member" to start adding family details</p>
                  </div>
                ) : (
                  <div className="family-table-container">
                    <table className="family-table">
                      <thead>
                        <tr>
                          <th>Full Name*</th>
                          <th>Gender*</th>
                          <th>Relationship*</th>
                          <th>Mobile Number</th>
                          <th>Date Of Birth*</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {familyMembers.map((member, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                className="table-input"
                                value={member.fullName}
                                onChange={(e) =>
                                  updateFamilyMember(index, "fullName", e.target.value)
                                }
                                placeholder="Enter full name"
                                required
                              />
                            </td>
                            <td>
                              <select
                                className="table-select"
                                value={member.gender}
                                onChange={(e) =>
                                  updateFamilyMember(index, "gender", e.target.value)
                                }
                                required
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="table-input"
                                value={member.relationship}
                                onChange={(e) =>
                                  updateFamilyMember(index, "relationship", e.target.value)
                                }
                                placeholder="e.g., Father, Mother"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="tel"
                                className="table-input"
                                value={member.mobile}
                                onChange={(e) =>
                                  updateFamilyMember(index, "mobile", e.target.value)
                                }
                                placeholder="Enter mobile"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="table-input"
                                value={member.dob}
                                onChange={(e) =>
                                  updateFamilyMember(index, "dob", e.target.value)
                                }
                                required
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() => removeFamilyMember(index)}
                                title="Delete member"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="actions">
                  <button type="button" className="btn primary" onClick={handleSave}>
                    Save Family Details
                  </button>
                  <button type="button" className="btn secondary" onClick={handleSaveAndContinue}>
                    Save & Continue
                  </button>
                </div>
              </div>
            )}

            {/* CONTACT DETAILS */}
            {activeTab === "contact" && (
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-header">
                  <h3>CONTACT DETAILS</h3>
                  <div className="required-note">* Required fields</div>
                </div>
                
                <div className="row">
                  <div className="form-group">
                    <label>Address (House / Flat / Floor No.) *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={contactDetails.address}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, address: e.target.value })
                      }
                      placeholder="Enter complete address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={contactDetails.pincode}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, pincode: e.target.value })
                      }
                      placeholder="6-digit pincode"
                      maxLength="6"
                      pattern="\d{6}"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <label>State *</label>
                    <select
                      className="form-input"
                      value={contactDetails.state}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, state: e.target.value })
                      }
                      required
                    >
                      <option value="Telangana">Telangana</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Kerala">Kerala</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>District *</label>
                    <select
                      className="form-input"
                      value={contactDetails.district}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, district: e.target.value })
                      }
                      required
                    >
                      <option value="">Select District</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Adilabad">Adilabad</option>
                      <option value="Karimnagar">Karimnagar</option>
                      <option value="Medak">Medak</option>
                      <option value="Nalgonda">Nalgonda</option>
                      <option value="Nizamabad">Nizamabad</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <label>Assembly constituency (AC) *</label>
                    <select
                      className="form-input"
                      value={contactDetails.ac}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, ac: e.target.value })
                      }
                      required
                    >
                      <option value="">Select AC</option>
                      <option value="Karwan - 64">Karwan - 64</option>
                      <option value="Goshamahal - 65">Goshamahal - 65</option>
                      <option value="Charminar - 66">Charminar - 66</option>
                      <option value="Chandrayangutta - 67">Chandrayangutta - 67</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Parliamentary constituency (PC) *</label>
                    <select
                      className="form-input"
                      value={contactDetails.pc}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, pc: e.target.value })
                      }
                      required
                    >
                      <option value="">Select PC</option>
                      <option value="9 - Hyderabad">9 - Hyderabad</option>
                      <option value="8 - Secunderabad">8 - Secunderabad</option>
                      <option value="10 - Chevella">10 - Chevella</option>
                      <option value="11 - Mahabubnagar">11 - Mahabubnagar</option>
                    </select>
                  </div>
                </div>

                <div className="actions">
                  <button type="button" className="btn primary" onClick={handleSave}>
                    Save Contact Details
                  </button>
                  <button type="button" className="btn secondary" onClick={handleSaveAndContinue}>
                    Save & Continue
                  </button>
                </div>
              </form>
            )}

            {/* SOCIAL DETAILS */}
            {activeTab === "social" && (
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-header">
                  <h3>SOCIAL DETAILS</h3>
                  <div className="optional-note">All fields are optional</div>
                </div>
                
                <div className="grid">
                  <div className="form-group">
                    <label>WhatsApp / Alternative number</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Enter WhatsApp number"
                      value={socialDetails.whatsapp}
                      onChange={(e) =>
                        setSocialDetails({ ...socialDetails, whatsapp: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Facebook URL</label>
                    <div className="social-field">
                      <span className="social-icon facebook">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                          alt="Facebook"
                          width="20"
                        />
                      </span>
                      <input
                        type="url"
                        className="form-input social-input"
                        placeholder="https://facebook.com/username"
                        value={socialDetails.facebook}
                        onChange={(e) =>
                          setSocialDetails({ ...socialDetails, facebook: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Instagram URL</label>
                    <div className="social-field">
                      <span className="social-icon instagram">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                          alt="Instagram"
                          width="20"
                        />
                      </span>
                      <input
                        type="url"
                        className="form-input social-input"
                        placeholder="https://instagram.com/username"
                        value={socialDetails.instagram}
                        onChange={(e) =>
                          setSocialDetails({ ...socialDetails, instagram: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Twitter/X URL</label>
                    <div className="social-field">
                      <span className="social-icon twitter">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                          alt="Twitter/X"
                          width="20"
                        />
                      </span>
                      <input
                        type="url"
                        className="form-input social-input"
                        placeholder="https://twitter.com/username"
                        value={socialDetails.twitter}
                        onChange={(e) =>
                          setSocialDetails({ ...socialDetails, twitter: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="actions">
                  <button type="button" className="btn primary" onClick={handleSave}>
                    Save Social Details
                  </button>
                  <button type="button" className="btn secondary" onClick={() => {
                    handleSave();
                    alert("Profile completed successfully!");
                  }}>
                    Complete Profile
                  </button>
                </div>
              </form>
            )}

            <div className="navigation-buttons">
              <button className="btn back-home-btn" onClick={() => navigate("/home")}>
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="login-footer">
        <div className="footer-simple">
          <div className="footer-contact-simple">
            <p className="footer-email">contact@nyaipaksh.org</p>
            <p className="footer-phone">📞 +91 11 1234 5678</p>
            <p className="footer-location">📍 New Delhi, India</p>
          </div>
          <div className="footer-copyright">
            <p>© 2026 Nyay Paksh Party. All Rights Reserved.</p>
            <div className="footer-links-simple">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span className="separator"> | </span>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfilePage;