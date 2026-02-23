"use strict";
/**
 * Zod Validation Middleware
 * Provides type-safe request validation for API endpoints
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormSchema = exports.createCheckoutSchema = exports.oauthSchema = exports.updateProfileSchema = exports.setPasswordSchema = exports.verifyEmailChangeSchema = exports.requestEmailChangeSchema = exports.changePasswordSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.resendCodeSchema = exports.verifyEmailSchema = exports.loginSchema = exports.registerSchema = void 0;
exports.validateBody = validateBody;
const zod_1 = require("zod");
/**
 * Middleware factory that validates request body against a Zod schema
 */
function validateBody(schema) {
    return (req, res, next) => {
        try {
            const parsed = schema.parse(req.body);
            req.body = parsed; // Replace with parsed/sanitized data
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
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
exports.registerSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .max(255, 'Email too long'),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password too long')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name is required')
        .max(100, 'Name too long')
        .trim(),
});
exports.loginSchema = zod_1.z.object({
    // Support both username (OAuth2 standard) and email
    username: zod_1.z.string().email('Invalid email format').optional(),
    email: zod_1.z.string().email('Invalid email format').optional(),
    password: zod_1.z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
}).refine((data) => data.username || data.email, {
    message: 'Email is required',
    path: ['email'],
});
exports.verifyEmailSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
    code: zod_1.z
        .string({ required_error: 'Verification code is required' })
        .length(6, 'Verification code must be 6 characters'),
});
exports.resendCodeSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
});
exports.resetPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
    code: zod_1.z
        .string({ required_error: 'Reset code is required' })
        .length(6, 'Reset code must be 6 characters'),
    newPassword: zod_1.z
        .string({ required_error: 'New password is required' })
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password too long'),
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z
        .string({ required_error: 'Current password is required' })
        .min(1, 'Current password is required'),
    newPassword: zod_1.z
        .string({ required_error: 'New password is required' })
        .min(8, 'New password must be at least 8 characters')
        .max(128, 'Password too long'),
});
exports.requestEmailChangeSchema = zod_1.z.object({
    newEmail: zod_1.z
        .string({ required_error: 'New email is required' })
        .email('Invalid email format')
        .max(255, 'Email too long'),
});
exports.verifyEmailChangeSchema = zod_1.z.object({
    newEmail: zod_1.z
        .string({ required_error: 'New email is required' })
        .email('Invalid email format'),
    code: zod_1.z
        .string({ required_error: 'Verification code is required' })
        .length(6, 'Verification code must be 6 characters'),
});
exports.setPasswordSchema = zod_1.z.object({
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password too long'),
});
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, 'Name cannot be empty')
        .max(100, 'Name too long')
        .trim()
        .optional(),
    avatarId: zod_1.z
        .number()
        .int('Avatar ID must be an integer')
        .min(1, 'Avatar ID must be between 1 and 5')
        .max(5, 'Avatar ID must be between 1 and 5')
        .optional(),
});
exports.oauthSchema = zod_1.z.object({
    provider: zod_1.z
        .string({ required_error: 'Provider is required' })
        .min(1, 'Provider is required'),
    providerAccountId: zod_1.z
        .string({ required_error: 'Provider account ID is required' })
        .min(1, 'Provider account ID is required'),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
    name: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional().nullable(),
    accessToken: zod_1.z.string().optional(),
    refreshToken: zod_1.z.string().optional(),
});
// ==================== Payment Schemas ====================
const planTypes = ['starter', 'gold', 'diamond', 'platinum'];
exports.createCheckoutSchema = zod_1.z.object({
    plan: zod_1.z.enum(planTypes, {
        errorMap: () => ({ message: 'Invalid plan. Must be: starter, gold, diamond, or platinum' }),
    }),
});
// ==================== Contact Form Schema ====================
exports.contactFormSchema = zod_1.z.object({
    inquiryType: zod_1.z
        .string({ required_error: 'Inquiry type is required' })
        .min(1, 'Inquiry type is required')
        .max(100, 'Inquiry type too long'),
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name is required')
        .max(100, 'Name too long')
        .trim(),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .max(255, 'Email too long'),
    subject: zod_1.z
        .string({ required_error: 'Subject is required' })
        .min(1, 'Subject is required')
        .max(200, 'Subject too long')
        .trim(),
    message: zod_1.z
        .string({ required_error: 'Message is required' })
        .min(10, 'Message must be at least 10 characters')
        .max(5000, 'Message too long (max 5000 characters)')
        .trim(),
});
//# sourceMappingURL=validation.js.map