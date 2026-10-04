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

const hero = document.querySelector(".hero-page");
const datePage = document.querySelector(".date-page");
const scrollTrigger = document.getElementById("scrollTrigger");


if (scrollTrigger) {
    scrollTrigger.addEventListener("click", () => {
        datePage.scrollIntoView({ behavior: "smooth" });
    });
}

let startY = 0;

if (hero && datePage) {

    hero.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    }, { passive: true });

    hero.addEventListener("touchend", function (e) {

        const endY = e.changedTouches[0].clientY;
        const difference = startY - endY;

        if (difference > 50) {
            datePage.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    }, { passive: true });
}
