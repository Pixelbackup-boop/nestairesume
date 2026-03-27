import prisma from "../config/database";
import { Prisma } from "@prisma/client";
import { ResumeData, TemplateInfo, LAYOUTS, THEMES } from "../types";

type JsonResume = Prisma.ResumeGetPayload<object>;

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

export const transformDbToResume = (dbResume: JsonResume): ResumeData & { createdAt: Date; updatedAt: Date } => {
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
    experiences: (dbResume.experiences ?? undefined) as ResumeData['experiences'],
    education: (dbResume.education ?? undefined) as ResumeData['education'],
    skills: (dbResume.skills ?? undefined) as ResumeData['skills'],
    certifications: (dbResume.certifications ?? undefined) as ResumeData['certifications'],
    projects: (dbResume.projects ?? undefined) as ResumeData['projects'],
    languages: (dbResume.languages ?? undefined) as ResumeData['languages'],
    templateLayout: dbResume.templateLayout,
    templateTheme: dbResume.templateTheme,
    customThemeColor: dbResume.customThemeColor || undefined,
    atsScore: dbResume.atsScore || undefined,
    isMaster: dbResume.isMaster,
    createdAt: dbResume.createdAt,
    updatedAt: dbResume.updatedAt,
  };
};

export const createResume = async (userId: string, data: ResumeData, tx?: Prisma.TransactionClient) => {
  const db = tx ?? prisma;
  const resume = await db.resume.create({
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
      experiences: (data.experiences ?? undefined) as Prisma.InputJsonValue | undefined,
      education: (data.education ?? undefined) as Prisma.InputJsonValue | undefined,
      skills: (data.skills ?? undefined) as Prisma.InputJsonValue | undefined,
      certifications: (data.certifications ?? undefined) as Prisma.InputJsonValue | undefined,
      projects: (data.projects ?? undefined) as Prisma.InputJsonValue | undefined,
      languages: (data.languages ?? undefined) as Prisma.InputJsonValue | undefined,
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
      ...(data.experiences !== undefined && { experiences: data.experiences as unknown as Prisma.InputJsonValue }),
      ...(data.education !== undefined && { education: data.education as unknown as Prisma.InputJsonValue }),
      ...(data.skills !== undefined && { skills: data.skills as unknown as Prisma.InputJsonValue }),
      ...(data.certifications !== undefined && { certifications: data.certifications as unknown as Prisma.InputJsonValue }),
      ...(data.projects !== undefined && { projects: data.projects as unknown as Prisma.InputJsonValue }),
      ...(data.languages !== undefined && { languages: data.languages as unknown as Prisma.InputJsonValue }),
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
