/* ===============================
   1. GLOBAL PAGE LOAD
================================ */
/* Optimized Navbar Logic */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".ip_nav_links");
  const body = document.body;

  // Helper to toggle state
  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Accessibility & Scroll Lock
    body.style.overflow = isOpen ? "hidden" : "";
    hamburger.setAttribute("aria-expanded", isOpen);
  };

  const closeMenu = () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
  };

  // Toggle on click
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents immediate closing from document listener
    toggleMenu();
  });

  // Close when clicking links or buttons
  const menuItems = document.querySelectorAll(
    ".ip_nav_links a, .ip_nav_links button",
  );
  menuItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  // Close if user clicks outside the menu
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key for better UX
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sliderContainer");
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.querySelector(".nav-btn.prev");
  const nextBtn = document.querySelector(".nav-btn.next");
  const indicatorContainer = document.querySelector(".slide-indicators");

  let currentIndex = 0;
  let slideInterval;

  // Create Indicators
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    indicatorContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlider() {
    // Move the entire container horizontally
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetTimer();
  }

  nextBtn.addEventListener("click", () => { nextSlide(); resetTimer(); });
  prevBtn.addEventListener("click", () => { prevSlide(); resetTimer(); });

  function startTimer() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  startTimer();
});

/* ===============================
   2. WHY CHOOSE US
================================ */
const listItems = document.querySelectorAll(".feature-item");
const images = document.querySelectorAll(".feature-image");

function changeImage(index) {
  listItems.forEach((item) => item.classList.remove("active"));
  images.forEach((img) => img.classList.remove("active"));
  if (listItems[index]) listItems[index].classList.add("active");
  if (images[index]) images[index].classList.add("active");
}

/* ===============================
   3. HERO SLIDER
================================ */
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".dot");
let currentHeroSlide = 0;
let heroInterval;

function showHeroSlide(index) {
  if (heroSlides.length === 0) return;
  heroSlides.forEach((s) => s.classList.remove("active"));
  heroDots.forEach((d) => d.classList.remove("active"));

  if (index >= heroSlides.length) currentHeroSlide = 0;
  else if (index < 0) currentHeroSlide = heroSlides.length - 1;
  else currentHeroSlide = index;

  heroSlides[currentHeroSlide].classList.add("active");
  if (heroDots.length > 0) heroDots[currentHeroSlide].classList.add("active");
}

function startHeroAutoPlay() {
  clearInterval(heroInterval);
  heroInterval = setInterval(() => {
    showHeroSlide(currentHeroSlide + 1);
  }, 5000);
}
function changeSlide(dir) {
  clearInterval(heroInterval);
  showHeroSlide(currentHeroSlide + dir);
  startHeroAutoPlay();
}
function goToSlide(idx) {
  clearInterval(heroInterval);
  showHeroSlide(idx);
  startHeroAutoPlay();
}

if (heroSlides.length > 0) startHeroAutoPlay();

function switchAboutImage(index) {
  // 1. Get all list items and images
  const listItems = document.querySelectorAll(".best-item");
  const images = document.querySelectorAll(".about-img");

  // 2. Remove 'active' class from all
  listItems.forEach((item) => item.classList.remove("active"));
  images.forEach((img) => img.classList.remove("active"));

  // 3. Add 'active' class to the hovered index
  if (listItems[index]) listItems[index].classList.add("active");
  if (images[index]) images[index].classList.add("active");
}

// / * ==============
// | why choose us section |
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // Configuration for the Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // Trigger animation when 20% of section is visible
  };

  // Create the observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. Animate the Center Image first
        const center = entry.target.querySelector(".center-visual");
        if (center) center.classList.add("visible");

        // 2. Animate the surrounding items with a staggered delay
        const items = entry.target.querySelectorAll(".feature-item");
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("visible");
          }, index * 200); // 200ms delay between each item
        });

        // Stop observing after animation runs once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Start observing the section
  const section = document.querySelector(".why-us-section");
  if (section) {
    observer.observe(section);
  }
});
/* ===============================
   EXPANDING CARDS LOGIC (FLIP Animation)
================================ */

