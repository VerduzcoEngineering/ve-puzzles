#!/usr/bin/env node
// Regenerate index.json from every puzzles/*.json card.
// Run after adding or editing a puzzle:  node scripts/build-index.mjs
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'puzzles');

const files = (await readdir(dir)).filter(f => f.endsWith('.json')).sort();
const cards = [];
for (const f of files) {
  const card = JSON.parse(await readFile(join(dir, f), 'utf8'));
  if (!card.id) throw new Error(`${f}: missing id`);
  if (!Array.isArray(card.choices) || card.choices.length < 2) throw new Error(`${card.id}: needs >=2 choices`);
  if (typeof card.answerIndex !== 'number' || card.answerIndex < 0 || card.answerIndex >= card.choices.length)
    throw new Error(`${card.id}: answerIndex out of range`);
  cards.push(card);
}

await writeFile(join(root, 'index.json'), JSON.stringify(cards, null, 2) + '\n');
console.log(`index.json: ${cards.length} puzzle(s)`);
