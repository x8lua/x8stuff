// only store the keys (YYDDMM), don't hardcode extensions
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
  if (logs[query]) {
    resultsDiv.innerHTML = `<img src="${logs[query]}" alt="Audit log for ${query}">`;
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

// populate sidebar list
for (const date in logs) {
  const li = document.createElement("li");
  li.textContent = date; // shows 250929 etc
  li.addEventListener("click", () => {
    input.value = date;
    showResult(date);
  });
  dateList.appendChild(li);
}
