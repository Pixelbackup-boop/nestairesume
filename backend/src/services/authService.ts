import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/database";
import { config } from "../config/env";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const createAccessToken = (userId: string, email: string): string => {
  const expiresIn = config.accessTokenExpireMinutes * 60; // Convert to seconds
  return jwt.sign(
    { sub: userId, email },
    config.secretKey,
    { expiresIn }
  );
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

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await verifyPassword(password, user.hashedPassword);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = createAccessToken(user.id, user.email);

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
      subscriptionTier: true,
      creditsRemaining: true,
    },
  });
};
