"use strict";
/**
 * Health Check Endpoint Tests
 * Verifies the test setup is working correctly
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Health Check Endpoints', () => {
    describe('GET /', () => {
        it('should return app info', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get('/');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('app', 'Best AI Resume API');
            expect(response.body).toHaveProperty('version', '1.0.0');
            expect(response.body).toHaveProperty('docs', '/api/v1');
        });
    });
    describe('GET /health', () => {
        it('should return healthy status', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get('/health');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ status: 'healthy' });
        });
    });
});
describe('Test Utilities Verification', () => {
    it('should have test environment variables set', () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(process.env.JWT_SECRET).toBeDefined();
    });
});
//# sourceMappingURL=health.test.js.map