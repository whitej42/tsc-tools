// Downscale + WebP the hero JPEGs (writes .webp beside each .jpg).
//   node scripts/compress-hero.mjs
//
// 1600px/q70 because the hero renders full-bleed at opacity-30 behind text --
// finer detail than this is thrown away by the overlay.
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'src/assets/images/hero';
const files = (await readdir(dir)).filter(f => f.endsWith('.jpg'));

for (const f of files) {
    const out = path.join(dir, f.replace(/\.jpg$/, '.webp'));
    const { size } = await sharp(path.join(dir, f))
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 70 })
        .toFile(out);
    console.log(`${f} -> ${(size / 1024).toFixed(0)}KB`);
}
