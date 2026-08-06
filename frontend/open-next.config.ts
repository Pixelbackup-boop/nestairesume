import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// R2 incremental cache keeps ISR/prerendered pages out of the 20k static-asset
// limit — with ~22k content pages this is required, not optional.
export default {
    ...defineCloudflareConfig({
        incrementalCache: r2IncrementalCache,
    }),
    // Turbopack is required: the Prisma cloudflare client imports its WASM
    // query compiler via the `?module` convention, which webpack can't parse
    // (matches the official @opennextjs/cloudflare prisma-7 example).
    // Note: Turbopack builds need the Google Fonts CDN reachable (CLAUDE.md).
    // The content manifest must be regenerated first — it is the fs fallback
    // for request-time renders on Workers (lib/content-fs.ts).
    buildCommand: "node scripts/generate-content-manifest.mjs && npx next build --turbopack",
};
