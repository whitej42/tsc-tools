// Downscale + WebP the hero images, then write the manifest HomeHero reads.
//   node scripts/compress-hero.mjs
//
// 1600px/q70 because the hero renders full-bleed at opacity-30 behind text --
// finer detail than this is thrown away by the overlay.
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'src/assets/images/hero';
const manifest = 'src/components/layout/HomeHero/heroImages.json';

const jpgs = (await readdir(dir)).filter(f => f.endsWith('.jpg'));

for (const f of jpgs) {
    const out = path.join(dir, f.replace(/\.jpg$/, '.webp'));
    const { size } = await sharp(path.join(dir, f))
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 70 })
        .toFile(out);
    console.log(`${f} -> ${(size / 1024).toFixed(0)}KB`);
}

// Lists what is in the folder rather than what this run converted, so
// re-running once the source JPEGs are gone still writes a correct manifest.
const webps = (await readdir(dir)).filter(f => f.endsWith('.webp')).sort();
await writeFile(manifest, JSON.stringify(webps, null, 2) + '\n');
console.log(`${webps.length} images -> ${manifest}`);
