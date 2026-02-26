/**
 * Japanese (ja) blog content — aggregator
 * Combines all Japanese blog topic parts into a single export.
 *
 * Keyword-optimized: 履歴書サンプル (5K), 履歴書作成ツール (5K),
 * 職務経歴書 (500), 履歴書作成ai (500), 転職履歴書 (500)
 */
import { TOPICS_PART1 } from './blog-ja-part1.mjs';
import { TOPICS_PART2 } from './blog-ja-part2.mjs';
import { TOPICS_PART3 } from './blog-ja-part3.mjs';
import { TOPICS_PART4 } from './blog-ja-part4.mjs';
import { TOPICS_PART5 } from './blog-ja-part5.mjs';
import { TOPICS_PART6 } from './blog-ja-part6.mjs';
import { TOPICS_PART7 } from './blog-ja-part7.mjs';
import { TOPICS_PART8 } from './blog-ja-part8.mjs';

export const CONFIG = {
  author: '田中 美咲',
  authorBio: 'キャリア開発と履歴書・職務経歴書の作成支援に10年以上の経験を持つ専門家。日本の転職市場に精通し、数千人の求職者の書類選考突破をサポート。',
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
