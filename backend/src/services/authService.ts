import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/database";
import { config } from "../config/env";
import {
  generateVerificationCode,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendEmailChangeVerification,
} from "./emailService";

const SALT_ROUNDS = 10;
const VERIFICATION_CODE_EXPIRY_MINUTES = 10;

type GeoInfo = { country: string; countryCode: string } | null;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const createAccessToken = (userId: string, email: string, role: string): string => {
  const expiresIn = config.accessTokenExpireMinutes * 60; // Convert to seconds
  return jwt.sign(
    { sub: userId, email, role },
    config.secretKey,
    { expiresIn }
  );
};

export const refreshAccessToken = async (expiredToken: string): Promise<string> => {
  // Verify signature but allow expired tokens
  const decoded = jwt.verify(expiredToken, config.secretKey, {
    ignoreExpiration: true,
  }) as { sub: string; email: string; role: string };

  const user = await prisma.user.findUnique({
    where: { id: decoded.sub },
    select: { id: true, email: true, role: true, isSuspended: true },
  });

  if (!user) throw new Error("User not found");
  if (user.isSuspended) throw new Error("Account suspended");

  return createAccessToken(user.id, user.email, user.role);
};

export const registerUser = async (email: string, password: string, name: string) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};

export const loginUser = async (email: string, password: string, geo?: GeoInfo) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check if user is suspended
  if (user.isSuspended) {
    throw new Error("Account suspended. Please contact support.");
  }

  // OAuth-only users have no password
  if (!user.hashedPassword) {
    throw new Error("Invalid email or password");
  }

  const isValid = await verifyPassword(password, user.hashedPassword);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  // Update country on login (keeps it current)
  if (geo) {
    await prisma.user.update({
      where: { id: user.id },
      data: { country: geo.country, countryCode: geo.countryCode },
    });
  }

  const accessToken = createAccessToken(user.id, user.email, user.role);

  return {
    access_token: accessToken,
    token_type: "bearer",
  };
};

export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      subscriptionTier: true,
      subscriptionStatus: true,
      trialEndsAt: true,
      isSuspended: true,
      createdAt: true,
    },
  });
};

// ==================== OAuth Functions ====================

interface OAuthData {
  provider: string;
  providerAccountId: string;
  email: string;
  name: string;
  image?: string;
  accessToken?: string;
  refreshToken?: string;
  geo?: GeoInfo;
}

export const handleOAuthSignIn = async (data: OAuthData) => {
  const { provider, providerAccountId, email, name, image, geo } = data;

  // Find existing user by email or provider account
  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        {
          accounts: {
            some: {
              provider,
              providerAccountId,
            },
          },
        },
      ],
    },
    include: {
      accounts: {
        select: { provider: true, providerAccountId: true },
      },
    },
  });

  if (user) {
    // Check if this provider is already linked
    const existingAccount = user.accounts?.find(
      (acc) => acc.provider === provider && acc.providerAccountId === providerAccountId
    );

    if (!existingAccount) {
      // Link new OAuth provider to existing user
      await prisma.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider,
          providerAccountId,
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
        },
      });
    }

    // Update user's image if not set
    if (!user.image && image) {
      await prisma.user.update({
        where: { id: user.id },
        data: { image },
      });
    }

    // Mark email as verified for OAuth users + update country
    if (!user.emailVerified || geo) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(!user.emailVerified && { emailVerified: new Date() }),
          ...(geo && { country: geo.country, countryCode: geo.countryCode }),
        },
      });
    }
  } else {
    // Create new user with OAuth account
    user = await prisma.user.create({
      data: {
        email,
        name,
        image,
        emailVerified: new Date(), // OAuth emails are pre-verified
        hashedPassword: "", // No password for OAuth users
        ...(geo && { country: geo.country, countryCode: geo.countryCode }),
        accounts: {
          create: {
            type: "oauth",
            provider,
            providerAccountId,
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
          },
        },
      },
      include: {
        accounts: {
          select: { provider: true, providerAccountId: true },
        },
      },
    });
  }

  // Generate JWT token
  const accessToken = createAccessToken(user.id, user.email, user.role);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    },
    access_token: accessToken,
    token_type: "bearer",
  };
};

// ==================== Email Verification Functions ====================

export const registerUserWithVerification = async (
  email: string,
  password: string,
  name: string,
  geo?: GeoInfo
) => {
  // Check if user exists and is already verified
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser?.emailVerified) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(password);
  const verificationCode = generateVerificationCode();
  const verificationCodeExpires = new Date(
    Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000
  );

  let user;

  if (existingUser) {
    // Update existing unverified user
    user = await prisma.user.update({
      where: { email },
      data: {
        hashedPassword,
        name,
        verificationCode,
        verificationCodeExpires,
        ...(geo && { country: geo.country, countryCode: geo.countryCode }),
      },
    });
  } else {
    // Create new user
    user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
        verificationCode,
        verificationCodeExpires,
        ...(geo && { country: geo.country, countryCode: geo.countryCode }),
      },
    });
  }

  // Send verification email
  await sendVerificationEmail(email, name, verificationCode);

  return {
    requiresVerification: true,
    email: user.email,
    message: "Verification code sent to your email",
  };
};

