/**
 * Korean (ko) blog content — aggregator
 * Combines all Korean blog topic parts into a single export.
 *
 * Keyword-optimized: 이력서 쓰는 법 (5K), 이력서 템플릿 (5K),
 * 커버 레터 (5K), 자소서 샘플 (500), AI 이력서 (500), 영문 이력서 (500)
 */
import { TOPICS_PART1 } from './blog-ko-part1.mjs';
import { TOPICS_PART2 } from './blog-ko-part2.mjs';
import { TOPICS_PART3 } from './blog-ko-part3.mjs';
import { TOPICS_PART4 } from './blog-ko-part4.mjs';
import { TOPICS_PART5 } from './blog-ko-part5.mjs';
import { TOPICS_PART6 } from './blog-ko-part6.mjs';
import { TOPICS_PART7 } from './blog-ko-part7.mjs';
import { TOPICS_PART8 } from './blog-ko-part8.mjs';

export const CONFIG = {
  author: '김서연',
  authorBio: '이력서·자기소개서 작성 전문 컨설턴트. 10년 이상 한국 취업 시장에서 수천 명의 구직자를 지원하며 서류 전형 통과율을 높이는 전략을 연구해 왔습니다.',
  date: '2026-03-03',
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
