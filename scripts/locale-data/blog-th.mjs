/**
 * Thai (th) blog content — aggregator
 * Combines all Thai blog topic parts into a single export.
 *
 * Keyword-optimized: ตัวอย่างจดหมาย (5K), จดหมายสมัครงาน (5K),
 * การเขียนจดหมาย (5K), เทมเพลตเรซูเม่ (500), ทํา cv สมัครงาน (500),
 * เมลสมัครงาน (500), เขียนจดหมายสมัครงาน (500)
 */
import { TOPICS_PART1 } from './blog-th-part1.mjs';
import { TOPICS_PART2 } from './blog-th-part2.mjs';
import { TOPICS_PART3 } from './blog-th-part3.mjs';
import { TOPICS_PART4 } from './blog-th-part4.mjs';
import { TOPICS_PART5 } from './blog-th-part5.mjs';
import { TOPICS_PART6 } from './blog-th-part6.mjs';
import { TOPICS_PART7 } from './blog-th-part7.mjs';
import { TOPICS_PART8 } from './blog-th-part8.mjs';

export const CONFIG = {
  author: 'สมฤดี วงศ์สุวรรณ',
  authorBio: 'ผู้เชี่ยวชาญด้านการพัฒนาอาชีพและการเขียนเรซูเม่ ประสบการณ์กว่า 10 ปีในตลาดแรงงานไทย ช่วยผู้สมัครงานหลายพันคนผ่านขั้นตอนคัดกรองเอกสารสมัครงาน',
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
