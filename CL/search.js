// only store the keys (YYDDMM), don't hardcode extensions
const logs = {
  "250929": "250929",
  "250930": "250930",
  "251003": "251003"
};

const resultsDiv = document.getElementById("results");
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");

// format check: YYDDMM
function normalizeDate(query) {
  if (/^\d{6}$/.test(query)) {
    return query;
  }
  return null;
}

function showResult(query) {
  const dateKey = normalizeDate(query);
  if (dateKey && logs[dateKey]) {
    // try both png and jpg
    const base = logs[dateKey];
    const pngPath = `/logs/${base}.png`;
    const jpgPath = `/logs/${base}.jpg`;

    // default try jpg first, fallback png
    resultsDiv.innerHTML = `
      <img src="${jpgPath}" 
           alt="Audit log for ${dateKey}" 
           onerror="this.onerror=null; this.src='${pngPath}';">`;
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
