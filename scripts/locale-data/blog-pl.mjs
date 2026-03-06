// blog-pl.mjs — Polish (pl) blog locale data aggregator
// 73 topics total across 8 part files

import { TOPICS_PART1 } from './blog-pl-part1.mjs';
import { TOPICS_PART2 } from './blog-pl-part2.mjs';
import { TOPICS_PART3 } from './blog-pl-part3.mjs';
import { TOPICS_PART4 } from './blog-pl-part4.mjs';
import { TOPICS_PART5 } from './blog-pl-part5.mjs';
import { TOPICS_PART6 } from './blog-pl-part6.mjs';
import { TOPICS_PART7 } from './blog-pl-part7.mjs';
import { TOPICS_PART8 } from './blog-pl-part8.mjs';

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

export const CONFIG = {
  author: 'Anna Kowalska',
  authorBio:
    'Anna Kowalska jest ekspertem ds. kariery i specjalistką HR z ponad 10-letnim doświadczeniem w rekrutacji i doradztwie zawodowym. Pomogła tysiącom kandydatów stworzyć wyróżniające się CV i listy motywacyjne. Regularnie pisze o trendach na polskim rynku pracy, strategiach poszukiwania pracy i rozwoju zawodowym.',
  date: '2026-03-04',
};
