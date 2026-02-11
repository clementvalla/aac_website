// Art & Computation Presentation Navigation
// Handles keyboard and click navigation for screen display

(function() {
    'use strict';

    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const counter = document.getElementById('slide-counter');
    const navHint = document.getElementById('nav-hint');
    let currentSlide = 0;

    // Update slide counter display
    function updateCounter() {
        if (counter) {
            counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }
    }

    // Navigate to specific slide
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;

        currentSlide = index;
        slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
        updateCounter();

        // Hide nav hint after first navigation
        if (navHint && currentSlide > 0) {
            navHint.style.opacity = '0';
            setTimeout(() => {
                navHint.style.display = 'none';
            }, 300);
        }
    }

    // Navigate to next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
    }

    // Navigate to previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
        }
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Open lightbox when clicking work-item images
    document.querySelectorAll('.work-item .image-frame img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
        });
    });

    // Close lightbox
    if (lightbox) {
        lightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', function(e) {
            e.stopPropagation();
            lightbox.classList.remove('active');
        });
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

    // Click navigation (click right half to advance, left half to go back)
    document.addEventListener('click', function(e) {
        // Don't navigate if clicking on links, buttons, or if lightbox is open
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            return;
        }
        if (lightbox && lightbox.classList.contains('active')) {
            return;
        }
        // Don't navigate if clicking on work-item images
        if (e.target.closest('.work-item .image-frame')) {
            return;
        }

        const clickX = e.clientX;
        const windowWidth = window.innerWidth;

        if (clickX > windowWidth / 2) {
            nextSlide();
        } else {
            prevSlide();
        }
    });

    // Track current slide on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Find which slide is most visible
            let maxVisible = 0;
            let visibleSlide = 0;

            slides.forEach((slide, index) => {
                const rect = slide.getBoundingClientRect();
                const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                if (visible > maxVisible) {
                    maxVisible = visible;
                    visibleSlide = index;
                }
            });

            if (visibleSlide !== currentSlide) {
                currentSlide = visibleSlide;
                updateCounter();
            }
        }, 100);
    });

    // Initialize
    updateCounter();

    // Handle hash navigation (e.g., #slide-3)
    function handleHash() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#slide-')) {
            const slideNum = parseInt(hash.replace('#slide-', ''), 10);
            if (slideNum >= 1 && slideNum <= totalSlides) {
                goToSlide(slideNum - 1);
            }
        }
    }

    window.addEventListener('hashchange', handleHash);
    handleHash();

    // Expose navigation functions for potential external use
    window.presentationNav = {
        next: nextSlide,
        prev: prevSlide,
        goTo: goToSlide,
        getCurrentSlide: () => currentSlide + 1,
        getTotalSlides: () => totalSlides
    };

})();
