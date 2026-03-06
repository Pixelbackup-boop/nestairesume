/**
 * Polish blog — Part 4: Format CV i Sekcje
 * Topics: sekcje CV, długość, zdjęcie, PDF vs Word, czcionka, kolory, wykształcenie, języki, luki
 * Targeting: sekcje cv, zdjęcie w cv, format cv pdf
 */

export const TOPICS_PART4 = [
  // ── Topic 1 ──────────────────────────────────────────────────────────────
  {
    slug: 'sekcje-cv',
    title: 'Sekcje CV: co musi znaleźć się w Twoim CV 2026',
    description: 'Sekcje CV — które są obowiązkowe, które opcjonalne i w jakiej kolejności je umieszczać. Kompletny przewodnik po strukturze CV dla polskich kandydatów i wymaganiach ATS w 2026.',
    category: 'Format CV',
    tags: [
      'sekcje cv',
      'co musi być w cv',
      'struktura cv',
      'budowa cv',
      'cv sekcje obowiązkowe',
      'kolejność sekcji cv',
      'cv jak zbudować',
      'cv wzór sekcje',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'Sekcje CV — co obowiązkowo musi znaleźć się w Twoim CV 2026',
    featured: false,
    faq: [
      { question: 'Jakie sekcje są obowiązkowe w CV?', answer: 'Absolutnie obowiązkowe: dane kontaktowe (imię, email, telefon), podsumowanie zawodowe, doświadczenie zawodowe, wykształcenie, umiejętności. Opcjonalne ale wartościowe: języki obce, certyfikaty i kursy, projekty, wolontariat, zainteresowania (tylko jeśli zawodowo istotne).' },
      { question: 'W jakiej kolejności umieszczać sekcje CV?', answer: 'Standardowa kolejność: 1) Dane kontaktowe, 2) Podsumowanie zawodowe, 3) Doświadczenie zawodowe (najważniejsze — im wyżej, tym lepiej), 4) Wykształcenie, 5) Umiejętności, 6) Certyfikaty/kursy. Dla absolwentów bez doświadczenia: wykształcenie przed doświadczeniem.' },
      { question: 'Czy pisać "Zainteresowania" w CV?', answer: 'Tylko jeśli są relevantne dla stanowiska lub naprawdę wyjątkowe. "Podróże, sport, czytanie" — każdy to pisze i nic nie wnosi. "Organizacja konferencji technologicznych" lub "uczestnictwo w maratonach (10 ukończonych)" — to wnosi wartość i tworzy temat do rozmowy.' },
      { question: 'Czy dodawać zdjęcie w sekcji danych kontaktowych?', answer: 'W Polsce zdjęcie jest opcjonalne, ale powszechne. Dla korporacji i tradycyjnych branż — zdjęcie jest często oczekiwane. Dla firm startupowych i tech — rzadziej. Jeśli dołączasz, zdjęcie musi być profesjonalne (więcej w artykule o zdjęciu w CV).' },
    ],
    body: `## Sekcje CV — co obowiązkowo musi znaleźć się w Twoim curriculum vitae

Dobre CV to nie przypadkowa lista informacji — to przemyślana struktura, która prowadzi rekrutera przez Twoją karierę w sposób logiczny i przekonujący. Każda sekcja ma swój cel i swoje miejsce.

### Sekcje obowiązkowe — bez nich CV nie działa

**1. Dane kontaktowe (nagłówek)**

To pierwsze, co widzi rekruter. Musi być kompletne i aktualne:

\`\`\`
Jan Kowalski
jan.kowalski@email.pl | +48 600 123 456
Warszawa, Polska
LinkedIn: linkedin.com/in/jankowalski
GitHub: github.com/jankowalski (opcjonalnie dla IT)
Portfolio: jankowalski.dev (opcjonalnie)
\`\`\`

**Co wpisać:** Imię, email, telefon, miasto, LinkedIn.
**Czego NIE wpisywać:** Pełny adres zamieszkania (wystarczy miasto), wiek (chyba że wymagany), stan cywilny, PESEL.

**2. Podsumowanie zawodowe (Professional Summary)**

3–5 zdań na górze CV. Odpowiada na pytania: kim jesteś zawodowo, co osiągnąłeś i czego szukasz. To Twoja "elevator pitch" na papierze.

*Przykład dla Senior Developer:*
> "Full Stack Developer z 7-letnim doświadczeniem w React i Node.js, specjalizujący się w aplikacjach e-commerce obsługujących ponad 500K użytkowników. Moje ostatnie projekty skróciły czas ładowania aplikacji o 45% przy jednoczesnym wzroście konwersji o 22%. Szukam roli tech lead w środowisku produktowym, gdzie mogę mentorować junior developerów i wpływać na architekturę."

**3. Doświadczenie zawodowe**

Serce CV. Format każdego stanowiska:
\`\`\`
[Tytuł stanowiska] | [Nazwa firmy] | [Miasto] | [Daty: MM.RRRR – MM.RRRR]

• [Osiągnięcie z liczbą — np. "Zwiększyłem sprzedaż o 34% w Q4 2024"]
• [Kluczowy projekt lub odpowiedzialność]
• [Umiejętność lub technologia w działaniu]
\`\`\`

Zasady:
- Chronologicznie od najnowszego
- 3–5 bullet pointów na stanowisko
- Liczby i wyniki, nie same obowiązki
- Czasowniki aktywne: "zarządzałem", "wdrożyłem", "zwiększyłem", "stworzyłem"

**4. Wykształcenie**

\`\`\`
[Tytuł/Stopień] | [Uczelnia] | [Rok ukończenia]
[Kierunek studiów]
[Opcjonalnie: wyniki, projekty, wyróżnienia]
\`\`\`

Dla absolwentów: wykształcenie wyżej niż doświadczenie. Dla osób z 5+ lat doświadczenia: wykształcenie po doświadczeniu.

**5. Umiejętności**

Podzielone na kategorie:
\`\`\`
Techniczne: React, TypeScript, Node.js, PostgreSQL, Docker, AWS
Języki: Polski (natywny), Angielski (C1), Niemicki (B1)
Narzędzia: Jira, Figma, GitHub, Slack, Notion
\`\`\`

Nie pisz "Microsoft Office" — to zbyt podstawowe dla większości ról od 2020 roku.

### Sekcje opcjonalne — kiedy dodawać

**Certyfikaty i kursy**
Dodaj jeśli: certyfikaty są rozpoznawalne w branży (AWS, Google, PMP, CFA), kursy są relevantne i aktualne (ostatnie 2–3 lata).

Format:
\`\`\`
[Nazwa certyfikatu] | [Organizacja] | [Rok]
AWS Solutions Architect Associate | Amazon | 2024
\`\`\`

**Projekty**

Szczególnie ważne dla: IT (projekty open source, własne aplikacje), absolwentów (projekty akademickie), branż kreatywnych (portfolio).

\`\`\`
[Nazwa projektu] | [Link jeśli publiczny]
[1–2 zdania: co to jest, technologie, wyniki]
\`\`\`

**Wolontariat**

Dodaj jeśli pokazuje umiejętności relevantne dla roli lub wyjątkowe zaangażowanie:
- "Organizator Hackathonu Warsaw (200+ uczestników)"
- "Wolontariusz organizacji X — zarządzanie 15-osobowym zespołem"

**Zainteresowania**

Tylko jeśli są naprawdę wyjątkowe lub relevantne. "Muzyka, sport, podróże" — zostaw to dla siebie. "Prowadzę podcast o cyberbezpieczeństwie (2K słuchaczy)" — to robi wrażenie.

**Publikacje i wystąpienia**

Dla akademickich, naukowych i seniorsów branżowych. Artykuły na blogach branżowych, TED-style talks, konferencje.

### Sekcje do usunięcia

**"Cele zawodowe"** — przestarzałe, zastąpione podsumowaniem zawodowym
**"Oczekiwania finansowe"** — nie w CV, to temat na rozmowę
**"Data urodzenia i stan cywilny"** — zbędne i mogą prowadzić do dyskryminacji
**"Referencje: na żądanie"** — oczywiste, nie trać miejsca

### Jak priorytetyzować sekcje według doświadczenia

**Junior / Absolwent (0–2 lata):**
Dane → Podsumowanie → Projekty/Staże → Wykształcenie → Umiejętności → Certyfikaty

**Mid-level (2–7 lat):**
Dane → Podsumowanie → Doświadczenie → Umiejętności → Wykształcenie → Certyfikaty

**Senior / Menedżer (7+ lat):**
Dane → Podsumowanie → Doświadczenie → Umiejętności → Certyfikaty → Wykształcenie (na końcu)

### Wskazówka eksperta

> **ATS (Applicant Tracking System) nie lubi kreatywnych nazw sekcji.** Nazywaj sekcje standardowo: "Doświadczenie zawodowe" (nie "Moja historia"), "Wykształcenie" (nie "Edukacja i rozwój"), "Umiejętności" (nie "Co potrafię"). Systemy ATS skanują nagłówki sekcji — niestandardowe nazwy mogą sprawić, że Twoje CV zostanie błędnie zinterpretowane lub odrzucone przed dotarciem do rekrutera.`,
  },

  // ── Topic 2 ──────────────────────────────────────────────────────────────
  {
    slug: 'dlugosc-cv',
    title: 'Długość CV: ile stron powinno mieć CV? Zasady 2026',
    description: 'Ile stron powinno mieć CV? Zasady długości CV dla różnych poziomów doświadczenia — junior, mid i senior. Kiedy jedna strona CV wystarczy i kiedy dwie strony są uzasadnione.',
    category: 'Format CV',
    tags: [
      'długość cv',
      'ile stron powinno mieć cv',
      'cv jedna strona',
      'cv dwie strony',
      'jak długie cv',
      'cv długość zasady',
      'cv zbyt długie',
      'cv skrócić',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'Długość CV — ile stron powinno mieć CV w Polsce 2026',
    featured: false,
    faq: [
      { question: 'Czy CV może mieć 2 strony?', answer: 'Tak, dla osób z ponad 7–10 latami doświadczenia. Dwie strony są uzasadnione gdy masz bogate doświadczenie relevantne dla roli, liczne certyfikaty lub publikacje, lub gdy wymagania stanowiska są obszerne. Dla juniorów i mid-level — staraj się zmieścić na jednej stronie.' },
      { question: 'Czy jedna strona CV jest zawsze lepsza?', answer: 'Niekoniecznie. Zbyt krótkie CV dla doświadczonego kandydata może wyglądać na "puste". Zbyt długie — jest ignorowane. Zasada Goldilocks: tyle stron, ile potrzeba żeby przekazać wartość — nie więcej, nie mniej. Senior z 15 latami doświadczenia na jednej stronie będzie wyglądał podejrzanie skromnie.' },
      { question: 'Jak skrócić CV do jednej strony?', answer: 'Techniki skracania: usuń zainteresowania i hobby (nieistotne), skróć opisy stanowisk do 3 bullets, usuń doświadczenie sprzed 10+ lat (przestarzałe), skróć podsumowanie do 2–3 zdań, zmniejsz marginesy (minimum 1,5 cm), zmniejsz czcionkę do 10pt (Arial/Calibri), usuń "Referencje na żądanie".' },
      { question: 'Czy CV akademickie (naukowe) ma inne zasady długości?', answer: 'Tak. CV akademickie (curricula vitae naukowe) może być znacznie dłuższe — 3–10 stron to norma. Zawierają publikacje, granty, konferencje, projekty badawcze. To inny dokument niż CV zawodowe — nie stosują się te same zasady zwięzłości.' },
    ],
    body: `## Ile stron powinno mieć CV — zasady i wyjątki

Pytanie "ile stron powinno mieć CV?" nie ma jednej odpowiedzi — zależy od poziomu doświadczenia, branży i stanowiska. Ale istnieje kilka solidnych zasad, które pomogą Ci podjąć właściwą decyzję.

### Podstawowe zasady długości CV

**Jedna strona — dla kogo:**
- Absolwenci i osoby z 0–3 latami doświadczenia
- Career-changers (zmiana branży) — podkreślasz transferowalne umiejętności, nie historię
- Stanowiska operacyjne niższego szczebla
- Gdy ogłoszenie wyraźnie prosi o "krótkie CV" lub "one-page resume"

**Dwie strony — dla kogo:**
- Specjaliści z 5–15 latami doświadczenia
- Menedżerowie z wieloma relevantnymi projektami
- Osoby z wieloma certyfikatami i kursami
- IT — gdy masz rozbudowane portfolio techniczne

**Więcej niż dwie strony — rzadko uzasadnione:**
- Akademicy, naukowcy (CV naukowe = osobny format)
- Medycyna — rezydenci z długą listą rotacji i publikacji
- Konsultanci z dziesiątkami projektów (Executive CV)
- Gdy wyraźnie wymagane przez ofertę

**Czego NIGDY:** CV na 2,5 strony — to najgorszy wariant. Skróć do 2 lub rozbuduj do 3 (ale tylko gdy masz naprawdę dużo do powiedzenia). "Sierota" — jedna samotna linijka na drugiej stronie — usuń przez skrócenie lub przeredagowanie.

### Jak mierzyć "długość" CV

Długość CV to nie tylko liczba stron — to ilość wartościowej informacji. Dwa testy:

**Test rekrutera 6 sekund:**
Rekruterzy poświęcają pierwsze CV średnio 6–7 sekund. Czy w 6 sekund widać Twoje największe osiągnięcia? Jeśli kluczowe informacje są "zakopane" na drugiej stronie — CV jest za długie.

**Test "czy to jest istotne":**
Przejrzyj każde zdanie i zapytaj: "Czy to jest istotne dla stanowiska, na które aplikuję?" Jeśli odpowiedź to "nie" lub "może" — usuń.

### Techniki skracania CV (gdy za długie)

**Techniczne:**
- Zmniejsz marginesy do 1,5 cm (minimum — nie mniej)
- Zmniejsz czcionkę do 10pt (nie mniej — nieczytelne)
- Zmniejsz interlinię do 1,0–1,15 (zamiast 1,5)
- Używaj dwukolumnowego układu dla umiejętności (oszczędza miejsce)

**Treściowe:**
- Ogranicz każde stanowisko do 3–4 bullets (nie 8–10)
- Usuń najstarsze doświadczenie (sprzed 10+ lat)
- Skróć podsumowanie do 2–3 zdań
- Usuń oczywistości ("obsługa Microsoft Office")
- Usuń sekcje "Zainteresowania" i "Referencje na żądanie"
- Skróć nazwy firm i tytuły — używaj powszechnie znanych skrótów

**Strategiczne:**
- Dostosuj CV do roli — usuń nieistotne doświadczenie
- Połącz podobne stanowiska w jednej firmie (jeśli były awansem)
- Sekcję "Umiejętności" skonsoliduj w jednej linii, nie w listach

### Techniki rozbudowywania CV (gdy za krótkie)

Krótkie CV nie zawsze jest lepsze — pustka nie robi dobrego wrażenia.

- Opisz projekty z poprzednich ról bardziej szczegółowo (z kontekstem i wynikami)
- Dodaj sekcję projektów lub portfolio
- Rozbuduj podsumowanie zawodowe
- Dodaj certyfikaty i kursy (ze szczegółowymi opisami co obejmowały)
- Opisz wolontariat i aktywności branżowe
- Dodaj publikacje, wystąpienia lub artykuły branżowe

### Branżowe standardy długości

| Branża | Standardowa długość |
|--------|---------------------|
| IT / Tech | 1–2 strony |
| Finance / Banking | 1–2 strony |
| Marketing | 1–2 strony |
| Prawo | 1–3 strony |
| Medycyna (kliniczna) | 2–3 strony |
| Nauka / Akademia | 3–10+ stron |
| Handel / Retail | 1 strona |
| Produkcja | 1–2 strony |
| Zarządzanie / C-suite | 2–3 strony |

### Wskazówka eksperta

> **Zamiast liczyć strony, testuj czytelność.** Wydrukuj CV i popatrz na nie z odległości 1 metra. Czy widać wyraźne sekcje? Czy tekst nie zlewa się? Czy nagłówek sekcji jest łatwy do znalezienia? Jeśli CV wygląda "zbite" i trudne do skanowania — jest za długie (lub za gęste). Dobra czytelność jest ważniejsza niż arbitralna liczba stron.`,
  },

  // ── Topic 3 ──────────────────────────────────────────────────────────────
  {
    slug: 'zdjecie-w-cv',
    title: 'Zdjęcie w CV: kiedy dodawać i jak wybrać właściwe 2026',
    description: 'Zdjęcie w CV w Polsce — kiedy jest oczekiwane, kiedy można pominąć i jak wybrać profesjonalne zdjęcie. Zasady dotyczące zdjęcia w CV dla różnych branż i typów pracodawców.',
    category: 'Format CV',
    tags: [
      'zdjęcie w cv',
      'czy dodawać zdjęcie do cv',
      'zdjęcie cv polska',
      'profesjonalne zdjęcie cv',
      'cv ze zdjęciem',
      'cv bez zdjęcia',
      'jakie zdjęcie do cv',
      'zdjęcie profilowe cv',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'Zdjęcie w CV — kiedy dodawać i jak wybrać właściwe zdjęcie 2026',
    featured: false,
    faq: [
      { question: 'Czy dodawać zdjęcie do CV w Polsce?', answer: 'W Polsce zdjęcie jest kulturowo oczekiwane, choć formalnie opcjonalne. Dla tradycyjnych branż (bankowość, prawo, ubezpieczenia, edukacja) — zazwyczaj tak. Dla IT i startupów — coraz rzadziej wymagane. Dla firm zagranicznych w Polsce — sprawdź ich standard. Decyzja: jeśli masz dobre, profesjonalne zdjęcie — dołącz. Jeśli nie masz — lepiej bez.' },
      { question: 'Jakiego zdjęcia używać w CV?', answer: 'Zdjęcie profilowe: twarz + górna część ciała (do ramion/klatki), jednolite jasne tło, neutralny wyraz twarzy z naturalnym uśmiechem, profesjonalny strój odpowiedni do branży, dobre oświetlenie (bez cieni na twarzy). Rozmiar: zazwyczaj 3x4 cm w CV lub okrągłe 2x2 cm.' },
      { question: 'Czy selfie do CV jest OK?', answer: 'Nie. Selfie robi złe wrażenie z kilku powodów: często słabe oświetlenie, nieodpowiednie tło, zły kąt kamery, nieuczciwe dla siebie. Zainwestuj w sesję zdjęciową (100–300 PLN) lub poproś kogoś o zdjęcie na zewnątrz w dobrym świetle — dobre oświetlenie dzienne przed białą ścianą daje profesjonalny efekt.' },
      { question: 'Jakie błędy popełniają Polacy ze zdjęciem w CV?', answer: 'Najczęstsze błędy: zdjęcie grupowe/wykadrowane (widać ramię innej osoby), zdjęcie z wakacji lub imprezy, selfie, stare zdjęcie (10+ lat różnicy), zbyt ciemne lub prześwietlone, nieodpowiedni strój (plażowy, imprezowy), mocny makijaż lub za brak expressi, zbyt małe lub za duże zdjęcie w CV.' },
    ],
    body: `## Zdjęcie w CV — kompletny przewodnik dla polskich kandydatów

Decyzja o zdjęciu w CV jest w Polsce bardziej skomplikowana niż w USA czy UK, gdzie standardem jest brak zdjęcia. Polskie normy rekrutacyjne są inne — w wielu branżach zdjęcie jest nadal oczekiwane i jego brak może być zauważony.

### Dlaczego zdjęcie w CV jest kontrowersyjne

**Argument za:**
- Humanizuje kandydata — rekruterzy "widzą" osobę, nie CV
- Jest kulturowo oczekiwane w wielu polskich firmach
- Przy równych kandydatach może być czynnikiem wyróżniającym (jeśli profesjonalne)

**Argument przeciw:**
- Potencjalna dyskryminacja — z wiekiem, płcią, wyglądem (choć nielegalna, istnieje)
- Dla firm zagranicznych i startupów — anachroniczne
- ATS może mieć problem z przetwarzaniem zdjęć w CV

### Kiedy dodać zdjęcie — kiedy pominąć

**Dodaj zdjęcie gdy:**
- Aplikujesz do tradycyjnych polskich firm (bankowość, prawo, ubezpieczenia, edukacja, media)
- Ogłoszenie wyraźnie prosi o zdjęcie
- Rola wymaga wizerunku (sprzedaż, obsługa klienta, przedstawiciel handlowy, media)
- Masz bardzo profesjonalne, atrakcyjne zdjęcie

**Pomiń zdjęcie gdy:**
- Aplikujesz do firm zagranicznych lub korporacji z zachodnim podejściem
- Aplikujesz przez systemy ATS (często zdjęcia "gubią się")
- Nie masz profesjonalnego zdjęcia (lepiej bez niż nieprofesjonalne)
- Rola jest techniczna (IT, data science, inżynieria) — liczy się kod
- Firma ma świadomą politykę blind recruitment

### Jak wykonać idealne zdjęcie do CV

**Opcja 1: Profesjonalny fotograf (100–300 PLN)**
Najlepszy wybór dla osób szukających pracy na wyższe stanowiska lub gdy chcesz pewności jakości. Sesje "headshot" to specjalność wielu fotografów. Efekt: jedno profesjonalne zdjęcie może służyć przez 3–5 lat (na CV, LinkedIn, stronie firmowej).

**Opcja 2: Dobre zdjęcie smartfonem (bezpłatnie)**
Z nowoczesnymi smartfonami możliwe jest zdjęcie na profesjonalnym poziomie:
- Wyjdź na zewnątrz w pochmurny dzień (miękkie, równomierne oświetlenie)
- Ustaw się przed jasną ścianą lub z zielonym tłem
- Kamera na poziomie twarzy (nie z dołu — podwójny podbródek)
- Tryb portretowy dla rozmytego tła
- Poproś kogoś o wykonanie zdjęcia — selfie nie sprawdza się

**Opcja 3: Uaktualnij stare zdjęcie LinkedIn**
Jeśli masz profesjonalne zdjęcie na LinkedIn, możesz je użyć w CV (jeśli jest aktualne i dobrej jakości).

### Techniczne wymagania zdjęcia w CV

**Rozmiar w pliku:**
- Zdjęcie wbudowane w CV (nie jako osobny plik)
- Rozmiar na stronie: 3x4 cm lub 2x3 cm (proporcje paszportowe)
- Niektóre kreatory CV używają okrągłych zdjęć — oba są OK

**Jakość pliku:**
- Minimum 300 DPI dla druku
- Plik CV z wbudowanym zdjęciem: nie większy niż 3–5 MB

**Formaty pliku:**
- CV jako PDF z wbudowanym zdjęciem — najlepiej
- Nie wysyłaj zdjęcia osobno jako JPG — jest nieczytelne dla ATS

### Co pokazuje złe zdjęcie o kandydacie

Kiedy rekruter widzi nieodpowiednie zdjęcie, myśli:
- "Ta osoba nie dba o szczegóły" (złe zdjęcie)
- "Brak profesjonalizmu" (zdjęcie imprezowe)
- "Nie rozumie norm branżowych" (T-shirt do roli w bankowości)

Nieodpowiednie zdjęcie jest gorsze niż brak zdjęcia. Jeśli masz wątpliwości — zostaw miejsce na zdjęcie puste.

### Wskazówka eksperta

> **Twoje zdjęcie profilowe na LinkedIn powinno być tym samym, co w CV — buduje to spójność wizerunku.** Rekruter po przeczytaniu CV zazwyczaj sprawdza LinkedIn — jeśli zdjęcia są zupełnie inne (starsze lub nieodpasowane), wzbudza to pytania. Zainwestuj w jedno dobre zdjęcie i używaj go konsekwentnie: CV, LinkedIn, strona firmowa, konferencja. To Twoja marka osobista.`,
  },

  // ── Topic 4 ──────────────────────────────────────────────────────────────
  {
    slug: 'format-pdf-cv',
    title: 'PDF czy Word: w jakim formacie wysyłać CV? Porównanie 2026',
    description: 'PDF czy Word do CV — który format wybrać przy wysyłaniu aplikacji? Porównanie zalet i wad, kiedy używać PDF, kiedy DOCX i jak ATS przetwarza każdy format.',
    category: 'Format CV',
    tags: [
      'format cv pdf',
      'cv pdf czy word',
      'cv format pliku',
      'wysyłanie cv format',
      'cv docx czy pdf',
      'ats format cv',
      'cv plik format',
      'jak wysłać cv',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'PDF czy Word — w jakim formacie wysyłać CV 2026',
    featured: false,
    faq: [
      { question: 'Wysłać CV jako PDF czy Word?', answer: 'PDF jest zdecydowanie lepszy dla większości przypadków. PDF zachowuje formatowanie na każdym urządzeniu, jest bezpieczniejszy (trudniej edytować bez Twojej wiedzy) i wygląda profesjonalnie. Word (DOCX) tylko gdy ogłoszenie wyraźnie o to prosi lub gdy firma używa ATS, który lepiej parsuje Word.' },
      { question: 'Czy ATS lepiej przetwarza PDF czy Word?', answer: 'To mit, że Word jest zawsze lepszy dla ATS. Nowoczesne systemy ATS (Workday, Greenhouse, Lever, Taleo) dobrze radzą sobie z PDF. Problem pojawia się przy PDF skomplikowanym graficznie (tabele, kolumny, grafiki). Prosty, jednokolumnowy PDF jest bardziej ATS-friendly niż Word z ozdobnym formatowaniem.' },
      { question: 'Jak nazwać plik CV?', answer: 'Format: Imię_Nazwisko_CV.pdf lub CV_Imię_Nazwisko.pdf. Przykłady: Jan_Kowalski_CV.pdf, CV_Anna_Nowak.pdf. Unikaj: "CV.pdf" (rekruter ma 200 takich plików), "moje_cv.pdf", "cv_final_final2_nowy.pdf". Dobra nazwa pliku to element profesjonalizmu.' },
      { question: 'Co jeśli strona wymaga konkretnego formatu?', answer: 'Zawsze stosuj się do wymagań. Jeśli platforma mówi "tylko PDF" — wyślij PDF. Jeśli "tylko Word" — DOCX. Jeśli nie podano — PDF. Jeśli formularz online — często kopiujesz treść bezpośrednio (ATS i tak parsuje, plik jest backup).' },
    ],
    body: `## PDF czy Word — który format CV wybrać i dlaczego

Format pliku CV to jedna z tych decyzji, które wydają się małe, a mogą mieć znaczący wpływ. Zły format może sprawić, że Twoje starannie sformatowane CV wyświetli się jako spaghetti tekstu na komputerze rekrutera — lub w ogóle nie zostanie przetworzone przez ATS.

### Dlaczego PDF jest standardem

**Zachowanie formatowania**
PDF to "zamrożony" wygląd dokumentu. Niezależnie od tego, czy rekruter otwiera go na Macu, Windows, w Chrome, Adobe Reader czy Foxit — wygląda identycznie. Word (.docx) może wyświetlać się inaczej zależnie od wersji pakietu Office i ustawień systemowych.

**Bezpieczeństwo**
PDF jest trudniejszy do przypadkowej edycji. Twoje starannie przygotowane CV nie zostanie przypadkowo zmienione.

**Profesjonalny wygląd**
PDF sygnalizuje, że zadbałeś o wizualną prezentację — to element profesjonalizmu.

**Obsługa przez ATS**
Nowoczesne systemy ATS (Greenhouse, Workday, Lever, Taleo, SmartRecruiters) doskonale parsują PDF. Mit, że "Word jest lepszy dla ATS" pochodzi z wczesnych lat ATS — dziś jest nieaktualny dla prostych, jednokolumnowych PDF.

### Kiedy Word (DOCX) jest lepszy

Istnieją sytuacje, gdy Word jest właściwym wyborem:

**Wyraźna prośba w ogłoszeniu**
"Prosimy o CV w formacie Word" — stosuj się. Firmy mają powody (wewnętrzne systemy, formatowanie dla agencji).

**Agencje rekrutacyjne**
Agencje często proszą o Word, bo chcą edytować CV (usunąć dane kontaktowe przed wysłaniem do klienta, dodać logo agencji). W tym przypadku DOCX jest standardem.

**Bardzo stare systemy ATS**
Niektóre korporacje używają starych systemów ATS sprzed 2015 roku, które mają problemy z PDF. Jeśli aplikujesz przez stary portal korporacyjny z interfejsem z lat 2000 — Word może być bezpieczniejszy.

**CV wymagające edycji przez klienta**
Consulting, gdzie klient może chcieć dostosować CV do pitch.

### Jak przygotować ATS-friendly PDF

Nie wszystkie PDF są równe dla ATS. Problem pojawia się gdy:

**Problematyczne dla ATS:**
- PDF stworzony ze skanowania (obraz, nie tekst) — ATS nie może odczytać
- PDF z wieloma kolumnami (ATS czyta kolumny jako jedną linię)
- PDF z grafikami, ikonami, wykresami w tekście
- PDF z niestandardowymi czcionkami (mogą nie być osadzone)
- PDF z tabelami jako główna struktura

**ATS-friendly PDF:**
- Tekst jest prawdziwym tekstem (możesz zaznaczyć i skopiować)
- Jednokolumnowy układ lub prosta dwukolumnowa sekcja umiejętności
- Standardowe czcionki (Arial, Calibri, Times New Roman, Garamond)
- Brak grafik w środku tekstu (zdjęcie w rogu jest OK)
- Sekcje z jasno oznaczonymi nagłówkami

**Test ATS-friendliness:**
Otwórz PDF, zaznacz cały tekst (Ctrl+A) i skopiuj do Notatnika. Jeśli tekst jest czytelny i w logicznej kolejności — ATS poradzi sobie. Jeśli jest chaotyczny — CV może mieć problemy.

### Jak eksportować z kreatorów CV

**Microsoft Word → PDF:**
Plik → Zapisz jako → Format: PDF (nie "drukuj do PDF" — to gorsza jakość)

**Google Docs → PDF:**
Plik → Pobierz → PDF Document

**Canva → PDF:**
Udostępnij → Pobierz → Format PDF → Print lub Screen quality

**Kreator CV online (nasza platforma):**
Automatyczny export do ATS-friendly PDF z zachowaniem formatowania

### Nazewnictwo pliku — częsty błąd

Rekruter otwiera CV i widzi nazwę pliku w przeglądarkę:

**Złe:**
- \`cv.pdf\` (które z 200 CV jest "to" CV?)
- \`moje_cv_nowy.pdf\` (wygląda nieprofesjonalnie)
- \`CV_v3_final_WYSŁANE.pdf\` (widać wewnętrzne notatki)
- \`cv2022.pdf\` (przestarzałe)

**Dobre:**
- \`Jan_Kowalski_CV.pdf\`
- \`CV_Anna_Nowak_Marketing.pdf\`
- \`Kowalski_Jan_Senior_Developer_CV.pdf\`

### Wskazówka eksperta

> **Zachowaj dwie wersje CV: PDF do wysyłki i DOCX jako backup.** PDF używasz normalnie. DOCX masz przygotowany na wypadek, gdy firma poprosi o edytowalny format lub gdy agencja rekrutacyjna o to poprosi. Możesz łatwo eksportować z Word do PDF, ale nie zawsze odwrotnie — więc zachowaj oryginał w DOCX.`,
  },

  // ── Topic 5 ──────────────────────────────────────────────────────────────
  {
    slug: 'jezyki-w-cv',
    title: 'Języki obce w CV: jak opisać poziom znajomości 2026',
    description: 'Języki obce w CV — jak profesjonalnie opisać znajomość języków, jakich skali używać i kiedy weryfikować poziom certyfikatem. Skale CEFR, jak uniknąć przekłamania i co wpisać.',
    category: 'Format CV',
    tags: [
      'języki w cv',
      'znajomość języków cv',
      'angielski w cv poziom',
      'cefr w cv',
      'jak opisać języki w cv',
      'biegły język angielski cv',
      'języki obce cv przykład',
      'certyfikat językowy cv',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'Języki obce w CV — jak opisać poziom znajomości języków 2026',
    featured: false,
    faq: [
      { question: 'Jak opisać poziom angielskiego w CV?', answer: 'Używaj skali CEFR (A1–C2): A1–A2 to podstawowy, B1–B2 komunikatywny/średniozaawansowany, C1–C2 zaawansowany/biegły. Możesz też używać opisów: "podstawowy", "komunikatywny", "biegły", "native". Najlepsza praktyka: podaj zarówno CEFR jak i opis, np. "Angielski — C1 (zaawansowany)".' },
      { question: 'Czy wpisywać angielski w CV jeśli jest na poziomie A2?', answer: 'Jeśli angielski nie będzie używany w pracy — można pominąć lub wpisać "podstawowy" bez oczekiwań. Jeśli rola wymaga angielskiego — bądź szczery z poziomem. Przekłamanie jest gorsze niż niski poziom — zostaniesz zdemaskowany na rozmowie lub w pierwszym tygodniu pracy.' },
      { question: 'Czy certyfikat językowy jest potrzebny do CV?', answer: 'Certyfikat jest bardzo wartościowy jeśli: rola wyraźnie wymaga angielskiego (np. "fluent English required"), firma jest zagraniczna, pracujesz w branży, gdzie certyfikat jest standardem (tłumaczenia, nauczanie, korporacje). Dla większości ról IT i tech — certyfikat nie jest wymagany, wystarczy praktyczne użycie.' },
      { question: 'Jak opisać języki inne niż angielski?', answer: 'Tak samo jak angielski — z poziomem CEFR lub opisem. Język ojczysty: "Polski — język ojczysty" lub "native". Jeśli znasz rzadki język (chiński, japoński, arabski) — to silny atut, szczególnie dla firm działających na tych rynkach.' },
    ],
    body: `## Języki obce w CV — jak profesjonalnie opisać znajomość języków

Sekcja "Języki" w CV wydaje się prosta, ale jest źródłem wielu błędów. Zawyżony poziom angielskiego kończy się niezręcznymi sytuacjami na rozmowie. Niedokładny opis sprawia, że tracisz szansę. Właściwe opisanie języków to konkretna umiejętność.

### Skala CEFR — europejski standard poziomów językowych

Europejskie Ramy Kompetencji Językowych (CEFR) to standard używany w Polsce i całej Europie:

| Poziom | Opis | Przykłady |
|--------|------|-----------|
| A1 | Podstawowy | Proste zwroty, podstawowe pytania |
| A2 | Elementarny | Proste zdania, codzienne tematy |
| B1 | Komunikatywny | Samodzielna komunikacja, praca w zakresie |
| B2 | Średniozaawansowany | Swobodna komunikacja, czytanie literatury |
| C1 | Zaawansowany | Płynne wyrażanie się, rozumienie subtelności |
| C2 | Biegły/Mastery | Poziom native-like, pełne rozumienie niuansów |

### Jak prawidłowo zapisać języki w CV

**Najlepsza praktyka — z CEFR i opisem:**
\`\`\`
Języki:
• Polski — język ojczysty
• Angielski — C1 (zaawansowany)
• Niemicki — B1 (komunikatywny)
• Francuski — A2 (podstawowy)
\`\`\`

**Alternatywny format z certyfikatem:**
\`\`\`
Języki:
• Angielski — C1 IELTS 7.5 (2023)
• Niemicki — B2 Goethe Zertifikat (2022)
\`\`\`

**Uproszczony format (gdy mało miejsca):**
\`\`\`
Angielski (C1), Niemiecki (B1), Francuski (A2)
\`\`\`

### Opisy nieformalne — co naprawdę znaczą

Polscy kandydaci używają opisu "biegły angielski" niemal na każdym poziomie. Oto realny słownik:

**"Biegły" (fluent)** = C1–C2: Możesz prowadzić skomplikowane negocjacje biznesowe, rozumieć żarty i idiomy, pisać raporty bez pomocy native speakera.

**"Zaawansowany"** = B2–C1: Swobodna komunikacja na tematy zawodowe, pisanie emaili bez słownika, rozumienie spotkań.

**"Komunikatywny"** = B1–B2: Radzisz sobie w codziennych sytuacjach zawodowych, ale złożone tematy wymagają wysiłku.

**"Podstawowy"** = A1–A2: Proste pytania i odpowiedzi, ale nie rozmawiasz na tematy zawodowe.

**Najczęstszy błąd:** Wpisywanie "biegły" gdy poziom to B2. Rekruter to sprawdzi na rozmowie — po angielsku.

### Kiedy certyfikat językowy wzmacnia CV

Certyfikaty są wartościowe gdy:

**Angielski:**
- IELTS (7.0+ = C1), TOEFL iBT (100+)
- Cambridge FCE/CAE/CPE
- Certyfikat językowy z uczelni (ocena z egzaminu)

**Niemicki:**
- Goethe Zertifikat (B1–C2)
- TestDaF (dla pracy/nauki w Niemczech)

**Inne:**
- DELF/DALF (francuski), DELE (hiszpański), JLPT (japoński), HSK (chiński)

Certyfikat jest szczególnie ważny gdy: rola wymaga certyfikowanego poziomu (nauczyciel, tłumacz), aplikujesz za granicę, rola kontraktuje z zagranicznymi klientami.

### Języki, których nie wpisywać

**Języki programowania w sekcji "Języki"**
Python, Java, SQL — to nie są języki w sensie językowym. Wpisz je w sekcję "Umiejętności techniczne", nie "Języki".

**Języki na poziomie A1 bez relevancji**
Jeśli uczyłeś się włoskiego przez rok w szkole i "pamiętasz trochę słówek" — nie wpisuj. Tylko jeśli naprawdę mógłbyś się porozumieć.

**Martwe lub akademickie języki**
Łacina lub greka starogrecka — wpisz tylko jeśli relevantne (np. filologia, medycyna, prawo).

### Jak poprawić poziom językowy przed aplikowaniem

Jeśli Twój angielski jest poniżej B2 a rola tego wymaga:
- **Duolingo + Anki** — codzienne 20 minut przez 3–6 miesięcy (B1→B2)
- **Netflix z angielskimi napisami** — pasywne słuchanie
- **HelloTalk / Tandem** — rozmowy z native speakers
- **Business English course** — specyficzne dla pracy w danej branży
- **Immersion** — zmień interfejs telefonu i komputera na angielski

### Wskazówka eksperta

> **Bądź szczery z poziomem języka — konsekwencje kłamstwa są gorsze niż niski poziom.** Coraz więcej firm prowadzi rozmowy kwalifikacyjne (przynajmniej jeden etap) po angielsku, żeby zweryfikować poziom. Wpisanie "biegły" gdy jest B1 kończy się niezręczną rozmową z rekruterem, który cofa ofertę lub — gorzej — stawia Cię w sytuacji, gdzie w pierwszym tygodniu pracy nie rozumiesz połowy spotkań.`,
  },

  // ── Topic 6 ──────────────────────────────────────────────────────────────
  {
    slug: 'luki-w-cv',
    title: 'Luki w CV: jak wytłumaczyć przerwy w zatrudnieniu 2026',
    description: 'Luki w CV — jak wytłumaczyć przerwy w zatrudnieniu i przekuć je w atut. Przerwa macierzyńska, choroba, podróże, studia — jak opisać luki w CV bez kłamstwa.',
    category: 'Format CV',
    tags: [
      'luki w cv',
      'przerwa w zatrudnieniu cv',
      'jak wytłumaczyć lukę w cv',
      'cv przerwa w pracy',
      'luka w historii zatrudnienia',
      'przerwa macierzyńska cv',
      'jak ukryć lukę w cv',
      'cv po przerwie',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'Luki w CV — jak wytłumaczyć przerwy w zatrudnieniu 2026',
    featured: false,
    faq: [
      { question: 'Jak duża luka w CV jest problemem?', answer: 'Luki do 3–6 miesięcy rzadko wymagają wyjaśnienia — to normalny czas szukania pracy, urlopu między pracami lub krótkiego projektu freelance. Luki powyżej 6 miesięcy — rekruter może zapytać. Luki powyżej 1 roku — warto krótko wyjaśnić w liście motywacyjnym lub podsumowaniu CV. Kontekst jest ważny: urlop wychowawczy, choroba, studia — wszystkie są zrozumiałe.' },
      { question: 'Co wpisać w CV w czasie przerwy?', answer: 'Jeśli robiłeś coś wartościowego: freelance, kursy, wolontariat, projekty własne — wpisz! Format: "2023–2024 | Freelance [Specjalność] | Praca na własny rachunek" lub "[Kurs/Certyfikat] | [Instytucja]". Jeśli przerwa była z powodów osobistych (choroba, rodzina) — możesz napisać "Urlop osobisty" lub zostawić lukę bez opisu.' },
      { question: 'Czy ukrywać lukę w CV przez wpisanie tylko lat (nie miesięcy)?', answer: 'Wpisanie "2022–2023" zamiast "luty 2022 – sierpień 2022" to technika, która maskuje krótkie luki. Jest etycznie akceptowalna dla luk do 6 miesięcy, jeśli nie ma w tym celowego wprowadzania w błąd. Dla dłuższych luk — podawaj miesiące i bądź gotowy wyjaśnić.' },
      { question: 'Jak odpowiedzieć na pytanie o lukę na rozmowie?', answer: 'Krótko, konkretnie, bez przepraszania. Wyjaśnij co robiłeś, co się nauczyłeś lub jakie miałeś powody, i przejdź do aktualności. "Po odejściu z XYZ poświęciłem 6 miesięcy na opiekę nad chorym rodzicem. W tym czasie ukończyłem kurs online z zarządzania projektami. Teraz jestem gotowy do pełnoetatowej pracy i szukam [rola]."' },
    ],
    body: `## Luki w CV — jak wyjaśnić przerwy w zatrudnieniu i przekuć je w atut

Luki w CV to jeden z największych lęków kandydatów. Tymczasem rekruterzy — zwłaszcza w 2026 — doskonale rozumieją, że kariery nie są linią prostą. Pandemia, choroba, macierzyństwo, zmiana kierunku, studia podyplomowe — to wszystko normalne wydarzenia w życiu zawodowym.

Problemem nie jest luka sama w sobie — problem to brak wyjaśnienia lub kłamstwo.

### Rodzaje luk w CV i jak je opisać

**Urlop wychowawczy / macierzyństwo / ojcostwo**
To jedna z najczęstszych luk w Polsce. Jest w 100% zrozumiała i nie powinna być problemem. W CV możesz napisać:
- "2022–2024 | Urlop wychowawczy"
- Lub po prostu nie wyjaśniać — luka jest czytelna z kontekstu

Na rozmowie: "W 2022 roku urodziłam/em dziecko i wzięłam/em urlop wychowawczy. Teraz wróciłam/em na rynek pracy pełen/pełna energii."

**Choroba własna lub opieka nad bliskim**
Nie musisz szczegółowo wyjaśniać. "Urlop zdrowotny" lub "urlop osobisty" wystarczy. Jeśli pytają na rozmowie:
"Przez X miesięcy zajmowałem się sprawami osobistymi/zdrowotnymi. Sytuacja jest rozwiązana i jestem gotowy do powrotu."

**Szukanie pracy (dłuższe niż rok)**
Bądź szczery: "Aktywnie szukałem/am odpowiedniej roli" — i jeśli coś robiłeś w tym czasie (kursy, projekty, wolontariat), podkreśl to. Rynek pracy jest trudny — rekruterzy rozumieją.

**Studia podyplomowe lub kursy**
Wpisz jako pełnoprawną pozycję w CV! To nie jest luka — to inwestycja w siebie:
\`\`\`
2022–2023 | Studia Podyplomowe — Data Science
Politechnika Warszawska
\`\`\`

**Podróże lub "sabatical"**
"Rok sabatyczny" lub "podróże" — przy dobrym wyjaśnieniu mogą być interesującym tematem rozmowy. "Przez rok podróżowałem przez Azję Południowo-Wschodnią, co rozwinęło moją adaptacyjność i otwartość kulturową — cenne w mojej roli jako project managera w globalnym zespole."

**Freelance lub własna działalność**
Wpisz jako stanowisko:
\`\`\`
2021–2023 | Freelance UX Designer
Projekty dla klientów: e-commerce (Warszawa), SaaS (zdalnie)
• Zaprojektowałem 8 aplikacji webowych dla 5 klientów
\`\`\`

### Techniki minimalizowania wizualnego efektu luki

**Używaj tylko lat, nie miesięcy (dla krótkich luk)**
"2022 – 2023" zamiast "marzec 2022 – sierpień 2022" ukrywa 5-miesięczną lukę.
Etyczne użycie: luki do 6 miesięcy bez fałszywych informacji.

**Funkcjonalny format CV (dla dużych luk)**
Zamiast listy chronologicznej — sekcja "Kluczowe osiągnięcia" i "Umiejętności" na początku. Chronologia pojawia się później, z mniejszym naciskiem na daty. To przenosi uwagę z "kiedy" na "co".

**Dodaj "lata aktywności" do sekcji umiejętności**
Jeśli masz lukę ale umiejętności są aktualne: "Python — 5 lat doświadczenia" zamiast wyróżniania luki w historii.

### Co powiedzieć na rozmowie kwalifikacyjnej

Rekruter zapyta o lukę bezpośrednio. Przygotuj odpowiedź w formule:
**Kontekst → Co robiłeś → Co z tego wyniosłeś → Teraz jesteś gotowy**

**Przykład:**
*"W połowie 2022 roku moja mama zachorowała poważnie i zdecydowałem się wziąć urlop, żeby się nią zaopiekować. Przez ten czas, oprócz opieki, ukończyłem kurs Agile PM online (certyfikat PMP w załączniku) i prowadziłem mały projekt wolontariatu dla lokalnego NGO. Mama jest już zdrowa i jestem gotowy do pełnoetatowej pracy z nową energią i świeżo zdobytymi umiejętnościami."*

### Czego UNIKAĆ

**Kłamstwo** — Zawsze wychodzi na jaw. Pracodawcy sprawdzają historię zatrudnienia przez LinkedIn, referencje i weryfikację firm. Kłamstwo w CV to podstawa do rozwiązania umowy.

**Przepraszający ton** — "Niestety miałem/am lukę, bo..." Nie przepraszaj. Wyjaśnij i idź dalej.

**Za dużo szczegółów** — Rekruter nie potrzebuje pełnej historii medycznej. Wystarczy ogólny kontekst.

**Ignorowanie luki** — Jeśli luka jest duża (ponad rok), nie udawaj, że jej nie ma. Lepiej wyjaśnić niż czekać na pytanie.

### Wskazówka eksperta

> **Rynek pracy w 2026 jest bardziej wyrozumiały dla luk niż kiedykolwiek.** Po pandemii miliony ludzi miało przerwy w pracy — rekruterzy przestali traktować lukę jako czerwoną flagę. Kluczem jest "narracja" — krótka historia, która wyjaśnia co i dlaczego, i pokazuje, że jesteś gotowy i zmotywowany do pracy. Nawet rok spędzone na opiece nad bliskim pokazuje odpowiedzialność i wartości — cechy cenione przez dobrych pracodawców.`,
  },

  // ── Topic 7 ──────────────────────────────────────────────────────────────
  {
    slug: 'wyksztalcenie-w-cv',
    title: 'Wykształcenie w CV: jak opisać dyplomy i certyfikaty 2026',
    description: 'Wykształcenie w CV — jak opisać studia, dyplomy, certyfikaty i kursy. Gdzie umieścić sekcję wykształcenie i jak prezentować edukację w CV dla absolwentów i doświadczonych.',
    category: 'Format CV',
    tags: [
      'wykształcenie w cv',
      'edukacja w cv',
      'dyplom w cv',
      'jak opisać wykształcenie w cv',
      'studia w cv',
      'certyfikaty w cv',
      'kursy w cv',
      'uczelnia w cv',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'Wykształcenie w CV — jak opisać dyplomy i certyfikaty 2026',
    featured: false,
    faq: [
      { question: 'Gdzie umieścić wykształcenie w CV?', answer: 'Dla absolwentów (0–3 lat doświadczenia): wykształcenie przed doświadczeniem — jest Twoim najsilniejszym atutem. Dla doświadczonych (5+ lat): wykształcenie po doświadczeniu zawodowym i umiejętnościach — doświadczenie jest ważniejsze. Dla managerów i seniorów: wykształcenie może być na końcu, przed certyfikatami.' },
      { question: 'Czy wpisywać oceny i wyniki studiów?', answer: 'Tylko jeśli są bardzo dobre (4.5+ lub dyplom z wyróżnieniem). Ocena 3.0–3.5 lepiej pominąć — nie wzmacnia aplikacji. Wpisuj: "Dyplom z wyróżnieniem", "Laureat stypendium rektorskiego", "Ocena: 4.8/5". Pomiń jeśli: zwykłe zaliczenie, niskie oceny, dawne studia (sprzed 15+ lat).' },
      { question: 'Jak opisać studia niedokończone?', answer: '"Studia w toku" lub "[Uczelnia], Kierunek — [lata]" bez podawania tytułu. Jeśli studia są aktualne: zaznacz planowany rok ukończenia. Jeśli przerwane: "Studia w zakresie X (2018–2020, bez dyplomu)" — lepiej niż ominięcie, które może wyglądać jak luka. Jeśli masz pracę i studia były dawno — można pominąć.' },
      { question: 'Czy kurs online (Coursera, Udemy) wpisywać do CV?', answer: 'Tak, szczególnie jeśli: jest od renomowanej instytucji (Google, IBM, Microsoft na Coursera), jest relevantny dla stanowiska, prowadzi do certyfikatu. "Udemy — Python for Beginners" dla programisty to za słaby sygnał. "Google Data Analytics Certificate — Coursera (2024)" — to już inny poziom.' },
    ],
    body: `## Wykształcenie w CV — jak opisać edukację, żeby działała na Twoją korzyść

Sekcja wykształcenia w CV jest często niedoceniana przez doświadczonych kandydatów i przeceniana przez absolwentów. Kluczem jest wiedzieć, co podkreślić, co pominąć i jak sformatować edukację zależnie od etapu kariery.

### Standard formatowania sekcji wykształcenia

**Podstawowy format:**
\`\`\`
[Tytuł/Stopień] — [Kierunek]
[Pełna nazwa uczelni] | [Miasto] | [Rok ukończenia lub "w toku"]
[Opcjonalnie: wyróżnienia, wyniki, relevantne projekty]
\`\`\`

**Przykład pełny (absolwent):**
\`\`\`
Magister inżynier — Informatyka, specjalność: Sztuczna Inteligencja
Politechnika Warszawska | Warszawa | 2024
Dyplom z wyróżnieniem | Stypendysta Rektora (2022–2024)
Praca dyplomowa: "System rekomendacji oparty na deep learning dla e-commerce"
\`\`\`

**Przykład uproszczony (doświadczony kandydat):**
\`\`\`
Magister — Zarządzanie | Szkoła Główna Handlowa | 2015
\`\`\`

### Co opisywać szczegółowo — co zostawić skrótowo

**Opisuj szczegółowo gdy:**
- Jesteś absolwentem (wykształcenie jest Twoją kartą atutową)
- Dyplom jest z renomowanej uczelni (AGH, PW, UW, SGH, WSSE)
- Masz wyróżnienia, stypendia, nagrody
- Praca dyplomowa jest relevantna dla stanowiska
- Projekty akademickie pokazują konkretne umiejętności

**Opisuj skrótowo gdy:**
- Masz 7+ lat doświadczenia (doświadczenie ważniejsze)
- Uczelnia jest mało rozpoznawalna
- Studia były dawno temu (ponad 15 lat)
- Kierunek nie jest związany z obecną rolą

### Tytuły naukowe i stopnie — jak pisać

**Polskie tytuły w CV:**
- Magister (mgr) → wpisz jako "Magister [kierunek]"
- Magister inżynier (mgr inż.) → "Magister inżynier"
- Licencjat (lic.) → "Licencjat"
- Inżynier (inż.) → "Inżynier [specjalność]"
- Doktor (dr) → "Doktor" (w nagłówku CV możesz też użyć "Dr [Imię Nazwisko]")

**Zagraniczne odpowiedniki w CV angielskim:**
- Magister → Master's Degree in [Field]
- Licencjat → Bachelor's Degree in [Field]
- Inżynier → Bachelor of Engineering (B.Eng.) in [Field]

### Certyfikaty i kursy — osobna sekcja czy razem z wykształceniem?

**Osobna sekcja "Certyfikaty" (zalecana) gdy:**
- Masz więcej niż 3–4 certyfikaty
- Certyfikaty są rozpoznawalne i znaczące (AWS, Google, PMP, CFA)
- Rola wymaga certyfikatów (tester = ISTQB, PM = PMP/Prince2)

**Razem z wykształceniem (sekcja "Wykształcenie i certyfikaty") gdy:**
- Masz 1–2 certyfikaty
- Certyfikaty uzupełniają edukację formalną

**Format sekcji certyfikatów:**
\`\`\`
Certyfikaty:
• AWS Solutions Architect — Associate | Amazon | 2024
• Project Management Professional (PMP) | PMI | 2023
• Google Data Analytics Certificate | Google/Coursera | 2022
\`\`\`

**Kursy online — kiedy i jak wpisywać:**
\`\`\`
Kursy i szkolenia:
• Machine Learning Specialization | Andrew Ng / Coursera | 2024
• React — The Complete Guide | Udemy | 2023
• Agile & Scrum Fundamentals | Scrum.org | 2023
\`\`\`

Tylko kursy z certyfikatami ukończenia. Kursy bez certyfikatów możesz wpisać, ale są słabszym sygnałem.

### Typowe błędy w sekcji wykształcenia

**Wpisywanie szkoły średniej**
Maturzysta — tak. Licencjat+ — szkoła średnia jest niepotrzebna i zajmuje miejsce.

**Zbyt stare kursy**
Kurs z 2010 roku w dynamicznej branży (IT, marketing) może sugerować brak aktualizacji wiedzy. Zaktualizuj lub usuń.

**Błędy w nazwach uczelni**
"Politechnika Warawska" albo "Szkoła Handlowa" zamiast pełnej nazwy — brak uwagi do szczegółów.

**Wpisywanie nieukończonych studiów bez wyjaśnienia**
"Informatyka 2018–2020" bez tytułu budzi pytania. Dodaj "(bez dyplomu)" lub wyjaśnij w podsumowaniu.

### Wskazówka eksperta

> **Rekruterzy patrzą na uczelnie i kierunki, żeby ocenić bazowe myślenie analityczne — nie tylko konkretną wiedzę.** Informatyk z AGH czy Politechniki Warszawskiej ma inny prestiż niż dyplom z mało rozpoznawalnej uczelni — i rekruterzy to wiedzą. Jeśli Twoja uczelnia jest mniej rozpoznawalna, kompensuj: podkreślaj konkretne projekty, osiągnięcia akademickie i zastosowania praktyczne wiedzy. Wartość CV buduje się nie tylko przez sam fakt posiadania dyplomu.`,
  },

  // ── Topic 8 ──────────────────────────────────────────────────────────────
  {
    slug: 'czcionka-w-cv',
    title: 'Czcionka w CV: jaką wybrać, żeby wyglądało profesjonalnie',
    description: 'Czcionka w CV — jaką font wybrać dla profesjonalnego wyglądu. Najlepsze czcionki do CV, których unikać i jak rozmiar czcionki wpływa na czytelność i przejście przez ATS.',
    category: 'Format CV',
    tags: [
      'czcionka w cv',
      'font cv',
      'jaką czcionkę wybrać do cv',
      'czcionka cv profesjonalna',
      'rozmiar czcionki cv',
      'cv font wybór',
      'arial cv',
      'calibri cv',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'Czcionka w CV — jaką wybrać dla profesjonalnego wyglądu 2026',
    featured: false,
    faq: [
      { question: 'Jaka czcionka jest najlepsza do CV?', answer: 'Najlepsze czcionki do CV: Calibri (nowoczesna, czytelna, domyślna w Word), Garamond (elegancka, klasyczna), Arial (bezszeryfowa, czytelna dla ATS), Helvetica (podobna do Arial, bardziej stylowa), Times New Roman (formalna, tradycyjna dla prawniczych i akademickich). Unikaj: Comic Sans, Papyrus, Impact, ozdobnych fontów.' },
      { question: 'Jaki rozmiar czcionki w CV?', answer: 'Tekst główny: 10–11 pt (minimum 10pt — poniżej nieczytelne). Nagłówki sekcji: 12–14 pt. Imię w nagłówku: 16–24 pt. Nie zmniejszaj czcionki poniżej 10pt żeby "zmieścić więcej" — rekruter nie będzie czytał jeśli musi zmrużyć oczy. Lepiej skróć treść niż zmniejszaj font.' },
      { question: 'Czy mieszać kilka czcionek w CV?', answer: 'Możesz, ale maksymalnie dwie czcionki: jedna dla nagłówków (np. bezszeryfowa: Arial), jedna dla tekstu (szeryfowa: Garamond). Więcej czcionek to chaos wizualny. Jeśli nie jesteś pewien — zostań przy jednej czcionce w różnych rozmiarach i wagach (bold, regular).' },
      { question: 'Czy czcionka ma znaczenie dla ATS?', answer: 'Tak. Niestandardowe, dekoracyjne czcionki mogą nie być prawidłowo odczytane przez ATS lub mogą być zastąpione przez "domyślny" font, co psuje formatowanie. Bezpieczne czcionki dla ATS: Arial, Calibri, Times New Roman, Verdana, Helvetica — wszystkie są "systemowe" i zawsze dostępne.' },
    ],
    body: `## Czcionka w CV — jak wybrać font, który działa dla rekrutera i ATS

Czcionka w CV to element, który kandydaci rzadko świadomie wybierają — a powinni. Dobra czcionka sprawia, że CV jest czytelne, profesjonalne i dobrze przetworzone przez ATS. Zła — utrudnia czytanie lub jest odrzucona przez systemy automatyczne.

### Top 5 czcionek do CV (z uzasadnieniem)

**1. Calibri (domyślna w Microsoft Word)**
- Styl: bezszeryfowa, nowoczesna
- ATS: doskonała (systemowa)
- Wrażenie: profesjonalna, czytelna, współczesna
- Dla kogo: IT, tech, marketing, startupy
- Wada: bardzo popularna, może wyglądać "generycznie"

**2. Garamond**
- Styl: szeryfowa, elegancka, klasyczna
- ATS: dobra (szeroko dostępna)
- Wrażenie: elegancka, akademicka, tradycyjna
- Dla kogo: prawo, finanse, konsulting, zarządzanie
- Wada: może wyglądać zbyt formalnie dla startupów

**3. Arial**
- Styl: bezszeryfowa, neutralna
- ATS: doskonała (jedna z podstawowych systemowych)
- Wrażenie: czytelna, profesjonalna, nieco "generyczna"
- Dla kogo: Doskonała dla wszystkich branż, bezpieczny wybór

**4. Trebuchet MS**
- Styl: bezszeryfowa, nowoczesna, lekko charakterystyczna
- ATS: dobra
- Wrażenie: profesjonalna ale z charakterem
- Dla kogo: marketing, design, media

**5. Georgia**
- Styl: szeryfowa, elegancka, dobra czytelność na ekranie
- ATS: dobra
- Wrażenie: klasyczna ale czytelna na ekranie
- Dla kogo: prawo, finanse, HR

### Czcionki DO UNIKANIA w CV

**Comic Sans** — nieprofesjonalna, skojarzona z plakatami szkolnymi
**Papyrus** — dekoracyjna, nieprofesjonalna
**Impact** — zbyt agresywna
**Curlz MT / Brush Script** — ozdobne, trudne do czytania
**Handwriting fonts** — dla dzieci i kreatorów urodzinowych
**Wszelkie fonty wymagające pobrania** — rekruter może ich nie mieć, CV "rozsypie się"

### Hierarchia czcionek — jak używać rozmiarów i wagów

**Struktura rozmiarów:**
\`\`\`
Imię Nazwisko: 20–24 pt | Bold
Tytuł zawodowy pod imieniem: 13–14 pt | Regular lub Italic
Nagłówki sekcji: 12–13 pt | Bold
Tytuły stanowisk: 11 pt | Bold
Tekst główny: 10–11 pt | Regular
Dane dodatkowe (daty, lokalizacje): 10 pt | Regular lub Italic
\`\`\`

**Używanie Bold:**
- Do nagłówków sekcji i tytułów stanowisk
- Do kluczowych liczb w bullet pointach ("zwiększyłem sprzedaż o **34%**")
- Nie do całych paragrafów — to anuluje efekt wyróżnienia

**Używanie Italic:**
- Do nazw firm, tytułów projektów, nazw produktów
- Do dat (opcjonalnie)
- Nie do długich bloków tekstu — trudniejsze do czytania

### Rozmiar czcionki a długość CV

Jeden z najczęstszych błędów: zmniejszanie czcionki do 8–9pt, żeby "zmieścić więcej". To błąd — rekruter nie będzie czytał nieczytelnego CV. Zamiast zmniejszać font:
- Skróć bullet pointy
- Usuń nieistotne stanowiska
- Zmniejsz marginesy (nie poniżej 1,5 cm)
- Skróć podsumowanie zawodowe

Minimum 10pt dla tekstu głównego. Dla rekruterów w wieku 40–50+ (a rekruterami są często właśnie starsi menedżerowie) — 11pt jest bezpieczniejsze.

### ATS i czcionki — techniczne detale

Systemy ATS (Applicant Tracking System) konwertują CV na tekst przed analizą. Problemy pojawiają się gdy:

1. **Czcionka nie jest osadzona w PDF** — ATS zastępuje ją domyślną, co może psuć formatowanie
2. **Czcionka jest bardzo dekoracyjna** — ATS może mylić litery (np. ozdobne "a" rozpoznane jako "o")
3. **Tekst jest w formie obrazu** — ATS nie może go odczytać

Bezpieczna reguła: używaj czcionek "web-safe" (systemowych) lub upewnij się, że są prawidłowo osadzone w PDF (sprawdź przez Plik → Właściwości dokumentu → Czcionki w Adobe Acrobat).

### Wskazówka eksperta

> **Czcionka powinna być "niewidzialna" — rekruter powinien skupiać się na treści, nie na estetyce fontu.** Jeśli ktoś zauważa Twoją czcionkę — to może być problem (zbyt ozdobna lub zbyt nieczytelna). Najlepsze CV to takie, gdzie czcionka jest po prostu czytelna i profesjonalna, a uwaga całkowicie skupia się na Twoich osiągnięciach i umiejętnościach.`,
  },

  // ── Topic 9 ──────────────────────────────────────────────────────────────
  {
    slug: 'kolory-w-cv',
    title: 'Kolory w CV: kiedy używać kolorowego CV i kiedy unikać',
    description: 'Kolory w CV — kiedy dodawać kolor do CV, a kiedy lepiej zachować czerń i biel. Psychologia kolorów w CV, branżowe normy i jak nie przesadzić z kolorowym CV.',
    category: 'Format CV',
    tags: [
      'kolory w cv',
      'kolorowe cv',
      'czy dodawać kolor do cv',
      'cv z kolorem',
      'kolor nagłówków cv',
      'cv czarno białe',
      'cv design kolor',
      'ats kolory cv',
    ],
    image: '/blog/pl-placeholder.svg',
    imageAlt: 'Kolory w CV — kiedy używać kolorowego CV w Polsce 2026',
    featured: false,
    faq: [
      { question: 'Czy kolorowe CV jest profesjonalne?', answer: 'Zależy od branży i ilości koloru. Subtelny akcent kolorystyczny (np. ciemnoniebieski nagłówek, granatowa linia separatora) jest akceptowalny i może pomóc wyróżnić CV. Pełne kolorowe tło lub wiele kolorów w tekście — nieprofesjonalne dla większości ról. Dla branż kreatywnych — więcej swobody.' },
      { question: 'Jaki kolor jest bezpieczny w CV?', answer: 'Bezpieczne kolory do CV: granat (navy blue), ciemny teal, szary węgiel (dark gray), burgund (ciemna wiśnia). Unikaj: jaskrawy czerwony, neonowe kolory, żółty (nieczytelny na białym tle), zbyt jasne pastele. Złota zasada: kolor powinien być wystarczająco ciemny, żeby nagłówki były czytelne.' },
      { question: 'Czy kolory w CV psują ATS?', answer: 'Kolory tła i tekstu nie psują ATS (jest tekst, który ATS może odczytać). Problem pojawia się gdy: tekst jest w kolorze zbyt jasnym (może nie być odczytany), kolor jest elementem graficznym (obraz) zamiast tekstu. Czarny tekst na białym tle jest zawsze bezpieczny dla ATS.' },
      { question: 'Jak sprawdzić czy moje kolorowe CV jest czytelne?', answer: 'Test kontrastu: wydrukuj CV w czarno-białej kserokopii. Jeśli wszystkie elementy są czytelne — kolory są dobrze dobrane. Jeśli elementy "znikają" (np. jasnoniebieski tekst) — zmień kolor. Narzędzie online: WebAIM Contrast Checker (sprawdza stosunek kontrastu tekstu do tła).' },
    ],
    body: `## Kolory w CV — jak używać koloru profesjonalnie i kiedy go unikać

Kolor w CV to miecz obosieczny. Dobrze użyty wyróżnia CV z tłumu i kieruje oko rekrutera na najważniejsze elementy. Źle użyty wygląda nieprofesjonalnie, utrudnia czytanie lub jest odrzucony przez ATS. Kluczem jest wiedza, kiedy, ile i jakiego koloru używać.

### Kiedy kolor w CV pomaga

**Wyróżnienie z tłumu**
W branżach, gdzie rekruter przegląda 200 CV — subtelny akcent kolorystyczny może przyciągnąć uwagę. "Granatowe" CV wyróżnia się na tle morza czarno-białych dokumentów.

**Kierowanie uwagi**
Kolor nagłówków sekcji pomaga rekruterowi szybko skanować dokument. Zamiast szukać "Doświadczenie" — widzi od razu kolorowy nagłówek.

**Spójność wizualna**
Jeden kolor akcentu (np. granat) użyty konsekwentnie w nagłówkach, linii separatora i inicjałach tworzy profesjonalne, spójne wrażenie.

**Branże kreatywne**
UX/UI Designer, grafik, fotograf, marketingowiec — od kandydatów oczekuje się, że ich CV będzie odzwierciedlać estetyczne kompetencje. Kolorowe, kreatywne CV jest tu oczekiwane.

### Kiedy kolor w CV szkodzi

**Branże konserwatywne**
Prawo, bankowość, finanse, ubezpieczenia, administracja publiczna — tutaj minimalizm i klasyczny czerń-biel jest normą. Neonowe CV u kandydata na prawnika zrobi złe wrażenie.

**Nadmiar kolorów**
Gdy CV wygląda jak tęcza — brakuje hierarchii, oczy nie wiedzą, gdzie patrzeć. Zasada: jeden kolor akcentu + czerń + opcjonalnie szary.

**Słaby kontrast**
Jasnoniebieski tekst na białym tle — trudny do czytania i może nie być wydrukowany poprawnie. Każdy kolor tekstu musi być wystarczająco ciemny (stosunek kontrastu min. 4.5:1 według WCAG).

**Kolorowe tło**
Ciemne lub kolorowe tło strony rzadko wygląda dobrze i utrudnia czytanie. Jeśli CV jest drukowane — kolorowe tło oznacza zużycie dużo tuszu (i może wyglądać blado na słabej drukarce).

### Bezpieczna paleta kolorów do CV

**Kolory profesjonalne (najlepszy wybór):**
- Granat / Navy Blue (#003366 lub #1A4A7A)
- Ciemny teal (#006666 lub #2E7D7D)
- Burgund / Ciemna wiśnia (#722F37)
- Ciemna szałwia (#4A7A55)
- Antracyt / Ciemny szary (#333333 lub #404040)

**Kolory ryzykowne (tylko dla kreatywnych ról):**
- Jasny niebieski (słaby kontrast)
- Pomarańczowy (może wyglądać agresywnie)
- Zielony limonka lub neonowe kolory

**Zawsze unikaj:**
- Jaskrawy czerwony (agresywny, kojarzy się z błędem)
- Żółty na białym tle (nieczytelny)
- Neonowe kolory
- Więcej niż 2 kolory akcentów

### Jak zastosować kolor w CV — konkretne użycia

**Nagłówki sekcji:**
Zamiast "**DOŚWIADCZENIE ZAWODOWE**" w czarnym boldzie — użyj kolorowego tekstu lub kolorowej linii pod nagłówkiem.

**Linia separatora:**
Cienka kolorowa linia (1–2 pt) pod imieniem lub między sekcjami — subtelny akcent.

**Pasek boczny (sidebar):**
Wiele nowoczesnych szablonów CV ma boczny pasek w kolorze (granatowy lub szary) z danymi kontaktowymi po lewej stronie.

**Bullet points i ikony:**
Kolorowe ikonki przy sekcjach (email, telefon, lokalizacja) lub kolorowe bullet points — subtelne, ale estetyczne.

**Nagłówek strony:**
Imię i tytuł zawodowy na kolorowym tle lub z kolorową dekoracją.

### ATS i kolory — fakty vs mity

**Mit:** "Kolorowe CV jest odrzucane przez ATS"
**Fakt:** ATS czyta tekst, nie kolor. Kolor tła i nagłówków nie wpływa na przetwarzanie tekstu.

**Mit:** "Muszę mieć czarno-białe CV żeby przejść ATS"
**Fakt:** ATS interesuje się tekstem i słowami kluczowymi, nie estetyką. Prosto sformatowane CV z kolorem jest ATS-friendly.

**Prawdziwy problem:** Kolorowy tekst na kolorowym tle (zły kontrast) może być trudny do optycznego rozpoznania (OCR) — ale nie dla nowoczesnych ATS.

### Wskazówka eksperta

> **Reguła "wydrukuj w czarno-białym":** Wydrukuj swoje CV na zwykłej drukarce w trybie czarno-białym (grayscale). Jeśli wszystkie elementy są czytelne i hierarchia jest zachowana — Twoje kolory działają dobrze. Jeśli elementy "znikają" lub stają się nieczytelne — masz problem z kontrastem. To prosty test, który eliminuje 90% problemów z kolorem w CV.`,
  },
];
