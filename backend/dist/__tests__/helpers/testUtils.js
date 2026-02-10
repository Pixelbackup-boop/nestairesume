"use strict";
/**
 * Test Utilities and Helpers
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODES = exports.HTTP_STATUS = exports.PLAN_LIMITS = exports.createTestResume = exports.generateExpiredToken = exports.generateTestToken = exports.createSuspendedUser = exports.createAdminUser = exports.createTrialUser = exports.createPlatinumUser = exports.createDiamondUser = exports.createGoldUser = exports.createStarterUser = exports.createTestUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Test user data factory
const createTestUser = (overrides = {}) => ({
    id: 'test-user-id-123',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    hashedPassword: '$2b$10$test-hashed-password',
    emailVerified: new Date(), // Default to verified
    subscriptionTier: 'free',
    subscriptionStatus: null,
    stripeCustomerId: null,
    subscriptionId: null,
    cvCreatedCount: 0,
    aiUsedCount: 0,
    aiUsedToday: 0,
    downloadCount: 0,
    coverLetterCount: 0,
    trialEndsAt: null,
    hasUsedTrial: false,
    isSuspended: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});
exports.createTestUser = createTestUser;
// Create users for each subscription tier
const createStarterUser = (overrides = {}) => (0, exports.createTestUser)({ subscriptionTier: 'starter', subscriptionStatus: 'active', ...overrides });
exports.createStarterUser = createStarterUser;
const createGoldUser = (overrides = {}) => (0, exports.createTestUser)({ subscriptionTier: 'gold', subscriptionStatus: 'active', ...overrides });
exports.createGoldUser = createGoldUser;
const createDiamondUser = (overrides = {}) => (0, exports.createTestUser)({ subscriptionTier: 'diamond', subscriptionStatus: 'active', ...overrides });
exports.createDiamondUser = createDiamondUser;
const createPlatinumUser = (overrides = {}) => (0, exports.createTestUser)({ subscriptionTier: 'platinum', subscriptionStatus: 'active', ...overrides });
exports.createPlatinumUser = createPlatinumUser;
const createTrialUser = (overrides = {}) => (0, exports.createTestUser)({
    subscriptionTier: 'gold',
    subscriptionStatus: 'trialing',
    trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    ...overrides,
});
exports.createTrialUser = createTrialUser;
const createAdminUser = (overrides = {}) => (0, exports.createTestUser)({ role: 'admin', ...overrides });
exports.createAdminUser = createAdminUser;
const createSuspendedUser = (overrides = {}) => (0, exports.createTestUser)({ isSuspended: true, ...overrides });
exports.createSuspendedUser = createSuspendedUser;
// Generate valid JWT token for testing
const generateTestToken = (user) => {
    return jsonwebtoken_1.default.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing-only', { expiresIn: '1h' });
};
exports.generateTestToken = generateTestToken;
// Generate expired token for testing
const generateExpiredToken = (user) => {
    return jsonwebtoken_1.default.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing-only', { expiresIn: '-1h' } // Already expired
    );
};
exports.generateExpiredToken = generateExpiredToken;
// Test resume data factory
const createTestResume = (overrides = {}) => ({
    id: 'test-resume-id-123',
    userId: 'test-user-id-123',
    title: 'My Resume',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    location: 'New York, NY',
    summary: 'Experienced software developer',
    experiences: JSON.stringify([
        {
            company: 'Tech Corp',
            position: 'Software Engineer',
            startDate: '2020-01',
            endDate: '2023-12',
            isCurrent: false,
            bullets: ['Built features', 'Led team'],
        },
    ]),
    education: JSON.stringify([
        {
            institution: 'University',
            degree: 'BS Computer Science',
            startDate: '2016',
            endDate: '2020',
        },
    ]),
    skills: JSON.stringify(['JavaScript', 'TypeScript', 'React', 'Node.js']),
    templateLayout: 'CLASSIC',
    templateTheme: 'NAVY',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});
exports.createTestResume = createTestResume;
// Plan limits for assertions - MUST MATCH stripeService.ts PLANS
exports.PLAN_LIMITS = {
    starter: {
        cvLimit: 30,
        aiLimit: 50,
        downloadLimit: 3,
        coverLetterLimit: 10,
        trialDailyLimit: 3,
    },
    gold: {
        cvLimit: 150,
        aiLimit: 100,
        downloadLimit: 10,
        coverLetterLimit: 30,
        trialDailyLimit: 5,
    },
    diamond: {
        cvLimit: 300,
        aiLimit: 200,
        downloadLimit: 25,
        coverLetterLimit: 50,
        trialDailyLimit: 10,
    },
    platinum: {
        cvLimit: -1, // Unlimited
        aiLimit: 500,
        downloadLimit: 120,
        coverLetterLimit: -1, // Unlimited
        trialDailyLimit: 15,
    },
};
// HTTP status codes for assertions
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_ERROR: 500,
};
// Error codes from your API
exports.ERROR_CODES = {
    CV_LIMIT_REACHED: 'CV_LIMIT_REACHED',
    AI_LIMIT_REACHED: 'AI_LIMIT_REACHED',
    DOWNLOAD_LIMIT_REACHED: 'DOWNLOAD_LIMIT_REACHED',
    COVER_LETTER_LIMIT_REACHED: 'COVER_LETTER_LIMIT_REACHED',
    TRIAL_DAILY_LIMIT_REACHED: 'TRIAL_DAILY_LIMIT_REACHED',
    SUBSCRIPTION_REQUIRED: 'SUBSCRIPTION_REQUIRED',
};
//# sourceMappingURL=testUtils.js.map