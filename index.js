document.addEventListener("DOMContentLoaded", function () {
  // Footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Title
  const startDate = new Date("2026-01-10");
  const today = new Date();

  let months =
    (today.getFullYear() - startDate.getFullYear()) * 12 +
    (today.getMonth() - startDate.getMonth());

  if (today.getDate() < startDate.getDate()) {
    months--;
  }

  months = Math.max(months, 1);

  let h1Text;
  let tabTitleText;

  function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
  }

  if (months < 12) {
    const monthWord = pluralize(months, "Month", "Months");
    h1Text = `💖 Our ${months} ${monthWord} Dating Anniversary 💖`;
    tabTitleText = `${months} ${monthWord} Dating Anniversary`;
  } else {
    const years = Math.floor(months / 12);
    const yearWord = pluralize(years, "Year", "Years");
    h1Text = `💖 Our ${years} ${yearWord} Anniversary 💖`;
    tabTitleText = `${years} ${yearWord} Anniversary`;
  }

  document.getElementById("anniversaryTitle").textContent = h1Text;
  document.title = tabTitleText;
});

// Loading
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() < 0.5 ? "💜" : "💛";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 2 + "s";

  const size = 40 + Math.random() * 20;
  heart.style.fontSize = size + "px";

  document.getElementById("heart-container").appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}

const TOTAL_HEARTS = 30;
const HEART_INTERVAL = 150;
const LOADING_DURATION = TOTAL_HEARTS * HEART_INTERVAL + 3000;

for (let i = 0; i < TOTAL_HEARTS; i++) {
  setTimeout(createHeart, i * HEART_INTERVAL);
}

setTimeout(() => {
  document.getElementById("loading").classList.add("hidden");

  setTimeout(() => {
    document.querySelector(".flower").classList.add("visible");
  }, 1500);
}, LOADING_DURATION);

// Background
function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.textContent = "🌸";

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 10 + Math.random() * 10 + "s";
  petal.style.fontSize = 30 + Math.random() * 15 + "px";

  document.getElementById("petal-container").appendChild(petal);

  setTimeout(() => petal.remove(), 20000);
}

setInterval(createPetal, 2000);

// Counter
function updateCounter() {
  const startDate = new Date("2026-01-10T00:00:00");
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  const parts = [];

  if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);

  document.getElementById("timeCounter").textContent =
    `💕 Together for ${parts.join(", ")} 💕`;
}

updateCounter();
setInterval(updateCounter, 60000);

// Flower Messages
const flower = document.querySelector(".flower");
const message = document.getElementById("flower-message");
const messages = [
  "💕 You're the love of my life 💕",
  "💗 I can't wait to see who you'll become and everything you'll do 💗",
  "💘 I love you so so so much 💘",
  "💖 Thank you for being you 💖",
  "💜 You light me up just by being you 💜",
];

let hideTimeout;

flower.addEventListener("click", () => {
  message.textContent = messages[Math.floor(Math.random() * messages.length)];
  message.classList.add("visible");

  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    message.classList.remove("visible");
  }, 5000);
});
