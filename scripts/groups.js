import { get, post } from "./api.js";

async function loadGroups() {
  const groups = await get("/group", getToken());
  const container = document.getElementById("groupList");
  const user = getUser();

  container.innerHTML = "";

  groups.forEach(g => {
    container.innerHTML += `
      <div class="featureCard">
        <h4>${g.name}</h4>
        <p>Status: ${g.open ? "Open" : "Closed"}</p>
        ${
          user.role === "admin"
            ? `<button onclick="toggleGroup('${g._id}')">Toggle Chat</button>`
            : `<button onclick="joinGroup('${g._id}')">Join</button>`
        }
      </div>
    `;
  });
}

async function joinGroup(id) {
  await post(`/group/${id}/join`, {}, getToken());
  alert("Joined group!");
}

async function toggleGroup(id) {
  await post(`/group/${id}/toggle`, {}, getToken());
  loadGroups();
}

loadGroups();
