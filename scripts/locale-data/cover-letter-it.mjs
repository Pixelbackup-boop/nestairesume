/**
 * Italian (it) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-it.mjs')
 *
 * Primary keyword: "lettera di presentazione" (5K/mo)
 * Related: "esempio lettera di presentazione" (5K), "modello lettera di presentazione" (500)
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-it.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Giulia Moretti',
  authorBio: 'Esperta in sviluppo professionale e redazione di lettere di presentazione con oltre 10 anni di esperienza nell\'aiutare professionisti italiani a ottenere colloqui.',
  titlePattern: (job) => `Lettera di Presentazione ${job}: Esempio e Guida alla Scrittura 2026`,
  descriptionPattern: (job) => `Esempio di lettera di presentazione per ${job.toLowerCase()} con modelli professionali. Scopri come valorizzare le tue competenze e ottenere colloqui nel 2026.`,
};

// ─── JOB TITLES (English → Italian) ─────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Contabile',
  'Corporate Trainer': 'Formatore Aziendale',
  'Customer Service Representative': 'Addetto al Servizio Clienti',
  'EMT/Paramedic': 'Tecnico di Emergenza/Paramedico',
  'Frontend Developer': 'Sviluppatore Frontend',
  'Healthcare Administrator': 'Amministratore Sanitario',
  'Human Resources Manager': 'Responsabile Risorse Umane',
  'Machinist': 'Macchinista',
  'Registered Nurse': 'Infermiere Professionale',
  'Solutions Architect': 'Architetto di Soluzioni',
  'Systems Administrator': 'Amministratore di Sistemi',
  'Tax Accountant': 'Commercialista Tributarista',
};

// ─── CATEGORIES (English → Italian) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Tecnologia',
  Healthcare: 'Sanita',
  'Food Service': 'Ristorazione',
  Hospitality: 'Ospitalita',
  Trades: 'Mestieri e Artigianato',
  Creative: 'Settore Creativo',
  Education: 'Istruzione',
  Marketing: 'Marketing',
  Government: 'Pubblica Amministrazione',
  Business: 'Business',
  Sales: 'Vendite',
  Engineering: 'Ingegneria',
  'Business & Finance': 'Business e Finanza',
  Legal: 'Legale',
  HR: 'Risorse Umane',
  'Skilled Trades': 'Mestieri Qualificati',
  'Real Estate': 'Immobiliare',
  'Customer Service': 'Servizio Clienti',
  'Animal Care': 'Cura degli Animali',
  Administrative: 'Amministrativo',
  Transportation: 'Trasporti',
  Logistics: 'Logistica',
  Fitness: 'Fitness',
  Cleaning: 'Pulizie',
  Retail: 'Commercio al Dettaglio',
  Management: 'Management',
  'Social Services': 'Servizi Sociali',
  Manufacturing: 'Industria Manifatturiera',
  Accounting: 'Contabilita',
  Construction: 'Edilizia',
  Security: 'Sicurezza',
  Science: 'Scienze',
  'Health & Fitness': 'Salute e Fitness',
  Research: 'Ricerca',
  Finance: 'Finanza',
  'Writing & Content': 'Scrittura e Contenuti',
  'Supply Chain': 'Supply Chain',
  Quality: 'Qualita',
  Media: 'Media',
  Maritime: 'Settore Marittimo',
  'Law Enforcement': 'Forze dell\'Ordine',
  Facilities: 'Gestione Strutture',
  Executive: 'Direzione',
  Events: 'Eventi',
  'Entry-Level': 'Primo Impiego',
  Entrepreneurship: 'Imprenditoria',
  Consulting: 'Consulenza',
  Childcare: 'Infanzia',
  'Banking & Finance': 'Banca e Finanza',
  Banking: 'Banca',
  Aviation: 'Aviazione',
  Automotive: 'Automotive',
  Architecture: 'Architettura',
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
  Technology: (job) => `Nel settore tecnologico, una lettera di presentazione da ${job} deve andare oltre la semplice elencazione di linguaggi e strumenti padroneggiati. I responsabili delle assunzioni cercano candidati capaci di dimostrare come le proprie competenze tecniche abbiano risolto problemi concreti e generato valore per le aziende precedenti. La tua lettera deve stabilire un collegamento diretto tra la tua expertise e le esigenze specifiche del ruolo.`,
  Healthcare: (job) => `Il settore sanitario attribuisce particolare importanza all'impegno verso il benessere dei pazienti. Una lettera di presentazione da ${job} deve riflettere sia le tue competenze cliniche che la tua empatia professionale. I recruiter vogliono vedere che comprendi le implicazioni etiche e umane del ruolo, oltre alle tue qualifiche tecniche.`,
  Finance: (job) => `I recruiter in ambito finanziario e contabile cercano candidati la cui lettera di presentazione dimostri rigore analitico e integrita professionale. La tua candidatura come ${job} deve illustrare la capacita di gestire responsabilita finanziarie con precisione rispettando le normative di settore.`,
  'Food Service': (job) => `Nella ristorazione, una lettera di presentazione da ${job} deve trasmettere la tua passione per la gastronomia e la capacita di performare in un ambiente frenetico. I responsabili delle assunzioni valorizzano i candidati che dimostrano spirito di squadra solido, conoscenza delle norme igieniche e impegno verso l'esperienza del cliente.`,
  Hospitality: (job) => `Il settore dell'ospitalita valorizza i candidati che incarnano l'eccellenza del servizio. La tua lettera di presentazione da ${job} deve riflettere il tuo senso dell'accoglienza, l'attenzione ai dettagli e la capacita di creare esperienze memorabili per la clientela. I recruiter cercano professionisti che uniscano competenze operative e calore umano.`,
  Trades: (job) => `Per i mestieri manuali e tecnici, una lettera di presentazione da ${job} efficace mette in evidenza la tua esperienza pratica, le certificazioni e l'impegno verso la sicurezza sul lavoro. I datori di lavoro cercano professionisti affidabili, autonomi e capaci di produrre un lavoro di qualita nel rispetto delle tempistiche.`,
  Engineering: (job) => `I ruoli di ingegneria richiedono una lettera di presentazione da ${job} che dimostri la capacita di risolvere problemi complessi in modo metodico. I recruiter vogliono vedere prove concrete di progetti portati a termine, della padronanza degli strumenti tecnici e della comprensione dei vincoli industriali.`,
  Creative: (job) => `Nei mestieri creativi, la tua lettera di presentazione da ${job} e essa stessa un esempio del tuo talento. Deve dimostrare la tua sensibilita artistica dimostrando al contempo la comprensione degli obiettivi commerciali. I direttori creativi cercano candidati capaci di conciliare visione artistica ed esigenze del cliente.`,
  Education: (job) => `Il settore dell'istruzione valorizza i candidati che dimostrano una vocazione autentica per la trasmissione del sapere. La tua lettera di presentazione da ${job} deve riflettere la tua filosofia pedagogica, la capacita di adattamento ai diversi profili di studenti e l'impegno per il successo educativo.`,
  Administrative: (job) => `I ruoli amministrativi richiedono una lettera di presentazione da ${job} che illustri il tuo senso dell'organizzazione, la tua discrezione e la tua polivalenza. I recruiter cercano candidati capaci di anticipare le esigenze, gestire piu priorita contemporaneamente e garantire il buon funzionamento delle operazioni quotidiane.`,
  Sales: (job) => `La tua lettera di presentazione da ${job} e la tua prima dimostrazione commerciale: deve convincere. I responsabili delle assunzioni valutano la tua capacita di comunicare in modo persuasivo, di identificare le esigenze del cliente e di presentare una proposta di valore chiara. Ogni paragrafo deve illustrare il tuo potenziale commerciale.`,
  Marketing: (job) => `Nel marketing, la tua lettera di presentazione da ${job} deve riflettere la comprensione delle strategie di comunicazione e la capacita di generare risultati misurabili. I recruiter vogliono vedere che padroneggi sia il pensiero strategico che l'esecuzione operativa, con esempi concreti di campagne o iniziative riuscite.`,
  HR: (job) => `I ruoli nelle risorse umane richiedono una lettera di presentazione da ${job} che dimostri la comprensione delle dinamiche organizzative e la sensibilita alle questioni umane dell'azienda. La tua candidatura deve illustrare la capacita di bilanciare gli interessi dei collaboratori e quelli dell'organizzazione.`,
  'Customer Service': (job) => `I ruoli nel servizio clienti necessitano di una lettera di presentazione da ${job} che metta in evidenza la capacita di ascolto, la pazienza e il talento nella risoluzione dei problemi. I recruiter cercano candidati capaci di trasformare situazioni difficili in esperienze positive per il cliente.`,
  Logistics: (job) => `Il settore logistico valorizza la precisione e l'efficienza operativa. La tua lettera di presentazione da ${job} deve dimostrare la capacita di gestire operazioni complesse, rispettare le scadenze e ottimizzare i processi. I datori di lavoro cercano professionisti metodici con una solida esperienza nella gestione dei flussi.`,
  Government: (job) => `Le candidature nel settore pubblico seguono convenzioni specifiche. La tua lettera di presentazione da ${job} deve dimostrare l'impegno verso il servizio pubblico, la comprensione del quadro normativo e la capacita di lavorare nel rispetto delle procedure amministrative.`,
  Legal: (job) => `Il settore legale esige una lettera di presentazione da ${job} impeccabile nella forma e nel contenuto. I recruiter valutano il rigore intellettuale, la capacita di analisi e la padronanza del vocabolario giuridico. Ogni frase deve riflettere la precisione e l'attenzione al dettaglio attese nella professione.`,
  Science: (job) => `I ruoli scientifici necessitano di una lettera di presentazione da ${job} che metta in risalto il tuo approccio analitico e i tuoi contributi alla ricerca. I recruiter vogliono vedere prove del rigore metodologico, delle pubblicazioni o dei progetti significativi e della capacita di divulgare concetti complessi.`,
  Fitness: (job) => `Nel settore dello sport e del benessere, la tua lettera di presentazione da ${job} deve trasmettere la passione per l'accompagnamento e la tua competenza tecnica. I datori di lavoro cercano professionisti certificati che dimostrino un reale impegno verso la salute e la progressione dei propri clienti.`,
  Cleaning: (job) => `Per i ruoli nel settore delle pulizie, una lettera di presentazione da ${job} efficace valorizza la tua affidabilita, il senso del dettaglio e la conoscenza dei prodotti e delle tecniche di pulizia professionali. I datori di lavoro privilegiano candidati puntuali, autonomi e attenti al mantenimento di standard elevati di igiene.`,
  'Entry-Level': (job) => `Per un primo impiego, la tua lettera di presentazione da ${job} deve compensare la mancanza di esperienza con l'entusiasmo, la motivazione e le competenze trasferibili acquisite durante gli studi o gli stage. I recruiter valorizzano i neolaureati che dimostrano un rapido potenziale di apprendimento e una reale voglia di contribuire.`,
  Business: (job) => `Il mondo degli affari richiede una lettera di presentazione da ${job} che dimostri il tuo senso strategico e l'orientamento ai risultati. I recruiter cercano candidati capaci di contribuire alla crescita dell'azienda, con una chiara comprensione delle sfide commerciali e la capacita di proporre soluzioni concrete.`,
  default: (job) => `Una lettera di presentazione da ${job} efficace stabilisce un collegamento diretto tra le tue competenze e le esigenze specifiche dell'azienda. Dimostra la tua comprensione del ruolo, valorizza i tuoi risultati piu pertinenti e trasmette la tua motivazione autentica per questa opportunita professionale.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `lettera di presentazione ${lower}`,
    `esempio lettera di presentazione ${lower}`,
    `modello lettera di presentazione ${lower}`,
    `lettera di presentazione professionale`,
    `scrivere lettera di presentazione`,
    `candidatura ${lower}`,
    `lettera di presentazione 2026`,
    `esempio di candidatura`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Come scrivere una lettera di presentazione per un ruolo di ${lower}?`,
      answer: `Inizia con un'apertura personalizzata che menzioni l'azienda e la posizione desiderata. Sviluppa poi due o tre risultati concreti in linea con i requisiti del ruolo di ${lower}, utilizzando numeri e risultati misurabili. Concludi con una chiusura che esprima la tua motivazione e proponga un colloquio.`,
    },
    {
      question: `Qual e la lunghezza ideale di una lettera di presentazione per ${lower}?`,
      answer: `Una lettera di presentazione per ${lower} deve stare in una sola pagina, circa 250-400 parole. I selezionatori dedicano poco tempo a ogni candidatura, quindi privilegia la concisione e l'impatto. Ogni paragrafo deve apportare un'informazione nuova e pertinente per la posizione.`,
    },
    {
      question: `Bisogna ripetere il contenuto del CV nella lettera di presentazione per ${lower}?`,
      answer: `No, la lettera di presentazione non deve essere una ripetizione del curriculum vitae. Deve completare il CV aggiungendo contesto, spiegando le tue motivazioni e sviluppando i risultati piu pertinenti per il ruolo di ${lower}. Usala per raccontare la storia dietro ai numeri e trasmettere la tua personalita professionale.`,
    },
    {
      question: `E sempre necessario inviare una lettera di presentazione per una posizione di ${lower}?`,
      answer: `Anche quando l'annuncio non la richiede esplicitamente, una lettera di presentazione ben scritta per una posizione di ${lower} puo fare la differenza tra due candidati con competenze equivalenti. Dimostra la tua serieta, il tuo reale interesse per il ruolo e la tua capacita di comunicare in modo professionale.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'competenze chiave del ruolo';
  const skill1 = skills[0] || 'gestione dei progetti';
  const skill2 = skills[1] || 'lavoro di squadra';
  const skill3 = skills[2] || 'comunicazione';
  const skill4 = skills[3] || 'risoluzione dei problemi';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Come Scrivere una Lettera di Presentazione da ${jobTitle}

${opener}

Una lettera di presentazione convincente per una posizione di ${lower} non si limita a riassumere il tuo percorso. Dimostra che hai dedicato tempo a comprendere le esigenze del ruolo e dell'azienda e che possiedi le competenze specifiche per soddisfarle. E la tua opportunita per mostrare la tua personalita professionale e distinguerti dagli altri candidati.

## Esempio di Lettera di Presentazione per ${jobTitle}

> **Oggetto: Candidatura per la posizione di ${jobTitle} — Rif. [Riferimento Annuncio]**
>
> Gentile Responsabile della Selezione,
>
> il Vostro annuncio per la posizione di ${lower} pubblicato su [Fonte dell'Annuncio] ha immediatamente catturato la mia attenzione. Forte della mia esperienza in ${skill1} e ${skill2}, sono convinto/a di poter apportare un contributo significativo a [Nome Azienda].
>
> Presso [Azienda Attuale/Precedente], ho avuto l'opportunita di sviluppare una solida competenza in ${topSkills}. Tra i miei risultati piu significativi, ho [esempio di risultato quantificato in relazione a ${skill1}], consentendo di migliorare i risultati del team in modo misurabile. La mia padronanza di ${skill3} mi ha inoltre permesso di [esempio di contributo in relazione a ${skill3}].
>
> Cio che mi motiva particolarmente in questa posizione presso [Nome Azienda] e [ragione specifica legata all'azienda o al ruolo]. Sono convinto/a che le mie competenze in ${skill4} e la mia esperienza nel settore mi permetteranno di contribuire efficacemente ai vostri obiettivi.
>
> Sarei lieto/a di discutere la mia candidatura durante un colloquio e di presentarVi piu in dettaglio come il mio percorso possa rispondere alle Vostre aspettative. Resto a disposizione per un incontro quando preferite.
>
> In attesa di un Vostro cortese riscontro, porgo distinti saluti.
>
> [Nome e Cognome]

*Adatta questo esempio sostituendo gli elementi tra parentesi quadre con le tue informazioni personali e quelle dell'azienda destinataria.*

## Elementi Chiave di una Lettera di Presentazione Efficace

### Apertura Personalizzata

Evita le formule generiche come "Con la presente mi permetto di candidarmi". Menziona il nome dell'azienda, il riferimento della posizione e un motivo preciso che spieghi il tuo interesse. I selezionatori noteranno immediatamente se la tua introduzione e un copia-incolla inviato a decine di aziende. Cita un progetto recente dell'azienda, un articolo di stampa o un valore che risuona con il tuo percorso di ${lower}.

### Risultati Quantificati

Ogni affermazione deve essere supportata da dati concreti. Piuttosto che scrivere "ho migliorato i processi", scrivi "ho ridotto i tempi di elaborazione del 30% implementando un nuovo metodo di ${skill1}". I risultati misurabili conferiscono credibilita alla tua candidatura e consentono al selezionatore di valutare l'impatto reale del tuo lavoro come ${lower}.

### Collegamento con l'Azienda

Dimostra di aver svolto ricerche approfondite sull'azienda. Identifica una sfida o un obiettivo strategico a cui puoi contribuire grazie alle tue competenze in ${topSkills}. Questa sezione prova che la tua candidatura e mirata e ragionata, non semplicemente opportunistica. I recruiter valorizzano i candidati che comprendono il loro contesto prima ancora del primo colloquio.

### Conclusione con Proposta di Valore

La tua conclusione non deve essere una semplice formula di cortesia. Riassumi in una frase il tuo contributo unico e proponi concretamente un colloquio. Riafferma il tuo entusiasmo per la posizione di ${lower} e indica la tua disponibilita. Una conclusione forte lascia un'impressione duratura e spinge il selezionatore a contattarti.

## Consigli per Livello di Esperienza

### Neolaureati

Senza esperienza professionale significativa, punta su stage, progetti accademici e competenze trasferibili. Spiega come la tua formazione ti ha preparato per il ruolo di ${lower}. Metti in evidenza la tua motivazione, la capacita di apprendimento rapido e le attivita extra-professionali pertinenti. I recruiter comprendono che sei all'inizio — cercano potenziale, non un percorso gia compiuto.

### Professionisti Esperti

Con diversi anni di esperienza, seleziona i due o tre risultati piu rilevanti per la posizione di ${lower} desiderata. Non cercare di coprire tutto: concentrati sui risultati che dimostrano meglio il tuo valore aggiunto. Mostra la tua evoluzione professionale e la capacita di assumere responsabilita crescenti. I numeri e gli esempi concreti sono i tuoi migliori alleati.

### Dirigenti Senior

A questo livello, la tua lettera di presentazione per ${lower} deve riflettere la tua visione strategica e la capacita di guidare team e progetti di ampia portata. Metti in risalto i risultati a livello aziendale: trasformazioni riuscite, risparmi ottenuti, team costruiti. Adotta un tono sicuro ma accessibile, e mostra di comprendere le sfide sia operative che strategiche del ruolo.

## Errori Comuni nelle Lettere di Presentazione

- **Inviare una lettera generica non personalizzata** — I selezionatori individuano immediatamente una lettera tipo inviata in massa. Ogni candidatura per ${lower} merita una lettera adattata che menzioni l'azienda, la posizione e le ragioni specifiche del tuo interesse.

- **Ripetere il CV parola per parola** — La lettera di presentazione deve completare il tuo curriculum vitae, non duplicarlo. Usala per sviluppare il contesto dei tuoi risultati, spiegare le transizioni di carriera e trasmettere la tua personalita professionale.

- **Iniziare ogni frase con "Io"** — Una lettera incentrata unicamente su te stesso manca di prospettiva. Alterna tra cio che offri e cio che l'azienda cerca. Mostra di comprendere le esigenze del ruolo di ${lower} e come vi rispondi.

- **Trascurare la forma e l'ortografia** — Una lettera di presentazione con errori ortografici o un'impaginazione disordinata invia un segnale negativo sulla tua cura professionale. Rileggi attentamente e chiedi a una terza persona di verificare il testo prima dell'invio.

- **Dimenticare l'invito all'azione finale** — Concludere senza proporre un seguito concreto (colloquio, telefonata, disponibilita) lascia il selezionatore senza direzione. Chiudi sempre con una proposta chiara e un'espressione della tua disponibilita.

## Completa la tua Lettera con un Curriculum Vitae Professionale

Una lettera di presentazione efficace merita un curriculum vitae all'altezza. Assicurati che la tua candidatura per ${lower} sia coerente dall'inizio alla fine:

- [Crea il tuo curriculum vitae professionale](/it/builder) con il nostro strumento gratuito e intuitivo, ottimizzato per i sistemi ATS
- [Consulta il nostro esempio di CV da ${lower}](/it/resume-examples/${slug}) per ispirarti a modelli adatti al tuo settore
- [Genera la tua lettera di presentazione automaticamente](/it/tools/cover-letter) con il nostro assistente IA che adatta il contenuto al tuo profilo

Una candidatura completa e coerente — curriculum vitae curato, lettera di presentazione personalizzata — moltiplica significativamente le tue possibilita di ottenere un colloquio per la posizione di ${lower} desiderata.
`;
}
