import { extractTextFromPdf, extractTextFromDocx } from "./resumeParserService";

// ── Types ──────────────────────────────────────────────

export interface AtsCategory {
  name: string;
  score: number;
  maxScore: number;
  status: "pass" | "warning" | "fail";
  details: string[];
}

export interface AtsCheckResult {
  score: number;
  categories: AtsCategory[];
  recommendations: string[];
  pageCount?: number;
}

// ── Regex Patterns ─────────────────────────────────────

const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_PATTERN = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}(?:\s*(?:ext|x)\.?\s*\d{1,5})?/i;
const LINKEDIN_PATTERN = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i;
const WEBSITE_PATTERN = /https?:\/\/[^\s]+\.[a-zA-Z]{2,}/;
// English + Spanish + French + German month names (from dateUtils.ts)
const MONTH_NAMES = [
  // English
  "jan(?:uary)?", "feb(?:ruary)?", "mar(?:ch)?", "apr(?:il)?", "may", "june?", "july?",
  "aug(?:ust)?", "sep(?:t(?:ember)?)?", "oct(?:ober)?", "nov(?:ember)?", "dec(?:ember)?",
  // Spanish
  "ene(?:ro)?", "abr(?:il)?", "ago(?:sto)?", "dic(?:iembre)?",
  // French (with optional period)
  "janv\\.?", "f[eé]vr?\\.?", "mars", "avr\\.?", "mai", "juin", "juil\\.?",
  "ao[uû]t", "sept\\.?", "nov\\.?", "d[eé]c\\.?",
  // German (with optional period)
  "m[aä]rz", "mai", "juni", "juli", "okt\\.?", "dez\\.?",
].join("|");
const MONTH_PATTERN = `(?:${MONTH_NAMES})`;
const DATE_SEPARATOR = "\\s*(?:[-–—]|to)\\s*";
const PRESENT_LABELS = "present|current|now|ongoing|presente|actuel(?:lement)?|aktuell|حالي";
const END_DATE = `(?:(?:${MONTH_PATTERN}[.,]?\\s+)?(?:(?:19|20)\\d{2})|${PRESENT_LABELS})`;
// Matches: "Jan 2020 - Dec 2023", "Ene 2020 - Presente", "janv. 2020 - Actuel", etc.
const DATE_RANGE_PATTERN = new RegExp(
  `(?:(?:${MONTH_PATTERN})[.,]?\\s+)?\\b(19|20)\\d{2}${DATE_SEPARATOR}${END_DATE}\\b`,
  "gi"
);
// Matches: "01/2023 - 12/2024", "1/2023 - Present"
const DATE_RANGE_NUMERIC = new RegExp(
  `\\b\\d{1,2}\\/\\d{4}\\s*(?:[-–—]|to)\\s*(?:\\d{1,2}\\/\\d{4}|${PRESENT_LABELS})\\b`, "gi"
);
// Matches: "2020-01 – Present", "2015-05 – 2020-06" (ISO YYYY-MM format)
const DATE_RANGE_ISO = new RegExp(
  `\\b(19|20)\\d{2}-\\d{2}\\s*[–—-]\\s*(?:(19|20)\\d{2}-\\d{2}|${PRESENT_LABELS})\\b`, "gi"
);
const YEAR_PATTERN = /\b(19|20)\d{2}\b/g;

