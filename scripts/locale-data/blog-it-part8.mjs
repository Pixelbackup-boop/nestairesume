/**
 * Italian blog — Part 8: Guide Specializzate e Argomenti Italiani
 * Topics: CV infermiere, CV informatico, CV AI/ML, Overleaf, PowerPoint,
 * stampa CV, crea CV gratis online, CV europass gratis, formato europeo
 * Targeting: cv europass (500K), curriculum vitae gratis (500K), modello formato europeo (50K)
 *
 * Includes 3 Italian-specific topics targeting highest-volume Italian keywords.
 */

export const TOPICS_PART8 = [
  // ── Topic 64: CV Infermiere ─────────────────────────────────────────────────
  {
    slug: 'curriculum-vitae-infermiere-guida',
    title: 'Curriculum Vitae Infermiere: Guida con Esempi 2026',
    description: 'Come scrivere il curriculum vitae per infermiere. Guida con esempi, competenze chiave e consigli per il settore sanitario italiano nel 2026.',
    category: 'Guide di Settore',
    tags: ['curriculum vitae infermiere', 'cv infermiere esempio', 'curriculum infermiere modello', 'cv sanitario esempio', 'curriculum settore sanitario', 'cv infermiere 2026', 'come fare cv infermiere', 'curriculum operatore sanitario'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Curriculum vitae infermiere guida ed esempi', featured: false,
    faq: [
      { question: 'Cosa deve contenere il CV di un infermiere?', answer: 'Il CV di un infermiere deve includere: iscrizione all\'OPI (Ordine delle Professioni Infermieristiche), laurea in infermieristica, specializzazioni (terapia intensiva, oncologia, pediatria), certificazioni (BLS-D, ACLS, ECM), esperienze cliniche dettagliate con reparto e casistica, e competenze specifiche (farmacologia, procedure invasive).' },
      { question: 'Come descrivere l\'esperienza clinica nel CV?', answer: 'Specifica: nome struttura, reparto, numero di posti letto, tipologia di pazienti, procedure eseguite, tecnologie usate. Esempio: "Infermiere presso Reparto di Terapia Intensiva (12 posti letto), Ospedale San Raffaele. Gestione pazienti critici post-operatori, monitoraggio emodinamico, somministrazione terapia endovenosa."' },
      { question: 'I crediti ECM vanno nel CV?', answer: 'Sì, menziona il numero totale di crediti ECM e i corsi più rilevanti per la posizione. Esempio: "120 crediti ECM nel triennio 2023-2025. Corsi principali: Wound Care Avanzato (50 ore), Gestione del Dolore in Oncologia (30 ore)."' },
      { question: 'Formato Europass o libero per infermiere?', answer: 'Per ospedali pubblici e concorsi SSN, l\'Europass è spesso richiesto. Per cliniche private, RSA e agenzie interinali sanitarie, un formato moderno e sintetico è preferibile. Per candidature all\'estero, il formato europeo è standard.' },
      { question: 'Come evidenziare le soft skill infermieristiche?', answer: 'Le soft skill nel nursing vanno contestualizzate: non scrivere solo "empatia" ma "Gestione della comunicazione con famiglie di pazienti in cure palliative" o "Coordinamento turni di 8 colleghi con riduzione conflitti interni del 40%".' }
    ],
    body: `## Curriculum Vitae per Infermiere: Guida Specializzata

Il settore sanitario italiano ha esigenze specifiche per il curriculum vitae. Ecco come creare un CV che faccia colpo su ospedali, cliniche e strutture sanitarie.

### Struttura del CV Infermieristico

1. **Dati personali** e iscrizione OPI (numero, provincia)
2. **Profilo professionale** con specializzazione e anni di esperienza
3. **Esperienze cliniche** — Reparto, struttura, casistica
4. **Formazione** — Laurea, master, specializzazioni
5. **Certificazioni** — BLS-D, ACLS, ECM, altre
6. **Competenze cliniche** — Procedure, tecnologie, farmacologia
7. **Lingue** — Importante per strutture internazionali

### Esempio di Profilo

> Infermiere con 6 anni di esperienza in area critica (Terapia Intensiva e Pronto Soccorso). Laurea in Infermieristica (110/110) e Master in Area Critica presso Università di Padova. Certificazioni BLS-D e ACLS in corso di validità. Iscritto all'OPI di Milano (n. XXXXX). Esperienza nella gestione di pazienti politraumatizzati e nella formazione del personale neoassunto.

### Competenze da Evidenziare

**Competenze cliniche:**
- Procedure invasive e non invasive
- Somministrazione farmaci e terapie
- Monitoraggio parametri vitali
- Wound care e medicazioni avanzate
- Gestione emergenze e triage

**Competenze tecniche:**
- Cartella clinica elettronica
- Dispositivi medici (pompe infusione, ventilatori)
- Software gestionale sanitario

**Competenze trasversali:**
- Comunicazione con pazienti e famiglie
- Lavoro in team multidisciplinare
- Gestione dello stress e delle emergenze
- Formazione e tutoring colleghi junior

### Errori Specifici per CV Infermiere

1. Non indicare il numero di iscrizione OPI
2. Non specificare il reparto e la casistica
3. Dimenticare i crediti ECM
4. Non menzionare le certificazioni di emergenza
5. Usare terminologia generica anziché clinica

[Crea il tuo CV infermieristico](/it/builder) con il nostro builder che include template specifici per il settore sanitario.`
  },

  // ── Topic 65: CV Informatico ────────────────────────────────────────────────
  {
    slug: 'curriculum-vitae-informatico-guida',
    title: 'Curriculum Vitae Informatico: Guida IT e Sviluppatori',
    description: 'Come scrivere il curriculum vitae per informatici e sviluppatori. Guida con stack tecnologico, progetti GitHub e consigli per il settore IT italiano.',
    category: 'Guide di Settore',
    tags: ['curriculum vitae informatico', 'cv sviluppatore esempio', 'curriculum it guida', 'cv programmatore modello', 'curriculum informatica', 'cv developer italiano', 'curriculum tecnico it', 'cv ingegnere informatico'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Curriculum vitae informatico e sviluppatori guida', featured: false,
    faq: [
      { question: 'Come organizzare le competenze tecniche nel CV IT?', answer: 'Organizzale per categoria: linguaggi di programmazione (Python, Java, JavaScript), framework (React, Django, Spring), database (PostgreSQL, MongoDB), cloud (AWS, Azure), DevOps (Docker, Kubernetes, CI/CD), strumenti (Git, Jira, VS Code). Indica il livello di competenza o gli anni di utilizzo.' },
      { question: 'Devo includere il link a GitHub nel CV?', answer: 'Assolutamente sì. Per uno sviluppatore, il profilo GitHub è come un portfolio. Assicurati che contenga progetti ben documentati con README chiari. Se il tuo GitHub è vuoto o disordinato, è meglio non includerlo e concentrarti su descrivere i progetti nel CV.' },
      { question: 'Come descrivere progetti tecnici nel CV?', answer: 'Per ogni progetto: nome, tuo ruolo, stack tecnologico, metriche (utenti, performance, SLA), link (GitHub, demo). Esempio: "Sviluppo microservizi backend in Go per piattaforma fintech. 50K+ transazioni/giorno, 99.9% uptime, latenza <100ms."' },
      { question: 'Quanto conta la laurea nel settore IT?', answer: 'In Italia, la laurea in informatica/ingegneria è ancora molto apprezzata, specialmente nelle aziende tradizionali e per i primi lavori. Tuttavia, aziende tech, startup e multinazionali valutano sempre più le competenze dimostrabili (portfolio, certificazioni, contributi open source) rispetto al titolo.' },
      { question: 'Quanto deve essere lungo il CV di uno sviluppatore?', answer: 'Per junior (0-3 anni): 1 pagina. Per mid-level (3-7 anni): 1-2 pagine. Per senior/lead (7+ anni): 2 pagine. La sezione competenze tecniche può essere più lunga del normale, ma non elencare ogni tecnologia mai toccata — concentrati su quelle rilevanti.' }
    ],
    body: `## Curriculum Vitae per Informatici e Sviluppatori

Il settore IT ha convenzioni specifiche per il CV. Ecco come creare un curriculum che parli la lingua dei recruiter tech.

### Struttura del CV Informatico

1. **Contatti** + link a GitHub, LinkedIn, portfolio
2. **Profilo tecnico** — Stack principale, anni di esperienza, specializzazione
3. **Competenze tecniche** — Organizzate per categoria
4. **Esperienze lavorative** — Con stack e metriche
5. **Progetti personali** — Con link e descrizione tecnica
6. **Formazione e certificazioni** — Laurea, AWS/Azure/Google cert
7. **Open source** — Contribuzioni significative

### Esempio di Profilo Tecnico

> Full Stack Developer con 5 anni di esperienza specializzato in React/Node.js e architetture cloud-native su AWS. Track record di sviluppo e deploy di applicazioni SaaS con 10K+ utenti attivi. Esperto in microservizi, CI/CD e pratiche DevOps. Contributore open source con 500+ stelle su GitHub.

### Competenze Tecniche: Come Organizzarle

> **Linguaggi:** TypeScript, Python, Go, SQL
> **Frontend:** React, Next.js, Tailwind CSS, GraphQL
> **Backend:** Node.js, Express, FastAPI, REST/GraphQL API
> **Database:** PostgreSQL, Redis, MongoDB, Elasticsearch
> **Cloud & DevOps:** AWS (Lambda, ECS, S3), Docker, Kubernetes, Terraform, GitHub Actions
> **Testing:** Jest, Cypress, Playwright, TDD
> **Strumenti:** Git, Jira, Confluence, Figma, VS Code

### Progetti: Come Descriverli

> **E-commerce Platform** | [github.com/user/project](https://github.com)
> Full stack e-commerce con React, Node.js, PostgreSQL e Stripe
> - 5.000+ prodotti, 99.9% uptime, deploy automatizzato
> - Architettura: microservizi, Docker, AWS ECS, CloudFront
> - Performance: Lighthouse 95+, Core Web Vitals ottimizzati

### Errori nel CV IT

1. Elencare ogni tecnologia mai usata (solo quelle rilevanti)
2. Nessun link a GitHub o portfolio
3. Descrizioni senza metriche ("Ho sviluppato un sito web")
4. Ignorare le certificazioni cloud
5. CV troppo lungo o troppo corto

[Crea il tuo CV tecnico](/it/builder) con template ottimizzati per sviluppatori e professionisti IT.`
  },

  // ── Topic 66: CV AI/ML ──────────────────────────────────────────────────────
  {
    slug: 'curriculum-vitae-intelligenza-artificiale-ml',
    title: 'CV per AI e Machine Learning: Guida Specializzata',
    description: 'Come scrivere il curriculum vitae per ruoli in AI e Machine Learning. Competenze, progetti e certificazioni per il settore dell\'intelligenza artificiale.',
    category: 'Guide di Settore',
    tags: ['curriculum vitae ai ml', 'cv machine learning', 'cv intelligenza artificiale', 'curriculum data scientist', 'cv ai engineer', 'curriculum ml engineer', 'cv deep learning', 'curriculum ai italia'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Curriculum vitae per AI e Machine Learning', featured: false,
    faq: [
      { question: 'Quali competenze servono per un CV AI/ML?', answer: 'Le competenze essenziali: Python (NumPy, Pandas, scikit-learn), framework ML (TensorFlow, PyTorch), deep learning (CNN, RNN, Transformers), MLOps (MLflow, Kubeflow), cloud ML (AWS SageMaker, Google Vertex AI), statistiche e probabilità, SQL e data engineering. Le certificazioni AWS ML e Google ML sono molto apprezzate.' },
      { question: 'Come mostrare progetti ML nel CV?', answer: 'Per ogni progetto: problema affrontato, dataset (dimensione e tipo), modello usato, metriche di performance (accuracy, F1, AUC), impatto business. Link a notebook Jupyter, paper o demo. Esempio: "Modello NLP per classificazione ticket supporto: BERT fine-tuned, F1 0.92, riduzione tempo smistamento del 60%."' },
      { question: 'Le pubblicazioni sono importanti?', answer: 'Per posizioni di ricerca (Research Scientist, PhD), sì — le pubblicazioni su conferenze (NeurIPS, ICML, CVPR) sono fondamentali. Per posizioni di engineering (ML Engineer, Data Scientist), contano più i progetti applicativi e l\'impatto business. Include solo pubblicazioni rilevanti.' },
      { question: 'Serve la laurea magistrale o il PhD per lavorare in AI?', answer: 'In Italia, la laurea magistrale in informatica, data science o discipline STEM è il minimo per la maggior parte dei ruoli ML. Il PhD è richiesto per posizioni di ricerca. Tuttavia, certificazioni, portfolio di progetti e contributi open source possono compensare parzialmente.' },
      { question: 'Quanto guadagna un ML Engineer in Italia?', answer: 'RAL media nel 2026: Junior (0-2 anni) €35-45K, Mid-level (3-5 anni) €50-65K, Senior (5-8 anni) €65-85K, Lead/Principal (8+ anni) €80-100K+. A Milano le retribuzioni sono il 10-20% superiori alla media. Per aziende big tech, le cifre possono essere significativamente più alte.' }
    ],
    body: `## Curriculum Vitae per AI e Machine Learning

Il settore AI/ML è uno dei più competitivi e meglio retribuiti. Un CV specializzato è fondamentale per emergere.

### Struttura del CV AI/ML

1. **Contatti** + GitHub, LinkedIn, Google Scholar/ArXiv
2. **Profilo tecnico** — Specializzazione ML, framework, anni di esperienza
3. **Competenze tecniche** — ML frameworks, cloud, data engineering
4. **Esperienze** — Con metriche di modelli e impatto business
5. **Progetti e ricerca** — Dataset, modelli, performance
6. **Pubblicazioni** — Se rilevanti
7. **Formazione** — Laurea/PhD, certificazioni ML

### Competenze Chiave

> **ML/DL Framework:** TensorFlow, PyTorch, scikit-learn, XGBoost, Hugging Face
> **NLP:** BERT, GPT, Transformers, spaCy, sentiment analysis
> **Computer Vision:** OpenCV, YOLO, image segmentation
> **MLOps:** MLflow, Kubeflow, Docker, Kubernetes, CI/CD per ML
> **Cloud ML:** AWS SageMaker, Google Vertex AI, Azure ML
> **Data:** Python (Pandas, NumPy), SQL, Spark, Airflow
> **Statistiche:** Bayesian inference, A/B testing, causal inference

### Come Descrivere Progetti ML

> **Sistema di raccomandazione prodotti**
> - Modello: collaborative filtering + content-based hybrid (LightFM)
> - Dataset: 2M+ interazioni utente-prodotto
> - Metriche: NDCG@10 0.35, +18% click-through rate vs baseline
> - Impact: +12% revenue da raccomandazioni personalizzate
> - Stack: Python, TensorFlow Serving, Redis, Kubernetes

Il settore AI/ML in Italia sta crescendo rapidamente. [Crea il tuo CV specializzato](/it/builder) per posizionarti al meglio nel mercato dell'intelligenza artificiale.`
  },

  // ── Topic 67: CV Overleaf/LaTeX ─────────────────────────────────────────────
  {
    slug: 'curriculum-vitae-overleaf-latex',
    title: 'Curriculum Vitae con Overleaf e LaTeX | Guida',
    description: 'Come creare il curriculum vitae con Overleaf e LaTeX. Template, guida per principianti e quando usare LaTeX per il CV nel 2026.',
    category: 'Strumenti CV',
    tags: ['curriculum vitae overleaf', 'cv latex template', 'overleaf cv italiano', 'curriculum latex', 'creare cv overleaf', 'template cv latex', 'overleaf curriculum', 'latex cv gratis'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Creare curriculum vitae con Overleaf e LaTeX', featured: false,
    faq: [
      { question: 'Cos\'è Overleaf e perché usarlo per il CV?', answer: 'Overleaf è un editor LaTeX online. LaTeX è un sistema di composizione tipografica che produce documenti con formattazione impeccabile. Per il CV, offre: tipografia professionale, controllo preciso del layout, template accademici di alta qualità. È lo standard in accademia e ricerca.' },
      { question: 'Devo conoscere LaTeX per usare Overleaf?', answer: 'Per usare un template esistente, basta saper modificare il testo nei campi predefiniti. Per personalizzazioni avanzate, serve una conoscenza base di LaTeX. Overleaf offre tutorial e una community attiva per aiutarti.' },
      { question: 'Per chi è adatto un CV LaTeX?', answer: 'LaTeX è ideale per: accademici e ricercatori, ingegneri e scienziati, informatici, matematici e fisici. È meno adatto per settori non-tecnici dove la familiarità con LaTeX non è un plus e un builder online è più pratico.' },
      { question: 'I CV LaTeX sono compatibili con gli ATS?', answer: 'Dipende dal template. I template LaTeX semplici a colonna singola generano PDF ATS-friendly. I template con layout complessi (colonne, sidebar) possono avere problemi. Verifica sempre con il test copia-incolla.' },
      { question: 'Overleaf è gratuito?', answer: 'La versione base di Overleaf è gratuita e include: un compilatore, template, e collaborazione base. La versione premium (€9-15/mese) offre: compilazione più veloce, più collaboratori, sincronizzazione GitHub.' }
    ],
    body: `## Curriculum Vitae con Overleaf e LaTeX

Per chi cerca la perfezione tipografica, LaTeX e Overleaf offrono un controllo impareggiabile sulla formattazione del CV.

### Quando Usare LaTeX per il CV

LaTeX è la scelta giusta quando:
- Sei in ambiente accademico o di ricerca
- Il tuo settore apprezza la competenza tecnica
- Vuoi un controllo preciso sulla tipografia
- Hai bisogno di includere equazioni o notazione tecnica
- Vuoi un CV che si distingua per eleganza formale

### Come Iniziare con Overleaf

1. Vai su **overleaf.com** e crea un account gratuito
2. Cerca "CV" o "Resume" nella galleria template
3. Scegli un template e aprilo come nuovo progetto
4. Modifica il contenuto nei campi predefiniti
5. Compila (il PDF si genera automaticamente)
6. Scarica il PDF

### Template Consigliati

- **ModernCV** — Classico, elegante, multicolore
- **AltaCV** — Moderno, una o due colonne
- **Awesome-CV** — Design contemporaneo
- **Deedy-Resume** — Compatto, una pagina

### Pro e Contro di LaTeX per il CV

**Pro:** Tipografia professionale, versioning con Git, template accademici di qualità, risultato elegante.

**Contro:** Curva di apprendimento, meno intuitivo di un builder, personalizzazione richiede conoscenza LaTeX.

Per chi non vuole imparare LaTeX, il nostro [builder online](/it/builder) offre risultati professionali senza alcuna competenza tecnica.`
  },

  // ── Topic 68: CV PowerPoint ─────────────────────────────────────────────────
  {
    slug: 'curriculum-vitae-powerpoint-modello',
    title: 'Curriculum Vitae in PowerPoint: Modelli e Guida',
    description: 'Come creare un curriculum vitae in PowerPoint. Modelli, guida e quando usare la presentazione come formato per il CV.',
    category: 'Modelli CV',
    tags: ['curriculum vitae powerpoint', 'cv powerpoint modello', 'curriculum pptx template', 'cv presentazione powerpoint', 'modello cv powerpoint', 'cv slide presentazione', 'curriculum presentazione', 'cv powerpoint gratis'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Curriculum vitae in formato PowerPoint', featured: false,
    faq: [
      { question: 'Si può creare un CV in PowerPoint?', answer: 'Sì, PowerPoint offre libertà di design totale. Tuttavia, non è un formato standard per il CV e non è compatibile con i sistemi ATS. È utile come "CV visuale" complementare al CV tradizionale, o per presentazioni di portfolio.' },
      { question: 'Quando usare un CV in PowerPoint?', answer: 'Un CV in PowerPoint funziona per: presentazioni di persona, portfolio creativi, pitch professionali, networking events. Non usarlo per candidature online o invio tramite portali — usa sempre un PDF standard per le candidature formali.' },
      { question: 'Come convertire un CV PowerPoint in PDF?', answer: 'In PowerPoint: File > Salva con nome > scegli PDF. Tuttavia, il PDF generato da PowerPoint potrebbe non essere ATS-friendly perché il testo è spesso contenuto in caselle di testo. Per candidature online, usa un CV creato in Word o con un builder dedicato.' },
      { question: 'Quante slide deve avere un CV PowerPoint?', answer: 'Per un CV-presentazione: 3-5 slide massimo. Slide 1: dati e profilo, Slide 2: esperienze chiave, Slide 3: competenze e formazione, Slide 4-5: progetti o portfolio. Mantieni ogni slide pulita e leggibile.' },
      { question: 'PowerPoint o un builder per il CV?', answer: 'Per candidature formali, un builder dedicato è nettamente superiore: compatibilità ATS, formato standard, ottimizzazione per il settore. PowerPoint è utile solo come formato complementare per presentazioni dal vivo o portfolio creativi.' }
    ],
    body: `## Curriculum Vitae in PowerPoint: Quando e Come

PowerPoint offre libertà di design per il CV, ma va usato nel contesto giusto.

### Quando Funziona

- Presentazioni professionali dal vivo
- Portfolio visivi e creativi
- Networking events e career day
- Complemento al CV tradizionale

### Quando NON Usarlo

- Candidature online su portali ATS
- Invio via email come CV principale
- Concorsi pubblici e PA
- Qualsiasi candidatura formale

### Come Creare un CV-Presentazione

**Slide 1: Chi Sei**
Nome, foto, titolo professionale, contatti, profilo sintetico.

**Slide 2: Esperienza**
3-5 esperienze chiave con risultati visivi (grafici, numeri grandi).

**Slide 3: Competenze**
Competenze organizzate visivamente.

**Slide 4: Portfolio/Progetti**
Immagini dei progetti migliori con breve descrizione.

Per le candidature formali, usa sempre un [curriculum vitae in formato standard](/it/builder) creato con il nostro builder gratuito.`
  },

  // ── Topic 69: Stampare il CV ────────────────────────────────────────────────
  {
    slug: 'stampare-curriculum-consigli',
    title: 'Stampare il Curriculum Vitae: Consigli su Carta e Stampa',
    description: 'Consigli per stampare il curriculum vitae. Tipo di carta, qualità di stampa e quando portare il CV stampato nel 2026 in Italia.',
    category: 'Curriculum Vitae',
    tags: ['stampare curriculum vitae', 'carta per cv', 'stampa cv consigli', 'curriculum stampato', 'tipo carta curriculum', 'stampare cv qualità', 'cv cartaceo 2026', 'come stampare curriculum'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Consigli per stampare il curriculum vitae', featured: false,
    faq: [
      { question: 'Ha ancora senso stampare il CV nel 2026?', answer: 'Nella maggior parte dei casi, il CV digitale (PDF) è sufficiente. Tuttavia, portare copie stampate al colloquio è ancora una buona prassi in Italia. Dimostra preparazione e professionalità, e il selezionatore potrebbe usarlo come riferimento durante l\'intervista.' },
      { question: 'Quale carta usare per stampare il CV?', answer: 'Usa carta di qualità superiore alla normale: grammatura 100-120g/m² (la carta standard è 80g). Colore: bianco brillante o avorio/crema leggero. Evita carta colorata, riciclata visibilmente grigia, o carta fotografica lucida.' },
      { question: 'Stampante inkjet o laser per il CV?', answer: 'La stampante laser produce risultati migliori: testo più nitido, nero più profondo, nessun rischio di sbavature se il foglio si bagna. Se usi una inkjet, assicurati di usare l\'impostazione di massima qualità e di far asciugare bene prima di inserire in busta.' },
      { question: 'Quante copie portare al colloquio?', answer: 'Porta 2-3 copie del CV: una per il selezionatore, una per un eventuale secondo interlocutore e una per te come riferimento. Mettile in una cartellina rigida per mantenerle in ordine e senza pieghe.' },
      { question: 'Devo stampare anche la lettera di presentazione?', answer: 'Se l\'hai inviata via email, non serve stamparla. Se vuoi dimostrare ulteriore preparazione, puoi portarne una copia. In genere, al colloquio si discute del CV, non della lettera di presentazione.' }
    ],
    body: `## Stampare il Curriculum Vitae: Guida Pratica

Anche nell'era digitale, un CV stampato con cura può fare la differenza al colloquio.

### Quando Stampare il CV

- **Al colloquio di persona** — Porta sempre 2-3 copie
- **Fiere del lavoro e career day** — Distribuzione ai recruiter
- **Networking events** — Complemento al biglietto da visita
- **Candidature cartacee** — Rare ma ancora presenti in alcuni settori

### Specifiche di Stampa

| Elemento | Consigliato |
|---|---|
| Carta | 100-120g/m², bianco brillante |
| Stampante | Laser (preferibile) o inkjet alta qualità |
| Colore | Stampa a colori se il CV ha accenti |
| Margini | Almeno 2 cm su tutti i lati |
| Fronte/retro | Solo fronte (non stampare sul retro) |

### Presentazione

- Usa una cartellina rigida trasparente o colorata
- Non piegare i fogli (niente buste piccole)
- Non pinzare le pagine
- Se sono 2 pagine, tienile insieme con una graffetta leggera

Un [curriculum vitae ben progettato](/it/builder) rende giustizia anche alla stampa. Crea il tuo con il nostro builder gratuito.`
  },

  // ── Topic 70: Crea CV Gratis Online (ITALIAN-SPECIFIC, 50K keyword) ─────────
  {
    slug: 'crea-curriculum-gratis-online',
    title: 'Crea il Tuo Curriculum Vitae Gratis Online | 2026',
    description: 'Crea il tuo curriculum vitae gratis online in pochi minuti. Builder gratuito senza registrazione con modelli professionali per il mercato italiano.',
    category: 'Strumenti CV',
    tags: ['crea curriculum gratis', 'crea cv gratis online', 'curriculum vitae gratis', 'creare curriculum online', 'crea curriculum vitae gratis', 'cv maker gratis italiano', 'curriculum gratis 2026', 'crea cv online italiano'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Crea curriculum vitae gratis online 2026', featured: true,
    faq: [
      { question: 'Come creare un curriculum vitae gratis online?', answer: 'Puoi creare il CV gratis online con il nostro builder su FreeResumeBuilder.ai. Non serve registrazione: scegli un template, inserisci le informazioni, personalizza il design e scarica in PDF. Tutto gratuito, nessun costo nascosto.' },
      { question: 'Serve la registrazione per creare il CV gratis?', answer: 'Con il nostro builder, no. Puoi creare e scaricare il CV senza registrazione. La registrazione opzionale ti permette di salvare il CV per modifiche future, ma non è obbligatoria per creare e scaricare il documento.' },
      { question: 'Quanto tempo serve per creare un CV online?', answer: 'Con il nostro builder guidato, puoi creare un CV professionale in 15-30 minuti. Se hai già le informazioni pronte (date, descrizioni, competenze), anche meno. Il builder ti guida sezione per sezione con suggerimenti personalizzati.' },
      { question: 'I CV creati online sono professionali?', answer: 'Assolutamente sì. I nostri template sono progettati da designer professionisti e ottimizzati per il mercato italiano e i sistemi ATS. Un CV creato con il nostro builder è indistinguibile da uno creato da un professionista — ciò che conta è il contenuto.' },
      { question: 'Posso modificare il CV dopo averlo creato?', answer: 'Sì. Con un account gratuito puoi salvare il CV e modificarlo quando vuoi. Senza account, puoi ricreare il CV in qualsiasi momento. Il builder salva anche le tue informazioni nel browser per facilitare la compilazione.' }
    ],
    body: `## Crea il Tuo Curriculum Vitae Gratis Online

Creare un curriculum vitae professionale non deve costare nulla. Il nostro builder gratuito ti permette di creare un CV d'impatto in pochi minuti, direttamente dal browser.

### Perché Creare il CV Online

Nel 2026, creare il curriculum vitae online è la scelta più efficiente:

- **Veloce** — Template pronti, compilazione guidata
- **Gratuito** — Nessun costo, nessun abbonamento
- **Professionale** — Design curati e ottimizzati ATS
- **Accessibile** — Da qualsiasi dispositivo, ovunque
- **Aggiornabile** — Modifica quando vuoi

### Come Funziona il Nostro Builder

**Passo 1: Scegli il template**
Sfoglia la nostra collezione di template professionali, moderni, creativi e classici. Tutti ottimizzati per il mercato italiano.

**Passo 2: Inserisci le informazioni**
Il builder ti guida sezione per sezione: dati personali, profilo, esperienze, formazione, competenze. Suggerimenti AI ti aiutano a scrivere descrizioni d'impatto.

**Passo 3: Personalizza il design**
Scegli colori, font e layout. Ogni modifica si vede in tempo reale nell'anteprima.

**Passo 4: Scarica in PDF**
Un click e il tuo CV professionale è pronto per l'invio. PDF ottimizzato per ATS e stampa.

### Cosa Rende il Nostro Builder Diverso

- **Veramente gratuito** — Nessun paywall al download
- **Senza registrazione obbligatoria** — Crea e scarica subito
- **AI integrata** — Suggerimenti per profilo e descrizioni
- **Ottimizzato per l'Italia** — Template e contenuti per il mercato italiano
- **ATS-friendly** — Ogni template supera i filtri automatici

### Inizia Adesso

Non rimandare la creazione del tuo curriculum vitae. Ogni giorno senza un CV aggiornato è un'opportunità persa.

[Crea il tuo curriculum vitae gratis](/it/builder) — Pronto in 15 minuti, professionale, gratuito.`
  },

  // ── Topic 71: CV Europass Gratis (ITALIAN-SPECIFIC, 500K keyword) ───────────
  {
    slug: 'cv-europass-online-gratis',
    title: 'CV Europass Online Gratis: Come Crearlo nel 2026',
    description: 'Crea il tuo CV Europass online gratis. Guida completa all\'editor Europass ufficiale, alternative gratuite e consigli per il formato europeo 2026.',
    category: 'Formati CV',
    tags: ['cv europass online gratis', 'europass gratis', 'creare europass online', 'cv europass 2026', 'europass cv gratis italiano', 'curriculum europass online', 'editor europass gratis', 'fare europass gratis'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Creare CV Europass online gratis nel 2026', featured: true,
    faq: [
      { question: 'Come creare il CV Europass gratis online?', answer: 'Vai su europa.eu/europass, crea un account gratuito e usa l\'editor online per compilare il CV sezione per sezione. Puoi scaricarlo in PDF e Word gratuitamente. In alternativa, il nostro builder offre template che includono tutte le sezioni Europass con un design più moderno.' },
      { question: 'L\'Europass è ancora richiesto in Italia nel 2026?', answer: 'Sì, l\'Europass è ancora richiesto per: concorsi pubblici, PA, candidature presso istituzioni EU, alcuni bandi regionali e nazionali. Per il settore privato, è accettato ma non preferito — un formato moderno è generalmente più efficace.' },
      { question: 'Posso personalizzare l\'Europass?', answer: 'L\'editor Europass 2.0 offre opzioni di personalizzazione limitate: scelta tra alcuni layout e colori, riordino delle sezioni. Per maggiore personalizzazione, puoi scaricare il formato Word e modificarlo, oppure usare un builder che offre template con struttura Europass ma design personalizzabile.' },
      { question: 'Qual è la differenza tra Europass 1.0 e 2.0?', answer: 'L\'Europass 2.0 (dal 2020) ha: editor online migliorato, più opzioni di layout, profilo digitale europeo, portfolio delle competenze integrate, e design leggermente più moderno. La struttura delle sezioni resta simile alla versione precedente.' },
      { question: 'Serve un account per creare l\'Europass?', answer: 'Sì, il sito ufficiale Europass richiede la creazione di un account per salvare il CV. L\'account è gratuito e ti permette di modificare il CV in qualsiasi momento. Il nostro builder non richiede registrazione per le funzionalità base.' }
    ],
    body: `## CV Europass Online Gratis: Guida Completa

Il CV Europass è il formato più cercato in Italia con oltre 500.000 ricerche mensili. Ecco come crearlo gratuitamente nel 2026.

### Come Creare l'Europass Online

**Metodo 1: Sito ufficiale Europass**
1. Vai su **europa.eu/europass**
2. Clicca "Crea il tuo Europass"
3. Crea un account gratuito
4. Compila il CV sezione per sezione
5. Scegli il layout preferito
6. Scarica in PDF o Word

**Metodo 2: Il nostro builder (consigliato)**
1. Vai su [il nostro builder](/it/builder)
2. Scegli un template con struttura Europass
3. Compila con suggerimenti AI
4. Personalizza design e colori
5. Scarica gratis senza registrazione

### Sezioni dell'Europass

Il CV Europass include queste sezioni standard:

- **Informazioni personali** — Contatti, foto, nazionalità
- **Profilo/Posizione desiderata** — Obiettivo professionale
- **Esperienza lavorativa** — Cronologico inverso
- **Istruzione e formazione** — Titoli di studio
- **Competenze personali** — Lingue (autovalutazione CEFR)
- **Competenze digitali** — Autovalutazione DIGCOMP
- **Competenze organizzative/gestionali** — Soft skill
- **Altre informazioni** — Patente, pubblicazioni, etc.

### Quando Usare l'Europass

| Situazione | Europass consigliato? |
|---|---|
| Concorsi pubblici | Sì, spesso obbligatorio |
| Pubblica amministrazione | Sì |
| Bandi europei | Sì |
| Aziende private | Solo se richiesto |
| Startup/Tech | No, formato moderno |
| Candidature internazionali EU | Sì |

### Europass con Design Moderno

Il limite principale dell'Europass è il design standardizzato. Il nostro builder risolve questo problema offrendo template che:
- Includono tutte le sezioni Europass
- Hanno un design moderno e personalizzabile
- Sono ottimizzati per ATS
- Sono gratuiti da scaricare

[Crea il tuo CV Europass con design moderno](/it/builder) — Gratis, senza registrazione, pronto in 15 minuti.`
  },

  // ── Topic 72: Curriculum Gratis da Compilare (ITALIAN-SPECIFIC, 500K) ───────
  {
    slug: 'curriculum-vitae-gratis-da-compilare',
    title: 'Curriculum Vitae Gratis da Compilare Online | 2026',
    description: 'Curriculum vitae gratis da compilare online e scaricare in PDF. Modelli pronti per ogni professione, ottimizzati ATS per il mercato italiano.',
    category: 'Modelli CV',
    tags: ['curriculum vitae gratis da compilare', 'cv gratis da compilare online', 'curriculum gratis compilare', 'modello cv gratis compilare', 'curriculum da compilare pdf gratis', 'cv compilabile gratis', 'curriculum online compilare gratis', 'cv gratis da compilare e scaricare'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Curriculum vitae gratis da compilare online 2026', featured: true,
    faq: [
      { question: 'Dove trovo un curriculum vitae gratis da compilare?', answer: 'Sul nostro sito puoi compilare il curriculum vitae gratuitamente online. Il builder ti guida sezione per sezione: inserisci le informazioni, personalizza il design e scarica in PDF. Nessun costo, nessuna registrazione obbligatoria. Anche l\'editor Europass e Google Docs sono opzioni gratuite.' },
      { question: 'Come compilare il curriculum vitae per la prima volta?', answer: 'Inizia raccogliendo le informazioni: dati personali, percorso scolastico (date, titoli, voti), eventuali esperienze (stage, lavori, volontariato), competenze tecniche e linguistiche. Poi usa il nostro builder che ti guida passo passo nella compilazione.' },
      { question: 'Posso compilare il CV dal telefono?', answer: 'Sì, il nostro builder funziona su smartphone e tablet. Tuttavia, per una revisione accurata e per verificare la formattazione, è consigliabile completare il CV da un computer con schermo più grande.' },
      { question: 'Quanto tempo serve per compilare un CV?', answer: 'Con il nostro builder guidato, 15-30 minuti. La prima volta richiede più tempo perché devi raccogliere date e dettagli. Per aggiornare un CV esistente, bastano 5-10 minuti.' },
      { question: 'Il curriculum compilato online è professionale?', answer: 'Assolutamente sì. I nostri modelli sono progettati professionalmente e ottimizzati per i sistemi ATS. La qualità del CV dipende dalla qualità del contenuto che inserisci, non dallo strumento usato. Un builder gratuito produce risultati identici a servizi a pagamento.' }
    ],
    body: `## Curriculum Vitae Gratis da Compilare: Inizia Subito

Cerchi un curriculum vitae gratis da compilare? Sei nel posto giusto. Il nostro builder ti permette di creare un CV professionale in pochi minuti, senza costi e senza complicazioni.

### Come Compilare il CV Online

Il processo è semplice e guidato:

**1. Scegli il modello**
Sfoglia i nostri template: classico, moderno, creativo, Europass. Tutti professionali e ottimizzati per il mercato italiano.

**2. Compila sezione per sezione**
Il builder ti guida con:
- Campi precompilati per facilitare l'inserimento
- Suggerimenti AI per il profilo professionale
- Esempi per le descrizioni delle esperienze
- Consigli per le competenze da inserire

**3. Personalizza**
Scegli colori, font e layout in tempo reale. Vedi l'anteprima mentre compili.

**4. Scarica**
PDF ottimizzato per ATS e stampa. Gratuito. Nessuna sorpresa al download.

### Perché Compilare il CV Online è Meglio

Rispetto a compilare un modello Word o scrivere da zero:

- **Più veloce** — Template pronti, non parti da foglio bianco
- **Più facile** — Guida alla compilazione inclusa
- **Più professionale** — Design curati da designer
- **Ottimizzato ATS** — Formato che supera i filtri automatici
- **Sempre disponibile** — Modifica da qualsiasi dispositivo

### Cosa Ti Serve per Compilare

Prepara queste informazioni prima di iniziare:
- Nome, cognome, contatti (email, telefono, città)
- Esperienze lavorative (titolo, azienda, date, responsabilità)
- Formazione (titolo, istituto, anno, voto)
- Competenze tecniche e linguistiche
- Una foto professionale (opzionale)

### Per Ogni Tipo di Candidato

Che tu sia neolaureato, professionista esperto o in transizione di carriera, abbiamo il modello giusto per te:

- **Neolaureati** — Template che valorizzano la formazione
- **Professionisti** — Template focalizzati su esperienza e risultati
- **Cambio carriera** — Template con sezione competenze in evidenza
- **Settore sanitario/tecnico** — Template con sezioni specializzate

[Compila il tuo curriculum vitae gratis](/it/builder) — Inizia adesso, pronto in 15 minuti.`
  },

  // ── Topic 73: Modello Formato Europeo (ITALIAN-SPECIFIC, 50K) ───────────────
  {
    slug: 'modello-curriculum-formato-europeo',
    title: 'Modello Curriculum Vitae Formato Europeo | Gratis 2026',
    description: 'Modello di curriculum vitae formato europeo gratis da scaricare. Template Europass aggiornato al 2026 per candidature in Italia e in Europa.',
    category: 'Formati CV',
    tags: ['modello curriculum vitae formato europeo', 'formato europeo cv', 'curriculum formato europeo gratis', 'modello europeo cv 2026', 'cv formato europeo download', 'curriculum vitae europeo', 'template formato europeo', 'europass formato europeo gratis'],
    image: '/blog/it-placeholder.svg', imageAlt: 'Modello curriculum vitae formato europeo gratis 2026', featured: true,
    faq: [
      { question: 'Cos\'è il formato europeo del curriculum vitae?', answer: 'Il formato europeo è il curriculum Europass, uno standard creato dall\'Unione Europea per facilitare la mobilità lavorativa tra i paesi membri. Include sezioni predefinite per informazioni personali, esperienze, formazione e competenze. È riconosciuto in tutti i 27 paesi dell\'UE.' },
      { question: 'Il formato europeo è obbligatorio in Italia?', answer: 'Non è obbligatorio per il settore privato. Tuttavia, è spesso richiesto per concorsi pubblici, candidature nella PA, bandi europei e posizioni presso istituzioni UE. Per il settore privato, è accettato ma non preferito rispetto a formati più moderni.' },
      { question: 'Dove scaricare il modello formato europeo gratis?', answer: 'Puoi scaricare il modello dal sito ufficiale europa.eu/europass (richiede account), dal nostro sito in versione moderna e personalizzabile, o cercare "Europass template" su Google Docs. Il nostro builder offre template con struttura Europass e design aggiornato al 2026.' },
      { question: 'Come compilare il formato europeo?', answer: 'Il formato europeo si compila sezione per sezione: dati personali, obiettivi, esperienze (cronologico inverso), formazione, competenze linguistiche (con autovalutazione CEFR), competenze digitali, competenze organizzative, e informazioni aggiuntive.' },
      { question: 'Il formato europeo è valido all\'estero?', answer: 'È riconosciuto in tutta l\'Unione Europea, il che lo rende ideale per candidature internazionali in Europa. Per candidature fuori dall\'UE (USA, UK, Asia), usa il formato locale (resume per USA, CV breve per UK). Il formato europeo non è standard fuori dall\'Europa.' }
    ],
    body: `## Modello Curriculum Vitae Formato Europeo: Guida 2026

Il curriculum vitae in formato europeo (Europass) è il modello più cercato in Italia. Con oltre 50.000 ricerche mensili, è chiaro che molti italiani lo necessitano per le proprie candidature.

### Cos'è il Formato Europeo

Il formato europeo Europass è uno standard dell'UE che garantisce:
- **Riconoscimento** in tutti i paesi dell'Unione Europea
- **Struttura chiara** con sezioni predefinite
- **Comparabilità** tra candidati di diversi paesi
- **Multilingue** — Disponibile in 29 lingue

### Chi Deve Usare il Formato Europeo

**Obbligatorio per:**
- Concorsi pubblici in Italia
- Candidature presso istituzioni UE
- Bandi di finanziamento europei
- Alcune posizioni nella PA

**Consigliato per:**
- Candidature internazionali in Europa
- Posizioni in organizzazioni internazionali
- Candidature che richiedono formato standardizzato

**Non necessario per:**
- Settore privato italiano (preferiscono formati moderni)
- Startup e aziende tech
- Settori creativi

### Le Sezioni del Formato Europeo

1. **Informazioni personali** — Nome, contatti, nazionalità, data nascita
2. **Posizione/Profilo professionale** — Obiettivo o profilo sintetico
3. **Esperienza professionale** — Cronologico inverso con dettagli
4. **Istruzione e formazione** — Titoli e certificazioni
5. **Competenze personali:**
   - Lingue (con griglia di autovalutazione CEFR)
   - Competenze comunicative
   - Competenze organizzative e gestionali
   - Competenze digitali (framework DIGCOMP)
6. **Informazioni aggiuntive** — Pubblicazioni, presentazioni, progetti
7. **Allegati** — Lista documenti allegati

### Il Formato Europeo Modernizzato

Il formato Europass classico ha limiti di design. Il nostro builder offre una soluzione:

- **Stesse sezioni** del formato Europass ufficiale
- **Design moderno** con personalizzazione di colori e font
- **Compatibilità ATS** garantita
- **Download gratuito** in PDF e Word
- **Nessuna registrazione** richiesta

Ottieni il meglio di entrambi i mondi: il riconoscimento del formato europeo con l'aspetto professionale di un design moderno.

### Come Ottenere il Formato Europeo

**Opzione 1: Sito ufficiale Europass**
europa.eu/europass — Gratuito, richiede account, design standard.

**Opzione 2: Il nostro builder (consigliato)**
[FreeResumeBuilder.ai/it/builder](/it/builder) — Gratuito, senza registrazione, design moderno con struttura Europass.

[Crea il tuo curriculum in formato europeo](/it/builder) — Gratis, moderno, pronto per le tue candidature.`
  },
];
