"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterviewQuestions = generateInterviewQuestions;
exports.evaluateAnswer = evaluateAnswer;
exports.getFallbackQuestions = getFallbackQuestions;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../config/env");
// Initialize AI client (DeepSeek or OpenAI)
const aiClient = env_1.config.deepseekApiKey
    ? new openai_1.default({
        apiKey: env_1.config.deepseekApiKey,
        baseURL: "https://api.deepseek.com"
    })
    : env_1.config.openaiApiKey
        ? new openai_1.default({ apiKey: env_1.config.openaiApiKey })
        : null;
// Generate unique ID
const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
};
/**
 * Generate interview questions based on job title and level
 */
async function generateInterviewQuestions(jobTitle, level, questionCount = 5, locale = 'en') {
    if (!aiClient) {
        throw new Error("AI client not configured. Please set OPENAI_API_KEY or DEEPSEEK_API_KEY.");
    }
    const levelDescriptions = {
        entry: 'entry-level candidates with 0-2 years of experience',
        mid: 'mid-level professionals with 3-7 years of experience',
        senior: 'senior professionals with 8+ years of experience'
    };
    const systemPrompt = `You are an expert interviewer who creates realistic interview questions.
Output ONLY valid JSON without markdown code blocks or any other formatting.
The response must be a JSON array of question objects.`;
    const userPrompt = `Generate ${questionCount} interview questions for a ${jobTitle} position.
Target audience: ${levelDescriptions[level]}
Language: ${locale === 'en' ? 'English' : locale}

Requirements:
- Mix of question types: 2 behavioral (past experience), 1 situational (hypothetical), 1 technical/role-specific, 1 general
- Questions should be specific to the ${jobTitle} role, not generic
- Difficulty should match the ${level} level
- Each question should test different competencies

Output format (JSON array only, no markdown):
[
  {
    "id": "unique-id",
    "text": "The interview question",
    "category": "behavioral|situational|technical|general",
    "difficulty": "${level}"
  }
]`;
    const model = env_1.config.deepseekApiKey ? "deepseek-chat" : "gpt-4o-mini";
    const response = await aiClient.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
    });
    const content = response.choices[0]?.message?.content || "[]";
    // Clean up response (remove markdown code blocks if present)
    const cleanedContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
    try {
        const questions = JSON.parse(cleanedContent);
        // Ensure IDs are set
        return questions.map(q => ({
            ...q,
            id: q.id || generateId()
        }));
    }
    catch {
        console.error("Failed to parse AI response:", cleanedContent);
        throw new Error("Failed to generate interview questions. Please try again.");
    }
}
/**
 * Evaluate a user's answer to an interview question
 */
async function evaluateAnswer(question, userAnswer, jobTitle, locale = 'en') {
    if (!aiClient) {
        throw new Error("AI client not configured. Please set OPENAI_API_KEY or DEEPSEEK_API_KEY.");
    }
    const systemPrompt = `You are an expert interview coach who provides constructive feedback.
Use the STAR method (Situation, Task, Action, Result) as your evaluation framework.
Output ONLY valid JSON without markdown code blocks.`;
    const userPrompt = `Evaluate this interview answer for a ${jobTitle} position.
Language: ${locale === 'en' ? 'English' : locale}

Question: "${question}"

Candidate's Answer: "${userAnswer}"

Evaluate based on:
1. Did they use the STAR method (for behavioral questions)?
2. Were they specific with examples and metrics?
3. Was the answer well-structured and concise?
4. Did they demonstrate relevant skills for the role?

Output format (JSON only, no markdown):
{
  "score": 1-5,
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["area to improve 1", "area to improve 2"],
  "sampleAnswer": "A brief example of a strong answer (2-3 sentences showing the key elements they should include)"
}`;
    const model = env_1.config.deepseekApiKey ? "deepseek-chat" : "gpt-4o-mini";
    const response = await aiClient.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        temperature: 0.5,
        max_tokens: 1500
    });
    const content = response.choices[0]?.message?.content || "{}";
    // Clean up response
    const cleanedContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
    try {
        return JSON.parse(cleanedContent);
    }
    catch {
        console.error("Failed to parse feedback response:", cleanedContent);
        return {
            score: 3,
            strengths: ["Answer provided"],
            improvements: ["Could not analyze in detail. Please try again."],
            sampleAnswer: "Unable to generate sample answer."
        };
    }
}
/**
 * Get suggested questions for common job titles (fallback if AI fails)
 */
function getFallbackQuestions(jobTitle, level) {
    const generalQuestions = [
        {
            id: generateId(),
            text: "Tell me about a time you faced a significant challenge at work. How did you handle it?",
            category: 'behavioral',
            difficulty: level
        },
        {
            id: generateId(),
            text: `What interests you most about this ${jobTitle} position?`,
            category: 'general',
            difficulty: level
        },
        {
            id: generateId(),
            text: "Describe a situation where you had to work with a difficult team member. What was the outcome?",
            category: 'behavioral',
            difficulty: level
        },
        {
            id: generateId(),
            text: `If you joined our team and discovered a major process inefficiency in your first month, how would you approach it?`,
            category: 'situational',
            difficulty: level
        },
        {
            id: generateId(),
            text: `What technical skills or tools are you most proficient with that would help you succeed as a ${jobTitle}?`,
            category: 'technical',
            difficulty: level
        }
    ];
    return generalQuestions;
}
//# sourceMappingURL=mockInterviewService.js.map