#!/usr/bin/env node
/**
 * Fetch Article Images from Pexels
 *
 * This script finds all articles with missing/duplicate images and fetches
 * UNIQUE images from Pexels API for each article.
 *
 * Usage:
 *   node scripts/fetch-article-images.mjs           # List articles needing images
 *   node scripts/fetch-article-images.mjs --fetch   # Download unique images
 *   node scripts/fetch-article-images.mjs --refetch # Re-download ALL with unique images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIR = path.join(__dirname, '../frontend');
const CONTENT_DIR = path.join(FRONTEND_DIR, 'content');
const PUBLIC_DIR = path.join(FRONTEND_DIR, 'public');

// Load environment variables
const envPath = path.join(FRONTEND_DIR, '.env.local');
let PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/PEXELS_API_KEY=(.+)/);
  if (match) {
    PEXELS_API_KEY = match[1].trim();
  }
}

// UNIQUE queries for each article to get different images
const UNIQUE_QUERIES = {
  // Blog posts - each with a unique, specific query
  'ai-ml-resume-guide': 'artificial intelligence machine learning technology',
  'ai-prompts-resume-writing': 'ai chatbot writing assistant laptop',
  'ats-parse-rate-meaning': 'computer screen data analysis software',
  'best-ai-resume-maker-tools': 'digital tools apps smartphone productivity',
  'best-resume-builder-apps': 'mobile app design interface modern',
  'best-resume-fonts-2026': 'typography letters design creative',
  'best-resume-writing-services': 'professional consultant meeting client',
  'canva-ai-resume-builder-guide': 'graphic design creative workspace colorful',
  'chatgpt-vs-claude-for-resumes': 'robot ai comparison technology futuristic',
  'chronological-resume-format': 'timeline calendar planning organized',
  'how-to-email-resume': 'email laptop sending message communication',
  'how-to-list-projects-on-resume': 'project portfolio work samples showcase',
  'how-to-list-remote-work-on-resume': 'home office remote work laptop cozy',
  'how-to-list-skills-on-resume': 'skills abilities checklist competency',
  'how-to-write-a-resume': 'writing document desk pen paper',
  'how-to-write-cover-letter': 'letter writing envelope professional',
  'how-to-write-professional-summary': 'executive summary business briefing',
  'how-to-write-student-resume': 'university student graduation campus',
  'indeed-resume-tips': 'job search online platform website',
  'japanese-resume-maker': 'japan tokyo business culture professional',
  'linkedin-profile-optimization': 'linkedin social media networking professional',
  'resume-action-verbs': 'action words powerful speech vocabulary',
  'resume-builder-word-template': 'microsoft word document template office',
  'resume-for-career-change': 'career transition change direction compass',
  'resume-gap-explanation-examples': 'gap bridge connection problem solving',
  'resume-keywords-by-industry': 'keywords tags search optimization',
  'resume-length-guide': 'measuring tape length size document',
  'resume-maker-google-docs': 'google workspace cloud document collaboration',
  'resume-objective-vs-summary': 'comparison choice decision options',
  'resume-paper-printing-tips': 'printer paper quality printing office',
  'resume-vs-cv-difference': 'documents comparison side by side',
  'resume-with-1-year-experience': 'young professional first job entry level',
  'salary-negotiation-tips': 'negotiation handshake business deal money',
  'simple-resume-format-freshers': 'fresh graduate new beginning start',
  'what-is-ats-guide': 'applicant tracking system hr software screen',

  // Career tips
  'ai-engineer-resume': 'artificial intelligence engineer coding robot',
  'ai-ml-engineer-resume': 'machine learning data science neural network',
  'ai-product-manager-resume': 'product manager roadmap strategy planning',
  'ai-resume-tools': 'ai tools technology automation futuristic',
  'resume-bullet-points-ai': 'bullet points list achievements success',
};

// Fallback queries by category if slug not found
const CATEGORY_QUERIES = [
  'professional workspace modern office',
  'business meeting corporate teamwork',
  'laptop work productivity desk',
  'career success achievement celebration',
  'job interview preparation confident',
  'document writing professional desk',
  'technology innovation digital transformation',
  'team collaboration brainstorming ideas',
  'graduation career beginning future',
  'professional development growth learning',
];

function getUniqueQuery(slug, index) {
  // First try specific query for this slug
  if (UNIQUE_QUERIES[slug]) {
    return UNIQUE_QUERIES[slug];
  }
  // Fallback to rotating category queries
  return CATEGORY_QUERIES[index % CATEGORY_QUERIES.length];
}

function findArticlesNeedingImages(refetch = false) {
  const articles = [];
  const contentDirs = ['blog', 'career-tips'];
  const seenImages = new Set();

  for (const dir of contentDirs) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      const imageMatch = content.match(/^image:\s*['"]?([^'"\n]+)['"]?/m);
      if (!imageMatch) continue;

      const imagePath = imageMatch[1].trim();
      const fullImagePath = path.join(PUBLIC_DIR, imagePath);
      const slugMatch = content.match(/^slug:\s*['"]?([^'"\n]+)['"]?/m);
      const slug = slugMatch ? slugMatch[1].trim() : file.replace('.mdx', '');

      // Skip SVG files (custom illustrations)
      if (imagePath.endsWith('.svg')) continue;

      const needsImage = refetch || !fs.existsSync(fullImagePath) || seenImages.has(imagePath);

      if (needsImage) {
        articles.push({
          file: path.join(dir, file),
          slug,
          currentImage: imagePath,
          query: getUniqueQuery(slug, articles.length),
        });
      }

      seenImages.add(imagePath);
    }
  }

  return articles;
}

async function searchPexels(query, page = 1) {
  return new Promise((resolve, reject) => {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&page=${page}&orientation=landscape`;

    const options = {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.photos || []);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const download = (imageUrl) => {
      https.get(imageUrl, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          download(response.headers.location);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }

        const file = fs.createWriteStream(destPath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', (err) => {
          fs.unlink(destPath, () => {});
          reject(err);
        });
      }).on('error', reject);
    };

    download(url);
  });
}

// Track used photo IDs to avoid duplicates
const usedPhotoIds = new Set();

async function getUniquePhoto(query) {
  const photos = await searchPexels(query);

  // Find a photo we haven't used yet
  for (const photo of photos) {
    if (!usedPhotoIds.has(photo.id)) {
      usedPhotoIds.add(photo.id);
      return photo;
    }
  }

  // If all photos from first page are used, try page 2
  const morePhotos = await searchPexels(query, 2);
  for (const photo of morePhotos) {
    if (!usedPhotoIds.has(photo.id)) {
      usedPhotoIds.add(photo.id);
      return photo;
    }
  }

  // Last resort: return first photo even if duplicate
  return photos[0] || null;
}

async function main() {
  const args = process.argv.slice(2);
  const shouldFetch = args.includes('--fetch');
  const refetch = args.includes('--refetch');

  console.log('🔍 Scanning for articles needing unique images...\n');

  const articles = findArticlesNeedingImages(refetch);

  if (articles.length === 0) {
    console.log('✅ All articles have unique images!');
    return;
  }

  console.log(`Found ${articles.length} articles needing images:\n`);
  console.log('─'.repeat(80));

  for (const item of articles) {
    console.log(`📄 ${item.file}`);
    console.log(`   Query: "${item.query}"`);
  }

  if (!shouldFetch && !refetch) {
    console.log('\n' + '─'.repeat(80));
    console.log('\nTo fetch unique images, run:');
    console.log('  node scripts/fetch-article-images.mjs --refetch\n');
    return;
  }

  if (!PEXELS_API_KEY) {
    console.error('❌ PEXELS_API_KEY not found!');
    process.exit(1);
  }

  console.log('\n' + '─'.repeat(80));
  console.log('\n📥 Fetching UNIQUE images from Pexels...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const item of articles) {
    try {
      console.log(`Searching for: "${item.query}"...`);
      const photo = await getUniquePhoto(item.query);

      if (!photo) {
        console.log(`   ⚠️  No results found for ${item.slug}`);
        errorCount++;
        continue;
      }

      const newFileName = `${item.slug}.jpg`;
      const newPath = `/blog/${newFileName}`;
      const fullPath = path.join(PUBLIC_DIR, 'blog', newFileName);

      console.log(`   📷 ID: ${photo.id} - ${photo.alt || 'image'}`);
      console.log(`   👤 By: ${photo.photographer}`);

      const imageUrl = photo.src.large2x || photo.src.large;
      await downloadImage(imageUrl, fullPath);
      console.log(`   ✅ Downloaded: ${newPath}`);

      // Update MDX file
      const mdxPath = path.join(CONTENT_DIR, item.file);
      let mdxContent = fs.readFileSync(mdxPath, 'utf-8');
      mdxContent = mdxContent.replace(
        /^image:\s*['"]?[^'"\n]+['"]?/m,
        `image: ${newPath}`
      );
      fs.writeFileSync(mdxPath, mdxContent);
      successCount++;

      console.log('');
      await new Promise(r => setTimeout(r, 300));
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      errorCount++;
    }
  }

  console.log('─'.repeat(80));
  console.log(`\n✅ Done! Success: ${successCount}, Errors: ${errorCount}`);
}

main().catch(console.error);
