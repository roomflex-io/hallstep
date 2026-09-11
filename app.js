if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });
const cards = document.querySelectorAll(".card");
if (cards.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold: 0.2 });
  cards.forEach((c) => io.observe(c));
} else {
  cards.forEach((c) => c.classList.add("in"));
}
