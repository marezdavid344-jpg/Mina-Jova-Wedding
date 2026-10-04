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


// --- 2. Swipe Up Hero ---

const hero = document.querySelector(".hero-page");
const datePage = document.querySelector(".date-page");
const scrollTrigger = document.getElementById("scrollTrigger");

let startY = 0;
let currentY = 0;
let dragging = false;


// الضغط على "A New Chapter Begins"
if (scrollTrigger && datePage) {

    scrollTrigger.addEventListener("click", () => {

        window.scrollTo({
            top: datePage.offsetTop,
            behavior: "smooth"
        });

    });

}


// بداية السحب
if (hero && datePage) {

    hero.addEventListener("touchstart", (e) => {

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

        // الـ Hero يتحرك مع الصباع مباشرة
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

            hero.style.transform =
                "translate3d(0, 0, 0)";

        }

    });

}


// --- 3. GuestBook → Google Sheets ---

const scriptURL =
    "https://script.google.com/macros/s/AKfycbzNQiItR7R37hj-WQNVpR8TnLogIz43bu1vPzQHTdC-EAqTnFYdInurJIxpIJa03Vi6/exec";

const guestBookForm = document.getElementById("guestBookform");
const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const guestBookStatus = document.getElementById("guestBookStatus");


if (guestBookForm) {

    guestBookForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = guestName.value.trim();
        const message = guestMessage.value.trim();

        if (!name || !message) {
            return;
        }

        guestBookStatus.textContent = "Sending...";

        fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                message: message
            })
        })

        .then(response => response.json())

        .then(data => {

            if (data.status === "success") {

                guestBookStatus.textContent =
                    "Thank you for being part of our story ♥";

                guestBookForm.reset();

            } else {

                guestBookStatus.textContent =
                    "Something went wrong. Please try again.";

            }

        })

        .catch(error => {

            console.error(error);

            guestBookStatus.textContent =
                "Something went wrong. Please try again.";

        });

    });

}

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicBtn.textContent = "♫";
    } else {
        music.pause();
        musicBtn.textContent = "♪";
    }
});
