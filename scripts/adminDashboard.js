const session = getSession();

if (!session || session.role !== "admin") {
  alert("Admin access only");
  window.location.href = "../home/Home.html";
}

const table = document.getElementById("logTable");
const logs = JSON.parse(localStorage.getItem("tpds_activity_logs")) || [];

logs.reverse().forEach(log => {
  table.innerHTML += `
    <tr>
      <td>${log.user}</td>
      <td>${log.role}</td>
      <td>${log.action}</td>
      <td>${log.page}</td>
      <td>${log.timestamp}</td>
    </tr>
  `;
});
