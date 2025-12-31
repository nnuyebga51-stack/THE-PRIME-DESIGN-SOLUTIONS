import { post } from "./api.js";

async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await post("/auth/register", { name, email, password });

  if (res.msg) return alert(res.msg);

  alert("Account created successfully!");
  window.location.href = "Login.html";
}
