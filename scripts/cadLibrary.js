const cadList = document.getElementById("cadList");
const searchInput = document.getElementById("searchInput");

const session = getSession();
let cadFiles = JSON.parse(localStorage.getItem("tpds_cad_files")) || [];

function renderCAD(files) {
  cadList.innerHTML = "";

  files.forEach(file => {
    const locked = file.premium && (!session || !session.subscribed);

    cadList.innerHTML += `
      <div class="featureCard">
        <h4>${file.title}</h4>
        <p>Type: ${file.fileType}</p>
        <p>By: ${file.author}</p>
        <p>Date: ${file.uploadedAt}</p>
        <button class="btn ${locked ? "secondary" : "primary"}"
          ${locked ? "disabled" : ""}
          onclick="downloadCAD('${file.id}')">
          ${locked ? "Premium Only" : "Download"}
        </button>

        ${
          session?.role === "admin"
            ? `<button class="btn ghost" onclick="deleteCAD('${file.id}')">Delete</button>`
            : ""
        }
      </div>
    `;
  });
}

function downloadCAD(id) {
  alert("Downloading CAD file (simulation)...");
}

function deleteCAD(id) {
  cadFiles = cadFiles.filter(f => f.id !== id);
  localStorage.setItem("tpds_cad_files", JSON.stringify(cadFiles));
  renderCAD(cadFiles);
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  renderCAD(cadFiles.filter(f => f.title.toLowerCase().includes(value)));
});

renderCAD(cadFiles);
