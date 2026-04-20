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

// ===== CANVAS SETUP =====
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

const image = document.getElementById("photo");

const images = [
  "assets/images/scratch/1.jpg",
  "assets/images/scratch/2.jpg",
  "assets/images/scratch/3.jpg",
  "assets/images/scratch/4.jpg",
];

let currentIndex = 0;

// ===== IMAGE NAVIGATION =====

// update image source + reset scratch layer
function updateImage() {
  image.src = images[currentIndex];

    resetCanvas();
  
}

// go to next image (loop)
function nextImage() {
  stopConfetti();
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

// go to previous image (loop)
function prevImage() {
  stopConfetti();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

// reset scratch canvas
function resetCanvas() {
  const rect = image.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) {
    requestAnimationFrame(resetCanvas);
    return;
  }

  // Set canvas resolution
  canvas.width = rect.width;
  canvas.height = rect.height;

  // Sync visual size
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";

  // Draw scratch layer
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

  gradient.addColorStop(0, "#6e6e6e");
  gradient.addColorStop(0.25, "#eaeaea");
  gradient.addColorStop(0.5, "#9a9a9a");
  gradient.addColorStop(0.75, "#eaeaea");
  gradient.addColorStop(1, "#6e6e6e");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "destination-out";

  canvas.classList.remove("fade-out");
  canvas.style.display = "block";
}

// ===== CONFETTI SYSTEM =====
let confettiActive = true;
let confettiElements = [];
let confettiRaf;

// ===== SCRATCH STATE =====
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const brushSize = 25;
let moveCounter = 0;

// initialize canvas when image loads
window.addEventListener("load", resetCanvas);

// ===== INPUT HELPERS =====

// get mouse or touch position relative to canvas
function getPosition(e) {
  const rect = canvas.getBoundingClientRect();

  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

// start scratching
function start(e) {
  e.preventDefault();

  isDrawing = true;

  const pos = getPosition(e);

  lastX = pos.x;
  lastY = pos.y;

  drawHeart(pos.x, pos.y);
}

// stop scratching
function stop() {
  isDrawing = false;
}

// draw scratch path
function draw(e) {
  if (!isDrawing) return;

  e.preventDefault();

  const pos = getPosition(e);

  const dx = pos.x - lastX;
  const dy = pos.y - lastY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  const steps = Math.ceil(distance / (brushSize / 2));

  // smooth drawing between points
  for (let i = 0; i < steps; i++) {
    const x = lastX + (dx * i) / steps;
    const y = lastY + (dy * i) / steps;

    drawHeart(x, y);
  }

  lastX = pos.x;
  lastY = pos.y;

  moveCounter++;

  // performance-friendly scratch check
  if (moveCounter % 15 === 0) {
    checkScratch();
  }
}

// heart-shaped brush
function drawHeart(x, y) {
  const size = brushSize;

  ctx.beginPath();

  ctx.moveTo(x, y);

  ctx.bezierCurveTo(
    x - size,
    y - size,
    x - size * 1.2,
    y + size / 3,
    x,
    y + size,
  );

  ctx.bezierCurveTo(x + size * 1.2, y + size / 3, x + size, y - size, x, y);

  ctx.fill();
}

// ===== SCRATCH DETECTION =====

function checkScratch() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let transparent = 0;

  // sample pixels for performance
  for (let i = 3; i < imageData.data.length; i += 40) {
    if (imageData.data[i] === 0) {
      transparent++;
    }
  }

  const percent = transparent / (imageData.data.length / 40);

  // reveal threshold
  if (percent > 0.7) {
    launchConfetti();
    reveal();
  }
}

// fade out scratch layer
function reveal() {
  canvas.classList.add("fade-out");

  setTimeout(() => {
    canvas.style.display = "none";
  }, 1000);
}

// ===== CONFETTI =====

function launchConfetti() {
  confettiActive = true;

  const duration = 2000;
  const end = Date.now() + duration;

  const hearts = ["❤️", "💖", "💘", "💗", "💓"];

  function frame() {
    if (!confettiActive) return;

    for (let i = 0; i < 4; i++) {
      const confetti = document.createElement("div");

      confetti.innerText = hearts[Math.floor(Math.random() * hearts.length)];

      confetti.style.position = "absolute";
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.top = "-20px";
      confetti.style.fontSize = 16 + Math.random() * 20 + "px";
      confetti.style.zIndex = 9999;
      confetti.style.pointerEvents = "none";

      document.querySelector(".image-wrapper").appendChild(confetti);

      confettiElements.push(confetti);

      const fall = confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          { transform: "translateY(100vh) rotate(360deg)", opacity: 0 },
        ],
        {
          duration: 10000 + Math.random() * 6000,
          easing: "cubic-bezier(.2,.8,.2,1)",
        },
      );

      fall.onfinish = () => {
        confetti.remove();
        confettiElements = confettiElements.filter((c) => c !== confetti);
      };
    }

    if (Date.now() < end) {
      confettiRaf = requestAnimationFrame(frame);
    }
  }

  frame();
}

// stop and clean confetti
function stopConfetti() {
  confettiActive = false;

  cancelAnimationFrame(confettiRaf);

  confettiElements.forEach((el) => el.remove());
  confettiElements = [];
}

// ===== EVENTS =====

document.addEventListener("mousedown", start);
document.addEventListener("mousemove", draw);
document.addEventListener("mouseup", stop);

canvas.addEventListener("touchstart", start, { passive: false });
document.addEventListener("touchmove", draw, { passive: false });
document.addEventListener("touchend", stop);
