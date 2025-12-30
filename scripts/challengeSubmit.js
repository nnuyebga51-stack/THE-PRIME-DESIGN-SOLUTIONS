function joinChallenge(id) {
  const ch = challenges.find(c => c.id === id);

  const fileName = prompt("Enter CAD file name (simulation):");

  if (!fileName) return;

  ch.submissions.push({
    user: session.email,
    fileName,
    submittedAt: new Date().toLocaleDateString()
  });

  localStorage.setItem("tpds_challenges", JSON.stringify(challenges));
  alert("Submission successful!");
}

/* ADMIN VIEW */
function viewSubmissions(id) {
  const ch = challenges.find(c => c.id === id);
  let msg = `Submissions for ${ch.title}\n\n`;

  ch.submissions.forEach(s => {
    msg += `${s.user} → ${s.fileName} (${s.submittedAt})\n`;
  });

  alert(msg || "No submissions yet");
}
