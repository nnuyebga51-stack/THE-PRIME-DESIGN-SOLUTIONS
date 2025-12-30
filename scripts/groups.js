const session = getSession();
const groupList = document.getElementById("groupList");
const adminGroup = document.getElementById("adminGroup");

let groups = JSON.parse(localStorage.getItem("tpds_groups")) || [];

/* ADMIN CREATE GROUP */
if (session?.role === "admin") {
  adminGroup.innerHTML = `
    <div class="featureCard">
      <h4>Create Group</h4>
      <input id="groupName" placeholder="Group Name" />
      <button class="btn primary" onclick="createGroup()">Create</button>
    </div>
  `;
}

function createGroup() {
  const name = groupName.value;
  if (!name) return alert("Enter group name");

  groups.push({
    id: "grp_" + Date.now(),
    name,
    open: true,
    members: [],
    messages: []
  });

  localStorage.setItem("tpds_groups", JSON.stringify(groups));
  location.reload();
}

/* RENDER GROUPS */
function renderGroups() {
  groupList.innerHTML = "";

  groups.forEach(g => {
    const isMember = g.members.includes(session?.email);

    groupList.innerHTML += `
      <div class="featureCard">
        <h4>${g.name}</h4>
        <p>Status: ${g.open ? "Open" : "Closed"}</p>

        ${
          session?.role === "user" && !isMember
            ? `<button class="btn primary" onclick="joinGroup('${g.id}')">Join</button>`
            : ""
        }

        ${
          isMember
            ? `<button class="btn ghost" onclick="openChat('${g.id}')">Open Chat</button>`
            : ""
        }

        ${
          session?.role === "admin"
            ? `
              <button class="btn ghost" onclick="toggleChat('${g.id}')">
                ${g.open ? "Close Chat" : "Open Chat"}
              </button>
            `
            : ""
        }
      </div>
    `;
  });
}

function joinGroup(id) {
  const group = groups.find(g => g.id === id);
  group.members.push(session.email);
  localStorage.setItem("tpds_groups", JSON.stringify(groups));
  renderGroups();
}

function toggleChat(id) {
  const group = groups.find(g => g.id === id);
  group.open = !group.open;
  localStorage.setItem("tpds_groups", JSON.stringify(groups));
  renderGroups();
}

renderGroups();
