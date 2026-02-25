#!/usr/bin/env node
/**
 * German (de) locale data for cover letter example generation.
 * Used by: scripts/generate-locale-cover-letters.mjs --lang de
 *
 * Exports: CONFIG, JOB_TITLES, CATEGORIES, generateTags, generateFAQ, generateBody
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-de.mjs';

// ─── CONFIG ──────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Lisa Müller',
  authorBio: 'Karriereberaterin und Bewerbungsexpertin mit über 10 Jahren Erfahrung in der Unterstützung deutschsprachiger Fachkräfte bei erfolgreichen Bewerbungen.',
  titlePattern: (job) => `${job} Bewerbungsschreiben: Beispiel und Schreibtipps 2026`,
  descriptionPattern: (job) => `${job} Bewerbungsschreiben mit professionellen Vorlagen und Expertentipps. Lernen Sie, wie Sie Ihre Fähigkeiten hervorheben und Vorstellungsgespräche in 2026 erreichen.`,
};

// ─── JOB TITLES (resume titles + 12 cover-letter-specific entries) ──────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Buchhalter',
  'Corporate Trainer': 'Firmentrainer',
  'Customer Service Representative': 'Kundendienstmitarbeiter',
  'EMT/Paramedic': 'Rettungssanitäter/Notfallsanitäter',
  'Frontend Developer': 'Frontend-Entwickler',
  'Healthcare Administrator': 'Gesundheitsadministrator',
  'Human Resources Manager': 'Personalleiter',
  'Machinist': 'Maschinist',
  'Registered Nurse': 'Examinierte Krankenschwester',
  'Solutions Architect': 'Lösungsarchitekt',
  'Systems Administrator': 'Systemadministrator',
  'Tax Accountant': 'Steuerfachangestellter',
};

// ─── CATEGORIES (53 entries) ────────────────────────────────────────────────

export const CATEGORIES = {
  'Technology': 'Technologie',
  'Healthcare': 'Gesundheitswesen',
  'Food Service': 'Gastronomie',
  'Hospitality': 'Gastgewerbe',
  'Trades': 'Handwerk',
  'Creative': 'Kreativberufe',
  'Education': 'Bildung',
  'Marketing': 'Marketing',
  'Government': 'Öffentlicher Dienst',
  'Business': 'Wirtschaft',
  'Sales': 'Vertrieb',
  'Engineering': 'Ingenieurwesen',
  'Business & Finance': 'Wirtschaft & Finanzen',
  'Legal': 'Recht',
  'HR': 'Personalwesen',
  'Skilled Trades': 'Fachhandwerk',
  'Real Estate': 'Immobilien',
  'Customer Service': 'Kundenservice',
  'Animal Care': 'Tierpflege',
  'Administrative': 'Verwaltung',
  'Transportation': 'Transport',
  'Logistics': 'Logistik',
  'Fitness': 'Fitness',
  'Cleaning': 'Reinigung',
  'Retail': 'Einzelhandel',
  'Management': 'Management',
  'Social Services': 'Soziale Arbeit',
  'Manufacturing': 'Fertigung',
  'Accounting': 'Buchhaltung',
  'Construction': 'Bauwesen',
  'Security': 'Sicherheit',
  'Science': 'Wissenschaft',
  'Health & Fitness': 'Gesundheit & Fitness',
  'Research': 'Forschung',
  'Finance': 'Finanzen',
  'Writing & Content': 'Redaktion & Inhalt',
  'Supply Chain': 'Lieferkette',
  'Quality': 'Qualitätsmanagement',
  'Media': 'Medien',
  'Maritime': 'Seefahrt',
  'Law Enforcement': 'Strafverfolgung',
  'Facilities': 'Gebäudemanagement',
  'Executive': 'Geschäftsführung',
  'Events': 'Veranstaltungen',
  'Entry-Level': 'Berufseinsteiger',
  'Entrepreneurship': 'Unternehmertum',
  'Consulting': 'Beratung',
  'Childcare': 'Kinderbetreuung',
  'Banking & Finance': 'Bank- & Finanzwesen',
  'Banking': 'Bankwesen',
  'Aviation': 'Luftfahrt',
  'Automotive': 'Automobilbranche',
  'Architecture': 'Architektur',
};

// ─── TAG GENERATOR ──────────────────────────────────────────────────────────

/**
 * Returns 8 German SEO tags for a cover letter page.
 */
