/**
 * Polish (pl) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-pl.mjs')
 *
 * Keyword-optimized: "list motywacyjny" + "kreator listu motywacyjnego"
 * Top keywords from seo/polish-top-250-keywords.csv:
 *   "list motywacyjny kreator" (500/mo), "kreator listu motywacyjnego" (500/mo),
 *   "list motywacyjny szablon" (500/mo), "szablony listu motywacyjnego" (500/mo)
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-pl.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Anna Kowalska',
  authorBio: 'Specjalistka ds. rozwoju kariery i pisania listów motywacyjnych z ponad 10-letnim doświadczeniem w pomaganiu polskim profesjonalistom w zdobywaniu wymarzonej pracy.',
  titlePattern: (job) => `List Motywacyjny ${job}: Przykład i Poradnik 2026`,
  descriptionPattern: (job) => `Przykład listu motywacyjnego dla ${job.toLowerCase()} z profesjonalnymi szablonami. Naucz się podkreślać swoje kompetencje i zdobądź rozmowę kwalifikacyjną w 2026.`,
};

// ─── JOB TITLES (English → Polish) ──────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Księgowa',
  'Chief Information Officer': 'Dyrektor ds. Informatyki',
  'CNA': 'Certyfikowany Asystent Pielęgniarki',
  'Corporate Trainer': 'Trener Korporacyjny',
  'EMT/Paramedic': 'Ratownik Medyczny/Ratownik',
  'Golang Developer': 'Programista Golang',
  'Human Resources Manager': 'Menedżer ds. Zasobów Ludzkich',
  'LPN': 'Pielęgniarka Praktyczna',
  'Machinist': 'Tokarz / Mechanik Obróbki Skrawaniem',
  'Systems Administrator': 'Administrator Systemów',
  'Tax Accountant': 'Doradca Podatkowy',
};

// ─── CATEGORIES (English → Polish) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Technologia',
  Healthcare: 'Opieka Zdrowotna',
  'Food Service': 'Gastronomia',
  Hospitality: 'Hotelarstwo',
  Trades: 'Rzemiosło i Budownictwo',
  Creative: 'Kreatywne',
  Education: 'Edukacja',
  Marketing: 'Marketing',
  Government: 'Administracja Publiczna',
  Business: 'Biznes',
  Sales: 'Sprzedaż',
  Engineering: 'Inżynieria',
  'Business & Finance': 'Biznes i Finanse',
  Legal: 'Prawo',
  HR: 'Zasoby Ludzkie',
  'Skilled Trades': 'Rzemiosło Specjalistyczne',
  'Real Estate': 'Nieruchomości',
  'Customer Service': 'Obsługa Klienta',
  'Animal Care': 'Opieka nad Zwierzętami',
  Administrative: 'Administracja',
  Transportation: 'Transport',
  Logistics: 'Logistyka',
  Fitness: 'Fitness',
  Cleaning: 'Sprzątanie',
  Retail: 'Handel Detaliczny',
  Management: 'Zarządzanie',
  'Social Services': 'Usługi Społeczne',
  Manufacturing: 'Produkcja',
  Accounting: 'Księgowość',
  Construction: 'Budownictwo',
  Security: 'Bezpieczeństwo',
  Science: 'Nauka',
  'Health & Fitness': 'Zdrowie i Fitness',
  Research: 'Badania',
  Finance: 'Finanse',
  'Writing & Content': 'Pisanie i Treści',
  'Supply Chain': 'Łańcuch Dostaw',
  Quality: 'Jakość',
  Media: 'Media',
  Maritime: 'Morski',
  'Law Enforcement': 'Służby Mundurowe',
  Facilities: 'Zarządzanie Obiektem',
  Executive: 'Kadra Kierownicza',
  Events: 'Organizacja Wydarzeń',
  'Entry-Level': 'Bez Doświadczenia',
  Entrepreneurship: 'Przedsiębiorczość',
  Consulting: 'Consulting',
  Childcare: 'Opieka nad Dziećmi',
  'Banking & Finance': 'Bankowość i Finanse',
  Banking: 'Bankowość',
  Aviation: 'Lotnictwo',
  Automotive: 'Motoryzacja',
  Architecture: 'Architektura',
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
  Technology: (job) => `W sektorze IT list motywacyjny ${job} musi wychodzić poza prostą listę opanowanych technologii. Rekruterzy szukają kandydatów, którzy potrafią wykazać, jak ich kompetencje techniczne rozwiązały realne problemy i wygenerowały wartość dla poprzednich pracodawców. Twój list powinien ustanowić bezpośredni związek między Twoją wiedzą a konkretnymi potrzebami stanowiska.`,
  Healthcare: (job) => `Sektor ochrony zdrowia przykłada szczególną wagę do zaangażowania w dobro pacjentów. List motywacyjny ${job} powinien odzwierciedlać zarówno Twoje kompetencje kliniczne, jak i empatię zawodową. Rekruterzy chcą zobaczyć, że rozumiesz etyczne i ludzkie wyzwania stanowiska, nie tylko swoje kwalifikacje techniczne.`,
  Finance: (job) => `Rekruterzy w finansach i księgowości szukają kandydatów, których list motywacyjny demonstruje rygor analityczny i profesjonalną uczciwość. Twoja aplikacja na stanowisko ${job} powinna ilustrować zdolność do zarządzania odpowiedzialnością finansową z precyzją, przy zachowaniu polskich przepisów regulacyjnych.`,
  'Food Service': (job) => `W gastronomii list motywacyjny ${job} powinien przekazywać Twoją pasję do kuchni i zdolność do pracy w dynamicznym środowisku. Rekruterzy cenią kandydatów, którzy wykazują ducha zespołowego, znajomość norm higienicznych i zaangażowanie w doświadczenie klienta.`,
  Hospitality: (job) => `Branża hotelarska ceni kandydatów, którzy uosabiają doskonałość obsługi. List motywacyjny ${job} powinien odzwierciedlać Twoje poczucie gościnności, dbałość o szczegóły i zdolność tworzenia niezapomnianych doświadczeń dla gości. Rekruterzy szukają profesjonalistów łączących kompetencje operacyjne z ciepłym podejściem do ludzi.`,
  Trades: (job) => `Dla zawodów rzemieślniczych i technicznych skuteczny list motywacyjny ${job} podkreśla praktyczne doświadczenie, certyfikaty i zaangażowanie w bezpieczeństwo pracy. Pracodawcy szukają rzetelnych, samodzielnych fachowców zdolnych do wykonywania pracy wysokiej jakości w wyznaczonych terminach. Uprawnienia i certyfikaty są kluczowe na polskim rynku budowlanym.`,
  Engineering: (job) => `Stanowiska inżynieryjne wymagają listu motywacyjnego ${job}, który demonstruje zdolność do metodycznego rozwiązywania złożonych problemów. Rekruterzy chcą zobaczyć konkretne dowody z powodzeniem zrealizowanych projektów, opanowanie narzędzi technicznych i rozumienie ograniczeń branżowych.`,
  Creative: (job) => `W zawodach kreatywnych Twój list motywacyjny ${job} jest sam w sobie próbką Twojego talentu. Powinien demonstrować wrażliwość artystyczną, jednocześnie udowadniając rozumienie celów biznesowych. Dyrektorzy kreatywni szukają kandydatów potrafiących pogodzić wizję artystyczną z wymaganiami klienta.`,
  Education: (job) => `Sektor edukacyjny ceni kandydatów, którzy wykazują autentyczne powołanie do przekazywania wiedzy. List motywacyjny ${job} powinien odzwierciedlać Twoją filozofię pedagogiczną, zdolność adaptacji do różnych profili uczniów i zaangażowanie w sukces edukacyjny.`,
  Administrative: (job) => `Stanowiska administracyjne wymagają listu motywacyjnego ${job}, który ilustruje Twój zmysł organizacyjny, dyskrecję i wszechstronność. Rekruterzy szukają kandydatów potrafiących przewidywać potrzeby, zarządzać wieloma priorytetami jednocześnie i zapewniać sprawne funkcjonowanie codziennych operacji.`,
  Sales: (job) => `Twój list motywacyjny ${job} to Twoja pierwsza prezentacja handlowa — musi przekonywać. Rekruterzy oceniają Twoją zdolność do persuazyjnej komunikacji, identyfikowania potrzeb klienta i prezentowania jasnej propozycji wartości. Każdy akapit powinien ilustrować Twój potencjał handlowy.`,
  Marketing: (job) => `W marketingu list motywacyjny ${job} powinien odzwierciedlać Twoje rozumienie strategii komunikacji i zdolność do generowania mierzalnych wyników. Rekruterzy chcą zobaczyć, że opanujesz zarówno myślenie strategiczne, jak i realizację operacyjną — z konkretnymi przykładami udanych kampanii lub inicjatyw.`,
  HR: (job) => `Stanowiska HR wymagają listu motywacyjnego ${job}, który demonstruje rozumienie dynamiki organizacyjnej i wrażliwość na ludzkie wyzwania firmy. Twoja aplikacja powinna ilustrować zdolność do balansowania między interesami pracowników a interesami organizacji, przy znajomości polskiego Kodeksu Pracy.`,
  'Customer Service': (job) => `Stanowiska w obsłudze klienta potrzebują listu motywacyjnego ${job}, który podkreśla zdolność słuchania, cierpliwość i talent do rozwiązywania problemów. Rekruterzy szukają kandydatów potrafiących przekształcać trudne sytuacje w pozytywne doświadczenia dla klienta.`,
  Logistics: (job) => `Sektor logistyczny ceni precyzję i efektywność operacyjną. List motywacyjny ${job} powinien demonstrować zdolność do zarządzania złożonymi operacjami, dotrzymywania terminów i optymalizacji procesów. Pracodawcy szukają metodycznych profesjonalistów z solidnym doświadczeniem w zarządzaniu przepływami.`,
  Government: (job) => `Aplikacje do sektora publicznego podlegają specyficznym konwencjom. List motywacyjny ${job} powinien demonstrować zaangażowanie w służbę publiczną, znajomość ram prawnych i zdolność do pracy zgodnie z ustalonymi procedurami administracyjnymi.`,
  Legal: (job) => `Sektor prawniczy wymaga listu motywacyjnego ${job} nienagannego zarówno w formie, jak i treści. Rekruterzy oceniają rygor intelektualny, zdolność analityczną i opanowanie słownictwa prawnego. Każde zdanie powinno odzwierciedlać precyzję i dbałość o szczegóły oczekiwane w zawodzie.`,
  Science: (job) => `Stanowiska naukowe potrzebują listu motywacyjnego ${job}, który podkreśla Twoje analityczne podejście i wkład w badania. Rekruterzy chcą zobaczyć dowody na Twój metodologiczny rygor, publikacje lub znaczące projekty oraz zdolność do upraszczania złożonych koncepcji.`,
  Fitness: (job) => `W sektorze sportu i dobrostanu list motywacyjny ${job} powinien przekazywać pasję do pracy z ludźmi i wiedzę techniczną. Pracodawcy szukają certyfikowanych profesjonalistów, którzy wykazują autentyczne zaangażowanie w zdrowie i postępy swoich klientów.`,
  Cleaning: (job) => `Dla stanowisk sprzątających skuteczny list motywacyjny ${job} podkreśla Twoją niezawodność, dbałość o szczegóły i znajomość profesjonalnych produktów i technik sprzątania. Pracodawcy priorytetowo traktują kandydatów punktualnych, samodzielnych i zaangażowanych w utrzymywanie wysokich standardów czystości.`,
  'Entry-Level': (job) => `Na pierwszej pracy list motywacyjny ${job} powinien nadrabiać brak doświadczenia entuzjazmem, motywacją i kompetencjami transferowalnymi nabytymi podczas studiów lub staży. Rekruterzy cenią młodych ludzi, którzy wykazują potencjał szybkiego uczenia się i autentyczną chęć wnoszenia wkładu.`,
  Business: (job) => `Świat biznesu wymaga listu motywacyjnego ${job}, który demonstruje zmysł strategiczny i orientację na wyniki. Rekruterzy szukają kandydatów zdolnych do przyczynienia się do wzrostu firmy, ze zrozumieniem wyzwań handlowych i zdolnością do proponowania konkretnych rozwiązań.`,
  default: (job) => `Skuteczny list motywacyjny ${job} ustanawia bezpośredni związek między Twoimi kompetencjami a konkretnymi potrzebami firmy. Demonstruje Twoje rozumienie stanowiska, podkreśla najważniejsze osiągnięcia i przekazuje autentyczną motywację do podjęcia tej szansy zawodowej.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `list motywacyjny ${lower}`,
    `przykład listu motywacyjnego ${lower}`,
    `szablon listu motywacyjnego ${lower}`,
    `kreator listu motywacyjnego`,
    `list motywacyjny wzór za darmo`,
    `list motywacyjny za darmo`,
    `list motywacyjny 2026`,
    `podanie o pracę`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Jak napisać list motywacyjny na stanowisko ${lower}?`,
      answer: `Zacznij od spersonalizowanego otwarcia nawiązującego do firmy i stanowiska. Rozwiń dwa lub trzy konkretne osiągnięcia związane z wymaganiami stanowiska ${lower}, używając liczb i mierzalnych wyników. Zakończ wnioskiem wyrażającym motywację i zaproponuj rozmowę kwalifikacyjną.`,
    },
    {
      question: `Jaka powinna być długość listu motywacyjnego dla ${lower}?`,
      answer: `List motywacyjny ${lower} powinien mieścić się na jednej stronie, zawierając od 250 do 400 słów. Rekruterzy poświęcają mało czasu na każdą aplikację, więc priorytetem jest zwięzłość i siła przekazu. Każdy akapit powinien wnosić nową, istotną informację dotyczącą stanowiska.`,
    },
    {
      question: `Czy powinienem/powinnam powtarzać treść CV w liście motywacyjnym ${lower}?`,
      answer: `Nie — list motywacyjny nie powinien być kopią Twojego CV. Powinien je uzupełniać, dostarczając kontekstu, wyjaśniając motywacje i rozwijając najważniejsze osiągnięcia dla stanowiska ${lower}. Użyj go, aby opowiedzieć historię stojącą za liczbami i pokazać swoją osobowość zawodową.`,
    },
    {
      question: `Czy zawsze trzeba wysyłać list motywacyjny na stanowisko ${lower}?`,
      answer: `Nawet jeśli oferta pracy nie wymaga tego wprost, dobrze napisany list motywacyjny dla stanowiska ${lower} może zrobić różnicę między dwoma kandydatami o równych kompetencjach. Pokazuje powagę, autentyczne zainteresowanie ofertą i zdolność profesjonalnej komunikacji.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'kluczowe kompetencje stanowiska';
  const skill1 = skills[0] || 'zarządzanie projektami';
  const skill2 = skills[1] || 'praca zespołowa';
  const skill3 = skills[2] || 'komunikacja';
  const skill4 = skills[3] || 'rozwiązywanie problemów';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Co Wyróżnia List Motywacyjny ${jobTitle}

${opener}

Przekonujący list motywacyjny na stanowisko ${lower} — zwany też listem aplikacyjnym lub podaniem o pracę — nie ogranicza się do streszczenia Twojej drogi zawodowej. Pokazuje, że poświęciłeś/aś czas na zrozumienie wyzwań stanowiska i firmy oraz że posiadasz konkretne kompetencje, by im sprostać. To Twoja szansa na pokazanie osobowości zawodowej i wyróżnienie się spośród innych kandydatów.

## Przykład Listu Motywacyjnego dla ${jobTitle}

> **Temat: Aplikacja na stanowisko ${jobTitle} — Ref. [Numer referencyjny oferty]**
>
> Szanowna Pani / Szanowny Panie,
>
> Oferta pracy na stanowisko ${lower} opublikowana na [Źródło oferty] od razu przykuła moją uwagę. Dzięki mojemu doświadczeniu w ${skill1} i ${skill2} jestem przekonany/a, że mogę wnieść znaczący wkład do [Nazwa Firmy].
>
> W [Obecna/Poprzednia Firma] miałem/am okazję rozwinąć solidną wiedzę w obszarze ${topSkills}. Do moich najważniejszych osiągnięć należy [przykład ilościowego osiągnięcia związanego z ${skill1}], co pozwoliło mierzalnie poprawić wyniki zespołu. Moja biegłość w ${skill3} umożliwiła mi również [przykład wkładu związanego z ${skill3}].
>
> Szczególnie przyciąga mnie ta oferta w [Nazwa Firmy] ze względu na [konkretny powód związany z firmą lub stanowiskiem]. Jestem przekonany/a, że moje kompetencje w ${skill4} i doświadczenie w branży pozwolą mi efektywnie przyczyniać się do realizacji Waszych celów.
>
> Chętnie omówię moją aplikację podczas rozmowy kwalifikacyjnej i szczegółowo przedstawię, jak moja ścieżka kariery może spełnić Wasze oczekiwania. Pozostaję do dyspozycji w dogodnym dla Państwa terminie.
>
> Z wyrazami szacunku,
>
> [Imię i Nazwisko]

*Dostosuj ten przykład, zastępując elementy w nawiasach swoimi danymi osobowymi i informacjami o docelowej firmie.*

## Kluczowe Elementy Skutecznego Listu Motywacyjnego

### Spersonalizowane Otwarcie

Unikaj szablonowych formuł takich jak „Niniejszym składam aplikację na stanowisko…". Wspomnij nazwę firmy, numer referencyjny oferty i konkretny powód Twojego zainteresowania. Rekruterzy natychmiast wyczują, czy wprowadzenie jest skopiowane i wysłane do dziesiątek firm. Zacytuj niedawny projekt firmy, artykuł o niej lub wartość, która rezonuje z Twoją ścieżką kariery ${lower}.

### Ilościowe Osiągnięcia

Każde twierdzenie powinno być poparte konkretnymi liczbami. Zamiast pisać „usprawniałem procesy", napisz „skróciłem czas przetwarzania o 30%, wdrażając nową metodę ${skill1}". Mierzalne wyniki nadają wiarygodności Twojej aplikacji i pozwalają rekruterowi ocenić rzeczywisty wpływ Twojej pracy jako ${lower}.

### Połączenie z Firmą

Pokaż, że dogłębnie zbadałeś/aś firmę. Zidentyfikuj wyzwanie lub cel strategiczny, do którego możesz przyczynić się swoimi kompetencjami w ${topSkills}. Ta sekcja dowodzi, że Twoja aplikacja jest ukierunkowana i przemyślana. Rekruterzy cenią kandydatów, którzy rozumieją ich kontekst jeszcze przed pierwszą rozmową.

### Zakończenie z Propozycją Wartości

Twoje zakończenie nie powinno być zwykłą formułą grzecznościową. Podsumuj w jednym zdaniu, co wnosisz wyjątkowego, i zaproponuj konkretnie rozmowę kwalifikacyjną. Ponownie wyraź entuzjazm wobec stanowiska ${lower} i podaj swoją dyspozycyjność. Mocne zakończenie pozostawia trwałe wrażenie i zachęca rekrutera do kontaktu.

## Wskazówki według Poziomu Doświadczenia

### Absolwenci / Bez Doświadczenia

Bez znaczącego doświadczenia zawodowego postaw na staże, projekty akademickie i kompetencje transferowalne. Wyjaśnij, jak Twoje wykształcenie przygotowało Cię do roli ${lower}. Podkreśl motywację, zdolność szybkiego uczenia się i odpowiednie aktywności pozazawodowe. Rekruterzy rozumieją, że zaczynasz — szukają potencjału, nie gotowej kariery.

### Doświadczeni Profesjonaliści

Z kilkuletnim doświadczeniem wybierz dwa lub trzy osiągnięcia najbardziej trafne dla poszukiwanego stanowiska ${lower}. Nie staraj się opisać wszystkiego — skup się na wynikach najlepiej demonstrujących Twoją wartość dodaną. Pokaż ewolucję zawodową i zdolność do podejmowania rosnących odpowiedzialności. Liczby i konkretne przykłady to Twoi najlepsi sprzymierzeńcy.

### Seniorzy / Kadra Kierownicza

Na tym poziomie list motywacyjny ${lower} powinien odzwierciedlać myślenie strategiczne i zdolność do prowadzenia zespołów oraz projektów na dużą skalę. Podkreśl osiągnięcia o zasięgu biznesowym: udane transformacje, wygenerowane oszczędności, zbudowane zespoły. Przyjmij pewny, ale przystępny ton i pokaż, że rozumiesz zarówno operacyjne, jak i strategiczne wyzwania stanowiska.

## Najczęstsze Błędy w Listach Motywacyjnych

- **Wysyłanie ogólnego, niespersonalizowanego listu** — Rekruterzy natychmiast rozpoznają standardowy list wysyłany masowo. Każda aplikacja na stanowisko ${lower} zasługuje na dostosowany list, który wspomina firmę, stanowisko i konkretne powody Twojego zainteresowania.

- **Dosłowne powtarzanie treści CV** — List motywacyjny powinien uzupełniać CV, nie powielać go. Użyj go do rozwinięcia kontekstu osiągnięć, wyjaśnienia zmian kariery i przekazania swojej osobowości zawodowej.

- **Rozpoczynanie każdego zdania od „Ja"** — List skoncentrowany wyłącznie na sobie brakuje perspektywy. Przeplataj to, co oferujesz, z tym, czego szuka firma. Pokaż, że rozumiesz potrzeby stanowiska ${lower} i jak je zaspokajasz.

- **Zaniedbanie formy i pisowni** — List motywacyjny z błędami ortograficznymi lub chaotycznym formatowaniem wysyła negatywny sygnał o Twoim profesjonalizmie. Starannie go sprawdź i poproś kogoś o weryfikację przed wysłaniem.

- **Brak wezwania do działania na końcu** — Zakończenie bez zaproponowania konkretnego następnego kroku (rozmowa kwalifikacyjna, rozmowa telefoniczna, podanie dyspozycyjności) pozostawia rekrutera bez wskazówek. Zawsze kończ jasną propozycją i wyrazem gotowości do spotkania.

## Uzupełnij List Motywacyjny Profesjonalnym CV

Skuteczny list motywacyjny zasługuje na równie dobre CV. Zadbaj, aby Twoja aplikacja na stanowisko ${lower} była spójna od początku do końca:

- [Stwórz profesjonalne CV](/pl/builder) za pomocą naszego darmowego, intuicyjnego narzędzia zoptymalizowanego pod systemy ATS
- [Sprawdź nasz przykład CV dla stanowiska ${lower}](/pl/resume-examples/${slug}), aby zainspirować się szablonami dostosowanymi do Twojego sektora
- [Wygeneruj list motywacyjny automatycznie](/pl/tools/cover-letter) za pomocą naszego asystenta AI, który dostosowuje treść do Twojego profilu

Kompletna i spójna aplikacja — dopracowane CV, spersonalizowany list motywacyjny — znacząco zwiększa Twoje szanse na zdobycie rozmowy kwalifikacyjnej na wymarzone stanowisko ${lower}.
`;
}
