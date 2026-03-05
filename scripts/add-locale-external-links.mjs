#!/usr/bin/env node
/**
 * Add locale-specific salary authority links to resume example pages.
 *
 * For each locale, finds the salary section with BLS/Glassdoor/PayScale bullets
 * and inserts a 4th bullet with a locale-specific authoritative source.
 *
 * Usage: node scripts/add-locale-external-links.mjs --locale=fr
 *        node scripts/add-locale-external-links.mjs --all
 */
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

// Locale-specific authority sources to add
// Format: { line: markdown bullet, url: url substring to detect if already present }
const LOCALE_SOURCES = {
  fr: {
    line: '- [APEC](https://www.apec.fr) — Marché de l\'emploi et salaires des cadres en France',
    detect: 'apec.fr',
  },
  de: {
    line: '- [Bundesagentur für Arbeit](https://statistik.arbeitsagentur.de) — Aktuelle Gehaltsdaten und Arbeitsmarktinfos für Deutschland',
    detect: 'arbeitsagentur.de',
  },
  ar: {
    line: '- [وزارة الموارد البشرية](https://www.mol.gov.sa) — بيانات سوق العمل الرسمية للمملكة العربية السعودية',
    detect: 'mol.gov.sa',
  },
  ja: {
    line: '- [厚生労働省 (Kōsei Rōdōshō)](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/index.html) — 日本の公式賃金・雇用統計',
    detect: 'mhlw.go.jp',
  },
  ko: {
    line: '- [워크넷 (WorkNet)](https://www.work.go.kr) — 한국 공식 고용 및 임금 통계',
    detect: 'work.go.kr',
  },
  tr: {
    line: '- [İŞKUR (Türkiye İş Kurumu)](https://www.iskur.gov.tr) — Türkiye resmi istihdam ve ücret verileri',
    detect: 'iskur.gov.tr',
  },
  vi: {
    line: '- [Bộ Lao động – Thương binh và Xã hội](https://www.molisa.gov.vn) — Dữ liệu việc làm và lương thống kê chính thức của Việt Nam',
    detect: 'molisa.gov.vn',
  },
  th: {
    line: '- [กรมการจัดหางาน (กระทรวงแรงงาน)](https://www.doe.go.th) — ข้อมูลตลาดแรงงานและค่าจ้างอย่างเป็นทางการของประเทศไทย',
    detect: 'doe.go.th',
  },
  nl: {
    line: '- [CBS (Centraal Bureau voor de Statistiek)](https://www.cbs.nl/nl-nl/cijfers/detail/80884ned) — Officiële loonstatistieken en arbeidsmarktcijfers voor Nederland',
    detect: 'cbs.nl',
  },
  pl: {
    line: '- [GUS (Główny Urząd Statystyczny)](https://stat.gov.pl/obszary-tematyczne/rynek-pracy/) — Oficjalne dane o rynku pracy i wynagrodzeniach w Polsce',
    detect: 'stat.gov.pl',
  },
  id: {
    line: '- [Kemenaker (Kementerian Ketenagakerjaan RI)](https://www.kemnaker.go.id) — Data resmi ketenagakerjaan dan upah Indonesia',
    detect: 'kemnaker.go.id',
  },
};

// PayScale line pattern — end of the existing 3-bullet source block
// Alternative patterns for some locales that may have translated PayScale label
const PAYSCALE_ALT_PATTERNS = [
  /(\- \[PayScale\].*?)\n/,
  /(\- \[Blognone\].*?)\n/,  // th locale ends with Blognone
  /(\- \[Glassdoor\].*?)\n(?!\- )(?!\- \[)/,  // fallback: after Glassdoor if it's the last bullet
];

function processLocale(locale) {
  const source = LOCALE_SOURCES[locale];
  if (!source) {
    console.error(`No source config for locale: ${locale}`);
    return;
  }

  const dir = path.join(rootDir, 'frontend', 'content', 'resume-examples', locale);
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Skip if already has the locale authority link
    if (content.includes(source.detect)) {
      skipped++;
      continue;
    }

    // Skip if no salary section indicators (PayScale, Blognone, or JobThai)
    const hasSalarySection = content.includes('payscale.com') || content.includes('PayScale')
      || content.includes('Blognone') || content.includes('jobthai.com');
    if (!hasSalarySection) {
      skipped++;
      continue;
    }

    // Find the PayScale bullet line and insert after it
    let inserted = false;
    for (const pattern of PAYSCALE_ALT_PATTERNS) {
      if (pattern.test(content)) {
        content = content.replace(pattern, `$1\n${source.line}\n`);
        inserted = true;
        break;
      }
    }

    if (inserted) {
      fs.writeFileSync(filePath, content);
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`${locale}: ${updated} updated, ${skipped} skipped`);
  return updated;
}

// Parse CLI args
const args = process.argv.slice(2);
const localeArg = args.find(a => a.startsWith('--locale='))?.replace('--locale=', '');
const runAll = args.includes('--all');

if (runAll) {
  let total = 0;
  for (const locale of Object.keys(LOCALE_SOURCES)) {
    total += processLocale(locale) || 0;
  }
  console.log(`\nTotal files updated: ${total}`);
} else if (localeArg) {
  processLocale(localeArg);
} else {
  console.log('Usage: node scripts/add-locale-external-links.mjs --locale=fr');
  console.log('       node scripts/add-locale-external-links.mjs --all');
  console.log('\nAvailable locales:', Object.keys(LOCALE_SOURCES).join(', '));
}
