// map each date to your log image
const logs = {
  "2025-10-01": "/logs/2025-10-01.png",
  "2025-10-02": "/logs/2025-10-02.png",
  "2025-10-03": "/logs/2025-10-03.png"  // your scanned page
};

const resultsDiv = document.getElementById("results");
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");

function normalizeDate(query) {
  // allow "20251003" → "2025-10-03"
  if (/^\d{8}$/.test(query)) {
    return `${query.slice(0,4)}-${query.slice(4,6)}-${query.slice(6)}`;
  }
  return query;
}

function showResult(query) {
  const date = normalizeDate(query);
  if (logs[date]) {
    resultsDiv.innerHTML = `<img src="${logs[date]}" alt="Audit log for ${date}" style="max-width:100%; border:2px solid #00fff7; box-shadow:0 0 15px #00fff7">`;
  } else {
    resultsDiv.innerHTML = `<p>No results found for ${query}</p>`;
  }
  resultsDiv.classList.add("show");
}

btn.addEventListener("click", () => {
  const query = input.value.trim();
  showResult(query);
});

input.addEventListener("keydown", e => {
  if (e.key === "Enter") btn.click();
});

document.body.addEventListener("click", () => {
  if (!document.body.classList.contains("entered")) {
    document.body.classList.add("entered");
  }
});
