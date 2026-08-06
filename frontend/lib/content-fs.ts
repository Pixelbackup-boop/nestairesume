/**
 * Filesystem access for content/ that works on Cloudflare Workers.
 *
 * Real fs exists during `next build` and `next dev` — but NOT at runtime on
 * Workers, where any request-time render (dynamic listing pages, ISR) used to
 * see empty content directories and silently render "no posts". These wrappers
 * try real fs first and fall back to the bundled manifest
 * (lib/generated-content/content-manifest.json, regenerated before every build
 * by scripts/generate-content-manifest.mjs).
 *
 * The manifest carries directory listings for the whole content tree and the
 * frontmatter of root-level MDX files — enough for listings, category counts,
 * and locale-availability checks. Full article bodies are intentionally not
 * bundled: detail pages are statically prerendered at build time where real
 * fs is available.
 */
import fs from 'fs';
import manifestJson from '@/lib/generated-content/content-manifest.json';

const manifest = manifestJson as unknown as {
  files: Record<string, string[]>;
  frontmatter: Record<string, string>;
};

/** Normalize an absolute or relative path to a manifest key ('content/...'). */
function manifestKey(p: string): string | null {
  const norm = p.split('\\').join('/');
  if (norm.startsWith('content/')) return norm;
  const i = norm.lastIndexOf('/content/');
  return i === -1 ? null : norm.slice(i + 1);
}

export function contentExistsSync(p: string): boolean {
  try {
    if (fs.existsSync(p)) return true;
  } catch {
    // fs unavailable (Workers runtime) — fall through to manifest
  }
  const k = manifestKey(p);
  return k !== null && (k in manifest.files || k in manifest.frontmatter);
}

export function contentReaddirSync(p: string): string[] {
  try {
    if (fs.existsSync(p)) return fs.readdirSync(p);
  } catch {
    // fall through to manifest
  }
  const k = manifestKey(p);
  return (k && manifest.files[k]) || [];
}

/**
 * Read a content file. On the manifest path only root-level frontmatter is
 * available — perfect for listing metadata; article bodies must be read at
 * build time. Throws (like fs) when the file is in neither source.
 */
export function contentReadFileSync(p: string, _encoding?: string): string {
  try {
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf-8');
  } catch {
    // fall through to manifest
  }
  const k = manifestKey(p);
  const fm = k ? manifest.frontmatter[k] : undefined;
  if (fm !== undefined) return fm;
  throw new Error(`content file not on disk and not in manifest: ${p}`);
}
