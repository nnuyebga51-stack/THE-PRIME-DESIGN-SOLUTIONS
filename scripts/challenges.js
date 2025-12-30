const challengeList = document.getElementById("challengeList");
const adminSection = document.getElementById("adminChallenge");
const session = getSession();

let challenges = JSON.parse(localStorage.getItem("tpds_challenges")) || [];

/* ADMIN CREATE */
if (session?.role === "admin") {
  adminSection.innerHTML = `
    <div class="featureCard">
      <h4>Create New Challenge</h4>
      <input id="chTitle" placeholder="Challenge Title" />
      <textarea id="chDesc" placeholder="Description"></textarea>
      <input type="date" id="chDeadline" />
      <button class="btn primary" onclick="createChallenge()">Create</button>
    </div>
  `;
}

function createChallenge() {
  const title = chTitle.value;
  const description = chDesc.value;
  const deadline = chDeadline.value;

  if (!title || !deadline) {
    alert("All fields required");
    return;
  }

  challenges.push({
    id: "ch_" + Date.now(),
    title,
    description,
    deadline,
    createdBy: session.email,
    submissions: []
  });

  localStorage.setItem("tpds_challenges", JSON.stringify(challenges));
  location.reload();
}

/* RENDER */
function renderChallenges() {
  challengeList.innerHTML = "";

  challenges.forEach(ch => {
    challengeList.innerHTML += `
      <div class="featureCard">
        <h4>${ch.title}</h4>
        <p>${ch.description}</p>
        <p><strong>Deadline:</strong> ${ch.deadline}</p>

        ${
          session?.role === "admin"
            ? `<button class="btn ghost" onclick="viewSubmissions('${ch.id}')">View Submissions</button>`
            : ""
        }

        ${
          session?.role === "user"
            ? `<button class="btn primary" onclick="joinChallenge('${ch.id}')">Participate</button>`
            : ""
        }
      </div>
    `;
  });
}

renderChallenges();
