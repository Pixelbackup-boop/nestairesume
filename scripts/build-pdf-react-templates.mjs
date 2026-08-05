/**
 * Bundles the frontend React resume templates into a single self-contained
 * CommonJS file the backend can require for PDF generation.
 *
 * Input:  frontend/lib/templates/pdfSsrEntry.ts
 * Output: backend/generated/reactTemplates.js (react + react-dom/server included)
 *
 * Run after changing any template in frontend/components/templates/:
 *   node scripts/build-pdf-react-templates.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const frontend = path.join(root, 'frontend');

// Use the frontend's esbuild so the bundle resolves the frontend's React copy
const require = createRequire(path.join(frontend, 'package.json'));
const esbuild = require('esbuild');

const result = await esbuild.build({
    entryPoints: [path.join(frontend, 'lib/templates/pdfSsrEntry.ts')],
    outfile: path.join(root, 'backend/generated/reactTemplates.js'),
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    jsx: 'automatic',
    alias: {
        // Templates import useTemplateSetup via the '@/hooks' barrel, which also
        // re-exports browser-only hooks (ads, auth store, next-intl, canvas).
        // Point the barrel at the single SSR-safe hook to keep those out.
        '@/hooks': path.join(frontend, 'hooks/useTemplateSetup.ts'),
        '@': frontend,
    },
    absWorkingDir: frontend,
    minify: false,
    sourcemap: false,
    logLevel: 'info',
});

if (result.errors.length === 0) {
    console.log('✅ Built backend/generated/reactTemplates.js');
}
