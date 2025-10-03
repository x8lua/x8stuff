// --- PASSWORD GATE ---
async function checkPassword() {
  const input = document.getElementById("pwdInput").value.trim();
  const res = await fetch("/api/check-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: input })
  });
  const data = await res.json();

  if (data.ok) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("searchContent").style.display = "block";
  } else {
    document.getElementById("pwdMsg").textContent = "Wrong password.";
  }
}
document.getElementById("pwdBtn").addEventListener("click", checkPassword);
document.getElementById("pwdInput").addEventListener("keydown", e => {
  if (e.key === "Enter") checkPassword();
});

// --- TYPEWRITER TAGLINES ---
const taglines = [
  "keeping track of what each class covered today.",
  "a daily record of lessons and activities.",
  "the timeline of every subject in this classroom.",
  "logs that show exactly what was taught and when.",
  "simple entries that capture each lesson’s focus."
];

let currentLine = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 35;   // typing speed (ms)
const pause = 1000; // pause at end

const twElem = document.getElementById("typewriterText");

function typewriter() {
  const line = taglines[currentLine];

  if (isDeleting) {
    charIndex--;
    twElem.textContent = line.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      currentLine = (currentLine + 1) % taglines.length;
    }
  } else {
    charIndex++;
    twElem.textContent = line.substring(0, charIndex);
    if (charIndex === line.length) {
      isDeleting = true;
      setTimeout(typewriter, pause);
      return;
    }
  }
  setTimeout(typewriter, speed);
}
window.addEventListener("load", () => { typewriter(); });

// --- CLASSROOM LOG SEARCH ---
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

  // prefer .jpg, fallback .png
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

// populate sidebar
for (const date in logs) {
  const li = document.createElement("li");
  li.textContent = date;
  li.addEventListener("click", () => {
    input.value = date;
    showResult(date);
  });
  dateList.appendChild(li);
}
