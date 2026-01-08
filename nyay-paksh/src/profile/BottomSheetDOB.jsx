import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BottomSheetDOB.css";

export default function BottomSheetDOB({ open, value, onClose, onSelect }) {
  /* ✅ HOOKS MUST BE FIRST (NO RETURNS BEFORE THIS) */
  const today = new Date();

  const minAllowedDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  /* ✅ SAFE CONDITIONAL RENDER AFTER HOOKS */
  if (!open) return null;

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  /* 
    Years:
    - Show 1900 → current year + 10
    - Selection logic blocks invalid dates
  */
  const years = Array.from(
    { length: today.getFullYear() + 11 - 1900 },
    (_, i) => 1900 + i
  );

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const isDateAllowed = (day) => {
    const selected = new Date(year, month, day);

    // ❌ future date
    if (selected > today) return false;

    // ❌ under 18 years
    if (selected > minAllowedDate) return false;

    return true;
  };

  const handleSelect = (day) => {
    if (!isDateAllowed(day)) return;

    const formatted = `${day} ${months[month]} ${year}`;
    onSelect(formatted);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="dob-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="dob-sheet calendar-sheet"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sheet-handle" />

          {/* Header */}
          <div className="calendar-header">
            <select value={month} onChange={(e) => setMonth(+e.target.value)}>
              {months.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>

            <select value={year} onChange={(e) => setYear(+e.target.value)}>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Weekdays */}
          <div className="calendar-week">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Days */}
          <div className="calendar-grid">
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const allowed = isDateAllowed(day);

              return (
                <button
                  key={day}
                  className={`calendar-day ${!allowed ? "disabled" : ""}`}
                  disabled={!allowed}
                  onClick={() => handleSelect(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
