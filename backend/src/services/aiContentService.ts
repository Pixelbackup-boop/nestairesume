/**
 * AI Content Service
 * Handles content improvement and cover letter generation using DeepSeek API
 */

import OpenAI from "openai";
import { config } from "../config/env";
import logger from "../lib/logger";
import { captureError, trackAiCall } from "../lib/sentry";
import { CircuitBreaker } from "../lib/circuitBreaker";
import { withRetry } from "../lib/retry";

/** Shared circuit breaker for all OpenAI/DeepSeek API calls */
export const openaiCircuit = new CircuitBreaker("openai");

// Initialize AI client (DeepSeek uses OpenAI-compatible API)
const aiClient = config.deepseekApiKey
  ? new OpenAI({
      apiKey: config.deepseekApiKey,
      baseURL: "https://api.deepseek.com",
    })
  : config.openaiApiKey
  ? new OpenAI({ apiKey: config.openaiApiKey })
  : null;

if (!aiClient) {
  logger.warn('No AI API key configured, AI features will be unavailable');
}

export interface CoverLetterInput {
  fullName: string;
  email?: string;
  phone?: string;
  jobTitle: string;
  companyName: string;
  hiringManagerName?: string;
  skills?: string;
  experience?: string;
  tone: "professional" | "friendly" | "confident" | "enthusiastic";
}

/**
 * Improve resume experience/description content using AI
 */
export async function improveContent(content: string): Promise<string> {
  if (!aiClient) {
    throw new Error("AI service not configured");
  }

  if (!content || content.trim().length === 0) {
    throw new Error("Content is required");
  }

  const startTime = Date.now();

  try {
    const response = await openaiCircuit.execute(() =>
      withRetry(() =>
        aiClient.chat.completions.create({
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
        })
      )
    );

    const durationMs = Date.now() - startTime;
    const tokensUsed = response.usage?.total_tokens;
    trackAiCall('improveContent', durationMs, true, tokensUsed);

    const improvedContent = response.choices[0]?.message?.content?.trim();

    if (!improvedContent) {
      throw new Error("Failed to generate improved content");
    }

    return improvedContent;
  } catch (error) {
    const durationMs = Date.now() - startTime;
    trackAiCall('improveContent', durationMs, false);
    captureError(error instanceof Error ? error : new Error(String(error)), {
      tags: { service: 'ai', operation: 'improveContent' },
      extra: { contentLength: content.length },
    });
    throw error;
  }
}

/**
 * Generate a personalized cover letter using AI
 */
export async function generateCoverLetter(input: CoverLetterInput): Promise<string> {
  if (!aiClient) {
    throw new Error("AI service not configured");
  }

  const { fullName, jobTitle, companyName, hiringManagerName, skills, experience, tone } = input;

  const toneDescriptions: Record<string, string> = {
    professional: "formal, business-oriented, and polished",
    friendly: "warm, approachable, and personable while remaining professional",
    confident: "assertive, self-assured, and highlighting accomplishments boldly",
    enthusiastic: "energetic, passionate, and showing genuine excitement",
  };

  const startTime = Date.now();

  try {
    const response = await openaiCircuit.execute(() =>
      withRetry(() =>
        aiClient.chat.completions.create({
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
        })
      )
    );

    const durationMs = Date.now() - startTime;
    const tokensUsed = response.usage?.total_tokens;
    trackAiCall('generateCoverLetter', durationMs, true, tokensUsed);

    const coverLetter = response.choices[0]?.message?.content?.trim();

    if (!coverLetter) {
      throw new Error("Failed to generate cover letter");
    }

    return coverLetter;
  } catch (error) {
    const durationMs = Date.now() - startTime;
    trackAiCall('generateCoverLetter', durationMs, false);
    captureError(error instanceof Error ? error : new Error(String(error)), {
      tags: { service: 'ai', operation: 'generateCoverLetter' },
      extra: { jobTitle, companyName, tone },
    });
    throw error;
  }
}
