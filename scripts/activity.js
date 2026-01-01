// Mock activity data (replace with database later)
let activityLog = [
  { timestamp: "2025-12-27 10:05", user: "admin@tpds.com", role: "admin", action: "Login", details: "Accessed Admin Dashboard" },
  { timestamp: "2025-12-27 10:10", user: "user@tpds.com", role: "user", action: "Upload", details: "Uploaded CAD: Four-Bar Mechanism" },
  { timestamp: "2025-12-27 10:15", user: "user@tpds.com", role: "user", action: "Post Question", details: "How to constrain parts in assembly?" }
];

// Render activity table
function renderActivity() {
  const tbody = document.getElementById("activityBody");
  tbody.innerHTML = "";

  activityLog.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.timestamp}</td>
      <td>${item.user}</td>
      <td>${item.role}</td>
      <td>${item.action}</td>
      <td>${item.details}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Add new activity (call this in your other scripts when actions occur)
function logActivity(user, role, action, details) {
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  activityLog.push({ timestamp, user, role, action, details });
  renderActivity();
}
