import { post } from "./api.js";

async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await post("/auth/login", { email, password });

  if (res.msg) return alert(res.msg);

  setSession(res.user, res.token);

  if (res.user.role === "admin") {
    window.location.href = "../admin/AdminDashboard.html";
  } else {
    window.location.href = "../home/Home.html";
  }
}