export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `bewerbungsschreiben ${lower}`,
    `anschreiben ${lower}`,
    `bewerbung ${lower}`,
    `musterbewerbung ${lower}`,
    `${lower} bewerbungsschreiben muster`,
    `${lower} anschreiben vorlage`,
    `bewerbungsschreiben vorlage`,
    `anschreiben tipps ${lower}`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

/**
 * Returns 4 FAQ objects with German question/answer pairs for cover letters.
 */
export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Wie schreibe ich ein Bewerbungsschreiben als ${jobTitle}?`,
      answer: `Beginnen Sie mit einer persönlichen Anrede und nennen Sie die konkrete Stelle sowie das Unternehmen. Im Hauptteil heben Sie 2-3 relevante Erfolge mit messbaren Ergebnissen hervor, die Ihre Eignung als ${jobTitle} belegen. Schließen Sie mit einem konkreten Mehrwertversprechen und der Bitte um ein Vorstellungsgespräch. Halten Sie das Anschreiben auf einer Seite.`,
    },
    {
      question: `Wie lang sollte ein Bewerbungsschreiben für ${lower} sein?`,
      answer: `Ein Bewerbungsschreiben als ${jobTitle} sollte zwischen 250 und 400 Wörtern umfassen, idealerweise 3-4 Absätze auf einer DIN-A4-Seite. Personalverantwortliche schätzen prägnante Kommunikation. Konzentrieren Sie sich auf Ihre überzeugendsten Qualifikationen und relevantesten Erfolge.`,
    },
    {
      question: `Soll ich im Bewerbungsschreiben den Lebenslauf wiederholen?`,
      answer: `Nein, das Bewerbungsschreiben sollte Ihren Lebenslauf ergänzen, nicht duplizieren. Nutzen Sie es, um den Kontext hinter Ihren Erfolgen zu erklären, Ihr spezifisches Interesse am Unternehmen zu demonstrieren und zu zeigen, warum Sie als ${jobTitle} die ideale Besetzung für diese konkrete Stelle sind.`,
    },
    {
      question: `Ist ein Bewerbungsschreiben als ${lower} wirklich notwendig?`,
      answer: `In Deutschland wird ein Bewerbungsschreiben in den meisten Branchen nach wie vor erwartet und ist ein wichtiger Bestandteil der vollständigen Bewerbungsunterlagen. Ein gut formuliertes Anschreiben hebt Sie von anderen Kandidaten ab und gibt Ihnen die Möglichkeit, Ihre Motivation und Persönlichkeit zu zeigen — Aspekte, die im Lebenslauf keinen Platz finden.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

/**
 * Normalizes English category string to one of ~15 groups
 * for category-specific cover letter content.
 */
function normalizeCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('tech') || c.includes('software') || c.includes('it') || c === 'technology') return 'Technology';
  if (c.includes('health') || c.includes('medical') || c.includes('nursing')) return 'Healthcare';
  if (c.includes('finance') || c.includes('accounting') || c.includes('banking') || c.includes('tax')) return 'Finance';
  if (c.includes('food') || c.includes('culinary') || c.includes('restaurant')) return 'Food Service';
  if (c.includes('hospitality') || c.includes('hotel')) return 'Hospitality';
  if (c.includes('trade') || c.includes('construction') || c.includes('manufacturing') || c.includes('skilled')) return 'Trades';
  if (c.includes('creative') || c.includes('design') || c.includes('art') || c.includes('writing') || c.includes('media')) return 'Creative';
  if (c.includes('education') || c.includes('teaching') || c.includes('childcare')) return 'Education';
  if (c.includes('admin') || c.includes('office') || c.includes('facilities') || c.includes('executive')) return 'Administrative';
  if (c.includes('sales') || c.includes('real estate') || c.includes('retail')) return 'Sales';
  if (c.includes('hr') || c.includes('human resource')) return 'HR';
  if (c.includes('customer') || c.includes('support')) return 'Customer Service';
  if (c.includes('logistics') || c.includes('warehouse') || c.includes('supply') || c.includes('quality')) return 'Logistics';
  if (c.includes('government') || c.includes('law enforcement') || c.includes('security') || c.includes('police')) return 'Government';
  if (c.includes('legal')) return 'Legal';
  if (c.includes('engineer') || c.includes('architecture')) return 'Engineering';
  if (c.includes('marketing') || c.includes('consulting') || c.includes('entrepreneur')) return 'Marketing';
  if (c.includes('business') || c.includes('management')) return 'Business';
  if (c.includes('science') || c.includes('research')) return 'Science';
  if (c.includes('fitness') || c.includes('sport')) return 'Fitness';
  if (c.includes('transport') || c.includes('aviation') || c.includes('automotive') || c.includes('maritime')) return 'Transportation';
  if (c.includes('animal')) return 'Animal Care';
  if (c.includes('cleaning')) return 'Cleaning';
  if (c.includes('social') || c.includes('event')) return 'Social Services';
  if (c.includes('entry')) return 'Entry-Level';
  return 'default';
}

