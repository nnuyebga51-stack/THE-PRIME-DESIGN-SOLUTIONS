// 📁 frontend/scripts/auth.js

// Login function
async function loginUser(email, password) {
  try {
    const data = await api.post("/auth/login", { email, password });
    
    if (data.msg) {
      alert(data.msg);
      return false;
    }

    // Store session data
    localStorage.setItem("tpds_session", JSON.stringify(data.user));
    localStorage.setItem("tpds_token", data.token);

    // Redirect based on role
    if (data.user.role === "admin") {
      window.location.href = "../admin/AdminDashboard.html";
    } else {
      window.location.href = "../home/Home.html";
    }
    
    return true;
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed. Please check your credentials.");
    return false;
  }
}

// Register function
async function registerUser(name, email, password) {
  try {
    const data = await api.post("/auth/register", { name, email, password });
    
    if (data.msg) {
      alert(data.msg);
      return false;
    }

    alert("Account created successfully! Please login.");
    window.location.href = "Login.html";
    return true;
  } catch (err) {
    console.error("Registration error:", err);
    alert("Registration failed. Please try again.");
    return false;
  }
}

// Logout function
function logoutUser() {
  localStorage.removeItem("tpds_session");
  localStorage.removeItem("tpds_token");
  window.location.href = "../auth/Login.html";
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("tpds_token") !== null;
}

// Get current user
function getCurrentUser() {
  const session = localStorage.getItem("tpds_session");
  return session ? JSON.parse(session) : null;
}

// Get token
function getToken() {
  return localStorage.getItem("tpds_token");
}

// Export functions
window.auth = {
  loginUser,
  registerUser,
  logoutUser,
  isLoggedIn,
  getCurrentUser,
  getToken
};