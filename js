function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 3) // skip short/common words
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
}

function checkMatch() {
  const resume = document.getElementById("resumeText").value;
  const job = document.getElementById("jobText").value;
  const resultBox = document.getElementById("resultBox");

  if (!resume || !job) {
    alert("Please paste both resume and job description.");
    return;
  }

  const resumeWords = extractKeywords(resume);
  const jobWords = extractKeywords(job);

  const jobKeys = Object.keys(jobWords);
  const resumeKeys = Object.keys(resumeWords);

  const matched = jobKeys.filter(word => resumeKeys.includes(word));
  const missing = jobKeys.filter(word => !resumeKeys.includes(word));

  const matchPercent = ((matched.length / jobKeys.length) * 100).toFixed(1);

  resultBox.innerHTML = `
    <h3>✅ Match: ${matchPercent}%</h3>
    <p><strong>Matched Keywords:</strong> ${matched.join(", ") || "None"}</p>
    <p><strong>Missing Keywords:</strong> ${missing.join(", ") || "None"}</p>
    ${
      missing.length > 0
        ? `<p>💡 Tip: Consider adding more about <em>${missing[0]}</em> or related experience.</p>`
        : `<p>🎉 Your resume matches the job description very well!</p>`
    }
  `;
}