function toggleCard(card) {
  // 1. Check if card is already active
  const isActive = card.classList.contains("active");

  // 2. If clicking an active card, close it
  if (isActive) {
    card.classList.remove("active");
    document.body.style.overflow = "auto"; // Enable Scroll
    return;
  }

  // 3. If opening a new card...

  // First, close any other open cards
  document.querySelectorAll(".expand-card.active").forEach((c) => {
    c.classList.remove("active");
  });

  // Get the initial position (First)
  const rect = card.getBoundingClientRect();

  // Add the active class to calculate final position (Last)
  card.classList.add("active");
  document.body.style.overflow = "hidden"; // Disable Scroll

  // NOTE: In a pure FLIP animation, we would calculate the invert and play.
  // However, for this specific CSS setup, adding the class triggers the
  // fixed position transition defined in CSS.

  // To make it smooth, we use a small timeout or a placeholder technique,
  // but the CSS transition on '.card-inner' handles the growth visually.

  // Optional: Add a simple animation to the content appearing
  const content = card.querySelector(".full-desc");
  content.style.opacity = "0";
  setTimeout(() => {
    content.style.opacity = "1";
  }, 300);
}

/* ===============================
   4. PORTFOLIO SLIDER (BIDIRECTIONAL LOOP)
================================ */
const track = document.getElementById("sliderTrack");
const originalSlides = Array.from(
  document.querySelectorAll(".portfolio-slide"),
);
const pNumbers = document.querySelectorAll(".p-num");
const progressFill = document.querySelector(".progress-fill");

// CONFIG
const animationSpeed = 3000;

// STATE
let currentIndex = 0;
let portfolioInterval;
let isTransitioning = false;
const clonesCount = originalSlides.length;

/**
 * HELPER: DYNAMIC DIMENSIONS
 * Calculates width and gap based on current CSS (handles media queries)
 */
function getSliderMetrics() {
  const firstSlide = document.querySelector(".portfolio-slide");
  if (!firstSlide) return { width: 350, gap: 30 };

  const style = window.getComputedStyle(track);
  return {
    width: firstSlide.offsetWidth,
    gap: parseInt(style.gap) || 0,
  };
}

function setupPortfolio() {
  track.innerHTML = "";

  // Prepend Clones
  originalSlides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    clone.classList.add("clone");
    clone.classList.remove("active");
    track.appendChild(clone);
  });

  // Add Originals
  originalSlides.forEach((slide) => {
    track.appendChild(slide);
  });

  // Append Clones
  originalSlides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    clone.classList.add("clone");
    clone.classList.remove("active");
    track.appendChild(clone);
  });

  currentIndex = clonesCount;
  // Small timeout to ensure DOM is painted before initial positioning
  setTimeout(() => updateTrackPosition(currentIndex, false), 50);
}

function updateTrackPosition(index, animate = true) {
  const allSlides = document.querySelectorAll(".portfolio-slide");
  const { width, gap } = getSliderMetrics();
  const totalItemWidth = width + gap;

  // A. Highlight Visuals
  allSlides.forEach((s) => s.classList.remove("active"));
  if (allSlides[index]) allSlides[index].classList.add("active");

  // B. Map to Original Index
  let realIndex = (index - clonesCount) % originalSlides.length;
  if (realIndex < 0) realIndex += originalSlides.length;

  // C. Update Pagination & Progress
  pNumbers.forEach((n) => n.classList.remove("active"));
  if (pNumbers[realIndex]) pNumbers[realIndex].classList.add("active");

  if (progressFill) {
    const percent = ((realIndex + 1) / originalSlides.length) * 100;
    progressFill.style.width = `${percent}%`;
  }

  // D. DYNAMIC CENTER LOGIC
  const containerWidth =
    document.querySelector(".portfolio-slider").offsetWidth;
  const centerPoint = containerWidth / 2;
  const slideHalf = width / 2;

  // The calculation that ensures the slide stays in the middle:
  const offset = centerPoint - slideHalf - index * totalItemWidth;

  track.style.transition = animate
    ? "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
    : "none";
  track.style.transform = `translateX(${offset}px)`;
  currentIndex = index;
}

