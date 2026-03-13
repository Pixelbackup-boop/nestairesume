#!/usr/bin/env node
/**
 * Comprehensive SEO Fix Script v3
 * Fixes top 4 violations found by seo-full-audit-v3.mjs in a single pass:
 *   1. title-length   — shorten titles >65 chars to ≤60
 *   2. desc-length    — trim descriptions >165 chars to ≤160
 *   3. kw-in-desc     — inject missing tags[0] words into description
 *   4. kw-body-density — inject keyword sentence if density <0.3%
 *
 * Usage:
 *   node scripts/fix-seo-violations-v3.mjs [options]
 *     --dry-run              Preview changes without writing
 *     --locale=fr            Fix one locale only
 *     --type=resume-examples Fix one content type only
 *     --fix=title,desc       Only run specific fixes (comma-separated: title,desc,kw-desc,density)
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

// ═══════════════════════════════════════════════
// CLI ARGS
// ═══════════════════════════════════════════════

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v || true]; })
);

const dryRun = !!args['dry-run'];
const filterLocale = args.locale || null;
const filterType = args.type || null;
const fixFilter = args.fix ? args.fix.split(',') : ['title', 'desc', 'kw-desc', 'density'];

// ═══════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════

const CONTENT_BASE = path.join(rootDir, 'frontend', 'content');
const CONTENT_TYPES = ['resume-examples', 'cover-letter-examples', 'blog', 'career-tips'];
const LOCALES = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

// ═══════════════════════════════════════════════
// TITLE SHORTENING RULES BY LOCALE
// Each rule is tried in order until title fits ≤60 chars.
// Rules are [from, to] regex/string replacements.
// ═══════════════════════════════════════════════

const TITLE_RULES = {
  en: {
    resume: [
      [': Examples & Writing Guide 2026', ': Examples & Guide 2026'],
      ['Resume: Examples & Writing Guide 2026', 'Resume: Example & Guide 2026'],
      ['Resume Example & Writing Guide 2026', 'Resume: Example & Tips 2026'],
      [' & Writing Guide 2026', ' & Tips 2026'],
      [': Examples & Guide 2026', ' Examples & Tips 2026'],
    ],
    'cover-letter': [
      ['Cover Letter Example & Writing Guide 2026', 'Cover Letter: Example & Guide 2026'],
      ['Cover Letter Example & Writing Guide 2026', 'Cover Letter Example & Tips 2026'],
      [' Example & Writing Guide 2026', ': Example & Guide 2026'],
      [' & Writing Guide', ' & Tips'],
    ],
    blog: [],
    'career-tips': [],
  },
  fr: {
    resume: [
      [' : Exemples, Modeles et Guide de Redaction 2026', ' : Exemples et Guide 2026'],
      [' : Exemples et Guide de Redaction 2026', ' : Exemples et Guide 2026'],
      ['CV de ', 'CV '],
      [' : Exemples et Guide 2026', ' : Guide et Exemples 2026'],
    ],
    'cover-letter': [
      [' : Exemple et Guide de Redaction 2026', ' : Exemple et Guide 2026'],
      [' : Exemple et Guide 2026', ' : Exemple 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  es: {
    resume: [
      [': Ejemplos y Guía de Redacción 2026', ': Ejemplos y Guía 2026'],
      ['Currículum de ', 'CV de '],
      ['Currículum ', 'CV '],
      [': Ejemplos y Guía 2026', ': Ejemplos 2026'],
      [' y Guía de Redacción', ' y Guía'],
      [': Ejemplos y Guía (2026)', ': Ejemplos y Guía 2026'],
      [': Ejemplos y Guía', ': Ejemplos'],
    ],
    'cover-letter': [
      [': Ejemplo y Guia de Redaccion 2026', ': Ejemplo y Guía 2026'],
      [': Ejemplo y Guía de Redacción 2026', ': Ejemplo y Guía 2026'],
      ['Carta de Presentacion de ', 'Carta de '],
      ['Carta de Presentación de ', 'Carta de '],
      ['Carta de Presentación ', 'Carta '],
      [': Ejemplo y Guía 2026', ': Ejemplo 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  it: {
    resume: [
      [': Esempi, Modelli e Guida 2026', ': Esempi e Guida 2026'],
      ['Curriculum Vitae da ', 'CV '],
      ['Curriculum Vitae di ', 'CV '],
      ['Curriculum Vitae ', 'CV '],
      [': Esempi e Guida alla Scrittura 2026', ': Esempi e Guida 2026'],
      [': Esempi e Guida 2026', ': Esempi 2026'],
      [', Modelli e Guida', ' e Guida'],
    ],
    'cover-letter': [
      [': Esempio e Guida alla Scrittura 2026', ': Esempio e Guida 2026'],
      ['Lettera di Presentazione ', 'Lettera '],
      [': Esempio e Guida 2026', ': Esempio 2026'],
      [': Esempio 2026', ' 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  de: {
    resume: [
      [': Beispiele, Vorlagen und Schreibtipps 2026', ': Beispiele und Tipps 2026'],
      [': Beispiele und Schreibtipps 2026', ': Beispiele und Tipps 2026'],
      [', Vorlagen und Schreibtipps', ' und Tipps'],
      ['Lebenslauf als ', 'CV '],
      ['Lebenslauf ', 'CV '],
      [': Beispiele und Tipps 2026', ': Beispiele 2026'],
    ],
    'cover-letter': [
      [': Beispiel und Schreibtipps 2026', ': Beispiel und Tipps 2026'],
      ['Bewerbungsschreiben ', 'Bewerbung '],
      ['Anschreiben ', ''],
      [': Beispiel und Tipps 2026', ': Beispiel 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  pt: {
    resume: [
      [': Modelos, Exemplos e Dicas 2026', ': Exemplos e Dicas 2026'],
      ['Currículo de ', 'CV de '],
      ['Currículo ', 'CV '],
      [': Exemplos e Dicas de Redação 2026', ': Exemplos e Dicas 2026'],
      [': Exemplos e Dicas 2026', ': Exemplos 2026'],
      [', Exemplos e Dicas', ' e Dicas'],
    ],
    'cover-letter': [
      [': Exemplo e Guia de Redação 2026', ': Exemplo e Guia 2026'],
      ['Carta de Apresentação ', 'Carta '],
      [': Exemplo e Guia 2026', ': Exemplo 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  th: {
    resume: [
      [': ตัวอย่าง เทมเพลต และเคล็ดลับการเขียน 2026', ': ตัวอย่างและเคล็ดลับ 2026'],
      ['เรซูเม่', 'CV'],
    ],
    'cover-letter': [
      [': ตัวอย่างและแนวทางการเขียน 2026', ': ตัวอย่างและเคล็ดลับ 2026'],
      ['จดหมายสมัครงาน', 'จม.สมัครงาน'],
    ],
    blog: [],
    'career-tips': [],
  },
  ko: {
    resume: [
      ['이력서 샘플 | 작성 가이드 2026', '이력서 샘플 및 가이드 2026'],
      ['이력서 샘플 | 작성 가이드', '이력서 샘플 | 가이드'],
    ],
    'cover-letter': [
      ['자기소개서 샘플 | 작성 가이드 2026', '자기소개서 샘플 및 가이드 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  id: {
    resume: [
      [': Contoh, Template, dan Tips Menulis 2026', ': Contoh dan Tips 2026'],
      [': Contoh, Template & Panduan Lengkap 2026', ': Contoh & Panduan 2026'],
      [', Template & Panduan Lengkap', ' & Panduan'],
      ['Curriculum Vitae ', 'CV '],
      [': Contoh & Panduan 2026', ': Contoh 2026'],
      [': Contoh dan Tips 2026', ': Contoh 2026'],
    ],
    'cover-letter': [
      [': Contoh dan Panduan Penulisan 2026', ': Contoh dan Tips 2026'],
      [': Template & Panduan 2026', ' & Panduan 2026'],
      ['Contoh Surat Lamaran Kerja ', 'Surat Lamaran '],
      ['Surat Lamaran Kerja ', 'Surat Lamaran '],
      [': Contoh dan Tips 2026', ': Contoh 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  nl: {
    resume: [
      [': Voorbeelden, Sjablonen en Schrijftips 2026', ': Voorbeelden en Tips 2026'],
      [': Voorbeelden, Sjablonen en Schrijfgids 2026', ': Voorbeelden en Tips 2026'],
      [', Sjablonen en Schrijfgids', ' en Tips'],
      [', Sjablonen en Schrijftips', ' en Tips'],
      ['CV van ', 'CV '],
      [': Voorbeelden en Tips 2026', ': Voorbeelden 2026'],
    ],
    'cover-letter': [
      [': Voorbeeld en Schrijfgids 2026', ': Voorbeeld en Tips 2026'],
      ['Sollicitatiebrief ', 'Brief '],
      [': Voorbeeld en Tips 2026', ': Voorbeeld 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  pl: {
    resume: [
      [': Przykłady, Szablony i Wskazówki 2026', ': Przykłady i Wskazówki 2026'],
      [', Szablony i Wskazówki', ' i Wskazówki'],
      ['Życiorys ', 'CV '],
      [': Przykłady i Wskazówki 2026', ': Przykłady 2026'],
    ],
    'cover-letter': [
      [': Przykład i Poradnik Pisania 2026', ': Przykład i Porady 2026'],
      [': Przykład i Poradnik 2026', ': Przykład 2026'],
      ['List Motywacyjny ', 'List '],
      [': Przykład i Porady 2026', ': Przykład 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  tr: {
    resume: [
      [': Örnekler, Şablonlar ve Yazma İpuçları 2026', ': Örnekler ve İpuçları 2026'],
      ['Özgeçmiş ', 'CV '],
    ],
    'cover-letter': [
      [': Örnek ve Yazma Rehberi 2026', ': Örnek ve Rehber 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  vi: {
    resume: [
      [': Mẫu, Ví dụ và Hướng dẫn Viết 2026', ': Mẫu và Hướng dẫn 2026'],
      [', Ví dụ và Hướng dẫn Viết', ' và Hướng dẫn'],
      ['Sơ yếu lý lịch ', 'CV '],
      [': Mẫu và Hướng dẫn 2026', ': Mẫu 2026'],
    ],
    'cover-letter': [
      [': Ví dụ và Hướng dẫn Viết 2026', ': Ví dụ và Hướng dẫn 2026'],
      ['Thư xin việc ', 'Thư '],
      [': Ví dụ và Hướng dẫn 2026', ': Ví dụ 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  ar: {
    resume: [
      [': أمثلة ونماذج ونصائح للكتابة 2026', ': أمثلة ونصائح 2026'],
    ],
    'cover-letter': [
      [': مثال ودليل الكتابة 2026', ': مثال ونصائح 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
  ja: {
    resume: [
      ['：サンプル・テンプレート・書き方ガイド 2026', '：サンプルと書き方 2026'],
    ],
    'cover-letter': [
      ['：例文と書き方ガイド 2026', '：例文と書き方 2026'],
    ],
    blog: [],
    'career-tips': [],
  },
};

// ═══════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════

// Known abbreviation equivalences — if abbreviated form is in text, original words count as present
const ABBREV_MAP = {
  'cv': ['curriculum', 'vitae', 'currículum', 'currículo', 'lebenslauf'],
  'lm': ['lettre', 'motivation'],
  'list': ['motywacyjny'],
  'lettera': ['presentazione'],
  'surat': ['lamaran', 'kerja'],
  'carta': ['presentacion', 'presentación', 'apresentação'],
  'bewerbung': ['bewerbungsschreiben'],
  'brief': ['sollicitatiebrief'],
};

function kwWordsPresent(text, kwWords) {
  const lower = text.toLowerCase();
  // Build set of "present" words: direct matches + words covered by abbreviations
  const coveredWords = new Set();
  for (const [abbr, originals] of Object.entries(ABBREV_MAP)) {
    if (lower.includes(abbr)) {
      for (const w of originals) coveredWords.add(w);
    }
  }
  return kwWords.every(w => lower.includes(w) || coveredWords.has(w));
}

function getContentTypeKey(contentType) {
  if (contentType === 'resume-examples') return 'resume';
  if (contentType === 'cover-letter-examples') return 'cover-letter';
  return contentType;
}

// ═══════════════════════════════════════════════
// FIX FUNCTIONS
// ═══════════════════════════════════════════════

function fixTitle(title, locale, contentType, kwWords) {
  if (title.length <= 65) return null; // tolerance: only fix >65

  const typeKey = getContentTypeKey(contentType);
  const rules = TITLE_RULES[locale]?.[typeKey] || [];

  // Try each rule individually first
  for (const [from, to] of rules) {
    if (title.includes(from)) {
      const newTitle = title.replace(from, to);
      if (newTitle.length <= 60 && newTitle.length >= 30) {
        if (kwWords.length === 0 || kwWordsPresent(newTitle, kwWords)) {
          return newTitle;
        }
      }
    }
  }

  // Try applying rules cumulatively (first rule + second rule, etc.)
  let cumulative = title;
  for (const [from, to] of rules) {
    if (cumulative.includes(from)) {
      cumulative = cumulative.replace(from, to);
      if (cumulative.length <= 60 && cumulative.length >= 30) {
        if (kwWords.length === 0 || kwWordsPresent(cumulative, kwWords)) {
          return cumulative;
        }
      }
    }
  }

  // Generic fallback: try removing common filler patterns
  const genericRemovals = [
    [/, Templates/i, ''],
    [/, Modeles/i, ''],
    [/, Vorlagen/i, ''],
    [/, Modelli/i, ''],
    [/, Szablony/i, ''],
    [/, Sjablonen/i, ''],
    [/, Template/i, ''],
    [/ and Writing Guide/i, ' and Tips'],
    [/ et Guide de Redaction/i, ' et Guide'],
    [/ und Schreibtipps/i, ' und Tipps'],
    [/ e Guida alla Scrittura/i, ' e Guida'],
    [/ y Gu[ií]a de Redacci[oó]n/i, ' y Guía'],
    [/ y Guia de Redaccion/i, ' y Guía'],
    [/ : Exemple et Guide de Redaction/i, ' : Exemple et Guide'],
    [/Lettre de Motivation /i, 'LM '],
    [/Lettera di Presentazione /i, 'Lettera '],
    [/Carta de Presentacion de /i, 'Carta '],
    [/Carta de Presentación de /i, 'Carta '],
    [/Carta de Apresentação /i, 'Carta '],
    [/Bewerbungsschreiben /i, 'Bewerbung '],
    [/Curriculum Vitae da /i, 'CV '],
    [/Curriculum Vitae di /i, 'CV '],
    [/Curriculum Vitae /i, 'CV '],
    [/Curr[ií]culum de /i, 'CV de '],
    [/Curr[ií]culo de /i, 'CV de '],
    [/Lebenslauf als /i, 'CV '],
    [/Lebenslauf /i, 'CV '],
    [/Sơ yếu lý lịch /i, 'CV '],
    [/Contoh Surat Lamaran Kerja /i, 'Surat Lamaran '],
    [/Surat Lamaran Kerja /i, 'Surat Lamaran '],
    [/Sollicitatiebrief /i, 'Brief '],
    [/List Motywacyjny /i, 'List '],
    [/, Template & Panduan Lengkap/i, ' & Panduan'],
    [/, Sjablonen en Schrijfgids/i, ' en Tips'],
  ];

  let current = title;
  for (const [pattern, replacement] of genericRemovals) {
    if (pattern.test(current)) {
      current = current.replace(pattern, replacement);
      if (current.length <= 60 && current.length >= 30) {
        if (kwWords.length === 0 || kwWordsPresent(current, kwWords)) {
          return current;
        }
      }
    }
  }

  // Last resort: strip suffix down to just ": [short word] 2026" or remove entirely
  const lastResortPatterns = [
    // FR
    [/ : Exemples et Guide 2026$/, ' : Exemples 2026'],
    [/ : Exemple et Guide 2026$/, ' : Exemple 2026'],
    [/ : Exemple 2026$/, ' 2026'],
    // ES
    [/: Ejemplos y Gu[ií]a 2026$/, ': Ejemplos 2026'],
    [/: Ejemplo y Gu[ií]a 2026$/, ': Ejemplo 2026'],
    [/: Ejemplos 2026$/, ' 2026'],
    // IT
    [/: Esempi e Guida 2026$/, ': Esempi 2026'],
    [/: Esempio e Guida 2026$/, ': Esempio 2026'],
    [/: Esempi 2026$/, ' 2026'],
    // DE
    [/: Beispiele und Tipps 2026$/, ': Beispiele 2026'],
    [/: Beispiel und Tipps 2026$/, ': Beispiel 2026'],
    [/: Beispiel und Schreibtipps 2026$/, ': Beispiel 2026'],
    [/: Beispiele 2026$/, ' 2026'],
    // PT
    [/: Exemplos e Dicas 2026$/, ': Exemplos 2026'],
    [/: Exemplo e Guia 2026$/, ': Exemplo 2026'],
    [/: Exemplos 2026$/, ' 2026'],
    // ID
    [/: Contoh & Panduan 2026$/, ': Contoh 2026'],
    [/: Contoh dan Tips 2026$/, ': Contoh 2026'],
    [/& Panduan 2026$/, '2026'],
    // NL
    [/: Voorbeelden en Tips 2026$/, ': Voorbeelden 2026'],
    [/: Voorbeeld en Tips 2026$/, ': Voorbeeld 2026'],
    [/: Voorbeelden 2026$/, ' 2026'],
    // PL
    [/: Przyk[łl]ady i Wskazówki 2026$/, ': Przykłady 2026'],
    [/: Przyk[łl]ad i Porady 2026$/, ': Przykład 2026'],
    [/: Przyk[łl]ad 2026$/, ' 2026'],
    // TR
    [/: Örnekler ve İpuçları 2026$/, ': Örnekler 2026'],
    [/: Örnek ve Rehber 2026$/, ': Örnek 2026'],
    // VI
    [/: Mẫu và Hướng dẫn 2026$/, ': Mẫu 2026'],
    [/: Ví dụ và Hướng dẫn 2026$/, ': Ví dụ 2026'],
    // AR
    [/: أمثلة ونصائح 2026$/, ' 2026'],
    [/: مثال ونصائح 2026$/, ' 2026'],
    // TH
    [/: ตัวอย่างและเคล็ดลับ 2026$/, ' 2026'],
    [/: ตัวอย่างและเคล็ดลับการเขียน 2026$/, ' 2026'],
    // KO
    [/ 이력서 샘플 및 가이드 2026$/, ' 이력서 2026'],
    [/자기소개서 샘플 및 가이드 2026$/, '자기소개서 2026'],
  ];

  for (const [pattern, replacement] of lastResortPatterns) {
    if (pattern.test(current)) {
      const candidate = current.replace(pattern, replacement);
      if (candidate.length <= 60 && candidate.length >= 20) {
        if (kwWords.length === 0 || kwWordsPresent(candidate, kwWords)) {
          return candidate;
        }
      }
    }
  }

  return null;
}

function fixDescription(desc, kwWords) {
  if (desc.length <= 165) return null; // within tolerance

  let newDesc = desc;

  // Strategy 1: Truncate at last sentence boundary before 160 chars
  if (newDesc.length > 160) {
    const truncated = newDesc.substring(0, 160);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastComma = truncated.lastIndexOf(',');
    const cutPoint = Math.max(lastPeriod, lastComma);

    if (cutPoint > 100) {
      newDesc = newDesc.substring(0, cutPoint + 1).trim();
      if (kwWords.length === 0 || kwWordsPresent(newDesc, kwWords)) {
        return newDesc;
      }
    }
  }

  // Strategy 2: Hard truncate at 157 chars + "..."
  if (desc.length > 160) {
    const truncated = desc.substring(0, 157).trim();
    // Find last word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 120) {
      newDesc = truncated.substring(0, lastSpace) + '...';
      // Don't verify kw here — hard truncation may lose words, but too-long is worse
      return newDesc;
    }
  }

  return null;
}

function fixKwInDesc(desc, kwWords) {
  if (kwWords.length === 0) return null;

  const descLower = desc.toLowerCase();
  const missing = kwWords.filter(w => !descLower.includes(w));
  if (missing.length === 0) return null;

  // Try to inject missing words naturally at the start
  // e.g., "Learn how to write a great resume..." → "Learn how to write a great [keyword] resume..."
  // This is tricky to do generically. Instead, prepend the keyword phrase.
  const keyword = kwWords.join(' ');

  // If the full keyword is mostly present (just 1 word missing), try inserting that word
  if (missing.length === 1 && missing[0].length <= 10) {
    // Try inserting the missing word before the first keyword word that IS present
    const presentWord = kwWords.find(w => descLower.includes(w));
    if (presentWord) {
      const idx = descLower.indexOf(presentWord);
      const newDesc = desc.substring(0, idx) + missing[0] + ' ' + desc.substring(idx);
      if (newDesc.length <= 160 && kwWordsPresent(newDesc, kwWords)) {
        return newDesc;
      }
    }
  }

  return null; // Can't safely auto-fix without risking readability
}

function fixKwBodyDensity(content, kwLower) {
  if (!kwLower) return null;

  // Calculate current density
  const bodyText = content.replace(/```[\s\S]*?```/g, '').replace(/[#*\[\]()_`>|\\-]/g, ' ');
  const totalWords = bodyText.trim().split(/\s+/).filter(Boolean).length;
  const kwRegex = new RegExp(kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const kwMatches = (bodyText.toLowerCase().match(kwRegex) || []).length;
  const density = totalWords > 0 ? (kwMatches / totalWords) * 100 : 0;

  if (density >= 0.3) return null; // Already OK

  // Inject a natural keyword mention after the first paragraph (after first ## heading's content)
  // Find the end of the first paragraph after the first heading
  const lines = content.split('\n');
  let injectionPoint = -1;
  let foundHeading = false;
  let blankAfterParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) {
      foundHeading = true;
      continue;
    }
    if (foundHeading && lines[i].trim().length > 0 && !lines[i].startsWith('#')) {
      // Found first content line after heading, now find the next blank line
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim() === '') {
          injectionPoint = j;
          blankAfterParagraph = true;
          break;
        }
      }
      break;
    }
  }

  if (injectionPoint === -1 || !blankAfterParagraph) return null;

  // Check idempotency: don't inject if the keyword already appears near the injection point
  const nearbyText = lines.slice(Math.max(0, injectionPoint - 3), injectionPoint + 3).join(' ').toLowerCase();
  if (nearbyText.includes(kwLower)) return null;

  // Inject a contextual sentence with the keyword
  const injectedLine = `This ${kwLower} guide provides actionable tips and expert recommendations to help you stand out.`;
  lines.splice(injectionPoint, 0, '', injectedLine);

  return lines.join('\n');
}

// ═══════════════════════════════════════════════
// FILE DISCOVERY
// ═══════════════════════════════════════════════

function discoverFiles() {
  const files = [];
  const types = filterType ? [filterType] : CONTENT_TYPES;

  for (const contentType of types) {
    const baseDir = path.join(CONTENT_BASE, contentType);
    if (!fs.existsSync(baseDir)) continue;

    // English (root-level)
    if (!filterLocale || filterLocale === 'en') {
      for (const f of fs.readdirSync(baseDir)) {
        if (f.endsWith('.mdx')) {
          files.push({ filePath: path.join(baseDir, f), contentType, locale: 'en', slug: f.replace('.mdx', '') });
        }
      }
    }

    // Locale subdirectories
    for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || !LOCALES.includes(entry.name)) continue;
      if (filterLocale && filterLocale !== entry.name) continue;

      const localeDir = path.join(baseDir, entry.name);
      for (const f of fs.readdirSync(localeDir)) {
        if (f.endsWith('.mdx')) {
          files.push({ filePath: path.join(localeDir, f), contentType, locale: entry.name, slug: f.replace('.mdx', '') });
        }
      }
    }
  }

  return files;
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════

const startTime = Date.now();
const files = discoverFiles();

const stats = {
  total: files.length,
  titleFixed: 0, titleSkipped: 0,
  descFixed: 0, descSkipped: 0,
  kwDescFixed: 0, kwDescSkipped: 0,
  densityFixed: 0, densitySkipped: 0,
  filesModified: 0,
};

console.log(`${dryRun ? '[DRY RUN] ' : ''}Processing ${files.length.toLocaleString()} files...`);
console.log(`Fixes enabled: ${fixFilter.join(', ')}\n`);

for (let i = 0; i < files.length; i++) {
  const { filePath, contentType, locale, slug } = files[i];

  if ((i + 1) % 2000 === 0) {
    process.stdout.write(`  ${i + 1} / ${files.length} files...\r`);
  }

  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch { continue; }

  let parsed;
  try {
    parsed = matter(raw);
  } catch { continue; }

  const { data: fm, content } = parsed;
  let modified = false;
  let newContent = content;

  const tags = fm.tags || [];
  const keyword = tags[0] || '';
  const kwLower = keyword.toLowerCase();
  const kwWords = kwLower.split(/\s+/).filter(Boolean);

  // Fix 1: Title length
  if (fixFilter.includes('title') && fm.title && fm.title.length > 65) {
    const newTitle = fixTitle(fm.title, locale, contentType, kwWords);
    if (newTitle) {
      if (dryRun) {
        console.log(`  [title] ${locale}/${slug}: [${fm.title.length}→${newTitle.length}] "${newTitle}"`);
      }
      fm.title = newTitle;
      modified = true;
      stats.titleFixed++;
    } else {
      stats.titleSkipped++;
    }
  }

  // Fix 2: Description length
  if (fixFilter.includes('desc') && fm.description && fm.description.length > 165) {
    const newDesc = fixDescription(fm.description, kwWords);
    if (newDesc) {
      if (dryRun) {
        console.log(`  [desc] ${locale}/${slug}: [${fm.description.length}→${newDesc.length}]`);
      }
      fm.description = newDesc;
      modified = true;
      stats.descFixed++;
    } else {
      stats.descSkipped++;
    }
  }

  // Fix 3: Keyword in description
  if (fixFilter.includes('kw-desc') && fm.description && kwWords.length > 0) {
    const newDesc = fixKwInDesc(fm.description, kwWords);
    if (newDesc) {
      if (dryRun) {
        console.log(`  [kw-desc] ${locale}/${slug}: injected missing keyword words`);
      }
      fm.description = newDesc;
      modified = true;
      stats.kwDescFixed++;
    } else {
      const descLower = (fm.description || '').toLowerCase();
      const missing = kwWords.filter(w => !descLower.includes(w));
      if (missing.length > 0) stats.kwDescSkipped++;
    }
  }

  // Fix 4: Keyword body density (EN only — locale body injection needs locale-specific sentences)
  if (fixFilter.includes('density') && locale === 'en' && kwLower) {
    const fixedContent = fixKwBodyDensity(newContent, kwLower);
    if (fixedContent) {
      if (dryRun) {
        console.log(`  [density] en/${slug}: injected keyword sentence`);
      }
      newContent = fixedContent;
      modified = true;
      stats.densityFixed++;
    }
  }

  // Write back
  if (modified && !dryRun) {
    const rebuilt = matter.stringify(newContent, fm);
    fs.writeFileSync(filePath, rebuilt);
    stats.filesModified++;
  } else if (modified) {
    stats.filesModified++;
  }
}

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

console.log(`\n${'='.repeat(60)}`);
console.log(`  FIX RESULTS ${dryRun ? '(DRY RUN)' : ''}`);
console.log('='.repeat(60));
console.log(`  Files processed: ${stats.total.toLocaleString()}`);
console.log(`  Files modified:  ${stats.filesModified.toLocaleString()}`);
console.log(`  Time:            ${elapsed}s`);
console.log('');
console.log(`  Title fixes:     ${stats.titleFixed} fixed, ${stats.titleSkipped} skipped (no matching rule)`);
console.log(`  Desc fixes:      ${stats.descFixed} fixed, ${stats.descSkipped} skipped`);
console.log(`  KW-in-desc:      ${stats.kwDescFixed} fixed, ${stats.kwDescSkipped} skipped`);
console.log(`  Body density:    ${stats.densityFixed} fixed, ${stats.densitySkipped} skipped`);
console.log('='.repeat(60));
