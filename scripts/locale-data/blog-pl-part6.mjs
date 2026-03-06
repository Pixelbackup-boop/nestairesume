/**
 * Polish blog — Part 6: CV według Branży
 * Topics: cv informatyk, cv ksiegowy, cv marketing, cv sprzedaz, cv inzynier, cv nauczyciel, cv medycyna, cv logistyka, cv gastronomia
 * Targeting: cv [branża] keywords
 */

export const TOPICS_PART6 = [
  {
    slug: 'cv-informatyk',
    title: 'CV informatyk: wzory i przykłady dla programistów IT 2026',
    description: 'CV informatyk i programista — wzory, przykłady i wskazówki. Jak napisać CV IT, które przejdzie ATS i zachwyci rekrutera technicznego. Szablony CV dla developerów w Polsce 2026.',
    category: 'CV według Branży',
    tags: [
      'cv informatyk',
      'cv programista',
      'cv developer',
      'cv it przykład',
      'wzór cv informatyk',
      'cv software developer',
      'cv it polska',
      'cv it ats',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV informatyk i programista — wzory i przykłady 2026',
    featured: true,
    faq: [
      { question: 'Co powinno być w CV programisty?', answer: 'Obowiązkowe elementy CV IT: sekcja umiejętności technicznych (tech stack), projekty (z linkami do GitHub lub live demo), doświadczenie zawodowe z konkretnymi technologiami użytymi w każdej roli, certyfikaty (AWS, Google Cloud, Azure), wykształcenie (jeśli informatyczne). Dla juniorów: projekty akademickie i własne są kluczowe — zastępują doświadczenie.' },
      { question: 'Jak opisać tech stack w CV?', answer: 'Kategoryzuj umiejętności: Frontend (React, TypeScript, CSS), Backend (Node.js, Python, Java), Bazy danych (PostgreSQL, MongoDB, Redis), DevOps/Cloud (Docker, Kubernetes, AWS), Narzędzia (Git, Jira, Figma). Nie rób listy bez kategorii — 40 technologii w jednej linii jest nieczytelne. Oznacz poziom (Senior/Mid/Junior lub Latami doświadczenia).' },
      { question: 'Czy programista powinien mieć portfolio GitHub?', answer: 'Absolutnie tak. GitHub profil jest dla programisty tym, czym portfolio dla designera. Aktywny profil (regularne commits), README w projektach, dobrze opisane repozytoria, projekty open source — to wszystko mówi o kandydacie więcej niż CV. Link do GitHub powinien być w nagłówku CV.' },
      { question: 'Jak długie CV powinien mieć programista?', answer: 'Junior (0–3 lata): 1 strona. Mid (3–7 lat): 1–2 strony. Senior (7+ lat): 2 strony. Tech lead/architect z rozbudowanym portfolio projektów: do 3 stron. Dla IT jest przyzwolenie na 2 strony wcześniej niż w innych branżach, ale treść musi uzasadniać długość.' },
    ],
    body: `## CV informatyk i programista — jak napisać CV IT, które wyróżni Cię w rekrutacji technicznej

Rekrutacja w IT rządzi się innymi prawami. Masz tech screen, coding challenge, system design interview — i właśnie dlatego Twoje CV musi otworzyć drzwi do tych rozmów. Rekruterzy techniczni i tech leady patrzą na CV inaczej niż HR w tradycyjnych branżach.

### Struktura CV dla programisty

**1. Nagłówek z linkami technicznymi**
\`\`\`
Jan Kowalski — Full Stack Developer
jan@email.pl | +48 600 123 456 | Warszawa (remote OK)
GitHub: github.com/jankowalski | Portfolio: jankowalski.dev
LinkedIn: linkedin.com/in/jankowalski
\`\`\`

**2. Podsumowanie techniczne (3–4 zdania)**
*"Full Stack Developer z 5-letnim doświadczeniem w React, Node.js i PostgreSQL, specjalizujący się w aplikacjach e-commerce o wysokim ruchu. Moje ostatnie projekty obsługiwały 200K+ użytkowników dziennie z uptime 99.9%. Doświadczony w pracy zdalnej w cross-functional teams (scrum, sprint planning). Szukam roli senior developera lub tech lead w środowisku produktowym."*

**3. Umiejętności techniczne (Tech Stack)**
\`\`\`
Frontend:     React 18, Next.js 14, TypeScript, Tailwind CSS, Redux
Backend:      Node.js, Express, Python (Django/FastAPI), REST, GraphQL
Bazy danych:  PostgreSQL, MongoDB, Redis, Elasticsearch
DevOps/Cloud: Docker, Kubernetes, AWS (EC2, S3, Lambda), CI/CD (GitHub Actions)
Narzędzia:    Git, Jira, Figma, Postman, Jest, Cypress
\`\`\`

**4. Doświadczenie zawodowe — z technologiami i wynikami**
\`\`\`
Senior Frontend Developer | TechCorp S.A. | Warszawa | 01.2022 – obecnie

• Zoptymalizowałem Core Web Vitals aplikacji e-commerce (LCP: 4.2s→1.8s, CLS: 0.35→0.05), co zwiększyło konwersję o 22%
• Zrealizowałem migrację 150K linii kodu z JavaScript do TypeScript bez przerwy w dostawie funkcji
• Wdrożyłem lazy loading i code splitting, redukując initial bundle size o 45%
• Prowadziłem code review dla 4-osobowego zespołu frontend (300+ PR rocznie)
Stos: React 18, TypeScript, Next.js, Tanstack Query, Tailwind CSS, Jest
\`\`\`

**5. Projekty (szczególnie dla juniorów)**
\`\`\`
Projekt: FinanceTracker | github.com/jankowalski/finance-tracker
Aplikacja webowa do zarządzania budżetem osobistym (Next.js, PostgreSQL, Stripe)
• 340 gwiazdek GitHub, 80% pokrycie testami (Jest + Cypress)
• Przetworzono 15 000 transakcji w beta fazie dla 200 użytkowników
\`\`\`

### Sekcje CV IT — co uwzględnić

**Certyfikaty (wysoko cenione w IT):**
- AWS Solutions Architect, AWS Developer, AWS SysOps
- Google Cloud Professional
- Azure AZ-900, AZ-204
- Kubernetes (CKA, CKAD)
- HashiCorp Terraform Associate

**Wkład w open source:**
Nawet kilka merged PR do znanych projektów to silny sygnał. Wymień projekty i liczbę contributions.

**Publikacje i wystąpienia:**
Blog techniczny, artykuły na Medium/Dev.to, prezentacje na meetupach — to E-E-A-T dla rekrutera technicznego.

### Błędy w CV IT — co rekruterzy nienawidzą

**"Dobra znajomość Java"**
Co to znaczy? 1 miesiąc kursu? 5 lat? Podaj lata doświadczenia lub ostatni projekt z tą technologią.

**Wymienienie 50 technologii**
"Znam: Java, Python, C++, React, Angular, Vue, Svelte, PHP, Ruby, Go, Rust..." — nikt nie wierzy. Podaj real tech stack, nie wish list.

**Brak liczb w opisach doświadczenia**
"Tworzyłem aplikacje webowe" → Mówi niczego. "Zbudowałem aplikację obsługującą 50K żądań/s, co skróciło czas procesowania o 30%" → Mówi wszystko.

**Brak linku do GitHub**
W 2026 brak aktywnego GitHub to czerwona flaga dla wielu tech leads. Upewnij się, że profil jest aktywny i zadbany.

### Wskazówka eksperta

> **Rekruter HR czyta CV przez 6 sekund, tech lead przez 30. Dwie różne strategie.** HR szuka: poprawnych słów kluczowych (React, Node.js, AWS), doświadczenia w podobnych firmach, dostępności. Tech lead szuka: projektów, które możesz opisać, technologii w kontekście, rozwiązanych problemów. CV powinno zadowolić oboje — czytelne dla HR (słowa kluczowe, struktura), imponujące dla tech lead (konkretne projekty i wyniki).`,
  },

  {
    slug: 'cv-ksiegowosc',
    title: 'CV księgowy: wzory i przykłady dla finansistów 2026',
    description: 'CV księgowy i księgowa — wzory, przykłady i wskazówki dla specjalistów finansowych. Jak napisać CV księgowego, które wyróżni się na polskim rynku pracy w 2026.',
    category: 'CV według Branży',
    tags: [
      'cv ksiegowy',
      'cv ksiegowa',
      'cv finanse',
      'cv rachunkowość',
      'wzór cv ksiegowy',
      'cv glowna ksiegowa',
      'cv finanse polska',
      'cv specjalista finansowy',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV księgowy i finansista — wzory i przykłady 2026',
    featured: false,
    faq: [
      { question: 'Jakie certyfikaty wzmacniają CV księgowego?', answer: 'Kluczowe certyfikaty: ACCA (Associate Chartered Certified Accountant — prestiżowy international), CPA (Certified Public Accountant — USA/global), Biegły Rewident (egzamin KIBR — wymóg w Polsce), CIMA (Chartered Management Accountant), CIA (Certified Internal Auditor), certyfikaty systemów ERP (SAP FI/CO, Oracle Financials, Comarch Optima).' },
      { question: 'Jakie oprogramowanie wpisać do CV księgowego?', answer: 'Oprogramowanie księgowe: Comarch Optima, Comarch ERP XL, SAP (FI/CO/MM), Symfonia, Sage, Oracle Financials, Microsoft Dynamics 365. Narzędzia analityczne: Excel (zaawansowany — Power Query, Power Pivot, VBA), Power BI, Python (dla data-driven finance). Wspomnij konkretne moduły, z którymi pracowałeś.' },
      { question: 'Jak opisać doświadczenie w CV głównego księgowego?', answer: 'Podkreśl: wielkość firmy i branżę (przychody, liczba pracowników — to kontekst dla pracodawcy), złożoność raportowania (polskie US, MSSF, US GAAP), udane audyty (bez zastrzeżeń to osiągnięcie!), zarządzanie budżetem i cash flow, doświadczenie z urzędami (US, ZUS, KAS), rozmiar i skład zespołu, który nadzorowałeś.' },
      { question: 'Czy wpisywać stawkę godzinową dla freelance księgowego?', answer: 'Nie wpisuj stawek bezpośrednio do CV — to do negocjacji. Dla freelancerów: opisz zakres obsługiwanych klientów (np. "obsługiwałem 15 klientów z sektora MŚP, budżety 500K–5M PLN rocznego obrotu") zamiast konkretnych stawek.' },
    ],
    body: `## CV księgowy i finansista — jak napisać CV, które przekona rekrutera i CFO

Praca w księgowości i finansach wymaga precyzji, rzetelności i udokumentowanej historii bezbłędnej pracy. To samo powinno odzwierciedlać Twoje CV. Rekruterzy i CFO czytają CV finansistów bardzo krytycznie — błąd w datach lub liczbach może dyskredytować kandydata już na etapie CV.

### Kluczowe sekcje CV dla księgowego

**Podsumowanie zawodowe**
*"Główna Księgowa z 9-letnim doświadczeniem w sektorze produkcyjnym (MSSF, polskie standardy rachunkowości). Przeprowadziłam 12 audytów zewnętrznych bez zastrzeżeń. Zarządzam zespołem 5-osobowym i budżetem operacyjnym 25M PLN rocznie. Specjalizacja: raportowanie konsolidacyjne, optymalizacja procesów AP/AR, implementacja SAP FI/CO."*

**Umiejętności techniczne (Finance Skills)**
\`\`\`
Standardy rachunkowości: Polskie US (UoR), MSSF/IFRS, US GAAP
Oprogramowanie: SAP FI/CO/MM, Comarch Optima, Oracle Financials
Analityka: Excel (zaawansowany, VBA, Power Query), Power BI
Obszary: Zamknięcia miesięczne, Reporting, Budżetowanie, Cash Flow, Audyt
Certyfikaty: ACCA (2019), Biegły Rewident (KR nr 15234)
\`\`\`

**Doświadczenie z mierzalnymi osiągnięciami**
\`\`\`
Główna Księgowa | Manufacturing Corp Sp. z o.o. | 03.2019 – obecnie

• Zarządzam całością procesów finansowo-księgowych firmy o przychodach 120M PLN
• Przeprowadziłam implementację SAP FI/CO (6 miesięcy, 0 dni przerwy w raportowaniu)
• Skróciłam cykl zamknięcia miesięcznego z 8 do 4 dni roboczych
• Wdrożyłam automatyzację rozliczeń AP, eliminując 15 godzin pracy ręcznej tygodniowo
• Prowadziłam 4 audyty zewnętrzne (Big4) bez zastrzeżeń
\`\`\`

### Najważniejsze słowa kluczowe dla CV finansowego

**Dla małych i średnich firm (MŚP):**
Comarch Optima/ERP XL, Symfonia, KPiR, VAT, ZUS, US, deklaracje podatkowe, bilans, rachunek zysków i strat

**Dla korporacji i firm zagranicznych:**
SAP, MSSF/IFRS, konsolidacja, raportowanie zarządcze, budżetowanie, FP&A, EBITDA, cash flow, treasury, Big4 audit

**Dla freelancerów i biur rachunkowych:**
Pełna księgowość, KPiR, ryczałt, obsługa klientów MŚP, doradztwo podatkowe, JPK, e-sprawozdania

### Wskazówka eksperta

> **W finansach "brak zastrzeżeń audytowych" jest równoznaczne z osiągnięciem.** Każdy udany audyt (bez błędów, bez konieczności korekty) to konkretny wynik. Podobnie: "0 błędów w 500 deklaracjach VAT przez 3 lata" lub "eliminacja różnic kasowych z 3.2% do 0.1%". Dla rekruterów finansowych liczby i precyzja to sygnał kompetencji — brak liczb w CV to red flag.`,
  },

  {
    slug: 'cv-marketing',
    title: 'CV marketing: wzory i przykłady dla specjalistów 2026',
    description: 'CV marketing — wzory i przykłady dla specjalistów marketingu. Jak napisać CV marketingowca, który wyróżni się na polskim rynku: digital marketing, SEO, social media, content.',
    category: 'CV według Branży',
    tags: [
      'cv marketing',
      'cv specjalista marketingu',
      'cv digital marketing',
      'cv social media',
      'cv seo',
      'cv marketingowiec',
      'wzór cv marketing',
      'cv content marketing',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV marketing — wzory i przykłady dla specjalistów marketingu 2026',
    featured: false,
    faq: [
      { question: 'Jak udowodnić wyniki marketingowe w CV?', answer: 'Marketing CV musi być oparty na danych. Zamiast "zarządzałem kampaniami Google Ads", napisz: "Zarządzałem kampaniami Google Ads z budżetem 200K PLN/mc, osiągając ROAS 3.8 (powyżej średniej branżowej 2.5)". Metryki: CAC, ROAS, CTR, konwersja, ruch organiczny %, MQL, pipeline generated.' },
      { question: 'Jakie narzędzia wpisać do CV marketingowego?', answer: 'Kluczowe narzędzia: Google Analytics 4, Google Ads, Meta Ads Manager, HubSpot, Salesforce, SEMrush/Ahrefs, Mailchimp/Klaviyo, Canva/Adobe CC, Hotjar, Looker Studio (Google Data Studio), LinkedIn Campaign Manager, TikTok Ads. Podaj narzędzia, z których naprawdę korzystałeś — weryfikacja jest prosta.' },
      { question: 'Czy marketer powinien mieć portfolio w CV?', answer: 'Tak — szczególnie dla content marketerów i social media managerów. Link do portfolio, profilu mediów społecznościowych zarządzanych, próbek treści (case study, newsletter, artykuły). Dla performance marketerów: case study z wynikami kampanii (możesz zanonimizować dane klienta).' },
      { question: 'Jak wyróżnić CV marketingowe wśród wielu kandydatów?', answer: 'Trzy wyróżniki: konkretne liczby (nie ogólniki), niszowe umiejętności (np. marketing automation, LinkedIn Ads, TikTok), i dowody poza CV (portfolio, case studies, profil LinkedIn z content strategy). Większość marketingowych CV jest pełna ogólników — konkretne kampanie z wynikami natychmiast wyróżniają.' },
    ],
    body: `## CV marketing — jak napisać CV, które udowodni Twoje wyniki

Marketing to branża wyników. Twoje CV powinno to odzwierciedlać: każde zdanie to liczba, każda rola to udowodniona wartość. Rekruterzy marketingowi widzą setki CV z "zarządzaniem kampaniami" — wyróżniają się te z "ROAS 4.2" i "156% wzrost organiki".

### Struktura CV dla marketingowca

**Podsumowanie:**
*"Senior Digital Marketing Manager z 7-letnim doświadczeniem w e-commerce i SaaS. Specjalizacja: growth marketing, SEO, i performance marketing. Moje ostatnie kampanie wygenerowały 2.3M PLN pipeline w Q4 2025. Zarządzam budżetami mediowymi do 500K PLN/miesiąc i zespołem 6 specjalistów."*

**Tech stack marketingowy:**
\`\`\`
Analytics:      Google Analytics 4, Looker Studio, Mixpanel, Hotjar
Paid Ads:       Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads
SEO:            SEMrush, Ahrefs, Google Search Console, Screaming Frog
Email/Automation: HubSpot, Klaviyo, Mailchimp, Salesforce Marketing Cloud
Content:        WordPress, Contentful, Canva, Figma (podstawowy)
\`\`\`

**Doświadczenie z kampaniami:**
\`\`\`
Digital Marketing Manager | E-commerce XYZ | 01.2022 – obecnie

• Zwiększyłem organiczny ruch SEO z 45K do 210K sesji/miesiąc (367% wzrost, 18 miesięcy)
• Zarządzałem budżetem Google Ads 300K PLN/mc, osiągając ROAS 4.1 (↑ z 2.3 poprzednia osoba)
• Zautomatyzowałem email journey w HubSpot — lead nurturing skrócił cykl sprzedaży o 28%
• Uruchomiłem kanał TikTok (0→85K obserwujących w 6 miesięcy, 12 virali 100K+ views)
• Zarządzam i mentoruję 4-osobowy zespół content & performance
\`\`\`

### Metryki marketingowe — słownik dla CV

Dla rekruterów:
- **ROAS** (Return on Ad Spend): każda złotówka w reklamie przynosi X zł przychodu
- **CAC** (Customer Acquisition Cost): koszt pozyskania jednego klienta
- **LTV** (Lifetime Value): wartość klienta przez cały czas współpracy
- **CTR** (Click-Through Rate): % kliknięć w reklamę/email
- **MQL/SQL**: Marketing/Sales Qualified Lead (leady w lejku)

W CV używaj metryk, które rekruter zna — jeśli stosujesz firmowe wewnętrzne metryki, wyjaśnij je w nawiasie.

### Wskazówka eksperta

> **Marketer bez case studies w CV to jak fotograf bez zdjęć.** Przygotuj przynajmniej 1 case study: "Problem → Działanie → Wynik". Możesz zanonimizować dane klienta, ale konkretna historia (np. "Startup B2B SaaS — zwiększyłem MQL o 180% w 4 miesiące") jest wielokrotnie bardziej przekonująca niż lista narzędzi i ogólnych odpowiedzialności.`,
  },

  {
    slug: 'cv-sprzedaz',
    title: 'CV sprzedawca: wzory i przykłady dla przedstawicieli handlowych',
    description: 'CV sprzedawca i przedstawiciel handlowy — wzory, przykłady i kluczowe elementy. Jak napisać CV do sprzedaży z wynikami i liczbami, które przekonają hiring managera.',
    category: 'CV według Branży',
    tags: [
      'cv sprzedawca',
      'cv handlowiec',
      'cv przedstawiciel handlowy',
      'cv sprzedaż',
      'cv key account manager',
      'cv account manager',
      'wzór cv sprzedaż',
      'cv sprzedaż b2b',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV sprzedawca i handlowiec — wzory i przykłady 2026',
    featured: false,
    faq: [
      { question: 'Jakie metryki sprzedażowe wpisać do CV?', answer: 'Kluczowe metryki: % realizacji planu sprzedaży (np. "realizowałem 115–130% planu przez 3 lata"), wartość pipeline, ARR/MRR wygenerowane, CAC (koszt pozyskania klienta), win rate (% zamkniętych dealsów), średnia wartość transakcji, liczba nowych klientów pozyskanych, retencja/churn klientów.' },
      { question: 'Czy wpisywać liczby sprzedaży do CV?', answer: 'Absolutnie tak — to najważniejszy element CV sprzedażowego. Rekruter zatrudniający handlowca chce widzieć wyniki, nie opis obowiązków. Jeśli obawiasz się ujawnienia danych firmy, używaj procentów i relatywnych wyników: "zwiększyłem przychody portfela o 45%" zamiast konkretnych kwot.' },
      { question: 'Jak opisać zmianę z B2C na B2B sprzedaż?', answer: 'Podkreśl transferowalne umiejętności: zarządzanie relacjami, negocjacje, pipeline management, zamykanie transakcji. Wspomnij jeśli miałeś doświadczenia z klientami biznesowymi w roli B2C (np. corporate accounts, duże zlecenia). Rozważ dodatkowe szkolenia lub certyfikaty sprzedaży B2B (np. SPIN Selling, Challenger Sale).' },
      { question: 'Jakie CRM wpisywać do CV sprzedażowego?', answer: 'Wymień konkretny CRM: Salesforce (najczęściej wymagany w korporacjach), HubSpot CRM (startupy i MŚP), Pipedrive (popularne w sprzedaży B2B), Microsoft Dynamics 365, Sugar CRM, Freshsales. Podaj ile lat doświadczenia z danym CRM i jakich funkcji używałeś (pipeline management, forecasting, reporting).' },
    ],
    body: `## CV sprzedawca i handlowiec — jak napisać CV, które mówi liczbami

W sprzedaży wyniki mówią głośniej niż wszystko inne. Twoje CV powinno być skonstruowane tak, jak Ty sprzedajesz: z konkretnymi liczbami, jasnym value proposition i dowodem na zamykanie dealsów.

### Kluczowe elementy CV sprzedażowego

**Podsumowanie:**
*"Senior Account Executive z 8-letnim doświadczeniem w B2B SaaS. Regularnie przekraczam target sprzedażowy o 20–30% (średnio 127% planu przez ostatnie 4 lata). Specjalizacja: enterprise accounts, złożone cykle sprzedaży 3–12 miesięcy, negocjacje kontraktów od 100K do 2M PLN. Zbudowałem portfel klientów o wartości ARR 12M PLN."*

**Wyniki sprzedażowe (sekcja Key Achievements):**
\`\`\`
Osiągnięcia sprzedażowe:
• Q4 2025: 143% planu kwartalnego (najlepszy wynik zespołu 12 handlowców)
• 2024: Pozyskałem 28 nowych klientów enterprise, ARR: 4.2M PLN
• Utrzymanie retencji klientów: 94% przez 3 lata (średnia branżowa 82%)
• Zamknąłem największy deal w historii firmy: 2.1M PLN roczny kontrakt
\`\`\`

**Doświadczenie z metrykami:**
\`\`\`
Senior Account Executive | SaaS Corp | 03.2021 – obecnie

• Zarządzam portfelem 35 klientów enterprise (ARR: 8.5M PLN)
• Realizuję 115–145% planu sprzedażowego przez 4 kolejne lata
• Skróciłem średni cykl sprzedaży o 23% przez wdrożenie metodologii MEDDIC
• Rozwijam upsell i cross-sell w istniejącym portfelu: +35% expansion revenue YoY
• Prowadziłem i mentorino 2 juniorów AE, jeden awansował na Mid AE w 8 miesięcy
\`\`\`

### Wskazówka eksperta

> **Hire Manager w sprzedaży ma jedno pytanie: "Czy ta osoba będzie dowozić target?"** Twoje CV musi odpowiedzieć TAK — przez konkretne liczby % realizacji planu, wartości sprzedaży i wyniki potwierdzające konsekwencję. "Realizowałem 125% planu przez 4 kolejne lata" jest absolutnie najsilniejszym zdaniem w CV handlowca. Bez liczb jesteś jednym z 200 kandydatów.`,
  },

  {
    slug: 'cv-inzynier',
    title: 'CV inżynier: wzory i przykłady dla inżynierów 2026',
    description: 'CV inżynier — wzory i przykłady dla inżynierów różnych specjalności. Jak napisać CV mechanika, elektryka, budowniczego, inżyniera produkcji, który wyróżni się na polskim rynku.',
    category: 'CV według Branży',
    tags: [
      'cv inżynier',
      'cv inzynier mechanik',
      'cv inzynier budowlany',
      'cv inzynier produkcji',
      'cv techniczny',
      'wzór cv inżynier',
      'cv inzynier elektryki',
      'cv engineering polska',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV inżynier — wzory i przykłady dla inżynierów 2026',
    featured: false,
    faq: [
      { question: 'Jakie uprawnienia i certyfikaty wpisać do CV inżyniera?', answer: 'Uprawnienia budowlane (PIIB, branżowe), SEP (elektryczne/energetyczne), UDT (dozór techniczny), spawalnicze (IW, IS), ISO (auditor, wdrożenie), lean/six sigma (Green Belt, Black Belt), PMP lub Prince2 (dla PM ról), certyfikaty narzędziowe (AutoCAD, SolidWorks, CATIA). Zawsze podaj numer uprawnień i datę — rekruter może weryfikować.' },
      { question: 'Jak opisać projekty inżynierskie w CV?', answer: 'Format: Nazwa projektu | Budżet | Czas realizacji | Twoja rola + kluczowe wyniki. Przykład: "Projekt modernizacji linii produkcyjnej | Budżet: 3.5M PLN | 18 miesięcy | Kierownik projektu — zrealizowany 2 tygodnie przed terminem, zwiększenie wydajności o 35%, ROI w 14 miesięcy."' },
      { question: 'Jakie oprogramowanie CAD/CAM wpisywać do CV?', answer: 'Wymień konkretny software i poziom: AutoCAD (2D/3D, 15 lat), SolidWorks (surface modeling, 5 lat), CATIA V5 (aerospace, 3 lata), Inventor, ANSYS, Abaqus, Siemens NX, MATLAB, LabVIEW, AVEVA, SAP PM/MM. Certyfikaty (np. SolidWorks Certified Professional) są szczególnie cenione.' },
      { question: 'Czy inżynier powinien mieć portfolio?', answer: 'Tak, dla architektów i inżynierów z projektami wizualnymi — portfolio jest niezbędne. Dla pozostałych inżynierów: opis kluczowych projektów (nazwa, budżet, wyniki) w CV zastępuje portfolio. Możesz stworzyć 1-stronicowe portfolio projektów jako oddzielny załącznik lub podać link do portfolio online.' },
    ],
    body: `## CV inżynier — jak napisać CV techniczne, które wyróżni Cię w rekrutacji

Inżynierowie często popełniają w CV ten sam błąd: skupiają się na tym "co robili", nie na tym "co osiągnęli". Rekruter techniczny i dyrektor techniczny chcą widzieć projekty, budżety, wyniki i konkretne wkłady techniczne.

### Struktura CV inżynierskiego

**Podsumowanie dla inżyniera produkcji:**
*"Inżynier procesu z 9-letnim doświadczeniem w automotive i FMCG. Specjalista Lean Manufacturing (Green Belt Six Sigma, 15 wdrożeń). Kierowałem projekty CAPEX do 12M PLN. Moje ostatnie wdrożenie linii produkcyjnej zwiększyło OEE z 67% do 85% i zredukowało odpad o 23% — ROI w 16 miesięcy."*

**Umiejętności techniczne:**
\`\`\`
Metodologie:     Lean Manufacturing, Six Sigma (Green Belt), TPM, Kaizen, FMEA
Narzędzia:       AutoCAD, SolidWorks, SAP PM/MM/PP, MATLAB, LabVIEW
Normy:           ISO 9001, IATF 16949 (automotive), ISO 14001, OHSAS 18001
Uprawnienia:     SEP G1 (do 15kV), Uprawnienia budowlane bez ograniczeń (konstruktoring)
\`\`\`

**Doświadczenie z projektami:**
\`\`\`
Senior Process Engineer | Automotive Corp | 06.2018 – obecnie

• Kierowałem modernizacją linii montażu silników (budżet 8.5M PLN): dostawa 3 tyg. przed terminem, OEE ↑ 67%→85%
• Przeprowadziłem 8 projektów Kaizen — łączne oszczędności 1.2M PLN/rok
• Wdrożyłem system Poka-Yoke na 12 stacjach roboczych — defekty ↓ 78%
• Zarządzałem dostawcami maszyn (3 europejskie firmy), negocjując warunki gwarancji i SLA
\`\`\`

### Wskazówka eksperta

> **Inżynierski CV powinien odzwierciedlać Twoje myślenie inżynierskie: problem → rozwiązanie → wynik mierzalny.** Rekruterzy techniczni i dyrektorzy produkcji są natrenowani na myślenie w kategoriach KPI, OEE, defekty, budżety i harmonogramy. Gdy Twoje CV mówi ich językiem — liczby i wyniki projektów — natychmiast buduje wiarygodność. Brak liczb = brak dowodów = słabe CV.`,
  },

  {
    slug: 'cv-nauczyciel',
    title: 'CV nauczyciel: wzory i przykłady dla pedagogów 2026',
    description: 'CV nauczyciel — wzory i przykłady dla nauczycieli i pedagogów. Jak napisać CV do szkoły, przedszkola i placówki oświatowej. Kluczowe elementy CV pedagoga w Polsce 2026.',
    category: 'CV według Branży',
    tags: [
      'cv nauczyciel',
      'cv pedagog',
      'cv do szkoły',
      'wzór cv nauczyciela',
      'cv nauczyciel przedmiotu',
      'cv wychowawca',
      'cv oświata polska',
      'cv nauczyciel akademicki',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV nauczyciel i pedagog — wzory i przykłady 2026',
    featured: false,
    faq: [
      { question: 'Jakie dokumenty dołącza nauczyciel do CV?', answer: 'Typowe dokumenty dla nauczyciela: dyplom ukończenia studiów pedagogicznych (lub kurs pedagogiczny), akt nadania stopnia awansu zawodowego (nauczyciel kontraktowy/mianowany/dyplomowany), zaświadczenie o niekaralności (KRK), certyfikaty z kursów doskonalących nauczycieli, jeśli dotyczy: zaświadczenie o znajomości języka (dla nauczycieli jezykowych).' },
      { question: 'Jak opisać awans zawodowy nauczyciela w CV?', answer: 'Podaj aktualny stopień: nauczyciel stażysta, kontraktowy, mianowany lub dyplomowany (z datą mianowania/uchwały rady pedagogicznej). Dyplomowany to najwyższy stopień — warto go wyróżnić. Awans jest ważny dla dyrektorów szkół jako wskaźnik doświadczenia i zaangażowania w zawód.' },
      { question: 'Czy nauczyciel powinien mieć portfolio pedagogiczne?', answer: 'Tak — szczególnie przy awansie zawodowym i aplikacjach do prestiżowych placówek. Portfolio pedagogiczne: konspekty lekcji (innowacyjne metody), wyniki uczniów, projekty edukacyjne, współpraca z rodzicami, aktywność pozalekcyjna (kółka, olimpiady). Dla nauczyciela prywatnej szkoły lub lektora — bardzo ważne.' },
      { question: 'Jak napisać CV nauczyciela języka angielskiego?', answer: 'Podkreśl: certyfikaty językowe (CELTA, DELTA, TEFL, Cambridge TKT), metody nauczania (communicative approach, task-based learning), doświadczenie z różnymi grupami wiekowymi (dzieci, maturzyści, business English), wyniki egzaminów uczniów (np. "85% moich uczniów zdało maturę rozszerzoną na 80%+").' },
    ],
    body: `## CV nauczyciel i pedagog — jak napisać CV do szkoły i placówki oświatowej

CV nauczyciela ma inne reguły niż CV w sektorze prywatnym. Dyrektorzy szkół patrzą na kwalifikacje, stopień awansu zawodowego, certyfikaty i zaangażowanie w pozalekcyjne formy edukacji. Precyzja i dokumentacja są kluczowe.

### Kluczowe elementy CV nauczycielskiego

**Podsumowanie:**
*"Nauczyciel języka angielskiego i historii z 12-letnim stażem w szkolnictwie publicznym. Stopień nauczyciela dyplomowanego (2021). Specjalizacja: przygotowanie do matury rozszerzonej (85% uczniów zdaje na 75%+). Prowadziłam szkolne kółko historyczne i reprezentowałam szkołę na konkursach kuratoryjnych (3 nagrody w ostatnich 5 latach)."*

**Kwalifikacje i certyfikaty:**
\`\`\`
Stopień awansu:  Nauczyciel dyplomowany (uchwała RP nr 12/2021, Kuratorium Oświaty)
Wykształcenie:   Magister — Filologia angielska z pedagogiką, UAM Poznań 2012
Certyfikaty:     CELTA (Cambridge, 2013), Microsoft Educator (2024)
Kursy:           Szkoła dla edukatorów (NASK), Edukacja włączająca (MEN 2023)
\`\`\`

**Doświadczenie z osiągnięciami pedagogicznymi:**
\`\`\`
Nauczyciel języka angielskiego | SP nr 12 im. Jana Kochanowskiego | Warszawa | 09.2015 – obecnie

• Przygotowuję uczniów do egzaminu maturalnego (85% zdaje na poziomie ≥75%)
• Prowadzę kółko teatralne w języku angielskim — 3 spektakle rocznie, 40 uczniów
• Koordynuję wymianę szkolną z partnerską szkołą w UK (8 lat, 120 uczniów)
• Wdrożyłam hybrydowy model nauczania (Google Classroom) od 2020 — "najlepsze praktyki" prezentowane na konferencji Kuratoryjnej 2023
• Wychowawca klasy IVb — 0 ocen nagannych, wzrost frekwencji z 87% do 94% przez 2 lata
\`\`\`

### Wskazówka eksperta

> **Dyrektor szkoły szuka nauczyciela, który angażuje się poza lekcje.** CV pełne samych lekcji to niewystarczające. Kółka zainteresowań, wycieczki, olimpiady, projekty z uczniami, współpraca z rodzicami, wystąpienia na radach pedagogicznych — to wyróżniki. Nauczyciel, który "tylko uczy" jest mniej atrakcyjny niż ten, który tworzy doświadczenia edukacyjne dla całej społeczności szkolnej.`,
  },

  {
    slug: 'cv-medycyna',
    title: 'CV lekarz i pielęgniarka: wzory dla zawodów medycznych 2026',
    description: 'CV lekarz, pielęgniarka i zawody medyczne — wzory i przykłady. Jak napisać CV dla zawodów medycznych w Polsce: wymagane dokumenty, specjalizacje i kluczowe elementy.',
    category: 'CV według Branży',
    tags: [
      'cv lekarz',
      'cv pielęgniarka',
      'cv medycyna',
      'cv rezydent',
      'cv zawody medyczne',
      'wzór cv medyczny',
      'cv ratownik medyczny',
      'cv farmaceuta cv',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV lekarz i pielęgniarka — wzory dla zawodów medycznych 2026',
    featured: false,
    faq: [
      { question: 'Co powinno być w CV lekarza?', answer: 'Obowiązkowe: numer prawa do wykonywania zawodu (PWZ), specjalizacja (tytuł, data), ukończone szkolenia specjalizacyjne, doświadczenie kliniczne (oddziały, profile), publikacje naukowe jeśli są, udział w konferencjach medycznych, certyfikaty procedur (np. ECHO, endoskopia, ultrasonografia). Dla rezydenturę: wyniki LEK/LDEK, preferowane miejsca specjalizacji.' },
      { question: 'Jak napisać CV pielęgniarki?', answer: 'Kluczowe elementy: numer NIPIP (Narodowy Identyfikator Pielęgniarki), specjalizacje pielęgniarskie (jeśli są), doświadczenie w konkretnych oddziałach (oddział kardiologiczny, OIOM, chirurgia), umiejętności proceduralne (obsługa respiratora, monitoring inwazyjny, żywienie pozajelitowe), kursy kwalifikacyjne i specjalistyczne.' },
      { question: 'Czy lekarz powinien pisać CV po angielsku?', answer: 'Tak jeśli: aplikujesz do kliniki zagranicznej (UK, Niemcy, Skandynawia), piszesz do szpitali prywatnych z zagranicznymi właścicielami, chcesz nostryfikować dyplom za granicą, lub aplikujesz na granty badawcze UE. Dla polskiego rynku publicznego — polskie CV wystarczy.' },
      { question: 'Jak opisać rotacje rezydenturę w CV?', answer: 'Wymień każdy oddział rotacji z datami i kluczowymi procedurami: "Rotacja: Oddział Kardiologiczny, 6 miesięcy — 120 EKG interpretowanych, 45 echokardiografii (pod nadzorem), management 8 pacjentów JCI dziennie." Dla rezydenturę: wyniki LEK/LDEK i percentyl są ważne — podaj jeśli są wysokie.' },
    ],
    body: `## CV medyczne — jak napisać CV lekarza, pielęgniarki i specjalistów ochrony zdrowia

CV medyczne ma unikalne wymagania: musi zawierać numer prawa wykonywania zawodu, specjalizacje, procedury i doświadczenie kliniczne w formacie zrozumiałym dla dyrektora szpitala lub ordynatora oddziału.

### Struktura CV lekarza

**Nagłówek z danymi medycznymi:**
\`\`\`
Dr n. med. Anna Kowalska
Specjalista chorób wewnętrznych
PWZ: 1234567 | NPWZ: 87654321
anna@email.pl | +48 600 123 456
Kraków
\`\`\`

**Wykształcenie i specjalizacja:**
\`\`\`
Specjalizacja z chorób wewnętrznych | Collegium Medicum UJ | 2020
Lekarz medycyny (dyplom) | Collegium Medicum UJ | 2014 | Wynik LEK: 79% (92. percentyl)
Staż podyplomowy | Szpital Uniwersytecki w Krakowie | 2014–2015
\`\`\`

**Doświadczenie kliniczne:**
\`\`\`
Specjalista chorób wewnętrznych | Oddział Kardiologiczny
Szpital Specjalistyczny im. Jana Pawła II | Kraków | 10.2020 – obecnie

Procedury: Interpretacja EKG (500+/rok), holter EKG/BP, próba wysiłkowa (pod nadzorem)
Zarządzanie: 8–10 pacjentów/dobę na oddziale 30-łóżkowym
Dydaktyka: Prowadzenie zajęć dla studentów VI roku CM UJ (2022–2024)
\`\`\`

**Procedury i certyfikaty:**
\`\`\`
Certyfikowane procedury: Echokardiografia przezklatkowa (ECHO TTE, certyfikat PTK 2021)
Szkolenia: Zaawansowane techniki żywienia klinicznego (POLSPEN 2022)
Kursy: BLS/ALS (European Resuscitation Council, 2023 — ważny do 2025)
\`\`\`

### Wskazówka eksperta

> **W CV medycznym liczą się procedury, nie "doświadczenie ogólne".** Ordynator zatrudniając lekarza chce wiedzieć: ile i jakich procedur samodzielnie wykonałeś, w jakich warunkach klinicznych pracowałeś, i jakie jest Twoje podejście do trudnych przypadków. "5-letni staż w szpitalu" to za mało — "5 lat, 200 appendektomii laparoskopowych samodzielnie, 15% powikłań poniżej średniej krajowej" — to jest język ordynatora.`,
  },

  {
    slug: 'cv-logistyka',
    title: 'CV logistyk: wzory i przykłady dla branży logistycznej 2026',
    description: 'CV logistyk i spedytor — wzory i przykłady dla specjalistów logistyki i łańcucha dostaw. Jak napisać CV logistyczne, które wyróżni Cię na polskim rynku pracy w 2026.',
    category: 'CV według Branży',
    tags: [
      'cv logistyk',
      'cv spedytor',
      'cv supply chain',
      'cv magazynier',
      'cv logistyka polska',
      'wzór cv logistyk',
      'cv kierownik magazynu',
      'cv specjalista ds logistyki',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV logistyk i spedytor — wzory i przykłady 2026',
    featured: false,
    faq: [
      { question: 'Jakie oprogramowanie logistyczne wpisywać do CV?', answer: 'Systemy WMS (Warehouse Management): SAP WM/EWM, Manhattan Associates, HighJump, infor WMS. TMS (Transport Management): SAP TM, Oracle TMS, Transplace. ERP: SAP MM/SD/PP, Oracle Supply Chain, Microsoft Dynamics. Narzędzia branżowe: Incoterms znajomość, cargo systemów (Cargowise), AEO certyfikat jeśli posiadasz.' },
      { question: 'Jak opisać zarządzanie magazynem w CV?', answer: 'Podaj metryki: m² magazynu, liczba SKU, wolumen operacyjny (zamówień/dzień), liczba pracowników (jeśli zarządzałeś), dokładność inwentaryzacji (%), wskaźnik błędów kompletacji (%), koszty operacyjne i osiągnięte oszczędności. Przykład: "Zarządzałem magazynem 8000m², 45 000 SKU, 1200 zamówień/dzień, zespół 35 osób."' },
      { question: 'Co to są Incoterms i czy wpisywać do CV?', answer: 'Incoterms (International Commercial Terms) to standardy reguł handlu międzynarodowego. Dla logistyka handlu zagranicznego — znajomość Incoterms 2020 jest obowiązkowa. Wpisz: "Biegła znajomość Incoterms 2020 (EXW, FCA, FOB, CIF, DAP, DDP)". Dla logistyki krajowej — mniej istotne.' },
      { question: 'Jakie certyfikaty wzmacniają CV logistyczne?', answer: 'Certyfikaty branżowe: APICS CPIM (Certified in Planning and Inventory Management), APICS CSCP (Supply Chain Professional), CILT (Chartered Institute of Logistics and Transport), certyfikat AEO (Authorised Economic Operator — dla celnych), licencja spedytora, certyfikat ADR (materiały niebezpieczne).' },
    ],
    body: `## CV logistyk i spedytor — jak napisać CV w branży łańcucha dostaw

Logistyka to branża metryczna — każdy proces ma swój KPI. Twoje CV powinno odzwierciedlać tę kulturę: liczby, wskaźniki, osiągnięcia mierzone w tonach, m², złotówkach i procentach.

### Kluczowe elementy CV logistycznego

**Podsumowanie:**
*"Kierownik Działu Logistyki z 10-letnim doświadczeniem w e-commerce i FMCG. Zarządzam siecią 3 magazynów (łącznie 25 000 m²) i floty 15 pojazdów. Zoptymalizowałem procesy magazynowe, redukując koszt kompletacji o 18% i zwiększając dokładność inwentaryzacji z 96.2% do 99.4%."*

**Tech stack logistyczny:**
\`\`\`
WMS/TMS:     SAP WM/EWM, HighJump WMS, Transplace TMS
ERP:         SAP MM/SD, Oracle Supply Chain
Analityka:   Excel (zaawansowany), Power BI, SAP Analytics
Certyfikaty: APICS CPIM (2022), AEO (2020), ADR klasy 1–9
Incoterms:   Biegła znajomość Incoterms 2020
\`\`\`

**Doświadczenie z KPI:**
\`\`\`
Kierownik Magazynu | E-commerce Polska S.A. | 01.2019 – obecnie

• Zarządzam magazynem 12 000 m², 65 000 SKU, 2500 zamówień/dzień (peak: 6000)
• Poprawiłem dokładność kompletacji z 97.2% do 99.6% przez wdrożenie pick-by-light
• Zredukowałem koszt na zamówienie o 22% przez reorganizację slottingu magazynowego
• Zarządzam zespołem 55 pracowników (3 zmiany) + 10 pracowników agencji w peak season
• Koordynuję outbound transport (12 firm przewozowych, 800+ przesyłek/dzień)
\`\`\`

### Wskazówka eksperta

> **W logistyce liczą się wskaźniki terminowości, dokładności i kosztu.** OTIF (On-Time-In-Full delivery rate), fill rate, inventory accuracy, order lead time, cost per order — to język, którym mówi hiring manager w logistyce. Kandydat, który mówi "95% OTIF przez 2 lata" jest konkretny i wiarygodny. Kandydat, który mówi "zarządzałem dostawami" — nie.`,
  },

  {
    slug: 'cv-gastronomia',
    title: 'CV kucharz i kelner: wzory dla gastronomii i hotelarstwa 2026',
    description: 'CV kucharz, kelner i pracownicy gastronomii — wzory i przykłady. Jak napisać CV do restauracji, hotelu i branży HoReCa. Kluczowe elementy CV gastronomicznego w Polsce.',
    category: 'CV według Branży',
    tags: [
      'cv kucharz',
      'cv kelner',
      'cv gastronomia',
      'cv hotelarz',
      'cv horeca',
      'wzór cv kucharz',
      'cv barman',
      'cv praca w restauracji',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'CV kucharz i kelner — wzory dla gastronomii 2026',
    featured: false,
    faq: [
      { question: 'Czy kucharz powinien mieć portfolio zdjęć dań?', answer: 'Tak — dla kucharzy aspirujących do prestiżowych restauracji, stanowisk sous chefa lub head chefa, portfolio zdjęć potraw jest standardem. Użyj Instagram/portfolio strony z fotografiami potraw. Dla zwykłych stanowisk kuchennych — nie jest wymagane, ale wyróżnia.' },
      { question: 'Jakie certyfikaty gastronomiczne wpisywać do CV?', answer: 'Sanepid (obowiązkowe dla kontaktu z żywnością w Polsce), HACCP (świadomość systemu bezpieczeństwa żywności — wymagane w wielu miejscach), Sommelier (dla obsługi wina), barista (dla kawy: SCA barista, specialty coffee), certyfikat kucharski (np. Akademia Kulinarna, Gordon Ramsay Academy), certyfikat cateringowy.' },
      { question: 'Jak opisać doświadczenie kelnera w CV?', answer: 'Podkreśl: typ lokalu (fine dining, bistro, hotel 5*, event catering), kuchnię (polska, włoska, fusion), obsługiwaną liczbę stołów/gości, znajomość win (sommelier, podstawy), języki (ważne dla turystycznych miejsc), specjalizacje (śniadania, banquety, room service), i jeśli masz — sprzedaż (upsell) wyniki.' },
      { question: 'Jak wyróżnić CV w gastronomii?', answer: 'Trzy wyróżniki: doświadczenie w prestiżowych lokalach (Michelin Guide, renomowane hotele 5*), konkretne liczby (obsługiwałem 180 gości podczas event, skróciłem czas serwisu o 15%), i dodatkowe umiejętności (praca z POS systemem, zarządzanie zamówieniami online, alergeny management, menu costing).' },
    ],
    body: `## CV kucharz i kelner — jak napisać CV dla branży gastronomicznej

Branża HoReCa (Hotels, Restaurants, Cafes) ma swoje specyficzne wymagania. Pracodawca poszukuje nie tylko umiejętności kulinarnych, ale też profesjonalizmu, elastyczności i umiejętności pracy pod presją. Twoje CV powinno to odzwierciedlać.

### Struktura CV dla kucharza

**Podsumowanie:**
*"Sous Chef z 8-letnim doświadczeniem w kuchni fine dining i kuchni polskiej fusion. Pracowałem w restauracjach z gwiazdką Michelin (Trójmiasto) i hotelu 5* w Zakopanem. Specjalizacja: kuchnia sezonowa, dania bezglutenowe/wegan, menu costing. Zarządzałem teamem 6 kucharzy i kontrolowałem food cost na poziomie poniżej 28%."*

**Umiejętności:**
\`\`\`
Kuchnie:          Polska, Śródziemnomorska, Fusion, Vegan/wegetariańska
Techniki:         Sous vide, fermentacja, gotowanie molekularne (podstawy), grillowanie
Certyfikaty:      Sanepid (ważny), HACCP (certyfikat 2023), kurs sommeliera (podstawy)
Systemy:          WINREST POS, Oracle Hospitality MICROS, Menu Engineering
Zarządzanie:      Menu costing, food waste reduction, zamówienia u dostawców
\`\`\`

**Doświadczenie z wynikami:**
\`\`\`
Sous Chef | Restauracja "Pod Złotą Różą" (70 miejsc) | Gdańsk | 03.2021 – obecnie

• Zarządzam zespołem 6 kucharzy (3 kucharze + 3 kucharze pomocniczy)
• Opracowałem menu sezonowe aktualizowane co kwartał — wzrost satysfakcji gości o 23%
• Obniżyłem food cost z 34% do 27% przez optymalizację zamówień i recipe costing
• Koordynuję catering eventowy (max 250 gości) bez przerwy w funkcjonowaniu restauracji
• Wdrożyłem system etykietowania alergenów — 0 incydentów przez 3 lata
\`\`\`

**Struktura CV kelnera:**
\`\`\`
Podsumowanie zawodowe:
*"Kelner z 5-letnim doświadczeniem w fine dining i hotelach 4*. Biegły w obsłudze gości angielskojęzycznych i obsłudze wina (kurs sommelierski, 2022). Znajomość POS systemu MICROS. Obsługiwałem imprezy do 200 gości jako Lead Waiter."*

Doświadczenie:
• Obsługuję sekcję 6 stolików (18–24 gości/serwis) w restauracji 120-osobowej
• Realizuję upsell napojów i desertów — średnio +18% do rachunku stołu
• Zarządzam stażystami (2 osoby) w sezonie letnim
• Bezproblemowa obsługa gości w języku angielskim i podstawowym niemieckim
\`\`\`

### Wskazówka eksperta

> **W gastronomii prestiż miejsca pracy mówi za Ciebie.** Rok w gwiazdkowej restauracji Michelin, hotelu 5* lub renomowanym cateringu eventowym jest wart 3 lata w przeciętnym lokalu. Jeśli masz doświadczenie w prestiżowym miejscu — wyeksponuj to na górze CV. Nazwy znanych restauracji, hoteli i szefów kuchni, z którymi pracowałeś, budują wiarygodność lepiej niż jakikolwiek opis stanowiska.`,
  },
];
