/**
 * Resume service for the /api/v1/resumes routes on Cloudflare Workers.
 *
 * Ported from backend/src/services/resumeService.ts + backend/src/types/index.ts.
 *
 * D1 difference: the frontend Prisma schema (SQLite) stores resume section
 * columns (experiences, education, skills, certifications, projects, languages)
 * as JSON *strings*, while the Postgres backend used native Json columns.
 * This module stringifies on write and parses on read so the API
 * request/response shapes stay identical to the Express backend.
 */
import type { Prisma, PrismaClient, Resume as DbResume } from '@/lib/generated/prisma/client';

// ==================== Types (from backend/src/types/index.ts) ====================

export interface ExperienceItem {
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface ResumeData {
  id?: string;
  userId?: string;
  title: string;
  targetRole?: string;
  targetCompany?: string;
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  summary?: string;
  experiences?: ExperienceItem[];
  education?: EducationItem[];
  skills?: string[];
  certifications?: string[];
  projects?: ProjectItem[];
  languages?: string[];
  templateLayout?: string;
  templateTheme?: string;
  customThemeColor?: string;
  atsScore?: number;
  isMaster?: boolean;
}

export interface TemplateInfo {
  id: string;
  name: string;
  layout: string;
  theme: string;
  isPremium: boolean;
  previewUrl?: string;
}

export const LAYOUTS = ['CLASSIC', 'SIDEBAR', 'HEADER', 'MINIMAL', 'CREATIVE'] as const;
export const THEMES = ['NAVY', 'TEAL', 'DARK', 'PURPLE'] as const;

/** Prisma client or transaction client — createResume runs inside $transaction. */
type ResumeDbClient = PrismaClient | Prisma.TransactionClient;

// ==================== Templates ====================

// Generate all template combinations (same ids/names/flags as the backend)
export const getTemplates = (): TemplateInfo[] => {
  const templates: TemplateInfo[] = [];
  let id = 1;

  for (const layout of LAYOUTS) {
    for (const theme of THEMES) {
      templates.push({
        id: `template-${id}`,
        name: `${layout.charAt(0) + layout.slice(1).toLowerCase()} ${theme.charAt(0) + theme.slice(1).toLowerCase()}`,
        layout,
        theme,
        isPremium: layout === 'CREATIVE' || theme === 'PURPLE',
        previewUrl: `/templates/${layout.toLowerCase()}-${theme.toLowerCase()}.png`,
      });
      id++;
    }
  }

  return templates;
};

// ==================== JSON string column helpers (D1-specific) ====================

function parseJsonColumn<T>(value: string | null): T | undefined {
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    // Malformed legacy data (e.g. migrated rows) — omit the section rather than 500
    return undefined;
  }
}

/** null/undefined stay unset (column NULL); everything else is stored as a JSON string. */
function toJsonString(value: unknown): string | undefined {
  return value == null ? undefined : JSON.stringify(value);
}

// ==================== Transform (DB row -> API shape) ====================

export const transformDbToResume = (dbResume: DbResume): ResumeData & { createdAt: Date; updatedAt: Date } => {
  return {
    id: dbResume.id,
    userId: dbResume.userId,
    title: dbResume.title,
    targetRole: dbResume.targetRole || undefined,
    targetCompany: dbResume.targetCompany || undefined,
    fullName: dbResume.fullName,
    email: dbResume.email || undefined,
    phone: dbResume.phone || undefined,
    location: dbResume.location || undefined,
    linkedinUrl: dbResume.linkedinUrl || undefined,
    portfolioUrl: dbResume.portfolioUrl || undefined,
    summary: dbResume.summary || undefined,
    experiences: parseJsonColumn<ExperienceItem[]>(dbResume.experiences),
    education: parseJsonColumn<EducationItem[]>(dbResume.education),
    skills: parseJsonColumn<string[]>(dbResume.skills),
    certifications: parseJsonColumn<string[]>(dbResume.certifications),
    projects: parseJsonColumn<ProjectItem[]>(dbResume.projects),
    languages: parseJsonColumn<string[]>(dbResume.languages),
    templateLayout: dbResume.templateLayout,
    templateTheme: dbResume.templateTheme,
    customThemeColor: dbResume.customThemeColor || undefined,
    atsScore: dbResume.atsScore || undefined,
    isMaster: dbResume.isMaster,
    createdAt: dbResume.createdAt,
    updatedAt: dbResume.updatedAt,
  };
};

