/**
 * Dutch (nl) blog locale data — aggregator
 * Imports all 8 parts (74 topics total) and exports CONFIG + TOPICS
 *
 * Part 1 (9):  CV Schrijven & Formaat
 * Part 2 (9):  Sjablonen & Tools
 * Part 3 (9):  CV Types & Design
 * Part 4 (9):  Solliciteren & Interview
 * Part 5 (9):  Sectoren & Loopbaanontwikkeling
 * Part 6 (9):  Loopbaandocumenten & Brieven
 * Part 7 (9):  AI & Geavanceerde Onderwerpen
 * Part 8 (10): Nederland & België-specifiek & Overig
 */

import { TOPICS_PART1 } from './blog-nl-part1.mjs';
import { TOPICS_PART2 } from './blog-nl-part2.mjs';
import { TOPICS_PART3 } from './blog-nl-part3.mjs';
import { TOPICS_PART4 } from './blog-nl-part4.mjs';
import { TOPICS_PART5 } from './blog-nl-part5.mjs';
import { TOPICS_PART6 } from './blog-nl-part6.mjs';
import { TOPICS_PART7 } from './blog-nl-part7.mjs';
import { TOPICS_PART8 } from './blog-nl-part8.mjs';

export const CONFIG = {
  author: 'Jan de Vries',
  authorBio:
    'Jan de Vries is een ervaren loopbaancoach en cv-expert met meer dan 10 jaar werkervaring in werving en selectie bij toonaangevende Nederlandse bedrijven en internationale organisaties. Hij heeft duizenden professionals begeleid bij carrièretransities, cv-optimalisatie en sollicitatiestrategieën op de Nederlandse en internationale arbeidsmarkt. Jan is LinkedIn-gecertificeerd loopbaancoach en gespecialiseerd in ATS-optimalisatie, salarisonderhandelingen en de dynamiek van de moderne Nederlandse arbeidsmarkt.',
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
