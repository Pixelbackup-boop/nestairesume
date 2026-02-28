/**
 * Italian (it) blog content — aggregator
 * Combines all Italian blog topic parts into a single export.
 *
 * Keyword-optimized: curriculum vitae (5M), curriculum vitae gratis (500K),
 * cv europass (500K), modello curriculum vitae (50K), crea cv gratis (50K),
 * lettera di presentazione (5K)
 */
import { TOPICS_PART1 } from './blog-it-part1.mjs';
import { TOPICS_PART2 } from './blog-it-part2.mjs';
import { TOPICS_PART3 } from './blog-it-part3.mjs';
import { TOPICS_PART4 } from './blog-it-part4.mjs';
import { TOPICS_PART5 } from './blog-it-part5.mjs';
import { TOPICS_PART6 } from './blog-it-part6.mjs';
import { TOPICS_PART7 } from './blog-it-part7.mjs';
import { TOPICS_PART8 } from './blog-it-part8.mjs';

export const CONFIG = {
  author: 'Marco Bianchi',
  authorBio: 'Esperto di sviluppo professionale e redazione di curriculum vitae con oltre 10 anni di esperienza nel mercato del lavoro italiano. Ha aiutato migliaia di candidati a superare la selezione dei CV.',
  date: '2026-02-28',
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
