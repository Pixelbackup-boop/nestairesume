import mammoth from "mammoth";
import OpenAI from "openai";
import { config } from "../config/env";
import logger from "../lib/logger";

// Initialize AI client (DeepSeek or OpenAI)
// DeepSeek uses OpenAI-compatible API
const aiClient = config.deepseekApiKey
  ? new OpenAI({
      apiKey: config.deepseekApiKey,
      baseURL: "https://api.deepseek.com"
    })
  : config.openaiApiKey
  ? new OpenAI({ apiKey: config.openaiApiKey })
  : null;

// Resume data interfaces (matching frontend ResumeData)
interface Experience {
  id: string;
  title: string;
  company: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
  level: number;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

interface ParsedResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    summary: string;
    jobTitle: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
}

export interface ParseResult {
  success: boolean;
  data?: Partial<ParsedResumeData>;
  warnings?: string[];
  rawText?: string;
  isLinkedIn?: boolean;
  error?: string;
}

// Generate unique IDs for array items
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Extract text from PDF buffer using pdf-parse v2 API
export const extractTextFromPdf = async (buffer: Buffer): Promise<string> => {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  return result.text;
};

// Extract text from DOCX buffer
export const extractTextFromDocx = async (buffer: Buffer): Promise<string> => {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
};

// Detect if PDF is from LinkedIn
export const detectLinkedInPdf = (text: string): boolean => {
  const linkedInIndicators = [
    "linkedin.com",
    "LinkedIn",
    "Page 1 of",
    "Contact",
    "Top Skills",
    "Experience",
    "Education",
    "Certifications",
  ];

  let matches = 0;
  for (const indicator of linkedInIndicators) {
    if (text.toLowerCase().includes(indicator.toLowerCase())) {
      matches++;
    }
  }

  return matches >= 4;
};

// Map language string to proficiency level
const mapProficiency = (prof: string): { proficiency: Language['proficiency']; level: number } => {
  const lower = prof.toLowerCase();
  if (lower.includes('native') || lower.includes('mother')) {
    return { proficiency: 'native', level: 100 };
  }
  if (lower.includes('fluent') || lower.includes('proficient')) {
    return { proficiency: 'fluent', level: 90 };
  }
  if (lower.includes('advanced')) {
    return { proficiency: 'advanced', level: 75 };
  }
  if (lower.includes('intermediate') || lower.includes('conversational')) {
    return { proficiency: 'intermediate', level: 50 };
  }
  return { proficiency: 'basic', level: 25 };
};

