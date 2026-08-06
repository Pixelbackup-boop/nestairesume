/**
 * Bundles the backend's DOCX/GDocs string templates into a self-contained
 * CommonJS file the Cloudflare Worker imports for /api/v1/docx/generate.
 *
 * Input:  scripts/docx-bundle-entry.ts (wraps backend/src/templates/docx)
 * Output: frontend/lib/docx-templates/docxTemplates.js
 *
 * Run after changing anything under backend/src/templates/{docx,gdocs}:
 *   node scripts/build-docx-templates.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const frontend = path.join(root, 'frontend');

const require = createRequire(path.join(frontend, 'package.json'));
const esbuild = require('esbuild');

const result = await esbuild.build({
    entryPoints: [path.join(root, 'scripts/docx-bundle-entry.ts')],
    outfile: path.join(frontend, 'lib/docx-templates/docxTemplates.js'),
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    // The backend templates import a pino logger — stub it out, the Worker
    // route does its own error logging.
    plugins: [
        {
            name: 'stub-backend-logger',
            setup(build) {
                build.onResolve({ filter: /\/lib\/logger$/ }, () => ({
                    path: path.join(root, 'scripts/docx-logger-stub.ts'),
                }));
            },
        },
    ],
    minify: false,
    sourcemap: false,
    logLevel: 'info',
});

if (result.errors.length === 0) {
    console.log('✅ Built frontend/lib/docx-templates/docxTemplates.js');
}
