/**
 * Health Check Endpoint Tests
 * Verifies the test setup is working correctly
 */

import request from 'supertest';
import app from '../app';

describe('Health Check Endpoints', () => {
  describe('GET /', () => {
    it('should return app info', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('app', 'Best AI Resume API');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('docs', '/api/v1');
    });
  });

  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');

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
