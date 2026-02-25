/**
 * Arabic (ar) blog content — aggregator
 * Combines all Arabic blog topic parts into a single export.
 */
import { TOPICS_PART1 } from './blog-ar-part1.mjs';
import { TOPICS_PART2 } from './blog-ar-part2.mjs';
import { TOPICS_PART3 } from './blog-ar-part3.mjs';
import { TOPICS_PART4 } from './blog-ar-part4.mjs';
import { TOPICS_PART5 } from './blog-ar-part5.mjs';
import { TOPICS_PART6 } from './blog-ar-part6.mjs';
import { TOPICS_PART7 } from './blog-ar-part7.mjs';
import { TOPICS_PART8 } from './blog-ar-part8.mjs';

export const CONFIG = {
  author: 'أحمد حسن',
  authorBio: 'خبير توظيف واستشاري مهني بخبرة تزيد عن 10 سنوات في سوق العمل العربي. متخصص في كتابة السير الذاتية الاحترافية واستراتيجيات التوظيف في منطقة الشرق الأوسط وشمال أفريقيا.',
  date: '2026-02-26',
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
