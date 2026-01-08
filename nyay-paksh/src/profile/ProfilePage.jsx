import ProfileSection from "./ProfileSection";
import logo from "../logo.jpg";
import "./ProfileSection.css";
import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
   <div className="profile-page">

  {/* 🔵 FULL WIDTH HEADER */}
  <motion.header
    className="profile-header"
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="profile-header-content">
      <img src={logo} alt="Nyay Paksh Logo" />
      <div>
        <h1>Complete Your Profile</h1>
        <p>Please provide accurate details to continue</p>
      </div>
    </div>
  </motion.header>

  {/* 👤 FLOATING AVATAR */}
  <motion.div
    className="avatar-float"
    initial={{ scale: 0.85, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.25, duration: 0.4 }}
  >
    <div className="avatar-circle">
      <svg viewBox="0 0 24 24" className="avatar-svg">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    </div>
  </motion.div>

  {/* ⚪ CONTENT CARD */}
  <section className="profile-card">
    {/* form starts here */}
  </section>

</div>
  )}