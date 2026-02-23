"use strict";
/**
 * AI Content Service
 * Handles content improvement and cover letter generation using DeepSeek API
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.improveContent = improveContent;
exports.generateCoverLetter = generateCoverLetter;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../config/env");
// Initialize AI client (DeepSeek uses OpenAI-compatible API)
const aiClient = env_1.config.deepseekApiKey
    ? new openai_1.default({
        apiKey: env_1.config.deepseekApiKey,
        baseURL: "https://api.deepseek.com",
    })
    : env_1.config.openaiApiKey
        ? new openai_1.default({ apiKey: env_1.config.openaiApiKey })
        : null;
if (!aiClient) {
    console.warn("⚠️  No AI API key configured. AI features will be unavailable.");
}
/**
 * Improve resume experience/description content using AI
 */
async function improveContent(content) {
    if (!aiClient) {
        throw new Error("AI service not configured");
    }
    if (!content || content.trim().length === 0) {
        throw new Error("Content is required");
    }
    const response = await aiClient.chat.completions.create({
        model: "deepseek-chat",
        messages: [
            {
                role: "system",
                content: `You are a professional resume writer with expertise in crafting impactful, ATS-friendly content.
Your task is to improve the given experience description.

Guidelines:
- Use strong action verbs (Led, Developed, Implemented, Achieved, Optimized)
- Add quantifiable metrics where possible (%, $, numbers)
- Keep it concise - 2-4 bullet points
- Professional tone
- Focus on achievements and impact, not just duties
- Each bullet should start with a strong verb
- Format as bullet points using • character

Return ONLY the improved content, no explanations.`,
            },
            {
                role: "user",
                content: `Improve this experience description:\n\n${content}`,
            },
        ],
        temperature: 0.7,
        max_tokens: 500,
    });
    const improvedContent = response.choices[0]?.message?.content?.trim();
    if (!improvedContent) {
        throw new Error("Failed to generate improved content");
    }
    return improvedContent;
}
/**
 * Generate a personalized cover letter using AI
 */
async function generateCoverLetter(input) {
    if (!aiClient) {
        throw new Error("AI service not configured");
    }
    const { fullName, jobTitle, companyName, hiringManagerName, skills, experience, tone } = input;
    const toneDescriptions = {
        professional: "formal, business-oriented, and polished",
        friendly: "warm, approachable, and personable while remaining professional",
        confident: "assertive, self-assured, and highlighting accomplishments boldly",
        enthusiastic: "energetic, passionate, and showing genuine excitement",
    };
    const response = await aiClient.chat.completions.create({
        model: "deepseek-chat",
        messages: [
            {
                role: "system",
                content: `You are an expert cover letter writer with years of experience helping candidates land their dream jobs.
Write compelling, personalized cover letters that stand out.

Guidelines:
- Write in a ${toneDescriptions[tone]} tone
- 3-4 paragraphs
- Opening: Hook the reader, mention the specific position
- Middle: Highlight relevant skills and experience with specific examples
- Closing: Express enthusiasm, include call to action
- Keep it under 400 words
- No generic phrases like "I am writing to apply"
- Make it feel personal and genuine

Return ONLY the cover letter text, properly formatted with paragraphs.`,
            },
            {
                role: "user",
                content: `Write a cover letter for:
Name: ${fullName}
Position: ${jobTitle}
Company: ${companyName}
Hiring Manager: ${hiringManagerName || "Hiring Manager"}
${skills ? `Key Skills: ${skills}` : ""}
${experience ? `Experience Summary: ${experience}` : ""}`,
            },
        ],
        temperature: 0.8,
        max_tokens: 1000,
    });
    const coverLetter = response.choices[0]?.message?.content?.trim();
    if (!coverLetter) {
        throw new Error("Failed to generate cover letter");
    }
    return coverLetter;
}
//# sourceMappingURL=aiContentService.js.map