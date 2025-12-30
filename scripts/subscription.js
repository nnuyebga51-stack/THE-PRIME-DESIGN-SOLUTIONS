function subscribeUser() {
  const session = getSession();
  if (!session || session.role !== "user") {
    alert("Only logged-in users can subscribe.");
    return;
  }

  // Update user in users database
  let users = JSON.parse(localStorage.getItem("tpds_users")) || [];
  users = users.map(u => {
    if (u.email === session.email) {
      u.subscribed = true;
      session.subscribed = true;
    }
    return u;
  });

  localStorage.setItem("tpds_users", JSON.stringify(users));
  setSession(session);

  alert("Subscription activated successfully!");
  window.location.href = "../tutorials/Tutorials.html";
}
