function logActivity(action, page) {
  const session = getSession();
  if (!session) return;

  const logs = JSON.parse(localStorage.getItem("tpds_activity_logs")) || [];

  logs.push({
    id: "log_" + Date.now(),
    user: session.email,
    role: session.role,
    action,
    page,
    timestamp: new Date().toLocaleString()
  });

  localStorage.setItem("tpds_activity_logs", JSON.stringify(logs));
}