/**
 * Returns a category-specific opening paragraph for cover letters in German.
 */
const CATEGORY_OPENERS = {
  Technology: (job) => `Ein Bewerbungsschreiben als ${job} geht weit über das Auflisten von Programmiersprachen und Frameworks hinaus. Personalverantwortliche in der IT-Branche suchen Kandidaten, die technische Problemlösungskompetenz mit echtem Interesse an den spezifischen Herausforderungen des Unternehmens verbinden. Ihr Anschreiben muss zeigen, dass Sie nicht nur die geforderten Technologien beherrschen, sondern auch verstehen, wie Sie damit geschäftlichen Mehrwert schaffen.`,

  Healthcare: (job) => `Im Gesundheitswesen erwarten Personalverantwortliche Bewerber, die sowohl klinische Kompetenz als auch echte Hingabe an die Patientenversorgung mitbringen. Ihr Bewerbungsschreiben als ${job} muss dieses Gleichgewicht zwischen fachlicher Expertise und menschlicher Empathie überzeugend darstellen. Zeigen Sie, dass Sie die besonderen Anforderungen des medizinischen Umfelds verstehen und in Stresssituationen zuverlässig handeln.`,

  Finance: (job) => `Personalverantwortliche im Finanzsektor suchen Kandidaten, die komplexe Daten in fundierte Entscheidungen verwandeln können. Ihr Bewerbungsschreiben als ${job} muss analytische Schärfe, Genauigkeit und verantwortungsvolles Urteilsvermögen in finanziellen Angelegenheiten demonstrieren. Konkrete Zahlen und messbare Erfolge sind in dieser Branche besonders überzeugend.`,

  'Food Service': (job) => `In der Gastronomie suchen Personalverantwortliche nach Zuverlässigkeit, Teamgeist und echter Leidenschaft für kulinarische Qualität. Ihr Bewerbungsschreiben als ${job} sollte fachliche Kompetenz und die Fähigkeit zeigen, unter Zeitdruck in einer schnelllebigen Küchenumgebung hervorragende Ergebnisse zu liefern.`,

  Hospitality: (job) => `Das Gastgewerbe lebt von erstklassigem Service und persönlicher Betreuung. In Ihrem Bewerbungsschreiben als ${job} sollten Sie Ihre Serviceorientierung, interkulturelle Kompetenz und die Fähigkeit hervorheben, Gästen unvergessliche Erlebnisse zu bieten — auch unter Druck souverän und freundlich.`,

  Trades: (job) => `Im Handwerk und in technischen Berufen zählen praktische Erfahrung, Fachkompetenz und Zuverlässigkeit. Ihr Bewerbungsschreiben als ${job} sollte Ihre handwerkliche Expertise, relevante Zertifizierungen und Ihr Sicherheitsbewusstsein hervorheben. Arbeitgeber schätzen Bewerber, die Projekte selbstständig und qualitativ hochwertig abschließen können.`,

  Creative: (job) => `In der Kreativbranche ist Ihr Bewerbungsschreiben als ${job} bereits eine Arbeitsprobe Ihrer Kommunikationsfähigkeit. Verbinden Sie künstlerische Vision mit kommerziellem Verständnis und zeigen Sie, dass Sie kreative Ideen in messbare Ergebnisse für Kunden und Auftraggeber verwandeln können.`,

  Education: (job) => `Bildungseinrichtungen suchen Fachkräfte, die Lernbegeisterung wecken und sich flexibel auf unterschiedliche Bedürfnisse einstellen. Ihr Bewerbungsschreiben als ${job} sollte pädagogische Kompetenz, innovative Lehransätze und echtes Engagement für den Lernerfolg demonstrieren.`,

  Administrative: (job) => `Administrative Fachkräfte sind das organisatorische Rückgrat jedes Unternehmens. Ein überzeugendes Bewerbungsschreiben als ${job} zeigt Ihre Fähigkeit, Abläufe effizient zu koordinieren, Prioritäten zu setzen und auch in hektischen Situationen den Überblick zu behalten. Betonen Sie Ihre Kompetenz im Umgang mit modernen Büroanwendungen.`,

  Sales: (job) => `Ihr Bewerbungsschreiben als ${job} ist gleichzeitig Ihre erste Verkaufspräsentation — und Personalverantwortliche bewerten es genau so. Zeigen Sie, dass Sie die geschäftlichen Herausforderungen des Unternehmens verstehen, und untermauern Sie Ihre Verkaufserfolge mit konkreten Umsatzzahlen und Prozentwerten.`,

  HR: (job) => `Im Personalwesen müssen Sie im Bewerbungsschreiben zeigen, dass Sie den gesamten Mitarbeiterlebenszyklus verstehen und sensible Arbeitssituationen souverän navigieren können. Als ${job} ist Ihr Anschreiben besonders aussagekräftig, da Personalverantwortliche es als Beweis Ihrer eigenen Kommunikations- und Menschenkenntnis werten.`,

  'Customer Service': (job) => `Kundenservice-Positionen erfordern herausragende Kommunikationsfähigkeit und echte Empathie. Ihr Bewerbungsschreiben als ${job} muss Ihre Fähigkeit zeigen, Probleme effizient zu lösen und gleichzeitig positive Kundenbeziehungen aufzubauen. Messbare Ergebnisse wie Kundenzufriedenheitswerte machen Ihr Anschreiben besonders überzeugend.`,

  Logistics: (job) => `In der Logistik zählen Effizienz, Präzision und die Fähigkeit, zeitkritische Abläufe zu koordinieren. Ihr Bewerbungsschreiben als ${job} sollte Erfahrung in Bestandsmanagement, Prozessoptimierung und den Umgang mit Logistiksoftware hervorheben. Quantifizieren Sie Ihre Beiträge mit konkreten Kennzahlen.`,

  Government: (job) => `Bewerbungen im öffentlichen Dienst folgen anderen Regeln als in der Privatwirtschaft. Ihr Bewerbungsschreiben als ${job} muss direkt auf die Anforderungen der Stellenausschreibung eingehen und gleichzeitig Ihr Engagement für den öffentlichen Dienst und die Kenntnis relevanter Vorschriften demonstrieren.`,

  Legal: (job) => `Im Rechtsbereich muss Ihr Bewerbungsschreiben als ${job} höchste sprachliche Präzision und Professionalität ausstrahlen. Kanzleien und Rechtsabteilungen bewerten nicht nur Ihren Inhalt, sondern auch Ihre Fähigkeit, sich klar, strukturiert und fehlerfrei auszudrücken. Jedes Detail zählt.`,

  Engineering: (job) => `Als ${job} im Ingenieurwesen müssen Sie technische Kompetenz, Problemlösungsfähigkeit und Projekterfahrung in Ihrem Bewerbungsschreiben vereinen. Arbeitgeber suchen Kandidaten, die komplexe Herausforderungen systematisch angehen und ihre Beiträge mit konkreten Projektergebnissen belegen können.`,

  Marketing: (job) => `Ihr Bewerbungsschreiben als ${job} muss genauso überzeugend sein wie die Kampagnen, die Sie gestalten. Zeigen Sie datengetriebene Ergebnisse, kreative Strategiekompetenz und Erfahrung mit modernen Marketing-Kanälen. Quantifizieren Sie Ihre Erfolge mit Reichweiten, Conversion-Raten und ROI-Kennzahlen.`,

  Business: (job) => `In geschäftlichen Führungspositionen erwarten Personalverantwortliche strategisches Denken und nachweisbare Ergebnisse. Ihr Bewerbungsschreiben als ${job} sollte Ihre Fähigkeit zeigen, geschäftliche Herausforderungen zu erkennen und gewinnbringende Lösungen umzusetzen. Untermauern Sie Ihre Aussagen mit konkreten Geschäftskennzahlen.`,

  Science: (job) => `In der Wissenschaft ist Ihr Bewerbungsschreiben als ${job} ein Nachweis Ihrer analytischen Denkweise und Forschungskompetenz. Heben Sie relevante Forschungsprojekte, Methodik-Erfahrung und Ihre Fähigkeit hervor, komplexe Ergebnisse verständlich zu kommunizieren.`,

  Fitness: (job) => `In der Fitnessbranche verbindet Ihr Bewerbungsschreiben als ${job} sportliche Expertise mit pädagogischem Geschick. Zeigen Sie Ihre Zertifizierungen, nachweisbare Trainingserfolge mit Klienten und Ihre Fähigkeit, individuelle Programme zu entwickeln, die messbare Gesundheitsergebnisse liefern.`,

  Transportation: (job) => `In der Transportbranche sind Sicherheit, Zuverlässigkeit und die richtige Qualifikation entscheidend. Ihr Bewerbungsschreiben als ${job} sollte relevante Führerscheinklassen, unfallfreie Fahrleistung und Erfahrung mit den spezifischen Anforderungen des Transportsektors dokumentieren.`,

  'Animal Care': (job) => `In der Tierpflege verbindet Ihr Bewerbungsschreiben als ${job} fachliches Wissen mit echter Leidenschaft für das Wohlergehen von Tieren. Zeigen Sie Ihre praktische Erfahrung, relevante Qualifikationen und Ihre Fähigkeit, verantwortungsvoll mit verschiedenen Tierarten umzugehen.`,

  Cleaning: (job) => `Im Reinigungsbereich sind Zuverlässigkeit, Gründlichkeit und Eigeninitiative Ihre stärksten Argumente. Ihr Bewerbungsschreiben als ${job} sollte Ihre Erfahrung mit verschiedenen Reinigungsverfahren, Kenntnis relevanter Hygienestandards und selbstständige Arbeitsweise hervorheben.`,

  'Social Services': (job) => `Im sozialen Bereich ist Ihr Bewerbungsschreiben als ${job} ein Nachweis Ihrer Empathie und Ihres Engagements für das Gemeinwohl. Zeigen Sie Ihre Erfahrung in der Betreuung von Klienten, Kenntnisse der Sozialsysteme und Ihre Fähigkeit, Menschen in schwierigen Lebenslagen professionell zu unterstützen.`,

  'Entry-Level': (job) => `Als Berufseinsteiger konzentriert sich Ihr Bewerbungsschreiben als ${job} auf Ihre Ausbildung, Praktika und übertragbare Fähigkeiten. Zeigen Sie Lernbereitschaft, Motivation und die konkreten Kenntnisse, die Sie aus Studium und Praxiserfahrungen mitbringen. Ihre frische Perspektive und Ihr Engagement können erfahrene Bewerber durchaus ausstechen.`,

  default: (job) => `Ein überzeugendes Bewerbungsschreiben als ${job} hebt Sie von der Masse der Bewerber ab, indem es Ihre konkreten Erfolge mit Ihrer Begeisterung für die ausgeschriebene Position verbindet. Im Gegensatz zum Lebenslauf, der auflistet, was Sie getan haben, erklärt Ihr Anschreiben, warum Ihre Erfahrung genau für diese Stelle relevant ist.`,
};

