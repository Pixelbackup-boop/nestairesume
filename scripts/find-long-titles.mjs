#!/usr/bin/env node
import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const dirs = [
  path.join(rootDir, 'frontend', 'content', 'resume-examples'),
  path.join(rootDir, 'frontend', 'content', 'blog'),
  path.join(rootDir, 'frontend', 'content', 'career-tips'),
];

const results = [];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.mdx'))) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf-8'));
    if (data.title && data.title.length > 60) {
      results.push({
        file: f,
        dir: path.basename(dir),
        len: data.title.length,
        title: data.title,
        keyword: data.tags ? data.tags[0] : '',
        jobTitle: data.jobTitle || '',
      });
    }
  }
}
results.sort((a, b) => b.len - a.len);
console.log(`Total titles over 60 chars: ${results.length}\n`);
for (const r of results) {
  console.log(`${r.len} | ${r.dir}/${r.file}`);
  console.log(`   TITLE:    ${r.title}`);
  console.log(`   KEYWORD:  ${r.keyword}`);
  console.log(`   JOBTITLE: ${r.jobTitle}`);
  console.log();
}
