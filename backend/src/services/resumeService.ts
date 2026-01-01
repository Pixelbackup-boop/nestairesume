import prisma from "../config/database";
import { ResumeData, TemplateInfo, LAYOUTS, THEMES } from "../types";

// Generate all template combinations
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
        isPremium: layout === "CREATIVE" || theme === "PURPLE",
        previewUrl: `/templates/${layout.toLowerCase()}-${theme.toLowerCase()}.png`,
      });
      id++;
    }
  }

  return templates;
};

const parseJsonField = <T>(field: string | null): T | undefined => {
  if (!field) return undefined;
  try {
    return JSON.parse(field) as T;
  } catch {
    return undefined;
  }
};

const stringifyJsonField = <T>(data: T | undefined): string | undefined => {
  if (!data) return undefined;
  return JSON.stringify(data);
};

export const transformDbToResume = (dbResume: {
  id: string;
  userId: string;
  title: string;
  targetRole: string | null;
  targetCompany: string | null;
  fullName: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  summary: string | null;
  experiences: string | null;
  education: string | null;
  skills: string | null;
  certifications: string | null;
  projects: string | null;
  languages: string | null;
  templateLayout: string;
  templateTheme: string;
  customThemeColor: string | null;
  atsScore: number | null;
  isMaster: boolean;
  createdAt: Date;
  updatedAt: Date;
}): ResumeData & { createdAt: Date; updatedAt: Date } => {
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
    experiences: parseJsonField(dbResume.experiences),
    education: parseJsonField(dbResume.education),
    skills: parseJsonField(dbResume.skills),
    certifications: parseJsonField(dbResume.certifications),
    projects: parseJsonField(dbResume.projects),
    languages: parseJsonField(dbResume.languages),
    templateLayout: dbResume.templateLayout,
    templateTheme: dbResume.templateTheme,
    customThemeColor: dbResume.customThemeColor || undefined,
    atsScore: dbResume.atsScore || undefined,
    isMaster: dbResume.isMaster,
    createdAt: dbResume.createdAt,
    updatedAt: dbResume.updatedAt,
  };
};

export const createResume = async (userId: string, data: ResumeData) => {
  const resume = await prisma.resume.create({
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
      experiences: stringifyJsonField(data.experiences),
      education: stringifyJsonField(data.education),
      skills: stringifyJsonField(data.skills),
      certifications: stringifyJsonField(data.certifications),
      projects: stringifyJsonField(data.projects),
      languages: stringifyJsonField(data.languages),
      templateLayout: data.templateLayout || "CLASSIC",
      templateTheme: data.templateTheme || "NAVY",
      customThemeColor: data.customThemeColor,
      atsScore: data.atsScore,
      isMaster: data.isMaster || false,
    },
  });

  return transformDbToResume(resume);
};

export const getResumes = async (userId: string, skip = 0, limit = 20) => {
  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });

  return resumes.map(transformDbToResume);
};

export const getResumeById = async (resumeId: string, userId: string) => {
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
  });

  if (!resume) return null;
  return transformDbToResume(resume);
};

export const updateResume = async (resumeId: string, userId: string, data: Partial<ResumeData>) => {
  // First check if resume exists and belongs to user
  const existing = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
  });

  if (!existing) return null;

  const resume = await prisma.resume.update({
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
      ...(data.experiences !== undefined && { experiences: stringifyJsonField(data.experiences) }),
      ...(data.education !== undefined && { education: stringifyJsonField(data.education) }),
      ...(data.skills !== undefined && { skills: stringifyJsonField(data.skills) }),
      ...(data.certifications !== undefined && { certifications: stringifyJsonField(data.certifications) }),
      ...(data.projects !== undefined && { projects: stringifyJsonField(data.projects) }),
      ...(data.languages !== undefined && { languages: stringifyJsonField(data.languages) }),
      ...(data.templateLayout !== undefined && { templateLayout: data.templateLayout }),
      ...(data.templateTheme !== undefined && { templateTheme: data.templateTheme }),
      ...(data.customThemeColor !== undefined && { customThemeColor: data.customThemeColor }),
      ...(data.atsScore !== undefined && { atsScore: data.atsScore }),
      ...(data.isMaster !== undefined && { isMaster: data.isMaster }),
    },
  });

  return transformDbToResume(resume);
};

export const deleteResume = async (resumeId: string, userId: string) => {
  const existing = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
  });

  if (!existing) return false;

  await prisma.resume.delete({ where: { id: resumeId } });
  return true;
};
