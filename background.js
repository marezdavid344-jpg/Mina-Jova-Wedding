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

if (hero && datePage) {

    hero.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
        currentY = startY;
        dragging = true;

        hero.style.transition = "none";
    }, { passive: true });


    hero.addEventListener("touchmove", function (e) {
        if (!dragging) return;

        currentY = e.touches[0].clientY;

        let move = currentY - startY;

        // السحب لفوق بس
        if (move < 0) {

            // حركة خفيفة وطبيعية مع الصباع
            hero.style.transform =
                `translate3d(0, ${move}px, 0)`;
        }

    }, { passive: true });


    hero.addEventListener("touchend", function () {

        if (!dragging) return;

        dragging = false;

        let distance = currentY - startY;

        // لو السحبة قوية
        if (distance < -100) {

            hero.style.transition =
                "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

            hero.style.transform =
                "translate3d(0, -100%, 0)";

            setTimeout(() => {

                window.scrollTo({
                    top: datePage.offsetTop,
                    behavior: "instant"
                });

                hero.style.transition = "none";
                hero.style.transform = "";

            }, 450);

        } 
        
        // لو السحبة ضعيفة يرجع
        else {

            hero.style.transition =
                "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";

            hero.style.transform =
                "translate3d(0, 0, 0)";
        }

    }, { passive: true });

}