function nextPortfolioSlide() {
  if (isTransitioning) return;

  currentIndex++;
  updateTrackPosition(currentIndex, true);

  const handleTransitionEnd = () => {
    if (currentIndex >= clonesCount + originalSlides.length) {
      currentIndex = clonesCount;
      updateTrackPosition(currentIndex, false);
    }
    isTransitioning = false;
    track.removeEventListener("transitionend", handleTransitionEnd);
  };

  isTransitioning = true;
  track.addEventListener("transitionend", handleTransitionEnd);
}

// AUTO PLAY
function startPortfolioLoop() {
  clearInterval(portfolioInterval);
  portfolioInterval = setInterval(nextPortfolioSlide, animationSpeed);
}

// PAGINATION CLICK
pNumbers.forEach((num, idx) => {
  num.addEventListener("click", () => {
    clearInterval(portfolioInterval);
    currentIndex = clonesCount + idx;
    updateTrackPosition(currentIndex, true);
    startPortfolioLoop();
  });
});

// INITIALIZE
if (track) {
  setupPortfolio();
  startPortfolioLoop();

  // Recalculate everything on resize to keep it centered
  window.addEventListener("resize", () => {
    updateTrackPosition(currentIndex, false);
  });
}

// service
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");

  // 1. 3D Tilt Effect
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation (max 10 degrees)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      // Apply transformation
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Reset when mouse leaves
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  // 2. Scroll Reveal Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach((card, index) => {
    // Initial state for animation
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition =
      "opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease";

    // Add staggered delay via inline style for the initial reveal
    // (We remove transition property temporarily in JS to avoid conflict with hover tilt,
    // effectively we are just setting initial styles here)
    setTimeout(() => {
      card.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
    }, 0);

    observer.observe(card);
  });
});

/*FOOTER LOGIC */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 2. Scroll Reveal Animation Logic
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9; // Trigger when 90% in view

    revealElements.forEach((el, index) => {
      const elTop = el.getBoundingClientRect().top;

      if (elTop < triggerBottom) {
        // Add a small delay for each column to create a "wave" effect
        setTimeout(() => {
          el.classList.add("active");
        }, index * 150); 
      }
    });
  };

  // Initial check on load and on every scroll
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run once in case it's already in view
});

// ====================
// Register and Login
// ====================

// OPEN MODAL FUNCTION
function openAuth(type) {
  const overlay = document.getElementById("auth-overlay");
  const registerSection = document.getElementById("register-section");
  const loginSection = document.getElementById("login-section");

  // Show Overlay
  overlay.style.display = "flex";
  // Small timeout to allow CSS transition to detect 'flex' before opacity change
  setTimeout(() => {
    overlay.classList.add("active");
  }, 10);

  // Toggle correct section based on button clicked
  if (type === "login") {
    registerSection.style.display = "none";
    loginSection.style.display = "block";
  } else {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
  }
}

// CLOSE MODAL FUNCTION
function closeAuth() {
  const overlay = document.getElementById("auth-overlay");

  overlay.classList.remove("active");

  // Wait for transition to finish before hiding
  setTimeout(() => {
    overlay.style.display = "none";
  }, 300);
}

// SWITCH FORM INSIDE MODAL
function switchForm(formName) {
  const registerSection = document.getElementById("register-section");
  const loginSection = document.getElementById("login-section");

  if (formName === "login") {
    registerSection.style.display = "none";
    loginSection.style.display = "block";
  } else {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
  }
}

// Close modal if user clicks outside the card
document.getElementById("auth-overlay").addEventListener("click", function (e) {
  if (e.target === this) {
    closeAuth();
  }
});

const initSliders = () => {
  const containers = document.querySelectorAll(".comparison-container");

  containers.forEach((container) => {
    const slider = container.querySelector(".slider");
    const overlay = container.querySelector(".img-overlay");
    const button = container.querySelector(".slider-button");
    const beforeImg = container.querySelector(".before-img");

    const updateSlider = () => {
      const value = slider.value;

      // Move the "wall" from left to right
      overlay.style.width = `${value}%`;
      button.style.left = `${value}%`;

      // IMPORTANT: Keep the blurred image fixed so it doesn't slide
      beforeImg.style.width = `${container.offsetWidth}px`;
    };

    slider.addEventListener("input", updateSlider);

    // Initial sync
    updateSlider();
    window.addEventListener("resize", updateSlider);
  });
};

document.addEventListener("DOMContentLoaded", initSliders);