// AI prompt for enhanced resume generation
const buildEnhancementPrompt = (extractedText: string, locale: string): string => {
  const languageInstructions = locale === 'ar'
    ? 'Generate ALL content in Arabic. Use professional Arabic language.'
    : locale === 'es'
    ? 'Generate ALL content in Spanish. Use professional Spanish language.'
    : locale === 'fr'
    ? 'Generate ALL content in French. Use professional French language.'
    : locale === 'de'
    ? 'Generate ALL content in German. Use professional German language.'
    : 'Generate ALL content in English. Use professional English language.';

  return `You are a professional resume writer. Analyze the following extracted resume text and generate an enhanced, polished professional resume.

${languageInstructions}

EXTRACTED RESUME TEXT:
${extractedText}

TASK: Create an enhanced resume JSON with the following structure:

{
  "personalInfo": {
    "fullName": "Extract exact name from resume",
    "email": "Extract email if found, empty string if not",
    "phone": "Extract phone if found, empty string if not",
    "location": "Extract city/location if found, empty string if not",
    "website": "Extract website if found, empty string if not",
    "linkedin": "Extract LinkedIn URL if found, empty string if not",
    "summary": "Write a compelling 2-3 sentence professional summary based on their experience",
    "jobTitle": "Infer primary job title from most recent experience"
  },
  "experience": [
    {
      "id": "unique_id",
      "title": "Job title",
      "company": "Company name",
      "city": "City if mentioned",
      "country": "Country if mentioned",
      "startDate": "YYYY-MM format",
      "endDate": "YYYY-MM format or empty for current",
      "current": true/false,
      "description": "ENHANCE the job description with impactful achievements, action verbs, and metrics where reasonable"
    }
  ],
  "education": [
    {
      "id": "unique_id",
      "school": "School name",
      "degree": "Degree and field of study",
      "city": "City if mentioned",
      "country": "Country if mentioned",
      "startDate": "YYYY-MM format",
      "endDate": "YYYY-MM format",
      "current": false,
      "description": "Relevant coursework or achievements if mentioned"
    }
  ],
  "skills": [
    {
      "id": "unique_id",
      "name": "Skill name",
      "level": 3
    }
  ],
  "languages": [
    {
      "id": "unique_id",
      "name": "Language",
      "proficiency": "native|fluent|advanced|intermediate|basic",
      "level": 50-100
    }
  ],
  "certifications": [
    {
      "id": "unique_id",
      "name": "Certification name",
      "issuer": "Issuing organization",
      "date": "YYYY-MM format"
    }
  ]
}

RULES:
1. Use the person's REAL name, companies, schools, dates - DO NOT invent fake data
2. ENHANCE descriptions: make them impactful with action verbs and achievements
3. Add reasonable metrics (e.g., "managed team" → "managed team of 5+")
4. Skill levels 1-5 (estimate based on experience context)
5. Dates in YYYY-MM format (e.g., "2023-01")
6. For current jobs: endDate should be empty string, current should be true
7. Most recent experience first
8. Generate unique IDs for each array item (8-character alphanumeric)
9. If information is not found, use empty string "" - never null
10. Include skills mentioned in job descriptions + related skills for the role

OUTPUT: Return ONLY valid JSON, no explanations or markdown.`;
};

// Generate enhanced resume using AI
export const generateEnhancedResume = async (
  extractedText: string,
  locale: string = 'en'
): Promise<ParseResult> => {
  if (!aiClient) {
    return {
      success: false,
      error: "AI API key not configured (set DEEPSEEK_API_KEY or OPENAI_API_KEY)",
      rawText: extractedText,
    };
  }

  try {
    const prompt = buildEnhancementPrompt(extractedText, locale);

    // Use deepseek-chat model if DeepSeek, otherwise gpt-4o-mini
    const model = config.deepseekApiKey ? "deepseek-chat" : "gpt-4o-mini";

    const response = await aiClient.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a professional resume parser and enhancer. Output only valid JSON without markdown code blocks.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3, // Lower temperature for more consistent parsing
      max_tokens: 8000,
    });

    const responseText = response.choices[0]?.message?.content || "";

    // Parse JSON response
    let resumeData: ParsedResumeData;
    try {
      // Clean response - remove potential markdown code blocks
      let cleanJson = responseText.trim();
      if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.slice(7);
      }
      if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.slice(3);
      }
      if (cleanJson.endsWith("```")) {
        cleanJson = cleanJson.slice(0, -3);
      }

      resumeData = JSON.parse(cleanJson.trim());
    } catch (parseError) {
      logger.error({ responseText }, 'Failed to parse AI response');
      return {
        success: false,
        error: "Failed to parse AI-generated resume data",
        rawText: extractedText,
      };
    }

    // Validate and add missing IDs
    const warnings: string[] = [];

    // Ensure all arrays have IDs
    if (resumeData.experience) {
      resumeData.experience = resumeData.experience.map((exp) => ({
        ...exp,
        id: exp.id || generateId(),
        city: exp.city || '',
        country: exp.country || '',
        current: exp.current || !exp.endDate,
      }));
    } else {
      resumeData.experience = [];
      warnings.push("No work experience found");
    }

    if (resumeData.education) {
      resumeData.education = resumeData.education.map((edu) => ({
        ...edu,
        id: edu.id || generateId(),
        city: edu.city || '',
        country: edu.country || '',
        current: edu.current || false,
      }));
    } else {
      resumeData.education = [];
    }

    if (resumeData.skills) {
      resumeData.skills = resumeData.skills.map((skill) => ({
        ...skill,
        id: skill.id || generateId(),
        level: Math.min(5, Math.max(1, skill.level || 3)),
      }));
    } else {
      resumeData.skills = [];
      warnings.push("No skills found");
    }

    if (resumeData.languages) {
      resumeData.languages = resumeData.languages.map((lang) => {
        const mapped = mapProficiency(lang.proficiency || 'intermediate');
        return {
          ...lang,
          id: lang.id || generateId(),
          proficiency: mapped.proficiency,
          level: lang.level || mapped.level,
        };
      });
    } else {
      resumeData.languages = [];
    }

    if (resumeData.certifications) {
      resumeData.certifications = resumeData.certifications.map((cert) => ({
        ...cert,
        id: cert.id || generateId(),
      }));
    } else {
      resumeData.certifications = [];
    }

    // Validate personal info
    if (!resumeData.personalInfo?.fullName) {
      warnings.push("Could not detect name");
    }
    if (!resumeData.personalInfo?.email) {
      warnings.push("Could not detect email");
    }

    return {
      success: true,
      data: resumeData,
      warnings: warnings.length > 0 ? warnings : undefined,
      isLinkedIn: detectLinkedInPdf(extractedText),
    };
  } catch (error) {
    logger.error({ err: error }, 'AI enhancement error');
    return {
      success: false,
      error: error instanceof Error ? error.message : "AI processing failed",
      rawText: extractedText,
    };
  }
};

