// Helper script to copy images - run with: node setup.js
const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\prasanth\\.gemini\\antigravity\\brain\\cc13118d-b605-440a-b66d-733037f1d1a5';
const destDir = path.join(__dirname, 'assets', 'images');

// Create directory
fs.mkdirSync(destDir, { recursive: true });

// Copy files
const files = [
  { src: 'tribal_hero_1776218659711.png', dest: 'hero.png' },
  { src: 'tribal_gallery_1776218679201.png', dest: 'gallery.png' },
  { src: 'tribal_education_1776218718965.png', dest: 'education.png' },
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${f.dest}`);
  } else {
    console.log(`✗ Source not found: ${f.src}`);
  }
});

console.log('\\nDone! Images are in assets/images/');
