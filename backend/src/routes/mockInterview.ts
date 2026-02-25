import { Router, Request, Response } from "express";
import logger from "../lib/logger";
import * as mockInterviewService from "../services/mockInterviewService";

const router = Router();

/**
 * POST /api/v1/interview/questions
 *
 * Generate interview questions for a specific job title and level.
 *
 * Body (JSON):
 * - jobTitle: string (required) - The job title to generate questions for
 * - level: 'entry' | 'mid' | 'senior' (required) - Experience level
 * - questionCount: number (optional) - Number of questions (default: 5, max: 10)
 * - locale: string (optional) - Language code (default: 'en')
 *
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     sessionId: string,
 *     questions: InterviewQuestion[]
 *   },
 *   error?: string
 * }
 */
router.post("/questions", async (req: Request, res: Response) => {
  try {
    const { jobTitle, level, questionCount = 5, locale = "en" } = req.body;

    // Validation
    if (!jobTitle || typeof jobTitle !== "string") {
      return res.status(400).json({
        success: false,
        error: "Job title is required",
      });
    }

    if (!level || !["entry", "mid", "senior"].includes(level)) {
      return res.status(400).json({
        success: false,
        error: "Level must be 'entry', 'mid', or 'senior'",
      });
    }

    const count = Math.min(Math.max(1, questionCount), 10); // Clamp between 1-10

    let questions;
    try {
      questions = await mockInterviewService.generateInterviewQuestions(
        jobTitle,
        level,
        count,
        locale
      );
    } catch (aiError) {
      logger.error({ err: aiError }, 'AI generation failed, using fallback');
      questions = mockInterviewService.getFallbackQuestions(jobTitle, level);
    }

    const sessionId = Math.random().toString(36).substring(2, 15);

    return res.status(200).json({
      success: true,
      data: {
        sessionId,
        jobTitle,
        level,
        questions,
      },
    });
  } catch (error) {
    logger.error({ err: error }, 'Error generating interview questions');
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate questions",
    });
  }
});

/**
 * POST /api/v1/interview/evaluate
 *
 * Evaluate a user's answer to an interview question.
 *
 * Body (JSON):
 * - question: string (required) - The interview question
 * - answer: string (required) - The user's answer
 * - jobTitle: string (required) - The job title for context
 * - locale: string (optional) - Language code (default: 'en')
 *
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     score: number (1-5),
 *     strengths: string[],
 *     improvements: string[],
 *     sampleAnswer: string
 *   },
 *   error?: string
 * }
 */
router.post("/evaluate", async (req: Request, res: Response) => {
  try {
    const { question, answer, jobTitle, locale = "en" } = req.body;

    // Validation
    if (!question || typeof question !== "string") {
      return res.status(400).json({
        success: false,
        error: "Question is required",
      });
    }

    if (!answer || typeof answer !== "string") {
      return res.status(400).json({
        success: false,
        error: "Answer is required",
      });
    }

    if (!jobTitle || typeof jobTitle !== "string") {
      return res.status(400).json({
        success: false,
        error: "Job title is required",
      });
    }

    // Minimum answer length check
    if (answer.trim().length < 20) {
      return res.status(400).json({
        success: false,
        error: "Answer is too short. Please provide a more detailed response.",
      });
    }

    const feedback = await mockInterviewService.evaluateAnswer(
      question,
      answer,
      jobTitle,
      locale
    );

    return res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    logger.error({ err: error }, 'Error evaluating answer');
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to evaluate answer",
    });
  }
});

export default router;
