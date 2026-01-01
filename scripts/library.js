// 📁 frontend/scripts/library.js

// Load CAD files from backend
async function loadCADFiles() {
  try {
    const token = auth.getToken();
    const files = await api.get("/cad", token);
    
    // Call your existing render function
    if (typeof renderCAD === 'function') {
      renderCAD(files);
    } else {
      console.error("renderCAD function not found");
    }
    
    return files;
  } catch (err) {
    console.error("Error loading CAD files:", err);
    alert("Failed to load CAD files");
    return [];
  }
}

// Upload CAD file
async function uploadCAD() {
  const title = document.getElementById("cadTitle").value;
  const description = document.getElementById("cadDescription")?.value || "";
  const fileInput = document.getElementById("cadFile");
  
  if (!title || !fileInput.files.length) {
    alert("Please enter a title and select a file");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", fileInput.files[0]);
  
  // Check if premium checkbox exists
  const premiumCheckbox = document.getElementById("cadPremium");
  if (premiumCheckbox) {
    formData.append("premium", premiumCheckbox.checked);
  }

  try {
    const token = auth.getToken();
    const result = await api.uploadFile("/cad", formData, token);
    
    alert("CAD file uploaded successfully!");
    
    // Clear form
    document.getElementById("cadTitle").value = "";
    document.getElementById("cadDescription").value = "";
    document.getElementById("cadFile").value = "";
    if (premiumCheckbox) premiumCheckbox.checked = false;
    
    // Refresh the list
    await loadCADFiles();
    
    return result;
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed");
    return null;
  }
}

// Delete CAD file
async function deleteCADFile(fileId) {
  if (!confirm("Are you sure you want to delete this file?")) return;
  
  try {
    const token = auth.getToken();
    await api.delete(`/cad/${fileId}`, token);
    
    alert("File deleted successfully");
    await loadCADFiles(); // Refresh list
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete file");
  }
}

// Export functions
window.cadLibrary = {
  loadCADFiles,
  uploadCAD,
  deleteCADFile
};