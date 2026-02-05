#!/usr/bin/env node
/**
 * Boosts keyword density by inserting the exact tags[0] phrase
 * into strategic locations in pages that have density < 0.3%.
 * Targets: intro paragraph, format tips section, ATS section, and conclusion.
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'node:module';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const dirs = [
  path.join(rootDir, 'frontend', 'content', 'resume-examples'),
  path.join(rootDir, 'frontend', 'content', 'blog'),
  path.join(rootDir, 'frontend', 'content', 'career-tips'),
];

let fixed = 0;
let skipped = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.mdx'))) {
    const filePath = path.join(dir, f);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const kw = (data.tags && data.tags[0]) || '';
    if (!kw) continue;

    const kwLower = kw.toLowerCase();
    const bodyText = content.replace(/```[\s\S]*?```/g, '').replace(/[#*\[\]()_`>|\\-]/g, ' ');
    const totalWords = bodyText.trim().split(/\s+/).filter(Boolean).length;
    const kwRegex = new RegExp(kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = (bodyText.toLowerCase().match(kwRegex) || []).length;
    const density = totalWords > 0 ? (matches / totalWords) * 100 : 0;

    if (density >= 0.3) continue;

    // Need to add keyword mentions. Target: ~4-6 mentions for ~1500 word page = ~0.3-0.4%
    const needed = Math.max(3, Math.ceil(totalWords * 0.004) - matches);
    let newContent = content;
    let added = 0;

    // Strategy 1: Add keyword to intro paragraph (after first ## heading)
    const introMatch = newContent.match(/^(## .+\n\n)([A-Z])/m);
    if (introMatch && added < needed) {
      const kwTitle = kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      // Don't add if keyword is already in the sentence
      const introLine = newContent.substring(newContent.indexOf(introMatch[0]), newContent.indexOf(introMatch[0]) + 200).toLowerCase();
      if (!introLine.includes(kwLower)) {
        // Find the end of the first paragraph after the H2
        const h2Pos = newContent.indexOf(introMatch[0]);
        const paraStart = h2Pos + introMatch[1].length;
        const nextParaEnd = newContent.indexOf('\n\n', paraStart);
        if (nextParaEnd > paraStart) {
          const firstPara = newContent.substring(paraStart, nextParaEnd);
          // Add keyword phrase to end of first paragraph
          const addition = ` A strong ${kwLower} demonstrates this effectively.`;
          newContent = newContent.substring(0, nextParaEnd) + addition + newContent.substring(nextParaEnd);
          added++;
        }
      }
    }

    // Strategy 2: Add to "Format & Template Tips" section
    const formatMatch = newContent.match(/^(## .+Format & Template Tips.*\n\n)(.+)/m);
    if (formatMatch && added < needed) {
      const fmtPos = newContent.indexOf(formatMatch[0]);
      const paraStart = fmtPos + formatMatch[1].length;
      const sentence = `Your ${kwLower} format should reflect industry standards. `;
      if (!newContent.substring(paraStart, paraStart + 200).toLowerCase().includes(kwLower)) {
        newContent = newContent.substring(0, paraStart) + sentence + newContent.substring(paraStart);
        added++;
      }
    }

    // Strategy 3: Add to "ATS Optimization" section
    const atsMatch = newContent.match(/^(## ATS Optimization.*\n\n)(.+)/m);
    if (atsMatch && added < needed) {
      const atsPos = newContent.indexOf(atsMatch[0]);
      const paraStart = atsPos + atsMatch[1].length;
      const sentence = `Optimizing your ${kwLower} for applicant tracking systems is essential. `;
      if (!newContent.substring(paraStart, paraStart + 200).toLowerCase().includes(kwLower)) {
        newContent = newContent.substring(0, paraStart) + sentence + newContent.substring(paraStart);
        added++;
      }
    }

    // Strategy 4: Add to "Common Mistakes" section
    const mistakeMatch = newContent.match(/^(## Common (?:Mistakes|.+Mistakes).*\n\n)(.+)/m);
    if (mistakeMatch && added < needed) {
      const mPos = newContent.indexOf(mistakeMatch[0]);
      const paraStart = mPos + mistakeMatch[1].length;
      const sentence = `Avoiding these mistakes will make your ${kwLower} stand out. `;
      if (!newContent.substring(paraStart, paraStart + 200).toLowerCase().includes(kwLower)) {
        newContent = newContent.substring(0, paraStart) + sentence + newContent.substring(paraStart);
        added++;
      }
    }

    // Strategy 5: Add to "Hiring Manager Tip" section
    const hmMatch = newContent.match(/^(## Hiring Manager Tip\n\n>.*\n\n)(.+)/m);
    if (hmMatch && added < needed) {
      const hmPos = newContent.indexOf(hmMatch[0]);
      const paraStart = hmPos + hmMatch[1].length;
      if (!newContent.substring(paraStart, paraStart + 200).toLowerCase().includes(kwLower)) {
        const sentence = `A well-crafted ${kwLower} gets noticed. `;
        newContent = newContent.substring(0, paraStart) + sentence + newContent.substring(paraStart);
        added++;
      }
    }

    // Strategy 6: Add to conclusion / "Explore More" lead-in
    const exploreMatch = newContent.match(/\n(Build a .+ resume that works\..+\n)/);
    if (exploreMatch && added < needed) {
      const ePos = newContent.indexOf(exploreMatch[0]);
      if (ePos > 0 && !exploreMatch[1].toLowerCase().includes(kwLower)) {
        const replacement = `\nBuild your ${kwLower} with confidence. Our AI tool structures your experience into a professional format that hiring managers and ATS systems both respond to.\n`;
        newContent = newContent.substring(0, ePos) + replacement + newContent.substring(ePos + exploreMatch[0].length);
        added++;
      }
    }

    // Strategy 7: Add to the "Ready to build" CTA at the bottom
    const ctaMatch = newContent.match(/Ready to build your .+ resume\?/);
    if (ctaMatch && added < needed) {
      const ctaPos = newContent.indexOf(ctaMatch[0]);
      if (!ctaMatch[0].toLowerCase().includes(kwLower)) {
        const kwTitle = kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const newCta = `Ready to build your ${kwTitle}?`;
        newContent = newContent.substring(0, ctaPos) + newCta + newContent.substring(ctaPos + ctaMatch[0].length);
        added++;
      }
    }

    if (added > 0) {
      const rebuilt = matter.stringify(newContent, data);
      fs.writeFileSync(filePath, rebuilt);
      fixed++;
      console.log(`+${added} mentions: ${f} (keyword: "${kw}")`);
    } else {
      skipped++;
      console.log(`SKIP (no insertion points): ${f} (keyword: "${kw}", density: ${density.toFixed(3)}%)`);
    }
  }
}

console.log(`\nDone. Fixed: ${fixed}, Skipped: ${skipped}`);
