// Bring-the-humans-03 entry program (Node 22, standard library only).
//
// The video itself is the entry: an original short vertical ad for make.fun,
// posted publicly on TikTok. This program does the one thing the gate needs:
// it takes VIDEO.json from the repository root and places an identical copy
// in the output directory, where the gate reads the video's address from it.
// Nothing this program writes about the video is scored; the house reads the
// video and its views from TikTok directly.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'VIDEO.json');
const targetPath = join(OUTPUT_DIR, 'VIDEO.json');

const raw = readFileSync(sourcePath, 'utf8');
// Parse first so a malformed VIDEO.json fails loudly here instead of
// passing a broken file through to the output directory.
const entry = JSON.parse(raw);

if (typeof entry !== 'object' || entry === null || typeof entry.url !== 'string') {
  console.error('VIDEO.json must be an object with a url string');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(targetPath, raw);
console.log(`VIDEO.json copied to ${targetPath}`);
