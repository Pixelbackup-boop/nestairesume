#!/usr/bin/env node
/**
 * Fix kw-body-density for resume-examples across all locales.
 * Injects 2 sentences containing the exact tags[0] phrase into the body.
 * (optimize-locale-seo.mjs injected "curriculum vitae" but audit checks tags[0])
 *
 * Usage:
 *   node scripts/fix-resume-density.mjs [--dry-run] [--locale=fr]
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const localeArg = process.argv.find(a => a.startsWith('--locale='))?.split('=')[1];

const CONTENT_DIR = path.join(rootDir, 'frontend', 'content', 'resume-examples');
const LOCALES = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

const TEMPLATES = {
  fr: {
    s1: (kw) => `Ce guide de ${kw} propose des exemples concrets et des conseils de rédaction pour décrocher des entretiens.`,
    s2: (kw) => `Optimisez votre ${kw} avec des mots-clés ciblés et des réalisations chiffrées pour passer les filtres ATS.`,
  },
  es: {
    s1: (kw) => `Esta guía de ${kw} ofrece ejemplos concretos y consejos de redacción para conseguir entrevistas.`,
    s2: (kw) => `Optimiza tu ${kw} con palabras clave específicas y logros cuantificables para superar los filtros ATS.`,
  },
  de: {
    s1: (kw) => `Dieser ${kw} Leitfaden bietet konkrete Beispiele und Schreibtipps für erfolgreiche Bewerbungen.`,
    s2: (kw) => `Optimieren Sie Ihren ${kw} mit gezielten Schlüsselwörtern und messbaren Erfolgen für ATS-Systeme.`,
  },
  it: {
    s1: (kw) => `Questa guida al ${kw} propone esempi concreti e consigli di redazione per ottenere colloqui.`,
    s2: (kw) => `Ottimizza il tuo ${kw} con parole chiave mirate e risultati quantificabili per superare i filtri ATS.`,
  },
  pt: {
    s1: (kw) => `Este guia de ${kw} oferece exemplos concretos e dicas de redação para conseguir entrevistas.`,
    s2: (kw) => `Otimize seu ${kw} com palavras-chave direcionadas e conquistas mensuráveis para passar nos filtros ATS.`,
  },
  ar: {
    s1: (kw) => `يقدم هذا الدليل لكتابة ${kw} أمثلة واقعية ونصائح تحريرية لمساعدتك في الحصول على مقابلات عمل.`,
    s2: (kw) => `حسّن ${kw} الخاص بك بكلمات مفتاحية مستهدفة وإنجازات قابلة للقياس لتجاوز أنظمة ATS.`,
  },
  ja: {
    s1: (kw) => `この${kw}ガイドでは、面接獲得に役立つ具体例と作成のコツを紹介します。`,
    s2: (kw) => `${kw}を的確なキーワードと定量的な実績で最適化し、ATS審査を突破しましょう。`,
  },
  ko: {
    s1: (kw) => `이 ${kw} 가이드는 면접 기회를 얻기 위한 구체적인 예시와 작성 팁을 제공합니다.`,
    s2: (kw) => `${kw}을 핵심 키워드와 정량적 성과로 최적화하여 ATS 심사를 통과하세요.`,
  },
  tr: {
    s1: (kw) => `Bu ${kw} rehberi, mülakat fırsatı yakalamak için somut örnekler ve yazım ipuçları sunar.`,
    s2: (kw) => `${kw} belgenizi hedefli anahtar kelimeler ve ölçülebilir başarılarla ATS uyumlu hale getirin.`,
  },
  vi: {
    s1: (kw) => `Hướng dẫn ${kw} này cung cấp ví dụ cụ thể và mẹo viết để giúp bạn đạt được cơ hội phỏng vấn.`,
    s2: (kw) => `Tối ưu hóa ${kw} với từ khóa mục tiêu và thành tích có thể đo lường để vượt qua bộ lọc ATS.`,
  },
  th: {
    s1: (kw) => `คู่มือ${kw}นี้มีตัวอย่างจริงและเคล็ดลับการเขียนเพื่อช่วยให้คุณได้รับโอกาสสัมภาษณ์`,
    s2: (kw) => `ปรับแต่ง${kw}ด้วยคีย์เวิร์ดเป้าหมายและผลงานที่วัดผลได้เพื่อผ่านระบบ ATS`,
  },
  id: {
    s1: (kw) => `Panduan ${kw} ini menyediakan contoh nyata dan tips penulisan untuk membantu Anda mendapatkan wawancara.`,
    s2: (kw) => `Optimalkan ${kw} Anda dengan kata kunci yang tepat dan pencapaian terukur agar lolos sistem ATS.`,
  },
  nl: {
    s1: (kw) => `Deze ${kw} gids biedt concrete voorbeelden en schrijftips om sollicitatiegesprekken binnen te halen.`,
    s2: (kw) => `Optimaliseer uw ${kw} met gerichte trefwoorden en meetbare resultaten voor ATS-systemen.`,
  },
  pl: {
    s1: (kw) => `Ten przewodnik po ${kw} zawiera konkretne przykłady i wskazówki redakcyjne, które pomogą Ci zdobyć rozmowy kwalifikacyjne.`,
    s2: (kw) => `Zoptymalizuj swoje ${kw} za pomocą celowanych słów kluczowych i mierzalnych osiągnięć, aby przejść filtry ATS.`,
  },
};

const localesToProcess = localeArg ? [localeArg] : LOCALES;
let totalFixed = 0, totalSkipped = 0, totalAlready = 0;

for (const locale of localesToProcess) {
  const localeDir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;

  const template = TEMPLATES[locale];
  if (!template) { console.log(`${locale}: no template`); continue; }

  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.mdx'));
  let fixed = 0, skipped = 0, already = 0;

  for (const f of files) {
    const filePath = path.join(localeDir, f);
    let parsed;
    try { parsed = matter(fs.readFileSync(filePath, 'utf-8')); } catch { skipped++; continue; }

    const { data: fm, content } = parsed;
    const keyword = (fm.tags && fm.tags[0]) || '';
    if (!keyword) { skipped++; continue; }

    if (content.toLowerCase().includes(keyword.toLowerCase())) { already++; continue; }

    const lines = content.split('\n');
    let injPoint1 = -1;
    let foundH = false, inP = false;
    for (let i = 0; i < lines.length; i++) {
      if (/^##\s/.test(lines[i])) { foundH = true; continue; }
      if (foundH && lines[i].trim().length > 0 && !lines[i].startsWith('#')) inP = true;
      if (inP && lines[i].trim() === '') { injPoint1 = i; break; }
    }

    let injPoint2 = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/^##\s/.test(lines[i])) { injPoint2 = i; break; }
    }

    if (injPoint1 === -1) { skipped++; continue; }

    lines.splice(injPoint1, 0, '', template.s1(keyword));
    if (injPoint2 !== -1) {
      injPoint2 += 2;
      lines.splice(injPoint2, 0, '', template.s2(keyword), '');
    }

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, matter.stringify(lines.join('\n'), fm));
    }
    fixed++;
  }

  console.log(`${locale}: fixed=${fixed}, already=${already}, skipped=${skipped} (${files.length} files)`);
  totalFixed += fixed;
  totalSkipped += skipped;
  totalAlready += already;
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Total: fixed=${totalFixed}, already=${totalAlready}, skipped=${totalSkipped}`);
