// Save logged-in user
function setSession(user) {
  localStorage.setItem("tpds_user", JSON.stringify(user));
}

// Get logged-in user
function getSession() {
  return JSON.parse(localStorage.getItem("tpds_user"));
}

// Clear session (logout)
function clearSession() {
  localStorage.removeItem("tpds_user");
}
