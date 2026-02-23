/**
 * Zod Validation Middleware
 * Provides type-safe request validation for API endpoints
 */
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
/**
 * Middleware factory that validates request body against a Zod schema
 */
export declare function validateBody<T extends ZodSchema>(schema: T): (req: Request, res: Response, next: NextFunction) => void;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const loginSchema: z.ZodEffects<z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}>, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}>;
export declare const verifyEmailSchema: z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    code: string;
}, {
    email: string;
    code: string;
}>;
export declare const resendCodeSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const resetPasswordSchema: z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    code: string;
    newPassword: string;
}, {
    email: string;
    code: string;
    newPassword: string;
}>;
export declare const changePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
    currentPassword: string;
}, {
    newPassword: string;
    currentPassword: string;
}>;
export declare const requestEmailChangeSchema: z.ZodObject<{
    newEmail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newEmail: string;
}, {
    newEmail: string;
}>;
export declare const verifyEmailChangeSchema: z.ZodObject<{
    newEmail: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    newEmail: string;
}, {
    code: string;
    newEmail: string;
}>;
export declare const setPasswordSchema: z.ZodObject<{
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
}, {
    password: string;
}>;
export declare const updateProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    avatarId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    avatarId?: number | undefined;
}, {
    name?: string | undefined;
    avatarId?: number | undefined;
}>;
export declare const oauthSchema: z.ZodObject<{
    provider: z.ZodString;
    providerAccountId: z.ZodString;
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    image: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    accessToken: z.ZodOptional<z.ZodString>;
    refreshToken: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    provider: string;
    providerAccountId: string;
    name?: string | undefined;
    image?: string | null | undefined;
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
}, {
    email: string;
    provider: string;
    providerAccountId: string;
    name?: string | undefined;
    image?: string | null | undefined;
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
}>;
export declare const createCheckoutSchema: z.ZodObject<{
    plan: z.ZodEnum<["starter", "gold", "diamond", "platinum"]>;
}, "strip", z.ZodTypeAny, {
    plan: "starter" | "gold" | "diamond" | "platinum";
}, {
    plan: "starter" | "gold" | "diamond" | "platinum";
}>;
export declare const contactFormSchema: z.ZodObject<{
    inquiryType: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    subject: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    message: string;
    inquiryType: string;
    subject: string;
}, {
    name: string;
    email: string;
    message: string;
    inquiryType: string;
    subject: string;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type RequestEmailChangeInput = z.infer<typeof requestEmailChangeSchema>;
export type VerifyEmailChangeInput = z.infer<typeof verifyEmailChangeSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
//# sourceMappingURL=validation.d.ts.map