const SECTION_HEADERS = [
  // Experience: en + es (Experiencia) + fr (Expérience) + de (Erfahrung/Berufserfahrung)
  { pattern: /\b(work\s*)?experience|experiencia|exp[eé]rience|(?:berufs)?erfahrung\b/i, name: "Experience" },
  // Education: en + es (Educación/Formación) + fr (Éducation/Formation) + de (Bildung/Ausbildung)
  { pattern: /\beducation|educaci[oó]n|formaci[oó]n|[eé]ducation|formation|bildung|ausbildung\b/i, name: "Education" },
  // Skills: en + es (Habilidades/Competencias) + fr (Compétences) + de (Fähigkeiten/Kenntnisse)
  { pattern: /\bskills?|habilidades|competencias|comp[eé]tences|f[aä]higkeiten|kenntnisse\b/i, name: "Skills" },
  { pattern: /\bprofessional\s*(summary|profile|objective)\b/i, name: "Summary" },
  // Summary/Profile: en + es (Perfil/Resumen) + fr (Profil/Résumé) + de (Profil/Zusammenfassung)
  { pattern: /\b(career\s*)?(summary|objective)|perfil|resumen|r[eé]sum[eé]|zusammenfassung|profil\b/i, name: "Summary" },
  { pattern: /\bemployment(\s*history)?\b/i, name: "Employment" },
  { pattern: /\bwork\s*history\b/i, name: "Work History" },
  { pattern: /\bqualifications?\b/i, name: "Qualifications" },
  // Certifications: en + es (Certificaciones) + fr (Certifications) + de (Zertifizierungen)
  { pattern: /\bcertifications?|certificaciones|zertifizierungen\b/i, name: "Certifications" },
  // Languages: en + es (Idiomas) + fr (Langues) + de (Sprachen)
  { pattern: /\blanguages?|idiomas|langues|sprachen\b/i, name: "Languages" },
  // Projects: en + es (Proyectos) + fr (Projets) + de (Projekte)
  { pattern: /\bprojects?|proyectos|projets|projekte\b/i, name: "Projects" },
  // Volunteer: en + es (Voluntariado) + fr (Bénévolat) + de (Ehrenamt)
  { pattern: /\bvolunteer(?:ing)?|voluntariado|b[eé]n[eé]volat|ehrenamt\b/i, name: "Volunteer" },
  { pattern: /\bcontact(\s*info(rmation)?)?\b/i, name: "Contact" },
  { pattern: /\bpublications?\b/i, name: "Publications" },
  // Awards: en + es (Premios) + fr (Prix/Récompenses) + de (Auszeichnungen)
  { pattern: /\bawards?|premios|prix|r[eé]compenses|auszeichnungen\b/i, name: "Awards" },
  // Interests: en + es (Intereses) + fr (Intérêts/Centres d'intérêt) + de (Interessen)
  { pattern: /\binterests?|intereses|int[eé]r[eê]ts|interessen\b/i, name: "Interests" },
  // Strengths: en + es (Fortalezas) + fr (Points forts) + de (Stärken)
  { pattern: /\bstrengths?|fortalezas|points?\s*forts?|st[aä]rken\b/i, name: "Strengths" },
];

const ACTION_VERBS = [
  "managed", "developed", "led", "created", "implemented", "designed",
  "achieved", "increased", "reduced", "improved", "coordinated", "supervised",
  "delivered", "maintained", "analyzed", "established", "launched", "negotiated",
  "streamlined", "optimized", "resolved", "collaborated", "trained", "mentored",
  "generated", "exceeded", "transformed", "initiated", "spearheaded", "orchestrated",
];

const QUANTIFIED_PATTERN = /\b\d+[%+]?\b|\$[\d,.]+|\b\d+\s*(percent|%|million|billion|thousand|k\b|employees?|clients?|customers?|users?|teams?|projects?|years?)/gi;

// ── Text Normalization ────────────────────────────────

/**
 * Collapse spaced-out section headers from PDF text extraction.
 * Templates using CSS letter-spacing produce text like "E D U C AT I O N"
 * instead of "EDUCATION". Detects lines where >50% of tokens are single
 * characters and collapses them.
 */
function normalizeSpacedHeaders(text: string): string {
  return text.split("\n").map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length > 50) return line;

    const tokens = trimmed.split(/\s+/);
    if (tokens.length < 3) return line;

    const singleCharCount = tokens.filter((t) => t.length === 1).length;
    if (singleCharCount / tokens.length > 0.5) {
      return tokens.join("");
    }
    return line;
  }).join("\n");
}

// ── Category Checkers ──────────────────────────────────

