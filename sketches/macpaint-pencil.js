(function() {
    'use strict';

    window.MacPaintPencilSketch = {
        run: function(canvas) {
            const ctx = canvas.getContext('2d');
            const pencilImage = new Image();

            // State
            const state = {
                currentPath: [],
                pathIndex: 0,
                isAnimating: false,
                pencilLoaded: false
            };

            // Configuration
            const config = {
                text: 'Art and Computation',
                fontSize: 50,
                handDrawnVariance: 4,
                drawSpeed: 0.5,
                pencilSize: 30,
                pencilOffsetX: -15,
                pencilOffsetY: -25
            };

            // Simple letter stroke definitions
            // Each letter is defined as an array of stroke paths
            // Each stroke is an array of points [x, y] relative to letter origin
            const LETTER_STROKES = {
                'A': [[0.5, 1], [0.2, 0], [0.8, 0], [0.5, 1], [0.3, 0.5], [0.7, 0.5]],
                'r': [[0, 0], [0, 1], [0, 0.4], [0.3, 0.3], [0.6, 0.3]],
                't': [[0.5, 0.15], [0.5, 0.9], [0.4, 1], [0.6, 1], [0.2, 0.4], [0.7, 0.4]],
                'a': [[0, 0.4], [0.3, 0.3], [0.6, 0.4], [0.6, 1], [0, 0.7], [0.6, 0.7]],
                'n': [[0, 1], [0, 0.3], [0.3, 0.3], [0.6, 0.4], [0.6, 1]],
                'd': [[0.6, 0], [0.6, 1], [0, 0.7], [0, 0.4], [0.3, 0.3], [0.6, 0.4]],
                'C': [[0.8, 0.2], [0.5, 0], [0.2, 0.2], [0, 0.5], [0.2, 0.8], [0.5, 1], [0.8, 0.8]],
                'o': [[0.5, 0.3], [0.2, 0.4], [0, 0.6], [0.2, 0.9], [0.5, 1], [0.7, 0.9], [0.9, 0.6], [0.7, 0.4], [0.5, 0.3]],
                'm': [[0, 1], [0, 0.3], [0.15, 0.3], [0.3, 0.4], [0.3, 1], [0.3, 0.4], [0.45, 0.3], [0.6, 0.4], [0.6, 1]],
                'p': [[0, 0.3], [0, 1.2], [0, 0.4], [0.3, 0.3], [0.6, 0.4], [0.6, 0.6], [0.3, 0.7], [0, 0.6]],
                'u': [[0, 0.3], [0, 0.9], [0.3, 1], [0.6, 0.9], [0.6, 0.3]],
                'i': [[0.3, 0.15], [0.3, 0.15], [0.3, 0.3], [0.3, 1]],
                ' ': []
            };

            // Character widths (relative to fontSize)
            const CHAR_WIDTHS = {
                'A': 0.8, 'r': 0.5, 't': 0.6, 'a': 0.7, 'n': 0.7, 'd': 0.7,
                'C': 0.8, 'o': 0.7, 'm': 0.9, 'p': 0.7, 'u': 0.7, 'i': 0.4,
                ' ': 0.4
            };

            // Interpolate points between two points for smoother animation
            function interpolatePoints(p1, p2, numPoints) {
                const points = [];
                for (let i = 0; i <= numPoints; i++) {
                    const t = i / numPoints;
                    points.push({
                        x: p1.x + (p2.x - p1.x) * t,
                        y: p1.y + (p2.y - p1.y) * t
                    });
                }
                return points;
            }

            // Generate hand-drawn text path
            function generateHandDrawnTextPath() {
                const rawPath = [];
                const text = config.text;
                const canvasWidth = canvas.width / window.devicePixelRatio;
                const fontSize = config.fontSize;

                // Calculate total text width
                let totalWidth = 0;
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    totalWidth += (CHAR_WIDTHS[char] || 0.6) * fontSize;
                }

                // Center the text
                let xOffset = (canvasWidth - totalWidth) / 2;
                const yOffset = fontSize * 0.5;

                // Generate path for each character
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const strokes = LETTER_STROKES[char];

                    if (strokes && strokes.length > 0) {
                        // Convert relative coordinates to absolute with variance
                        for (let j = 0; j < strokes.length; j++) {
                            const point = strokes[j];
                            const x = xOffset + point[0] * fontSize + (Math.random() - 0.5) * config.handDrawnVariance;
                            const y = yOffset + point[1] * fontSize + (Math.random() - 0.5) * config.handDrawnVariance;
                            rawPath.push({ x, y });
                        }
                    }

                    // Move to next character position
                    xOffset += (CHAR_WIDTHS[char] || 0.6) * fontSize;
                }

                // Interpolate between points for smoother animation
                const smoothPath = [];
                for (let i = 0; i < rawPath.length - 1; i++) {
                    const interpolated = interpolatePoints(rawPath[i], rawPath[i + 1], 10);
                    smoothPath.push(...interpolated);
                }
                // Add the last point
                if (rawPath.length > 0) {
                    smoothPath.push(rawPath[rawPath.length - 1]);
                }

                return smoothPath;
            }

            // Draw the pencil cursor
            function drawPencil(x, y) {
                if (!state.pencilLoaded) return;

                ctx.save();
                ctx.drawImage(
                    pencilImage,
                    x + config.pencilOffsetX,
                    y + config.pencilOffsetY,
                    config.pencilSize,
                    config.pencilSize
                );
                ctx.restore();
            }

            // Animate the drawing
            function animateDrawing() {
                if (!state.isAnimating) return;

                const path = state.currentPath;
                const pathLength = path.length;

                function drawFrame() {
                    if (!state.isAnimating) return;

                    // Clear canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Set drawing style
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 4;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';

                    // Draw the completed path
                    const currentIndex = Math.floor(state.pathIndex);
                    if (currentIndex > 0) {
                        ctx.beginPath();
                        for (let i = 0; i < Math.min(currentIndex, pathLength); i++) {
                            const point = path[i];
                            if (i === 0) {
                                ctx.moveTo(point.x, point.y);
                            } else {
                                ctx.lineTo(point.x, point.y);
                            }
                        }
                        ctx.stroke();
                    }

                    // Draw the pencil cursor at current position
                    if (currentIndex < pathLength) {
                        const currentPoint = path[currentIndex];
                        drawPencil(currentPoint.x, currentPoint.y);
                    }

                    // Advance the path index
                    state.pathIndex += config.drawSpeed;

                    // Continue animation or complete
                    if (state.pathIndex < pathLength) {
                        requestAnimationFrame(drawFrame);
                    } else {
                        // Animation complete - draw final path without pencil
                        state.isAnimating = false;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.beginPath();
                        for (let i = 0; i < pathLength; i++) {
                            const point = path[i];
                            if (i === 0) {
                                ctx.moveTo(point.x, point.y);
                            } else {
                                ctx.lineTo(point.x, point.y);
                            }
                        }
                        ctx.stroke();
                    }
                }

                drawFrame();
            }

            // Draw instantly without animation
            function drawInstantly() {
                const path = state.currentPath;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                ctx.beginPath();
                for (let i = 0; i < path.length; i++) {
                    const point = path[i];
                    if (i === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }
                ctx.stroke();
            }

            // Check for reduced motion preference
            function prefersReducedMotion() {
                return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            }

            // Initialize
            function init() {
                // Load pencil image
                pencilImage.onload = function() {
                    state.pencilLoaded = true;

                    // Generate the drawing path
                    state.currentPath = generateHandDrawnTextPath();

                    // Start animation or draw instantly
                    if (prefersReducedMotion()) {
                        drawInstantly();
                    } else {
                        state.isAnimating = true;
                        state.pathIndex = 0;
                        animateDrawing();
                    }
                };

                pencilImage.onerror = function() {
                    // If pencil fails to load, still draw the text
                    state.pencilLoaded = false;
                    state.currentPath = generateHandDrawnTextPath();
                    drawInstantly();
                };

                pencilImage.src = 'assets/macpaint_pencil.png';
            }

            init();
        }
    };
})();