/**
 * Generates full MDX body content for a German cover letter example page.
 */
export function generateBody(jobTitle, category, keySkills, slug) {
  const norm = normalizeCategory(category);
  const openerFn = CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default;
  const opener = openerFn(jobTitle);
  const skills = keySkills.length > 0 ? keySkills : ['Kommunikation', 'Teamarbeit', 'Problemlösung', 'Organisation'];
  const topSkills = skills.slice(0, 4).join(', ') || 'relevante Fachkenntnisse';

  return `
## Was ein ${jobTitle} Bewerbungsschreiben auszeichnet

${opener}

Anders als Ihr Lebenslauf, der Ihre berufliche Laufbahn chronologisch darstellt, erklärt Ihr Bewerbungsschreiben *warum* Ihre Erfahrung für diese konkrete Stelle relevant ist und was Sie persönlich an der Position motiviert.

## ${jobTitle} Bewerbungsschreiben Beispiel

Hier finden Sie ein bewährtes Muster für Ihr Bewerbungsschreiben als ${jobTitle.toLowerCase()}:

**Beispiel-Bewerbungsschreiben:**

---

Sehr geehrte/r [Name des Ansprechpartners],

mit großem Interesse habe ich Ihre Stellenausschreibung als ${jobTitle} bei [Firmenname] gelesen. Ihr Unternehmen hat meine Aufmerksamkeit durch [spezifischer Grund bezogen auf das Unternehmen] geweckt, und ich bin überzeugt, dass ich mit meiner Erfahrung einen wertvollen Beitrag zu Ihrem Team leisten kann.

In meiner aktuellen Position bei [Aktuelle Firma] habe ich [konkreter Erfolg mit messbaren Ergebnissen] erreicht. Meine Expertise in ${topSkills} hat es mir ermöglicht, nachhaltige Verbesserungen umzusetzen und die Effizienz meines Verantwortungsbereichs deutlich zu steigern. Darüber hinaus konnte ich [zweiter relevanter Erfolg mit quantifizierbaren Daten].

Was mich besonders an [Firmenname] reizt, ist [spezifischer Aspekt — Mission, technische Herausforderung, Produkt, Unternehmenskultur]. Ich bin davon überzeugt, dass meine Erfahrung in [relevanter Fachbereich] mir erlaubt, vom ersten Tag an einen bedeutsamen Beitrag für Ihr Unternehmen zu leisten.

Ich freue mich auf die Gelegenheit, in einem persönlichen Gespräch zu besprechen, wie ich Ihre Ziele als ${jobTitle} unterstützen kann. Vielen Dank für die Berücksichtigung meiner Bewerbung.

Mit freundlichen Grüßen,
[Ihr Name]

---

## Schlüsselelemente eines Wirkungsvollen Bewerbungsschreibens

### Personalisierte Einleitung

Beginnen Sie mit einem konkreten Bezug zum Unternehmen — ein aktuelles Projekt, ein Produkt, eine Auszeichnung oder ein Unternehmenswert, der Sie anspricht. Das zeigt, dass Sie sich mit dem Arbeitgeber auseinandergesetzt haben und nicht dieselbe Massenbewerbung an dutzende Firmen verschicken. Vermeiden Sie abgedroschene Eröffnungen wie „Hiermit bewerbe ich mich..." ohne weiteren Kontext.

### Quantifizierte Erfolge

Untermauen Sie Ihre Eignung mit konkreten Zahlen und Ergebnissen aus Ihrer bisherigen Tätigkeit. „Ich habe die Kundenzufriedenheit um 28 % gesteigert" ist deutlich überzeugender als „Ich habe die Kundenzufriedenheit verbessert". Wählen Sie 2-3 Erfolge, die direkt auf die Anforderungen der ausgeschriebenen ${jobTitle}-Stelle einzahlen.

### Bezug zum Unternehmen

Erklären Sie, warum gerade dieses Unternehmen für Sie interessant ist. Personalverantwortliche erkennen sofort, wenn ein Bewerber echtes Interesse mitbringt statt eine generische Bewerbung einzureichen. Recherchieren Sie aktuelle Nachrichten, die Unternehmenskultur oder spezifische Projekte und stellen Sie einen nachvollziehbaren Zusammenhang zu Ihrer Karriere her.

### Abschluss mit Mehrwertversprechen

Beenden Sie Ihr Anschreiben mit einer klaren Zusammenfassung dessen, was Sie dem Unternehmen bieten können, und einer proaktiven Bitte um ein Vorstellungsgespräch. Ein überzeugender Abschluss hinterlässt einen positiven letzten Eindruck und signalisiert Selbstvertrauen, ohne aufdringlich zu wirken.

## Tipps nach Erfahrungslevel

### Berufseinsteiger
- Heben Sie Praktika, Werkstudententätigkeiten, Studienprojekte und ehrenamtliches Engagement hervor
- Zeigen Sie Begeisterung für die Branche und echte Lernbereitschaft
- Betonen Sie übertragbare Fähigkeiten aus Studium und Nebentätigkeiten, die für die ${jobTitle}-Rolle relevant sind
- Erklären Sie, warum Sie sich bewusst für diese Laufbahn entschieden haben

### Berufserfahrene
- Konzentrieren Sie sich auf messbare Leistungen mit konkretem Einfluss auf Geschäftsergebnisse
- Zeigen Sie eine klare Entwicklung in Verantwortung und Fachkompetenz
- Quantifizieren Sie Ihre Beiträge mit Prozentwerten, Umsatzzahlen oder Effizienzgewinnen
- Stellen Sie einen direkten Bezug zwischen Ihren Erfolgen und den Anforderungen der Stelle her

### Senior-Führungskräfte
- Betonen Sie strategische Entscheidungen und deren Auswirkungen auf Unternehmensebene
- Beschreiben Sie, wie Sie Teams aufgebaut, entwickelt und zum Erfolg geführt haben
- Nennen Sie Beispiele für Initiativen mit langfristigem, nachhaltigem Einfluss
- Zeigen Sie Ihre Vision für die Weiterentwicklung des Fachbereichs oder der Abteilung

## Häufige Fehler in Bewerbungsschreiben

- **Generische Einleitung ohne Unternehmensbezug** — „Hiermit bewerbe ich mich auf die ausgeschriebene Stelle" ohne konkreten Kontext verschenkt den wichtigsten ersten Eindruck und signalisiert mangelndes Interesse
- **Lebenslauf im Fließtext wiederholen** — Ihr Anschreiben soll Kontext und Motivation liefern, nicht Ihren Werdegang nacherzählen. Wählen Sie 2-3 Schlüsselerfolge und erklären Sie deren Relevanz für die Stelle
- **Fehlende Recherche zum Unternehmen** — Nichts Spezifisches über den Arbeitgeber zu erwähnen zeigt, dass Sie sich nicht mit der Stelle auseinandergesetzt haben. Personalverantwortliche erkennen Massenbewerbungen sofort
- **Zu langes Anschreiben** — Ein Bewerbungsschreiben, das länger als eine DIN-A4-Seite ist, wird selten vollständig gelesen. Kürzen Sie auf das Wesentliche und formulieren Sie prägnant
- **Rechtschreib- und Grammatikfehler** — Ein einziger Fehler kann zur sofortigen Absage führen, besonders für ${jobTitle}-Positionen, in denen Sorgfalt und Detailgenauigkeit erwartet werden. Lassen Sie Ihr Anschreiben immer von einer zweiten Person gegenlesen

## Ergänzen Sie Ihr Anschreiben mit einem Professionellen Lebenslauf

Ein überzeugendes Bewerbungsschreiben entfaltet seine volle Wirkung erst zusammen mit einem ebenso professionellen Lebenslauf. Nutzen Sie unseren [KI-gestützten Lebenslauf-Generator](/de/builder), um in wenigen Minuten einen ATS-optimierten Lebenslauf zu erstellen, der perfekt zu Ihrem Anschreiben passt.

Weitere hilfreiche Ressourcen:
- [${jobTitle} Lebenslauf Beispiel und Vorlage](/de/resume-examples/${slug}) — Passender Lebenslauf für Ihre Bewerbung
- [KI-Anschreiben-Generator](/de/tools/cover-letter) — Erstellen Sie Ihr Bewerbungsschreiben automatisch mit KI-Unterstützung
- [ATS-freundliche Lebenslauf-Vorlagen](/de/ats-friendly-templates) — Professionelle Vorlagen für maximale Kompatibilität
`;
}