function checkTextExtractability(text: string, pageCount?: number): AtsCategory {
  const details: string[] = [];
  let score = 0;
  const maxScore = 15;

  // Can text be extracted at all?
  if (text.length >= 50) {
    score += 5;
    details.push(`Text extracted successfully (${text.length} characters)`);
  } else {
    details.push("Could not extract meaningful text — file may be image-based or scanned");
    return { name: "Text Extractability", score: 0, maxScore, status: "fail", details };
  }

  // Reasonable length for a resume (300+ chars = at least a basic resume)
  if (text.length >= 300) {
    score += 5;
    details.push("Resume has sufficient content length");
  } else {
    details.push("Resume content is very short — add more detail to sections");
  }

  // Page count check
  if (pageCount) {
    if (pageCount <= 3) {
      score += 5;
      details.push(`${pageCount} page${pageCount > 1 ? "s" : ""} — good length`);
    } else if (pageCount <= 5) {
      score += 3;
      details.push(`${pageCount} pages — consider condensing to 1-2 pages`);
    } else {
      details.push(`${pageCount} pages — too long for most ATS systems`);
    }
  } else {
    score += 3; // DOCX — no page count, give partial credit
    details.push("Document format accepted");
  }

  const status = score >= 12 ? "pass" : score >= 7 ? "warning" : "fail";
  return { name: "Text Extractability", score, maxScore, status, details };
}

function checkContactInfo(text: string): AtsCategory {
  const details: string[] = [];
  let score = 0;
  const maxScore = 20;

  // Email (8 pts)
  const emailMatch = text.match(EMAIL_PATTERN);
  if (emailMatch) {
    score += 8;
    details.push(`Email found: ${emailMatch[0]}`);
  } else {
    details.push("No email address detected");
  }

  // Phone (6 pts)
  const phoneMatch = text.match(PHONE_PATTERN);
  if (phoneMatch) {
    score += 6;
    details.push("Phone number found");
  } else {
    details.push("No phone number detected");
  }

  // Name detection — search first 30 non-empty lines for a name-like line (3 pts)
  // Two-column PDFs extract sidebar first, so the name may not be on line 0
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  const namePattern = /^[a-z][a-z'-]+(?:\s+[a-z][a-z'-]+){1,2}$/i;
  const sectionWords = /^(profile|experience|education|skills?|summary|contact|languages?|interests?|certifications?|references?|awards?|projects?|publications?|personal\s*details?|credentials?|social\s*links?|experiencia|educaci[oó]n|habilidades|competencias|idiomas|intereses|certificaciones|referencias|premios|proyectos|perfil|resumen|exp[eé]rience|formation|comp[eé]tences|langues|int[eé]r[eê]ts|r[eé]f[eé]rences|prix|projets|erfahrung|bildung|f[aä]higkeiten|kenntnisse|sprachen|interessen|referenzen|auszeichnungen|projekte|zusammenfassung)$/i;
  const nameFound = lines.slice(0, 30).some((line) => namePattern.test(line) && !sectionWords.test(line));
  if (nameFound) {
    score += 3;
    details.push("Name detected in resume");
  } else {
    details.push("Name not clearly detected — ensure your full name is on its own line");
  }

  // LinkedIn or website (3 pts)
  const hasLinkedIn = LINKEDIN_PATTERN.test(text);
  const hasWebsite = WEBSITE_PATTERN.test(text);
  if (hasLinkedIn) {
    score += 3;
    details.push("LinkedIn profile found");
  } else if (hasWebsite) {
    score += 2;
    details.push("Website/portfolio link found");
  } else {
    details.push("No LinkedIn or portfolio link — consider adding one");
  }

  const status = score >= 15 ? "pass" : score >= 10 ? "warning" : "fail";
  return { name: "Contact Information", score, maxScore, status, details };
}

