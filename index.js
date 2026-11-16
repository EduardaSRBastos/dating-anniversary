const START_DATE = new Date(2026, 0, 10);

function getMonthsTogether() {
  const today = new Date();
  let months =
    (today.getFullYear() - START_DATE.getFullYear()) * 12 +
    (today.getMonth() - START_DATE.getMonth());

  if (today.getDate() < START_DATE.getDate()) {
    months--;
  }

  return Math.max(months, 1);
}

// DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  const months = getMonthsTogether();
  generateFlowers(months);

  const grass = document.querySelector(".grass");
  const baseWidth = 550;
  const growthPerMonth = 100;
  const extraPerBouquet = 150;
  const bouquetCount = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const grassWidth =
    baseWidth +
    remainingMonths * growthPerMonth +
    bouquetCount * extraPerBouquet;

  grass.style.width = `${grassWidth}px`;
  grass.style.left = bouquetCount > 0 ? "50%" : "47%";

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

// LOADING
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
    const flower = document.querySelector(".flower");
    if (flower) flower.classList.add("visible");
  }, 1500);
}, LOADING_DURATION);

// BACKGROUND
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

// COUNTER
function updateCounter() {
  const startDate = START_DATE;
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

  if (parts.length === 0) parts.push("less than a minute");

  document.getElementById("timeCounter").textContent =
    `💕 Together for ${parts.join(", ")} 💕`;
}

updateCounter();
setInterval(updateCounter, 60000);

// FLOWER TEMPLATE
const flowerTemplate = `
    <div class="flower rose">
      <div class="flower-sway">
        <svg class="rose-svg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="70" class="petal outer"/>
          <circle cx="80" cy="90" r="55" class="petal outer"/>
          <circle cx="120" cy="90" r="55" class="petal outer"/>
          <circle cx="100" cy="105" r="45" class="petal mid"/>
          <path d="M100 100
            m-20 0
            a20 20 0 1 1 40 0
            a12 12 0 1 0 -24 0
            a6 6 0 1 1 12 0"
            class="petal inner"/>
        </svg>
      </div>
      <div class="stem"></div>
      <div class="leaf left"></div>
      <div class="leaf right"></div>
    </div>
`;

// FLOWER COLORS
// Each flower uses one colour family, with slightly different shades for depth.
const flowerColors = {
  red: {
    outer: "#a50a36",
    mid: "#e63956",
    inner: "#720000",
  },
  pink: {
    outer: "#bd436a",
    mid: "#f19ab3",
    inner: "#9b2244",
  },
  yellow: {
    outer: "#fcd436",
    mid: "#f9c74f",
    inner: "#aa7409",
  },
};

// INTERPOLATE COLOURS FOR THE SINGLE ROSES
function interpolateColor(start, end, amount) {
  const startValue = parseInt(start.slice(1), 16);
  const endValue = parseInt(end.slice(1), 16);

  const r1 = (startValue >> 16) & 255;
  const g1 = (startValue >> 8) & 255;
  const b1 = startValue & 255;

  const r2 = (endValue >> 16) & 255;
  const g2 = (endValue >> 8) & 255;
  const b2 = endValue & 255;

  const r = Math.round(r1 + (r2 - r1) * amount);
  const g = Math.round(g1 + (g2 - g1) * amount);
  const b = Math.round(b1 + (b2 - b1) * amount);

  return (
    "#" + [r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")
  );
}

function getSingleRoseColors(index, total) {
  const progress = total <= 1 ? 0 : index / (total - 1);

  let start;
  let end;
  let amount;

  if (progress <= 0.5) {
    start = flowerColors.red;
    end = flowerColors.pink;
    amount = progress * 2;
  } else {
    start = flowerColors.pink;
    end = flowerColors.yellow;
    amount = (progress - 0.5) * 2;
  }

  return {
    outer: interpolateColor(start.outer, end.outer, amount),
    mid: interpolateColor(start.mid, end.mid, amount),
    inner: interpolateColor(start.inner, end.inner, amount),
  };
}

// FLOWER CREATION
function createFlower(index, container, colors) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = flowerTemplate;

  const flower = wrapper.firstElementChild;

  flower.querySelectorAll(".petal.outer").forEach((petal) => {
    petal.style.fill = colors.outer;
  });

  flower.querySelector(".petal.mid").style.fill = colors.mid;
  flower.querySelector(".petal.inner").style.fill = colors.inner;

  attachFlowerClick(flower);
  container.appendChild(flower);

  return flower;
}

