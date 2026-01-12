# CTC Pathways Visualization

An interactive fullscreen canvas visualization showing the pathways through Computation, Technology, and Culture courses, displayed on a gradient circular background.

## Features

- **Fullscreen Canvas**: The visualization covers the entire viewport
- **Gradient Background**: Uses the venn.png gradient circular image as the base
- **Interactive Tooltips**: Hover over course codes to see full titles and descriptions
- **Clickable Courses**: Click on course codes to open their course search pages
- **Secret Edit Mode**: Access via `#edit` hash to drag and reposition elements

## Files

- `index.html` - Main application (HTML + CSS + JavaScript)
- `pathways-data.json` - Course and theme data with positions
- `venn.png` - Gradient circular background image
- `pathways.png` - Reference image showing the target layout

## Usage

### Viewing Mode (Default)

Simply open `index.html` in a web browser. You can:
- Hover over course codes to see tooltips with full information
- Click on course codes to open their course search pages
- The visualization automatically scales to fit your screen

### Edit Mode

Add `#edit` to the URL (e.g., `file:///path/to/index.html#edit`) to enter edit mode:

1. **Drag Elements**: Click and drag any course code or theme title to reposition it
2. **Export JSON**: Click the "Export JSON" button to see the updated position data
3. **Copy JSON**: Click "Copy to Clipboard" to copy the JSON data
4. **Download Image**: Save a PNG snapshot of the current visualization
5. **Exit Edit Mode**: Remove `#edit` from the URL

### Updating Data

Edit the `pathways-data.json` file to:
- Add or remove courses
- Adjust positions (x, y coordinates)
- Change colors, font sizes, or text
- Modify course descriptions and URLs

The JSON structure:

```json
{
  "themes": [
    {
      "id": "unique_id",
      "text": "THEME NAME",
      "position": [x, y],
      "fontSize": 28,
      "color": "#000000"
    }
  ],
  "courses": [
    {
      "code": "CTC-XXXX",
      "title": "Course Title",
      "position": [x, y],
      "fontSize": 16,
      "color": "#000000",
      "description": "Course description for tooltip",
      "url": "https://coursesearch.risd.edu/search/"
    }
  ]
}
```

### Multiline Text

Use `\n` in the text field to create multiline labels:
```json
{
  "text": "DIGITAL\nIMAGING"
}
```

## Technical Details

- Pure HTML/CSS/JavaScript (no dependencies)
- Canvas API for rendering
- Responsive scaling that maintains aspect ratio
- Touch and mouse event support for edit mode
- Coordinate system based on original image dimensions

## Browser Compatibility

Works in all modern browsers that support:
- Canvas API
- ES6 JavaScript
- Fetch API