function checkSectionStructure(text: string): AtsCategory {
  const details: string[] = [];
  let score = 0;
  const maxScore = 20;

  const foundSections = new Set<string>();

  for (const header of SECTION_HEADERS) {
    if (header.pattern.test(text) && !foundSections.has(header.name)) {
      foundSections.add(header.name);
    }
  }

  // Core sections (Experience, Education, Skills) = 5 pts each
  const coreSections = ["Experience", "Employment", "Work History"];
  const hasExperience = coreSections.some((s) => foundSections.has(s));
  if (hasExperience) {
    score += 6;
    details.push("Experience/Employment section found");
  } else {
    details.push("No Experience section detected — use standard heading like 'Experience' or 'Work Experience'");
  }

  if (foundSections.has("Education")) {
    score += 5;
    details.push("Education section found");
  } else {
    details.push("No Education section detected — use heading 'Education'");
  }

  if (foundSections.has("Skills")) {
    score += 5;
    details.push("Skills section found");
  } else {
    details.push("No Skills section detected — add a 'Skills' section");
  }

  // Summary/Objective (2 pts)
  if (foundSections.has("Summary")) {
    score += 2;
    details.push("Professional summary/objective found");
  } else {
    details.push("No professional summary — consider adding one at the top");
  }

  // Bonus sections (2 pts for having extras)
  const bonusSections = ["Certifications", "Languages", "Projects", "Volunteer", "Awards", "Publications"];
  const bonusFound = bonusSections.filter((s) => foundSections.has(s));
  if (bonusFound.length > 0) {
    score += 2;
    details.push(`Additional sections: ${bonusFound.join(", ")}`);
  }

  const status = score >= 15 ? "pass" : score >= 10 ? "warning" : "fail";
  return { name: "Section Structure", score, maxScore, status, details };
}

function checkExperienceParsing(text: string): AtsCategory {
  const details: string[] = [];
  let score = 0;
  const maxScore = 20;

  // Date ranges (8 pts) — combine text, numeric, and ISO date patterns
  const textDateRanges = text.match(DATE_RANGE_PATTERN) || [];
  const numericDateRanges = text.match(DATE_RANGE_NUMERIC) || [];
  const isoDateRanges = text.match(DATE_RANGE_ISO) || [];
  const dateRanges = [...textDateRanges, ...numericDateRanges, ...isoDateRanges];
  const yearMentions = text.match(YEAR_PATTERN);

  if (dateRanges.length >= 2) {
    score += 8;
    details.push(`${dateRanges.length} date ranges found — ATS can parse work history timeline`);
  } else if (dateRanges.length === 1) {
    score += 5;
    details.push("1 date range found — add dates to all positions (e.g., 'Jan 2020 - Present')");
  } else if (yearMentions && yearMentions.length >= 2) {
    score += 3;
    details.push("Years found but no clear date ranges — use format like '2020 - 2023'");
  } else {
    details.push("No employment dates detected — ATS cannot determine your work timeline");
  }

  // Bullet points or line breaks suggesting job descriptions (6 pts)
  const bulletPatterns = text.match(/[•●○▪◦‣\-\*]\s+\S/g);
  const newlineDescriptions = text.split("\n").filter((line) => line.trim().length > 30).length;

  if (bulletPatterns && bulletPatterns.length >= 3) {
    score += 6;
    details.push(`${bulletPatterns.length} bullet points found — well-structured descriptions`);
  } else if (newlineDescriptions >= 5) {
    score += 4;
    details.push("Description content found — consider using bullet points for better parsing");
  } else {
    details.push("Few structured descriptions found — use bullet points for each role");
  }

  // Multiple positions indicated (6 pts)
  const positionIndicators = text.split("\n").filter((line) => {
    const trimmed = line.trim();
    return trimmed.length > 5 && trimmed.length < 80 && /[A-Z]/.test(trimmed[0]);
  }).length;

  if (positionIndicators >= 6) {
    score += 6;
    details.push("Multiple position entries detected");
  } else if (positionIndicators >= 3) {
    score += 4;
    details.push("Some position entries detected");
  } else {
    score += 1;
    details.push("Few distinct entries — ensure each role has a title line");
  }

  const status = score >= 15 ? "pass" : score >= 10 ? "warning" : "fail";
  return { name: "Experience Parsing", score, maxScore, status, details };
}

