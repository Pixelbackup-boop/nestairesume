"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getResumes = exports.createResume = exports.transformDbToResume = exports.getTemplates = void 0;
const database_1 = __importDefault(require("../config/database"));
const types_1 = require("../types");
// Generate all template combinations
const getTemplates = () => {
    const templates = [];
    let id = 1;
    for (const layout of types_1.LAYOUTS) {
        for (const theme of types_1.THEMES) {
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
exports.getTemplates = getTemplates;
const parseJsonField = (field) => {
    if (!field)
        return undefined;
    try {
        return JSON.parse(field);
    }
    catch {
        return undefined;
    }
};
const stringifyJsonField = (data) => {
    if (!data)
        return undefined;
    return JSON.stringify(data);
};
const transformDbToResume = (dbResume) => {
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
exports.transformDbToResume = transformDbToResume;
const createResume = async (userId, data) => {
    const resume = await database_1.default.resume.create({
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
    return (0, exports.transformDbToResume)(resume);
};
exports.createResume = createResume;
const getResumes = async (userId, skip = 0, limit = 20) => {
    const resumes = await database_1.default.resume.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
    });
    return resumes.map(exports.transformDbToResume);
};
exports.getResumes = getResumes;
const getResumeById = async (resumeId, userId) => {
    const resume = await database_1.default.resume.findFirst({
        where: { id: resumeId, userId },
    });
    if (!resume)
        return null;
    return (0, exports.transformDbToResume)(resume);
};
exports.getResumeById = getResumeById;
const updateResume = async (resumeId, userId, data) => {
    // First check if resume exists and belongs to user
    const existing = await database_1.default.resume.findFirst({
        where: { id: resumeId, userId },
    });
    if (!existing)
        return null;
    const resume = await database_1.default.resume.update({
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
    return (0, exports.transformDbToResume)(resume);
};
exports.updateResume = updateResume;
const deleteResume = async (resumeId, userId) => {
    const existing = await database_1.default.resume.findFirst({
        where: { id: resumeId, userId },
    });
    if (!existing)
        return false;
    await database_1.default.resume.delete({ where: { id: resumeId } });
    return true;
};
exports.deleteResume = deleteResume;
//# sourceMappingURL=resumeService.js.map