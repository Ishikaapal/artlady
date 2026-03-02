/* ===============================
   1. GLOBAL PAGE LOAD
================================ */
/* Optimized Navbar Logic */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".ip2026_hamburger");
  const navLinks = document.querySelector(".ip2026_nav_links");
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
    ".ip2026_nav_links a, .ip2026_nav_links button",
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
  const container = document.getElementById("ip2026-sliderContainer");
  const slides = document.querySelectorAll(".ip2026-hero-slide");
  const prevBtn = document.querySelector(".ip2026-nav-btn.ip2026-prev");
  const nextBtn = document.querySelector(".ip2026-nav-btn.ip2026-next");
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
    slideInterval = setInterval(nextSlide, 3000);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  startTimer();
});




/* ===============================
   VECTOR SECTION JS
================================ */

const initSliders = () => {
  const containers = document.querySelectorAll(".ip2026-comparison-container");

  containers.forEach((container) => {
    const slider = container.querySelector(".ip2026-slider");
    const overlay = container.querySelector(".ip2026-img-overlay");
    const button = container.querySelector(".ip2026-slider-button");
    const beforeImg = container.querySelector(".ip2026-before-img");

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

/* ===============================
   ABOUT SECTION IMAGE SWITCH
================================ */

function switchAboutImage(index) {
  const items = document.querySelectorAll(".ip2026-best-item");
  const images = document.querySelectorAll(".ip2026-about-img");

  if (!items.length || !images.length) return;

  // Remove active states
  items.forEach((item) => item.classList.remove("ip2026-active"));
  images.forEach((img) => img.classList.remove("ip2026-active"));

  // Add active state
  if (items[index]) items[index].classList.add("ip2026-active");
  if (images[index]) images[index].classList.add("ip2026-active");
}

/* Optional: Mobile tap support */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".ip2026-best-item");

  items.forEach((item, index) => {
    item.addEventListener("click", () => switchAboutImage(index));
  });
});



/* ===============================
   2. WHY CHOOSE US
================================ */
document.addEventListener("DOMContentLoaded", function () {

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const whyUsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. Animate Center Visual
        const center = entry.target.querySelector(".ip2026-center-visual");
        if (center) center.classList.add("ip2026-visible");

        // 2. Animate items with stagger
        const items = entry.target.querySelectorAll(".ip2026-feature-item");
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("ip2026-visible");
          }, index * 200);
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const whyUsSection = document.querySelector(".ip2026-why-us-section");
  if (whyUsSection) {
    whyUsObserver.observe(whyUsSection);
  }

  /* ===============================
     HERO SLIDER LOGIC
  ================================ */
  const sliderContainer = document.getElementById("ip2026-sliderContainer");
  if (sliderContainer) {
    const slides = document.querySelectorAll(".ip2026-hero-slide");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    let currentIndex = 0;
    let isTransitioning = false;
    const totalSlides = slides.length;
    const lastRealIndex = totalSlides - 1;

    function updateSlider() {
      sliderContainer.classList.remove("no-transition");
      sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      updateSlider();
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      if (currentIndex <= 0) {
        sliderContainer.classList.add("no-transition");
        currentIndex = lastRealIndex;
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        setTimeout(() => {
          sliderContainer.classList.remove("no-transition");
          currentIndex--;
          updateSlider();
        }, 20);
      } else {
        currentIndex--;
        updateSlider();
      }
    }

    sliderContainer.addEventListener("transitionend", () => {
      isTransitioning = false;
      if (currentIndex === lastRealIndex) {
        sliderContainer.classList.add("no-transition");
        currentIndex = 0;
        sliderContainer.style.transform = `translateX(0)`;
      }
    });

    let slideInterval = setInterval(nextSlide, 3000);
    nextBtn?.addEventListener("click", () => { nextSlide(); clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 3000); });
    prevBtn?.addEventListener("click", () => { prevSlide(); clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 3000); });
  }
});

/* ===============================
   2. Services Section Js CODE
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".ip2026-service-card");

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

/* ===============================
   4. PORTFOLIO SLIDER (FIXED BIDIRECTIONAL)
================================ */
const ipTrack = document.getElementById("ip2026-sliderTrack");
const ipOriginalSlides = Array.from(document.querySelectorAll(".ip2026-portfolio-slide"));
const ipPNumbers = document.querySelectorAll(".ip2026-p-num");
const ipProgressFill = document.querySelector(".ip2026-progress-fill");

const ipAnimationSpeed = 3000; // Slightly slower for better UX
let ipCurrentIndex = 0;
let ipPortfolioInterval;
let ipIsTransitioning = false;
const ipClonesCount = ipOriginalSlides.length;