function checkFormattingQuality(text: string): AtsCategory {
  const details: string[] = [];
  let score = 0;
  const maxScore = 15;

  // No excessively long paragraphs (5 pts) — ATS prefers bullet points
  const paragraphs = text.split(/\n\s*\n/);
  const longParagraphs = paragraphs.filter((p) => p.length > 500).length;

  if (longParagraphs === 0) {
    score += 5;
    details.push("No long text blocks — content is well-broken into sections");
  } else if (longParagraphs <= 2) {
    score += 3;
    details.push(`${longParagraphs} long text block(s) — break into shorter bullet points`);
  } else {
    details.push("Multiple long text blocks — ATS may struggle to parse dense paragraphs");
  }

  // Content length is reasonable (5 pts)
  if (text.length >= 500 && text.length <= 8000) {
    score += 5;
    details.push("Content length is appropriate for a resume");
  } else if (text.length < 500) {
    score += 2;
    details.push("Resume is very short — add more detail to improve parsing");
  } else {
    score += 3;
    details.push("Resume is quite long — consider condensing for better ATS processing");
  }

  // No story/ebook indicators (5 pts)
  const storyIndicators = [
    /\bchapter\s*\d+\b/i,
    /\bonce upon a time\b/i,
    /\bprologue\b/i,
    /\bepilogue\b/i,
  ];

  const hasStoryContent = storyIndicators.some((p) => p.test(text));
  if (!hasStoryContent) {
    score += 5;
    details.push("Document structure matches resume format");
  } else {
    details.push("Document contains non-resume content indicators");
  }

  const status = score >= 12 ? "pass" : score >= 7 ? "warning" : "fail";
  return { name: "Formatting Quality", score, maxScore, status, details };
}

