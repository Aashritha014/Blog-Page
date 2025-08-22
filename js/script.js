
// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const btn = document.querySelector(".toggle-btn");
    btn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Canvas drawing
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let currentColor = "#00ffff";

ctx.strokeStyle = currentColor;
ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";

function setColor(color) { currentColor = color; ctx.strokeStyle = currentColor; }
function setThickness(value) { ctx.lineWidth = value; }

function getTouchPos(canvas, touchEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

function startDraw(e) {
    drawing = true;
    let x, y;
    if (e.type.startsWith('touch')) {
        const pos = getTouchPos(canvas, e);
        x = pos.x; y = pos.y;
    } else {
        x = e.offsetX; y = e.offsetY;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    let x, y;
    if (e.type.startsWith('touch')) {
        const pos = getTouchPos(canvas, e);
        x = pos.x; y = pos.y;
    } else {
        x = e.offsetX; y = e.offsetY;
    }
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

// Save drawing
function saveDrawing() {
    const link = document.createElement("a");
    link.download = "my_brush_drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Resize canvas to fit container width
function resizeCanvas() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 400; 
    ctx.putImageData(imgData, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);


