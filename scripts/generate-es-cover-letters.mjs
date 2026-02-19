#!/usr/bin/env node
/**
 * Generates Spanish cover letter example MDX files based on English cover letter examples.
 * Reads English source files for structure (jobTitle, category, keySkills, slug),
 * then generates Spanish content with keyword-optimized frontmatter.
 *
 * Usage:
 *   node scripts/generate-es-cover-letters.mjs [--dry-run] [--limit N]
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const limitArg = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1], 10) : null;

const EN_COVER_DIR = path.join(rootDir, 'frontend/content/cover-letter-examples');
const ES_COVER_DIR = path.join(rootDir, 'frontend/content/cover-letter-examples/es');
const ES_RESUME_DIR = path.join(rootDir, 'frontend/content/resume-examples/es');

// Create output directory
if (!DRY_RUN && !fs.existsSync(ES_COVER_DIR)) {
  fs.mkdirSync(ES_COVER_DIR, { recursive: true });
}

// ─── Spanish job title lookup from resume examples ──────────────────────────
const esJobTitles = {};
if (fs.existsSync(ES_RESUME_DIR)) {
  for (const file of fs.readdirSync(ES_RESUME_DIR).filter(f => f.endsWith('.mdx'))) {
    try {
      const raw = fs.readFileSync(path.join(ES_RESUME_DIR, file), 'utf-8');
      const { data } = matter(raw);
      if (data.jobTitle) {
        esJobTitles[file.replace('.mdx', '')] = data.jobTitle;
      }
    } catch { /* skip */ }
  }
}
console.log(`📚 Loaded ${Object.keys(esJobTitles).length} Spanish job titles from resume examples\n`);

// ─── Category translations ──────────────────────────────────────────────────
const CATEGORY_ES = {
  Technology: 'Tecnologia',
  Healthcare: 'Salud',
  Finance: 'Finanzas',
  Education: 'Educacion',
  'Food Service': 'Servicio de Alimentos',
  Hospitality: 'Hosteleria',
  Trades: 'Oficios',
  Creative: 'Creativo',
  Administrative: 'Administrativo',
  Sales: 'Ventas',
  Marketing: 'Marketing',
  HR: 'Recursos Humanos',
  'Customer Service': 'Atencion al Cliente',
  Retail: 'Comercio',
  Logistics: 'Logistica',
  Government: 'Gobierno',
  'Law Enforcement': 'Seguridad',
  Engineering: 'Ingenieria',
  Science: 'Ciencia',
  Construction: 'Construccion',
  Manufacturing: 'Manufactura',
  Legal: 'Legal',
  'Real Estate': 'Inmobiliaria',
  Insurance: 'Seguros',
  Automotive: 'Automotriz',
  Aviation: 'Aviacion',
  'Animal Care': 'Cuidado Animal',
  Childcare: 'Cuidado Infantil',
  Cleaning: 'Limpieza',
  Security: 'Seguridad',
  Entertainment: 'Entretenimiento',
  Media: 'Medios',
  Beauty: 'Belleza',
  Fitness: 'Fitness',
  Events: 'Eventos',
  Consulting: 'Consultoria',
  Management: 'Gestion',
  Business: 'Negocios',
  Other: 'Otro',
};

function translateCategory(category) {
  // Try exact match first
  if (CATEGORY_ES[category]) return CATEGORY_ES[category];
  // Try case-insensitive match
  for (const [en, es] of Object.entries(CATEGORY_ES)) {
    if (category.toLowerCase().includes(en.toLowerCase())) return es;
  }
  return category;
}

// ─── Spanish content generators ─────────────────────────────────────────────

function normalizeCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('tech') || c.includes('engineering') || c.includes('software') || c.includes('it')) return 'Technology';
  if (c.includes('health') || c.includes('medical') || c.includes('nursing')) return 'Healthcare';
  if (c.includes('finance') || c.includes('accounting') || c.includes('banking')) return 'Finance';
  if (c.includes('food') || c.includes('culinary') || c.includes('restaurant')) return 'Food Service';
  if (c.includes('hospitality') || c.includes('hotel')) return 'Hospitality';
  if (c.includes('trade') || c.includes('construction') || c.includes('manufacturing')) return 'Trades';
  if (c.includes('creative') || c.includes('design') || c.includes('art')) return 'Creative';
  if (c.includes('education') || c.includes('teaching')) return 'Education';
  if (c.includes('admin') || c.includes('office')) return 'Administrative';
  if (c.includes('sales')) return 'Sales';
  if (c.includes('hr') || c.includes('human resource')) return 'HR';
  if (c.includes('customer') || c.includes('support')) return 'Customer Service';
  if (c.includes('retail') || c.includes('store')) return 'Retail';
  if (c.includes('logistics') || c.includes('warehouse') || c.includes('supply')) return 'Logistics';
  if (c.includes('government') || c.includes('law enforcement') || c.includes('security') || c.includes('police')) return 'Government';
  if (c.includes('legal')) return 'Legal';
  return 'default';
}

const CATEGORY_OPENERS_ES = {
  Technology: (job) => `Una carta de presentacion para ${job} efectiva va mas alla de listar tecnologias. Demuestra capacidad para resolver problemas, cuantifica el impacto de tu trabajo y muestra interes genuino en los desafios tecnicos de la empresa.`,
  Healthcare: (job) => `Los responsables de contratacion en salud buscan candidatos que demuestren tanto competencia clinica como dedicacion genuina a los resultados del paciente. Tu carta de presentacion debe equilibrar habilidades tecnicas con atencion compasiva.`,
  Sales: (job) => `Tu carta de presentacion es tu primera presentacion de ventas, y los gerentes de contratacion la juzgan como tal. El enfoque mas efectivo demuestra que has investigado sus desafios comerciales y puedes articular como contribuiras a sus objetivos de ingresos.`,
  Finance: (job) => `Los reclutadores de finanzas buscan candidatos que transformen datos complejos en decisiones accionables. Tu carta de presentacion debe demostrar rigor analitico, atencion al detalle y buen juicio en asuntos financieros.`,
  Education: (job) => `Los directivos educativos buscan profesionales que inspiren el aprendizaje y se adapten a las necesidades diversas de los estudiantes. Tu carta de presentacion debe demostrar experiencia pedagogica y compromiso genuino con el exito estudiantil.`,
  Administrative: (job) => `Los empleadores buscan candidatos que anticipen necesidades, resuelvan problemas proactivamente y mantengan la confidencialidad. Una carta de presentacion efectiva demuestra excelencia organizacional y capacidad para mantener operaciones fluidas.`,
  'Food Service': (job) => `Los gerentes de contratacion en gastronomia buscan confiabilidad, trabajo en equipo y pasion por las artes culinarias. Tu carta de presentacion debe demostrar habilidades tecnicas de cocina y capacidad para prosperar en entornos de alta presion.`,
  Hospitality: (job) => `La industria hotelera valora la calidez, la atencion al detalle y la gracia bajo presion. Tu carta de presentacion debe mostrar tu orientacion al servicio y capacidad para crear experiencias memorables para los huespedes.`,
  Trades: (job) => `Los empleadores valoran profesionales con licencia que puedan trabajar de forma independiente y entregar trabajo de calidad. Tu carta de presentacion debe destacar experiencia practica, conciencia de seguridad y capacidad para resolver problemas.`,
  Creative: (job) => `Los mejores profesionales creativos equilibran la excelencia artistica con las necesidades del cliente. Tu carta de presentacion debe mostrar tu vision creativa mientras demuestras conocimiento comercial.`,
  HR: (job) => `A diferencia de otros roles empresariales, las posiciones de recursos humanos requieren demostrar que puedes navegar dinamicas laborales sensibles mientras generas resultados organizacionales.`,
  'Customer Service': (job) => `Los roles de atencion al cliente requieren habilidades excepcionales de comunicacion y empatia genuina. Tu carta de presentacion debe demostrar tu capacidad para resolver problemas de forma eficiente mientras mantienes relaciones positivas.`,
  Retail: (job) => `Los empleadores valoran confiabilidad, conocimiento de producto y entusiasmo genuino por el servicio al cliente. Tu carta de presentacion debe destacar logros en ventas y capacidad para prosperar en entornos de ritmo rapido.`,
  Logistics: (job) => `Los empleadores de logistica valoran eficiencia, precision y capacidad para manejar operaciones sensibles al tiempo. Tu carta debe destacar experiencia en gestion de inventario, programacion y optimizacion de procesos.`,
  Government: (job) => `Las postulaciones al sector publico requieren un enfoque diferente al sector privado. Necesitas abordar directamente los requisitos del anuncio mientras demuestras compromiso con el servicio publico.`,
  default: (job) => `Una carta de presentacion efectiva para ${job} se centra en logros especificos que demuestren tu capacidad para entregar resultados desde el primer dia. Combina experiencia relevante con entusiasmo genuino por el puesto.`,
};

