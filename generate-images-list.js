#!/usr/bin/env node

// Script to generate images-list.js from the /images/ directory
// Run: node generate-images-list.js

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputFile = path.join(__dirname, 'images-list.js');

// Read all files from images directory
const files = fs.readdirSync(imagesDir)
    .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    })
    .sort()
    .map(file => `    'images/${file}'`);

// Generate the JavaScript file content
const content = `// Dynamically generated list of all images in /images/ directory
// Run this script to regenerate: node generate-images-list.js

const ALL_IMAGES = [
${files.join(',\n')}
];

// Export for use in slideshow.js
if (typeof window !== 'undefined') {
    window.ALL_IMAGES = ALL_IMAGES;
}
`;

// Write to file
fs.writeFileSync(outputFile, content);

console.log(`Generated images-list.js with ${files.length} images`);
