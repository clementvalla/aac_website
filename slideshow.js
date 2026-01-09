/* Slideshow/Ticker for Art & Computation at RISD */

(function() {
    'use strict';

    // All images from /images/ directory
    const ALL_IMAGES = [
        'images/2025-09-16 16.22.10.jpg',
        'images/2025-09-18 11.10.47.jpg',
        'images/2025-09-18 11.11.39.jpg',
        'images/2025-09-22 12.43.21.jpg',
        'images/2025-09-25 11.38.30.jpg',
        'images/2025-09-25 11.38.45.jpg',
        'images/2025-09-25 11.40.12.jpg',
        'images/2025-09-25 11.40.47.jpg',
        'images/2025-09-25 11.41.51.jpg',
        'images/2025-09-25 11.42.10.jpg',
        'images/2025-09-25 17.53.56.jpg',
        'images/DSC06342.jpg',
        'images/DSC06343.jpg',
        'images/DSC06351.jpg',
        'images/DSC06354.jpg',
        'images/DSC06360.jpg',
        'images/DSC06361.jpg',
        'images/DSC06364.jpg',
        'images/DSC06367.jpg',
        'images/DSC06370.jpg',
        'images/DSC06371.jpg',
        'images/DSC06373.jpg',
        'images/DSC06377.jpg',
        'images/DSC06380.jpg',
        'images/DSC06386.jpg',
        'images/DSC06387.jpg',
        'images/DSC06388.jpg',
        'images/DSC06390.jpg',
        'images/DSC06394.jpg',
        'images/DSC06395.jpg',
        'images/DSC06396.jpg',
        'images/DSC06397.jpg',
        'images/DSC06398.jpg',
        'images/DSC06399.jpg',
        'images/DSC06400.jpg',
        'images/DSC06401.jpg',
        'images/DSC06403.jpg',
        'images/DSC06404.jpg',
        'images/DSC06405.jpg',
        'images/ctc_01.png',
        'images/ctc_02.jpg',
        'images/ctc_03.jpg',
        'images/ctc_04.jpg',
        'images/ctc_05.jpg',
        'images/ctc_06.jpg',
        'images/ctc_07.jpg',
        'images/ctc_08.jpg',
        'images/ctc_09.jpg',
        'images/ctc_10.jpg',
        'images/ctc_11.jpg',
        'images/ctc_12.jpg',
        'images/ctc_13.jpg',
        'images/ctc_14.jpg',
        'images/ctc_15.jpg',
        'images/ctc_16.jpg',
        'images/ctc_17.jpg',
        'images/ctc_18.jpg',
        'images/ctc_19.jpg',
        'images/ctc_20.webp',
        'images/ctc_21.jpg',
        'images/ctc_22.jpg',
        'images/ctc_23.jpg',
        'images/ctc_24.jpg',
        'images/ctc_25.jpg',
        'images/ctc_26.png',
        'images/ctc_27.jpg',
        'images/ctc_28.png',
        'images/ctc_29.jpg',
        'images/ctc_31.jpg',
        'images/ctc_32.jpg',
        'images/ctc_33.jpg',
        'images/ctc_34.jpg',
        'images/ctc_35.jpg',
        'images/ctc_36.jpg',
        'images/ctc_37.png',
        'images/ctc_38.jpg',
        'images/ctc_39.png',
        'images/ctc_40.jpg',
        'images/ctc_41.jpg',
        'images/ctc_42.jpg',
        'images/ctc_43.jpg',
        'images/ctc_44.png',
        'images/ctc_45.jpg',
        'images/ctc_46.png',
        'images/ctc_47.png',
        'images/ctc_48.png',
        'images/ctc_49.png',
        'images/ctc_50.png',
        'images/ctc_51.png',
        'images/ctc_52.jpg',
        'images/ctc_53.png',
        'images/ctc_54.png',
        'images/ctc_55.jpg',
        'images/ctc_56.png',
        'images/ctc_57.png',
        'images/ctc_58.png',
        'images/ctc_59.png',
        'images/ctc_60.png',
        'images/ctc_61.png',
        'images/ctc_62.png',
        'images/ctc_63.png',
        'images/ctc_64.png',
        'images/ctc_65.png',
        'images/ctc_67.png',
        'images/ctc_68.png',
        'images/ctc_69.png',
        'images/ctc_70.png',
        'images/ctc_71.png',
        'images/ctc_72.png',
        'images/ctc_73.png',
        'images/ctc_74.png',
        'images/ctc_75.png',
        'images/ctc_76.png',
        'images/ctc_77.png',
        'images/ctc_78.jpg',
        'images/ctc_79.png',
        'images/ctc_80.jpg',
        'images/ctc_81.jpg',
        'images/ctc_82.png',
        'images/ctc_83.jpg',
        'images/ctc_84.jpg',
        'images/ctc_85.png',
        'images/ctc_86.jpg',
        'images/ctc_88.jpg',
        'images/ctc_89.jpg',
        'images/ctc_91.jpg'
    ];

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

    // Initialize agentbox with random images
    if (document.getElementById('agentbox')) {
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
    }

    // Export createTicker for potential future use
    window.createTicker = createTicker;

})();
