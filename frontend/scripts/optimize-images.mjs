#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts JPG/PNG images to WebP format with compression
 *
 * Usage: node scripts/optimize-images.mjs [--dry-run] [--quality=80]
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public');

// Configuration
const CONFIG = {
  quality: parseInt(process.argv.find(a => a.startsWith('--quality='))?.split('=')[1] || '80'),
  dryRun: process.argv.includes('--dry-run'),
  deleteOriginals: process.argv.includes('--delete-originals'),
  // Directories to process
  directories: ['Img', 'images', 'blog', 'templates'],
  // File extensions to convert
  extensions: ['.jpg', '.jpeg', '.png'],
  // Skip files smaller than this (already optimized)
  minSizeBytes: 10 * 1024, // 10 KB
  // Max dimensions (resize if larger)
  maxWidth: 1920,
  maxHeight: 1920,
};

// Stats tracking
const stats = {
  processed: 0,
  skipped: 0,
  failed: 0,
  originalSize: 0,
  newSize: 0,
  savings: 0,
};

/**
 * Get all image files recursively
 */
async function getImageFiles(dir) {
  const files = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...await getImageFiles(fullPath));
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (CONFIG.extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return files;
}

/**
 * Convert a single image to WebP
 */
async function convertImage(inputPath) {
  const ext = path.extname(inputPath);
  const outputPath = inputPath.replace(ext, '.webp');
  const relativePath = path.relative(PUBLIC_DIR, inputPath);

  try {
    // Get original file stats
    const originalStats = await fs.stat(inputPath);
    const originalSize = originalStats.size;

    // Skip small files (likely already optimized)
    if (originalSize < CONFIG.minSizeBytes) {
      console.log(`⏭️  Skip (small): ${relativePath} (${formatBytes(originalSize)})`);
      stats.skipped++;
      return null;
    }

    // Check if WebP already exists and is newer
    try {
      const webpStats = await fs.stat(outputPath);
      if (webpStats.mtime > originalStats.mtime) {
        console.log(`⏭️  Skip (exists): ${relativePath}`);
        stats.skipped++;
        return null;
      }
    } catch {
      // WebP doesn't exist, continue
    }

    if (CONFIG.dryRun) {
      console.log(`🔍 Would convert: ${relativePath} (${formatBytes(originalSize)})`);
      stats.processed++;
      stats.originalSize += originalSize;
      return { input: inputPath, output: outputPath, originalSize, newSize: Math.round(originalSize * 0.3) };
    }

    // Read and process image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if too large
    let pipeline = image;
    if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
      pipeline = pipeline.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Convert to WebP
    await pipeline
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);

    // Get new file stats
    const newStats = await fs.stat(outputPath);
    const newSize = newStats.size;
    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    // Update stats
    stats.processed++;
    stats.originalSize += originalSize;
    stats.newSize += newSize;
    stats.savings += savings;

    console.log(`✅ ${relativePath}`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (-${savingsPercent}%)`);

    // Delete original if requested
    if (CONFIG.deleteOriginals) {
      await fs.unlink(inputPath);
      console.log(`   🗑️  Deleted original`);
    }

    return { input: inputPath, output: outputPath, originalSize, newSize, savings };
  } catch (error) {
    console.error(`❌ Failed: ${relativePath} - ${error.message}`);
    stats.failed++;
    return null;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🖼️  Image Optimization Script');
  console.log('================================');
  console.log(`Quality: ${CONFIG.quality}`);
  console.log(`Dry run: ${CONFIG.dryRun}`);
  console.log(`Delete originals: ${CONFIG.deleteOriginals}`);
  console.log(`Max dimensions: ${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
  console.log('');

  // Collect all images
  const allImages = [];
  for (const dir of CONFIG.directories) {
    const dirPath = path.join(PUBLIC_DIR, dir);
    try {
      await fs.access(dirPath);
      const images = await getImageFiles(dirPath);
      allImages.push(...images);
      console.log(`📁 ${dir}/: ${images.length} images`);
    } catch {
      console.log(`📁 ${dir}/: (not found)`);
    }
  }

  console.log(`\n📊 Total images to process: ${allImages.length}\n`);

  if (allImages.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  // Process images
  console.log('Processing images...\n');

  for (const imagePath of allImages) {
    await convertImage(imagePath);
  }

  // Print summary
  console.log('\n================================');
  console.log('📊 Summary');
  console.log('================================');
  console.log(`✅ Processed: ${stats.processed}`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`❌ Failed: ${stats.failed}`);
  console.log('');
  console.log(`📦 Original size: ${formatBytes(stats.originalSize)}`);
  console.log(`📦 New size: ${formatBytes(stats.newSize)}`);
  console.log(`💾 Total savings: ${formatBytes(stats.savings)} (${((stats.savings / stats.originalSize) * 100).toFixed(1)}%)`);

  if (CONFIG.dryRun) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to actually convert images.');
  }

  if (!CONFIG.deleteOriginals && !CONFIG.dryRun) {
    console.log('\n💡 Tip: Run with --delete-originals to remove original files after conversion.');
    console.log('   Make sure to update your code to use .webp extensions first!');
  }
}

main().catch(console.error);
