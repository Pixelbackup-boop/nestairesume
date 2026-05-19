import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const mockStorage: Record<string, string> = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn((key: string) => mockStorage[key] || null),
    setItem: vi.fn((key: string, val: string) => { mockStorage[key] = val; }),
    removeItem: vi.fn((key: string) => { delete mockStorage[key]; }),
  },
});

describe('api client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('api.get', () => {
    it('makes a GET request to the correct URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, name: 'Test' }),
      });

      const result = await api.get('/users/1');
      expect(result.data).toEqual({ id: 1, name: 'Test' });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:4444/api/v1/users/1',
        expect.objectContaining({ method: 'GET' }),
      );
    });

    it('includes auth token when available', async () => {
      mockStorage.token = 'test-jwt-token';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await api.get('/profile');

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers.Authorization).toBe('Bearer test-jwt-token');
    });

    it('does not include auth header when no token', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await api.get('/public');

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers.Authorization).toBeUndefined();
    });

    it('appends query params', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      });

      await api.get('/search', { params: { q: 'developer', page: '1' } });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('?q=developer&page=1');
    });
  });

  describe('api.post', () => {
    it('sends JSON body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 2 }),
      });

      await api.post('/users', { name: 'New User', email: 'new@test.com' });

      const [, options] = mockFetch.mock.calls[0];
      expect(options.method).toBe('POST');
      expect(options.body).toBe(JSON.stringify({ name: 'New User', email: 'new@test.com' }));
      expect(options.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('error handling', () => {
    it('throws with status and message on HTTP error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Validation failed' }),
      });

      await expect(api.post('/users', {})).rejects.toMatchObject({
        response: { status: 400 },
        message: 'Validation failed',
      });
    });

    it('throws network error on fetch failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'));

      await expect(api.get('/anything')).rejects.toMatchObject({
        message: 'Failed to fetch',
      });
    });

    it('removes token on 401 response', async () => {
      // Set initial location to admin path for redirect test
      Object.defineProperty(window, 'location', {
        value: { pathname: '/dashboard', href: '' },
        writable: true,
      });

      mockStorage.token = 'expired-token';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Unauthorized' }),
      });

      await expect(api.get('/protected')).rejects.toMatchObject({
        response: { status: 401 },
      });
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('other methods', () => {
    it('api.put sends PUT request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ updated: true }),
      });

      await api.put('/users/1', { name: 'Updated' });
      expect(mockFetch.mock.calls[0][1].method).toBe('PUT');
    });

    it('api.patch sends PATCH request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ patched: true }),
      });

      await api.patch('/users/1', { name: 'Patched' });
      expect(mockFetch.mock.calls[0][1].method).toBe('PATCH');
    });

    it('api.delete sends DELETE request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ deleted: true }),
      });

      await api.delete('/users/1');
      expect(mockFetch.mock.calls[0][1].method).toBe('DELETE');
    });
  });
});
