// Keyword Strategy Analysis Script
// This is a one-off analysis script, not production code
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'resume xample keywords.csv');
const raw = execFileSync('iconv', ['-f', 'UTF-16', '-t', 'UTF-8', csvPath]).toString();
const lines = raw.split('\n').slice(2);
const rows = lines.slice(1).filter(l => l.trim()).map(line => {
  const cols = line.split('\t');
  return {
    keyword: cols[0],
    volume: parseInt(cols[2]) || 0,
    competition: cols[5],
    compIndex: parseInt(cols[6]) || 0,
    bidLow: parseFloat(cols[7]) || 0,
    bidHigh: parseFloat(cols[8]) || 0,
  };
});

const existing = [
  'software engineer', 'marketing manager', 'nurse', 'teacher', 'data analyst',
  'project manager', 'graphic designer', 'sales representative', 'accountant',
  'administrative assistant', 'customer service', 'web developer', 'product manager',
  'human resources', 'financial analyst', 'mechanical engineer', 'executive assistant',
  'business analyst', 'ux designer', 'data scientist'
];

// === SECTION 1: COMPETITION BREAKDOWN ===
console.log('========================================');
console.log('  FULL KEYWORD DATASET ANALYSIS');
console.log('========================================\n');

const byComp = { Low: [], Medium: [], High: [], Unknown: [] };
rows.forEach(r => { (byComp[r.competition] || byComp['Unknown']).push(r); });

console.log('--- COMPETITION BREAKDOWN (ALL 1,571 KEYWORDS) ---\n');
Object.entries(byComp).forEach(([comp, kws]) => {
  const totalVol = kws.reduce((s, k) => s + k.volume, 0);
  const withCPC = kws.filter(k => k.bidHigh > 0);
  const avgCPC = withCPC.length > 0 ? withCPC.reduce((s, k) => s + k.bidHigh, 0) / withCPC.length : 0;
  console.log(comp.padEnd(8) + ' | ' + String(kws.length).padStart(5) + ' keywords | ' + String(totalVol).padStart(12) + ' total vol | Avg CPC: $' + avgCPC.toFixed(2));
});

// === SECTION 2: VOLUME x COMPETITION MATRIX ===
console.log('\n\n--- VOLUME x COMPETITION MATRIX ---\n');
const volBuckets = [
  { label: '500K+', min: 500000 },
  { label: '50K', min: 50000, max: 499999 },
  { label: '5K', min: 5000, max: 49999 },
  { label: '500', min: 500, max: 4999 },
  { label: '<500', min: 0, max: 499 },
];

console.log('Volume    | Low    | Medium  | High   | Total');
console.log('-'.repeat(55));
volBuckets.forEach(b => {
  const inBucket = rows.filter(r => r.volume >= b.min && (!b.max || r.volume <= b.max));
  const low = inBucket.filter(r => r.competition === 'Low').length;
  const med = inBucket.filter(r => r.competition === 'Medium').length;
  const high = inBucket.filter(r => r.competition === 'High').length;
  console.log(b.label.padEnd(10) + '| ' + String(low).padEnd(7) + '| ' + String(med).padEnd(8) + '| ' + String(high).padEnd(7) + '| ' + inBucket.length);
});

// === SECTION 3: FILTER TO JOB-SPECIFIC KEYWORDS ===
function isJobResumeKeyword(kw) {
  const k = kw.toLowerCase();
  if (!(k.includes('resume') || k.includes('cv'))) return false;
  const excludeTerms = ['template', 'format', 'free', 'google', 'word', 'canva',
    'indeed', 'microsoft', 'builder', 'maker', 'download', 'online', 'ats',
    'cover letter', 'sample resume', 'resume example', 'cv example', 'cv sample',
    'simple', 'professional', 'modern', 'best', 'good', 'great', 'perfect',
    'basic', 'blank', 'creative', 'easy', 'pdf', 'write', 'europass',
    'overleaf', 'canadian', 'federal', 'chronological', 'functional',
    'student', 'fresher', 'first job', 'no experience', 'internship',
    '2022', '2023', '2024', 'college', 'entry level', 'academic',
    'tips', 'ideas', 'design', 'layout', 'pattern', 'model', 'outline',
    'highlights', 'introduction', 'reference', 'letter',
    'application', 'bio', 'curriculum', 'seek', 'linkedin',
    'english', 'bad', 'strong', 'detailed', 'personal', 'general',
    'work resume', 'job resume', 'new grad', 'work from home', 'self employed',
    'internal', 'military', 'government', 'usajobs', 'sample of', 'example of',
    'for job', 'for freshers', 'for students', 'for experienced',
    'coaching', 'editing', 'create', 'cover page',
    'website', 'working experience', 'work experience', 'resume e '];
  return !excludeTerms.some(t => k.includes(t));
}

function isAlreadyCovered(kw) {
  const k = kw.toLowerCase();
  return existing.some(page => k.includes(page.toLowerCase()));
}

