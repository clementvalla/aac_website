// Art & Computation Drawing Layer - MacPaint-style overlay

(function() {
    'use strict';

    // Get elements
    const canvas = document.getElementById('draw-layer');
    const ctx = canvas.getContext('2d');
    const drawToggle = document.getElementById('draw-toggle');
    const clearCanvas = document.getElementById('clear-canvas');
    const colorPicker = document.getElementById('color-picker');
    const colorButtons = document.querySelectorAll('.color-btn');

    // State
    let isDrawing = false;
    let drawMode = false;
    let currentColor = '#FFFFFF'; // Default white
    let lastX = 0;
    let lastY = 0;

    // Initialize canvas size
    function resizeCanvas() {
        // Use viewport dimensions for fixed positioning
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Set up canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Toggle draw mode
    drawToggle.addEventListener('click', function() {
        drawMode = !drawMode;

        if (drawMode) {
            canvas.classList.add('active');
            drawToggle.textContent = 'Draw Mode: ON';
            colorPicker.style.display = 'flex';
        } else {
            canvas.classList.remove('active');
            drawToggle.textContent = 'Draw Mode: OFF';
            colorPicker.style.display = 'none';
        }
    });

    // Clear canvas
    clearCanvas.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Color selection
    colorButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            currentColor = this.getAttribute('data-color');
            // Remove active class from all buttons
            colorButtons.forEach(btn => btn.style.border = 'none');
            // Add active indicator to selected button
            this.style.border = '2px solid #00FF00';
        });
    });

    // Set default color indicator
    colorButtons[0].style.border = '2px solid #00FF00';

    // Drawing functions
    function getMousePos(e) {
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // For fixed positioning, use clientX/Y directly (viewport coordinates)
        return {
            x: clientX,
            y: clientY
        };
    }

    function startDrawing(e) {
        if (!drawMode) return;

        e.preventDefault();
        isDrawing = true;

        const pos = getMousePos(e);
        lastX = pos.x;
        lastY = pos.y;
    }

    function draw(e) {
        if (!isDrawing || !drawMode) return;

        e.preventDefault();

        const pos = getMousePos(e);

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        lastX = pos.x;
        lastY = pos.y;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // 'd' key toggles draw mode
        if (e.key === 'd' || e.key === 'D') {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                drawToggle.click();
            }
        }
        // 'c' key clears canvas
        if (e.key === 'c' || e.key === 'C') {
            if (drawMode && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                clearCanvas.click();
            }
        }
        // Escape key exits draw mode
        if (e.key === 'Escape' && drawMode) {
            drawToggle.click();
        }
    });

    // Adjust canvas size when DOM content loads
    document.addEventListener('DOMContentLoaded', resizeCanvas);

})();
