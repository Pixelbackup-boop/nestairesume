/**
 * Generates lib/generated-content/content-manifest.json — the fs fallback for
 * content readers on Cloudflare Workers (lib/content-fs.ts).
 *
 * Workers have no filesystem at runtime, so any page that renders at request
 * time (dynamic listings, ISR) sees empty content directories. This manifest
 * bundles enough of the content tree into the worker to answer those reads:
 *   - files:       directory listings for every dir under content/ (all depths)
 *   - frontmatter: the frontmatter block of each ROOT-level MDX file (listing
 *                  pages only need metadata; article bodies stay build-time)
 *
 * Runs automatically before `next build` (see open-next.config.ts
 * buildCommand). The output is committed so `next dev`, tsc, and CI always
 * have a valid import target.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const frontend = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CONTENT_ROOT = path.join(frontend, 'content');
const OUT_DIR = path.join(frontend, 'lib', 'generated-content');
const OUT_FILE = path.join(OUT_DIR, 'content-manifest.json');

const ROOTS = ['blog', 'career-tips', 'resume-examples', 'cover-letter-examples'];

const files = {};
const frontmatter = {};

function walk(absDir, relDir, depth) {
  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  files[relDir] = entries.map((e) => e.name);

  for (const e of entries) {
    const absChild = path.join(absDir, e.name);
    const relChild = `${relDir}/${e.name}`;
    if (e.isDirectory()) {
      walk(absChild, relChild, depth + 1);
    } else if (depth === 0 && e.name.endsWith('.mdx')) {
      // Root-level files: store the frontmatter block (metadata for listings)
      const content = fs.readFileSync(absChild, 'utf-8');
      const m = content.match(/^---\r?\n[\s\S]*?\r?\n---/);
      frontmatter[relChild] = m ? `${m[0]}\n` : '';
    }
  }
}

for (const root of ROOTS) {
  const abs = path.join(CONTENT_ROOT, root);
  if (fs.existsSync(abs)) walk(abs, `content/${root}`, 0);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify({ files, frontmatter }));

const stat = fs.statSync(OUT_FILE);
console.log(
  `✅ content-manifest.json: ${Object.keys(files).length} dirs, ` +
    `${Object.keys(frontmatter).length} frontmatter entries, ` +
    `${(stat.size / 1024 / 1024).toFixed(1)}MB`
);
