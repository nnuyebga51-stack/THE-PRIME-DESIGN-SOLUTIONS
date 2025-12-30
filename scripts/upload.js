const user = getSession();

const uploadSection = document.getElementById("uploadSection");

if (user && (user.role === "admin" || user.role === "user")) {
  uploadSection.innerHTML = `
    <div class="featureCard">
      <h4>Upload CAD Design</h4>
      <input type="text" id="cadTitle" placeholder="Design Title" />
      <input type="text" id="cadType" placeholder="File Type (.STEP, .IGES)" />
      <label>
        <input type="checkbox" id="cadPremium" /> Premium Design
      </label>
      <button class="btn primary" onclick="uploadCAD()">Upload</button>
    </div>
  `;
}

function uploadCAD() {
  const title = document.getElementById("cadTitle").value;
  const type = document.getElementById("cadType").value;
  const premium = document.getElementById("cadPremium").checked;

  if (!title || !type) {
    alert("Please fill all fields");
    return;
  }

  const cadFiles = JSON.parse(localStorage.getItem("tpds_cad_files")) || [];

  cadFiles.push({
    id: "cad_" + Date.now(),
    title,
    author: user.email,
    fileType: type,
    premium,
    uploadedAt: new Date().toLocaleDateString()
  });

  localStorage.setItem("tpds_cad_files", JSON.stringify(cadFiles));
  alert("CAD file uploaded successfully!");
  location.reload();
}
