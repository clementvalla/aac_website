# Images Management

## Overview

The site uses a dynamic image loading system for slideshows and the agentbox. All images are stored in the `/images/` directory and automatically loaded.

## Adding New Images

1. Add your images to the `/images/` directory
2. Run the generation script to update the image list:
   ```bash
   node generate-images-list.js
   ```
3. Commit both the new images and the updated `images-list.js` file

## Supported Formats

- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`

## How It Works

- `images-list.js` - Contains the array of all image paths
- `generate-images-list.js` - Script that scans `/images/` and regenerates the list
- `slideshow.js` - Loads images from the `ALL_IMAGES` array
- All HTML pages load `images-list.js` before `slideshow.js`

## Image Display

### Agentbox (Sidebar)
- Fixed size: 300px height
- Images are cropped to fit using `object-fit: cover`
- Cycles through all images randomly every 3 seconds

### Live Feed Page
- Full-size display
- All images shown with navigation controls
- Auto-advances every 2 seconds

### Homepage Hero
- Uses a curated subset defined in `slideshow.js` under `HERO_IMAGES`
- To update the hero images, edit the `HERO_IMAGES` array in `slideshow.js`

## Current Status

- **Total images:** 130
- Last generated: 2026-01-12
