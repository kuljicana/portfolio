const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

if (navbar && navToggle) {
    navToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("navbar--open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("navbar--open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open menu");
        });
    });
}

document.querySelectorAll("[data-work-slider]").forEach((slider) => {
    const slides = slider.querySelectorAll(".work__slide");
    const nextButton = slider.querySelector(".work__slider-arrow");

    if (!slides.length || !nextButton) {
        return;
    }

    let currentIndex = 0;

    nextButton.addEventListener("click", () => {
        slides[currentIndex].classList.remove("is-active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("is-active");
    });
});

const revealElements = document.querySelectorAll(".work-reveal");

if (revealElements.length) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        revealElements.forEach((el) => el.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
    }
}
