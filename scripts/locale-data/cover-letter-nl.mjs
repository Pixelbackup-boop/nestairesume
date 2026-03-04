/**
 * Dutch (nl) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-nl.mjs')
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-nl.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Jan de Vries',
  authorBio: 'Loopbaanspecialist en expert in motivatiebrieven met meer dan 10 jaar ervaring in het helpen van Nederlandstalige professionals bij hun sollicitatie.',
  titlePattern: (job) => `Motivatiebrief ${job}: Voorbeeld en Schrijfgids 2026`,
  descriptionPattern: (job) => `Voorbeeld motivatiebrief voor ${job.toLowerCase()} met professionele sjablonen. Leer hoe u uw vaardigheden benadrukt en sollicitatiegesprekken scoort in 2026.`,
};

// ─── JOB TITLES (English → Dutch) ───────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Boekhouder',
  'Corporate Trainer': 'Bedrijfstrainer',
  'Customer Service Representative': 'Klantenservicemedewerker',
  'EMT/Paramedic': 'Ambulancemedewerker/Paramedicus',
  'Frontend Developer': 'Frontend Ontwikkelaar',
  'Healthcare Administrator': 'Zorgadministrateur',
  'Human Resources Manager': 'HR-manager',
  'Machinist': 'Machinist',
  'Registered Nurse': 'Verpleegkundige',
  'Solutions Architect': 'Solutions Architect',
  'Systems Administrator': 'Systeembeheerder',
  'Tax Accountant': 'Fiscaal Accountant',
};

// ─── CATEGORIES (English → Dutch) ────────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Technologie',
  Healthcare: 'Gezondheidszorg',
  'Food Service': 'Foodservice',
  Hospitality: 'Horeca',
  Trades: 'Vakmanschap',
  Creative: 'Creatief',
  Education: 'Onderwijs',
  Marketing: 'Marketing',
  Government: 'Overheid',
  Business: 'Bedrijfsleven',
  Sales: 'Verkoop',
  Engineering: 'Techniek',
  'Business & Finance': 'Bedrijf en Financien',
  Legal: 'Juridisch',
  HR: 'Human Resources',
  'Skilled Trades': 'Gekwalificeerd Vakmanschap',
  'Real Estate': 'Vastgoed',
  'Customer Service': 'Klantenservice',
  'Animal Care': 'Dierenverzorging',
  Administrative: 'Administratief',
  Transportation: 'Transport',
  Logistics: 'Logistiek',
  Fitness: 'Fitness',
  Cleaning: 'Schoonmaak',
  Retail: 'Retail',
  Management: 'Management',
  'Social Services': 'Sociale Diensten',
  Manufacturing: 'Productie',
  Accounting: 'Boekhouding',
  Construction: 'Bouw',
  Security: 'Beveiliging',
  Science: 'Wetenschap',
  'Health & Fitness': 'Gezondheid en Fitness',
  Research: 'Onderzoek',
  Finance: 'Financien',
  'Writing & Content': 'Schrijven en Content',
  'Supply Chain': 'Supply Chain',
  Quality: 'Kwaliteit',
  Media: 'Media',
  Maritime: 'Maritiem',
  'Law Enforcement': 'Politie en Handhaving',
  Facilities: 'Facilitair Beheer',
  Executive: 'Directie',
  Events: 'Evenementen',
  'Entry-Level': 'Startend',
  Entrepreneurship: 'Ondernemerschap',
  Consulting: 'Advies',
  Childcare: 'Kinderopvang',
  'Banking & Finance': 'Bank en Financien',
  Banking: 'Bankwezen',
  Aviation: 'Luchtvaart',
  Automotive: 'Automotive',
  Architecture: 'Architectuur',
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function normalizeCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('hospitality') || c.includes('hotel')) return 'Hospitality';
  if (c.includes('tech') || c.includes('software') || c.includes('it')) return 'Technology';
  if (c.includes('engineering')) return 'Engineering';
  if (c.includes('health') || c.includes('medical') || c.includes('nursing')) return 'Healthcare';
  if (c.includes('finance') || c.includes('accounting') || c.includes('banking')) return 'Finance';
  if (c.includes('food') || c.includes('culinary') || c.includes('restaurant')) return 'Food Service';
  if (c.includes('trade') || c.includes('construction') || c.includes('manufacturing') || c.includes('skilled')) return 'Trades';
  if (c.includes('creative') || c.includes('design') || c.includes('art') || c.includes('media') || c.includes('writing')) return 'Creative';
  if (c.includes('education') || c.includes('teaching') || c.includes('childcare')) return 'Education';
  if (c.includes('admin') || c.includes('office') || c.includes('executive') || c.includes('facilities')) return 'Administrative';
  if (c.includes('sales') || c.includes('retail')) return 'Sales';
  if (c.includes('marketing')) return 'Marketing';
  if (c.includes('hr') || c.includes('human resource')) return 'HR';
  if (c.includes('customer') || c.includes('support')) return 'Customer Service';
  if (c.includes('logistics') || c.includes('warehouse') || c.includes('supply') || c.includes('transport')) return 'Logistics';
  if (c.includes('government') || c.includes('law enforcement') || c.includes('security') || c.includes('police')) return 'Government';
  if (c.includes('legal') || c.includes('consulting')) return 'Legal';
  if (c.includes('science') || c.includes('research')) return 'Science';
  if (c.includes('fitness') || c.includes('animal')) return 'Fitness';
  if (c.includes('cleaning')) return 'Cleaning';
  if (c.includes('aviation') || c.includes('automotive') || c.includes('maritime')) return 'Logistics';
  if (c.includes('event') || c.includes('entrepreneurship')) return 'Business';
  if (c.includes('entry')) return 'Entry-Level';
  return 'default';
}

// ─── CATEGORY OPENERS ────────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `In de technologische sector moet een motivatiebrief voor ${job} verder gaan dan het opsommen van beheerste programmeertalen en tools. Hiring managers zoeken kandidaten die kunnen aantonen hoe hun technische vaardigheden concrete problemen hebben opgelost en waarde hebben gecreeerd voor eerdere werkgevers. Uw brief moet een directe link leggen tussen uw expertise en de specifieke behoeften van de functie.`,
  Healthcare: (job) => `De zorgsector hecht bijzonder veel belang aan betrokkenheid bij het welzijn van patienten. Een motivatiebrief voor ${job} moet zowel uw klinische vaardigheden als uw professionele empathie weerspiegelen. Recruiters willen zien dat u de ethische en menselijke aspecten van de functie begrijpt, naast uw technische kwalificaties.`,
  Finance: (job) => `Recruiters in financien en boekhouding zoeken kandidaten wiens motivatiebrief analytische scherpte en professionele integriteit aantoont. Uw sollicitatie als ${job} moet illustreren dat u financiele verantwoordelijkheden met precisie kunt beheren, terwijl u de regelgevende normen van de sector naleeft.`,
  'Food Service': (job) => `In de horeca moet een motivatiebrief voor ${job} uw passie voor gastronomie en uw vermogen om te presteren in een snelle omgeving overbrengen. Hiring managers waarderen kandidaten die een sterk teamverband aantonen, kennis van hygienenormen en een betrokkenheid bij de klantervaring.`,
  Hospitality: (job) => `De horecasector waardeert kandidaten die service-excellentie belichamen. Uw motivatiebrief voor ${job} moet uw gastvrijheid, oog voor detail en vermogen om gedenkwaardige ervaringen voor gasten te creeren weerspiegelen. Recruiters zoeken professionals die operationele vaardigheden combineren met menselijke warmte.`,
  Trades: (job) => `Voor vakmanschaps- en technische functies benadrukt een effectieve motivatiebrief voor ${job} uw praktijkervaring, certificeringen en betrokkenheid bij veiligheid op de werkplek. Werkgevers zoeken betrouwbare, zelfstandige professionals die kwalitatief werk leveren binnen de gestelde deadlines.`,
  Engineering: (job) => `Ingenieursfuncties vereisen een motivatiebrief voor ${job} die aantoont dat u complexe problemen methodisch kunt oplossen. Recruiters willen concrete bewijzen zien van succesvol afgeronde projecten, uw beheersing van technische tools en uw begrip van industriele beperkingen.`,
  Creative: (job) => `In creatieve vakgebieden is uw motivatiebrief voor ${job} zelf een voorbeeld van uw talent. Hij moet uw artistieke sensibiliteit aantonen terwijl hij tegelijk uw begrip van commerciele doelstellingen bewijst. Creatieve directeuren zoeken kandidaten die artistieke visie en klantbehoeften kunnen combineren.`,
  Education: (job) => `De onderwijssector waardeert kandidaten die een authentieke roeping voor kennisoverdracht aantonen. Uw motivatiebrief voor ${job} moet uw pedagogische filosofie, uw aanpassingsvermogen aan diverse leerprofielen en uw betrokkenheid bij onderwijssucces weerspiegelen.`,
  Administrative: (job) => `Administratieve functies vereisen een motivatiebrief voor ${job} die uw organisatietalent, discretie en veelzijdigheid illustreert. Recruiters zoeken kandidaten die behoeften kunnen anticiperen, meerdere prioriteiten tegelijk kunnen beheren en de dagelijkse operaties soepel kunnen laten verlopen.`,
  Sales: (job) => `Uw motivatiebrief voor ${job} is uw eerste verkooppitch: hij moet overtuigen. Hiring managers evalueren uw vermogen om overtuigend te communiceren, klantbehoeften te identificeren en een duidelijke waardepropositie te presenteren. Elke alinea moet uw commercieel potentieel illustreren.`,
  Marketing: (job) => `In marketing moet uw motivatiebrief voor ${job} uw begrip van communicatiestrategieen en uw vermogen om meetbare resultaten te genereren weerspiegelen. Recruiters willen zien dat u zowel strategisch denken als operationele uitvoering beheerst, met concrete voorbeelden van succesvolle campagnes of initiatieven.`,
  HR: (job) => `HR-functies vereisen een motivatiebrief voor ${job} die uw begrip van organisatiedynamieken en uw gevoeligheid voor de menselijke aspecten van de organisatie aantoont. Uw sollicitatie moet illustreren dat u de belangen van medewerkers en de organisatie in evenwicht kunt brengen.`,
  'Customer Service': (job) => `Klantenservice-functies vereisen een motivatiebrief voor ${job} die uw luistervaardigheid, geduld en talent voor probleemoplossing benadrukt. Recruiters zoeken kandidaten die moeilijke situaties kunnen omzetten in positieve klantervaringen.`,
  Logistics: (job) => `De logistieke sector waardeert precisie en operationele efficientie. Uw motivatiebrief voor ${job} moet aantonen dat u complexe operaties kunt beheren, deadlines kunt naleven en processen kunt optimaliseren. Werkgevers zoeken methodische professionals met solide ervaring in stroommanagement.`,
  Government: (job) => `Sollicitaties in de publieke sector volgen specifieke conventies. Uw motivatiebrief voor ${job} moet uw betrokkenheid bij publieke dienstverlening, uw begrip van het regelgevend kader en uw vermogen om te werken binnen vastgestelde administratieve procedures aantonen.`,
  Legal: (job) => `De juridische sector vereist een onberispelijke motivatiebrief voor ${job}, zowel qua inhoud als vorm. Recruiters evalueren uw intellectuele scherpte, analytisch vermogen en beheersing van juridisch vocabulaire. Elke zin moet de precisie en aandacht voor detail weerspiegelen die in het beroep verwacht worden.`,
  Science: (job) => `Wetenschappelijke functies vereisen een motivatiebrief voor ${job} die uw analytische aanpak en bijdragen aan onderzoek benadrukt. Recruiters willen bewijs zien van uw methodologische nauwkeurigheid, uw publicaties of significante projecten en uw vermogen om complexe concepten toegankelijk te maken.`,
  Fitness: (job) => `In de sport- en welzijnssector moet uw motivatiebrief voor ${job} uw passie voor begeleiding en uw technische expertise overbrengen. Werkgevers zoeken gecertificeerde professionals die een echte betrokkenheid bij de gezondheid en voortgang van hun klanten aantonen.`,
  Cleaning: (job) => `Voor schoonmaakfuncties benadrukt een effectieve motivatiebrief voor ${job} uw betrouwbaarheid, oog voor detail en kennis van professionele reinigingsproducten en -technieken. Werkgevers geven de voorkeur aan punctuele, zelfstandige kandidaten die hoge hygienenormen handhaven.`,
  'Entry-Level': (job) => `Voor een eerste baan moet uw motivatiebrief voor ${job} het gebrek aan ervaring compenseren met enthousiasme, motivatie en overdraagbare vaardigheden die tijdens uw studie of stages zijn verworven. Recruiters waarderen afgestudeerden die een snel leervermogen en een echte wil om bij te dragen aantonen.`,
  Business: (job) => `De zakenwereld vereist een motivatiebrief voor ${job} die uw strategisch inzicht en resultaatgerichtheid aantoont. Recruiters zoeken kandidaten die kunnen bijdragen aan de groei van de organisatie, met een duidelijk begrip van de commerciele uitdagingen en het vermogen om concrete oplossingen voor te stellen.`,
  default: (job) => `Een effectieve motivatiebrief voor ${job} legt een directe link tussen uw vaardigheden en de specifieke behoeften van de organisatie. Hij toont uw begrip van de functie, benadrukt uw meest relevante prestaties en brengt uw authentieke motivatie voor deze professionele kans over.`,
};

// ─── TAGS GENERATOR ──────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `motivatiebrief ${lower}`,
    `voorbeeld motivatiebrief ${lower}`,
    `sollicitatiebrief ${lower}`,
    `motivatiebrief schrijven ${lower}`,
    `motivatiebrief template`,
    `sollicitatiebrief template`,
    `motivatiebrief voorbeeld`,
    `sollicitatiebrief schrijven`,
  ];
}

// ─── FAQ GENERATOR ───────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Hoe schrijf ik een motivatiebrief voor een functie als ${lower}?`,
      answer: `Begin met een gepersonaliseerde opening die de organisatie en de beoogde functie vermeldt. Beschrijf vervolgens twee of drie concrete prestaties die aansluiten bij de vereisten van de functie als ${lower}, met cijfers en meetbare resultaten. Sluit af met een conclusie die uw motivatie uitdrukt en een gesprek voorstelt.`,
    },
    {
      question: `Hoe lang moet een motivatiebrief voor ${lower} zijn?`,
      answer: `Een motivatiebrief voor ${lower} moet op een pagina passen, dus ongeveer 250 tot 400 woorden. Recruiters besteden weinig tijd aan elke sollicitatie, dus geef de voorkeur aan beknoptheid en impact. Elke alinea moet nieuwe en relevante informatie bevatten voor de beoogde functie.`,
    },
    {
      question: `Moet ik de inhoud van mijn cv herhalen in de motivatiebrief voor ${lower}?`,
      answer: `Nee, de motivatiebrief mag geen herhaling zijn van uw cv. Hij moet uw cv aanvullen door context te bieden, uw motivaties uit te leggen en de meest relevante prestaties voor de functie als ${lower} verder uit te werken. Gebruik hem om het verhaal achter de cijfers te vertellen en uw professionele persoonlijkheid aan te tonen.`,
    },
    {
      question: `Is het altijd nodig een motivatiebrief mee te sturen voor een functie als ${lower}?`,
      answer: `Zelfs wanneer de vacature dit niet expliciet vereist, kan een goed geschreven motivatiebrief voor ${lower} het verschil maken tussen twee kandidaten met gelijke competenties. Hij toont uw serieusheid, uw echte interesse in de functie en uw vermogen om professioneel te communiceren.`,
    },
  ];
}

// ─── BODY GENERATOR ──────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'kernvaardigheden van de functie';
  const skill1 = skills[0] || 'projectmanagement';
  const skill2 = skills[1] || 'teamwork';
  const skill3 = skills[2] || 'communicatie';
  const skill4 = skills[3] || 'probleemoplossing';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Wat Maakt een Goede Motivatiebrief voor ${jobTitle}?

${opener}

Een overtuigende motivatiebrief voor een functie als ${lower} vat niet alleen uw loopbaan samen. Hij toont dat u de tijd heeft genomen om de uitdagingen van de functie en de organisatie te begrijpen, en dat u de specifieke vaardigheden bezit om hierop in te spelen. Dit is uw kans om uw professionele persoonlijkheid te laten zien en u te onderscheiden van andere kandidaten.

## Voorbeeld Motivatiebrief voor ${jobTitle}

> **Betreft: Sollicitatie functie ${jobTitle} — Ref. [Vacaturenummer]**
>
> Geachte heer/mevrouw [Naam],
>
> Uw vacature voor ${lower} heeft direct mijn aandacht getrokken. Met mijn ervaring in ${skill1} en ${skill2} ben ik ervan overtuigd dat ik een waardevolle bijdrage kan leveren aan [Naam Organisatie].
>
> Bij [Huidige/Vorige Werkgever] heb ik de gelegenheid gehad om een solide expertise op te bouwen in ${topSkills}. Een van mijn meest opvallende prestaties was [voorbeeld van een meetbare prestatie gerelateerd aan ${skill1}], waardoor de resultaten van het team aantoonbaar verbeterden. Mijn beheersing van ${skill3} stelde mij ook in staat om [voorbeeld van bijdrage gerelateerd aan ${skill3}].
>
> Wat mij bijzonder aanspreekt in deze functie bij [Naam Organisatie] is [specifieke reden gerelateerd aan de organisatie of functie]. Ik ben ervan overtuigd dat mijn vaardigheden in ${skill4} en mijn sectorervaring mij in staat stellen effectief bij te dragen aan uw doelstellingen.
>
> Ik bespreek mijn sollicitatie graag in een gesprek en licht u nader toe hoe mijn achtergrond aansluit bij uw verwachtingen. Ik ben beschikbaar op uw convenierende moment.
>
> Met vriendelijke groet,
>
> [Uw Voornaam en Achternaam]

*Pas dit voorbeeld aan door de elementen tussen haakjes te vervangen door uw persoonlijke informatie en die van de beoogde organisatie.*

## Sleutelelementen van een Effectieve Motivatiebrief

### Gepersonaliseerde Opening

Vermijd generieke formules zoals "Hierbij solliciteer ik naar de functie van". Vermeld de naam van de organisatie, het vacaturenummer en een precieze reden die uw interesse verklaart. Recruiters herkennen onmiddellijk of uw opening een kopieer-plak is die naar tientallen organisaties is gestuurd. Verwijs naar een recent project van de organisatie, een nieuwsartikel of een waarde die aansluit bij uw loopbaan als ${lower}.

### Gekwantificeerde Prestaties

Elke bewering moet worden onderbouwd met concrete cijfers. Schrijf niet "ik heb processen verbeterd", maar "ik heb de verwerkingstijd met 30% verlaagd door een nieuwe methode voor ${skill1} te implementeren". Meetbare resultaten geven uw sollicitatie geloofwaardigheid en stellen de recruiter in staat de werkelijke impact van uw werk als ${lower} te evalueren.

### Verbinding met de Organisatie

Toon dat u grondig onderzoek heeft gedaan naar de organisatie. Identificeer een uitdaging of strategisch doel waaraan u kunt bijdragen met uw vaardigheden in ${topSkills}. Deze sectie bewijst dat uw sollicitatie gericht en doordacht is, niet slechts opportunistisch. Recruiters waarderen kandidaten die hun context begrijpen nog voor het eerste gesprek.

### Conclusie met Waardepropositie

Uw conclusie mag geen eenvoudige beleefdheidsfrase zijn. Vat in een zin samen wat u uniek bijdraagt en stel concreet een gesprek voor. Bevestig uw enthousiasme voor de functie als ${lower} en geef uw beschikbaarheid aan. Een krachtige conclusie laat een blijvende indruk achter en spoort de recruiter aan u te contacteren.

## Tips per Ervaringsniveau

### Pas Afgestudeerden

Zonder significante werkervaring kunt u compenseren met enthousiasme, motivatie en overdraagbare vaardigheden die tijdens uw studie of stages zijn verworven. Leg uit hoe uw opleiding u heeft voorbereid op de functie als ${lower}. Benadruk uw motivatie, snel leervermogen en relevante buitenschoolse activiteiten. Recruiters begrijpen dat u begint — zij zoeken potentieel, geen voltooid parcours.

### Ervaren Professionals

Met meerdere jaren ervaring selecteert u de twee of drie meest relevante prestaties voor de beoogde functie als ${lower}. Probeer niet alles te behandelen: concentreer u op resultaten die uw toegevoegde waarde het beste aantonen. Toon uw professionele evolutie en uw vermogen om toenemende verantwoordelijkheden op te nemen. Cijfers en concrete voorbeelden zijn uw beste bondgenoten.

### Senior Professionals

Op dit niveau moet uw motivatiebrief voor ${lower} uw strategische visie en uw vermogen om teams en grootschalige projecten aan te sturen weerspiegelen. Benadruk uw prestaties op organisatieniveau: succesvolle transformaties, gerealiseerde besparingen, opgebouwde teams. Neem een zelfverzekerde maar toegankelijke toon aan en toon dat u zowel de operationele als de strategische uitdagingen van de functie begrijpt.

## Veelgemaakte Fouten in Motivatiebrieven

- **Een generieke, niet-gepersonaliseerde brief sturen** — Recruiters herkennen onmiddellijk een standaardbrief die massaal is verstuurd. Elke sollicitatie als ${lower} verdient een aangepaste brief die de organisatie, de functie en de specifieke redenen van uw interesse vermeldt.

- **Het cv woord voor woord herhalen** — Uw motivatiebrief moet uw cv aanvullen, niet dupliceren. Gebruik hem om de context van uw prestaties te ontwikkelen, uw loopbaantransities te verklaren en uw professionele persoonlijkheid over te brengen.

- **Elke zin met "Ik" beginnen** — Een brief die uitsluitend op uzelf is gericht, mist perspectief. Wissel af tussen wat u bijdraagt en wat de organisatie zoekt. Toon dat u de behoeften van de functie als ${lower} begrijpt en hoe u hierop inspeelt.

- **Vorm en spelling verwaarlozen** — Een motivatiebrief met spelfouten of een rommelige opmaak geeft een negatief signaal over uw professionele nauwkeurigheid. Lees aandachtig na en vraag een derde de tekst te controleren voor verzending.

- **De eindoproep tot actie vergeten** — Afsluiten zonder een concrete vervolgstap voor te stellen (gesprek, telefoongesprek, beschikbaarheid) laat de recruiter zonder richting. Sluit altijd af met een duidelijk voorstel en een uitdrukking van uw beschikbaarheid.

## Completeer Uw Brief met een Professioneel cv

Een overtuigende motivatiebrief verdient een cv dat ermee in lijn is. Zorg ervoor dat uw sollicitatie als ${lower} van begin tot eind samenhangend is:

- [Maak uw professioneel cv](/nl/builder) met onze gratis en intuitive tool, geoptimaliseerd voor ATS-systemen
- [Bekijk ons cv-voorbeeld voor ${lower}](/nl/resume-examples/${slug}) voor inspiratie op maat van uw sector
- [Genereer uw motivatiebrief automatisch](/nl/tools/cover-letter) met onze AI-assistent die de inhoud aanpast aan uw profiel

Een complete en samenhangende sollicitatie — een verzorgd cv en een gepersonaliseerde motivatiebrief — vergroot uw kansen op een sollicitatiegesprek voor de functie als ${lower} aanzienlijk.
`;
}
