/* Slideshow/Ticker for Art & Computation at RISD */

(function() {
    'use strict';

    // All images from /images/ directory - loaded from images-list.js
    // Now supports both old format (strings) and new format (objects with src/title/author)
    const ALL_IMAGES = window.ALL_IMAGES || [];

    // Helper to normalize image data (supports both string and object formats)
    function normalizeImage(img) {
        if (typeof img === 'string') {
            return { src: img, title: '', author: '' };
        }
        return img;
    }

    // Shuffle array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        const shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Curated subset for homepage hero ticker
    const HERO_IMAGES = [
        'images/students/DSC06342.jpg',
        'images/happening/DSC06351.jpg',
        'images/students/DSC06370.jpg',
        'images/students/DSC06373.jpg',
        'images/students/DSC06386.jpg',
        'images/students/2025-09-25 11.38.30.jpg',
        'images/students/2025-09-25 11.38.45.jpg',
        'images/students/2025-09-25 11.40.12.jpg',
        'images/students/ctc_01.jpg',
        'images/faculty/ctc_05.jpg',
        'images/students/ctc_15.jpg',
        'images/faculty/ctc_26.jpg',
        'images/students/ctc_28.jpg',
        'images/students/ctc_37.jpg',
        'images/faculty/ctc_39.jpg',
        'images/faculty/ctc_44.jpg',
        'images/faculty/ctc_45.jpg',
        'images/students/ctc_52.jpg',
        'images/faculty/ctc_55.jpg',
        'images/students/ctc_78.jpg',
        'images/students/ctc_82.jpg',
        'images/students/ctc_85.jpg'
    ];

    /**
     * Create a slideshow/ticker instance
     * @param {Object} config - Configuration object
     * @param {string} config.containerId - ID of the container element
     * @param {Array} config.images - Array of image paths
     * @param {number} config.interval - Auto-advance interval in milliseconds
     * @param {boolean} config.showControls - Whether to show control buttons
     * @param {boolean} config.keyboard - Whether to enable keyboard controls
     * @returns {Object} API for controlling the slideshow
     */
    function createTicker(config) {
        const container = document.getElementById(config.containerId) ||
                         document.querySelector('.' + config.containerId);

        if (!container) {
            console.warn('Ticker container not found:', config.containerId);
            return null;
        }

        let currentIndex = 0;
        let isPlaying = config.interval > 0;
        let autoPlayInterval = null;
        const images = config.images || [];

        // Preload cache
        const preloadedImages = {};

        // Load and display image at index
        function loadImage(index) {
            if (index < 0 || index >= images.length) return;

            const imgData = normalizeImage(images[index]);
            const imgPath = imgData.src;

            // Build HTML with optional attribution
            let html = '<img src="' + imgPath + '" alt="">';
            if (config.showAttribution && (imgData.title || imgData.author)) {
                let attrText = '';
                if (imgData.title) attrText += imgData.title;
                if (imgData.title && imgData.author) attrText += ' — ';
                if (imgData.author) attrText += imgData.author;
                html += '<div class="slideshow-attribution">' + attrText + '</div>';
            }
            container.innerHTML = html;

            currentIndex = index;
            updateCounter();
            preloadNext();
        }

        // Preload next 2 images for smooth transitions
        function preloadNext() {
            for (let i = 1; i <= 2; i++) {
                const nextIndex = (currentIndex + i) % images.length;
                const imgData = normalizeImage(images[nextIndex]);
                const imgPath = imgData.src;

                if (!preloadedImages[imgPath]) {
                    const img = new Image();
                    img.src = imgPath;
                    preloadedImages[imgPath] = img;
                }
            }
        }

        // Update counter display
        function updateCounter() {
            if (!config.showControls) return;

            const counter = document.getElementById('slide-counter');
            if (counter) {
                counter.textContent = (currentIndex + 1);
            }
        }

        // Navigate to next slide
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % images.length;
            loadImage(nextIndex);
        }

        // Navigate to previous slide
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            loadImage(prevIndex);
        }

        // Toggle pause/play
        function togglePausePlay() {
            if (isPlaying) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        }

        // Start auto-advancing slides
        function startAutoPlay() {
            if (config.interval <= 0) return;

            stopAutoPlay(); // Clear any existing interval
            isPlaying = true;

            autoPlayInterval = setInterval(function() {
                nextSlide();
            }, config.interval);

            // Update button text if controls are shown
            const pauseBtn = document.getElementById('pause-play');
            if (pauseBtn) {
                pauseBtn.textContent = 'Pause';
            }
        }

        // Stop auto-advancing slides
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
            isPlaying = false;

            // Update button text if controls are shown
            const pauseBtn = document.getElementById('pause-play');
            if (pauseBtn) {
                pauseBtn.textContent = 'Play';
            }
        }

        // Setup control buttons
        function setupControls() {
            if (!config.showControls) return;

            const prevBtn = document.getElementById('prev-slide');
            const nextBtn = document.getElementById('next-slide');
            const pauseBtn = document.getElementById('pause-play');

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    prevSlide();
                    if (isPlaying) {
                        startAutoPlay(); // Restart timer on manual navigation
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    nextSlide();
                    if (isPlaying) {
                        startAutoPlay(); // Restart timer on manual navigation
                    }
                });
            }

            if (pauseBtn) {
                pauseBtn.addEventListener('click', togglePausePlay);
            }
        }

        // Setup keyboard controls
        function setupKeyboard() {
            if (!config.keyboard) return;

            document.addEventListener('keydown', function(e) {
                // Don't trigger if user is in an input field
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    return;
                }

                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                    if (isPlaying) {
                        startAutoPlay();
                    }
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                    if (isPlaying) {
                        startAutoPlay();
                    }
                } else if (e.key === ' ') {
                    e.preventDefault();
                    togglePausePlay();
                }
            });
        }

        // Respect prefers-reduced-motion
        function checkReducedMotion() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                stopAutoPlay();
            }
        }

        // Initialize
        function init() {
            if (images.length === 0) {
                console.warn('No images provided to ticker');
                return;
            }

            loadImage(0);
            setupControls();
            setupKeyboard();
            checkReducedMotion();

            if (isPlaying) {
                startAutoPlay();
            }
        }

        // Start the ticker
        init();

        // Return API
        return {
            next: nextSlide,
            prev: prevSlide,
            goto: loadImage,
            play: startAutoPlay,
            pause: stopAutoPlay,
            toggle: togglePausePlay
        };
    }

    /**
     * Fullscreen slideshow mode
     * Activated via #fullscreen hash or button click
     */
    let fullscreenOverlay = null;
    let fullscreenTicker = null;

    function enterFullscreenSlideshow() {
        if (fullscreenOverlay) return; // Already in fullscreen

        // Create fullscreen overlay
        fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.id = 'fullscreen-slideshow';
        fullscreenOverlay.innerHTML = `
            <div class="fullscreen-title">Art and Computation</div>
            <div class="fullscreen-image-container">
                <img src="" alt="">
                <div class="fullscreen-attribution"></div>
            </div>
            <button class="fullscreen-exit" aria-label="Exit fullscreen">✕</button>
        `;
        document.body.appendChild(fullscreenOverlay);

        // Hide cursor after inactivity
        let cursorTimeout;
        function hideCursor() {
            fullscreenOverlay.style.cursor = 'none';
        }
        function showCursor() {
            fullscreenOverlay.style.cursor = 'default';
            clearTimeout(cursorTimeout);
            cursorTimeout = setTimeout(hideCursor, 3000);
        }
        fullscreenOverlay.addEventListener('mousemove', showCursor);
        showCursor();

        let currentIndex = 0;
        let isPlaying = true;
        let autoPlayInterval = null;
        const images = shuffleArray(ALL_IMAGES);
        const imgEl = fullscreenOverlay.querySelector('img');
        const attrEl = fullscreenOverlay.querySelector('.fullscreen-attribution');

        function loadImage(index) {
            if (index < 0 || index >= images.length) return;
            currentIndex = index;

            const imgData = normalizeImage(images[index]);
            imgEl.src = imgData.src;

            // Show attribution if available
            if (imgData.title || imgData.author) {
                let attrText = '';
                if (imgData.title) attrText += imgData.title;
                if (imgData.title && imgData.author) attrText += ' — ';
                if (imgData.author) attrText += imgData.author;
                attrEl.textContent = attrText;
                attrEl.style.display = 'block';
            } else {
                attrEl.style.display = 'none';
            }
        }

        function nextSlide() {
            loadImage((currentIndex + 1) % images.length);
        }

        function prevSlide() {
            loadImage((currentIndex - 1 + images.length) % images.length);
        }

        function startAutoPlay() {
            stopAutoPlay();
            isPlaying = true;
            autoPlayInterval = setInterval(nextSlide, 5000); // 5 second interval for fullscreen
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
            isPlaying = false;
        }

        function togglePausePlay() {
            if (isPlaying) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        }

        // Exit fullscreen
        function exitFullscreen() {
            stopAutoPlay();
            clearTimeout(cursorTimeout);
            if (fullscreenOverlay) {
                fullscreenOverlay.remove();
                fullscreenOverlay = null;
            }
            // Remove hash without triggering hashchange
            if (window.location.hash === '#fullscreen') {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
            document.removeEventListener('keydown', handleKeydown);
        }

        // Keyboard controls
        function handleKeydown(e) {
            if (e.key === 'Escape') {
                exitFullscreen();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                if (isPlaying) startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                if (isPlaying) startAutoPlay();
            } else if (e.key === ' ') {
                e.preventDefault();
                togglePausePlay();
            }
        }
        document.addEventListener('keydown', handleKeydown);

        // Exit button
        fullscreenOverlay.querySelector('.fullscreen-exit').addEventListener('click', exitFullscreen);

        // Request browser fullscreen
        if (fullscreenOverlay.requestFullscreen) {
            fullscreenOverlay.requestFullscreen().catch(() => {});
        } else if (fullscreenOverlay.webkitRequestFullscreen) {
            fullscreenOverlay.webkitRequestFullscreen();
        }

        // Start slideshow
        loadImage(0);
        startAutoPlay();

        // Store reference for external control
        fullscreenTicker = {
            next: nextSlide,
            prev: prevSlide,
            play: startAutoPlay,
            pause: stopAutoPlay,
            exit: exitFullscreen
        };
    }

    function exitFullscreenSlideshow() {
        if (fullscreenTicker) {
            fullscreenTicker.exit();
            fullscreenTicker = null;
        }
    }

    // Check for #fullscreen hash on load
    function checkFullscreenHash() {
        if (window.location.hash === '#fullscreen') {
            // Small delay to ensure page is ready
            setTimeout(enterFullscreenSlideshow, 100);
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#fullscreen') {
            enterFullscreenSlideshow();
        }
    });

    // Handle browser fullscreen exit
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement && fullscreenOverlay) {
            exitFullscreenSlideshow();
        }
    });

    // Export fullscreen functions
    window.enterFullscreenSlideshow = enterFullscreenSlideshow;
    window.exitFullscreenSlideshow = exitFullscreenSlideshow;

    // Initialize live.html full slideshow if container exists
    if (document.getElementById('slideshow-container')) {
        window.liveSlideshow = createTicker({
            containerId: 'slideshow-container',
            images: shuffleArray(ALL_IMAGES),
            interval: 2000,
            showControls: true,
            keyboard: true,
            showAttribution: true
        });

        // Setup fullscreen button
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', enterFullscreenSlideshow);
        }

        // Check for fullscreen hash
        checkFullscreenHash();
    }

    // Initialize homepage hero ticker if container exists
    if (document.querySelector('.hero-image-ticker')) {
        window.heroTicker = createTicker({
            containerId: 'hero-image-ticker',
            images: HERO_IMAGES,
            interval: 3000,
            showControls: false,
            keyboard: false
        });
    }

    // Initialize sidebar tickers if they exist
    const sidebarTickers = document.querySelectorAll('.sidebar-ticker');
    sidebarTickers.forEach(function(ticker, index) {
        // Each sidebar ticker gets different timing and image subset
        const offset = index * 8; // Start at different images
        const shuffledImages = HERO_IMAGES.slice(offset).concat(HERO_IMAGES.slice(0, offset));

        createTicker({
            containerId: ticker.id,
            images: shuffledImages,
            interval: 4000 + (index * 500), // Stagger timing: 4s, 4.5s, 5s
            showControls: false,
            keyboard: false
        });
    });

    // Initialize agentbox with random images - wait for sidebar to load
    function initializeAgentbox() {
        const agentbox = document.getElementById('agentbox');

        if (!agentbox) {
            console.log('Agentbox not yet loaded, waiting for sidebar...');
            return;
        }

        // Get shuffled images
        const randomImages = shuffleArray(ALL_IMAGES);

        // Create ticker with just images
        window.agentbox = createTicker({
            containerId: 'agentbox',
            images: randomImages,
            interval: 3000, // Change every 3 seconds
            showControls: false,
            keyboard: false
        });

        // Add click handler to open fullscreen
        agentbox.style.cursor = 'pointer';
        agentbox.addEventListener('click', function() {
            const img = agentbox.querySelector('img');
            if (img && img.src) {
                openFullscreen(img.src);
            }
        });
    }

    // Fullscreen image viewer
    function openFullscreen(imageSrc) {
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.id = 'fullscreen-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;

        // Create image
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 95vw;
            max-height: 95vh;
            object-fit: contain;
            display: block;
        `;

        overlay.appendChild(img);
        document.body.appendChild(overlay);

        // Close on click or escape
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });

        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                if (document.getElementById('fullscreen-overlay')) {
                    document.body.removeChild(overlay);
                }
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    // Initialize agentbox when sidebar is loaded
    window.addEventListener('sidebarLoaded', initializeAgentbox);

    // Also try to initialize on DOMContentLoaded in case sidebar loads first
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initializeAgentbox, 100);
    });

    // Export createTicker for potential future use
    window.createTicker = createTicker;

})();
