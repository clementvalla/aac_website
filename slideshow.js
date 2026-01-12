/* Slideshow/Ticker for Art & Computation at RISD */

(function() {
    'use strict';

    // All images from /images/ directory - loaded from images-list.js
    const ALL_IMAGES = window.ALL_IMAGES || [];

    // Curated subset for homepage hero ticker
    const HERO_IMAGES = [
        'images/DSC06342.jpg',
        'images/DSC06351.jpg',
        'images/DSC06370.jpg',
        'images/DSC06373.jpg',
        'images/DSC06386.jpg',
        'images/2025-09-25 11.38.30.jpg',
        'images/2025-09-25 11.38.45.jpg',
        'images/2025-09-25 11.40.12.jpg',
        'images/ctc_01.png',
        'images/ctc_02.jpg',
        'images/ctc_05.jpg',
        'images/ctc_15.jpg',
        'images/ctc_26.png',
        'images/ctc_28.png',
        'images/ctc_37.png',
        'images/ctc_39.png',
        'images/ctc_44.png',
        'images/ctc_45.jpg',
        'images/ctc_52.jpg',
        'images/ctc_55.jpg',
        'images/ctc_78.jpg',
        'images/ctc_80.jpg',
        'images/ctc_82.png',
        'images/ctc_85.png'
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

            const imgPath = images[index];
            container.innerHTML = '<img src="' + imgPath + '" alt="">';

            currentIndex = index;
            updateCounter();
            preloadNext();
        }

        // Preload next 2 images for smooth transitions
        function preloadNext() {
            for (let i = 1; i <= 2; i++) {
                const nextIndex = (currentIndex + i) % images.length;
                const imgPath = images[nextIndex];

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
                counter.textContent = (currentIndex + 1) + ' / ' + images.length;
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

    // Initialize live.html full slideshow if container exists
    if (document.getElementById('slideshow-container')) {
        window.liveSlideshow = createTicker({
            containerId: 'slideshow-container',
            images: ALL_IMAGES,
            interval: 2000,
            showControls: true,
            keyboard: true
        });
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

        // Shuffle function
        function shuffleArray(array) {
            const shuffled = array.slice();
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
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
