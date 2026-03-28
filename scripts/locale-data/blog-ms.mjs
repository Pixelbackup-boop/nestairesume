/**
 * Malay (ms) blog content — aggregator
 * Combines all Malay blog topic parts into a single export.
 *
 * Keyword-optimized: contoh resume (resume example), cara buat resume (how to make resume),
 * resume template, surat iringan (cover letter), tips temuduga (interview tips)
 */
import { TOPICS_PART1 } from './blog-ms-part1.mjs';
import { TOPICS_PART2 } from './blog-ms-part2.mjs';
import { TOPICS_PART3 } from './blog-ms-part3.mjs';
import { TOPICS_PART4 } from './blog-ms-part4.mjs';
import { TOPICS_PART5 } from './blog-ms-part5.mjs';
import { TOPICS_PART6 } from './blog-ms-part6.mjs';
import { TOPICS_PART7 } from './blog-ms-part7.mjs';
import { TOPICS_PART8 } from './blog-ms-part8.mjs';

export const CONFIG = {
  author: 'Nurul Aisyah',
  authorBio: 'Pakar penulisan resume dan surat iringan dengan pengalaman lebih 10 tahun membantu pencari kerja di Malaysia. Berpengalaman dalam strategi pencarian kerja, temuduga, dan pembangunan kerjaya di pasaran kerja Malaysia dan Asia Tenggara.',
  date: '2026-03-27',
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
