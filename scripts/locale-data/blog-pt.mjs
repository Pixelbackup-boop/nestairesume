/**
 * Portuguese (pt) blog content — aggregator
 * Combines all Portuguese blog topic parts into a single export.
 *
 * Keyword-optimized: modelo de currículo (500K), currículo (500K),
 * fazer currículo (50K), currículo simples (50K), currículo grátis (50K),
 * exemplo de currículo (50K), carta de apresentação (5K)
 */
import { TOPICS_PART1 } from './blog-pt-part1.mjs';
import { TOPICS_PART2 } from './blog-pt-part2.mjs';
import { TOPICS_PART3 } from './blog-pt-part3.mjs';
import { TOPICS_PART4 } from './blog-pt-part4.mjs';
import { TOPICS_PART5 } from './blog-pt-part5.mjs';
import { TOPICS_PART6 } from './blog-pt-part6.mjs';
import { TOPICS_PART7 } from './blog-pt-part7.mjs';
import { TOPICS_PART8 } from './blog-pt-part8.mjs';

export const CONFIG = {
  author: 'Ana Oliveira',
  authorBio: 'Especialista em desenvolvimento profissional e redacao de curriculos com mais de 10 anos de experiencia no mercado de trabalho brasileiro e portugues. Ajudou milhares de candidatos a conquistarem entrevistas com curriculos otimizados.',
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
