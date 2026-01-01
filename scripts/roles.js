const sessionUser = getSession();

// Redirect if not logged in
if (!sessionUser) {
  window.location.href = "../auth/Login.html";
}

// Admin-only pages
function adminOnly() {
  if (sessionUser.role !== "admin") {
    alert("Access denied: Admins only");
    window.location.href = "../home/Home.html";
  }
}

// User-only pages
function userOnly() {
  if (sessionUser.role === "guest") {
    alert("Please create an account to access this page");
    window.location.href = "../auth/Login.html";
  }
}