function checkSkillsAndKeywords(text: string): AtsCategory {
  const details: string[] = [];
  let score = 0;
  const maxScore = 10;

  // Action verbs (4 pts)
  const lowerText = text.toLowerCase();
  const foundVerbs = ACTION_VERBS.filter((v) => lowerText.includes(v));

  if (foundVerbs.length >= 5) {
    score += 4;
    details.push(`${foundVerbs.length} action verbs found — strong achievement language`);
  } else if (foundVerbs.length >= 2) {
    score += 2;
    details.push(`${foundVerbs.length} action verbs — add more (e.g., managed, developed, achieved)`);
  } else {
    details.push("Few action verbs — use words like 'managed', 'developed', 'achieved', 'increased'");
  }

  // Quantified achievements (3 pts)
  const quantified = text.match(QUANTIFIED_PATTERN);
  if (quantified && quantified.length >= 3) {
    score += 3;
    details.push(`${quantified.length} quantified results found — ATS and recruiters value metrics`);
  } else if (quantified && quantified.length >= 1) {
    score += 1;
    details.push("Some numbers found — add more metrics (%, $, team size, etc.)");
  } else {
    details.push("No quantified achievements — add numbers and metrics to stand out");
  }

  // Skills density (3 pts) — check for listed skills (comma, pipe, bullet, or line-separated)
  const commaOrPipeSkills = /[\w.#+/-]+(?:\s+[\w.#+/-]+)*(?:\s*[,|\t]\s*[\w.#+/-]+(?:\s+[\w.#+/-]+)*){3,}/;
  const bulletSkills = text.match(/[•●○▪◦‣\-\*]\s+[\w.#+/][\w\s.#+/-]{1,40}/g);
  // Detect line-separated skills after a "Skills" heading (most common resume builder format)
  const skillsSectionMatch = text.match(/\b(?:skills?|habilidades|competencias|comp[eé]tences|f[aä]higkeiten|kenntnisse)\b.*\n([\s\S]*?)(?=\n\s*(?:experience|education|interests?|languages?|certifications?|projects?|experiencia|educaci[oó]n|intereses|idiomas|certificaciones|proyectos|exp[eé]rience|formation|int[eé]r[eê]ts|langues|projets|erfahrung|bildung|interessen|sprachen|projekte|$))/i);
  const lineSkillsCount = skillsSectionMatch
    ? skillsSectionMatch[1].split("\n").filter((l) => l.trim().length > 0 && l.trim().length <= 40).length
    : 0;
  const hasSkillsList = commaOrPipeSkills.test(text) || (bulletSkills && bulletSkills.length >= 4) || lineSkillsCount >= 3;
  if (hasSkillsList) {
    score += 3;
    details.push("Skills list detected — ATS can extract individual skills");
  } else {
    details.push("No clear skills list — list skills using commas, bullets, or a dedicated Skills section");
  }

  const status = score >= 8 ? "pass" : score >= 4 ? "warning" : "fail";
  return { name: "Skills & Keywords", score, maxScore, status, details };
}

// ── Recommendations Generator ──────────────────────────

function generateRecommendations(categories: AtsCategory[]): string[] {
  const recommendations: string[] = [];

  for (const cat of categories) {
    if (cat.status === "fail") {
      switch (cat.name) {
        case "Text Extractability":
          recommendations.push("Your resume may be image-based or scanned. Use a text-based PDF or DOCX format so ATS can read it.");
          break;
        case "Contact Information":
          recommendations.push("Add a clear email address and phone number at the top of your resume. Include your LinkedIn profile URL.");
          break;
        case "Section Structure":
          recommendations.push("Use standard section headings: 'Experience', 'Education', 'Skills'. ATS systems look for these exact words.");
          break;
        case "Experience Parsing":
          recommendations.push("Add date ranges to all positions (e.g., 'Jan 2020 - Dec 2023'). Use bullet points for job descriptions.");
          break;
        case "Formatting Quality":
          recommendations.push("Break long paragraphs into bullet points. Keep your resume to 1-2 pages for optimal ATS processing.");
          break;
        case "Skills & Keywords":
          recommendations.push("Add a dedicated Skills section with comma-separated skills. Use action verbs and include metrics in your achievements.");
          break;
      }
    } else if (cat.status === "warning") {
      switch (cat.name) {
        case "Contact Information":
          recommendations.push("Consider adding LinkedIn or a portfolio link to strengthen your contact section.");
          break;
        case "Section Structure":
          recommendations.push("Add a professional summary section at the top of your resume.");
          break;
        case "Experience Parsing":
          recommendations.push("Ensure all positions have clear date ranges and bullet-pointed descriptions.");
          break;
        case "Skills & Keywords":
          recommendations.push("Add more quantified achievements with numbers, percentages, and dollar amounts.");
          break;
      }
    }
  }

  // Always add a positive recommendation if score is decent
  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
  if (totalScore >= 80) {
    recommendations.unshift("Your resume is well-optimized for ATS systems. Keep it updated with your latest achievements.");
  } else if (totalScore >= 60) {
    recommendations.push("Your resume has a good foundation. Address the items above to improve your ATS compatibility.");
  }

  return recommendations;
}

// ── Main Check Function ────────────────────────────────

export async function checkAtsCompatibility(
  buffer: Buffer,
  mimeType: string
): Promise<AtsCheckResult> {
  let text: string;
  let pageCount: number | undefined;

  // Extract text
  if (mimeType === "application/pdf") {
    // Use pdf-parse directly for page count access
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    text = normalizeSpacedHeaders(result.text);
    pageCount = result.total;
    await parser.destroy();
  } else if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    text = normalizeSpacedHeaders(await extractTextFromDocx(buffer));
  } else {
    return {
      score: 0,
      categories: [],
      recommendations: ["Unsupported file type. Please upload a PDF or DOCX file."],
    };
  }

  // If no text extracted at all
  if (!text || text.trim().length < 10) {
    return {
      score: 0,
      categories: [
        {
          name: "Text Extractability",
          score: 0,
          maxScore: 15,
          status: "fail",
          details: ["Could not extract any text from the file. It may be image-based, scanned, or corrupted."],
        },
      ],
      recommendations: [
        "Your file appears to be image-based or empty. ATS systems cannot read image-based PDFs.",
        "Recreate your resume using a word processor and save as PDF or DOCX.",
      ],
      pageCount,
    };
  }

  // Run all category checks
  const categories: AtsCategory[] = [
    checkTextExtractability(text, pageCount),
    checkContactInfo(text),
    checkSectionStructure(text),
    checkExperienceParsing(text),
    checkFormattingQuality(text),
    checkSkillsAndKeywords(text),
  ];

  const score = categories.reduce((sum, c) => sum + c.score, 0);
  const recommendations = generateRecommendations(categories);

  return { score, categories, recommendations, pageCount };
}
