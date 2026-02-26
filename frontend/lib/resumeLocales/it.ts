import { LocaleBundle } from './types';

const it: LocaleBundle = {
    localeData: {
        cities: ['Roma', 'Milano', 'Napoli', 'Torino', 'Firenze'],
        country: 'Italia',
        nationality: 'Italian',
        companies: {
            tech: ['TechCorp Soluzioni', 'InnovaTech S.r.l.', 'CloudWorks Italia', 'DataLabs Europa', 'AppForge Digital'],
            design: ['Agenzia DesignHub', 'Studio Creativo Pro', 'Pixel Perfect Design', 'Collettivo UX', 'Arti Visive S.r.l.'],
            marketing: ['GrowthMatrix Agenzia', 'Brand Elevate S.r.l.', 'Digital Reach Italia', 'Engage Media Group', 'Impact Marketing Soluzioni'],
            finance: ['Capital Advisors S.r.l.', 'Gruppo Finanziario Sterling', 'Apex Servizi Contabili', 'Investment Partners S.p.A.', 'Soluzioni Fiscali S.r.l.'],
            healthcare: ['Ospedale Generale Metropolitano', 'Centro Salute Comunitario', 'Gruppo Medico CarePlus', 'Clinica del Benessere', 'Centro Medico Regionale'],
            education: ['Liceo Scientifico Leonardo', 'Accademia Riverside', 'Universit\u00E0 Statale', 'Istituto di Formazione Superiore', 'Centro di Eccellenza Educativa'],
            sales: ['Enterprise Solutions S.r.l.', 'Partner Commerciali Globali', 'TechSales Pro Italia', 'Sviluppo Affari S.r.l.', 'Gruppo Premier Vendite'],
            hospitality: ['Ristorante Grand Hotel', 'Trattoria Eleganza', 'Riverside Grill & Bar', 'Gastronomia del Centro', 'Cucina Costiera'],
            general: ['Acme Corporation Italia', 'Imprese Globali S.p.A.', 'Soluzioni Premier S.r.l.', 'Industrie Innovative', 'Partner di Eccellenza'],
        },
        degrees: {
            tech: { degree: 'Laurea in Informatica', school: 'Politecnico di Milano' },
            design: { degree: 'Laurea in Design e Comunicazione Visiva', school: 'Accademia di Belle Arti' },
            marketing: { degree: 'Laurea in Economia e Marketing', school: 'Universit\u00E0 Bocconi' },
            finance: { degree: 'Laurea in Economia e Finanza', school: 'Facolt\u00E0 di Economia' },
            healthcare: { degree: 'Laurea in Scienze Infermieristiche', school: 'Facolt\u00E0 di Medicina e Chirurgia' },
            education: { degree: 'Laurea in Scienze della Formazione', school: 'Facolt\u00E0 di Scienze della Formazione' },
            sales: { degree: 'Laurea in Economia Aziendale', school: 'Scuola di Economia' },
            hospitality: { degree: 'Diploma in Gestione Alberghiera', school: 'Istituto Alberghiero' },
            general: { degree: 'Laurea in Lettere', school: 'Universit\u00E0 Statale' },
        },
        educationDescription: 'Laureato con lode. Membro attivo di associazioni professionali.',
        yearsText: (years) => years === 1 ? '1 anno' : `${years}+ anni`,
    },
    summaryTemplates: {
        tech: {
            entry: '{jobTitle} motivato con {years} di esperienza pratica nello sviluppo software. Appassionato di scrittura di codice pulito ed efficiente e di apprendimento di nuove tecnologie. Desideroso di contribuire a progetti innovativi e crescere professionalmente.',
            mid: '{jobTitle} orientato ai risultati con {years} di esperienza nella realizzazione di applicazioni scalabili e nella guida di iniziative tecniche. Comprovata capacit\u00E0 di fornire soluzioni di alta qualit\u00E0 che migliorano le prestazioni del sistema fino al 40%. Forte collaboratore con team interfunzionali.',
            senior: '{jobTitle} esperto con {years} di competenza nella progettazione e realizzazione di soluzioni enterprise. Ha guidato team di oltre 5 sviluppatori, riducendo i tempi di deployment del 60% tramite implementazione CI/CD. Appassionato di mentoring per sviluppatori junior e promozione dell\'eccellenza tecnica.',
            executive: 'Leader tecnologico strategico con {years} di esperienza nella trasformazione digitale e nell\'innovazione tecnica. Gestione di budget superiori a 2M\u20AC e team di oltre 20 ingegneri. Progetti realizzati con successo che hanno generato oltre 10M\u20AC di crescita dei ricavi.',
        },
        design: {
            entry: '{jobTitle} creativo con {years} di esperienza nella progettazione di interfacce centrate sull\'utente. Competente negli strumenti di design moderni e appassionato di creazione di interfacce intuitive e visivamente accattivanti.',
            mid: '{jobTitle} innovativo con {years} di esperienza nella creazione di esperienze digitali centrate sull\'utente. Progetti che hanno aumentato il coinvolgimento degli utenti del 35% e ridotto il tasso di rimbalzo del 25%.',
            senior: '{jobTitle} senior con {years} di esperienza nella guida di team di design e nella definizione della visione di prodotto. Creazione di design system adottati su oltre 10 prodotti, migliorando la coerenza del design del 50%.',
            executive: 'Dirigente del design con {years} di esperienza nella creazione e guida di organizzazioni di design di livello mondiale. Trasformazione della cultura del design in aziende Fortune 500, generando risparmi superiori a 5M\u20AC.',
        },
        marketing: {
            entry: '{jobTitle} entusiasta con {years} di esperienza nel marketing digitale. Competenze nella creazione di contenuti, gestione dei social media e analisi dei dati.',
            mid: '{jobTitle} orientato ai dati con {years} di esperienza nell\'esecuzione di campagne che producono risultati misurabili. Aumento del traffico organico del 150% e miglioramento dei tassi di conversione del 40%.',
            senior: '{jobTitle} strategico con {years} di esperienza nella guida di team di marketing ad alte prestazioni. Gestione di budget marketing superiori a 1M\u20AC e campagne con un ROI del 200%.',
            executive: 'Dirigente marketing con {years} di esperienza nella crescita dei ricavi attraverso strategie di marketing innovative. Guida di team di marketing globali e gestione di budget superiori a 10M\u20AC.',
        },
        finance: {
            entry: '{jobTitle} meticoloso con {years} di esperienza nell\'analisi finanziaria e nella reportistica. Solida preparazione nei principi contabili e nei software finanziari.',
            mid: '{jobTitle} analitico con {years} di esperienza nella pianificazione e analisi finanziaria. Identificazione di opportunit\u00E0 di risparmio con risultati superiori a 500K\u20AC annui.',
            senior: '{jobTitle} senior con {years} di esperienza nella guida di operazioni e strategie finanziarie. Gestione di portafogli superiori a 50M\u20AC e coordinamento di team durante audit di successo.',
            executive: 'Dirigente finanziario con {years} di esperienza nella definizione di strategie finanziarie e nell\'eccellenza operativa. Guida di operazioni M&A per un totale superiore a 100M\u20AC e miglioramento dei margini EBITDA del 15%.',
        },
        healthcare: {
            entry: '{jobTitle} empatico con {years} di esperienza clinica nell\'erogazione di assistenza centrata sul paziente. Impegnato nel mantenimento di elevati standard di cura.',
            mid: '{jobTitle} dedicato con {years} di esperienza nell\'erogazione di assistenza sanitaria di alta qualit\u00E0. Miglioramento dei punteggi di soddisfazione dei pazienti del 30% attraverso protocolli di comunicazione potenziati.',
            senior: '{jobTitle} esperto con {years} di competenza clinica e leadership. Guida di iniziative di miglioramento della qualit\u00E0 che hanno ridotto i ricoveri ripetuti del 20%.',
            executive: 'Dirigente sanitario con {years} di esperienza nella trasformazione delle operazioni cliniche e dei risultati per i pazienti. Guida di reparti con oltre 50 collaboratori e gestione di budget superiori a 5M\u20AC.',
        },
        education: {
            entry: '{jobTitle} appassionato con {years} di esperienza didattica impegnato nel successo degli studenti. Competente nella creazione di piani di lezione coinvolgenti e nella promozione di ambienti di apprendimento inclusivi.',
            mid: '{jobTitle} innovativo con {years} di esperienza nello sviluppo di programmi didattici per studenti con esigenze diverse. Miglioramento dei risultati scolastici del 25% attraverso strategie di insegnamento differenziato.',
            senior: '{jobTitle} veterano con {years} di esperienza nella formazione dei risultati educativi e nel tutoraggio dei colleghi. Sviluppo di programmi premiati adottati a livello distrettuale.',
            executive: 'Leader educativo con {years} di esperienza nella promozione dell\'eccellenza istituzionale. Ottenimento di oltre 2M\u20AC in finanziamenti e guida di processi di accreditamento.',
        },
        sales: {
            entry: '{jobTitle} motivato con {years} di esperienza nello sviluppo commerciale. Ottime capacit\u00E0 comunicative e forte orientamento al cliente. Determinato a superare gli obiettivi.',
            mid: '{jobTitle} orientato ai risultati con {years} di esperienza nel superamento costante delle quote. Generazione di oltre 2M\u20AC in nuovi ricavi e mantenimento di un tasso di fidelizzazione clienti del 95%.',
            senior: '{jobTitle} ad alte prestazioni con {years} di esperienza nella guida di team commerciali e nella crescita dei ricavi. Gestione di territori con un fatturato annuo superiore a 10M\u20AC.',
            executive: 'Dirigente commerciale con {years} di esperienza nella creazione e crescita di organizzazioni di vendita ad alte prestazioni. Crescita del fatturato da 5M\u20AC a 50M\u20AC ed espansione in 3 nuovi mercati.',
        },
        hospitality: {
            entry: '{jobTitle} cordiale ed energico con {years} di esperienza in ambienti di ristorazione dinamici. Impegnato a offrire un servizio clienti eccezionale.',
            mid: '{jobTitle} dedicato con {years} di esperienza nell\'erogazione di un servizio eccellente in ristoranti ad alto volume. Mantenimento di un indice di soddisfazione clienti del 98%.',
            senior: '{jobTitle} esperto con {years} di competenza nella ristorazione fine e negli esercizi ad alto volume. Formazione e tutoraggio di oltre 15 membri del personale.',
            executive: 'Professionista della ristorazione con {years} di esperienza nella gestione delle operazioni di ristorante. Supervisione di team di oltre 30 collaboratori e incremento del fatturato del 40%.',
        },
        general: {
            entry: '{jobTitle} motivato con {years} di esperienza professionale. Forte etica lavorativa, eccellenti capacit\u00E0 comunicative e impegno nel raggiungimento di risultati di qualit\u00E0.',
            mid: '{jobTitle} affermato con {years} di esperienza nella promozione dell\'eccellenza operativa. Miglioramento dell\'efficienza del team del 30% attraverso l\'ottimizzazione dei processi.',
            senior: '{jobTitle} esperto con {years} di esperienza nella guida di team e iniziative strategiche. Gestione di progetti con budget fino a 1M\u20AC con successo.',
            executive: 'Leader esecutivo con {years} di esperienza nella trasformazione organizzativa. Guida di team di oltre 50 persone e responsabilit\u00E0 di P&L superiore a 20M\u20AC.',
        },
    },
    jobDescriptions: {
        tech: [
            [
                '• Guidato lo sviluppo di un\'architettura a microservizi, migliorando la scalabilit\u00E0 del sistema del 300%',
                '• Implementate pipeline CI/CD riducendo i tempi di deployment da 2 ore a 15 minuti',
                '• Formato un team di 5 sviluppatori junior, conducendo revisioni del codice e sessioni di formazione tecnica',
                '• Collaborato con i product manager per definire i requisiti tecnici e la pianificazione degli sprint',
                '• Ridotto il tempo di caricamento dell\'applicazione del 40% tramite ottimizzazione delle prestazioni',
            ],
            [
                '• Sviluppate API RESTful con oltre 1M di richieste giornaliere e il 99,9% di uptime',
                '• Realizzate applicazioni web responsive utilizzando React e TypeScript',
                '• Integrati servizi di terze parti e gateway di pagamento',
                '• Partecipato alle cerimonie agile e contribuito alla pianificazione degli sprint',
            ],
            [
                '• Contribuito alla manutenzione del codice e alla correzione dei bug',
                '• Supportato gli sviluppatori senior nell\'implementazione di funzionalit\u00E0',
                '• Scritto test unitari migliorando la copertura del codice del 25%',
            ],
        ],
        design: [
            [
                '• Guidato un team di 5 designer nella creazione di prodotti digitali centrati sull\'utente',
                '• Creato un design system e una libreria di componenti utilizzati in oltre 10 progetti',
                '• Aumentato il coinvolgimento degli utenti del 40% attraverso miglioramenti UX',
                '• Condotta ricerca sugli utenti e test di usabilit\u00E0 con oltre 100 partecipanti',
                '• Presentati i concept di design agli stakeholder e integrato il feedback ricevuto',
            ],
            [
                '• Progettate applicazioni mobile e web per piattaforme iOS e Android',
                '• Creati wireframe, prototipi e mockup ad alta fedelt\u00E0',
                '• Collaborato con gli sviluppatori per garantire la fedelt\u00E0 nell\'implementazione del design',
                '• Migliorati i tassi di conversione del 35% tramite test A/B',
            ],
            [
                '• Supportato nella creazione di design visivi per campagne di marketing',
                '• Mantenuta la coerenza del brand in tutti i deliverable di design',
                '• Assistito i designer senior nella creazione degli asset grafici',
            ],
        ],
        marketing: [
            [
                '• Sviluppate ed eseguite strategie di marketing con un ROI del 200%',
                '• Gestito un budget annuale di marketing superiore a 500K\u20AC su canali digitali',
                '• Guidato un team di 4 specialisti di marketing nella pianificazione e nell\'esecuzione delle campagne',
                '• Aumentato il traffico organico del 150% tramite ottimizzazione SEO',
                '• Costruite partnership con influencer raggiungendo un pubblico di oltre 2M',
            ],
            [
                '• Creata una strategia di contenuti che genera oltre 100K visitatori mensili sul blog',
                '• Gestiti gli account social media con una crescita dei follower del 300%',
                '• Eseguite campagne email con un tasso di apertura del 35% e un CTR del 15%',
                '• Analizzate le performance delle campagne e ottimizzato sulla base dei dati',
            ],
            [
                '• Supportato nella creazione e programmazione di contenuti per i social media',
                '• Assistito il team con ricerche di mercato e analisi della concorrenza',
                '• Contribuito all\'organizzazione di eventi di marketing e webinar',
            ],
        ],
        finance: [
            [
                '• Gestita la pianificazione e l\'analisi finanziaria per una unit\u00E0 di business da oltre 50M\u20AC',
                '• Guidato il processo di budgeting annuale e le previsioni trimestrali',
                '• Identificate opportunit\u00E0 di risparmio con un risultato superiore a 1M\u20AC',
                '• Presentati i report finanziari alla direzione esecutiva',
                '• Supervisionato un team di 3 analisti e coordinato i processi di audit',
            ],
            [
                '• Preparati i bilanci mensili e le analisi degli scostamenti',
                '• Sviluppati modelli finanziari per la pianificazione aziendale',
                '• Ottimizzati i processi di reportistica riducendo i tempi di chiusura del 30%',
                '• Supportato le attivit\u00E0 di due diligence e integrazione M&A',
            ],
            [
                '• Assistito nella gestione dei conti fornitori e clienti',
                '• Effettuata la riconciliazione bancaria e dei conti di contabilit\u00E0 generale',
                '• Supportato i contabili senior nella chiusura mensile',
            ],
        ],
        healthcare: [
            [
                '• Supervisionato il personale infermieristico di oltre 15 unit\u00E0 nell\'assistenza ai pazienti',
                '• Implementate iniziative di miglioramento della qualit\u00E0 riducendo gli errori del 40%',
                '• Coordinati i piani di assistenza con il team interdisciplinare',
                '• Garantito il rispetto delle normative sanitarie e dei requisiti regolamentari',
                '• Formato il nuovo personale sui protocolli e le migliori pratiche cliniche',
            ],
            [
                '• Erogata assistenza diretta a oltre 10 pazienti al giorno',
                '• Somministrati farmaci e monitorate le condizioni dei pazienti',
                '• Documentate le informazioni cliniche nei sistemi informativi ospedalieri con precisione',
                '• Collaborato con i medici nella definizione dei piani terapeutici',
            ],
            [
                '• Supportato l\'accettazione dei pazienti e il monitoraggio dei parametri vitali',
                '• Assistito il personale infermieristico nelle attivit\u00E0 di assistenza quotidiana',
                '• Mantenuti gli ambienti dei pazienti puliti e ordinati',
            ],
        ],
        education: [
            [
                '• Sviluppato un programma didattico adottato a livello distrettuale per oltre 5.000 studenti',
                '• Formato oltre 10 insegnanti nell\'implementazione di nuove strategie didattiche',
                '• Migliorati i punteggi di rendimento degli studenti del 25% in 3 anni',
                '• Guidati workshop di sviluppo professionale e sessioni di formazione',
                '• Ottenuti oltre 100K\u20AC in finanziamenti per programmi educativi',
            ],
            [
                '• Tenuto lezioni a classi di oltre 25 studenti su pi\u00F9 livelli',
                '• Creati piani di lezione coinvolgenti allineati agli standard ministeriali',
                '• Implementata la didattica differenziata per studenti con diverse esigenze',
                '• Comunicato regolarmente con le famiglie sul rendimento degli studenti',
            ],
            [
                '• Assistito gli insegnanti titolari nell\'attivit\u00E0 didattica in aula',
                '• Supportato gli studenti con tutoraggio individuale e in piccoli gruppi',
                '• Contribuito all\'organizzazione dell\'aula e alla gestione dei materiali didattici',
            ],
        ],
        sales: [
            [
                '• Superato l\'obiettivo annuale del 150%, generando oltre 5M\u20AC di fatturato',
                '• Costruito e gestito un team di 8 rappresentanti commerciali',
                '• Sviluppati piani strategici per i clienti enterprise',
                '• Negoziati contratti del valore di oltre 500K\u20AC con dirigenti di alto livello',
                '• Implementati processi CRM migliorando l\'accuratezza delle previsioni del 40%',
            ],
            [
                '• Raggiunto il 120% dell\'obiettivo in modo costante per 8 trimestri consecutivi',
                '• Gestita una pipeline di oltre 50 opportunit\u00E0 per un valore superiore a 2M\u20AC',
                '• Condotte dimostrazioni di prodotto e presentazioni commerciali',
                '• Mantenuto un tasso di fidelizzazione clienti del 95% attraverso la gestione delle relazioni',
            ],
            [
                '• Generati lead attraverso chiamate a freddo e networking',
                '• Assistito i rappresentanti senior negli incontri con i clienti',
                '• Mantenuti registri accurati nel sistema CRM',
            ],
        ],
        hospitality: [
            [
                '• Supervisionato un team di oltre 10 camerieri garantendo una qualit\u00E0 del servizio costante',
                '• Formato il nuovo personale su menu, sistemi POS e standard di servizio',
                '• Risolti i reclami dei clienti con professionalit\u00E0, mantenendo il 95% di soddisfazione',
                '• Coordinato con il personale di cucina per garantire la consegna tempestiva dei piatti',
                '• Gestita una sezione di oltre 8 tavoli nelle ore di punta servendo pi\u00F9 di 100 ospiti al giorno',
            ],
            [
                '• Erogato un servizio al tavolo eccellente in un ristorante da 200 coperti',
                '• Aumentato lo scontrino medio del 20% tramite upselling efficace',
                '• Memorizzato un menu esteso inclusi piatti del giorno e abbinamenti di vini',
                '• Gestiti i pagamenti con precisione per oltre 500\u20AC di transazioni giornaliere',
            ],
            [
                '• Accolto e accompagnato gli ospiti garantendo un\'ottima prima impressione',
                '• Preso ordinazioni precise di cibi e bevande utilizzando il sistema POS',
                '• Mantenuta la sala ristorante pulita e ordinata durante tutti i turni',
            ],
        ],
        general: [
            [
                '• Guidato un team interfunzionale di oltre 10 membri su iniziative strategiche',
                '• Gestiti progetti con budget fino a 500K\u20AC consegnati nei tempi previsti',
                '• Migliorata l\'efficienza operativa del 30% attraverso l\'ottimizzazione dei processi',
                '• Sviluppate e implementate politiche e procedure dipartimentali',
                '• Presentati report trimestrali alla direzione senior',
            ],
            [
                '• Coordinato le operazioni quotidiane e la gestione del flusso di lavoro',
                '• Collaborato con gli stakeholder per rispettare le scadenze dei progetti',
                '• Analizzati i dati per identificare tendenze e opportunit\u00E0 di miglioramento',
                '• Formato i nuovi membri del team su processi e sistemi',
            ],
            [
                '• Supportato il team nelle attivit\u00E0 amministrative e operative',
                '• Assistito nell\'inserimento dati e nella preparazione dei report',
                '• Contribuito all\'organizzazione di riunioni di team ed eventi',
            ],
        ],
    },
    masterDegree: { tech: 'Laurea Magistrale in Informatica', business: 'Master in Business Administration', school: 'Scuola di Business' },
    phoneFormat: '+39 320 000 0000',
    titlePrefixes: { senior: 'Senior', lead: 'Responsabile', director: 'Direttore' },
};

export default it;