export const verifyEmailCode = async (email: string, code: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.emailVerified) {
    throw new Error("Email already verified");
  }

  if (!user.verificationCode || user.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
    throw new Error("Verification code has expired");
  }

  // Mark email as verified
  await prisma.user.update({
    where: { email },
    data: {
      emailVerified: new Date(),
      verificationCode: null,
      verificationCodeExpires: null,
    },
  });

  // Generate access token
  const accessToken = createAccessToken(user.id, user.email, user.role);

  return {
    access_token: accessToken,
    token_type: "bearer",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

export const resendVerificationCode = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.emailVerified) {
    throw new Error("Email already verified");
  }

  const verificationCode = generateVerificationCode();
  const verificationCodeExpires = new Date(
    Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000
  );

  await prisma.user.update({
    where: { email },
    data: {
      verificationCode,
      verificationCodeExpires,
    },
  });

  await sendVerificationEmail(email, user.name, verificationCode);

  return {
    message: "Verification code sent to your email",
  };
};

// ==================== Password Reset Functions ====================

export const requestPasswordReset = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to prevent email enumeration
  if (!user) {
    return { message: "If the email exists, a reset code has been sent" };
  }

  const verificationCode = generateVerificationCode();
  const verificationCodeExpires = new Date(
    Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000
  );

  await prisma.user.update({
    where: { email },
    data: {
      verificationCode,
      verificationCodeExpires,
    },
  });

  await sendPasswordResetEmail(email, user.name, verificationCode);

  return { message: "If the email exists, a reset code has been sent" };
};

export const resetPassword = async (
  email: string,
  code: string,
  newPassword: string
) => {
  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or code");
  }

  if (!user.verificationCode || user.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
    throw new Error("Verification code has expired");
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { email },
    data: {
      hashedPassword,
      verificationCode: null,
      verificationCodeExpires: null,
    },
  });

  return { message: "Password reset successfully" };
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  // OAuth-only users have no password to change
  if (!user.hashedPassword) {
    throw new Error("Cannot change password for OAuth-only account");
  }

  const isValid = await verifyPassword(currentPassword, user.hashedPassword);
  if (!isValid) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { hashedPassword },
  });

  return { message: "Password changed successfully" };
};

export const setPassword = async (userId: string, newPassword: string) => {
  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { hashedPassword },
  });

  return { message: "Password set successfully" };
};

// ==================== Profile Update Functions ====================

interface UpdateProfileData {
  name?: string;
  avatarId?: number;
}

export const updateProfile = async (userId: string, data: UpdateProfileData) => {
  // Build update object
  const updateData: { name?: string; image?: string } = {};
  if (data.name) updateData.name = data.name;
  if (data.avatarId) updateData.image = `avatar-${data.avatarId}`;

  // Update user
  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
    },
  });

  return user;
};

// ==================== Email Change Functions ====================

export const requestEmailChange = async (userId: string, newEmail: string) => {
  // Check if new email is already in use
  const existing = await prisma.user.findFirst({
    where: {
      email: newEmail,
      NOT: { id: userId },
    },
  });

  if (existing) {
    throw new Error("Email already in use");
  }

  // Get current user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate verification code and expiry
  const verificationCode = generateVerificationCode();
  const verificationCodeExpires = new Date(
    Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000
  );

  // Store pending email and code in user record
  await prisma.user.update({
    where: { id: userId },
    data: {
      pendingEmail: newEmail,
      verificationCode,
      verificationCodeExpires,
    },
  });

  // Send verification email to the NEW email address
  await sendEmailChangeVerification(newEmail, user.name, verificationCode);

  return { message: "Verification code sent to your new email address" };
};

export const verifyEmailChange = async (
  userId: string,
  newEmail: string,
  code: string
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  // Verify the pending email matches
  if (!user.pendingEmail || user.pendingEmail !== newEmail) {
    throw new Error("Email change request not found or email mismatch");
  }

  // Verify the code
  if (!user.verificationCode || user.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  // Check expiry
  if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
    throw new Error("Verification code has expired");
  }

  // Double-check email is still available (race condition protection)
  const existing = await prisma.user.findFirst({
    where: {
      email: newEmail,
      NOT: { id: userId },
    },
  });

  if (existing) {
    throw new Error("Email is no longer available");
  }

  // Update email and clear verification fields
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      email: newEmail,
      pendingEmail: null,
      verificationCode: null,
      verificationCodeExpires: null,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      subscriptionTier: true,
      subscriptionStatus: true,
      trialEndsAt: true,
    },
  });

  return updatedUser;
};