function getIpSliderMetrics() {
    const firstSlide = ipTrack ? ipTrack.querySelector(".ip2026-portfolio-slide") : null;
    if (!firstSlide) return { width: 350, gap: 30 };
    const style = window.getComputedStyle(ipTrack);
    return {
        width: firstSlide.offsetWidth,
        gap: parseInt(style.gap) || 0,
    };
}

function setupIpPortfolio() {
    if (!ipTrack || ipOriginalSlides.length === 0) return;
    
    // Clear track and re-append clones for a true infinite loop
    ipTrack.innerHTML = "";

    // Set 1: Prepend Clones
    ipOriginalSlides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.classList.add("ip2026-clone");
        ipTrack.appendChild(clone);
    });

    // Set 2: Original Slides
    ipOriginalSlides.forEach((slide) => {
        ipTrack.appendChild(slide);
    });

    // Set 3: Append Clones
    ipOriginalSlides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.classList.add("ip2026-clone");
        ipTrack.appendChild(clone);
    });

    // Position at the start of original slides
    ipCurrentIndex = ipClonesCount;
    updateIpTrackPosition(ipCurrentIndex, false);
}

function updateIpTrackPosition(index, animate = true) {
    const allSlides = ipTrack.querySelectorAll(".ip2026-portfolio-slide");
    const { width, gap } = getIpSliderMetrics();
    const totalItemWidth = width + gap;

    // Update Visual Active States
    allSlides.forEach((s, i) => {
        s.classList.toggle("active", i === index);
    });

    // Calculate Real Index (0 to original length - 1)
    let realIndex = (index - ipClonesCount) % ipOriginalSlides.length;
    if (realIndex < 0) realIndex += ipOriginalSlides.length;

    // Update Numbers & Progress
    ipPNumbers.forEach((n, i) => {
        n.classList.toggle("active", i === realIndex);
    });

    if (ipProgressFill) {
        const percent = ((realIndex + 1) / ipOriginalSlides.length) * 100;
        ipProgressFill.style.width = `${percent}%`;
    }

    // Centering Logic
    const container = document.querySelector(".ip2026-portfolio-slider");
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const centerPoint = containerWidth / 2;
    const offset = centerPoint - (width / 2) - (index * totalItemWidth);

    ipTrack.style.transition = animate ? "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)" : "none";
    ipTrack.style.transform = `translateX(${offset}px)`;
    ipCurrentIndex = index;
}

function nextIpPortfolioSlide() {
    if (ipIsTransitioning) return;
    ipIsTransitioning = true;

    ipCurrentIndex++;
    updateIpTrackPosition(ipCurrentIndex, true);

    ipTrack.addEventListener("transitionend", function handleEnd() {
        // Instant Jump logic for seamless loop
        if (ipCurrentIndex >= ipClonesCount + ipOriginalSlides.length) {
            ipCurrentIndex = ipClonesCount;
            updateIpTrackPosition(ipCurrentIndex, false);
        } else if (ipCurrentIndex < ipClonesCount) {
            // Support for previous if added later
            ipCurrentIndex = ipClonesCount + ipOriginalSlides.length - 1;
            updateIpTrackPosition(ipCurrentIndex, false);
        }
        ipIsTransitioning = false;
        ipTrack.removeEventListener("transitionend", handleEnd);
    }, { once: true });
}

function startIpPortfolioLoop() {
    stopIpPortfolioLoop();
    ipPortfolioInterval = setInterval(nextIpPortfolioSlide, ipAnimationSpeed);
}

function stopIpPortfolioLoop() {
    clearInterval(ipPortfolioInterval);
}

// Event Listeners
ipPNumbers.forEach((num, idx) => {
    num.addEventListener("click", () => {
        stopIpPortfolioLoop();
        ipCurrentIndex = ipClonesCount + idx;
        updateIpTrackPosition(ipCurrentIndex, true);
        startIpPortfolioLoop();
    });
});

if (ipTrack) {
    setupIpPortfolio();
    startIpPortfolioLoop();
    
    // Pause on hover
    ipTrack.addEventListener("mouseenter", stopIpPortfolioLoop);
    ipTrack.addEventListener("mouseleave", startIpPortfolioLoop);

    window.addEventListener("resize", () => {
        updateIpTrackPosition(ipCurrentIndex, false);
    });
}





/*FOOTER LOGIC */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year Update
  const yearSpan = document.getElementById("ip2026-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 2. Footer Reveal Logic
  const footerSections = document.querySelectorAll(".ip2026-f-reveal");

  const revealFooter = () => {
    const triggerPoint = window.innerHeight * 0.92;

    footerSections.forEach((section, index) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerPoint) {
        // Stagger the columns by 150ms each
        setTimeout(() => {
          section.classList.add("ip2026-f-active");
        }, index * 150);
      }
    });
  };

  // Run on scroll and initial load
  window.addEventListener("scroll", revealFooter);
  revealFooter(); 
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


