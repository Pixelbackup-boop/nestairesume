/**
 * Subscription Limits Middleware Tests
 * CRITICAL: These tests verify billing/revenue-affecting logic
 */

import type { Response, NextFunction } from 'express';
import {
  checkCvLimit,
  checkAiLimit,
  checkDownloadLimit,
  checkCoverLetterLimit,
  incrementCvCount,
  incrementAiCount,
  incrementDownloadCount,
  getUsageStatus,
} from '../../middleware/subscriptionLimits';
import prisma from '../../config/database';
import {
  createTestUser,
  createStarterUser,
  createGoldUser,
  createDiamondUser,
  createPlatinumUser,
  PLAN_LIMITS,
  HTTP_STATUS,
  ERROR_CODES,
} from '../helpers/testUtils';

// Mock Prisma
jest.mock('../../config/database');
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

// Extended request type for tests
interface MockRequest {
  user?: {
    id?: string;
    userId?: string;
    email: string;
    role: string;
    subscriptionTier?: string;
  };
}

describe('Subscription Limits Middleware', () => {
  let mockReq: MockRequest;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockRes = {
      status: statusMock,
      json: jsonMock,
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  // ==================== CV LIMIT TESTS ====================
  describe('checkCvLimit', () => {
    describe('STARTER tier (30 CV limit)', () => {
      it('should allow CV creation when under limit', async () => {
        const user = createStarterUser({ cvCreatedCount: 5 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(statusMock).not.toHaveBeenCalled();
      });

      it('should allow CV creation at limit - 1', async () => {
        const user = createStarterUser({ cvCreatedCount: 29 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
      });

      it('should BLOCK at exactly 30 CVs (limit reached)', async () => {
        const user = createStarterUser({ cvCreatedCount: 30 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.TOO_MANY_REQUESTS);
        expect(jsonMock).toHaveBeenCalledWith(
          expect.objectContaining({
            code: ERROR_CODES.CV_LIMIT_REACHED,
            limit: PLAN_LIMITS.starter.cvLimit,
            used: 30,
          })
        );
      });

      it('should BLOCK when over limit', async () => {
        const user = createStarterUser({ cvCreatedCount: 35 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.TOO_MANY_REQUESTS);
      });
    });

    describe('GOLD tier (150 CV limit)', () => {
      it('should allow up to 149 CVs', async () => {
        const user = createGoldUser({ cvCreatedCount: 149 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
      });

      it('should BLOCK at 150 CVs', async () => {
        const user = createGoldUser({ cvCreatedCount: 150 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.TOO_MANY_REQUESTS);
      });
    });

    describe('DIAMOND tier (300 CV limit)', () => {
      it('should allow up to 299 CVs', async () => {
        const user = createDiamondUser({ cvCreatedCount: 299 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
      });

      it('should BLOCK at 300 CVs', async () => {
        const user = createDiamondUser({ cvCreatedCount: 300 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
      });
    });

    describe('PLATINUM tier (Unlimited CVs)', () => {
      it('should allow unlimited CVs (1000+)', async () => {
        const user = createPlatinumUser({ cvCreatedCount: 1000 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(statusMock).not.toHaveBeenCalled();
      });
    });

    describe('Edge cases', () => {
      it('should return 401 if no user in request', async () => {
        mockReq = { user: undefined };

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED);
      });

      it('should return 404 if user not found in DB', async () => {
        mockReq = { user: { userId: 'non-existent', email: 'test@test.com', role: 'user' } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      });

      it('should return 403 if user is suspended', async () => {
        const user = createStarterUser({ isSuspended: true, cvCreatedCount: 0 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkCvLimit(mockReq as any, mockRes as Response, mockNext);

        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.FORBIDDEN);
      });
    });
  });

  // ==================== DOWNLOAD LIMIT TESTS ====================
  describe('checkDownloadLimit', () => {
    describe('STARTER tier (3 download limit)', () => {
      it('should allow download when under limit', async () => {
        const user = createStarterUser({ downloadCount: 2 });
        mockReq = { user: { userId: user.id, id: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkDownloadLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
      });

      it('should BLOCK at 3 downloads', async () => {
        const user = createStarterUser({ downloadCount: 3 });
        mockReq = { user: { userId: user.id, id: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkDownloadLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.TOO_MANY_REQUESTS);
        expect(jsonMock).toHaveBeenCalledWith(
          expect.objectContaining({
            code: ERROR_CODES.DOWNLOAD_LIMIT_REACHED,
            limit: PLAN_LIMITS.starter.downloadLimit,
          })
        );
      });
    });

    describe('PLATINUM tier (120 downloads/month)', () => {
      it('should allow downloads under limit', async () => {
        const user = createPlatinumUser({ downloadCount: 100 });
        mockReq = { user: { userId: user.id, id: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkDownloadLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
      });
    });

    describe('Anonymous users', () => {
      it('should require authentication for downloads', async () => {
        mockReq = { user: undefined };

        await checkDownloadLimit(mockReq as any, mockRes as Response, mockNext);

        // Implementation requires authentication
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockNext).not.toHaveBeenCalled();
      });
    });
  });

  // ==================== AI LIMIT TESTS ====================
  describe('checkAiLimit', () => {
    describe('Monthly limits by tier', () => {
      it('STARTER: should allow up to 49 AI generations', async () => {
        const user = createStarterUser({ aiUsedCount: 49 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkAiLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
      });

      it('STARTER: should BLOCK at 50 AI generations', async () => {
        const user = createStarterUser({ aiUsedCount: 50 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkAiLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.TOO_MANY_REQUESTS);
        expect(jsonMock).toHaveBeenCalledWith(
          expect.objectContaining({
            code: ERROR_CODES.AI_LIMIT_REACHED,
          })
        );
      });

      it('PLATINUM: should allow up to 499 AI generations', async () => {
        const user = createPlatinumUser({ aiUsedCount: 499 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkAiLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
      });

      it('PLATINUM: should BLOCK at 500 AI generations', async () => {
        const user = createPlatinumUser({ aiUsedCount: 500 });
        mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

        await checkAiLimit(mockReq as any, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
      });
    });

  });

  // ==================== USAGE STATUS TESTS ====================
  describe('getUsageStatus', () => {
    it('should return correct usage for STARTER user', async () => {
      const user = createStarterUser({
        cvCreatedCount: 10,
        aiUsedCount: 5,
        downloadCount: 2,
        coverLetterCount: 3,
      });
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      const status = await getUsageStatus(user.id);

      expect(status).toEqual(
        expect.objectContaining({
          tier: 'starter',
          usage: expect.objectContaining({
            cv: { used: 10, limit: 30 },
            ai: { used: 5, limit: 50 },
            download: { used: 2, limit: 3 },
            coverLetter: { used: 3, limit: 10 },
          }),
        })
      );
    });

    it('should return null for non-existent user', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const status = await getUsageStatus('non-existent-id');

      expect(status).toBeNull();
    });
  });
});
