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
let isDragging = false;

if (hero && datePage) {

    hero.addEventListener("touchstart", function (e) {

        startY = e.touches[0].clientY;
        currentY = startY;
        isDragging = true;

        hero.style.transition = "none";

    }, { passive: true });


    hero.addEventListener("touchmove", function (e) {

        if (!isDragging) return;

        currentY = e.touches[0].clientY;

        let distance = currentY - startY;

        // نمنع السحب لتحت
        if (distance > 0) {
            distance = 0;
        }

        // نخلي الحركة طبيعية ومش عنيفة
        const move = distance * 0.8;

        hero.style.transform = `translateY(${move}px)`;

    }, { passive: true });


    hero.addEventListener("touchend", function () {

        if (!isDragging) return;

        isDragging = false;

        const distance = currentY - startY;

        hero.style.transition = "transform 0.45s ease";

        // لو سحب لفوق مسافة كويسة
        if (distance < -80) {

            hero.style.transform = "translateY(-100vh)";

            setTimeout(() => {

                datePage.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                hero.style.transform = "";

            }, 450);

        } else {

            // لو سحبة صغيرة يرجع مكانه
            hero.style.transform = "translateY(0)";

        }

    }, { passive: true });
}
