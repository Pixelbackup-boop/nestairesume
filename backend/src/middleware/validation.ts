/**
 * Zod Validation Middleware
 * Provides type-safe request validation for API endpoints
 */

import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema, ZodError } from 'zod';

/**
 * Middleware factory that validates request body against a Zod schema
 */
export function validateBody<T extends ZodSchema>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed; // Replace with parsed/sanitized data
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          error: 'Validation failed',
          detail: formattedErrors[0]?.message || 'Invalid request data',
          errors: formattedErrors,
        });
        return;
      }
      next(error);
    }
  };
}

// ==================== Auth Schemas ====================

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .max(255, 'Email too long'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .trim(),
});

export const loginSchema = z.object({
  // Support both username (OAuth2 standard) and email
  username: z.string().email('Invalid email format').optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
}).refine((data) => data.username || data.email, {
  message: 'Email is required',
  path: ['email'],
});

export const verifyEmailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  code: z
    .string({ required_error: 'Verification code is required' })
    .length(6, 'Verification code must be 6 characters'),
});

export const resendCodeSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
});

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  code: z
    .string({ required_error: 'Reset code is required' })
    .length(6, 'Reset code must be 6 characters'),
  newPassword: z
    .string({ required_error: 'New password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long'),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string({ required_error: 'Current password is required' })
    .min(1, 'Current password is required'),
  newPassword: z
    .string({ required_error: 'New password is required' })
    .min(8, 'New password must be at least 8 characters')
    .max(128, 'Password too long'),
});

export const requestEmailChangeSchema = z.object({
  newEmail: z
    .string({ required_error: 'New email is required' })
    .email('Invalid email format')
    .max(255, 'Email too long'),
});

export const verifyEmailChangeSchema = z.object({
  newEmail: z
    .string({ required_error: 'New email is required' })
    .email('Invalid email format'),
  code: z
    .string({ required_error: 'Verification code is required' })
    .length(6, 'Verification code must be 6 characters'),
});

export const setPasswordSchema = z.object({
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long'),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name cannot be empty')
    .max(100, 'Name too long')
    .trim()
    .optional(),
  avatarId: z
    .number()
    .int('Avatar ID must be an integer')
    .min(1, 'Avatar ID must be between 1 and 5')
    .max(5, 'Avatar ID must be between 1 and 5')
    .optional(),
});

export const oauthSchema = z.object({
  provider: z
    .string({ required_error: 'Provider is required' })
    .min(1, 'Provider is required'),
  providerAccountId: z
    .string({ required_error: 'Provider account ID is required' })
    .min(1, 'Provider account ID is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  name: z.string().optional(),
  image: z.string().url().optional().nullable(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

// ==================== Payment Schemas ====================

const planTypes = ['starter', 'gold', 'diamond', 'platinum'] as const;

export const createCheckoutSchema = z.object({
  plan: z.enum(planTypes, {
    errorMap: () => ({ message: 'Invalid plan. Must be: starter, gold, diamond, or platinum' }),
  }),
});

// ==================== Contact Form Schema ====================

export const contactFormSchema = z.object({
  inquiryType: z
    .string({ required_error: 'Inquiry type is required' })
    .min(1, 'Inquiry type is required')
    .max(100, 'Inquiry type too long'),
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .max(255, 'Email too long'),
  subject: z
    .string({ required_error: 'Subject is required' })
    .min(1, 'Subject is required')
    .max(200, 'Subject too long')
    .trim(),
  message: z
    .string({ required_error: 'Message is required' })
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message too long (max 5000 characters)')
    .trim(),
});

// ==================== Type Exports ====================

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type RequestEmailChangeInput = z.infer<typeof requestEmailChangeSchema>;
export type VerifyEmailChangeInput = z.infer<typeof verifyEmailChangeSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
