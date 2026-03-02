/**
 * Vietnamese (vi) blog content — aggregator
 * Combines all Vietnamese blog topic parts into a single export.
 *
 * Keyword-optimized: tạo cv (50K), mẫu cv (50K), cv xin việc (50K),
 * sơ yếu lý lịch (50K), tạo cv online miễn phí (5K),
 * thư xin việc (500)
 */
import { TOPICS_PART1 } from './blog-vi-part1.mjs';
import { TOPICS_PART2 } from './blog-vi-part2.mjs';
import { TOPICS_PART3 } from './blog-vi-part3.mjs';
import { TOPICS_PART4 } from './blog-vi-part4.mjs';
import { TOPICS_PART5 } from './blog-vi-part5.mjs';
import { TOPICS_PART6 } from './blog-vi-part6.mjs';
import { TOPICS_PART7 } from './blog-vi-part7.mjs';
import { TOPICS_PART8 } from './blog-vi-part8.mjs';

export const CONFIG = {
  author: 'Nguyễn Minh Tuấn',
  authorBio: 'Chuyên gia tư vấn nghề nghiệp và viết CV với hơn 10 năm kinh nghiệm trong lĩnh vực tuyển dụng tại Việt Nam. Đã hỗ trợ hàng nghìn ứng viên xây dựng hồ sơ xin việc chuyên nghiệp.',
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
