import { useState } from "react";
import "./admin.css";

export default function Members() {
  const [logActionFilter, setLogActionFilter] = useState("ALL");
  const [logMemberFilter, setLogMemberFilter] = useState("")  
  const [search, setSearch] = useState("");
  const [auditLogs, setAuditLogs] = useState([]);
  const [members, setMembers] = useState([
    { id: 1, name: "Ramesh", status: "Pending", validTill: null },
    { id: 2, name: "Suresh", status: "Active", validTill: "2025-06-30" },
    { id: 3, name: "Mahesh", status: "Rejected", validTill: null },
  ]);

 const filteredAuditLogs = auditLogs.filter(log => {
  const actionMatch =
    logActionFilter === "ALL" || log.action === logActionFilter;

  const memberMatch =
    log.member.toLowerCase().includes(logMemberFilter.toLowerCase());

  return actionMatch && memberMatch;
});

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState({ name: "" });

  const addMember = () => {
    if (!newMember.name.trim()) return;

    const member = {
      id: Date.now(),
      name: newMember.name,
      status: "Pending",
      validTill: null,
    };

    setMembers([member, ...members]);
    logAction("CREATED", member.name);

    setNewMember({ name: "" });
    setShowAdd(false);
  };

  /* ================= AUDIT LOG ================= */
  const logAction = (action, memberName) => {
    setAuditLogs(prev => [
      {
        id: Date.now(),
        admin: "ADMIN",
        action,
        member: memberName,
        time: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  /* ================= ACTIONS ================= */
  const approveMember = (id) => {
    setMembers(members.map(m =>
      m.id === id
        ? { ...m, status: "Active", validTill: "2026-12-31" }
        : m
    ));
    const member = members.find(m => m.id === id);
    if (member) logAction("APPROVED", member.name);
  };

  const rejectMember = (id) => {
    setMembers(members.map(m =>
      m.id === id
        ? { ...m, status: "Rejected", validTill: null }
        : m
    ));
    const member = members.find(m => m.id === id);
    if (member) logAction("REJECTED", member.name);
  };

  const deactivateMember = (id) => {
    setMembers(members.map(m =>
      m.id === id
        ? { ...m, status: "Inactive" }
        : m
    ));
    const member = members.find(m => m.id === id);
    if (member) logAction("DEACTIVATED", member.name);
  };

  const extendValidity = (id) => {
    setMembers(members.map(m => {
      if (m.id === id && m.status === "Active") {
        const newDate = new Date(m.validTill);
        newDate.setFullYear(newDate.getFullYear() + 1);
        logAction("EXTENDED", m.name);
        return { ...m, validTill: newDate.toISOString().split("T")[0] };
      }
      return m;
    }));
  };

  const removeMember = (id) => {
    const member = members.find(m => m.id === id);
    if (!member) return;
    logAction("REMOVED", member.name);
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <>
      {/* Page Bar */}
      <div className="page-bar">
        <input
          className="search-input"
          placeholder="Search member…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn primary" onClick={() => setShowAdd(true)}>
          + Add Member
        </button>
      </div>

      {/* Add Member Modal */}
      {showAdd && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add New Member</h3>

            <input
              placeholder="Member Name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />

            <div className="modal-actions">
              <button className="btn primary" onClick={addMember}>
                Create (Pending)
              </button>
              <button className="btn" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="stats-row">
        <Stat label="Total Members" value={members.length} />
        <Stat label="Active Members" value={members.filter(m => m.status === "Active").length} />
        <Stat label="Inactive Members" value={members.filter(m => m.status === "Inactive").length} />
      </div>

      {/* Table */}
      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Valid Till</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* ✅ FIX: USE filteredMembers */}
            {filteredMembers.map(m => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>
                  <span className={`badge ${m.status.toLowerCase()}`}>
                    {m.status}
                  </span>
                </td>
                <td>{m.validTill || "-"}</td>

                <td className="actions">
                  {m.status === "Pending" && (
                    <>
                      <button className="btn primary" onClick={() => approveMember(m.id)}>Approve</button>
                      <button className="btn danger" onClick={() => rejectMember(m.id)}>Reject</button>
                    </>
                  )}

                  {m.status === "Active" && (
                    <>
                      <button className="btn warning" onClick={() => deactivateMember(m.id)}>Deactivate</button>
                      <button className="btn primary" onClick={() => extendValidity(m.id)}>Extend</button>
                      <button className="btn danger" onClick={() => removeMember(m.id)}>Remove</button>
                    </>
                  )}

                  {m.status === "Inactive" && (
                    <>
                      <button className="btn primary" onClick={() => approveMember(m.id)}>Reactivate</button>
                      <button className="btn danger" onClick={() => removeMember(m.id)}>Remove</button>
                    </>
                  )}

                  {m.status === "Rejected" && (
                    <>
                      <button className="btn primary" onClick={() => approveMember(m.id)}>Re-Approve</button>
                      <button className="btn danger" onClick={() => removeMember(m.id)}>Remove</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ================= AUDIT LOG TABLE ================= */}
<div className="card" style={{ marginTop: 30 }}>
  <h3 style={{ marginBottom: 16, color: "#0F3B5F" }}>
    Admin Audit Log
  </h3>
<div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
  <select
    value={logActionFilter}
    onChange={(e) => setLogActionFilter(e.target.value)}
    style={{ padding: "8px", borderRadius: 6 }}
  >
    <option value="ALL">All Actions</option>
    <option value="CREATED">Created</option>
    <option value="APPROVED">Approved</option>
    <option value="REJECTED">Rejected</option>
    <option value="DEACTIVATED">Deactivated</option>
    <option value="EXTENDED">Extended</option>
    <option value="REMOVED">Removed</option>
  </select>

  <input
    placeholder="Filter by member name"
    value={logMemberFilter}
    onChange={(e) => setLogMemberFilter(e.target.value)}
    style={{
      padding: "8px",
      borderRadius: 6,
      border: "1px solid #ccc",
    }}
  />
</div>

 {filteredAuditLogs.length === 0 ? (
    <p style={{ color: "#777" }}>No audit actions recorded.</p>
  ) : (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Admin</th>
          <th>Action</th>
          <th>Member</th>
          <th>Date & Time</th>
        </tr>
      </thead>
      <tbody>
        {filteredAuditLogs.map(log => (
          <tr key={log.id}>
            <td>{log.admin}</td>
            <td>
              <span className={`badge log-${log.action.toLowerCase()}`}>
                {log.action}
              </span>
            </td>
            <td>{log.member}</td>
            <td>{log.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </>
  );
}

/* ================= STAT CARD ================= */
function Stat({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
    
  );
}