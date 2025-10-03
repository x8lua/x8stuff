// only store the keys (YYMMDD) -> we derive the file paths
const logs = {
  "250929": "250929",
  "250930": "250930",
  "251003": "251003"
};

const resultsDiv = document.getElementById("results");
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const dateList = document.getElementById("dateList");

function showResult(query) {
  const base = logs[query];
  if (!base) {
    resultsDiv.innerHTML = `<p>No results found for ${query}</p>`;
    resultsDiv.classList.add("show");
    return;
  }

  // try jpg first, then png
  const jpg = `/logs/${base}.jpg`;
  const png = `/logs/${base}.png`;

  const img = new Image();
  img.alt = `Audit log for ${query}`;
  img.onload = () => {
    resultsDiv.innerHTML = "";
    resultsDiv.appendChild(img);
    resultsDiv.classList.add("show");
  };
  img.onerror = () => {
    // second attempt with png
    img.onerror = () => {
      resultsDiv.innerHTML = `<p>Image not found for ${query}</p>`;
      resultsDiv.classList.add("show");
    };
    img.src = png;
  };
  img.src = jpg; // kick off: prefer jpg
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

// sidebar population
for (const date in logs) {
  const li = document.createElement("li");
  li.textContent = date; // e.g., 250929
  li.addEventListener("click", () => {
    input.value = date;
    showResult(date);
  });
  dateList.appendChild(li);
}
