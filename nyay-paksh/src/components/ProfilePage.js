import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* NAVBAR */}
        <header className="navbar">
          <div className="logo">NYAY PAKSH PARTY</div>
          <nav>
            <a href="#">Dashboard</a>
            <a className="active" href="#">Profile</a>
            <a href="#">Donations</a>
            <a href="#">Refer a Member</a>
            <a href="#">FAQ</a>
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
              <img
                src={profileImage}
                alt="User"
                className="avatar"
                onClick={() =>
                  document.getElementById("profileUpload").click()
                }
              />
              <p>Profile Photo</p>
            </div>

            {/* PERSONAL DETAILS */}
            {activeTab === "personal" && (
              <form className="form">
                <h3>PERSONAL DETAILS</h3>
                <div className="grid">
                  <select>
                    <option>Title</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Full Name *"
                    defaultValue="Mogili Pranathi"
                  />

                  {/* Gender Selection */}
                  <div className="gender">
                    {["Male", "Female", "Other"].map((g) => (
                      <label
                        key={g}
                        className={gender === g ? "selected" : ""}
                        onClick={() => setGender(g)}
                      >
                        {g}
                      </label>
                    ))}
                  </div>

                  <input type="email" placeholder="Email ID" />
                  <input type="text" placeholder="Mobile Number" />
                  <input type="date" />

                  <select>
                    <option>Religion</option>
                    <option>Hindu</option>
                    <option>Muslim</option>
                    <option>Christian</option>
                    <option>Sikh</option>
                    <option>Other</option>
                  </select>

                  <select>
                    <option>Category</option>
                    <option>General</option>
                    <option>SC</option>
                    <option>ST</option>
                    <option>OBC</option>
                    <option>Minority</option>
                  </select>

                  <input type="text" placeholder="Caste" />

                  <select>
                    <option>Education Qualification</option>
                    <option>B.Tech</option>
                    <option>10th Pass</option>
                    <option>12th Pass</option>
                    <option>Graduate</option>
                    <option>Post Graduate</option>
                    <option>Diploma</option>
                    <option>PhD & Above</option>
                  </select>

                  <select>
                    <option>Profession</option>
                    <option>Engineer</option>
                    <option>Doctor</option>
                    <option>Teacher</option>
                    <option>Business</option>
                    <option>Student</option>
                    <option>Politician</option>
                    <option>Other</option>
                  </select>

                  <input type="text" placeholder="Voter ID" />
                  <input type="text" placeholder="Referred By (Membership Code)" />
                </div>

                <div className="actions">
                  <button type="button" className="btn primary">
                    Save
                  </button>
                  <button type="button" className="btn outline">
                    Save & Next
                  </button>
                </div>
              </form>
            )}

            {/* FAMILY DETAILS */}
            {activeTab === "family" && (
              <div className="form">
                <h3>FAMILY DETAILS</h3>
                <button type="button" className="btn primary" onClick={addFamilyMember}>
                  Add Member +
                </button>

                <table className="family-table">
                  <thead>
                    <tr>
                      <th>Full Name*</th>
                      <th>Gender*</th>
                      <th>Relationship*</th>
                      <th>Mobile Number</th>
                      <th>Date Of Birth*</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {familyMembers.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No family members added.
                        </td>
                      </tr>
                    )}
                    {familyMembers.map((member, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            value={member.fullName}
                            onChange={(e) =>
                              updateFamilyMember(index, "fullName", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <select
                            value={member.gender}
                            onChange={(e) =>
                              updateFamilyMember(index, "gender", e.target.value)
                            }
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            value={member.relationship}
                            onChange={(e) =>
                              updateFamilyMember(index, "relationship", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={member.mobile}
                            onChange={(e) =>
                              updateFamilyMember(index, "mobile", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            value={member.dob}
                            onChange={(e) =>
                              updateFamilyMember(index, "dob", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn outline"
                            onClick={() => removeFamilyMember(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="actions">
                  <button type="button" className="btn primary">
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* CONTACT DETAILS */}
            {activeTab === "contact" && (
              <form className="form">
                <h3>CONTACT DETAILS</h3>
                <div className="row">
                  <div className="form-group">
                    <label>Address (House / Flat / Floor No.)</label>
                    <input
                      type="text"
                      value={contactDetails.address}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode*</label>
                    <input
                      type="text"
                      value={contactDetails.pincode}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, pincode: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>State*</label>
                    <select
                      value={contactDetails.state}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, state: e.target.value })
                      }
                    >
                      <option>Telangana</option>
                      <option>Tamil Nadu</option>
                      <option>Delhi</option>
                      <option>Gao</option>
                      <option>Haryana</option>
                      <option>Kerala</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <label>District*</label>
                    <select
                      value={contactDetails.district}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, district: e.target.value })
                      }
                    >
                      <option value="">Select District</option>
                      <option>Hyderabad</option>
                      <option>Adilabad</option>
                      <option>Karimnagar</option>
                      <option>Medak</option>
                      <option>Nalgonda</option>
                      <option>Nizamabad</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Assembly constituency (AC)*</label>
                    <select
                      value={contactDetails.ac}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, ac: e.target.value })
                      }
                    >
                      <option value="">Select AC</option>
                      <option>Karwan - 64</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Parliamentary constituency (PC)*</label>
                    <select
                      value={contactDetails.pc}
                      onChange={(e) =>
                        setContactDetails({ ...contactDetails, pc: e.target.value })
                      }
                    >
                      <option value="">Select PC</option>
                      <option>9 - Hyderabad</option>
                      <option>8 - Secunderabad</option>
                    </select>
                  </div>
                </div>
              </form>
            )}

            {/* SOCIAL DETAILS */}
            {activeTab === "social" && (
              <form className="form">
                <h3>SOCIAL DETAILS</h3>
                <div className="grid">
                  <div className="form-group">
                    <label>Whatsapp / Alternative number</label>
                    <input
                      type="text"
                      placeholder="Enter WhatsApp number"
                      value={socialDetails.whatsapp}
                      onChange={(e) =>
                        setSocialDetails({ ...socialDetails, whatsapp: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group social-input">
                    <label>Facebook URL</label>
                    <div className="social-field">
                      <span className="social-icon">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                          alt="Facebook"
                          width="20"
                        />
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Facebook URL"
                        value={socialDetails.facebook}
                        onChange={(e) =>
                          setSocialDetails({ ...socialDetails, facebook: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group social-input">
                    <label>Instagram URL</label>
                    <div className="social-field">
                      <span className="social-icon">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                          alt="Instagram"
                          width="20"
                        />
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Instagram URL"
                        value={socialDetails.instagram}
                        onChange={(e) =>
                          setSocialDetails({ ...socialDetails, instagram: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group social-input">
                    <label>Twitter/X URL</label>
                    <div className="social-field">
                      <span className="social-icon">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                          alt="Twitter/X"
                          width="20"
                        />
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Twitter/X URL"
                        value={socialDetails.twitter}
                        onChange={(e) =>
                          setSocialDetails({ ...socialDetails, twitter: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            <button className="back-btn" onClick={() => navigate("/home")}>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="login-footer">
        <div className="footer-simple">
          <div className="footer-contact-simple">
            <p>contact@nyaipaksh.org</p>
            <p>📞 +91 11 1234 5678</p>
            <p>📍 New Delhi, India</p>
          </div>
          <div className="footer-copyright">
            <p>© 2026 Nyay Paksh Party. All Rights Reserved.</p>
            <div className="footer-links-simple">
              <a href="#">Privacy Policy</a>
              <span> | </span>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfilePage;
