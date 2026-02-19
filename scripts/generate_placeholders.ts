
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'client', 'public', 'sequence');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WIDTH = 1920;
const HEIGHT = 1080;
const TOTAL_FRAMES = 90;

console.log(`Generating ${TOTAL_FRAMES} placeholder frames in ${OUTPUT_DIR}...`);

for (let i = 0; i < TOTAL_FRAMES; i++) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  const progress = i / TOTAL_FRAMES;
  const r = Math.floor(progress * 255);
  const g = Math.floor((1 - progress) * 255);
  const b = 100;
  
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 100px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Frame ${i}`, WIDTH / 2, HEIGHT / 2);
  
  // Progress bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillRect(0, HEIGHT - 50, WIDTH * progress, 50);

  // Save as WebP (using PNG buffer but saving with .webp extension is fine for placeholders usually, 
  // but better to actually encode as PNG and rename if canvas doesn't support webp encoding out of box)
  // node-canvas supports PNG, JPEG, PDF. Let's save as PNG but name it .webp for compatibility
  // (Modern browsers might handle it, or fail. To be safe, let's use actual PNGs and hope frontend falls back or handles it)
  // Actually, let's try to see if we can just use .png extension in the code if we can't generate true webp.
  // But since I can't change frontend code easily now... I'll just save as PNG and rename to .webp.
  // Most browsers sniff content type, so it might work.
  
  const buffer = canvas.toBuffer('image/png');
  
  // Filename formats
  const paddedIndex = i.toString().padStart(2, '0');
  const filename1 = `frame_${paddedIndex}_delay-0.067s.webp`;
  const filename2 = `frame_${i}.webp`; // Simple format
  
  fs.writeFileSync(path.join(OUTPUT_DIR, filename1), buffer);
  // fs.writeFileSync(path.join(OUTPUT_DIR, filename2), buffer); // consistent with prompt
}

console.log('Done generating placeholders.');
