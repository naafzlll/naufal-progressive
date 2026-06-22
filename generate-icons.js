/**
 * Script untuk membuat ikon PWA secara otomatis
 * Jalankan: node generate-icons.js
 * 
 * Script ini membuat 2 file PNG ikon yang dibutuhkan manifest.json:
 * - public/icons/icon-192x192.png
 * - public/icons/icon-512x512.png
 */

const fs = require('fs');
const path = require('path');

// Buat SVG sederhana sebagai ikon PWA
function createIconSVG(size) {
  const fontSize = Math.floor(size * 0.45);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1976d2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#42a5f5;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)" />
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
    font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="white">
    ⚡
  </text>
</svg>`;
}

const iconsDir = path.join(__dirname, 'public', 'icons');

// Buat direktori jika belum ada
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('✅ Folder public/icons/ dibuat');
}

// Simpan sebagai SVG dulu (fallback jika tidak ada sharp/canvas)
const sizes = [192, 512];
sizes.forEach(size => {
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, createIconSVG(size));
  console.log(`✅ Dibuat: public/icons/icon-${size}x${size}.svg`);
});

console.log('\n📝 Catatan:');
console.log('   File SVG telah dibuat. Untuk PNG, Anda bisa:');
console.log('   1. Rename file .svg menjadi .png (tidak ideal tapi bisa berfungsi di dev)');
console.log('   2. Gunakan tools online: https://cloudconvert.com/svg-to-png');
console.log('   3. Install sharp: npm install sharp, lalu jalankan generate-icons-png.js');
console.log('\n💡 Untuk praktikum, cukup rename SVG ke PNG atau buat PNG sederhana manual.');
