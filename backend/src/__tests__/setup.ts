/**
 * Jest Test Setup
 * Runs before each test file
 */

// Set test environment variables BEFORE any imports
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.DATABASE_URL = 'file:./test.db';
process.env.FRONTEND_URL = 'http://localhost:3000';

// Mock config module to ensure consistent JWT secret
jest.mock('../config/env', () => ({
  config: {
    // Environment
    nodeEnv: 'test',
    isProduction: false,
    isTest: true,
    // Server
    port: 3001,
    host: 'localhost',
    // Auth
    secretKey: 'test-jwt-secret-key-for-testing-only',
    accessTokenExpireMinutes: 60,
    // AI
    deepseekApiKey: null,
    openaiApiKey: null,
    // CORS
    corsOrigins: ['http://localhost:3000'],
    // Stripe
    stripeSecretKey: null,
    stripeWebhookSecret: 'whsec_test',
    stripePrices: {
      starter: 'price_test_starter',
      gold: 'price_test_gold',
      diamond: 'price_test_diamond',
      platinum: 'price_test_platinum',
    },
    // Frontend
    frontendUrl: 'http://localhost:3000',
    // Email
    brevoApiKey: '',
    emailFromAddress: 'test@example.com',
    // Sentry
    sentryDsn: null,
    sentryRelease: null,
  },
}));

// Mock Prisma client
jest.mock('../config/database', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    resume: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    payment: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  },
}));

// Global test timeout
jest.setTimeout(30000);

// Clean up after all tests
afterAll(async () => {
  // Any global cleanup
});
