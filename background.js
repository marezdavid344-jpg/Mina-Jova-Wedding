// --- 1. Countdown ---

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

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// --- 2. Hero Swipe + Music ---

const hero = document.querySelector(".hero-page");
const datePage = document.querySelector(".date-page");
const scrollTrigger = document.getElementById("scrollTrigger");


// --- Music ---

const music = document.getElementById("bgMusic");

function startMusic() {

    if (!music) return;

    if (music.paused) {

        music.play()
            .then(() => {
                console.log("Music started successfully");
            })
            .catch(error => {
                console.log("Music could not start:", error);
            });

    }

}


// --- Start music on first real touch ---

if (hero) {

    hero.addEventListener("pointerdown", () => {

        startMusic();

    }, { once: true });

}


// --- Scroll using "A New Chapter Begins" ---

if (scrollTrigger && datePage) {

    scrollTrigger.addEventListener("click", () => {

        startMusic();

        window.scrollTo({
            top: datePage.offsetTop,
            behavior: "smooth"
        });

    });

}


// --- Swipe Up ---

let startY = 0;
let currentY = 0;
let dragging = false;


if (hero && datePage) {

    // بداية السحب

    hero.addEventListener("touchstart", (e) => {

        startMusic();

        startY = e.touches[0].clientY;
        currentY = startY;
        dragging = true;

        hero.style.transition = "none";

    }, { passive: true });


    // أثناء السحب

    hero.addEventListener("touchmove", (e) => {

        if (!dragging) return;

        e.preventDefault();

        currentY = e.touches[0].clientY;

        let distance = currentY - startY;

        // ممنوع السحب لتحت

        if (distance > 0) {
            distance = 0;
        }

        // تحريك الـHero مع الصباع

        hero.style.transform =
            `translate3d(0, ${distance}px, 0)`;

    }, { passive: false });


    // نهاية السحب

    hero.addEventListener("touchend", () => {

        if (!dragging) return;

        dragging = false;

        const distance = currentY - startY;


        // سحبة قوية → الصفحة التالية

        if (distance <= -100) {

            hero.style.transition =
                "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

            hero.style.transform =
                "translate3d(0, -100vh, 0)";


            setTimeout(() => {

                window.scrollTo(
                    0,
                    datePage.offsetTop
                );

                hero.style.transition = "none";
                hero.style.transform = "";

            }, 450);

        }


        // سحبة ضعيفة → يرجع

        else {

            hero.style.transition =
                "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
