import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const SRC = process.argv[2];
const NAVY = { r: 0x0A, g: 0x1E, b: 0x5E, alpha: 1 };

// Logo is 500x499 -- pad to square so it is not squashed at icon sizes.
const square = (size, background) =>
    sharp(SRC)
        .resize(size, size, { fit: 'contain', background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9, palette: true, quality: 90 })
        .toBuffer();

// Transparent PNGs for browsers + manifest
for (const s of [16, 32, 192, 512]) {
    const name = s <= 32 ? `public/favicon-${s}.png` : `public/logo${s}.png`;
    await writeFile(name, await square(s));
    console.log(name);
}

// iOS flattens transparency to black, so bake the navy background in.
await writeFile('public/apple-touch-icon.png', await square(180, NAVY));
console.log('public/apple-touch-icon.png');

// favicon.ico: ICO container wrapping PNG entries (supported since Vista).
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map(s => square(s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);                 // reserved
header.writeUInt16LE(1, 2);                 // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(s === 256 ? 0 : s, e);      // width
    header.writeUInt8(s === 256 ? 0 : s, e + 1);  // height
    header.writeUInt8(0, e + 2);                  // palette
    header.writeUInt8(0, e + 3);                  // reserved
    header.writeUInt16LE(1, e + 4);               // colour planes
    header.writeUInt16LE(32, e + 6);              // bits per pixel
    header.writeUInt32LE(imgs[i].length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += imgs[i].length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...imgs]));
console.log('public/favicon.ico');
