#!/usr/bin/env node
/**
 * Add External Links to TSX Pages
 *
 * Adds external authority links to alternative pages, tools pages, and compare page.
 * These are TSX files with hardcoded JSX — we add external link cards/text.
 */

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

// ═══════════════════════════════════════
// External links per page
// ═══════════════════════════════════════

const PAGE_EXTERNAL_LINKS = {
  'canva-alternative': {
    competitorUrl: 'https://www.canva.com/resumes/',
    competitorName: 'Canva Resume Templates',
    authorityUrl: 'https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm',
    authorityName: 'BLS Career Outlook: Resume Tips',
  },
  'zety-alternative': {
    competitorUrl: 'https://zety.com/',
    competitorName: 'Zety Official Site',
    authorityUrl: 'https://www.shrm.org/topics-tools/tools/hr-answers/what-are-applicant-tracking-systems',
    authorityName: 'SHRM: What Are ATS Systems',
  },
  'adobe-alternative': {
    competitorUrl: 'https://www.adobe.com/express/create/resume',
    competitorName: 'Adobe Express Resume Maker',
    authorityUrl: 'https://www.bls.gov/ooh/',
    authorityName: 'Bureau of Labor Statistics OOH',
  },
  'resume-io-alternative': {
    competitorUrl: 'https://resume.io/',
    competitorName: 'Resume.io Official Site',
    authorityUrl: 'https://www.bls.gov/ooh/',
    authorityName: 'Bureau of Labor Statistics OOH',
  },
  'rezi-alternative': {
    competitorUrl: 'https://www.rezi.ai/',
    competitorName: 'Rezi AI Resume Builder',
    authorityUrl: 'https://www.bls.gov/ooh/',
    authorityName: 'Bureau of Labor Statistics OOH',
  },
  'livecareer-alternative': {
    competitorUrl: 'https://www.livecareer.com/',
    competitorName: 'LiveCareer Official Site',
    authorityUrl: 'https://www.shrm.org/',
    authorityName: 'SHRM Career Resources',
  },
  'europass-alternative': {
    competitorUrl: 'https://europa.eu/europass/en',
    competitorName: 'Europass Official Portal',
    authorityUrl: 'https://www.bls.gov/ooh/',
    authorityName: 'Bureau of Labor Statistics OOH',
  },
  'nova-alternative': {
    competitorUrl: 'https://novoresume.com/',
    competitorName: 'Novorésumé Official Site',
    authorityUrl: 'https://www.bls.gov/ooh/',
    authorityName: 'Bureau of Labor Statistics OOH',
  },
  'overleaf-alternative': {
    competitorUrl: 'https://www.overleaf.com/gallery/tagged/cv',
    competitorName: 'Overleaf CV Templates',
    authorityUrl: 'https://www.bls.gov/ooh/computer-and-information-technology/home.htm',
    authorityName: 'BLS: Technology Careers',
  },
};

// ═══════════════════════════════════════
// Process alternative pages
// ═══════════════════════════════════════

let updated = 0;