// ==================== CRUD ====================

/**
 * Returns the un-awaited create query so the caller can run it inside a
 * D1 batch `$transaction([...])` (D1 rejects interactive transactions).
 * Await the result and pass it through transformDbToResume().
 */
export const buildCreateResumeQuery = (db: ResumeDbClient, userId: string, data: ResumeData) => {
  return db.resume.create({
    data: {
      userId,
      title: data.title,
      targetRole: data.targetRole,
      targetCompany: data.targetCompany,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      linkedinUrl: data.linkedinUrl,
      portfolioUrl: data.portfolioUrl,
      summary: data.summary,
      experiences: toJsonString(data.experiences),
      education: toJsonString(data.education),
      skills: toJsonString(data.skills),
      certifications: toJsonString(data.certifications),
      projects: toJsonString(data.projects),
      languages: toJsonString(data.languages),
      templateLayout: data.templateLayout || 'CLASSIC',
      templateTheme: data.templateTheme || 'NAVY',
      customThemeColor: data.customThemeColor,
      atsScore: data.atsScore,
      isMaster: data.isMaster || false,
    },
  });
};

export const getResumes = async (db: PrismaClient, userId: string, skip = 0, limit = 20) => {
  const resumes = await db.resume.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  return resumes.map(transformDbToResume);
};

export const getResumeById = async (db: PrismaClient, resumeId: string, userId: string) => {
  const resume = await db.resume.findFirst({
    where: { id: resumeId, userId },
  });

  if (!resume) return null;
  return transformDbToResume(resume);
};

export const updateResume = async (db: PrismaClient, resumeId: string, userId: string, data: Partial<ResumeData>) => {
  // First check if resume exists and belongs to user
  const existing = await db.resume.findFirst({
    where: { id: resumeId, userId },
  });

  if (!existing) return null;

  const resume = await db.resume.update({
    where: { id: resumeId },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.targetRole !== undefined && { targetRole: data.targetRole }),
      ...(data.targetCompany !== undefined && { targetCompany: data.targetCompany }),
      ...(data.fullName !== undefined && { fullName: data.fullName }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.linkedinUrl !== undefined && { linkedinUrl: data.linkedinUrl }),
      ...(data.portfolioUrl !== undefined && { portfolioUrl: data.portfolioUrl }),
      ...(data.summary !== undefined && { summary: data.summary }),
      ...(data.experiences !== undefined && { experiences: toJsonString(data.experiences) ?? null }),
      ...(data.education !== undefined && { education: toJsonString(data.education) ?? null }),
      ...(data.skills !== undefined && { skills: toJsonString(data.skills) ?? null }),
      ...(data.certifications !== undefined && { certifications: toJsonString(data.certifications) ?? null }),
      ...(data.projects !== undefined && { projects: toJsonString(data.projects) ?? null }),
      ...(data.languages !== undefined && { languages: toJsonString(data.languages) ?? null }),
      ...(data.templateLayout !== undefined && { templateLayout: data.templateLayout }),
      ...(data.templateTheme !== undefined && { templateTheme: data.templateTheme }),
      ...(data.customThemeColor !== undefined && { customThemeColor: data.customThemeColor }),
      ...(data.atsScore !== undefined && { atsScore: data.atsScore }),
      ...(data.isMaster !== undefined && { isMaster: data.isMaster }),
    },
  });

  return transformDbToResume(resume);
};

export const deleteResume = async (db: PrismaClient, resumeId: string, userId: string) => {
  const existing = await db.resume.findFirst({
    where: { id: resumeId, userId },
  });

  if (!existing) return false;

  await db.resume.delete({ where: { id: resumeId } });
  return true;
};
