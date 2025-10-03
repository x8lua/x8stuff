// --- PASSWORD GATE ---
async function checkPassword() {
  const input = document.getElementById("pwdInput").value.trim();

  try {
    const res = await fetch("/api/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: input })
    });
    const data = await res.json();

    if (data.ok) {
      // hide password inputs, but keep the intro text
      document.getElementById("pwdInput").style.display = "none";
      document.getElementById("pwdBtn").style.display = "none";
      document.getElementById("pwdMsg").style.display = "none";

      // fade out lockscreen background
      document.getElementById("lockScreen").style.background = "transparent";

      // show search content
      document.getElementById("searchContent").style.display = "block";

      // trigger tween of the intro
      document.body.classList.add("entered");
    } else {
      document.getElementById("pwdMsg").textContent = "Wrong password.";
    }
  } catch (err) {
    document.getElementById("pwdMsg").textContent = "Server error: " + err.message;
  }
}

document.getElementById("pwdBtn").addEventListener("click", checkPassword);
document.getElementById("pwdInput").addEventListener("keydown", e => {
  if (e.key === "Enter") checkPassword();
});

// --- LOG SEARCH ---
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
    img.onerror = () => {
      resultsDiv.innerHTML = `<p>Image not found for ${query}</p>`;
      resultsDiv.classList.add("show");
    };
    img.src = png;
  };
  img.src = jpg;
}

btn.addEventListener("click", () => showResult(input.value.trim()));
input.addEventListener("keydown", e => { if (e.key === "Enter") btn.click(); });

// populate sidebar list
for (const date in logs) {
  const li = document.createElement("li");
  li.textContent = date;
  li.addEventListener("click", () => {
    input.value = date;
    showResult(date);
  });
  dateList.appendChild(li);
}