// FLOWERS LOGIC
function generateFlowers(months) {
  const container = document.getElementById("flower-container");
  const spacing = window.innerWidth <= 768 ? 100 : 150;
  const verticalStep = 5;

  container.innerHTML = "";

  // SINGLE ROSES: RED TO PINK TO YELLOW
  if (months < 12) {
    for (let i = 0; i < months; i++) {
      const colors = getSingleRoseColors(i, months);
      const flower = createFlower(i, container, colors);

      let offsetX = 0;
      let offsetY = 0;

      if (i !== 0) {
        const step = Math.ceil(i / 2);
        const direction = i % 2 === 1 ? -1 : 1;
        offsetX = step * spacing * direction;
        offsetY = step * verticalStep;
      }

      flower.style.left = `calc(50% + ${offsetX}px)`;
      flower.style.bottom = `${120 - offsetY}px`;

      setTimeout(() => {
        flower.classList.add("visible");
      }, i * 600);
    }
    return;
  }

  // ONE BOUQUET FOR EVERY COMPLETE 12 MONTHS
  const bouquetCount = Math.floor(months / 12);
  const remainingFlowers = months % 12;

  for (let i = 0; i < bouquetCount; i++) {
    const bouquet = document.createElement("div");
    bouquet.className = "bouquet";
    bouquet.style.position = "absolute";
    bouquet.style.width = "0";
    bouquet.style.height = "0";

    const flowerPosition = i * 12;
    let offsetX = 0;
    let offsetY = 0;

    if (flowerPosition !== 0) {
      const step = Math.ceil(flowerPosition / 2);
      const direction = flowerPosition % 2 === 1 ? -1 : 1;
      offsetX = step * spacing * direction;
      offsetY = step * verticalStep;
    }

    bouquet.style.left = `calc(50% + ${offsetX}px)`;
    bouquet.style.bottom = `${150 - offsetY}px`;

    // All stems converge at this shared point
    const convergenceY = 220;
    const stemTop = 108;
    const flowerHeight = 100;

    for (let j = 0; j < 12; j++) {
      let colors;
      let angle;
      let radius;

      // RED CENTRE
      if (j === 0) {
        colors = flowerColors.red;
        angle = 0;
        radius = 0;
      }
      // PINK INNER RING
      else if (j <= 5) {
        colors = flowerColors.pink;
        angle = ((j - 1) / 5) * Math.PI * 2;
        radius = 60;
      }
      // YELLOW OUTER RING
      else {
        colors = flowerColors.yellow;
        angle = ((j - 6) / 6) * Math.PI * 2;
        radius = 90;
      }

      const flower = createFlower(flowerPosition + j, bouquet, colors);

      // Position flower heads in circular rings
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      flower.style.left = `calc(50% + ${x}px)`;
      flower.style.bottom = `${y}px`;

      // Keep the colour layers visible
      flower.style.zIndex = j === 0 ? "3" : j <= 5 ? "2" : "1";

      // Calculate the stem's exact path to the shared point
      const stemStartY = -flowerHeight + stemTop - y;
      const verticalDistance = convergenceY - stemStartY;
      const stemLength = Math.sqrt(x * x + verticalDistance * verticalDistance);

      const stemAngle = Math.atan2(x, verticalDistance) * (180 / Math.PI);

      flower.style.setProperty("--stem-angle", `${stemAngle}deg`);
      flower.style.setProperty("--stem-length", `${stemLength}px`);

      setTimeout(
        () => {
          flower.classList.add("visible");
        },
        (flowerPosition + j) * 600,
      );
    }

    container.appendChild(bouquet);
  }

  // REMAINING SINGLE ROSES HAVE THEIR OWN SEPARATE GRADIENT
  for (let i = 0; i < remainingFlowers; i++) {
    const colors = getSingleRoseColors(i, remainingFlowers);
    const flower = createFlower(bouquetCount * 12 + i, container, colors);

    const step = Math.ceil((i + 1) / 2);
    const direction = i % 2 === 0 ? -1 : 1;

    const offsetX = direction * step * spacing;
    const offsetY = step * verticalStep;

    flower.style.left = `calc(50% + ${offsetX}px)`;
    flower.style.bottom = `${120 - offsetY}px`;

    setTimeout(
      () => {
        flower.classList.add("visible");
      },
      (bouquetCount * 12 + i) * 600,
    );
  }
}

// FLOWER MESSAGES
const message = document.getElementById("flower-message");

const messages = [
  "💕 You're the love of my life 💕",
  "💗 I can't wait to see who you'll become and everything you'll do 💗",
  "💘 I love you so so so much 💘",
  "💖 Thank you for being you 💖",
  "💜 You light me up just by being you 💜",
  "💞 You're the best boyfriend anyone could ever have 💞",
  "💓 I love every single second I get to spend with you 💓",
  "🌙 I love you to the moon and back, endlessly 🌙",
  "💍 Together forever and ever, no matter what 💍",
  "❤️‍🔥 You'll always be my Juju, today, tomorrow, forever ❤️‍🔥",
  "💫 I'm so lucky to call you mine 💫",
  "💟 I choose you, again and again, every single day 💟",
  "💌 You're my happiness, my comfort, and my forever 💌",
  "💝 Life is so much better with you in it 💝",
  "❣️ You're one of the best things that ever happened to me ❣️",
];

let hideTimeout;

function attachFlowerClick(flower) {
  flower.addEventListener("click", () => {
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    message.classList.add("visible");

    clearTimeout(hideTimeout);

    hideTimeout = setTimeout(() => {
      message.classList.remove("visible");
    }, 5000);
  });
}
