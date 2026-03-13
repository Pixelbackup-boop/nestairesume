#!/usr/bin/env node
/**
 * Second-pass keyword density fix.
 * Injects keyword sentences into files where density is still below threshold.
 * Covers ALL content types (blog, career-tips, resume, cover-letter).
 *
 * Usage:
 *   node scripts/fix-density-pass2.mjs [--dry-run] [--locale=fr] [--type=blog]
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const localeArg = process.argv.find(a => a.startsWith('--locale='))?.split('=')[1];
const typeArg = process.argv.find(a => a.startsWith('--type='))?.split('=')[1];

const CONTENT_BASE = path.join(rootDir, 'frontend', 'content');
const CONTENT_TYPES = typeArg ? [typeArg] : ['resume-examples', 'cover-letter-examples', 'blog', 'career-tips'];
const LOCALES = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

const CJK_REGEX = /[\u3000-\u9fff\uac00-\ud7af\uf900-\ufaff]/gu;
const THAI_REGEX = /[\u0E00-\u0E7F]/gu;
const CJK_LOCALES = new Set(['ja', 'ko', 'zh']);

function countWords(text, locale) {
  const clean = text.replace(/[#*\->\[\]\(\)]/g, ' ');
  if (CJK_LOCALES.has(locale)) {
    const cjk = (clean.match(CJK_REGEX) || []).length;
    const nonCjk = clean.replace(CJK_REGEX, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
    return cjk + nonCjk;
  }
  if (locale === 'th') {
    const thai = (clean.match(THAI_REGEX) || []).length;
    const nonThai = clean.replace(THAI_REGEX, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
    return Math.round(thai / 3) + nonThai;
  }
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function getDensity(content, keyword, locale) {
  const body = content.replace(/```[\s\S]*?```/g, '').replace(/[#*\[\]()_`>|\\-]/g, ' ');
  const total = countWords(body, locale);
  const kwRegex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = (body.toLowerCase().match(kwRegex) || []).length;
  const kwWordCount = keyword.split(/\s+/).filter(Boolean).length;
  return { density: total > 0 ? ((matches * kwWordCount) / total) * 100 : 0, matches, total };
}

// Generic sentence templates by locale for injection
const TEMPLATES = {
  en: (kw) => `This ${kw} guide provides practical tips and real examples to help you stand out in today's competitive job market.`,
  fr: (kw) => `Ce guide de ${kw} offre des conseils pratiques et des exemples concrets pour vous aider à vous démarquer.`,
  es: (kw) => `Esta guía de ${kw} proporciona consejos prácticos y ejemplos reales para ayudarte a destacar.`,
  de: (kw) => `Dieser ${kw} Leitfaden bietet praktische Tipps und konkrete Beispiele für Ihre Bewerbung.`,
  it: (kw) => `Questa guida al ${kw} offre consigli pratici ed esempi concreti per distinguersi.`,
  pt: (kw) => `Este guia de ${kw} oferece dicas práticas e exemplos reais para se destacar.`,
  ar: (kw) => `يقدم هذا الدليل لكتابة ${kw} نصائح عملية وأمثلة واقعية لمساعدتك على التميز.`,
  ja: (kw) => `この${kw}ガイドでは、実践的なアドバイスと具体例を紹介します。`,
  ko: (kw) => `이 ${kw} 가이드는 실용적인 팁과 구체적인 예시를 제공합니다.`,
  tr: (kw) => `Bu ${kw} rehberi, öne çıkmanıza yardımcı olacak pratik ipuçları ve gerçek örnekler sunar.`,
  vi: (kw) => `Hướng dẫn ${kw} này cung cấp các mẹo thực tế và ví dụ cụ thể giúp bạn nổi bật.`,
  th: (kw) => `คู่มือ${kw}นี้มีเคล็ดลับที่ใช้ได้จริงและตัวอย่างที่เป็นรูปธรรมเพื่อช่วยให้คุณโดดเด่น`,
  id: (kw) => `Panduan ${kw} ini menyediakan tips praktis dan contoh nyata untuk membantu Anda tampil menonjol.`,
  nl: (kw) => `Deze ${kw} gids biedt praktische tips en concrete voorbeelden om op te vallen.`,
  pl: (kw) => `Ten przewodnik po ${kw} oferuje praktyczne wskazówki i konkretne przykłady, aby się wyróżnić.`,
};

let totalFixed = 0, totalSkipped = 0;

function processDir(dir, contentType, locale) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  let fixed = 0, skipped = 0;

  const densityMin = CJK_LOCALES.has(locale) ? 0.05 : locale === 'th' ? 0.2 : 0.3;

  for (const f of files) {
    const filePath = path.join(dir, f);
    let parsed;
    try { parsed = matter(fs.readFileSync(filePath, 'utf-8')); } catch { continue; }

    const { data: fm, content } = parsed;
    const keyword = (fm.tags && fm.tags[0]) || '';
    if (!keyword) { skipped++; continue; }

    const { density } = getDensity(content, keyword, locale);
    if (density >= densityMin) continue; // already OK

    const template = TEMPLATES[locale];
    if (!template) { skipped++; continue; }

    // Find injection point: after the first paragraph following the first heading
    const lines = content.split('\n');
    let injPoint = -1;
    let foundH = false, inP = false;
    for (let i = 0; i < lines.length; i++) {
      if (/^##\s/.test(lines[i])) { foundH = true; continue; }
      if (foundH && lines[i].trim().length > 0 && !lines[i].startsWith('#')) inP = true;
      if (inP && lines[i].trim() === '') { injPoint = i; break; }
    }

    if (injPoint === -1) { skipped++; continue; }

    const sentence = template(keyword);

    // Check if this exact sentence is already in the content (idempotency)
    if (content.includes(sentence)) { skipped++; continue; }

    lines.splice(injPoint, 0, '', sentence);

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, matter.stringify(lines.join('\n'), fm));
    }
    fixed++;
  }

  if (fixed > 0) console.log(`${locale}/${contentType}: fixed=${fixed}, skipped=${skipped}`);
  totalFixed += fixed;
  totalSkipped += skipped;
}

// Process EN root-level files
for (const contentType of CONTENT_TYPES) {
  if (localeArg && localeArg !== 'en') continue;
  processDir(path.join(CONTENT_BASE, contentType), contentType, 'en');
}

// Process locale subdirectories
const localesToProcess = localeArg ? [localeArg] : LOCALES;
for (const contentType of CONTENT_TYPES) {
  for (const locale of localesToProcess) {
    processDir(path.join(CONTENT_BASE, contentType, locale), contentType, locale);
  }
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Total: fixed=${totalFixed}, skipped=${totalSkipped}`);
