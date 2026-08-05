import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// R2 incremental cache keeps ISR/prerendered pages out of the 20k static-asset
// limit — with ~22k content pages this is required, not optional.
export default {
    ...defineCloudflareConfig({
        incrementalCache: r2IncrementalCache,
    }),
    // Turbopack production builds fail when the Google Fonts CDN is unreachable
    // (see CLAUDE.md) — keep the webpack build path.
    buildCommand: "npx next build --webpack",
};
