// ===================== Lightbox Logic =====================

const images = document.querySelectorAll(".masonry-gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close-btn");
const lbNextBtn = document.querySelector(".next");
const lbPrevBtn = document.querySelector(".prev");

let currentIndex = 0;

if (images.length) {
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage();
      lightbox.classList.add("active");
    });
  });
}

function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

closeBtn?.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lbNextBtn?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

lbPrevBtn?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!lightbox?.classList.contains("active")) return;
  if (e.key === "ArrowRight") lbNextBtn.click();
  if (e.key === "ArrowLeft") lbPrevBtn.click();
  if (e.key === "Escape") closeBtn.click();
});


// ================= Floating Shapes Animation =================

gsap.to(".shape1", { y: 40, x: 20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".shape2", { y: -50, x: 30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".shape3", { y: 60, x: -40, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".shape4", { y: -30, x: -20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });


// ================= GSAP Scroll Animations =================

gsap.registerPlugin(ScrollTrigger);

// Banner text animation
gsap.to(".banner-content", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
  delay: 0.3
});

// Gallery scroll reveal
gsap.to(".masonry-gallery img", {
  scrollTrigger: {
    trigger: ".masonry-gallery",
    start: "top 80%"
  },
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out"
});


// ================= Subtle Parallax Effect =================

const banner = document.querySelector(".portfolio-banner");

if (banner) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    banner.style.backgroundPosition = `center ${scrollY * 0.3}px`;
  });
}


