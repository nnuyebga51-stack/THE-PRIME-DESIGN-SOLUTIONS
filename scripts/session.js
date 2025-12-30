// Save logged-in user
function setSession(user) {
  localStorage.setItem("tpds_session", JSON.stringify(user));
}

// Get current session
function getSession() {
  return JSON.parse(localStorage.getItem("tpds_session"));
}

// Clear session
function logout() {
  localStorage.removeItem("tpds_session");
  window.location.href = "../../index.html";
}