function getCategoryOpener(category, jobTitle) {
  const norm = normalizeCategory(category);
  const opener = CATEGORY_OPENERS_ES[norm] || CATEGORY_OPENERS_ES.default;
  return opener(jobTitle);
}

function generateExampleLetter(jobTitle, skills) {
  const topSkills = skills.slice(0, 4).join(', ') || 'habilidades relevantes';
  return `Estimado/a responsable de seleccion,

Me dirijo a usted para expresar mi interes en la posicion de ${jobTitle} en [Nombre de la Empresa]. Su equipo ha llamado mi atencion por [razon especifica relacionada con la empresa], y estoy entusiasmado/a con la posibilidad de contribuir a sus objetivos.

En mi puesto actual en [Empresa Actual], he logrado [logro especifico con metricas]. Mi experiencia con ${topSkills} me ha preparado para generar un impacto inmediato en esta posicion. Ademas, [segundo logro relevante con datos cuantificables].

Lo que mas me atrae de [Nombre de la Empresa] es [razon especifica - mision, desafio tecnico, producto]. Creo que mi experiencia en [area relevante] me permitira hacer contribuciones significativas a su equipo desde el primer dia.

Me encantaria tener la oportunidad de discutir como mi experiencia puede beneficiar a su organizacion. Gracias por considerar mi candidatura.

Atentamente,
[Tu Nombre]`;
}

function generateSpanishTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `carta de presentacion ${lower}`,
    `carta de presentacion de ${lower}`,
    `ejemplo carta de presentacion ${lower}`,
    `carta de presentacion laboral`,
    `modelo carta de presentacion`,
    `formato carta de presentacion`,
    `plantilla carta de presentacion`,
    `como escribir carta de presentacion`,
  ].slice(0, 8);
}

function generateSpanishFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Como escribir una carta de presentacion para ${lower}?`,
      answer: `Comienza con un saludo profesional, menciona el puesto especifico al que postulas y la empresa. En el segundo parrafo, destaca 2-3 logros relevantes con metricas concretas. En el cierre, expresa tu interes genuino en la empresa y solicita una entrevista. Mantén la carta en una pagina.`,
    },
    {
      question: `Que tan larga debe ser una carta de presentacion para ${lower}?`,
      answer: `Mantén tu carta de presentacion entre 250 y 350 palabras, idealmente 3-4 parrafos. Los reclutadores revisan muchas postulaciones y aprecian la comunicacion concisa. Si no puedes incluir todo, enfocate en tus logros mas relevantes.`,
    },
    {
      question: `Debo repetir lo que dice mi curriculum en la carta de presentacion?`,
      answer: `No. La carta de presentacion debe complementar tu curriculum vitae, no duplicarlo. Usala para explicar el contexto detras de tus logros, demostrar tu interes en la empresa especifica y mostrar por que eres el candidato ideal para este puesto en particular.`,
    },
    {
      question: `Es necesario enviar carta de presentacion para postularme como ${lower}?`,
      answer: `Aunque no siempre es obligatoria, enviar una carta de presentacion bien redactada te diferencia de otros candidatos. Demuestra interes adicional en el puesto y te da la oportunidad de explicar aspectos que no caben en el curriculum.`,
    },
  ];
}

// ─── Generate Spanish MDX content ───────────────────────────────────────────

function generateSpanishMDX(enData) {
  const { slug, jobTitle: enJobTitle, category, keySkills } = enData;
  const esJobTitle = esJobTitles[slug] || enJobTitle;
  const esCategory = translateCategory(category);
  const skills = keySkills || [];
  const date = new Date().toISOString().split('T')[0];
  const lower = esJobTitle.toLowerCase();

  const opener = getCategoryOpener(category, esJobTitle);
  const exampleLetter = generateExampleLetter(esJobTitle, skills);
  const tags = generateSpanishTags(esJobTitle, slug);
  const faq = generateSpanishFAQ(esJobTitle);

  const frontmatter = `---
title: 'Carta de Presentacion de ${esJobTitle}: Ejemplo y Guia de Redaccion 2026'
slug: ${slug}
description: >-
  Ejemplo de carta de presentacion de ${lower} con plantillas profesionales.
  Aprende a destacar tus habilidades y conseguir entrevistas en 2026.
date: '${date}'
author: Maria Gonzalez
authorBio: >-
  Especialista en desarrollo profesional y redaccion de curriculum con mas de 10
  anos de experiencia ayudando a profesionales hispanohablantes a conseguir
  empleo.
category: ${esCategory}
tags:
${tags.map(t => `  - ${t}`).join('\n')}
jobTitle: ${esJobTitle}
keySkills:
${skills.slice(0, 8).map(s => `  - ${s}`).join('\n')}
featured: false
faq:
${faq.map(f => `  - question: ${f.question}
    answer: >-
      ${f.answer}`).join('\n')}
---`;

  const body = `
## Que Hace Destacar una Carta de Presentacion de ${esJobTitle}?

${opener}

A diferencia de tu curriculum vitae que lista lo que has hecho, tu carta de presentacion explica *por que* tu experiencia es relevante para este puesto y que motiva tu pasion profesional.

## Ejemplo de Carta de Presentacion de ${esJobTitle}

Aqui tienes un modelo de carta de presentacion probado para postulaciones como ${lower}:

**Ejemplo para ${esJobTitle}:**

---

${exampleLetter}

---

## Elementos Clave de una Carta de Presentacion Efectiva

### 1. Apertura Personalizada
Comienza mencionando algo especifico sobre la empresa: su producto, un proyecto reciente o un valor que admiras. Esto demuestra que has investigado mas alla de la oferta de empleo.

### 2. Logros Cuantificados
Incluye metricas concretas en tus logros. Los numeros hacen que tu impacto sea tangible y memorable. "Incremente las ventas un 35%" es mas persuasivo que "Mejore los resultados del equipo".

### 3. Conexion con la Empresa
Explica por que esta empresa en particular te interesa. Los reclutadores notan cuando un candidato demuestra conocimiento real de la organizacion y no esta enviando la misma carta a todas las ofertas.

### 4. Cierre con Propuesta de Valor
Termina resumiendo brevemente lo que puedes aportar y solicita una entrevista. Un cierre fuerte deja una impresion positiva y demuestra confianza profesional.

## Consejos por Nivel de Experiencia

### Para Recien Graduados
- Destaca practicas profesionales, proyectos academicos y voluntariado relevante
- Muestra entusiasmo por aprender y crecer en el puesto
- Menciona habilidades especificas de tu formacion que apliquen al rol

