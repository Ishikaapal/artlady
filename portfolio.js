document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('masonry-grid');
    const items = Array.from(document.querySelectorAll('.grid-item'));
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const heroContent = document.querySelector('.hero-content');
    const heroOverlay = document.querySelector('.hero-overlay');

    let currentIndex = 0;
    let visibleItems = [...items];

    // --- 1. MASONRY ENGINE (Improved for Mobile) ---
    const updateMasonry = () => {
        if (!grid || window.getComputedStyle(grid).display !== 'grid') return;
        
        const rowHeight = 10;
        const gap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap')) || 20;
        
        visibleItems.forEach(item => {
            const content = item.querySelector('.card-inner');
            if (content) {
                // Use getBoundingClientRect for sub-pixel accuracy on mobile zoom
                const height = content.getBoundingClientRect().height;
                const rowSpan = Math.ceil((height + gap) / (rowHeight + gap));
                item.style.gridRowEnd = `span ${rowSpan}`;
            }
        });
    };

    // Watch for images loading to trigger masonry recalculation
    const allImages = document.querySelectorAll('.grid-item img');
    allImages.forEach(img => {
        if (img.complete) {
            updateMasonry();
        } else {
            img.addEventListener('load', updateMasonry);
        }
    });

    // Debounced resize for better performance
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateMasonry, 100);
    });

    // --- 2. PREMIUM PARALLAX ENGINE ---
    const handleParallax = () => {
        const scrolled = window.pageYOffset;
        if (heroOverlay) {
            heroOverlay.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
        }
        if (heroContent) {
            heroContent.style.transform = `translate3d(0, ${scrolled * -0.2}px, 0)`;
            heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
        }
    };

    if (window.innerWidth > 1024) { // Only parallax on desktop for battery saving
        window.addEventListener('scroll', handleParallax, { passive: true });
    }

    // --- 3. REVEAL-ON-SCROLL ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    updateMasonry();
                }, (index % 3) * 100); 
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    items.forEach(item => revealObserver.observe(item));

    // --- 4. FILTERING SYSTEM ---
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.filter-btn.active')?.classList.remove('active');
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            items.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('visible'), 50);
                } else {
                    item.classList.remove('visible');
                    item.style.display = 'none';
                }
            });

            visibleItems = items.filter(i => i.style.display !== 'none');
            // Wait for display change to render before measuring
            requestAnimationFrame(() => {
                updateMasonry();
                // On mobile, scroll back to gallery top after filtering
                if(window.innerWidth < 768) {
                    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });

    // --- 5. LIGHTBOX & SWIPE ---
    const openLightbox = (index) => {
        if (index < 0 || index >= visibleItems.length) return;
        currentIndex = index;
        const imgElement = visibleItems[currentIndex].querySelector('img');
        
        lbImg.style.opacity = '0';
        lbImg.src = imgElement.src;
        
        lightbox.style.display = 'flex';
        requestAnimationFrame(() => lightbox.classList.add('active'));
        document.body.style.overflow = 'hidden';
        
        lbImg.onload = () => lbImg.style.opacity = '1';
    };

    const navigate = (dir) => {
        currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
        openLightbox(currentIndex);
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            lbImg.src = ''; 
        }, 500);
        document.body.style.overflow = 'auto';
    };

    // Events
    items.forEach((item) => {
        item.addEventListener('click', () => {
            const index = visibleItems.indexOf(item);
            if (index !== -1) openLightbox(index);
        });
    });

    document.querySelector('.lb-next')?.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
    document.querySelector('.lb-prev')?.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    document.querySelector('.lb-close')?.addEventListener('click', closeLightbox);
    
    lightbox.onclick = (e) => { if(e.target === lightbox) closeLightbox(); };

    // Mobile Swipe (Touch Events)
    let startX = 0;
    lightbox.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive: true});
    lightbox.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
    }, {passive: true});

    // Footer Year
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
});