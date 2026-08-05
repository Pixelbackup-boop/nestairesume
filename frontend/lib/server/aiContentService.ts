/**
 * AI Content Service for the /api/v1/ai routes on Cloudflare Workers.
 *
 * Ported from backend/src/services/aiContentService.ts. The backend used the
 * openai SDK pointed at DeepSeek; on Workers we call DeepSeek's
 * OpenAI-compatible endpoint with plain fetch() — same model, prompts,
 * temperature and max_tokens.
 */
import { getEnv } from './db';

// TODO: circuit breaker + retry — the Express backend wrapped calls in
// CircuitBreaker('openai') and withRetry(); not ported.

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

export interface CoverLetterInput {
  fullName: string;
  email?: string;
  phone?: string;
  jobTitle: string;
  companyName: string;
  hiringManagerName?: string;
  skills?: string;
  experience?: string;
  tone: 'professional' | 'friendly' | 'confident' | 'enthusiastic';
}

interface ChatMessage {
  role: 'system' | 'user';
  content: string;
}

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: string | null } }>;
}

function getDeepseekApiKey(): string {
  let key: string | undefined;
  try {
    key = getEnv().DEEPSEEK_API_KEY;
  } catch {
    // Not running inside a Cloudflare request context (e.g. plain `next dev`)
  }
  return key || process.env.DEEPSEEK_API_KEY || '';
}

async function chatCompletion(
  apiKey: string,
  messages: ChatMessage[],
  temperature: number,
  maxTokens: number
): Promise<string | undefined> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`DeepSeek API error (${response.status}): ${body.slice(0, 200)}`);
  }

  const data = (await response.json()) as ChatCompletionResponse;
  return data.choices?.[0]?.message?.content?.trim() || undefined;
}

/**
 * Improve resume experience/description content using AI.
 * Prompts, temperature and max_tokens match the backend exactly.
 */
export async function improveContent(content: string): Promise<string> {
  const apiKey = getDeepseekApiKey();
  if (!apiKey) {
    throw new Error('AI service not configured');
  }

  if (!content || content.trim().length === 0) {
    throw new Error('Content is required');
  }

  const improvedContent = await chatCompletion(
    apiKey,
    [
      {
        role: 'system',
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
        role: 'user',
        content: `Improve this experience description:\n\n${content}`,
      },
    ],
    0.7,
    500
  );

  if (!improvedContent) {
    throw new Error('Failed to generate improved content');
  }

  return improvedContent;
}

/**
 * Generate a personalized cover letter using AI.
 * Prompts, temperature and max_tokens match the backend exactly.
 */
export async function generateCoverLetter(input: CoverLetterInput): Promise<string> {
  const apiKey = getDeepseekApiKey();
  if (!apiKey) {
    throw new Error('AI service not configured');
  }

  const { fullName, jobTitle, companyName, hiringManagerName, skills, experience, tone } = input;

  const toneDescriptions: Record<string, string> = {
    professional: 'formal, business-oriented, and polished',
    friendly: 'warm, approachable, and personable while remaining professional',
    confident: 'assertive, self-assured, and highlighting accomplishments boldly',
    enthusiastic: 'energetic, passionate, and showing genuine excitement',
  };

  const coverLetter = await chatCompletion(
    apiKey,
    [
      {
        role: 'system',
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
        role: 'user',
        content: `Write a cover letter for:
Name: ${fullName}
Position: ${jobTitle}
Company: ${companyName}
Hiring Manager: ${hiringManagerName || 'Hiring Manager'}
${skills ? `Key Skills: ${skills}` : ''}
${experience ? `Experience Summary: ${experience}` : ''}`,
      },
    ],
    0.8,
    1000
  );

  if (!coverLetter) {
    throw new Error('Failed to generate cover letter');
  }

  return coverLetter;
}
