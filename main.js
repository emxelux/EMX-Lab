/* ================= CURSOR GLOW ================= */

const glow = document.getElementById("glow");

document.addEventListener("mousemove", e=>{
glow.style.left = e.clientX+"px";
glow.style.top = e.clientY+"px";
});

/* ================= SCROLL REVEAL ================= */

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{threshold:.15});

document.querySelectorAll(".reveal")
.forEach(el=>observer.observe(el));
