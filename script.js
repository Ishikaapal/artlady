/* ===============================
   1. GLOBAL PAGE LOAD
================================ */
window.addEventListener("load", () => {
    const heroContent = document.querySelector(".hero-content");
    if(heroContent) heroContent.classList.add("show");
});

/* ===============================
   2. WHY CHOOSE US
================================ */
const listItems = document.querySelectorAll('.feature-item');
const images = document.querySelectorAll('.feature-image');

function changeImage(index) {
    listItems.forEach(item => item.classList.remove('active'));
    images.forEach(img => img.classList.remove('active'));
    if(listItems[index]) listItems[index].classList.add('active');
    if(images[index]) images[index].classList.add('active');
}       

/* ===============================
   3. HERO SLIDER
================================ */
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.dot');
let currentHeroSlide = 0;
let heroInterval;

function showHeroSlide(index) {
    if (heroSlides.length === 0) return;
    heroSlides.forEach(s => s.classList.remove('active'));
    heroDots.forEach(d => d.classList.remove('active'));

    if (index >= heroSlides.length) currentHeroSlide = 0;
    else if (index < 0) currentHeroSlide = heroSlides.length - 1;
    else currentHeroSlide = index;

    heroSlides[currentHeroSlide].classList.add('active');
    if(heroDots.length > 0) heroDots[currentHeroSlide].classList.add('active');
}

function startHeroAutoPlay() {
    clearInterval(heroInterval);
    heroInterval = setInterval(() => { showHeroSlide(currentHeroSlide + 1); }, 5000);
}
function changeSlide(dir) { clearInterval(heroInterval); showHeroSlide(currentHeroSlide + dir); startHeroAutoPlay(); }
function goToSlide(idx) { clearInterval(heroInterval); showHeroSlide(idx); startHeroAutoPlay(); }

if(heroSlides.length > 0) startHeroAutoPlay();


function switchAboutImage(index) {
    // 1. Get all list items and images
    const listItems = document.querySelectorAll('.best-item');
    const images = document.querySelectorAll('.about-img');

    // 2. Remove 'active' class from all
    listItems.forEach(item => item.classList.remove('active'));
    images.forEach(img => img.classList.remove('active'));

    // 3. Add 'active' class to the hovered index
    if(listItems[index]) listItems[index].classList.add('active');
    if(images[index]) images[index].classList.add('active');
}

// / * ==============
// | why choose us section |
// =========================
document.addEventListener("DOMContentLoaded", function() {
    // Configuration for the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger animation when 20% of section is visible
    };

    // Create the observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                // 1. Animate the Center Image first
                const center = entry.target.querySelector('.center-visual');
                if(center) center.classList.add('visible');

                // 2. Animate the surrounding items with a staggered delay
                const items = entry.target.querySelectorAll('.feature-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200); // 200ms delay between each item
                });

                // Stop observing after animation runs once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing the section
    const section = document.querySelector('.why-us-section');
    if(section) {
        observer.observe(section);
    }
});
/* ===============================
   EXPANDING CARDS LOGIC (FLIP Animation)
================================ */

function toggleCard(card) {
    // 1. Check if card is already active
    const isActive = card.classList.contains('active');
    
    // 2. If clicking an active card, close it
    if (isActive) {
        card.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable Scroll
        return;
    }

    // 3. If opening a new card...
    
    // First, close any other open cards
    document.querySelectorAll('.expand-card.active').forEach(c => {
        c.classList.remove('active');
    });

    // Get the initial position (First)
    const rect = card.getBoundingClientRect();
    
    // Add the active class to calculate final position (Last)
    card.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable Scroll

    // NOTE: In a pure FLIP animation, we would calculate the invert and play.
    // However, for this specific CSS setup, adding the class triggers the 
    // fixed position transition defined in CSS. 
    
    // To make it smooth, we use a small timeout or a placeholder technique,
    // but the CSS transition on '.card-inner' handles the growth visually.
    
    // Optional: Add a simple animation to the content appearing
    const content = card.querySelector('.full-desc');
    content.style.opacity = '0';
    setTimeout(() => {
        content.style.opacity = '1';
    }, 300);
}


/* ===============================
   4. PORTFOLIO SLIDER (BIDIRECTIONAL LOOP)
================================ */
const track = document.getElementById('sliderTrack');
const originalSlides = Array.from(document.querySelectorAll('.portfolio-slide'));
const pNumbers = document.querySelectorAll('.p-num');
const progressFill = document.querySelector('.progress-fill');

// CONFIG
const slideWidth = 350; // Match CSS width
const gap = 30;         // Match CSS gap
const totalItemWidth = slideWidth + gap;
const animationSpeed = 3000;

// STATE
let currentIndex = 0;
let portfolioInterval;
let isTransitioning = false;
const clonesCount = originalSlides.length; // We will clone ALL slides to front and back

function setupPortfolio() {
    // 1. Clear Track (but keep references in originalSlides array)
    track.innerHTML = '';

    // 2. Prepend Clones (Clones of the end go to the start)
    // Actually, to make logic simple: Clone ALL slides and put them at the start
    originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('clone');
        clone.classList.remove('active');
        track.appendChild(clone);
    });

    // 3. Add Originals
    originalSlides.forEach(slide => {
        track.appendChild(slide);
    });

    // 4. Append Clones (Clones of start go to the end)
    originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('clone');
        clone.classList.remove('active');
        track.appendChild(clone);
    });

    // 5. Initialize
    // We start at 'clonesCount'. 
    // Example: If 6 items. 0-5 are clones. 6 is the first Real item.
    currentIndex = clonesCount; 
    updateTrackPosition(currentIndex, false);
}

