const LS_RESULTS_KEY = "quizResults";

document.addEventListener("DOMContentLoaded", () => {
  const gradeFilter = document.getElementById("lb-grade-filter");
  const limitSelect = document.getElementById("lb-limit");

  gradeFilter.addEventListener("change", renderLeaderboard);
  limitSelect.addEventListener("change", renderLeaderboard);

  renderLeaderboard();
});

function loadResults() {
  try {
    return JSON.parse(localStorage.getItem(LS_RESULTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function renderLeaderboard() {
  const gradeFilter = document.getElementById("lb-grade-filter").value;
  const limit = parseInt(document.getElementById("lb-limit").value, 10);
  const tbody = document.getElementById("lb-body");
  const emptyMsg = document.getElementById("lb-empty");

  let results = loadResults();

  if (gradeFilter !== "all") {
    results = results.filter((r) => String(r.grade) === String(gradeFilter));
  }

  // sortiraj: prvo po postotku, zatim po bodovima, zatim po vremenu (novije gore)
  results.sort((a, b) => {
    if (b.percent !== a.percent) return b.percent - a.percent;
    if (b.score !== a.score) return b.score - a.score;
    return b.timestamp - a.timestamp;
  });

  results = results.slice(0, limit);

  tbody.innerHTML = "";

  if (results.length === 0) {
    emptyMsg.classList.remove("hidden");
    return;
  } else {
    emptyMsg.classList.add("hidden");
  }

  results.forEach((r, index) => {
    const tr = document.createElement("tr");

    const date = new Date(r.timestamp);
    const dateStr = date.toLocaleString("hr-HR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(r.name)}</td>
      <td>${r.grade}. raz.</td>
      <td>${r.percent}%</td>
      <td>${r.score}/${r.total}</td>
      <td>${dateStr}</td>
    `;

    tbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
