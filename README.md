# Art & Computation at RISD - Website

Temporary/MVP website for RISD's Art & Computation major.

## Features

- **Brutalist Design** - Raw HTML/CSS aesthetic inspired by Yale Art School, Hito Steyerl, and other experimental web design
- **MacPaint Drawing Overlay** - Interactive drawing layer that lets visitors draw on the entire website
- **Fast & Accessible** - Semantic HTML5, high contrast, keyboard navigation, screen reader friendly
- **Mobile Responsive** - Works on all devices, touch-enabled drawing
- **No Dependencies** - Vanilla HTML/CSS/JavaScript, no frameworks

## Drawing Feature

The site includes a unique drawing overlay feature:

- Click "Draw Mode: ON" to activate drawing
- Draw directly on the website with your mouse or touch
- Choose colors: White, Black, or Green
- Clear your drawing anytime
- Keyboard shortcuts:
  - `D` - Toggle draw mode
  - `C` - Clear canvas (when in draw mode)
  - `Escape` - Exit draw mode

Drawings are temporary and reset when you refresh the page.

## File Structure

```
/index.html          - Homepage
/about.html          - Philosophy & approach
/work.html           - Project gallery (ready for content)
/people.html         - Faculty & students
/curriculum.html     - Degree requirements
/join.html           - How to join & FAQ
/style.css           - Main stylesheet
/draw.js             - Drawing functionality
```

## To Do

- Add project images to /work.html gallery
- Update contact information in /join.html
- Add declaration process details in /join.html
- Optional: Add faculty photos and bios to /people.html

## Technical Notes

- Black background (#000000), white text (#FFFFFF)
- Bright green accent color (#00FF00)
- System fonts for speed and simplicity
- Canvas-based drawing layer
- Print-friendly (drawing controls hidden in print)
- WCAG AA compliant for accessibility

## Deployment

Upload all files to Bluehost via FTP. No build process required - just static HTML/CSS/JS files.

---

Built for launch by Monday, January 13, 2026.
Full design iteration coming spring 2026.
