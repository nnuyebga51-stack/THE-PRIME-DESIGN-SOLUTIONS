// TEMP USERS (Replace with database later)
const users = [
  {
    email: "admin@tpds.com",
    password: "admin123",
    role: "admin",
    name: "System Admin"
  },
  {
    email: "user@tpds.com",
    password: "user123",
    role: "user",
    name: "Standard User"
  }
];

// LOGIN FUNCTION
function loginUser(email, password) {
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid login details");
    return;
  }

  setSession(user);

  if (user.role === "admin") {
    window.location.href = "../dashboard/AdminDashboard.html";
  } else {
    window.location.href = "../dashboard/UserDashboard.html";
  }
}

// LOGIN AS GUEST
function loginGuest() {
  const guest = {
    role: "guest",
    name: "Guest User"
  };

  setSession(guest);
  window.location.href = "../home/Home.html";
}

// REGISTER (Mock)
function registerUser(name, email, password) {
  alert("Account created successfully (database coming next)");
  window.location.href = "Login.html";
}
