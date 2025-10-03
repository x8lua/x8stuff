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

// taglines to rotate under "Audit Log"
const taglines = [
  "Records that whisper the stories of every classroom day.",
  "Notes that turn small moments into lasting memories.",
  "The log that keeps every laugh and silence alive.",
  "Where daily chaos becomes neat, glowing entries.",
  "Each page a trace of the room’s hidden energy."
];

let currentLine = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 60; // typing speed
const pause = 1500; // pause at end of line

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

// start the animation after page loads
window.addEventListener("load", () => {
  typewriter();
});

