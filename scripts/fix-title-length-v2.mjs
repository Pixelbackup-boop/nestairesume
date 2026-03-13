#!/usr/bin/env node
/**
 * Aggressive title shortening for titles >65 chars (or >40 for CJK).
 * Strategy: progressively shorten locale-specific suffixes.
 *
 * Usage:
 *   node scripts/fix-title-length-v2.mjs [--dry-run]
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const CONTENT_BASE = path.join(rootDir, 'frontend', 'content');
const CONTENT_TYPES = ['resume-examples', 'cover-letter-examples', 'blog', 'career-tips'];
const LOCALES = ['en', 'ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];
const CJK_LOCALES = new Set(['ja', 'ko', 'zh']);

// Abbreviation equivalence for keyword checking after shortening
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

function kwWordsPresent(title, tags) {
  if (!tags || !tags[0]) return true;
  const titleLower = title.toLowerCase();
  const kwWords = tags[0].toLowerCase().split(/\s+/).filter(Boolean);
  return kwWords.every(w => {
    if (titleLower.includes(w)) return true;
    for (const [abbr, originals] of Object.entries(ABBREV_MAP)) {
      if (originals.includes(w) && titleLower.includes(abbr)) return true;
    }
    return false;
  });
}

// Progressive suffix shortening rules per locale (ordered from mild to aggressive)
const SUFFIX_RULES = {
  it: [
    // Cover letters: "Lettera di Presentazione X: Esempio e Guida alla Scrittura 2026"
    [/: Esempio e Guida alla Scrittura (\d{4})$/, ': Guida $1'],
    [/: Esempio e Guida alla Scrittura$/, ': Guida'],
    [/: Esempio e Modello (\d{4})$/, ' $1'],
    // Resumes: "CV X: Esempi, Modelli e Guida alla Scrittura 2026"
    [/: Esempi, Modelli e Guida alla Scrittura (\d{4})$/, ': Esempi e Modelli $1'],
    [/: Esempi, Modelli e Guida alla Scrittura$/, ': Esempi e Modelli'],
    [/: Esempi e Modelli (\d{4})$/, ' $1'],
    [/: Esempi e Modelli$/, ''],
    // Generic
    [/: Esempio e Guida (\d{4})$/, ' $1'],
    [/: Guida alla Scrittura (\d{4})$/, ' $1'],
    [/Esempio di /, ''],
  ],
  vi: [
    [/: Mẫu CV Xin Việc & Hướng Dẫn (\d{4})$/, ': Mẫu & Hướng Dẫn $1'],
    [/: Mẫu CV Xin Việc & Hướng Dẫn$/, ''],
    [/: Mẫu & Hướng Dẫn (\d{4})$/, ' $1'],
    [/: Ví Dụ, Mẫu và Hướng Dẫn (\d{4})$/, ': Mẫu & Hướng Dẫn $1'],
    [/: Ví Dụ, Mẫu và Hướng Dẫn$/, ''],
    [/: Mẫu và Hướng Dẫn Viết (\d{4})$/, ' $1'],
    [/: Mẫu và Hướng Dẫn Viết$/, ''],
    [/Mẫu Đơn Xin Việc /, 'Đơn Xin Việc '],
  ],
  tr: [
    [/: Şablonlar ve Yazım Kılavuzu (\d{4})$/, ' $1'],
    [/: Şablonlar ve Yazım Kılavuzu$/, ''],
    [/ CV Örneği: Şablonlar ve Yazım Kılavuzu$/, ' CV Örneği'],
    [/ CV Örneği$/, ' CV'],
    [/: Örnekler, Şablonlar ve Yazım Kılavuzu (\d{4})$/, ' $1'],
    [/: Örnekler, Şablonlar ve Yazım Kılavuzu$/, ''],
    [/: Örnekler ve Şablonlar (\d{4})$/, ' $1'],
  ],
  de: [
    [/: Beispiele, Vorlagen und Schreibtipps (\d{4})$/, ': Beispiele & Tipps $1'],
    [/: Beispiele, Vorlagen und Schreibtipps$/, ''],
    [/: Beispiele & Tipps (\d{4})$/, ' $1'],
    [/: Beispiele & Tipps$/, ''],
    [/Examinierte Pflegehilfskraft \(CNA\)/, 'CNA'],
    [/: Vorlagen und Tipps (\d{4})$/, ' $1'],
    [/Lebenslauf: /, 'Lebenslauf '],
  ],
  fr: [
    [/: Exemples, Modeles et Guide de Redaction (\d{4})$/, ': Exemples & Guide $1'],
    [/: Exemples, Modèles et Guide de Rédaction (\d{4})$/, ': Exemples & Guide $1'],
    [/: Exemples & Guide (\d{4})$/, ' $1'],
    [/: Exemples & Guide$/, ''],
    [/: Exemples, Modeles et Guide de Redaction$/, ''],
    [/CV de Technicien de Reparation d'Electromenagers/, 'CV Technicien Réparation Électroménager'],
    [/CV de /, 'CV '],
    [/Lettre de Motivation /, 'LM '],
  ],
  es: [
    [/: Ejemplos, Plantillas y Guía de Redacción (\d{4})$/, ' $1'],
    [/: Ejemplos, Plantillas y Guía de Redacción$/, ''],
    [/: Ejemplos y Plantillas (\d{4})$/, ' $1'],
    [/: Plantillas y Guía (\d{4})$/, ' $1'],
    [/Currículum de /, 'CV '],
    [/Carta de Presentación /, 'Carta '],
  ],
  pt: [
    [/: Modelos, Exemplos e Dicas (\d{4})$/, ': Modelos e Dicas $1'],
    [/: Modelos, Exemplos e Dicas$/, ''],
    [/: Modelos e Dicas (\d{4})$/, ' $1'],
    [/: Modelos e Dicas$/, ''],
    [/Currículo de Técnico de Reparação de Eletrodomésticos/, 'Currículo Técnico Eletrodomésticos'],
    [/Currículo de /, 'CV '],
    [/Carta de Apresentação /, 'Carta '],
  ],
  nl: [
    [/: Voorbeelden, Sjablonen en Schrijfgids (\d{4})$/, ': Voorbeelden & Sjablonen $1'],
    [/: Voorbeelden, Sjablonen en Schrijfgids$/, ''],
    [/: Voorbeelden & Sjablonen (\d{4})$/, ' $1'],
    [/: Voorbeelden & Sjablonen$/, ''],
    [/Gediplomeerd Verpleegkundig Medewerker \(LPN\)/, 'LPN'],
    [/cv /, 'CV '],
    [/Sollicitatiebrief /, 'Brief '],
  ],
  pl: [
    [/: Przykłady, Szablony i Poradnik (\d{4})$/, ' $1'],
    [/: Przykłady, Szablony i Poradnik$/, ''],
    [/: Przykłady i Szablony (\d{4})$/, ' $1'],
    [/: Szablony i Poradnik (\d{4})$/, ' $1'],
    [/Certyfikowany Asystent Pielęgniarski/, 'CNA'],
  ],
  ar: [
    [/: أمثلة ونماذج ودليل الكتابة (\d{4})$/, ' $1'],
    [/: أمثلة ونماذج ودليل الكتابة$/, ''],
    [/: نماذج ودليل الكتابة (\d{4})$/, ' $1'],
    [/السيرة الذاتية لـ/, 'سيرة ذاتية'],
  ],
  id: [
    [/: Contoh, Template dan Panduan Penulisan (\d{4})$/, ' $1'],
    [/: Contoh, Template dan Panduan Penulisan$/, ''],
    [/Contoh Surat Lamaran Kerja /, 'Surat Lamaran '],
    [/: Template dan Panduan (\d{4})$/, ' $1'],
  ],
  th: [
    // Thai titles need to get under 65 chars
    [/: ตัวอย่าง เทมเพลต และเคล็ดลับการเขียน (\d{4})$/, ' $1'],
    [/: ตัวอย่าง เทมเพลต และเคล็ดลับการเขียน$/, ''],
    [/: ตัวอย่างและเทมเพลต (\d{4})$/, ' $1'],
    [/เรซูเม่/, 'CV'],
    [/จดหมายสมัครงาน/, 'จม.สมัครงาน'],
  ],
  ja: [
    // Japanese titles need to get under 40 chars
    [/：サンプル、テンプレート、書き方ガイド (\d{4})$/, ' $1'],
    [/：サンプル、テンプレート、書き方ガイド$/, ''],
    [/：例とテンプレート (\d{4})$/, ' $1'],
    [/：例とテンプレート$/, ''],
    [/の履歴書：/, '履歴書：'],
    [/の履歴書$/, '履歴書'],
    [/履歴書：サンプルとガイド (\d{4})$/, '履歴書 $1'],
    [/の職務経歴書/, '職務経歴書'],
  ],
  ko: [
    // Korean titles need to get under 40 chars
    [/: 샘플, 템플릿 및 작성 가이드 (\d{4})$/, ' $1'],
    [/: 샘플, 템플릿 및 작성 가이드$/, ''],
    [/: 예시와 템플릿 (\d{4})$/, ' $1'],
    [/: 예시와 템플릿$/, ''],
    [/ 이력서: 샘플과 가이드$/, ' 이력서'],
    [/ 이력서:/, ' 이력서'],
    [/ 자기소개서: /, ' 자소서 '],
  ],
  en: [
    [/: Examples, Templates & Writing Guide (\d{4})$/, ' $1'],
    [/: Examples & Templates (\d{4})$/, ' $1'],
    [/ Cover Letter Example & Writing Guide$/, ' Cover Letter Example'],
    [/ Cover Letter Example$/, ' Cover Letter'],
  ],
};

let totalFixed = 0;

for (const contentType of CONTENT_TYPES) {
  for (const locale of LOCALES) {
    const dir = locale === 'en'
      ? path.join(CONTENT_BASE, contentType)
      : path.join(CONTENT_BASE, contentType, locale);
    if (!fs.existsSync(dir)) continue;

    const maxLen = CJK_LOCALES.has(locale) ? 40 : 65;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
    let fixed = 0;

    for (const f of files) {
      const filePath = path.join(dir, f);
      let parsed;
      try { parsed = matter(fs.readFileSync(filePath, 'utf-8')); } catch { continue; }

      const { data: fm, content } = parsed;
      const title = fm.title || '';
      if (title.length <= maxLen) continue;

      const rules = SUFFIX_RULES[locale] || [];
      let newTitle = title;

      // Apply rules progressively until under maxLen
      for (const [pattern, replacement] of rules) {
        if (newTitle.length <= maxLen) break;
        newTitle = newTitle.replace(pattern, replacement);
      }

      // Generic fallback: strip year if still too long
      if (newTitle.length > maxLen) {
        newTitle = newTitle.replace(/ \d{4}$/, '');
      }

      // Last resort: truncate at last space before maxLen
      if (newTitle.length > maxLen) {
        const cut = newTitle.lastIndexOf(' ', maxLen - 3);
        if (cut > maxLen * 0.5) {
          newTitle = newTitle.substring(0, cut);
        }
      }

      // Final trim
      newTitle = newTitle.replace(/[:\s]+$/, '').trim();

      if (newTitle === title || newTitle.length > maxLen) continue;

      // Check keyword preservation
      if (!kwWordsPresent(newTitle, fm.tags)) continue;

      if (DRY_RUN) {
        console.log(`  [${locale}/${contentType}] ${f}: "${title}" (${title.length}) → "${newTitle}" (${newTitle.length})`);
      } else {
        fm.title = newTitle;
        fs.writeFileSync(filePath, matter.stringify(content, fm));
      }
      fixed++;
    }

    if (fixed > 0) console.log(`${locale}/${contentType}: ${fixed} titles shortened`);
    totalFixed += fixed;
  }
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Total titles shortened: ${totalFixed}`);
