/**
 * Indonesian (id) blog content — aggregator
 * Combines all Indonesian blog topic parts into a single export.
 *
 * Keyword-optimized: template cv gratis (50K), buat cv online gratis (50K),
 * template surat lamaran kerja (50K), cv ats (5K),
 * pembuat cv (500), form curriculum vitae (50K)
 */
import { TOPICS_PART1 } from './blog-id-part1.mjs';
import { TOPICS_PART2 } from './blog-id-part2.mjs';
import { TOPICS_PART3 } from './blog-id-part3.mjs';
import { TOPICS_PART4 } from './blog-id-part4.mjs';
import { TOPICS_PART5 } from './blog-id-part5.mjs';
import { TOPICS_PART6 } from './blog-id-part6.mjs';
import { TOPICS_PART7 } from './blog-id-part7.mjs';
import { TOPICS_PART8 } from './blog-id-part8.mjs';

export const CONFIG = {
  author: 'Rina Kusuma',
  authorBio: 'Konsultan karier dan spesialis penulisan CV dengan pengalaman lebih dari 10 tahun membantu para profesional Indonesia mendapatkan pekerjaan impian mereka. Berpengalaman dalam penulisan CV yang efektif, strategi pencarian kerja, dan pengembangan karier di pasar kerja Indonesia.',
  date: '2026-03-04',
};

export const TOPICS = [
  ...TOPICS_PART1,
  ...TOPICS_PART2,
  ...TOPICS_PART3,
  ...TOPICS_PART4,
  ...TOPICS_PART5,
  ...TOPICS_PART6,
  ...TOPICS_PART7,
  ...TOPICS_PART8,
];
