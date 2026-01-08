import { useState } from "react";
import { motion } from "framer-motion";
import BottomSheetDOB from "./BottomSheetDOB";
import "./ProfileSection.css";
import countries from "./data/countries";
import indiaStatesDistricts from "./data/indiaStatesDistricts";
import indiaDistrictPincode from "./data/indiaDistrictPincode";
import { useRef } from "react";
import logo from "../logo.jpg";




export default function ProfileSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    district: "",
    constituency: "",
    pincode: "",
  });
  const [profileImage, setProfileImage] = useState(null);
const fileInputRef = useRef(null);

  const [districts, setDistricts] = useState([]);
  const [dobOpen, setDobOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [country, setCountry] = useState(
    countries.find((c) => c.code === "IN") || countries[0]
    
  );
  const [phoneError, setPhoneError] = useState("");
  const isValidPhone = (phone) => {
  if (!phone) return false;
  return /^[6-9]\d{9}$/.test(phone);
};

  
const [emailError, setEmailError] = useState("");
const isValidEmail = (email) => {
  if (!email) return true; // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


  // 🔴 live name error state
  const [nameErrors, setNameErrors] = useState({
    firstName: "",
    lastName: "",
  });

  /* ===== NAME VALIDATION ===== */
 const isValidRealName = (name) => {
  if (!name) return false;

  const value = name.trim();

  // 1. Minimum length
  if (value.length < 3) return false;

  // 2. Only alphabets and single spaces
  if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(value)) return false;

  // 3. Reject repeated-character spam (aaaa, zzzz)
  const compact = value.replace(/\s/g, "");
  if (/^(.)\1{2,}$/.test(compact)) return false;

  // 4. Reject keyboard patterns
  const garbagePatterns = [
    "asdf",
    "qwer",
    "zxcv",
    "test",
    "user",
    "demo",
    "admin",
    "abc",
    "xyz"
  ];

  const lower = value.toLowerCase();
  if (garbagePatterns.some(p => lower.includes(p))) return false;

  // 5. Reject names with no vowel (ydyfdwdwdwhd)
  if (!/[aeiou]/i.test(value)) return false;

  return true;
};



  const handleSave = () => {
    if (nameErrors.firstName || nameErrors.lastName) {
      alert("Please correct the highlighted name fields.");
      return;
    }

    if (!isValidRealName(form.firstName)) {
      alert("Please enter a valid real first name.");
      return;
    }

    if (!isValidRealName(form.lastName)) {
      alert("Please enter a valid real last name.");
      return;
    }

    if (!consent) {
      alert("Please confirm the consent before saving.");
      return;
    }

    alert("Profile saved successfully!");
  };


  return (
   <motion.section
  className="profile-card"
  initial={{ opacity: 0, y: 32, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.35, ease: "easeOut" }}
>

  <div className="profile-page">

      {/* ===== HEADER ===== */}
      <header className="profile-header">
        <div className="profile-header-content">
          <img src={logo} alt="Nyay Paksh Logo" />
          <div>
            <h1>Complete Your Profile</h1>
            <p>Please provide accurate details to continue</p>
          </div>
        </div>
      </header>

      {/* ===== CARD ===== */}
      <motion.section
        className="profile-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >

        {/* ✅ AVATAR — THIS IS WHERE IT BELONGS */}
        <div className="avatar-container">
          <div className="avatar-circle">
            <svg
              className="avatar-svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
        </div>

        {/* ===== FORM STARTS HERE ===== */}
        {/* sections, fields, buttons */}
        
      </motion.section>
    </div>
  



      {/* BASIC INFO */}
      <Section title="Basic Information">
        <Field>
          <label>Title</label>
  <input
    value={form.title}
    placeholder="Select gender to auto-fill"
    readOnly
    style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}
  />
          <label>First Name*</label>
          <input
            name="firstName"
            value={form.firstName}
            placeholder="Enter your real first name"
            className={nameErrors.firstName ? "input-error" : ""}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, firstName: value });
              setNameErrors({
                ...nameErrors,
                firstName:
                  value && !isValidRealName(value)
                    ? "Enter a valid real first name"
                    : "",
              });
            }}
          />
          {nameErrors.firstName && (
            <p className="error-text">{nameErrors.firstName}</p>
          )}
        </Field>

        <Field>
          <label>Last Name*</label>
          <input
            name="lastName"
            value={form.lastName}
            placeholder="Enter your real last name"
            className={nameErrors.lastName ? "input-error" : ""}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, lastName: value });
              setNameErrors({
                ...nameErrors,
                lastName:
                  value && !isValidRealName(value)
                    ? "Enter a valid real last name"
                    : "",
              });
            }}
          />
          {nameErrors.lastName && (
            <p className="error-text">{nameErrors.lastName}</p>
          )}
        </Field>

        <Field>
          <label>Gender*</label>
          <div className="gender-group">
            {["Male", "Female", "Other"].map((g) => (
              <motion.button
                key={g}
                type="button"
                className={`gender-pill ${form.gender === g ? "active" : ""}`}
               onClick={() => {
  let autoTitle = "";

  if (g === "Male") autoTitle = "Mr.";
  if (g === "Female") autoTitle = "Ms.";
  if (g === "Other") autoTitle = "Mx.";

  setForm({
    ...form,
    gender: g,
    title: autoTitle,
  });
}}

              >
                {g}
              </motion.button>
            ))}
          </div>
        </Field>

        <Field>
          <label>Date of Birth*</label>
          <input
            readOnly
            className="dob-trigger"
            value={form.dob || "Select date of birth"}
            onClick={() => setDobOpen(true)}
          />
          <BottomSheetDOB
            open={dobOpen}
            value={form.dob}
            onClose={() => setDobOpen(false)}
            onSelect={(date) => {
              setForm({ ...form, dob: date });
              setDobOpen(false);
            }}
          />
        </Field>
      </Section>

      {/* CONTACT INFO */}
      <Section title="Contact Information">
        <Field>
          <label>Email*</label>
         <input
  type="email"
  value={form.email}
  className={emailError ? "input-error" : ""}
  placeholder="example@email.com"
  onChange={(e) => {
    const value = e.target.value;
    setForm({ ...form, email: value });

    setEmailError(
      value && !isValidEmail(value)
        ? "Enter a valid email address"
        : ""
    );
  }}
