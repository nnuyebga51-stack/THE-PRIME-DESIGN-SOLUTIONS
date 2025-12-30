const chatBox = document.getElementById("chatBox");

function openChat(id) {
  const group = groups.find(g => g.id === id);

  chatBox.innerHTML = `
    <div class="featureCard">
      <h4>${group.name} Chat</h4>

      <div class="chatMessages">
        ${group.messages.map(m => `
          <p><strong>${m.user}:</strong> ${m.text}</p>
        `).join("")}
      </div>

      ${
        group.open
          ? `
            <input id="chatInput" placeholder="Type message..." />
            <button class="btn primary" onclick="sendMessage('${id}')">Send</button>
          `
          : `<p><em>Chat is closed by admin</em></p>`
      }
    </div>
  `;
}

function sendMessage(id) {
  const text = document.getElementById("chatInput").value;
  if (!text) return;

  const group = groups.find(g => g.id === id);

  group.messages.push({
    user: session.email,
    text,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("tpds_groups", JSON.stringify(groups));
  openChat(id);
}
