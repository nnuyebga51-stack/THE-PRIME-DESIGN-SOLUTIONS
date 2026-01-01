import { get, post } from "./api.js";

async function loadChallenges() {
  const challenges = await get("/challenge", getToken());
  const container = document.getElementById("challengeList");
  const user = getUser();

  container.innerHTML = "";

  challenges.forEach(ch => {
    container.innerHTML += `
      <div class="featureCard">
        <h4>${ch.title}</h4>
        <p>${ch.description}</p>

        ${
          user.role === "admin"
            ? `<button onclick="viewSubmissions('${ch._id}')">View Submissions</button>`
            : `<button onclick="submitChallenge('${ch._id}')">Participate</button>`
        }
      </div>
    `;
  });
}

async function submitChallenge(id) {
  const fileName = prompt("Enter CAD file name:");
  await post(`/challenge/${id}/submit`, { fileName }, getToken());
  alert("Submitted successfully!");
}

loadChallenges();
