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
const PHONE_PATTERN = /(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;
const LINKEDIN_PATTERN = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i;
const WEBSITE_PATTERN = /https?:\/\/[^\s]+\.[a-zA-Z]{2,}/;
const DATE_RANGE_PATTERN = /\b(19|20)\d{2}\s*[-–—to]\s*((19|20)\d{2}|present|current|now)\b/gi;
const YEAR_PATTERN = /\b(19|20)\d{2}\b/g;

const SECTION_HEADERS = [
  { pattern: /\b(work\s*)?experience\b/i, name: "Experience" },
  { pattern: /\beducation\b/i, name: "Education" },
  { pattern: /\bskills?\b/i, name: "Skills" },
  { pattern: /\bprofessional\s*(summary|profile|objective)\b/i, name: "Summary" },
  { pattern: /\b(career\s*)?(summary|objective)\b/i, name: "Summary" },
  { pattern: /\bemployment(\s*history)?\b/i, name: "Employment" },
  { pattern: /\bwork\s*history\b/i, name: "Work History" },
  { pattern: /\bqualifications?\b/i, name: "Qualifications" },
  { pattern: /\bcertifications?\b/i, name: "Certifications" },
  { pattern: /\blanguages?\b/i, name: "Languages" },
  { pattern: /\bprojects?\b/i, name: "Projects" },
  { pattern: /\bvolunteer(ing)?\b/i, name: "Volunteer" },
  { pattern: /\breferences?\b/i, name: "References" },
  { pattern: /\bcontact(\s*info(rmation)?)?\b/i, name: "Contact" },
  { pattern: /\bpublications?\b/i, name: "Publications" },
  { pattern: /\bawards?\b/i, name: "Awards" },
];

const ACTION_VERBS = [
  "managed", "developed", "led", "created", "implemented", "designed",
  "achieved", "increased", "reduced", "improved", "coordinated", "supervised",
  "delivered", "maintained", "analyzed", "established", "launched", "negotiated",
  "streamlined", "optimized", "resolved", "collaborated", "trained", "mentored",
  "generated", "exceeded", "transformed", "initiated", "spearheaded", "orchestrated",
];

const QUANTIFIED_PATTERN = /\b\d+[%+]?\b|\$[\d,.]+|\b\d+\s*(percent|%|million|billion|thousand|k\b|employees?|clients?|customers?|users?|teams?|projects?|years?)/gi;

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

  // Name detection — check first few lines for a name-like pattern (3 pts)
  const firstLines = text.split("\n").slice(0, 5).join(" ");
  const namePattern = /^[A-Z][a-z]+\s+[A-Z][a-z]+/;
  if (namePattern.test(firstLines.trim())) {
    score += 3;
    details.push("Name detected at top of resume");
  } else {
    details.push("Name not clearly detected at top — ensure your full name is the first line");
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

  // Date ranges (8 pts)
  const dateRanges = text.match(DATE_RANGE_PATTERN);
  const yearMentions = text.match(YEAR_PATTERN);

  if (dateRanges && dateRanges.length >= 2) {
    score += 8;
    details.push(`${dateRanges.length} date ranges found — ATS can parse work history timeline`);
  } else if (dateRanges && dateRanges.length === 1) {
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

  // Skills density (3 pts) — check for comma-separated or listed skills
  const skillsListPattern = /[a-zA-Z+#]+(?:\s*[,|•]\s*[a-zA-Z+#]+){3,}/;
  if (skillsListPattern.test(text)) {
    score += 3;
    details.push("Skills list detected — ATS can extract individual skills");
  } else {
    details.push("No clear skills list — use comma-separated skills for better ATS parsing");
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
    text = result.text;
    pageCount = result.total;
    await parser.destroy();
  } else if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    text = await extractTextFromDocx(buffer);
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