for (const [pageName, links] of Object.entries(PAGE_EXTERNAL_LINKS)) {
  const filePath = path.join(rootDir, 'frontend', 'app', '[locale]', pageName, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${pageName}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Idempotency: skip if already has external links
  if (content.includes('target="_blank"') || content.includes('noopener noreferrer')) {
    console.log(`SKIP (already has external links): ${pageName}`);
    continue;
  }

  // Find the "Helpful Resume Guides" section and add external links after it
  const guidesEndPattern = /(<h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resume Guides<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/;

  const guidesMatch = content.match(guidesEndPattern);
  if (guidesMatch) {
    // Add external resources section after the cross-links section
    const externalSection = `
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="${links.competitorUrl}" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">${links.competitorName}</span>
                        </a>
                        <a href="${links.authorityUrl}" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">${links.authorityName}</span>
                        </a>
                    </div>
                </div>
            </section>`;

    // Insert after the cross-links section (before Bottom CTA)
    content = content.replace(
      guidesEndPattern,
      `$1\n${externalSection}`
    );

    fs.writeFileSync(filePath, content);
    console.log(`UPDATED: ${pageName}`);
    updated++;
  } else {
    // Try alternative: find the last </section> before Bottom CTA or Footer
    const bottomCtaPattern = /(\s*{\/\* Bottom CTA \*\/})/;
    const finalCtaPattern = /(\s*{\/\* Final CTA \*\/})/;
    const footerPattern = /(\s*<Footer)/;

    let insertPoint = content.match(bottomCtaPattern)?.[0]
      || content.match(finalCtaPattern)?.[0]
      || content.match(footerPattern)?.[0];

    if (insertPoint) {
      const externalSection = `
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="${links.competitorUrl}" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">${links.competitorName}</span>
                        </a>
                        <a href="${links.authorityUrl}" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">${links.authorityName}</span>
                        </a>
                    </div>
                </div>
            </section>\n`;

      content = content.replace(insertPoint, externalSection + insertPoint);
      fs.writeFileSync(filePath, content);
      console.log(`UPDATED (fallback insertion): ${pageName}`);
      updated++;
    } else {
      console.log(`SKIP (no insertion point found): ${pageName}`);
    }
  }
}

// ═══════════════════════════════════════
// Process compare page
// ═══════════════════════════════════════

const comparePath = path.join(rootDir, 'frontend', 'app', '[locale]', 'compare', 'chatgpt-vs-ai-resume-builder', 'page.tsx');
if (fs.existsSync(comparePath)) {
  let content = fs.readFileSync(comparePath, 'utf-8');

  if (content.includes('target="_blank"') || content.includes('noopener noreferrer')) {
    console.log('SKIP (already has external links): compare page');
  } else {
    const insertPoint = content.match(/(\s*{\/\* Bottom CTA \*\/})/)?.[0]
      || content.match(/(\s*{\/\* Final CTA \*\/})/)?.[0]
      || content.match(/(\s*<Footer)/)?.[0];

    if (insertPoint) {
      const externalSection = `
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://openai.com/chatgpt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">ChatGPT by OpenAI</span>
                        </a>
                        <a href="https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">BLS Career Outlook: Resume Tips</span>
                        </a>
                    </div>
                </div>
            </section>\n`;

      content = content.replace(insertPoint, externalSection + insertPoint);
      fs.writeFileSync(comparePath, content);
      console.log('UPDATED: compare page');
      updated++;
    } else {
      console.log('SKIP (no insertion point found): compare page');
    }
  }
}

// ═══════════════════════════════════════
// Process tools pages
// ═══════════════════════════════════════

const TOOLS_LINKS = {
  'ats-checker': {
    links: [
      { url: 'https://www.jobscan.co/blog/ats-applicant-tracking-systems/', name: 'Understanding ATS: How They Work' },
      { url: 'https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm', name: 'BLS Career Outlook: Resume Tips' },
    ],
  },
  'cover-letter': {
    links: [
      { url: 'https://www.bls.gov/ooh/', name: 'Bureau of Labor Statistics: Career Outlook' },
      { url: 'https://www.shrm.org/', name: 'SHRM: HR & Career Resources' },
    ],
  },
  'mock-interview': {
    links: [
      { url: 'https://www.bls.gov/ooh/', name: 'Bureau of Labor Statistics: Career Outlook' },
      { url: 'https://www.shrm.org/topics-tools/tools/hr-answers/what-are-applicant-tracking-systems', name: 'SHRM: Interview Best Practices' },
    ],
  },
  'resignation-letter': {
    links: [
      { url: 'https://www.shrm.org/', name: 'SHRM: HR & Workplace Resources' },
      { url: 'https://www.bls.gov/ooh/', name: 'Bureau of Labor Statistics: Career Data' },
    ],
  },
};

for (const [toolName, config] of Object.entries(TOOLS_LINKS)) {
  const filePath = path.join(rootDir, 'frontend', 'app', '[locale]', 'tools', toolName, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): tools/${toolName}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('target="_blank"') && content.includes('noopener noreferrer')) {
    console.log(`SKIP (already has external links): tools/${toolName}`);
    continue;
  }

  const insertPoint = content.match(/(\s*{\/\* Final CTA \*\/})/)?.[0]
    || content.match(/(\s*{\/\* Bottom CTA \*\/})/)?.[0]
    || content.match(/(\s*<Footer)/)?.[0];

  if (insertPoint) {
    const linkCards = config.links.map(link =>
      `                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">${link.name}</span>
                        </a>`
    ).join('\n');

    const externalSection = `
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
${linkCards}
                    </div>
                </div>
            </section>\n`;

    content = content.replace(insertPoint, externalSection + insertPoint);
    fs.writeFileSync(filePath, content);
    console.log(`UPDATED: tools/${toolName}`);
    updated++;
  } else {
    console.log(`SKIP (no insertion point found): tools/${toolName}`);
  }
}

console.log(`\nTotal TSX pages updated: ${updated}`);
