// ================= Dark Mode Button =================
const darkModeBtn = document.getElementById("darkModeBtn");
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

// ================= Smooth Scroll =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ================= Blog / Notes Toggle =================
document.querySelectorAll(".blog-toggle, .notes-toggle, .about-toggle, .project-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        const isVisible = window.getComputedStyle(content).display !== "none";
        content.style.display = isVisible ? "none" : "block";
    });
});

// ================= Canvas Drawing =================
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let currentColor = "#00ffff";

ctx.strokeStyle = currentColor;
ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";

function setColor(color) { 
    currentColor = color; 
    ctx.strokeStyle = currentColor; 
}

function setThickness(value) { 
    ctx.lineWidth = value; 
}

function getTouchPos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
    };
}

function startDraw(e) {
    drawing = true;
    let x = e.offsetX ?? getTouchPos(canvas, e).x;
    let y = e.offsetY ?? getTouchPos(canvas, e).y;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    let x = e.offsetX ?? getTouchPos(canvas, e).x;
    let y = e.offsetY ?? getTouchPos(canvas, e).y;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function endDraw() { drawing = false; }

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseleave", endDraw);
canvas.addEventListener("touchstart", startDraw, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", endDraw);

// ================= Save / Clear Canvas =================
function saveDrawing() {
    const link = document.createElement("a");
    link.download = "my_brush_drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ================= Resize Canvas =================
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 400;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ================= Resize Container =================
function resizeContainer() {
    const container = document.querySelector(".container");
    const newWidth = Math.max(300, Math.min(window.innerWidth * 0.8, 800));
    container.style.width = newWidth + "px";
}
resizeContainer();
window.addEventListener("resize", resizeContainer);

// ================= Active Nav Link on Scroll =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    let current = "";
    const navbarHeight = navbar.offsetHeight + 10;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ================= Typewriter Effect =================
const typewriterElement = document.getElementById("typewriter");
const phrases = ["Welcome to My Portfolio", "Web Developer", "Tech Enthusiast", "AI/ML Explorer", "Aashritha Reddy"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
        currentCharIndex++;
        typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex);

        if (currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 2000); // pause at full phrase
            return;
        }
    } else {
        currentCharIndex--;
        typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex);

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(type, isDeleting ? 50 : 100); // adjust typing & deleting speed
}

type();
