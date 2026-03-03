/**
 * Turkish (tr) blog locale data — aggregator
 * Imports all 8 parts (74 topics total) and exports CONFIG + TOPICS
 *
 * Part 1 (9):  CV Writing & Format
 * Part 2 (10): Templates & Tools
 * Part 3 (9):  Resume Types & Formats
 * Part 4 (10): Job Search & Interview
 * Part 5 (9):  Professional Sectors & Career Development
 * Part 6 (9):  Career Documents & Letters
 * Part 7 (9):  Advanced Topics & Best Practices
 * Part 8 (9):  Turkey-Specific + Remaining Topics
 */

import { TOPICS_PART1 } from './blog-tr-part1.mjs';
import { TOPICS_PART2 } from './blog-tr-part2.mjs';
import { TOPICS_PART3 } from './blog-tr-part3.mjs';
import { TOPICS_PART4 } from './blog-tr-part4.mjs';
import { TOPICS_PART5 } from './blog-tr-part5.mjs';
import { TOPICS_PART6 } from './blog-tr-part6.mjs';
import { TOPICS_PART7 } from './blog-tr-part7.mjs';
import { TOPICS_PART8 } from './blog-tr-part8.mjs';

export const CONFIG = {
  author: 'Elif Yılmaz',
  authorBio:
    'Elif Yılmaz, 12 yılı aşkın deneyime sahip kariyer danışmanı ve CV uzmanıdır. Türkiye\'nin önde gelen teknoloji şirketleri ve uluslararası kuruluşlarda İK departmanlarıyla çalışmış; binlerce profesyonelin kariyer geçişlerinde ve iş arayış süreçlerinde rehberlik etmiştir. LinkedIn sertifikalı kariyer koçu olan Elif, CV optimizasyonu, mülakat hazırlığı ve Türk iş piyasası dinamikleri konularında uzmanlaşmıştır.',
  date: '2026-03-01',
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