function updateTrackPosition(index, animate = true) {
    const allSlides = document.querySelectorAll('.portfolio-slide');
    
    // A. Highlight Visuals
    allSlides.forEach(s => s.classList.remove('active'));
    // The active slide is the one at 'index'
    if(allSlides[index]) allSlides[index].classList.add('active');

    // B. Map to Original Index (0 to 5)
    // If index is 6 (first real), mapped is 0.
    // Logic: (index - clonesCount) % originalSlides.length
    // But we need to handle negative modulo JS quirk if needed (though here we stay positive usually)
    let realIndex = (index - clonesCount) % originalSlides.length;
    if (realIndex < 0) realIndex += originalSlides.length;

    // C. Update Pagination
    pNumbers.forEach(n => n.classList.remove('active'));
    if(pNumbers[realIndex]) pNumbers[realIndex].classList.add('active');

    // D. Update Progress
    if(progressFill) {
        const percent = ((realIndex + 1) / originalSlides.length) * 100;
        progressFill.style.width = `${percent}%`;
    }

    // E. Center Logic
    const containerWidth = document.querySelector('.portfolio-slider').offsetWidth;
    const centerPoint = containerWidth / 2;
    const slideCenter = slideWidth / 2;
    // Shift: Center - SlideCenter - (Position of this slide)
    const offset = centerPoint - slideCenter - (index * totalItemWidth);

    if (animate) track.style.transition = 'transform 0.5s ease';
    else track.style.transition = 'none';

    track.style.transform = `translateX(${offset}px)`;
    currentIndex = index;
}

// NEXT SLIDE
function nextPortfolioSlide() {
    if (isTransitioning) return;
    
    const maxIndex = clonesCount + originalSlides.length + clonesCount - 1; // Last clone index

    // Move forward
    currentIndex++;
    updateTrackPosition(currentIndex, true);

    // CHECK BOUNDARY (Loop back to start of originals)
    track.addEventListener('transitionend', () => {
        // If we reached the start of the appended clones set
        // (Index = clonesCount + originalSlides.length)
        if (currentIndex >= clonesCount + originalSlides.length) {
            // Jump back to the start of Real slides
            const diff = currentIndex - (clonesCount + originalSlides.length);
            currentIndex = clonesCount + diff; 
            updateTrackPosition(currentIndex, false); // No animation jump
        }
    }, { once: true });
}

// PREV SLIDE (Optional functionality, good for robustness)
function prevPortfolioSlide() {
    currentIndex--;
    updateTrackPosition(currentIndex, true);
    
    track.addEventListener('transitionend', () => {
        if (currentIndex < clonesCount) {
            // Jump to end of Real slides
            // e.g., if we are at index 5 (last pre-clone), we want to go to index 11 (last real)
            currentIndex = clonesCount + originalSlides.length - 1;
            updateTrackPosition(currentIndex, false);
        }
    }, { once: true });
}

// AUTO PLAY
function startPortfolioLoop() {
    clearInterval(portfolioInterval);
    portfolioInterval = setInterval(nextPortfolioSlide, animationSpeed);
}

// PAGINATION CLICK
pNumbers.forEach((num, idx) => {
    num.addEventListener('click', () => {
        clearInterval(portfolioInterval);
        // Map click (0-5) to Real Index (6-11)
        currentIndex = clonesCount + idx;
        updateTrackPosition(currentIndex, true);
        startPortfolioLoop();
    });
});

// INITIALIZE
if(track) {
    setupPortfolio();
    startPortfolioLoop();
    window.addEventListener('resize', () => {
        // Recalculate center on resize
        updateTrackPosition(currentIndex, false);
    });
}


// service 

// Function to Open Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active'); // Add active class to show
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Function to Close Modal
function closeModal(event, modalId) {
    // If event is null (clicked close btn) OR clicked outside content
    if (!event || event.target.id === modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }
}

// Close on Escape Key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const activeModals = document.querySelectorAll('.modal-overlay.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});



// ====================
// Register and Login 
// ====================

// OPEN MODAL FUNCTION
function openAuth(type) {
    const overlay = document.getElementById('auth-overlay');
    const registerSection = document.getElementById('register-section');
    const loginSection = document.getElementById('login-section');

    // Show Overlay
    overlay.style.display = 'flex';
    // Small timeout to allow CSS transition to detect 'flex' before opacity change
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    // Toggle correct section based on button clicked
    if (type === 'login') {
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    } else {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    }
}

// CLOSE MODAL FUNCTION
function closeAuth() {
    const overlay = document.getElementById('auth-overlay');
    
    overlay.classList.remove('active');
    
    // Wait for transition to finish before hiding
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

// SWITCH FORM INSIDE MODAL
function switchForm(formName) {
    const registerSection = document.getElementById('register-section');
    const loginSection = document.getElementById('login-section');

    if (formName === 'login') {
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    } else {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    }
}

// Close modal if user clicks outside the card
document.getElementById('auth-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAuth();
    }
});