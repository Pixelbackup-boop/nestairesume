/**
 * Test Utilities and Helpers
 */

import jwt from 'jsonwebtoken';

// Test user data factory
export const createTestUser = (overrides: Record<string, any> = {}) => ({
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

// Create users for each subscription tier
export const createStarterUser = (overrides = {}) =>
  createTestUser({ subscriptionTier: 'starter', subscriptionStatus: 'active', ...overrides });

export const createGoldUser = (overrides = {}) =>
  createTestUser({ subscriptionTier: 'gold', subscriptionStatus: 'active', ...overrides });

export const createDiamondUser = (overrides = {}) =>
  createTestUser({ subscriptionTier: 'diamond', subscriptionStatus: 'active', ...overrides });

export const createPlatinumUser = (overrides = {}) =>
  createTestUser({ subscriptionTier: 'platinum', subscriptionStatus: 'active', ...overrides });

export const createAdminUser = (overrides = {}) =>
  createTestUser({ role: 'admin', ...overrides });

export const createSuspendedUser = (overrides = {}) =>
  createTestUser({ isSuspended: true, ...overrides });

// Generate valid JWT token for testing
export const generateTestToken = (user: { id: string; email: string; role: string }) => {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing-only',
    { expiresIn: '1h' }
  );
};

// Generate expired token for testing
export const generateExpiredToken = (user: { id: string; email: string; role: string }) => {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing-only',
    { expiresIn: '-1h' } // Already expired
  );
};

// Test resume data factory
export const createTestResume = (overrides = {}) => ({
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

// Plan limits for assertions - MUST MATCH stripeService.ts PLANS
export const PLAN_LIMITS = {
  starter: {
    cvLimit: 30,
    aiLimit: 50,
    downloadLimit: 3,
    coverLetterLimit: 10,
  },
  gold: {
    cvLimit: 150,
    aiLimit: 100,
    downloadLimit: 10,
    coverLetterLimit: 30,
  },
  diamond: {
    cvLimit: 300,
    aiLimit: 200,
    downloadLimit: 25,
    coverLetterLimit: 50,
  },
  platinum: {
    cvLimit: -1, // Unlimited
    aiLimit: 500,
    downloadLimit: 120,
    coverLetterLimit: -1, // Unlimited
  },
};

// HTTP status codes for assertions
export const HTTP_STATUS = {
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
export const ERROR_CODES = {
  CV_LIMIT_REACHED: 'CV_LIMIT_REACHED',
  AI_LIMIT_REACHED: 'AI_LIMIT_REACHED',
  DOWNLOAD_LIMIT_REACHED: 'DOWNLOAD_LIMIT_REACHED',
  COVER_LETTER_LIMIT_REACHED: 'COVER_LETTER_LIMIT_REACHED',
  SUBSCRIPTION_REQUIRED: 'SUBSCRIPTION_REQUIRED',
};
