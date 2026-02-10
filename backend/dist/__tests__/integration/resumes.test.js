"use strict";
/**
 * Resumes API Integration Tests
 * Tests the /api/v1/resumes endpoints
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../config/database"));
const testUtils_1 = require("../helpers/testUtils");
// Mock Prisma
jest.mock('../../config/database');
// Mock resume service
jest.mock('../../services/resumeService', () => ({
    getTemplates: jest.fn(() => [
        { id: 'classic', name: 'Classic', layout: 'CLASSIC', theme: 'NAVY', isPremium: false },
        { id: 'modern', name: 'Modern', layout: 'SIDEBAR', theme: 'TEAL', isPremium: true },
    ]),
    createResume: jest.fn(),
    getResumes: jest.fn(),
    getResumeById: jest.fn(),
    updateResume: jest.fn(),
    deleteResume: jest.fn(),
}));
const mockPrisma = database_1.default;
const mockResumeService = jest.requireMock('../../services/resumeService');
describe('Resumes API Integration Tests', () => {
    let testUser;
    let authToken;
    beforeEach(() => {
        jest.clearAllMocks();
        testUser = (0, testUtils_1.createStarterUser)();
        authToken = (0, testUtils_1.generateTestToken)(testUser);
    });
    // ==================== GET /api/v1/resumes/templates ====================
    describe('GET /api/v1/resumes/templates', () => {
        it('should return available templates (no auth required)', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/resumes/templates');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('layout');
        });
        it('should include premium and free templates', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/resumes/templates');
            const hasPremium = response.body.some((t) => t.isPremium);
            const hasFree = response.body.some((t) => !t.isPremium);
            expect(hasPremium || hasFree).toBe(true);
        });
    });
    // ==================== POST /api/v1/resumes ====================
    describe('POST /api/v1/resumes', () => {
        beforeEach(() => {
            // Mock user lookup for CV limit check
            mockPrisma.user.findUnique.mockResolvedValue(testUser);
            mockPrisma.user.update.mockResolvedValue(testUser);
        });
        it('should create resume for authenticated user', async () => {
            const resumeData = {
                title: 'My Resume',
                fullName: 'John Doe',
                email: 'john@example.com',
                phone: '+1234567890',
                summary: 'Experienced developer',
            };
            mockResumeService.createResume.mockResolvedValue({
                id: 'new-resume-id',
                userId: testUser.id,
                ...resumeData,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/resumes')
                .set('Authorization', `Bearer ${authToken}`)
                .send(resumeData);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.CREATED);
            expect(response.body.id).toBeDefined();
            expect(response.body.title).toBe(resumeData.title);
            expect(response.body.fullName).toBe(resumeData.fullName);
        });
        it('should return 400 for missing required fields', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/resumes')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'My Resume' }); // Missing fullName
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
            expect(response.body.detail).toContain('required');
        });
        it('should return 401 without authentication', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/resumes')
                .send({
                title: 'My Resume',
                fullName: 'John Doe',
            });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
        // CV limit checking is handled by checkCvLimit middleware
        it('should return 429 when CV limit reached', async () => {
            const userAtLimit = (0, testUtils_1.createStarterUser)({
                cvCreatedCount: testUtils_1.PLAN_LIMITS.starter.cvLimit,
            });
            mockPrisma.user.findUnique.mockResolvedValue(userAtLimit);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/resumes')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                title: 'My Resume',
                fullName: 'John Doe',
            });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.TOO_MANY_REQUESTS);
            expect(response.body.code).toBe('CV_LIMIT_REACHED');
        });
        it('should increment CV count after successful creation', async () => {
            mockResumeService.createResume.mockResolvedValue({
                id: 'new-resume-id',
                userId: testUser.id,
                title: 'Test',
                fullName: 'Test User',
            });
            await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/resumes')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                title: 'Test',
                fullName: 'Test User',
            });
            expect(mockPrisma.user.update).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    cvCreatedCount: expect.any(Object),
                }),
            }));
        });
    });
    // ==================== GET /api/v1/resumes ====================
    describe('GET /api/v1/resumes', () => {
        it('should return user resumes', async () => {
            const mockResumes = [
                (0, testUtils_1.createTestResume)({ id: 'resume-1', userId: testUser.id }),
                (0, testUtils_1.createTestResume)({ id: 'resume-2', userId: testUser.id }),
            ];
            mockResumeService.getResumes.mockResolvedValue(mockResumes);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/resumes')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
        });
        it('should support pagination', async () => {
            mockResumeService.getResumes.mockResolvedValue([]);
            await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/resumes?skip=10&limit=5')
                .set('Authorization', `Bearer ${authToken}`);
            expect(mockResumeService.getResumes).toHaveBeenCalledWith(testUser.id, 10, 5);
        });
        it('should return 401 without authentication', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/resumes');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
        it('should return empty array for user with no resumes', async () => {
            mockResumeService.getResumes.mockResolvedValue([]);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/resumes')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body).toEqual([]);
        });
    });
    // ==================== GET /api/v1/resumes/:id ====================
    describe('GET /api/v1/resumes/:id', () => {
        it('should return resume by id for owner', async () => {
            const mockResume = (0, testUtils_1.createTestResume)({ id: 'resume-123', userId: testUser.id });
            mockResumeService.getResumeById.mockResolvedValue(mockResume);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/resumes/resume-123')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.id).toBe('resume-123');
        });
        it('should return 404 for non-existent resume', async () => {
            mockResumeService.getResumeById.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/resumes/non-existent')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.NOT_FOUND);
        });
        it('should return 404 for resume owned by different user', async () => {
            // Service returns null when userId doesn't match
            mockResumeService.getResumeById.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/resumes/other-users-resume')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.NOT_FOUND);
        });
    });
    // ==================== PUT /api/v1/resumes/:id ====================
    describe('PUT /api/v1/resumes/:id', () => {
        it('should update resume', async () => {
            const updatedResume = (0, testUtils_1.createTestResume)({
                id: 'resume-123',
                userId: testUser.id,
                title: 'Updated Title',
            });
            mockResumeService.updateResume.mockResolvedValue(updatedResume);
            const response = await (0, supertest_1.default)(app_1.default)
                .put('/api/v1/resumes/resume-123')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'Updated Title' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.title).toBe('Updated Title');
        });
        it('should return 404 for non-existent resume', async () => {
            mockResumeService.updateResume.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(app_1.default)
                .put('/api/v1/resumes/non-existent')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'New Title' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.NOT_FOUND);
        });
        it('should not allow updating other users resume', async () => {
            mockResumeService.updateResume.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(app_1.default)
                .put('/api/v1/resumes/other-users-resume')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'Hacked Title' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.NOT_FOUND);
        });
    });
    // ==================== DELETE /api/v1/resumes/:id ====================
    describe('DELETE /api/v1/resumes/:id', () => {
        it('should delete resume', async () => {
            mockResumeService.deleteResume.mockResolvedValue(true);
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/api/v1/resumes/resume-123')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(204); // No Content
        });
        it('should return 404 for non-existent resume', async () => {
            mockResumeService.deleteResume.mockResolvedValue(false);
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/api/v1/resumes/non-existent')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.NOT_FOUND);
        });
        it('should not allow deleting other users resume', async () => {
            mockResumeService.deleteResume.mockResolvedValue(false);
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/api/v1/resumes/other-users-resume')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.NOT_FOUND);
        });
    });
    // ==================== Authorization Tests ====================
    describe('Authorization', () => {
        it('all CRUD endpoints require authentication', async () => {
            const endpoints = [
                { method: 'post', path: '/api/v1/resumes' },
                { method: 'get', path: '/api/v1/resumes' },
                { method: 'get', path: '/api/v1/resumes/123' },
                { method: 'put', path: '/api/v1/resumes/123' },
                { method: 'delete', path: '/api/v1/resumes/123' },
            ];
            for (const endpoint of endpoints) {
                const response = await (0, supertest_1.default)(app_1.default)[endpoint.method](endpoint.path);
                expect(response.status).toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
            }
        });
        it('templates endpoint does NOT require authentication', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/resumes/templates');
            expect(response.status).not.toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
    });
});
//# sourceMappingURL=resumes.test.js.map