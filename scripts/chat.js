const groupId = new URLSearchParams(window.location.search).get("group");

const socket = io("http://localhost:5000", {
  auth: { token: getToken() }
});

socket.emit("joinGroup", groupId);

socket.on("receiveMessage", msg => {
  const box = document.getElementById("chatBox");
  box.innerHTML += `
    <p><b>${msg.user}</b>: ${msg.text}</p>
  `;
});

function sendMessage() {
  const input = document.getElementById("messageInput");
  if (!input.value) return;

  socket.emit("sendMessage", {
    groupId,
    text: input.value
  });

  input.value = "";
}
