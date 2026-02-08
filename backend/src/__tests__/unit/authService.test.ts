/**
 * Auth Service Unit Tests
 * Tests for JWT generation, password hashing, login/register
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  hashPassword,
  verifyPassword,
  createAccessToken,
  registerUser,
  loginUser,
  getUserById,
} from '../../services/authService';
import prisma from '../../config/database';
import { createTestUser } from '../helpers/testUtils';

// Mock dependencies
jest.mock('../../config/database');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==================== PASSWORD HASHING ====================
  describe('hashPassword', () => {
    it('should hash password with bcrypt', async () => {
      const password = 'MySecurePassword123!';
      const hashedPassword = '$2b$10$hashedpasswordhere';

      (mockBcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await hashPassword(password);

      expect(mockBcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });

    it('should use 10 salt rounds', async () => {
      (mockBcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      await hashPassword('password');

      expect(mockBcrypt.hash).toHaveBeenCalledWith('password', 10);
    });
  });

  describe('verifyPassword', () => {
    it('should return true for matching password', async () => {
      const password = 'correctPassword';
      const hashedPassword = '$2b$10$hashedpassword';

      (mockBcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await verifyPassword(password, hashedPassword);

      expect(mockBcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for non-matching password', async () => {
      (mockBcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await verifyPassword('wrongPassword', 'hashedPassword');

      expect(result).toBe(false);
    });
  });

  // ==================== JWT TOKEN GENERATION ====================
  describe('createAccessToken', () => {
    it('should create JWT with correct payload', () => {
      const userId = 'user-123';
      const email = 'test@example.com';
      const role = 'user';
      const expectedToken = 'jwt-token-here';

      (mockJwt.sign as jest.Mock).mockReturnValue(expectedToken);

      const result = createAccessToken(userId, email, role);

      expect(mockJwt.sign).toHaveBeenCalledWith(
        { sub: userId, email, role },
        expect.any(String), // secret key
        expect.objectContaining({ expiresIn: expect.any(Number) })
      );
      expect(result).toBe(expectedToken);
    });

    it('should include user ID as sub claim', () => {
      (mockJwt.sign as jest.Mock).mockReturnValue('token');

      createAccessToken('user-456', 'test@test.com', 'admin');

      const callArgs = (mockJwt.sign as jest.Mock).mock.calls[0][0];
      expect(callArgs.sub).toBe('user-456');
    });

    it('should include email in payload', () => {
      (mockJwt.sign as jest.Mock).mockReturnValue('token');

      createAccessToken('user-123', 'admin@test.com', 'user');

      const callArgs = (mockJwt.sign as jest.Mock).mock.calls[0][0];
      expect(callArgs.email).toBe('admin@test.com');
    });

    it('should include role in payload', () => {
      (mockJwt.sign as jest.Mock).mockReturnValue('token');

      createAccessToken('user-123', 'test@test.com', 'admin');

      const callArgs = (mockJwt.sign as jest.Mock).mock.calls[0][0];
      expect(callArgs.role).toBe('admin');
    });
  });

  // ==================== USER REGISTRATION ====================
  describe('registerUser', () => {
    it('should create new user with hashed password', async () => {
      const email = 'newuser@test.com';
      const password = 'Password123!';
      const name = 'New User';
      const hashedPassword = '$2b$10$hashed';

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (mockBcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (mockPrisma.user.create as jest.Mock).mockResolvedValue({
        id: 'new-user-id',
        email,
        name,
      });

      const result = await registerUser(email, password, name);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(mockBcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: { email, hashedPassword, name },
      });
      expect(result).toEqual({
        id: 'new-user-id',
        email,
        name,
      });
    });

    it('should throw error if email already exists', async () => {
      const existingUser = createTestUser({ email: 'existing@test.com' });
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

      await expect(
        registerUser('existing@test.com', 'password', 'Test')
      ).rejects.toThrow('Email already registered');

      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it('should not store plain text password', async () => {
      const plainPassword = 'MyPassword123';

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (mockBcrypt.hash as jest.Mock).mockResolvedValue('$2b$10$hashed');
      (mockPrisma.user.create as jest.Mock).mockResolvedValue({
        id: 'id',
        email: 'test@test.com',
        name: 'Test',
      });

      await registerUser('test@test.com', plainPassword, 'Test');

      const createCall = (mockPrisma.user.create as jest.Mock).mock.calls[0][0];
      expect(createCall.data.hashedPassword).not.toBe(plainPassword);
      expect(createCall.data.hashedPassword).toContain('$2b$10$');
    });
  });

  // ==================== USER LOGIN ====================
  describe('loginUser', () => {
    it('should return access token for valid credentials', async () => {
      const user = createTestUser({
        email: 'valid@test.com',
        hashedPassword: '$2b$10$hashed',
        emailVerified: new Date(),
      });

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (mockBcrypt.compare as jest.Mock).mockResolvedValue(true);
      (mockJwt.sign as jest.Mock).mockReturnValue('access-token');

      const result = await loginUser('valid@test.com', 'correctPassword');

      expect(result).toEqual({
        access_token: 'access-token',
        token_type: 'bearer',
      });
    });

    it('should throw error for non-existent user', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        loginUser('nonexistent@test.com', 'password')
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw error for wrong password', async () => {
      const user = createTestUser({
        hashedPassword: '$2b$10$hashed',
        emailVerified: new Date(),
      });

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (mockBcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        loginUser('test@test.com', 'wrongPassword')
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw error for suspended user', async () => {
      const suspendedUser = createTestUser({
        isSuspended: true,
        hashedPassword: '$2b$10$hashed',
        emailVerified: new Date(),
      });

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(suspendedUser);

      await expect(
        loginUser('suspended@test.com', 'password')
      ).rejects.toThrow('Account suspended');
    });

    it('should throw error for OAuth-only user (no password)', async () => {
      const oauthUser = createTestUser({
        hashedPassword: null,
        emailVerified: new Date(),
      });

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(oauthUser);

      // OAuth users have no password, so login fails with generic error
      await expect(
        loginUser('oauth@test.com', 'password')
      ).rejects.toThrow('Invalid email or password');
    });

    it('should allow login for verified email user', async () => {
      // Note: Email verification is handled at registration, not login
      // This test verifies that users with verified email can log in
      const verifiedUser = createTestUser({
        hashedPassword: '$2b$10$hashed',
        emailVerified: new Date(),
      });

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(verifiedUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await loginUser('verified@test.com', 'password');
      expect(result).toHaveProperty('access_token');
    });
  });

  // ==================== GET USER BY ID ====================
  describe('getUserById', () => {
    it('should return user profile without sensitive data', async () => {
      const user = {
        id: 'user-123',
        email: 'test@test.com',
        name: 'Test User',
        image: null,
        role: 'user',
        subscriptionTier: 'starter',
        subscriptionStatus: 'active',
        trialEndsAt: null,
        isSuspended: false,
        createdAt: new Date(),
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      const result = await getUserById('user-123');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        select: expect.objectContaining({
          id: true,
          email: true,
          name: true,
          role: true,
          subscriptionTier: true,
        }),
      });
      expect(result).toEqual(user);
    });

    it('should return null for non-existent user', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getUserById('non-existent-id');

      expect(result).toBeNull();
    });

    it('should NOT select hashedPassword', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue({});

      await getUserById('user-123');

      const selectArg = (mockPrisma.user.findUnique as jest.Mock).mock.calls[0][0].select;
      expect(selectArg.hashedPassword).toBeUndefined();
    });
  });
});