const jobKeywords = rows.filter(r => isJobResumeKeyword(r.keyword) && !isAlreadyCovered(r.keyword) && r.volume >= 500);

// Group similar keywords by extracted job title
const jobGroups = {};
jobKeywords.forEach(r => {
  let title = r.keyword.toLowerCase()
    .replace(/\b(resume|cv|examples?|samples?|for|with|in|and|the|a|an|of|to)\b/g, '')
    .replace(/\s+/g, ' ').trim();
  if (title.length < 3) return;

  if (!jobGroups[title]) {
    jobGroups[title] = { keywords: [], totalVolume: 0, bestComp: 'High', bestCompIndex: 100 };
  }
  jobGroups[title].keywords.push(r);
  jobGroups[title].totalVolume += r.volume;
  if (r.compIndex < jobGroups[title].bestCompIndex) {
    jobGroups[title].bestComp = r.competition;
    jobGroups[title].bestCompIndex = r.compIndex;
  }
});

const groups = Object.entries(jobGroups)
  .map(([title, data]) => ({ title, ...data }))
  .filter(g => g.totalVolume >= 500)
  .sort((a, b) => b.totalVolume - a.totalVolume);

// === SECTION 4: STRATEGY COMPARISON ===
console.log('\n\n--- STRATEGY COMPARISON ---\n');

const lowOnly = groups.filter(g => g.bestComp === 'Low');
const lowVolume = lowOnly.reduce((s, g) => s + g.totalVolume, 0);

const lowMed = groups.filter(g => g.bestComp === 'Low' || g.bestComp === 'Medium');
const lowMedVolume = lowMed.reduce((s, g) => s + g.totalVolume, 0);

const highOnly = groups.filter(g => g.bestComp === 'High');
const highVolume = highOnly.reduce((s, g) => s + g.totalVolume, 0);
const allVolume = groups.reduce((s, g) => s + g.totalVolume, 0);

console.log('Strategy A (Low only):     ' + String(lowOnly.length).padStart(4) + ' pages | ' + String(lowVolume).padStart(10) + ' monthly searches');
console.log('Strategy B (Low + Medium): ' + String(lowMed.length).padStart(4) + ' pages | ' + String(lowMedVolume).padStart(10) + ' monthly searches');
console.log('Strategy C (All):          ' + String(groups.length).padStart(4) + ' pages | ' + String(allVolume).padStart(10) + ' monthly searches');

console.log('\n--- WHY LOW + MEDIUM IS THE SWEET SPOT ---');
console.log('Low competition    = rank in weeks (new site can win)');
console.log('Medium competition = rank in 1-3 months (good content wins)');
console.log('High competition   = needs backlinks + authority (3-6+ months)');
if (lowVolume > 0) {
  console.log('\nAdding Medium gives ' + (lowMed.length - lowOnly.length) + ' extra pages and ' + (lowMedVolume - lowVolume) + ' more monthly searches');
  console.log('That is ' + Math.round((lowMedVolume - lowVolume) / lowVolume * 100) + '% more traffic for ' + Math.round((lowMed.length - lowOnly.length) / lowOnly.length * 100) + '% more pages');
}

// === SECTION 5: FULL BUILD LIST (LOW + MEDIUM) ===
console.log('\n\n========================================');
console.log('  MASTER BUILD LIST: LOW + MEDIUM');
console.log('========================================\n');

console.log('#'.padStart(4) + '  ' + 'Vol'.padStart(7) + '  ' + 'Comp'.padEnd(7) + ' CI  Page/Job Title');
console.log('-'.repeat(75));

lowMed.forEach((g, i) => {
  console.log(
    String(i + 1).padStart(4) + '  ' +
    String(g.totalVolume).padStart(7) + '  ' +
    g.bestComp.padEnd(7) + ' ' +
    String(g.bestCompIndex).padStart(3) + '  ' +
    g.title
  );
});

// === SECTION 6: HIGH COMP (LATER) ===
console.log('\n\n--- HIGH COMPETITION (build later) ---\n');
console.log('#'.padStart(4) + '  ' + 'Vol'.padStart(7) + '  CI  Job Title');
console.log('-'.repeat(50));
highOnly.forEach((g, i) => {
  console.log(
    String(i + 1).padStart(4) + '  ' +
    String(g.totalVolume).padStart(7) + '  ' +
    String(g.bestCompIndex).padStart(3) + '  ' +
    g.title
  );
});

console.log('\n\n========================================');
console.log('  GRAND TOTAL');
console.log('========================================');
console.log('Already built:         20 pages');
console.log('Low+Med to build:      ' + lowMed.length + ' pages');
console.log('High (later):          ' + highOnly.length + ' pages');
console.log('Grand total:           ' + (20 + groups.length) + ' resume example pages');
console.log('Total search volume:   ' + allVolume.toLocaleString() + '/month (new pages only)');
