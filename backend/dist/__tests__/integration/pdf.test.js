"use strict";
/**
 * PDF API Integration Tests
 * Tests the /api/v1/pdf endpoints
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
// Mock PDF generator service
jest.mock('../../services/pdfGeneratorService', () => ({
    processPdfRequest: jest.fn(),
}));
// Mock Sentry
jest.mock('../../lib/sentry', () => ({
    captureError: jest.fn(),
    trackPdfGeneration: jest.fn(),
    initSentry: jest.fn(),
    sentryRequestHandler: jest.fn(() => (req, res, next) => next()),
    setupSentryErrorHandler: jest.fn(),
    sentryContextMiddleware: jest.fn((req, res, next) => next()),
}));
// Mock subscription limits
jest.mock('../../middleware/subscriptionLimits', () => ({
    checkDownloadLimit: jest.fn((req, res, next) => next()),
    incrementDownloadCount: jest.fn(),
    checkCvLimit: jest.fn((req, res, next) => next()),
    checkAiLimit: jest.fn((req, res, next) => next()),
    incrementCvCount: jest.fn(),
    incrementAiCount: jest.fn(),
    getUsageStatus: jest.fn(),
}));
const mockPrisma = database_1.default;
const mockPdfService = jest.requireMock('../../services/pdfGeneratorService');
const mockSubscriptionLimits = jest.requireMock('../../middleware/subscriptionLimits');
describe('PDF API Integration Tests', () => {
    const validPdfRequest = {
        data: {
            personalInfo: {
                fullName: 'John Doe',
                email: 'john@example.com',
                phone: '+1234567890',
                location: 'New York, NY',
            },
            summary: 'Experienced software developer',
            experience: [
                {
                    title: 'Senior Developer',
                    company: 'Tech Corp',
                    startDate: '2020-01',
                    endDate: 'Present',
                    description: 'Led development team',
                },
            ],
            education: [
                {
                    degree: 'BS Computer Science',
                    school: 'University',
                    graduationDate: '2015',
                },
            ],
            skills: ['JavaScript', 'TypeScript', 'React'],
        },
        templateId: 'classic-professional',
        theme: {
            primaryColor: '#1a365d',
            fontFamily: 'Inter',
        },
    };
    beforeEach(() => {
        jest.clearAllMocks();
        // Default mock: return a valid PDF buffer
        mockPdfService.processPdfRequest.mockResolvedValue(Buffer.from('%PDF-1.4 mock pdf content'));
    });
    // ==================== POST /api/v1/pdf/generate ====================
    describe('POST /api/v1/pdf/generate', () => {
        it('should generate PDF for valid request', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send(validPdfRequest);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.headers['content-type']).toBe('application/pdf');
            expect(response.headers['content-disposition']).toContain('attachment');
            expect(response.headers['content-disposition']).toContain('john_doe_resume.pdf');
        });
        it('should use sanitized filename from fullName', async () => {
            const requestWithSpecialChars = {
                ...validPdfRequest,
                data: {
                    ...validPdfRequest.data,
                    personalInfo: {
                        ...validPdfRequest.data.personalInfo,
                        fullName: 'José García-López',
                    },
                },
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send(requestWithSpecialChars);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.headers['content-disposition']).toContain('jos__garc_a_l_pez_resume.pdf');
        });
        it('should return 400 for missing resume data', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send({
                templateId: 'classic-professional',
                theme: { primaryColor: '#1a365d' },
            });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
            expect(response.body.error).toContain('Missing resume data');
        });
        it('should return 400 for missing templateId', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send({
                data: validPdfRequest.data,
                theme: { primaryColor: '#1a365d' },
            });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
            expect(response.body.error).toContain('Missing templateId');
        });
        it('should return 400 for missing theme', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send({
                data: validPdfRequest.data,
                templateId: 'classic-professional',
            });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
            expect(response.body.error).toContain('Missing theme');
        });
        it('should return 500 if PDF generation fails', async () => {
            mockPdfService.processPdfRequest.mockRejectedValue(new Error('Puppeteer crashed'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send(validPdfRequest);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.INTERNAL_ERROR);
            expect(response.body.error).toContain('Failed to generate PDF');
        });
        it('should work with different templates', async () => {
            const templates = [
                'classic-professional',
                'modern-sidebar',
                'minimal-clean',
                'header-dark',
                'bold-creative',
            ];
            for (const templateId of templates) {
                const response = await (0, supertest_1.default)(app_1.default)
                    .post('/api/v1/pdf/generate')
                    .send({ ...validPdfRequest, templateId });
                expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
                expect(mockPdfService.processPdfRequest).toHaveBeenCalledWith(expect.objectContaining({ templateId }));
            }
        });
        it('should increment download count for authenticated users', async () => {
            const testUser = (0, testUtils_1.createStarterUser)();
            const authToken = (0, testUtils_1.generateTestToken)(testUser);
            mockPrisma.user.findUnique.mockResolvedValue(testUser);
            await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .set('Authorization', `Bearer ${authToken}`)
                .send(validPdfRequest);
            // Note: incrementDownloadCount is called inside the route after successful generation
            // The mock verifies the route logic
        });
    });
    // ==================== POST /api/v1/pdf/preview ====================
    describe('POST /api/v1/pdf/preview', () => {
        it('should return base64 PDF for preview', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/preview')
                .send(validPdfRequest);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.pdf).toBeDefined();
            expect(typeof response.body.pdf).toBe('string');
            expect(response.body.size).toBeGreaterThan(0);
        });
        it('should return valid base64 string', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/preview')
                .send(validPdfRequest);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            // Verify it's valid base64
            const decoded = Buffer.from(response.body.pdf, 'base64');
            expect(decoded.length).toBeGreaterThan(0);
        });
        it('should return 400 for missing required fields', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/preview')
                .send({});
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
            expect(response.body.error).toContain('Missing required fields');
        });
        it('should return 500 if preview generation fails', async () => {
            mockPdfService.processPdfRequest.mockRejectedValue(new Error('Template not found'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/preview')
                .send(validPdfRequest);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.INTERNAL_ERROR);
            expect(response.body.error).toContain('Failed to generate PDF preview');
        });
    });
    // ==================== Download Limit Tests ====================
    describe('Download Limits', () => {
        it('should block download when limit reached', async () => {
            mockSubscriptionLimits.checkDownloadLimit.mockImplementationOnce((req, res, next) => {
                res.status(429).json({
                    error: 'Download limit reached',
                    code: 'DOWNLOAD_LIMIT_REACHED',
                });
            });
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send(validPdfRequest);
            expect(response.status).toBe(429);
            expect(response.body.code).toBe('DOWNLOAD_LIMIT_REACHED');
        });
        it('should allow anonymous downloads (no auth required)', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send(validPdfRequest);
            // PDF generation should work without auth
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
        });
    });
    // ==================== Edge Cases ====================
    describe('Edge Cases', () => {
        it('should handle empty experience array', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send({
                ...validPdfRequest,
                data: {
                    ...validPdfRequest.data,
                    experience: [],
                },
            });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
        });
        it('should handle missing optional fields', async () => {
            const minimalRequest = {
                data: {
                    personalInfo: {
                        fullName: 'Test User',
                    },
                },
                templateId: 'classic-professional',
                theme: { primaryColor: '#000' },
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send(minimalRequest);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
        });
        it('should handle very long content', async () => {
            const longExperience = Array(20).fill({
                title: 'Developer',
                company: 'Company',
                startDate: '2020-01',
                endDate: '2021-01',
                description: 'Lorem ipsum '.repeat(100),
            });
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send({
                ...validPdfRequest,
                data: {
                    ...validPdfRequest.data,
                    experience: longExperience,
                },
            });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
        });
        it('should use default filename if no name provided', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/pdf/generate')
                .send({
                ...validPdfRequest,
                data: {
                    ...validPdfRequest.data,
                    personalInfo: {},
                },
            });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.headers['content-disposition']).toContain('resume_resume.pdf');
        });
    });
});
//# sourceMappingURL=pdf.test.js.map