// --- 1. كود العداد التنازلي (Countdown) ---
const weddingDate = new Date("October 11, 2026 19:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

let startY = 0;
let currentY = 0;
let dragging = false;

hero.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    currentY = startY;
    dragging = true;

    hero.style.transition = "none";
}, { passive: true });


hero.addEventListener("touchmove", (e) => {
    if (!dragging) return;

    e.preventDefault();

    currentY = e.touches[0].clientY;

    let distance = currentY - startY;

    // نسمح بالسحب لفوق فقط
    if (distance > 0) {
        distance = 0;
    }

    // خلي الصفحة تتحرك فعليًا مع صباعك
    hero.style.transform = `translate3d(0, ${distance}px, 0)`;

}, { passive: false });


hero.addEventListener("touchend", () => {

    if (!dragging) return;

    dragging = false;

    const distance = currentY - startY;

    // سحبة قوية
    if (distance < -100) {

        hero.style.transition =
            "transform 0.45s cubic-bezier(.22,1,.36,1)";

        hero.style.transform =
            "translate3d(0, -100vh, 0)";

        setTimeout(() => {

            window.scrollTo({
                top: datePage.offsetTop,
                behavior: "instant"
            });

            hero.style.transition = "none";
            hero.style.transform = "";

        }, 450);

    } 
    
    // سحبة ضعيفة → يرجع
    else {

        hero.style.transition =
            "transform 0.3s ease";

        hero.style.transform =
            "translate3d(0, 0, 0)";
    }

});
