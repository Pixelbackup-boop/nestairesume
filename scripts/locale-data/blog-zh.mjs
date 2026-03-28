/**
 * Chinese Simplified (zh) blog content — aggregator
 * Combines all Chinese blog topic parts into a single export.
 *
 * Keyword-optimized: 简历怎么写 (how to write resume), 简历模板 (resume template),
 * 求职信 (cover letter), 面试技巧 (interview tips), AI简历 (AI resume)
 */
import { TOPICS_PART1 } from './blog-zh-part1.mjs';
import { TOPICS_PART2 } from './blog-zh-part2.mjs';
import { TOPICS_PART3 } from './blog-zh-part3.mjs';
import { TOPICS_PART4 } from './blog-zh-part4.mjs';
import { TOPICS_PART5 } from './blog-zh-part5.mjs';
import { TOPICS_PART6 } from './blog-zh-part6.mjs';
import { TOPICS_PART7 } from './blog-zh-part7.mjs';
import { TOPICS_PART8 } from './blog-zh-part8.mjs';

export const CONFIG = {
  author: '李明辉',
  authorBio: '简历与求职信撰写资深顾问，拥有十余年中国就业市场经验，曾帮助数千名求职者优化简历、提升面试通过率，专注于AI智能简历与ATS优化策略研究。',
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
