async function uploadCAD() {
  const title = document.getElementById("cadTitle").value;
  const file = document.getElementById("cadFile").files[0];
  const premium = document.getElementById("cadPremium").checked;

  if (!title || !file) return alert("All fields required");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);
  formData.append("premium", premium);

  await fetch("http://localhost:5000/api/cad", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  });

  alert("Upload successful!");
  location.reload();
}
