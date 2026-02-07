import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const matter = require(path.join(process.cwd(), 'frontend/node_modules/gray-matter'));

function fixTitle(title, type) {
  const len = title.length;
  if (len >= 50 && len <= 60) return null; // already OK

  if (type === 'resume') {
    // Pattern: "X Resume: Examples & Writing Guide 2026" or "X Resume Example & Writing Guide 2026"
    // For short titles (under 50): expand
    // For long titles (over 60): shorten

    if (len < 50) {
      // Try replacing "Examples & Writing Guide" with "Example & Writing Guide (2026)"
      // Or add "Example" before & Writing Guide
      // Common patterns:
      // "Baker Resume: Examples & Writing Guide 2026" [44] → too short
      // Strategy: Add descriptor words

      // Try "X Resume Example: Writing Guide & Tips 2026"
      let newTitle = title;

      // If has "Examples & Writing Guide 2026"
      if (title.includes('Examples & Writing Guide 2026')) {
        newTitle = title.replace('Examples & Writing Guide 2026', 'Examples, Templates & Writing Guide 2026');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

        // Try another approach
        newTitle = title.replace('Examples & Writing Guide 2026', 'Example & Complete Writing Guide 2026');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

        // Try shorter addition
        newTitle = title.replace('Examples & Writing Guide 2026', 'Examples & Tips for Writing Guide 2026');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

        newTitle = title.replace('Examples & Writing Guide 2026', 'Examples, Tips & Writing Guide 2026');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

        // Try "Resume Example & Writing Guide" → "Resume: Examples & Complete Guide 2026"
        newTitle = title.replace('Examples & Writing Guide 2026', 'Examples & Resume Writing Guide 2026');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

        newTitle = title.replace(': Examples & Writing Guide 2026', ' Resume: Examples & Writing Tips 2026');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

        // Last resort: add "Best" or "Top" at start
        newTitle = title.replace(': Examples', ': Top Examples');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;
      }

      if (title.includes('Example & Writing Guide 2026')) {
        newTitle = title.replace('Example & Writing Guide 2026', 'Example & Complete Writing Guide 2026');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

        newTitle = title.replace('Example & Writing Guide 2026', 'Example, Template & Writing Guide 2026');
        if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;
      }

      // Generic: just can't fix automatically
      return null;
    }

    if (len > 60) {
      let newTitle = title;

      // Try removing "Examples & " from "Examples & Writing Guide 2026"
      newTitle = title.replace('Resume: Examples & Writing Guide 2026', 'Resume: Writing Guide & Examples 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      // Try shortening "Example & Writing Guide" to "Resume Guide"
      newTitle = title.replace('Resume Example & Writing Guide 2026', 'Resume: Example & Guide 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace('Resume: Examples & Writing Guide 2026', 'Resume: Example & Guide 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      // Try "Resume Example & Writing Guide" → "Resume Guide & Examples"
      newTitle = title.replace('Resume: Examples & Writing Guide 2026', 'Resume Guide & Examples 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace('Resume Example & Writing Guide 2026', 'Resume Guide & Example 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      // Drop "& Writing Guide"
      newTitle = title.replace(': Examples & Writing Guide 2026', ': Examples & Tips 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace(' Example & Writing Guide 2026', ': Resume Example & Tips 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace(': Examples & Writing Guide 2026', ' Resume Examples 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      // Try removing "2026" and just trimming
      newTitle = title.replace(' & Writing Guide', '');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      return null;
    }
  }

  if (type === 'cover-letter') {
    if (len < 50) {
      let newTitle = title;
      newTitle = title.replace('Example & Writing Guide 2026', 'Example & Complete Writing Guide 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace('Example & Writing Guide 2026', 'Example, Template & Writing Guide 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace(': Example & Writing', ': Top Example & Writing');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      return null;
    }

    if (len > 60) {
      let newTitle = title;

      // Cover letters: "X Cover Letter Example & Writing Guide 2026"
      // Try shortening
      newTitle = title.replace('Cover Letter Example & Writing Guide 2026', 'Cover Letter: Example & Guide 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace('Cover Letter Example & Writing Guide 2026', 'Cover Letter Example & Tips 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace('Cover Letter Example & Writing Guide 2026', 'Cover Letter: Guide & Example 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace(' Example & Writing Guide 2026', ': Example & Guide 2026');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      newTitle = title.replace(' Example & Writing Guide', ': Example & Tips');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;

      return null;
    }
  }

  if (type === 'career-tips') {
    if (len < 50) {
      let newTitle = title;
      // Add descriptors
      newTitle = title.replace('(2026 Guide)', '(Complete 2026 Guide)');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;
      newTitle = title.replace('(2026 Guide)', '- Complete Guide (2026)');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;
      return null;
    }
    if (len > 60) {
      // Shorten
      let newTitle = title.replace('Pass Automated Screening in 5 Minutes', 'Pass ATS Screening');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;
      newTitle = title.replace('Write a Winning Letter in 15 Minutes', 'Write a Winning Letter');
      if (newTitle.length >= 50 && newTitle.length <= 60) return newTitle;
      return null;
    }
  }

  return null;
}

function verifyTags0(title, tags) {
  if (!tags || !tags[0]) return true;
  const tag0 = tags[0].toLowerCase();
  const tagWords = tag0.split(/\s+/).filter(w => w.length > 1);
  const titleLower = title.toLowerCase();
  return tagWords.every(w => titleLower.includes(w));
}

function processDir(dir, type) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  let fixed = 0, skipped = 0, alreadyOk = 0, tagFail = 0;

  for (const f of files) {
    const filePath = path.join(dir, f);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const len = data.title.length;

    if (len >= 50 && len <= 60) { alreadyOk++; continue; }

    const newTitle = fixTitle(data.title, type);
    if (!newTitle) {
      skipped++;
      continue;
    }

    if (!verifyTags0(newTitle, data.tags)) {
      tagFail++;
      console.log('  TAG FAIL: [' + newTitle.length + '] ' + f + ': ' + newTitle);
      continue;
    }

    data.title = newTitle;
    fs.writeFileSync(filePath, matter.stringify(content, data));
    fixed++;
  }

  console.log(type + ': fixed=' + fixed + ', skipped=' + skipped + ', tagFail=' + tagFail + ', ok=' + alreadyOk);
  return { fixed, skipped };
}

// Process all content directories
const dirs = [
  { dir: path.join(process.cwd(), 'frontend/content/resume-examples'), type: 'resume' },
  { dir: path.join(process.cwd(), 'frontend/content/cover-letter-examples'), type: 'cover-letter' },
  { dir: path.join(process.cwd(), 'frontend/content/career-tips'), type: 'career-tips' },
];

let totalFixed = 0;
for (const { dir, type } of dirs) {
  try {
    const r = processDir(dir, type);
    totalFixed += r.fixed;
  } catch (e) {
    console.log(type + ': directory not found or error');
  }
}

console.log('\nTotal fixed: ' + totalFixed);

// Final audit
console.log('\n=== FINAL AUDIT ===');
for (const { dir, type } of dirs) {
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
    let under = 0, over = 0, ok = 0;
    for (const f of files) {
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      const len = data.title.length;
      if (len < 50) under++;
      else if (len > 60) over++;
      else ok++;
    }
    console.log(type + ': ' + files.length + ' files — OK: ' + ok + ', Under: ' + under + ', Over: ' + over);
  } catch (e) {}
}
