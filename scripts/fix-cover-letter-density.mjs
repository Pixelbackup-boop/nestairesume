#!/usr/bin/env node
/**
 * Fix kw-body-density for cover-letter-examples across all locales.
 * Injects 2 sentences containing the exact tags[0] phrase into the body.
 *
 * Usage:
 *   node scripts/fix-cover-letter-density.mjs [--dry-run] [--locale=fr]
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const localeArg = process.argv.find(a => a.startsWith('--locale='))?.split('=')[1];

const CONTENT_DIR = path.join(rootDir, 'frontend', 'content', 'cover-letter-examples');
const LOCALES = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

// ═══════════════════════════════════════════════
// LOCALE SENTENCE TEMPLATES
// Each locale gets 2 sentences to inject.
// {kw} is replaced with the exact tags[0] value.
// Sentence 1: injected after first paragraph (after first heading's content)
// Sentence 2: injected before the last major section
// ═══════════════════════════════════════════════

const TEMPLATES = {
  fr: {
    s1: (kw) => `Ce guide de ${kw} offre des conseils pratiques et des exemples concrets pour vous aider à vous démarquer auprès des recruteurs.`,
    s2: (kw) => `Rédigez votre ${kw} avec des résultats chiffrés et des compétences clés pour maximiser vos chances.`,
  },
  es: {
    s1: (kw) => `Esta guía de ${kw} ofrece consejos prácticos y ejemplos concretos para ayudarte a destacar ante los reclutadores.`,
    s2: (kw) => `Redacta tu ${kw} con logros cuantificables y habilidades clave para maximizar tus oportunidades.`,
  },
  de: {
    s1: (kw) => `Dieser Leitfaden für ${kw} bietet praktische Tipps und konkrete Beispiele, um sich bei Personalern abzuheben.`,
    s2: (kw) => `Verfassen Sie Ihr ${kw} mit messbaren Erfolgen und Schlüsselqualifikationen für optimale Ergebnisse.`,
  },
  it: {
    s1: (kw) => `Questa guida alla ${kw} offre consigli pratici ed esempi concreti per distinguersi agli occhi dei selezionatori.`,
    s2: (kw) => `Redigi la tua ${kw} con risultati quantificabili e competenze chiave per massimizzare le opportunità.`,
  },
  pt: {
    s1: (kw) => `Este guia de ${kw} oferece dicas práticas e exemplos concretos para se destacar perante os recrutadores.`,
    s2: (kw) => `Redija sua ${kw} com resultados mensuráveis e competências-chave para maximizar suas oportunidades.`,
  },
  ar: {
    s1: (kw) => `يقدم هذا الدليل لكتابة ${kw} نصائح عملية وأمثلة واقعية لمساعدتك على التميز أمام مسؤولي التوظيف.`,
    s2: (kw) => `اكتب ${kw} بإنجازات قابلة للقياس ومهارات أساسية لتعزيز فرصك.`,
  },
  ja: {
    s1: (kw) => `この${kw}ガイドでは、採用担当者の目に留まるための実践的なアドバイスと具体例を紹介します。`,
    s2: (kw) => `${kw}には定量的な成果と重要なスキルを盛り込み、選考通過率を高めましょう。`,
  },
  ko: {
    s1: (kw) => `이 ${kw} 가이드는 채용 담당자에게 눈에 띄기 위한 실용적인 팁과 구체적인 예시를 제공합니다.`,
    s2: (kw) => `${kw}에 정량적 성과와 핵심 역량을 포함하여 합격 가능성을 높이세요.`,
  },
  tr: {
    s1: (kw) => `Bu ${kw} rehberi, işe alım uzmanlarının dikkatini çekmek için pratik ipuçları ve somut örnekler sunar.`,
    s2: (kw) => `${kw} belgenizi ölçülebilir başarılar ve temel yetkinliklerle hazırlayarak şansınızı artırın.`,
  },
  vi: {
    s1: (kw) => `Hướng dẫn ${kw} này cung cấp các mẹo thực tế và ví dụ cụ thể giúp bạn nổi bật trước nhà tuyển dụng.`,
    s2: (kw) => `Viết ${kw} với các thành tích có thể đo lường và kỹ năng chủ chốt để tối đa hóa cơ hội.`,
  },
  th: {
    s1: (kw) => `คู่มือ${kw}นี้มีเคล็ดลับที่ใช้ได้จริงและตัวอย่างที่เป็นรูปธรรมเพื่อช่วยให้คุณโดดเด่นในสายตาผู้สรรหา`,
    s2: (kw) => `เขียน${kw}พร้อมผลงานที่วัดผลได้และทักษะสำคัญเพื่อเพิ่มโอกาสในการได้งาน`,
  },
  id: {
    s1: (kw) => `Panduan ${kw} ini menyediakan tips praktis dan contoh konkret untuk membantu Anda tampil menonjol di mata perekrut.`,
    s2: (kw) => `Tulis ${kw} Anda dengan pencapaian terukur dan kompetensi utama untuk memaksimalkan peluang.`,
  },
  nl: {
    s1: (kw) => `Deze gids voor ${kw} biedt praktische tips en concrete voorbeelden om op te vallen bij recruiters.`,
    s2: (kw) => `Schrijf uw ${kw} met meetbare resultaten en kerncompetenties voor optimale kansen.`,
  },
  pl: {
    s1: (kw) => `Ten przewodnik po ${kw} oferuje praktyczne wskazówki i konkretne przykłady, aby wyróżnić się w oczach rekruterów.`,
    s2: (kw) => `Napisz swój ${kw} z mierzalnymi osiągnięciami i kluczowymi kompetencjami, aby zmaksymalizować szanse.`,
  },
};

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════

const localesToProcess = localeArg ? [localeArg] : LOCALES;
let totalFixed = 0;
let totalSkipped = 0;
let totalAlready = 0;

for (const locale of localesToProcess) {
  const localeDir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) { console.log(`${locale}: directory not found`); continue; }

  const template = TEMPLATES[locale];
  if (!template) { console.log(`${locale}: no template configured`); continue; }

  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.mdx'));
  let fixed = 0, skipped = 0, already = 0;

  for (const f of files) {
    const filePath = path.join(localeDir, f);
    let raw;
    try { raw = fs.readFileSync(filePath, 'utf-8'); } catch { skipped++; continue; }

    let parsed;
    try { parsed = matter(raw); } catch { skipped++; continue; }

    const { data: fm, content } = parsed;
    const keyword = (fm.tags && fm.tags[0]) || '';
    if (!keyword) { skipped++; continue; }

    const kwLower = keyword.toLowerCase();

    // Idempotency: check if the exact keyword phrase already appears in body
    if (content.toLowerCase().includes(kwLower)) {
      already++;
      continue;
    }

    // Find injection points
    const lines = content.split('\n');

    // Injection point 1: after the first paragraph (after first ## heading + content block)
    let injPoint1 = -1;
    let foundHeading = false;
    let inParagraph = false;
    for (let i = 0; i < lines.length; i++) {
      if (/^##\s/.test(lines[i])) {
        foundHeading = true;
        continue;
      }
      if (foundHeading && lines[i].trim().length > 0 && !lines[i].startsWith('#')) {
        inParagraph = true;
      }
      if (inParagraph && lines[i].trim() === '') {
        injPoint1 = i;
        break;
      }
    }

    // Injection point 2: before the last ## heading
    let injPoint2 = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/^##\s/.test(lines[i])) {
        injPoint2 = i;
        break;
      }
    }

    if (injPoint1 === -1) { skipped++; continue; }

    // Inject sentence 1
    const sentence1 = template.s1(keyword);
    lines.splice(injPoint1, 0, '', sentence1);

    // Adjust injPoint2 after splice
    if (injPoint2 !== -1) {
      injPoint2 += 2; // account for the 2 lines we inserted
      const sentence2 = template.s2(keyword);
      lines.splice(injPoint2, 0, '', sentence2, '');
    }

    const newContent = lines.join('\n');

    if (!DRY_RUN) {
      const rebuilt = matter.stringify(newContent, fm);
      fs.writeFileSync(filePath, rebuilt);
    }

    fixed++;

    if (DRY_RUN && fixed <= 3) {
      console.log(`  [${locale}] ${f}: injected "${keyword}"`);
    }
  }

  console.log(`${locale}: fixed=${fixed}, already=${already}, skipped=${skipped} (${files.length} files)`);
  totalFixed += fixed;
  totalSkipped += skipped;
  totalAlready += already;
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Total: fixed=${totalFixed}, already=${totalAlready}, skipped=${totalSkipped}`);
