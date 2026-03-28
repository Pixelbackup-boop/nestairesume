#!/usr/bin/env node
/**
 * Generic locale SEO optimization for resume example pages.
 * Runs 4 optimizations for a given locale:
 *   1. Tags: Replace slots 5-8 with high-volume locale keyword tags
 *   2. Descriptions: Ensure primary keyword present + shorten to ≤160 chars
 *   3. Body keywords: Inject 2 locale-specific sentences (intro + ATS section)
 *   4. Blog links: Inject 2 locale blog links before CTA paragraph
 *
 * Usage: node scripts/optimize-locale-seo.mjs --locale=fr [--dry-run] [--skip=tags,desc,body,links]
 *
 * Supported locales: fr, de, ar, ja, ko, it, tr, vi, th, nl, pl, id
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const localeArg = process.argv.find(a => a.startsWith('--locale='))?.split('=')[1];
const skipArg = process.argv.find(a => a.startsWith('--skip='))?.split('=')[1] || '';
const SKIP = new Set(skipArg.split(',').filter(Boolean));

if (!localeArg) {
  console.error('Usage: node scripts/optimize-locale-seo.mjs --locale=fr [--dry-run] [--skip=tags,desc,body,links]');
  process.exit(1);
}

// ============================================================
// LOCALE CONFIGS
// ============================================================

const CONFIGS = {
  fr: {
    descriptionKeyword: 'curriculum vitae',
    descriptionShortenings: [
      ['avec des modèles compatibles ATS et des conseils d\'experts', 'avec modèles ATS'],
      ['avec des modèles compatibles ATS et conseils d\'experts', 'avec modèles ATS'],
      ['avec modèles compatibles ATS et conseils d\'experts', 'avec modèles ATS'],
      [' Format professionnel, exemples de résumé et conseils pour 2026', ''],
      [' Format professionnel et conseils pour 2026', ''],
      [' et conseils d\'experts pour 2026', ''],
      [' pour 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` Ce document — également appelé curriculum vitae (CV) — est votre principal outil pour décrocher des entretiens dans le domaine de ${jobTitle}.`,
    bodySentence2:
      `Qu'on l'appelle CV, curriculum vitae ou modèle de CV, l'optimisation pour les systèmes ATS suit les mêmes principes fondamentaux. `,
    blogLinks: [
      '- [Comment Faire un CV Professionnel en 2026](/fr/blog/comment-faire-un-cv) — Guide complet pour créer un CV qui passe les filtres ATS',
      '- [CV Compatible ATS : Guide Complet 2026](/fr/blog/comment-faire-cv-compatible-ats) — Optimisez votre CV pour les systèmes de suivi des candidatures',
    ],
    blogIdempotencyCheck: '/fr/blog/comment-faire-un-cv',
    ctaPattern: /\nPr[eé]t.{0,10}cr[eé]er[^\n]+\n/,
    newTagFn: (jobLower) => [
      `cv ${jobLower}`,
      `modèle cv ${jobLower}`,
      `exemple cv ${jobLower}`,
      `curriculum vitae ${jobLower}`,
    ],
  },

  de: {
    descriptionKeyword: 'Lebenslauf',
    descriptionShortenings: [
      [' mit ATS-freundlichen Vorlagen und Expertentipps', ''],
      [' Professionelles Format und Expertentipps', ''],
      [' und Expertentipps für 2026', ''],
      [' für 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` Dieses Dokument — auch als Lebenslauf oder curriculum vitae (CV) bezeichnet — ist Ihr wichtigstes Werkzeug, um Vorstellungsgespräche im Bereich ${jobTitle} zu erhalten.`,
    bodySentence2:
      `Ob Lebenslauf, CV oder curriculum vitae — die Optimierung für ATS-Systeme folgt denselben Grundprinzipien. `,
    blogLinks: [
      '- [Vorlagen für Lebensläufe: Kostenlose Muster 2026](/de/blog/lebenslauf-vorlagen-kostenlos) — Kostenlose Lebenslauf-Vorlagen für Word und PDF',
      '- [Bewerbung Erstellen Online Kostenlos 2026](/de/blog/bewerbung-erstellen-online-kostenlos) — Online-Tools für eine professionelle Bewerbung',
    ],
    blogIdempotencyCheck: '/de/blog/lebenslauf-vorlagen-kostenlos',
    ctaPattern: /\nErstellen Sie jetzt[^\n]+\n/,
    newTagFn: (jobLower) => [
      `lebenslauf ${jobLower}`,
      `lebenslauf vorlage ${jobLower}`,
      `bewerbung ${jobLower}`,
      `cv ${jobLower}`,
    ],
  },

  ar: {
    descriptionKeyword: 'سيرة ذاتية',
    descriptionShortenings: [
      [' مع نماذج متوافقة مع ATS ونصائح الخبراء', ''],
      [' تنسيق احترافي ونصائح للنجاح في 2026', ''],
      [' ونصائح للنجاح في 2026', ''],
      [' في 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` هذه الوثيقة — المعروفة أيضًا بالسيرة الذاتية أو curriculum vitae — هي أداتك الرئيسية للحصول على مقابلات عمل في مجال ${jobTitle}.`,
    bodySentence2:
      `سواء سُميت السيرة الذاتية أو CV أو curriculum vitae، فإن التحسين لأنظمة ATS يتبع المبادئ الأساسية ذاتها. `,
    blogLinks: [
      '- [عمل CV احترافي خطوة بخطوة](/ar/blog/amal-cv) — دليل شامل لإنشاء سيرة ذاتية احترافية تتوافق مع ATS',
      '- [عمل CV احترافي مجانًا](/ar/blog/amal-cv-ihtirafi) — إنشاء سيرة ذاتية مجانية ومخصصة في دقائق',
    ],
    blogIdempotencyCheck: '/ar/blog/amal-cv',
    ctaPattern: /\n\*\*هل أنت مستعد[^\n]+\n/,
    newTagFn: (jobLower) => [
      `سيرة ذاتية ${jobLower}`,
      `نموذج cv ${jobLower}`,
      `cv بالعربي ${jobLower}`,
      `cv احترافي ${jobLower}`,
    ],
  },

  ja: {
    descriptionKeyword: '履歴書',
    descriptionShortenings: [
      ['ATS対応のテンプレートと専門家のアドバイスを含む', 'ATS対応テンプレート付き'],
      ['プロフェッショナルな形式と専門家のアドバイス', ''],
      ['と専門家のアドバイス 2026', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` この書類は履歴書・職務経歴書（curriculum vitae）とも呼ばれ、${jobTitle}の面接を勝ち取るための最も重要なツールです。`,
    bodySentence2:
      `履歴書、職務経歴書、curriculum vitae — いずれの呼び方でも、ATS対応の最適化は同じ基本原則に従います。 `,
    blogLinks: [
      '- [履歴書の書き方完全ガイド 2026](/ja/blog/rirekisho-kakikata-guide) — 採用担当者に選ばれる履歴書の書き方を徹底解説',
      '- [ATS対応の履歴書の書き方 2026](/ja/blog/ats-taiou-rirekisho) — 書類選考を突破するためのATS最適化テクニック',
    ],
    blogIdempotencyCheck: '/ja/blog/rirekisho-kakikata-guide',
    ctaPattern: /\n[^\n]*履歴書を作成[^\n]*\n/,
    newTagFn: (jobLower) => [
      `${jobLower} 履歴書`,
      `${jobLower} 職務経歴書`,
      `${jobLower} 転職`,
      `履歴書 書き方 ${jobLower}`,
    ],
  },

  ko: {
    descriptionKeyword: '이력서',
    descriptionShortenings: [
      [' ATS 친화적인 템플릿과 전문가 조언 포함', ''],
      [' 전문적인 형식과 전문가 조언', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` 이 서류는 이력서(curriculum vitae)라고도 불리며, ${jobTitle} 분야에서 면접 기회를 얻기 위한 가장 중요한 도구입니다.`,
    bodySentence2:
      `이력서, CV, curriculum vitae — 어떻게 부르든, ATS 최적화는 동일한 기본 원칙을 따릅니다. `,
    blogLinks: [
      '- [ATS 이력서 작성 가이드 2026](/ko/blog/ats-iryeokseo-guide) — 서류 전형을 통과하는 이력서 최적화 방법',
      '- [이력서 양식 무료 다운로드](/ko/blog/iryeokseo-template-download) — 합격률 높은 이력서 템플릿 무료 다운로드',
    ],
    blogIdempotencyCheck: '/ko/blog/ats-iryeokseo-guide',
    ctaPattern: /\n[^\n]*이력서를 만드시겠습니까[^\n]*\n/,
    newTagFn: (jobLower) => [
      `${jobLower} 이력서`,
      `이력서 양식 ${jobLower}`,
      `${jobLower} 자기소개서`,
      `이력서 작성법 ${jobLower}`,
    ],
  },

  it: {
    descriptionKeyword: 'curriculum vitae',
    descriptionShortenings: [
      [' con modelli compatibili ATS e consigli degli esperti', ''],
      [' Formato professionale e consigli degli esperti', ''],
      [' e consigli degli esperti per il 2026', ''],
      [' per il 2026', ''],
    ],
    bodyIdempotencyCheck: 'noto anche come curriculum vitae (CV)',
    bodySentence1: (jobTitle) =>
      ` Questo documento — noto anche come curriculum vitae (CV) — è il tuo strumento principale per ottenere colloqui di lavoro nel settore di ${jobTitle}.`,
    bodySentence2:
      `Che si chiami curriculum vitae, CV o modello CV, l'ottimizzazione per i sistemi ATS segue gli stessi principi fondamentali. `,
    blogLinks: [
      '- [Come Scrivere un Curriculum Vitae Perfetto 2026](/it/blog/come-scrivere-curriculum-vitae) — Guida completa alla scrittura del curriculum vitae professionale',
      '- [Crea il Tuo Curriculum Vitae Gratis Online](/it/blog/crea-curriculum-gratis-online) — Strumenti gratuiti per creare un CV professionale',
    ],
    blogIdempotencyCheck: '/it/blog/come-scrivere-curriculum-vitae',
    ctaPattern: /\nPronto a creare[^\n]+\n/,
    newTagFn: (jobLower) => [
      `cv ${jobLower}`,
      `curriculum vitae ${jobLower}`,
      `esempio cv ${jobLower}`,
      `modello cv ${jobLower}`,
    ],
  },

  tr: {
    descriptionKeyword: 'özgeçmiş',
    descriptionShortenings: [
      [' ATS uyumlu şablonlar ve uzman ipuçlarıyla', ''],
      [' Profesyonel format ve uzman ipuçları', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` Bu belge — özgeçmiş veya curriculum vitae (CV) olarak da bilinir — ${jobTitle} alanında iş görüşmesi elde etmek için en önemli araçtır.`,
    bodySentence2:
      `Özgeçmiş, CV veya curriculum vitae olarak adlandırılsın, ATS optimizasyonu aynı temel prensipleri izler. `,
    blogLinks: [
      '- [ATS Uyumlu CV Hazırlama: Eksiksiz Rehber 2026](/tr/blog/ats-uyumlu-cv-hazirlama) — İşe alım sistemlerini geçen CV oluşturma rehberi',
      '- [ATS Uyumlu CV Şablonu: Kapsamlı Rehber 2026](/tr/blog/ats-uyumlu-cv-sablonu-rehberi) — ATS dostu CV şablonları ve ipuçları',
    ],
    blogIdempotencyCheck: '/tr/blog/ats-uyumlu-cv-hazirlama',
    ctaPattern: /\n[^\n]*hazır mısınız\?[^\n]*\n/,
    newTagFn: (jobLower) => [
      `${jobLower} özgeçmiş`,
      `cv ${jobLower}`,
      `özgeçmiş örneği ${jobLower}`,
      `cv şablonu ${jobLower}`,
    ],
  },

  vi: {
    descriptionKeyword: 'hồ sơ xin việc',
    descriptionShortenings: [
      [' với mẫu CV tối ưu ATS và hướng dẫn chi tiết', ''],
      [' Định dạng chuyên nghiệp và lời khuyên từ chuyên gia', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` Tài liệu này — còn được gọi là hồ sơ xin việc hoặc curriculum vitae (CV) — là công cụ chính để bạn nhận được lời mời phỏng vấn trong lĩnh vực ${jobTitle}.`,
    bodySentence2:
      `Dù gọi là CV, hồ sơ xin việc hay curriculum vitae, việc tối ưu hóa cho hệ thống ATS đều tuân theo các nguyên tắc cơ bản giống nhau. `,
    blogLinks: [
      '- [Cách Viết CV Xin Việc Chuẩn Nhà Tuyển Dụng 2026](/vi/blog/cach-viet-cv-xin-viec) — Hướng dẫn tạo CV chuyên nghiệp vượt qua bộ lọc ATS',
      '- [Mẫu CV ATS Tối Ưu: Download Miễn Phí 2026](/vi/blog/mau-cv-ats-toi-uu) — Tải mẫu CV ATS miễn phí, sẵn sàng nộp ngay',
    ],
    blogIdempotencyCheck: '/vi/blog/cach-viet-cv-xin-viec',
    ctaPattern: /\nSẵn sàng tạo CV[^\n]+\n/,
    newTagFn: (jobLower) => [
      `cv ${jobLower}`,
      `mẫu cv ${jobLower}`,
      `hồ sơ xin việc ${jobLower}`,
      `cv xin việc ${jobLower}`,
    ],
  },

  th: {
    descriptionKeyword: 'ประวัติย่อ',
    descriptionShortenings: [
      [' พร้อมเทมเพลต ATS และคำแนะนำจากผู้เชี่ยวชาญ', ''],
      [' รูปแบบมืออาชีพและคำแนะนำสำหรับปี 2026', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` เอกสารนี้ — หรือที่เรียกว่าประวัติย่อหรือเรซูเม่ (resume) — เป็นเครื่องมือสำคัญที่สุดในการได้รับโอกาสสัมภาษณ์งานในสาขา ${jobTitle}`,
    bodySentence2:
      `ไม่ว่าจะเรียกว่าประวัติย่อ เรซูเม่ หรือ curriculum vitae การปรับแต่งสำหรับระบบ ATS ล้วนยึดหลักการพื้นฐานเดียวกัน `,
    blogLinks: [
      '- [ATS คืออะไร: คู่มือฉบับสมบูรณ์](/th/blog/ats-khue-arai-guide) — เรียนรู้วิธีทำเรซูเม่ผ่านระบบ ATS ของบริษัท',
      '- [แอปสร้างเรซูเม่ที่ดีที่สุด 2026](/th/blog/app-sang-resume-thi-di-thisut) — เครื่องมือสร้างเรซูเม่ออนไลน์ฟรีที่แนะนำ',
    ],
    blogIdempotencyCheck: '/th/blog/ats-khue-arai-guide',
    ctaPattern: /\nสร้างเรซูเม่[^\n]+\n/,
    newTagFn: (jobLower) => [
      `เรซูเม่ ${jobLower}`,
      `ประวัติย่อ ${jobLower}`,
      `cv ภาษาไทย ${jobLower}`,
      `สมัครงาน ${jobLower}`,
    ],
  },

  nl: {
    descriptionKeyword: 'curriculum vitae',
    descriptionShortenings: [
      [' met ATS-vriendelijke sjablonen en tips van experts', ''],
      [' Professioneel format en tips van experts', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` Dit document — ook bekend als curriculum vitae (CV) — is uw voornaamste hulpmiddel om sollicitatiegesprekken te krijgen in de sector ${jobTitle}.`,
    bodySentence2:
      `Of men het nu cv, curriculum vitae of sollicitatiedocument noemt, de optimalisatie voor ATS-systemen volgt dezelfde basisprincipes. `,
    blogLinks: [
      '- [ATS-vriendelijk CV Maken: Gids om Filters te Passeren 2026](/nl/blog/ats-vriendelijk-cv-maken) — Leer hoe u een CV maakt dat door ATS-filters komt',
      '- [CV Maken met Canva: Gratis Sjablonen en ATS-tips 2026](/nl/blog/cv-canva-template) — Gratis cv-sjablonen en professionele ontwerptips',
    ],
    blogIdempotencyCheck: '/nl/blog/ats-vriendelijk-cv-maken',
    ctaPattern: /\nKlaar om een professioneel[^\n]+\n/,
    newTagFn: (jobLower) => [
      `cv ${jobLower}`,
      `cv sjabloon ${jobLower}`,
      `sollicitatiebrief ${jobLower}`,
      `curriculum vitae ${jobLower}`,
    ],
  },

  pl: {
    descriptionKeyword: 'CV',
    descriptionShortenings: [
      [' z szablonami ATS i wskazówkami ekspertów', ''],
      [' Profesjonalny format i wskazówki ekspertów', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` Ten dokument — znany również jako curriculum vitae (CV) — jest najważniejszym narzędziem do uzyskania rozmów kwalifikacyjnych w branży ${jobTitle}.`,
    bodySentence2:
      `Niezależnie od tego, czy nazywa się go CV, curriculum vitae czy życiorysem zawodowym, optymalizacja pod systemy ATS podlega tym samym zasadom. `,
    blogLinks: [
      '- [Jak napisać CV: Kompletny poradnik 2026](/pl/blog/jak-napisac-cv) — Przewodnik krok po kroku do stworzenia CV, które przejdzie systemy ATS',
      '- [Szablon CV za Darmo: najlepsze wzory 2026](/pl/blog/szablon-cv-za-darmo) — Pobierz darmowe szablony CV w formacie Word i PDF',
    ],
    blogIdempotencyCheck: '/pl/blog/jak-napisac-cv',
    ctaPattern: /\nGotowy\/a do[^\n]+\n/,
    newTagFn: (jobLower) => [
      `cv ${jobLower}`,
      `cv wzór ${jobLower}`,
      `list motywacyjny ${jobLower}`,
      `cv do pracy ${jobLower}`,
    ],
  },

  id: {
    // Descriptions + blog links already done by previous scripts.
    // This config handles tags + body keywords only.
    descriptionKeyword: 'curriculum vitae',
    descriptionShortenings: [], // already optimized
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` Dokumen ini — juga dikenal sebagai curriculum vitae (CV) — adalah alat utama Anda untuk mendapatkan undangan wawancara di bidang ${jobTitle}.`,
    bodySentence2:
      `Disebut CV, curriculum vitae, atau daftar riwayat hidup — optimasi untuk sistem ATS mengikuti prinsip-prinsip dasar yang sama. `,
    blogLinks: [], // already injected
    blogIdempotencyCheck: '/id/blog/cara-membuat-cv',
    ctaPattern: /\nSiap membuat CV[^\n]+\n/,
    newTagFn: (jobLower) => [
      `cv ${jobLower}`,
      `template cv ${jobLower}`,
      `contoh cv ${jobLower}`,
      `curriculum vitae ${jobLower}`,
    ],
  },

  zh: {
    descriptionKeyword: '简历',
    descriptionShortenings: [
      [' 专业格式、模板和撰写指南 2026', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: '个人简历',
    bodySentence1: (jobTitle) =>
      ` 这份文档——也称为个人简历或CV——是您在${jobTitle}领域获得面试机会的最重要工具。`,
    bodySentence2:
      `无论称为简历、个人简历还是CV，针对ATS系统的优化都遵循相同的基本原则。 `,
    blogLinks: [
      '- [简历怎么写：2026完整指南](/zh/blog/jianli-zenme-xie-guide) — 手把手教你撰写通过ATS系统的专业简历',
      '- [免费简历模板下载2026](/zh/blog/jianli-moban-xiazai) — 精选Word和PDF格式的免费简历模板',
    ],
    blogIdempotencyCheck: '/zh/blog/jianli-zenme-xie-guide',
    ctaPattern: /\n准备好制作[^\n]+\n/,
    newTagFn: (jobLower) => [
      `${jobLower} 简历`,
      `${jobLower} 简历模板`,
      `${jobLower} 简历范文`,
      `${jobLower} 求职简历`,
    ],
  },

  ms: {
    descriptionKeyword: 'resume',
    descriptionShortenings: [
      [' dengan format profesional dan panduan ATS 2026', ''],
      [' 2026', ''],
    ],
    bodyIdempotencyCheck: 'curriculum vitae',
    bodySentence1: (jobTitle) =>
      ` Dokumen ini — juga dikenali sebagai resume atau curriculum vitae (CV) — adalah alat utama anda untuk mendapatkan jemputan temuduga dalam bidang ${jobTitle}.`,
    bodySentence2:
      `Sama ada dipanggil resume, CV, atau curriculum vitae — pengoptimuman untuk sistem ATS mengikut prinsip asas yang sama. `,
    blogLinks: [
      '- [Cara Buat Resume: Panduan Lengkap 2026](/ms/blog/cara-buat-resume-panduan) — Panduan langkah demi langkah untuk membuat resume profesional yang lulus ATS',
      '- [Template Resume Percuma 2026](/ms/blog/template-resume-percuma-muat-turun) — Muat turun template resume percuma dalam format Word dan PDF',
    ],
    blogIdempotencyCheck: '/ms/blog/cara-buat-resume-panduan',
    ctaPattern: /\nBersedia untuk membuat resume[^\n]+\n/,
    newTagFn: (jobLower) => [
      `resume ${jobLower}`,
      `contoh resume ${jobLower}`,
      `template resume ${jobLower}`,
      `cv ${jobLower}`,
    ],
  },
};

// ============================================================
// MAIN
// ============================================================

const config = CONFIGS[localeArg];
if (!config) {
  console.error(`Unknown locale: ${localeArg}. Supported: ${Object.keys(CONFIGS).join(', ')}`);
  process.exit(1);
}

const RESUME_DIR = path.join(rootDir, `frontend/content/resume-examples/${localeArg}`);
if (!fs.existsSync(RESUME_DIR)) {
  console.error(`Directory not found: ${RESUME_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(RESUME_DIR).filter(f => f.endsWith('.mdx'));
const MAX_DESC = 160;

const counters = {
  tags: { updated: 0, skipped: 0, errors: 0 },
  desc: { updated: 0, skipped: 0, errors: 0 },
  body: { updated: 0, skipped: 0, errors: 0 },
  links: { updated: 0, skipped: 0, errors: 0 },
};

// ── Shared file cache ──────────────────────────────────────
const fileCache = new Map(); // file → { raw, data, content }

function loadFile(filePath) {
  if (fileCache.has(filePath)) return fileCache.get(filePath);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const entry = { raw, data, content };
  fileCache.set(filePath, entry);
  return entry;
}

function saveFile(filePath, data, content) {
  const rebuilt = matter.stringify(content, data);
  if (!DRY_RUN) {
    fs.writeFileSync(filePath, rebuilt, 'utf-8');
    // Update cache
    const { data: d2, content: c2 } = matter(rebuilt);
    fileCache.set(filePath, { raw: rebuilt, data: d2, content: c2 });
  }
}

// ── PHASE 1: Tags ───────────────────────────────────────────
function optimizeTags() {
  console.log('\n── Phase 1: Tags ──');
  for (const file of files) {
    const filePath = path.join(RESUME_DIR, file);
    let entry;
    try { entry = loadFile(filePath); }
    catch (e) { console.error(`ERROR ${file}: ${e.message}`); counters.tags.errors++; continue; }

    const { data, content } = entry;
    if (!data.tags || !data.jobTitle) { counters.tags.skipped++; continue; }

    const jobLower = data.jobTitle.toLowerCase();
    const newTags = [...data.tags.slice(0, 4), ...config.newTagFn(jobLower)];

    // Already has the new tag pattern?
    if (data.tags.length >= 8 && data.tags[4] === newTags[4]) {
      counters.tags.skipped++;
      continue;
    }

    data.tags = newTags;
    if (DRY_RUN) {
      console.log(`${file}: tags[4-7] → [${newTags.slice(4).join(', ')}]`);
    } else {
      saveFile(filePath, data, content);
    }
    counters.tags.updated++;
  }
}

// ── PHASE 2: Descriptions ───────────────────────────────────
function optimizeDescriptions() {
  if (config.descriptionShortenings.length === 0 && localeArg === 'id') {
    console.log('\n── Phase 2: Descriptions ── (skipped — already done for id)');
    return;
  }
  console.log('\n── Phase 2: Descriptions ──');
  for (const file of files) {
    const filePath = path.join(RESUME_DIR, file);
    let entry;
    try { entry = loadFile(filePath); }
    catch (e) { console.error(`ERROR ${file}: ${e.message}`); counters.desc.errors++; continue; }

    const { data, content } = entry;
    if (!data.description) { counters.desc.skipped++; continue; }

    const desc = data.description;
    // Skip if already short AND has keyword
    if (desc.length <= MAX_DESC && desc.toLowerCase().includes(config.descriptionKeyword.toLowerCase())) {
      counters.desc.skipped++;
      continue;
    }

    let newDesc = desc;

    // Step 1: Shorten if needed
    if (newDesc.length > MAX_DESC) {
      for (const [from, to] of config.descriptionShortenings) {
        newDesc = newDesc.replace(from, to);
        if (newDesc.length <= MAX_DESC) break;
      }
      newDesc = newDesc.replace(/  +/g, ' ').replace(/\. \./g, '.').replace(/ \./g, '.').trim();
    }

    // Final truncation at sentence boundary
    if (newDesc.length > MAX_DESC) {
      const lastPeriod = newDesc.lastIndexOf('.', MAX_DESC - 1);
      if (lastPeriod > 80) newDesc = newDesc.substring(0, lastPeriod + 1);
      else newDesc = newDesc.substring(0, MAX_DESC).replace(/\s+\S*$/, '...');
    }

    // Step 2: Inject keyword if missing
    if (!newDesc.toLowerCase().includes(config.descriptionKeyword.toLowerCase())) {
      // Try to replace 'CV' at word boundary with keyword
      const replaced = newDesc.replace(/\bCV\b(?= [A-ZÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜ])/i, config.descriptionKeyword);
      if (replaced !== newDesc) newDesc = replaced;
    }

    if (newDesc === desc || newDesc.length > MAX_DESC) {
      counters.desc.skipped++;
      continue;
    }

    data.description = newDesc;
    if (DRY_RUN) {
      console.log(`${file} (${newDesc.length}): ${newDesc.substring(0, 80)}...`);
    } else {
      saveFile(filePath, data, content);
    }
    counters.desc.updated++;
  }
}

// ── PHASE 3: Body keywords ──────────────────────────────────
function optimizeBody() {
  console.log('\n── Phase 3: Body keywords ──');
  for (const file of files) {
    const filePath = path.join(RESUME_DIR, file);
    let entry;
    try { entry = loadFile(filePath); }
    catch (e) { console.error(`ERROR ${file}: ${e.message}`); counters.body.errors++; continue; }

    const { data, content } = entry;

    // Idempotency check
    if (content.includes(config.bodyIdempotencyCheck)) {
      counters.body.skipped++;
      continue;
    }

    const jobTitle = data.jobTitle || '';
    let newContent = content;
    let changes = 0;

    // Location A: After first paragraph following first H2
    const introMatch = newContent.match(/^(## .+\n\n)([\s\S]+?)(\n\n##)/m);
    if (introMatch) {
      const sentence = config.bodySentence1(jobTitle);
      const firstParaEnd = introMatch[2].indexOf('\n\n');
      if (firstParaEnd > 0) {
        const firstPara = introMatch[2].substring(0, firstParaEnd);
        const rest = introMatch[2].substring(firstParaEnd);
        newContent = newContent.replace(
          introMatch[0],
          introMatch[1] + firstPara + sentence + rest + introMatch[3]
        );
      } else {
        newContent = newContent.replace(
          introMatch[0],
          introMatch[1] + introMatch[2] + sentence + introMatch[3]
        );
      }
      changes++;
    }

    // Location B: After ATS section heading (ATS is universal abbreviation in all locales)
    const atsPattern = /^(## .*ATS.*\n\n)/m;
    const atsMatch = newContent.match(atsPattern);
    if (atsMatch) {
      const insertPos = newContent.indexOf(atsMatch[0]) + atsMatch[1].length;
      newContent = newContent.substring(0, insertPos) + config.bodySentence2 + newContent.substring(insertPos);
      changes++;
    }

    if (changes === 0) { counters.body.skipped++; continue; }

    if (DRY_RUN) {
      console.log(`${file}: ${changes} body insertion(s)`);
    } else {
      const { data: d2 } = matter(newContent.trim() ? matter.stringify(newContent, {}) : '');
      saveFile(filePath, data, newContent);
    }
    counters.body.updated++;
  }
}

// ── PHASE 4: Blog links ─────────────────────────────────────
function injectBlogLinks() {
  if (config.blogLinks.length === 0) {
    console.log('\n── Phase 4: Blog links ── (skipped — already done)');
    return;
  }
  console.log('\n── Phase 4: Blog links ──');
  const linksBlock = '\n' + config.blogLinks.join('\n') + '\n';

  for (const file of files) {
    const filePath = path.join(RESUME_DIR, file);
    let raw;
    try { raw = fs.readFileSync(filePath, 'utf-8'); }
    catch (e) { console.error(`ERROR ${file}: ${e.message}`); counters.links.errors++; continue; }

    // Idempotency
    if (raw.includes(config.blogIdempotencyCheck)) { counters.links.skipped++; continue; }

    let content = raw;
    let changed = false;

    // Primary: find CTA pattern
    if (config.ctaPattern) {
      const ctaMatch = content.match(config.ctaPattern);
      if (ctaMatch) {
        const insertPos = content.indexOf(ctaMatch[0]);
        content = content.substring(0, insertPos) + linksBlock + content.substring(insertPos);
        changed = true;
      }
    }

    // Fallback: insert before last paragraph containing builder link
    if (!changed) {
      const builderPattern = new RegExp(`\\n[^\\n]*\\/${localeArg}\\/builder[^\\n]*\\n*$`);
      const builderMatch = content.match(builderPattern);
      if (builderMatch) {
        const insertPos = content.lastIndexOf(builderMatch[0]);
        content = content.substring(0, insertPos) + linksBlock + content.substring(insertPos);
        changed = true;
      }
    }

    if (!changed) { counters.links.skipped++; continue; }

    if (DRY_RUN) {
      console.log(`OK: ${file}`);
    } else {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    counters.links.updated++;
  }
}

// ── Run phases ──────────────────────────────────────────────
console.log(`\n=== optimize-locale-seo --locale=${localeArg}${DRY_RUN ? ' --dry-run' : ''} ===`);
console.log(`Directory: ${RESUME_DIR}`);
console.log(`Files: ${files.length}`);

if (!SKIP.has('tags')) optimizeTags();
if (!SKIP.has('desc')) optimizeDescriptions();
if (!SKIP.has('body')) optimizeBody();
if (!SKIP.has('links')) injectBlogLinks();

console.log('\n=== SUMMARY ===');
for (const [phase, c] of Object.entries(counters)) {
  if (SKIP.has(phase)) continue;
  console.log(`${phase.padEnd(5)}: updated=${c.updated}  skipped=${c.skipped}${c.errors ? `  errors=${c.errors}` : ''}`);
}
if (DRY_RUN) console.log('(dry run — no files changed)');
