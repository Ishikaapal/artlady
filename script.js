/* =====================================================
   1. GLOBAL INIT & NAVBAR (RESPONSIVE SAFE)
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* HERO FADE-IN */
  const heroContent = document.querySelector(".hero-content");
  heroContent?.classList.add("show");

  /* NAVBAR LOGIC */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".ip_nav_links");
  const navItems = document.querySelectorAll(".ip_nav_links a");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks?.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      hamburger?.classList.remove("active");
      navLinks?.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  /* FOOTER YEAR */
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* PORTFOLIO INIT */
  if (document.getElementById("sliderTrack")) {
    setupPortfolio();
    startPortfolioLoop();
  }
});

/* =====================================================
   2. HERO SLIDER (AUTO + MANUAL)
===================================================== */
const slides = document.querySelectorAll(".hero-slide");
const nextBtn = document.querySelector(".nav-btn.next");
const prevBtn = document.querySelector(".nav-btn.prev");
let heroIndex = 0;
let heroInterval;

function showHeroSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  heroIndex = (index + slides.length) % slides.length;
  slides[heroIndex]?.classList.add("active");
}

function startHeroSlider() {
  clearInterval(heroInterval);
  heroInterval = setInterval(() => showHeroSlide(++heroIndex), 4000);
}

nextBtn?.addEventListener("click", () => showHeroSlide(++heroIndex));
prevBtn?.addEventListener("click", () => showHeroSlide(--heroIndex));

slides.length && startHeroSlider();

/* Pause hero slider when tab hidden */
document.addEventListener("visibilitychange", () => {
  document.hidden ? clearInterval(heroInterval) : startHeroSlider();
});

/* =====================================================
   3. WHY CHOOSE US – SCROLL REVEAL
===================================================== */
const whyUsSection = document.querySelector(".why-us-section");

if (whyUsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.querySelector(".center-visual")?.classList.add("visible");

      entry.target.querySelectorAll(".feature-item").forEach((item, i) => {
        setTimeout(() => item.classList.add("visible"), i * 180);
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  observer.observe(whyUsSection);
}

/* =====================================================
   4. PORTFOLIO SLIDER (RESPONSIVE + INFINITE)
===================================================== */
const track = document.getElementById("sliderTrack");
const originalSlides = [...document.querySelectorAll(".portfolio-slide")];
const pNumbers = document.querySelectorAll(".p-num");
const progressFill = document.querySelector(".progress-fill");

let slideWidth = 350;
const gap = 30;
let portfolioIndex = 0;
let portfolioInterval;
const speed = 3000;

function setupPortfolio() {
  if (!track) return;

  track.innerHTML = "";
  const slides = [...originalSlides, ...originalSlides, ...originalSlides];

  slides.forEach((slide, i) => {
    const clone = slide.cloneNode(true);
    if (i < originalSlides.length || i >= originalSlides.length * 2) {
      clone.classList.add("clone");
    }
    track.appendChild(clone);
  });

  portfolioIndex = originalSlides.length;
  updatePortfolio(portfolioIndex, false);
}

function updatePortfolio(index, animate = true) {
  const slides = track.querySelectorAll(".portfolio-slide");
  slides.forEach(s => s.classList.remove("active"));
  slides[index]?.classList.add("active");

  const realIndex =
    (index - originalSlides.length + originalSlides.length) %
    originalSlides.length;

  pNumbers.forEach(n => n.classList.remove("active"));
  pNumbers[realIndex]?.classList.add("active");

  if (progressFill) {
    progressFill.style.width = `${((realIndex + 1) / originalSlides.length) * 100}%`;
  }

  const container = document.querySelector(".portfolio-slider");
  if (!container) return;

  const offset =
    container.offsetWidth / 2 -
    slideWidth / 2 -
    index * (slideWidth + gap);

  track.style.transition = animate ? "transform 0.5s ease" : "none";
  track.style.transform = `translateX(${offset}px)`;

  portfolioIndex = index;
}

function nextPortfolio() {
  portfolioIndex++;
  updatePortfolio(portfolioIndex);

  track.addEventListener(
    "transitionend",
    () => {
      if (portfolioIndex >= originalSlides.length * 2) {
        portfolioIndex = originalSlides.length;
        updatePortfolio(portfolioIndex, false);
      }
    },
    { once: true }
  );
}

function startPortfolioLoop() {
  clearInterval(portfolioInterval);
  portfolioInterval = setInterval(nextPortfolio, speed);
}

/* Pause on hover */
track?.addEventListener("mouseenter", () => clearInterval(portfolioInterval));
track?.addEventListener("mouseleave", startPortfolioLoop);

/* Resize fix */
window.addEventListener("resize", () =>
  updatePortfolio(portfolioIndex, false)
);

/* =====================================================
   5. AUTH MODAL (MOBILE SAFE)
===================================================== */
function openAuth(type) {
  const overlay = document.getElementById("auth-overlay");
  const login = document.getElementById("login-section");
  const register = document.getElementById("register-section");

  if (!overlay) return;

  overlay.style.display = "flex";
  setTimeout(() => overlay.classList.add("active"), 10);

  login.style.display = type === "login" ? "block" : "none";
  register.style.display = type === "register" ? "block" : "none";
}

function closeAuth() {
  const overlay = document.getElementById("auth-overlay");
  overlay?.classList.remove("active");
  setTimeout(() => overlay && (overlay.style.display = "none"), 300);
}

document.getElementById("auth-overlay")?.addEventListener("click", e => {
  if (e.target.id === "auth-overlay") closeAuth();
});

/* =====================================================
   6. SERVICE CARDS – 3D TILT (DESKTOP ONLY)
===================================================== */
if (!("ontouchstart" in window)) {
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -12;
      const rotateY = ((x / rect.width) - 0.5) * 12;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });
}
