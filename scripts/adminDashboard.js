import { get } from "./api.js";

async function loadLogs() {
  const logs = await get("/admin/logs", getToken());
  const table = document.getElementById("logTable");

  logs.forEach(log => {
    table.innerHTML += `
      <tr>
        <td>${log.user}</td>
        <td>${log.role}</td>
        <td>${log.action}</td>
        <td>${log.page}</td>
        <td>${new Date(log.timestamp).toLocaleString()}</td>
      </tr>
    `;
  });
}

loadLogs();
