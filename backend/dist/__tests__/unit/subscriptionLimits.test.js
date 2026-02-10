"use strict";
/**
 * Subscription Limits Middleware Tests
 * CRITICAL: These tests verify billing/revenue-affecting logic
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscriptionLimits_1 = require("../../middleware/subscriptionLimits");
const database_1 = __importDefault(require("../../config/database"));
const testUtils_1 = require("../helpers/testUtils");
// Mock Prisma
jest.mock('../../config/database');
const mockPrisma = database_1.default;
describe('Subscription Limits Middleware', () => {
    let mockReq;
    let mockRes;
    let mockNext;
    let jsonMock;
    let statusMock;
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
                const user = (0, testUtils_1.createStarterUser)({ cvCreatedCount: 5 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
                expect(statusMock).not.toHaveBeenCalled();
            });
            it('should allow CV creation at limit - 1', async () => {
                const user = (0, testUtils_1.createStarterUser)({ cvCreatedCount: 29 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
            });
            it('should BLOCK at exactly 30 CVs (limit reached)', async () => {
                const user = (0, testUtils_1.createStarterUser)({ cvCreatedCount: 30 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).not.toHaveBeenCalled();
                expect(statusMock).toHaveBeenCalledWith(testUtils_1.HTTP_STATUS.TOO_MANY_REQUESTS);
                expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                    code: testUtils_1.ERROR_CODES.CV_LIMIT_REACHED,
                    limit: testUtils_1.PLAN_LIMITS.starter.cvLimit,
                    used: 30,
                }));
            });
            it('should BLOCK when over limit', async () => {
                const user = (0, testUtils_1.createStarterUser)({ cvCreatedCount: 35 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).not.toHaveBeenCalled();
                expect(statusMock).toHaveBeenCalledWith(testUtils_1.HTTP_STATUS.TOO_MANY_REQUESTS);
            });
        });
        describe('GOLD tier (150 CV limit)', () => {
            it('should allow up to 149 CVs', async () => {
                const user = (0, testUtils_1.createGoldUser)({ cvCreatedCount: 149 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
            });
            it('should BLOCK at 150 CVs', async () => {
                const user = (0, testUtils_1.createGoldUser)({ cvCreatedCount: 150 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).not.toHaveBeenCalled();
                expect(statusMock).toHaveBeenCalledWith(testUtils_1.HTTP_STATUS.TOO_MANY_REQUESTS);
            });
        });
        describe('DIAMOND tier (300 CV limit)', () => {
            it('should allow up to 299 CVs', async () => {
                const user = (0, testUtils_1.createDiamondUser)({ cvCreatedCount: 299 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
            });
            it('should BLOCK at 300 CVs', async () => {
                const user = (0, testUtils_1.createDiamondUser)({ cvCreatedCount: 300 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).not.toHaveBeenCalled();
            });
        });
        describe('PLATINUM tier (Unlimited CVs)', () => {
            it('should allow unlimited CVs (1000+)', async () => {
                const user = (0, testUtils_1.createPlatinumUser)({ cvCreatedCount: 1000 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
                expect(statusMock).not.toHaveBeenCalled();
            });
        });
        describe('Edge cases', () => {
            it('should return 401 if no user in request', async () => {
                mockReq = { user: undefined };
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(statusMock).toHaveBeenCalledWith(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
            });
            it('should return 404 if user not found in DB', async () => {
                mockReq = { user: { userId: 'non-existent', email: 'test@test.com', role: 'user' } };
                mockPrisma.user.findUnique.mockResolvedValue(null);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(statusMock).toHaveBeenCalledWith(testUtils_1.HTTP_STATUS.NOT_FOUND);
            });
            it('should return 403 if user is suspended', async () => {
                const user = (0, testUtils_1.createStarterUser)({ isSuspended: true, cvCreatedCount: 0 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkCvLimit)(mockReq, mockRes, mockNext);
                expect(statusMock).toHaveBeenCalledWith(testUtils_1.HTTP_STATUS.FORBIDDEN);
            });
        });
    });
    // ==================== DOWNLOAD LIMIT TESTS ====================
    describe('checkDownloadLimit', () => {
        describe('STARTER tier (3 download limit)', () => {
            it('should allow download when under limit', async () => {
                const user = (0, testUtils_1.createStarterUser)({ downloadCount: 2 });
                mockReq = { user: { userId: user.id, id: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkDownloadLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
            });
            it('should BLOCK at 3 downloads', async () => {
                const user = (0, testUtils_1.createStarterUser)({ downloadCount: 3 });
                mockReq = { user: { userId: user.id, id: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkDownloadLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).not.toHaveBeenCalled();
                expect(statusMock).toHaveBeenCalledWith(testUtils_1.HTTP_STATUS.TOO_MANY_REQUESTS);
                expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                    code: testUtils_1.ERROR_CODES.DOWNLOAD_LIMIT_REACHED,
                    limit: testUtils_1.PLAN_LIMITS.starter.downloadLimit,
                }));
            });
        });
        describe('PLATINUM tier (120 downloads/month)', () => {
            it('should allow downloads under limit', async () => {
                const user = (0, testUtils_1.createPlatinumUser)({ downloadCount: 100 });
                mockReq = { user: { userId: user.id, id: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkDownloadLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
            });
        });
        describe('Anonymous users', () => {
            it('should allow anonymous downloads (no user)', async () => {
                mockReq = { user: undefined };
                await (0, subscriptionLimits_1.checkDownloadLimit)(mockReq, mockRes, mockNext);
                // Current implementation allows anonymous downloads
                expect(mockNext).toHaveBeenCalled();
            });
        });
    });
    // ==================== AI LIMIT TESTS ====================
    describe('checkAiLimit', () => {
        describe('Monthly limits by tier', () => {
            it('STARTER: should allow up to 49 AI generations', async () => {
                const user = (0, testUtils_1.createStarterUser)({ aiUsedCount: 49 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkAiLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
            });
            it('STARTER: should BLOCK at 50 AI generations', async () => {
                const user = (0, testUtils_1.createStarterUser)({ aiUsedCount: 50 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkAiLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).not.toHaveBeenCalled();
                expect(statusMock).toHaveBeenCalledWith(testUtils_1.HTTP_STATUS.TOO_MANY_REQUESTS);
                expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                    code: testUtils_1.ERROR_CODES.AI_LIMIT_REACHED,
                }));
            });
            it('PLATINUM: should allow up to 499 AI generations', async () => {
                const user = (0, testUtils_1.createPlatinumUser)({ aiUsedCount: 499 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkAiLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
            });
            it('PLATINUM: should BLOCK at 500 AI generations', async () => {
                const user = (0, testUtils_1.createPlatinumUser)({ aiUsedCount: 500 });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkAiLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).not.toHaveBeenCalled();
            });
        });
        describe('Trial daily limits', () => {
            it('GOLD TRIAL: should allow up to 4 AI/day', async () => {
                const user = (0, testUtils_1.createTrialUser)({
                    subscriptionTier: 'gold',
                    aiUsedToday: 4,
                    aiUsedCount: 4,
                    lastAiResetDate: new Date(),
                });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkAiLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).toHaveBeenCalled();
            });
            it('GOLD TRIAL: should BLOCK at 5 AI/day', async () => {
                const user = (0, testUtils_1.createTrialUser)({
                    subscriptionTier: 'gold',
                    aiUsedToday: 5,
                    aiUsedCount: 5,
                    lastAiResetDate: new Date(),
                });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                await (0, subscriptionLimits_1.checkAiLimit)(mockReq, mockRes, mockNext);
                expect(mockNext).not.toHaveBeenCalled();
                expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                    code: testUtils_1.ERROR_CODES.TRIAL_DAILY_LIMIT_REACHED,
                }));
            });
            it('TRIAL: should reset daily counter on new day', async () => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const user = (0, testUtils_1.createTrialUser)({
                    aiUsedToday: 5, // Was at limit yesterday
                    aiUsedCount: 5,
                    lastAiResetDate: yesterday,
                });
                mockReq = { user: { userId: user.id, email: user.email, role: user.role } };
                mockPrisma.user.findUnique.mockResolvedValue(user);
                mockPrisma.user.update.mockResolvedValue({ ...user, aiUsedToday: 0 });
                await (0, subscriptionLimits_1.checkAiLimit)(mockReq, mockRes, mockNext);
                // Should have reset the counter
                expect(mockPrisma.user.update).toHaveBeenCalledWith(expect.objectContaining({
                    data: expect.objectContaining({ aiUsedToday: 0 }),
                }));
                expect(mockNext).toHaveBeenCalled();
            });
        });
    });
    // ==================== USAGE STATUS TESTS ====================
    describe('getUsageStatus', () => {
        it('should return correct usage for STARTER user', async () => {
            const user = (0, testUtils_1.createStarterUser)({
                cvCreatedCount: 10,
                aiUsedCount: 5,
                downloadCount: 2,
                coverLetterCount: 3,
            });
            mockPrisma.user.findUnique.mockResolvedValue(user);
            const status = await (0, subscriptionLimits_1.getUsageStatus)(user.id);
            expect(status).toEqual(expect.objectContaining({
                tier: 'starter',
                usage: expect.objectContaining({
                    cv: { used: 10, limit: 30 },
                    ai: { used: 5, limit: 50 },
                    download: { used: 2, limit: 3 },
                    coverLetter: { used: 3, limit: 10 },
                }),
            }));
        });
        it('should return null for non-existent user', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null);
            const status = await (0, subscriptionLimits_1.getUsageStatus)('non-existent-id');
            expect(status).toBeNull();
        });
    });
});
//# sourceMappingURL=subscriptionLimits.test.js.map