### Para Profesionales con Experiencia
- Enfocate en logros con impacto medible en tu puesto actual o anterior
- Demuestra progresion en responsabilidad y capacidad de liderazgo
- Cuantifica tus contribuciones con numeros concretos

### Para Profesionales Senior
- Enfatiza decisiones estrategicas y su impacto a nivel organizacional
- Muestra como has desarrollado equipos y mentoreado a otros profesionales
- Incluye ejemplos de iniciativas con impacto a largo plazo

## Errores Comunes en Cartas de Presentacion

- **Apertura generica** — "Me dirijo a ustedes para expresar mi interes" sin contexto no comunica nada
- **Repetir el curriculum** — La carta debe anadir contexto, no duplicar informacion
- **Sin investigacion** — No mencionar nada especifico sobre la empresa demuestra falta de interes
- **Demasiado larga** — Mas de una pagina reduce la probabilidad de que la lean completa
- **Errores de ortografia** — Un error puede descartarte inmediatamente, especialmente en roles que requieren atencion al detalle

## Complementa tu Carta con un Curriculum Profesional

Una carta de presentacion efectiva acompana un curriculum vitae igualmente profesional. Visita nuestro [creador de curriculum vitae gratuito](/es/creador-de-curriculum) para crear un CV optimizado para ATS que complemente tu carta de presentacion.

Tambien te puede interesar:
- [Ejemplo de curriculum de ${lower}](/es/ejemplos-de-curriculum/${slug})
- [Plantillas de curriculum vitae gratis](/es/blog/plantillas-de-curriculum-vitae)
- [Carta de presentacion: plantillas y formato](/es/blog/carta-de-presentacion-plantillas)
`;

  return frontmatter + body;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Scanning English cover letter examples...\n');

  const enFiles = fs.readdirSync(EN_COVER_DIR).filter(f => f.endsWith('.mdx'));
  const existingEs = fs.existsSync(ES_COVER_DIR)
    ? new Set(fs.readdirSync(ES_COVER_DIR).filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', '')))
    : new Set();

  console.log(`📊 English cover letters: ${enFiles.length}`);
  console.log(`📊 Existing Spanish: ${existingEs.size}`);

  const toGenerate = [];
  for (const file of enFiles) {
    const slug = file.replace('.mdx', '');
    if (existingEs.has(slug)) continue;

    try {
      const raw = fs.readFileSync(path.join(EN_COVER_DIR, file), 'utf-8');
      const { data } = matter(raw);
      toGenerate.push({
        slug,
        jobTitle: data.jobTitle || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        category: data.category || 'Other',
        keySkills: data.keySkills || [],
      });
    } catch (e) {
      console.error(`ERROR reading ${file}: ${e.message}`);
    }
  }

  let files = toGenerate;
  if (limitArg && limitArg > 0) {
    files = files.slice(0, limitArg);
    console.log(`📉 Limited to first ${limitArg} files\n`);
  }

  console.log(`📝 Generating ${files.length} Spanish cover letter examples...\n`);

  let created = 0;
  let errors = 0;
  for (const data of files) {
    try {
      const mdx = generateSpanishMDX(data);
      const outputPath = path.join(ES_COVER_DIR, `${data.slug}.mdx`);

      if (DRY_RUN) {
        console.log(`[DRY RUN] ${data.slug}.mdx (${data.category})`);
      } else {
        fs.writeFileSync(outputPath, mdx, 'utf-8');
        created++;
      }
    } catch (e) {
      console.error(`ERROR generating ${data.slug}: ${e.message}`);
      errors++;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Generated: ${DRY_RUN ? files.length + ' (dry run)' : created}`);
  if (errors) console.log(`Errors: ${errors}`);
  console.log(`Total Spanish cover letters: ${existingEs.size + (DRY_RUN ? 0 : created)}`);
}

main().catch(console.error);
