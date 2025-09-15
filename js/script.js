// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
});




// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});





// BLOG / NOTES TOGGLE
document.querySelectorAll(".blog-toggle, .notes-toggle, .about-toggle, .project-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        const isVisible = window.getComputedStyle(content).display !== "none";
        content.style.display = isVisible ? "none" : "block";
    });
});




// CANVAS DRAWING
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

function getTouchPos(canvas, touchEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
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

function endDraw() { 
    drawing = false; 
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseleave", endDraw);
canvas.addEventListener("touchstart", startDraw, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", endDraw);






// SAVE / CLEAR CANVAS
function saveDrawing() {
    const link = document.createElement("a");
    link.download = "my_brush_drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



// RESIZE CANVAS
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 400; // fixed height
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);





// RESIZE CONTAINER
function resizeContainer() {
    const container = document.querySelector(".container");
    const newWidth = Math.max(300, Math.min(window.innerWidth * 0.8, 800));
    container.style.width = newWidth + "px";
}
resizeContainer();
window.addEventListener("resize", resizeContainer);