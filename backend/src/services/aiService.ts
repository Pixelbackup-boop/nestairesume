import OpenAI from "openai";
import { config } from "../config/env";

// Use DeepSeek API (OpenAI-compatible) or fallback to OpenAI
const getClient = () => {
  if (config.deepseekApiKey) {
    return new OpenAI({
      apiKey: config.deepseekApiKey,
      baseURL: "https://api.deepseek.com/v1",
    });
  }
  if (config.openaiApiKey) {
    return new OpenAI({
      apiKey: config.openaiApiKey,
    });
  }
  return null;
};

export const generateSummary = async (jobTitle: string, experience: string): Promise<string> => {
  const client = getClient();

  if (!client) {
    // Fallback response when no API key configured
    return `Experienced ${jobTitle} with a proven track record of delivering results. Skilled in problem-solving and collaboration with cross-functional teams.`;
  }

  try {
    const completion = await client.chat.completions.create({
      model: config.deepseekApiKey ? "deepseek-chat" : "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer.",
        },
        {
          role: "user",
          content: `Write a professional resume summary for a ${jobTitle}. Based on the following experience: ${experience}. Keep it under 50 words.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("AI summary generation error:", error);
    return `Experienced ${jobTitle} with a proven track record of delivering results. Skilled in problem-solving and collaboration with cross-functional teams.`;
  }
};

export const improveContent = async (content: string): Promise<string> => {
  const client = getClient();

  if (!client) {
    // Fallback: return original content
    return content;
  }

  try {
    const completion = await client.chat.completions.create({
      model: config.deepseekApiKey ? "deepseek-chat" : "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer.",
        },
        {
          role: "user",
          content: `Rewrite this resume bullet point to be more impactful, using action verbs and metrics if possible: ${content}. Return ONLY the rewritten bullet point.`,
        },
      ],
      temperature: 0.6,
    });

    return completion.choices[0]?.message?.content?.trim() || content;
  } catch (error) {
    console.error("AI content improvement error:", error);
    return content;
  }
};
