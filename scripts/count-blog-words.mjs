#!/usr/bin/env node
import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const dir = path.join(rootDir, 'frontend', 'content', 'blog');
const results = [];

for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.mdx'))) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
  const { data, content } = matter(raw);
  const words = content.replace(/```[\s\S]*?```/g, '').replace(/[#*\[\]()_`>|\\-]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  results.push({ file: f, words, title: data.title, slug: data.slug, category: data.category || '' });
}

results.sort((a, b) => a.words - b.words);

const under1500 = results.filter(r => r.words < 1500);
console.log(`Total blog posts: ${results.length}`);
console.log(`Under 1,500 words: ${under1500.length}\n`);
console.log('SLUG                                    WORDS  NEED   CATEGORY');
console.log('─'.repeat(75));
for (const r of under1500) {
  const need = 1500 - r.words;
  console.log(`${r.slug.padEnd(40)} ${String(r.words).padStart(5)}  +${String(need).padStart(4)}   ${r.category}`);
}
console.log('\n--- Already OK ---');
const ok = results.filter(r => r.words >= 1500);
for (const r of ok) {
  console.log(`${r.slug.padEnd(40)} ${String(r.words).padStart(5)}   ${r.category}`);
}
