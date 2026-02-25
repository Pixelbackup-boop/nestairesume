/**
 * French (fr) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-fr.mjs')
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-fr.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Marie Dupont',
  authorBio: 'Specialiste en developpement de carriere et redaction de lettres de motivation avec plus de 10 ans d\'experience aidant les professionnels francophones.',
  titlePattern: (job) => `Lettre de Motivation ${job} : Exemple et Guide de Redaction 2026`,
  descriptionPattern: (job) => `Exemple de lettre de motivation pour ${job.toLowerCase()} avec modeles professionnels. Apprenez a mettre en valeur vos competences et decrocher des entretiens en 2026.`,
};

// ─── JOB TITLES (English → French) ─────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Aide-Comptable',
  'Corporate Trainer': 'Formateur en Entreprise',
  'Customer Service Representative': 'Representant du Service Client',
  'EMT/Paramedic': 'Ambulancier/Paramedic',
  'Frontend Developer': 'Developpeur Frontend',
  'Healthcare Administrator': 'Administrateur de Sante',
  'Human Resources Manager': 'Responsable des Ressources Humaines',
  'Machinist': 'Usineur',
  'Registered Nurse': 'Infirmier Diplome',
  'Solutions Architect': 'Architecte de Solutions',
  'Systems Administrator': 'Administrateur Systemes',
  'Tax Accountant': 'Comptable Fiscaliste',
};

// ─── CATEGORIES (English → French) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Technologie',
  Healthcare: 'Sante',
  'Food Service': 'Restauration',
  Hospitality: 'Hotellerie',
  Trades: 'Metiers Manuels',
  Creative: 'Creatif',
  Education: 'Education',
  Marketing: 'Marketing',
  Government: 'Fonction Publique',
  Business: 'Affaires',
  Sales: 'Ventes',
  Engineering: 'Ingenierie',
  'Business & Finance': 'Affaires et Finance',
  Legal: 'Juridique',
  HR: 'Ressources Humaines',
  'Skilled Trades': 'Metiers Qualifies',
  'Real Estate': 'Immobilier',
  'Customer Service': 'Service Client',
  'Animal Care': 'Soins Animaliers',
  Administrative: 'Administratif',
  Transportation: 'Transport',
  Logistics: 'Logistique',
  Fitness: 'Fitness',
  Cleaning: 'Entretien',
  Retail: 'Commerce de Detail',
  Management: 'Gestion',
  'Social Services': 'Services Sociaux',
  Manufacturing: 'Industrie',
  Accounting: 'Comptabilite',
  Construction: 'Construction',
  Security: 'Securite',
  Science: 'Sciences',
  'Health & Fitness': 'Sante et Fitness',
  Research: 'Recherche',
  Finance: 'Finance',
  'Writing & Content': 'Redaction et Contenu',
  'Supply Chain': 'Chaine d\'Approvisionnement',
  Quality: 'Qualite',
  Media: 'Medias',
  Maritime: 'Maritime',
  'Law Enforcement': 'Forces de l\'Ordre',
  Facilities: 'Gestion des Installations',
  Executive: 'Direction',
  Events: 'Evenementiel',
  'Entry-Level': 'Debutant',
  Entrepreneurship: 'Entrepreneuriat',
  Consulting: 'Conseil',
  Childcare: 'Petite Enfance',
  'Banking & Finance': 'Banque et Finance',
  Banking: 'Banque',
  Aviation: 'Aviation',
  Automotive: 'Automobile',
  Architecture: 'Architecture',
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

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

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `Dans le secteur technologique, une lettre de motivation de ${job} doit aller au-dela de la simple enumeration de langages et d'outils maitrises. Les responsables du recrutement cherchent des candidats capables de demontrer comment leurs competences techniques ont resolu des problemes concrets et genere de la valeur pour les entreprises precedentes. Votre lettre doit etablir un lien direct entre votre expertise et les besoins specifiques du poste.`,
  Healthcare: (job) => `Le secteur de la sante accorde une importance particuliere a l'engagement envers le bien-etre des patients. Une lettre de motivation de ${job} doit refleter a la fois vos competences cliniques et votre empathie professionnelle. Les recruteurs veulent voir que vous comprenez les enjeux ethiques et humains du poste, en plus de vos qualifications techniques.`,
  Finance: (job) => `Les recruteurs en finance et comptabilite recherchent des candidats dont la lettre de motivation demontre rigueur analytique et integrite professionnelle. Votre candidature de ${job} doit illustrer votre capacite a gerer des responsabilites financieres avec precision tout en respectant les normes reglementaires du secteur.`,
  'Food Service': (job) => `En restauration, une lettre de motivation de ${job} doit transmettre votre passion pour la gastronomie et votre capacite a performer dans un environnement rythme. Les responsables de recrutement valorisent les candidats qui demontrent un esprit d'equipe solide, une connaissance des normes d'hygiene et un engagement envers l'experience client.`,
  Hospitality: (job) => `Le secteur de l'hotellerie valorise les candidats qui incarnent l'excellence du service. Votre lettre de motivation de ${job} doit refleter votre sens de l'accueil, votre attention aux details et votre capacite a creer des experiences memorables pour la clientele. Les recruteurs cherchent des professionnels qui allient competences operationnelles et chaleur humaine.`,
  Trades: (job) => `Pour les metiers manuels et techniques, une lettre de motivation de ${job} efficace met en avant votre experience pratique, vos certifications et votre engagement envers la securite sur le lieu de travail. Les employeurs recherchent des professionnels fiables, autonomes et capables de produire un travail de qualite dans le respect des delais.`,
  Engineering: (job) => `Les postes d'ingenierie exigent une lettre de motivation de ${job} qui demontre votre capacite a resoudre des problemes complexes de maniere methodique. Les recruteurs veulent voir des preuves concretes de projets menes a bien, de votre maitrise des outils techniques et de votre comprehension des contraintes industrielles.`,
  Creative: (job) => `Dans les metiers creatifs, votre lettre de motivation de ${job} est elle-meme un echantillon de votre talent. Elle doit demontrer votre sensibilite artistique tout en prouvant votre comprehension des objectifs commerciaux. Les directeurs creatifs recherchent des candidats capables de concilier vision artistique et exigences du client.`,
  Education: (job) => `Le secteur de l'education valorise les candidats qui demontrent une vocation authentique pour la transmission du savoir. Votre lettre de motivation de ${job} doit refleter votre philosophie pedagogique, votre capacite d'adaptation aux differents profils d'apprenants et votre engagement pour la reussite educative.`,
  Administrative: (job) => `Les postes administratifs requierent une lettre de motivation de ${job} qui illustre votre sens de l'organisation, votre discretion et votre polyvalence. Les recruteurs cherchent des candidats capables d'anticiper les besoins, de gerer plusieurs priorites simultanement et d'assurer le bon fonctionnement des operations quotidiennes.`,
  Sales: (job) => `Votre lettre de motivation de ${job} est votre premiere demonstration commerciale : elle doit convaincre. Les responsables du recrutement evaluent votre capacite a communiquer de maniere persuasive, a identifier les besoins du client et a presenter une proposition de valeur claire. Chaque paragraphe doit illustrer votre potentiel commercial.`,
  Marketing: (job) => `En marketing, votre lettre de motivation de ${job} doit refleter votre comprehension des strategies de communication et votre capacite a generer des resultats mesurables. Les recruteurs veulent voir que vous maitrisez a la fois la reflexion strategique et l'execution operationnelle, avec des exemples concrets de campagnes ou d'initiatives reussies.`,
  HR: (job) => `Les postes en ressources humaines exigent une lettre de motivation de ${job} qui demontre votre comprehension des dynamiques organisationnelles et votre sensibilite aux enjeux humains de l'entreprise. Votre candidature doit illustrer votre capacite a equilibrer les interets des collaborateurs et ceux de l'organisation.`,
  'Customer Service': (job) => `Les postes en service client necessitent une lettre de motivation de ${job} qui met en evidence votre capacite d'ecoute, votre patience et votre talent pour la resolution de problemes. Les recruteurs recherchent des candidats capables de transformer les situations difficiles en experiences positives pour le client.`,
  Logistics: (job) => `Le secteur logistique valorise la precision et l'efficacite operationnelle. Votre lettre de motivation de ${job} doit demontrer votre capacite a gerer des operations complexes, a respecter les delais et a optimiser les processus. Les employeurs cherchent des professionnels methodiques avec une solide experience en gestion de flux.`,
  Government: (job) => `Les candidatures dans le secteur public suivent des conventions specifiques. Votre lettre de motivation de ${job} doit demontrer votre engagement pour le service public, votre comprehension du cadre reglementaire et votre capacite a travailler dans le respect des procedures administratives etablies.`,
  Legal: (job) => `Le secteur juridique exige une lettre de motivation de ${job} irreprochable sur le fond comme sur la forme. Les recruteurs evaluent votre rigueur intellectuelle, votre capacite d'analyse et votre maitrise du vocabulaire juridique. Chaque phrase doit refleter la precision et l'attention au detail attendues dans la profession.`,
  Science: (job) => `Les postes scientifiques necessitent une lettre de motivation de ${job} qui met en avant votre demarche analytique et vos contributions a la recherche. Les recruteurs veulent voir des preuves de votre rigueur methodologique, de vos publications ou projets significatifs et de votre capacite a vulgariser des concepts complexes.`,
  Fitness: (job) => `Dans le secteur du sport et du bien-etre, votre lettre de motivation de ${job} doit transmettre votre passion pour l'accompagnement et votre expertise technique. Les employeurs recherchent des professionnels certifies qui demontrent un veritable engagement envers la sante et la progression de leurs clients.`,
  Cleaning: (job) => `Pour les postes d'entretien, une lettre de motivation de ${job} efficace met en valeur votre fiabilite, votre sens du detail et votre connaissance des produits et techniques de nettoyage professionnels. Les employeurs privilegient les candidats ponctuels, autonomes et soucieux de maintenir des standards de proprete eleves.`,
  'Entry-Level': (job) => `Pour un premier emploi, votre lettre de motivation de ${job} doit compenser le manque d'experience par l'enthousiasme, la motivation et les competences transferables acquises durant vos etudes ou stages. Les recruteurs valorisent les jeunes diplomes qui demontrent un potentiel d'apprentissage rapide et une reelle envie de contribuer.`,
  Business: (job) => `Le monde des affaires exige une lettre de motivation de ${job} qui demontre votre sens strategique et votre orientation resultats. Les recruteurs recherchent des candidats capables de contribuer a la croissance de l'entreprise, avec une comprehension claire des enjeux commerciaux et une capacite a proposer des solutions concretes.`,
  default: (job) => `Une lettre de motivation de ${job} efficace etablit un lien direct entre vos competences et les besoins specifiques de l'entreprise. Elle demontre votre comprehension du poste, met en valeur vos realisations les plus pertinentes et transmet votre motivation authentique pour cette opportunite professionnelle.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `lettre de motivation ${lower}`,
    `exemple lettre de motivation ${lower}`,
    `modele lettre de motivation ${lower}`,
    `lettre de motivation professionnelle`,
    `rediger lettre de motivation`,
    `candidature ${lower}`,
    `lettre de motivation 2026`,
    `exemple de candidature`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Comment rediger une lettre de motivation pour un poste de ${lower} ?`,
      answer: `Commencez par une accroche personnalisee qui mentionne l'entreprise et le poste vise. Developpez ensuite deux ou trois realisations concretes en lien avec les exigences du poste de ${lower}, en utilisant des chiffres et des resultats mesurables. Terminez par une conclusion qui exprime votre motivation et propose un entretien.`,
    },
    {
      question: `Quelle est la longueur ideale d'une lettre de motivation de ${lower} ?`,
      answer: `Une lettre de motivation de ${lower} doit tenir sur une seule page, soit environ 250 a 400 mots. Les recruteurs consacrent peu de temps a chaque candidature, privilegiez donc la concision et l'impact. Chaque paragraphe doit apporter une information nouvelle et pertinente pour le poste vise.`,
    },
    {
      question: `Faut-il repeter le contenu du CV dans la lettre de motivation de ${lower} ?`,
      answer: `Non, la lettre de motivation ne doit pas etre une repetition de votre CV. Elle doit completer votre CV en apportant du contexte, en expliquant vos motivations et en developpant les realisations les plus pertinentes pour le poste de ${lower}. Utilisez-la pour raconter l'histoire derriere les chiffres et demontrer votre personnalite professionnelle.`,
    },
    {
      question: `Est-il toujours necessaire d'envoyer une lettre de motivation pour un poste de ${lower} ?`,
      answer: `Meme lorsque l'offre d'emploi ne l'exige pas explicitement, une lettre de motivation bien redigee pour un poste de ${lower} peut faire la difference entre deux candidats a competences egales. Elle demontre votre serieux, votre interet reel pour le poste et votre capacite a communiquer de maniere professionnelle.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'competences cles du poste';
  const skill1 = skills[0] || 'gestion de projet';
  const skill2 = skills[1] || 'travail en equipe';
  const skill3 = skills[2] || 'communication';
  const skill4 = skills[3] || 'resolution de problemes';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Ce qui Distingue une Lettre de Motivation de ${jobTitle}

${opener}

Une lettre de motivation convaincante pour un poste de ${lower} ne se contente pas de resumer votre parcours. Elle demontre que vous avez pris le temps de comprendre les enjeux du poste et de l'entreprise, et que vous possedez les competences specifiques pour y repondre. C'est votre opportunite de montrer votre personnalite professionnelle et de vous demarquer des autres candidats.

## Exemple de Lettre de Motivation de ${jobTitle}

> **Objet : Candidature au poste de ${jobTitle} — Ref. [Reference de l'Offre]**
>
> Madame, Monsieur,
>
> Votre offre de ${lower} publiee sur [Source de l'Offre] a immediatement retenu mon attention. Fort(e) de mon experience en ${skill1} et ${skill2}, je suis convaincu(e) de pouvoir apporter une contribution significative a [Nom de l'Entreprise].
>
> Au sein de [Entreprise Actuelle/Precedente], j'ai eu l'opportunite de developper une expertise solide en ${topSkills}. Parmi mes realisations les plus marquantes, j'ai [exemple de realisation chiffree en lien avec ${skill1}], ce qui a permis d'ameliorer les resultats de l'equipe de maniere mesurable. Ma maitrise de ${skill3} m'a egalement permis de [exemple de contribution en lien avec ${skill3}].
>
> Ce qui me motive particulierement dans ce poste chez [Nom de l'Entreprise], c'est [raison specifique liee a l'entreprise ou au poste]. Je suis convaincu(e) que mes competences en ${skill4} et mon experience dans le secteur me permettront de contribuer efficacement a vos objectifs.
>
> Je serais ravi(e) de discuter de ma candidature lors d'un entretien et de vous presenter plus en detail comment mon parcours peut repondre a vos attentes. Je reste disponible a votre convenance.
>
> Dans l'attente de votre retour, je vous prie d'agreer, Madame, Monsieur, l'expression de mes salutations distinguees.
>
> [Votre Prenom et Nom]

*Adaptez cet exemple en remplacant les elements entre crochets par vos informations personnelles et celles de l'entreprise visee.*

## Elements Cles d'une Lettre de Motivation Efficace

### Ouverture Personnalisee

Evitez les formules generiques comme "Je me permets de vous adresser ma candidature". Mentionnez le nom de l'entreprise, la reference du poste et une raison precise qui explique votre interet. Les recruteurs repereront immediatement si votre introduction est un copier-coller envoye a des dizaines d'entreprises. Citez un projet recent de l'entreprise, un article de presse ou une valeur qui resonne avec votre parcours de ${lower}.

### Realisations Quantifiees

Chaque affirmation doit etre etayee par des chiffres concrets. Plutot que d'ecrire "j'ai ameliore les processus", ecrivez "j'ai reduit le temps de traitement de 30 % en implementant une nouvelle methode de ${skill1}". Les resultats mesurables donnent de la credibilite a votre candidature et permettent au recruteur d'evaluer l'impact reel de votre travail en tant que ${lower}.

### Connexion avec l'Entreprise

Demontrez que vous avez fait des recherches approfondies sur l'entreprise. Identifiez un defi ou un objectif strategique auquel vous pouvez contribuer grace a vos competences en ${topSkills}. Cette section prouve que votre candidature est ciblee et reflechie, pas simplement opportuniste. Les recruteurs valorisent les candidats qui comprennent leur contexte avant meme le premier entretien.

### Conclusion avec Proposition de Valeur

Votre conclusion ne doit pas etre une simple formule de politesse. Resumez en une phrase ce que vous apportez de unique et proposez concretement un entretien. Reaffirmez votre enthousiasme pour le poste de ${lower} et indiquez votre disponibilite. Une conclusion forte laisse une impression durable et incite le recruteur a vous contacter.

## Conseils par Niveau d'Experience

### Jeunes Diplomes

Sans experience professionnelle significative, misez sur vos stages, projets academiques et competences transferables. Expliquez comment votre formation vous a prepare au poste de ${lower}. Mettez en avant votre motivation, votre capacite d'apprentissage rapide et vos activites extra-professionnelles pertinentes. Les recruteurs comprennent que vous debutez — ils cherchent du potentiel, pas un parcours deja accompli.

### Professionnels Experimentes

Avec plusieurs annees d'experience, selectionnez les deux ou trois realisations les plus pertinentes pour le poste de ${lower} vise. Ne tentez pas de tout couvrir : concentrez-vous sur les resultats qui demontrent le mieux votre valeur ajoutee. Montrez votre evolution professionnelle et votre capacite a prendre des responsabilites croissantes. Les chiffres et les exemples concrets sont vos meilleurs allies.

### Cadres Seniors

A ce niveau, votre lettre de motivation de ${lower} doit refleter votre vision strategique et votre capacite a piloter des equipes et des projets d'envergure. Mettez en avant vos realisations a l'echelle de l'entreprise : transformations reussies, economies realisees, equipes construites. Adoptez un ton confiant mais accessible, et montrez que vous comprenez les enjeux a la fois operationnels et strategiques du poste.

## Erreurs Courantes dans les Lettres de Motivation

- **Envoyer une lettre generique non personnalisee** — Les recruteurs detectent immediatement une lettre type envoyee en masse. Chaque candidature de ${lower} merite une lettre adaptee qui mentionne l'entreprise, le poste et les raisons specifiques de votre interet.

- **Repeter le CV mot pour mot** — Votre lettre de motivation doit completer votre CV, pas le dupliquer. Utilisez-la pour developper le contexte de vos realisations, expliquer vos transitions de carriere et transmettre votre personnalite professionnelle.

- **Commencer chaque phrase par "Je"** — Une lettre centree uniquement sur vous-meme manque de perspective. Alternez entre ce que vous apportez et ce que l'entreprise recherche. Montrez que vous comprenez les besoins du poste de ${lower} et comment vous y repondez.

- **Negliger la forme et l'orthographe** — Une lettre de motivation avec des fautes d'orthographe ou une mise en page desordonnee envoie un signal negatif sur votre rigueur professionnelle. Relisez-vous attentivement et demandez a un tiers de verifier votre texte avant envoi.

- **Oublier l'appel a l'action final** — Terminer sans proposer de suite concrete (entretien, appel telephonique, disponibilite) laisse le recruteur sans direction. Concluez toujours par une proposition claire et une expression de votre disponibilite.

## Completez votre Lettre avec un CV Professionnel

Une lettre de motivation percutante merite un CV a la hauteur. Assurez-vous que votre candidature de ${lower} est coherente de bout en bout :

- [Creez votre CV professionnel](/fr/builder) avec notre outil gratuit et intuitif, optimise pour les systemes ATS
- [Consultez notre exemple de CV de ${lower}](/fr/resume-examples/${slug}) pour vous inspirer de modeles adaptes a votre secteur
- [Generez votre lettre de motivation automatiquement](/fr/tools/cover-letter) avec notre assistant IA qui adapte le contenu a votre profil

Une candidature complete et coherente — CV soigne, lettre de motivation personnalisee — multiplie significativement vos chances de decrocher un entretien pour le poste de ${lower} vise.
`;
}