// Content limits to prevent abuse (ebook uploads, etc.)
const MAX_PAGES = 5; // Resumes are typically 1-3 pages, max 5 for executives
const MAX_TEXT_LENGTH = 15000; // ~3000 chars/page × 5 pages
const MIN_TEXT_LENGTH = 50;

// Resume detection - check if content looks like a resume vs. story/ebook
const looksLikeResume = (text: string): { isResume: boolean; confidence: number; reason?: string } => {
  const lowerText = text.toLowerCase();
  let score = 0;

  // Resume section headers (strong indicators)
  const sectionHeaders = [
    /\b(work\s*)?experience\b/i,
    /\beducation\b/i,
    /\bskills?\b/i,
    /\bemployment(\s*history)?\b/i,
    /\bprofessional\s*(summary|profile|experience)\b/i,
    /\bwork\s*history\b/i,
    /\bqualifications?\b/i,
    /\bcertifications?\b/i,
    /\bcareer\s*(objective|summary)\b/i,
    /\bcontact(\s*info(rmation)?)?\b/i,
  ];

  for (const pattern of sectionHeaders) {
    if (pattern.test(lowerText)) score += 15;
  }

  // Contact information patterns (strong indicators)
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phonePattern = /(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;
  const linkedinPattern = /linkedin\.com/i;

  if (emailPattern.test(text)) score += 20;
  if (phonePattern.test(text)) score += 15;
  if (linkedinPattern.test(text)) score += 15;

  // Date ranges typical in resumes (2020 - 2023, Jan 2020 - Present)
  const dateRangePattern = /\b(19|20)\d{2}\s*[-–—to]\s*((19|20)\d{2}|present|current|now)\b/i;
  const dateMatches = text.match(new RegExp(dateRangePattern, 'gi'));
  if (dateMatches) score += Math.min(dateMatches.length * 10, 30);

  // Job action verbs (moderate indicators)
  const actionVerbs = [
    'managed', 'developed', 'led', 'created', 'implemented', 'designed',
    'achieved', 'increased', 'reduced', 'improved', 'coordinated', 'supervised',
    'responsible for', 'collaborated', 'delivered', 'maintained', 'analyzed'
  ];

  let actionVerbCount = 0;
  for (const verb of actionVerbs) {
    if (lowerText.includes(verb)) actionVerbCount++;
  }
  score += Math.min(actionVerbCount * 3, 20);

  // Story/ebook indicators (negative score)
  const storyIndicators = [
    /\bchapter\s*\d+\b/i,
    /\bonce upon a time\b/i,
    /\bthe end\b/i,
    /\bprologue\b/i,
    /\bepilogue\b/i,
    /\bpart\s*(one|two|three|i|ii|iii|\d+)\b/i,
    /[""][^""]{100,}[""]/, // Long quoted dialogue
  ];

  for (const pattern of storyIndicators) {
    if (pattern.test(text)) score -= 30;
  }

  // Very long paragraphs suggest narrative text, not resume bullets
  const paragraphs = text.split(/\n\s*\n/);
  const longParagraphs = paragraphs.filter(p => p.length > 500).length;
  if (longParagraphs > 3) score -= 20;

  // Determine confidence and result
  const confidence = Math.max(0, Math.min(100, score));

  if (score >= 40) {
    return { isResume: true, confidence };
  } else if (score >= 20) {
    return { isResume: true, confidence, reason: "This might not be a standard resume format" };
  } else {
    return {
      isResume: false,
      confidence,
      reason: "This doesn't look like a resume. Please upload a CV/resume with your work experience, education, and skills."
    };
  }
};

// Main parsing function
export const parseResume = async (
  buffer: Buffer,
  mimeType: string,
  locale: string = 'en'
): Promise<ParseResult> => {
  try {
    // Extract text based on file type
    let extractedText: string;
    let pageCount: number | undefined;

    if (mimeType === "application/pdf") {
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      extractedText = result.text;
      pageCount = result.total;
      await parser.destroy();

      // Check page count for PDFs
      if (pageCount && pageCount > MAX_PAGES) {
        return {
          success: false,
          error: `This file has ${pageCount} pages. Please upload a resume (max ${MAX_PAGES} pages). This doesn't look like a CV.`,
        };
      }
    } else if (
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await extractTextFromDocx(buffer);
    } else {
      return {
        success: false,
        error: "Unsupported file type. Please upload PDF or DOCX.",
      };
    }

    // Check minimum content
    if (!extractedText || extractedText.trim().length < MIN_TEXT_LENGTH) {
      return {
        success: false,
        error: "Could not extract text from file. The file may be empty or image-based.",
        rawText: extractedText,
      };
    }

    // Check maximum content (prevent ebook/large document abuse)
    if (extractedText.length > MAX_TEXT_LENGTH) {
      // For slightly over limit, truncate with warning
      if (extractedText.length < MAX_TEXT_LENGTH * 2) {
        logger.info({ originalLength: extractedText.length, truncatedTo: MAX_TEXT_LENGTH }, 'Text truncated');
        extractedText = extractedText.substring(0, MAX_TEXT_LENGTH);
      } else {
        // Way too long - reject outright
        return {
          success: false,
          error: `This document is too long (${Math.round(extractedText.length / 1000)}K chars). Please upload a resume, not an ebook or large document.`,
        };
      }
    }

    // Check if content looks like a resume (not a story/ebook/other document)
    const resumeCheck = looksLikeResume(extractedText);
    if (!resumeCheck.isResume) {
      return {
        success: false,
        error: resumeCheck.reason || "This doesn't look like a resume. Please upload a CV/resume.",
      };
    }

    // Log if low confidence but still proceeding
    if (resumeCheck.confidence < 40 && resumeCheck.reason) {
      logger.info({ confidence: resumeCheck.confidence, reason: resumeCheck.reason }, 'Low confidence resume detection');
    }

    // Generate enhanced resume
    return await generateEnhancedResume(extractedText, locale);
  } catch (error) {
    logger.error({ err: error }, 'Resume parsing error');
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to parse resume",
    };
  }
};
