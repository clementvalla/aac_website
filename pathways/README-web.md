# CTC Pathways - Interactive Web Version

An interactive web-based visualization of the Art & Computation curriculum pathways.

## Features

### Public View Mode (Default)
- **Hover** over any course code to see:
  - Course title
  - Description
  - Link to coursesearch
- **Click** on a course code to open its coursesearch page

### Edit Mode (`#edit` in URL)
- **Drag and drop** course codes and theme labels to reposition them
- **Export JSON** to get updated position data
- **Download Image** to save the current visualization as PNG

## Setup

1. Place these files in the same directory:
   - `index.html`
   - `pathways-data.json`
   - `venn.png` (your background image)

2. Serve via a local web server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or use any other local server
   ```

3. Open in browser:
   - Public view: `http://localhost:8000/`
   - Edit mode: `http://localhost:8000/#edit`

## Usage

### Updating Course Data

Edit `pathways-data.json`:

```json
{
  "themes": [
    {
      "id": "computation",
      "text": "Computation",
      "position": [842, 150],
      "fontSize": 36,
      "color": "#3c3c3c"
    }
  ],
  "courses": [
    {
      "code": "COMP-2110",
      "title": "Introduction to Computation",
      "position": [842, 320],
      "fontSize": 22,
      "color": "#000000",
      "description": "Course description here",
      "url": "https://coursesearch.risd.edu/..."
    }
  ]
}
```

### Adjusting Positions

1. Go to `#edit` mode
2. Drag items to new positions
3. Click "Export JSON"
4. Copy the output and paste into `pathways-data.json`
5. Refresh to see changes

### Deploying

This is a static site that can be hosted anywhere:
- GitHub Pages
- Netlify
- Vercel
- RISD web server
- Any static hosting service

Just upload the three files and you're done!

## File Structure

```
your-project/
├── index.html           # Main application
├── pathways-data.json   # Course and theme data
└── venn.png            # Background Venn diagram
```

## Tips

- The canvas automatically scales to fit the window while maintaining aspect ratio
- In edit mode, drag any text element to reposition it
- Positions are saved in pixel coordinates relative to the original image size (1684x1608)
- Use the export feature to back up your positions as you work
- The tooltip shows up in public view mode when hovering over courses
- Course links open in a new tab when clicked

## Customization

### Styling
Edit the `<style>` section in `index.html` to customize:
- Tooltip appearance
- Edit mode indicator
- Control panel styling
- Canvas shadow and background

### Colors
Update colors in `pathways-data.json`:
- Hex format: `"#3c3c3c"`
- RGB format is also supported in the code if needed

### Font Sizes
Adjust `fontSize` in the JSON for individual items:
- Themes: typically 32-40
- Courses: typically 18-24

---

Made with 🎨 for RISD CTC