/>
          {emailError && <p className="error-text">{emailError}</p>}
     
        </Field>
        
<Field>
  <label>Mobile Number*</label>

  <div className="phone-input">
    {/* Country selector */}
    <select
      className="country-select"
      value={country.code}
      onChange={(e) => {
        const selected = countries.find(
          (c) => c.code === e.target.value
        );
        setCountry(selected);
      }}
    >
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name} ({c.dial})
        </option>
      ))}
    </select>

    {/* Dial code */}
    <span className="dial-code">{country.dial}</span>

    {/* Phone input */}
    <input
      className={`phone-number ${phoneError ? "input-error" : ""}`}
      type="tel"
      placeholder="Enter mobile number"
      value={form.phone}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");
        setForm({ ...form, phone: value });

        setPhoneError(
          value && value.length !== 10
            ? "Enter a valid 10-digit mobile number"
            : ""
        );
      }}
    />
  </div>

  {phoneError && (
    <p className="error-text">{phoneError}</p>
  )}
</Field>




      </Section>

      {/* ADDRESS */}
      <Section title="Address Details">
        <Field>
          <label>Address*</label>
          <input
            name="address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </Field>

  <Field>
  <label>State*</label>
  <select
    value={form.state}
    onChange={(e) => {
      const selectedState = e.target.value;

      setForm({
        ...form,
        state: selectedState,
        district: ""
      });

      setDistricts(
        indiaStatesDistricts[selectedState] || []
      );
    }}
  >
    <option value="">Select state</option>

    {Object.keys(indiaStatesDistricts).map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
</Field>


<Field>
  <label>District*</label>
  <select
    value={form.district}
    disabled={!districts.length}
    onChange={(e) => {
      const selectedDistrict = e.target.value;

      setForm({
        ...form,
        district: selectedDistrict,
        pincode: indiaDistrictPincode[selectedDistrict] || ""
      });
    }}
  >
    <option value="">
      {districts.length
        ? "Select district"
        : "Select state first"}
    </option>

    {districts.map((d) => (
      <option key={d} value={d}>
        {d}
      </option>
    ))}
  </select>
</Field>

     <Field>
  <label>Pincode*</label>
  <input
    type="number"
    value={form.pincode}
    placeholder="Enter pincode"
    onChange={(e) =>
      setForm({ ...form, pincode: e.target.value })
    }
  />
</Field>

      </Section>

      {/* CONSENT */}
      <label className="consent-box">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          I confirm that the information provided is accurate and up to date.
        </span>
      </label>

      {/* CTA */}
      <motion.button
        className="save-btn"
        disabled={!consent}
        whileTap={{ scale: consent ? 0.97 : 1 }}
        onClick={handleSave}
      >
        continue →
      </motion.button>
    </motion.section>
  );
}

function Section({ title, children }) {
  return (
    <div className="section">
      <h3 className="section-title">{title}</h3>
      {children}
    </div>
  );
}

function Field({ children }) {
  return <div className="form-group">{children}</div>;
}
