(function() {
    'use strict';

    // Sketch registry - students can add new sketches here
    const SKETCH_REGISTRY = [
        {
            name: 'macpaint-pencil',
            module: window.MacPaintPencilSketch,
            weight: 1
        }
        // Add more sketches here in the future
    ];

    // Select a random sketch based on weighted probability
    function selectRandomSketch() {
        // Calculate total weight
        const totalWeight = SKETCH_REGISTRY.reduce((sum, sketch) => sum + sketch.weight, 0);

        // Random selection based on weights
        let random = Math.random() * totalWeight;

        for (const sketch of SKETCH_REGISTRY) {
            random -= sketch.weight;
            if (random <= 0) {
                return sketch.module;
            }
        }

        // Fallback to first sketch
        return SKETCH_REGISTRY[0].module;
    }

    // Initialize canvas and replace h1 element (or use existing canvas)
    function initializeHeaderCanvas() {
        const header = document.querySelector('header');

        // Check if canvas already exists
        let canvas = header.querySelector('#header-sketch');

        if (canvas) {
            // Canvas already exists, just set it up
            const canvasRect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = canvasRect.width * dpr;
            canvas.height = canvasRect.height * dpr;

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
        } else {
            // Look for h1 to replace
            const h1 = header.querySelector('h1');

            if (!h1) {
                console.error('Neither canvas nor h1 element found in header');
                return null;
            }

            // Get h1 dimensions before replacement
            const h1Rect = h1.getBoundingClientRect();

            // Create canvas element
            canvas = document.createElement('canvas');
            canvas.id = 'header-sketch';
            canvas.setAttribute('role', 'img');
            canvas.setAttribute('aria-label', 'Art and Computation at RISD');

            // Set canvas size with retina support
            const dpr = window.devicePixelRatio || 1;
            canvas.width = h1Rect.width * dpr;
            canvas.height = h1Rect.height * dpr;
            canvas.style.width = h1Rect.width + 'px';
            canvas.style.height = h1Rect.height + 'px';

            // Scale context for retina displays
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);

            // Replace h1 with canvas
            h1.parentNode.replaceChild(canvas, h1);
        }

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Update canvas size on resize
                const newWidth = header.offsetWidth;
                const newHeight = parseFloat(getComputedStyle(canvas).height);

                canvas.width = newWidth * dpr;
                canvas.height = newHeight * dpr;
                canvas.style.width = newWidth + 'px';
                canvas.style.height = newHeight + 'px';

                // Re-scale context
                const ctx = canvas.getContext('2d');
                ctx.scale(dpr, dpr);

                // Re-run the sketch
                if (canvas.currentSketch && canvas.currentSketch.run) {
                    canvas.currentSketch.run(canvas);
                }
            }, 250);
        });

        return canvas;
    }

    // Main initialization
    function init() {
        // Wait for sketch modules to be loaded
        if (typeof window.MacPaintPencilSketch === 'undefined') {
            console.error('Sketch modules not loaded');
            return;
        }

        // Select a random sketch
        const selectedSketch = selectRandomSketch();

        // Initialize canvas
        const canvas = initializeHeaderCanvas();

        if (canvas && selectedSketch) {
            // Store reference for resize handler
            canvas.currentSketch = selectedSketch;

            // Run the selected sketch
            selectedSketch.run(canvas);
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
