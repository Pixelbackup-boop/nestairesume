"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailChange = exports.requestEmailChange = exports.updateProfile = exports.setPassword = exports.changePassword = exports.resetPassword = exports.requestPasswordReset = exports.resendVerificationCode = exports.verifyEmailCode = exports.registerUserWithVerification = exports.handleOAuthSignIn = exports.getUserById = exports.loginUser = exports.registerUser = exports.createAccessToken = exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const env_1 = require("../config/env");
const emailService_1 = require("./emailService");
const SALT_ROUNDS = 10;
const VERIFICATION_CODE_EXPIRY_MINUTES = 10;
const hashPassword = async (password) => {
    return bcrypt_1.default.hash(password, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.verifyPassword = verifyPassword;
const createAccessToken = (userId, email, role) => {
    const expiresIn = env_1.config.accessTokenExpireMinutes * 60; // Convert to seconds
    return jsonwebtoken_1.default.sign({ sub: userId, email, role }, env_1.config.secretKey, { expiresIn });
};
exports.createAccessToken = createAccessToken;
const registerUser = async (email, password, name) => {
    // Check if user exists
    const existingUser = await database_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("Email already registered");
    }
    const hashedPassword = await (0, exports.hashPassword)(password);
    const user = await database_1.default.user.create({
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
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await database_1.default.user.findUnique({ where: { email } });
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
    const isValid = await (0, exports.verifyPassword)(password, user.hashedPassword);
    if (!isValid) {
        throw new Error("Invalid email or password");
    }
    const accessToken = (0, exports.createAccessToken)(user.id, user.email, user.role);
    return {
        access_token: accessToken,
        token_type: "bearer",
    };
};
exports.loginUser = loginUser;
const getUserById = async (userId) => {
    return database_1.default.user.findUnique({
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
exports.getUserById = getUserById;
const handleOAuthSignIn = async (data) => {
    const { provider, providerAccountId, email, name, image } = data;
    // Find existing user by email or provider account
    let user = await database_1.default.user.findFirst({
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
            accounts: true,
        },
    });
    if (user) {
        // Check if this provider is already linked
        const existingAccount = user.accounts?.find((acc) => acc.provider === provider && acc.providerAccountId === providerAccountId);
        if (!existingAccount) {
            // Link new OAuth provider to existing user
            await database_1.default.account.create({
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
            await database_1.default.user.update({
                where: { id: user.id },
                data: { image },
            });
        }
        // Mark email as verified for OAuth users
        if (!user.emailVerified) {
            await database_1.default.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        }
    }
    else {
        // Create new user with OAuth account
        user = await database_1.default.user.create({
            data: {
                email,
                name,
                image,
                emailVerified: new Date(), // OAuth emails are pre-verified
                hashedPassword: "", // No password for OAuth users
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
                accounts: true,
            },
        });
    }
    // Generate JWT token
    const accessToken = (0, exports.createAccessToken)(user.id, user.email, user.role);
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
exports.handleOAuthSignIn = handleOAuthSignIn;
// ==================== Email Verification Functions ====================
const registerUserWithVerification = async (email, password, name) => {
    // Check if user exists and is already verified
    const existingUser = await database_1.default.user.findUnique({ where: { email } });
    if (existingUser?.emailVerified) {
        throw new Error("Email already registered");
    }
    const hashedPassword = await (0, exports.hashPassword)(password);
    const verificationCode = (0, emailService_1.generateVerificationCode)();
    const verificationCodeExpires = new Date(Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000);
    let user;
    if (existingUser) {
        // Update existing unverified user
        user = await database_1.default.user.update({
            where: { email },
            data: {
                hashedPassword,
                name,
                verificationCode,
                verificationCodeExpires,
            },
        });
    }
    else {
        // Create new user
        user = await database_1.default.user.create({
            data: {
                email,
                hashedPassword,
                name,
                verificationCode,
                verificationCodeExpires,
            },
        });
    }
    // Send verification email
    await (0, emailService_1.sendVerificationEmail)(email, name, verificationCode);
    return {
        requiresVerification: true,
        email: user.email,
        message: "Verification code sent to your email",
    };
};
exports.registerUserWithVerification = registerUserWithVerification;
const verifyEmailCode = async (email, code) => {
    const user = await database_1.default.user.findUnique({ where: { email } });
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
    await database_1.default.user.update({
        where: { email },
        data: {
            emailVerified: new Date(),
            verificationCode: null,
            verificationCodeExpires: null,
        },
    });
    // Generate access token
    const accessToken = (0, exports.createAccessToken)(user.id, user.email, user.role);
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
exports.verifyEmailCode = verifyEmailCode;
const resendVerificationCode = async (email) => {
    const user = await database_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.emailVerified) {
        throw new Error("Email already verified");
    }
    const verificationCode = (0, emailService_1.generateVerificationCode)();
    const verificationCodeExpires = new Date(Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000);
    await database_1.default.user.update({
        where: { email },
        data: {
            verificationCode,
            verificationCodeExpires,
        },
    });
    await (0, emailService_1.sendVerificationEmail)(email, user.name, verificationCode);
    return {
        message: "Verification code sent to your email",
    };
};
exports.resendVerificationCode = resendVerificationCode;
// ==================== Password Reset Functions ====================
const requestPasswordReset = async (email) => {
    const user = await database_1.default.user.findUnique({ where: { email } });
    // Always return success to prevent email enumeration
    if (!user) {
        return { message: "If the email exists, a reset code has been sent" };
    }
    const verificationCode = (0, emailService_1.generateVerificationCode)();
    const verificationCodeExpires = new Date(Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000);
    await database_1.default.user.update({
        where: { email },
        data: {
            verificationCode,
            verificationCodeExpires,
        },
    });
    await (0, emailService_1.sendPasswordResetEmail)(email, user.name, verificationCode);
    return { message: "If the email exists, a reset code has been sent" };
};
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = async (email, code, newPassword) => {
    if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }
    const user = await database_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("Invalid email or code");
    }
    if (!user.verificationCode || user.verificationCode !== code) {
        throw new Error("Invalid verification code");
    }
    if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
        throw new Error("Verification code has expired");
    }
    const hashedPassword = await (0, exports.hashPassword)(newPassword);
    await database_1.default.user.update({
        where: { email },
        data: {
            hashedPassword,
            verificationCode: null,
            verificationCodeExpires: null,
        },
    });
    return { message: "Password reset successfully" };
};
exports.resetPassword = resetPassword;
const changePassword = async (userId, currentPassword, newPassword) => {
    if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }
    const user = await database_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    // OAuth-only users have no password to change
    if (!user.hashedPassword) {
        throw new Error("Cannot change password for OAuth-only account");
    }
    const isValid = await (0, exports.verifyPassword)(currentPassword, user.hashedPassword);
    if (!isValid) {
        throw new Error("Current password is incorrect");
    }
    const hashedPassword = await (0, exports.hashPassword)(newPassword);
    await database_1.default.user.update({
        where: { id: userId },
        data: { hashedPassword },
    });
    return { message: "Password changed successfully" };
};
exports.changePassword = changePassword;
const setPassword = async (userId, newPassword) => {
    if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }
    const hashedPassword = await (0, exports.hashPassword)(newPassword);
    await database_1.default.user.update({
        where: { id: userId },
        data: { hashedPassword },
    });
    return { message: "Password set successfully" };
};
exports.setPassword = setPassword;
const updateProfile = async (userId, data) => {
    // Build update object
    const updateData = {};
    if (data.name)
        updateData.name = data.name;
    if (data.avatarId)
        updateData.image = `avatar-${data.avatarId}`;
    // Update user
    const user = await database_1.default.user.update({
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
exports.updateProfile = updateProfile;
// ==================== Email Change Functions ====================
const requestEmailChange = async (userId, newEmail) => {
    // Check if new email is already in use
    const existing = await database_1.default.user.findFirst({
        where: {
            email: newEmail,
            NOT: { id: userId },
        },
    });
    if (existing) {
        throw new Error("Email already in use");
    }
    // Get current user
    const user = await database_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    // Generate verification code and expiry
    const verificationCode = (0, emailService_1.generateVerificationCode)();
    const verificationCodeExpires = new Date(Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000);
    // Store pending email and code in user record
    await database_1.default.user.update({
        where: { id: userId },
        data: {
            pendingEmail: newEmail,
            verificationCode,
            verificationCodeExpires,
        },
    });
    // Send verification email to the NEW email address
    await (0, emailService_1.sendEmailChangeVerification)(newEmail, user.name, verificationCode);
    return { message: "Verification code sent to your new email address" };
};
exports.requestEmailChange = requestEmailChange;
const verifyEmailChange = async (userId, newEmail, code) => {
    const user = await database_1.default.user.findUnique({ where: { id: userId } });
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
    const existing = await database_1.default.user.findFirst({
        where: {
            email: newEmail,
            NOT: { id: userId },
        },
    });
    if (existing) {
        throw new Error("Email is no longer available");
    }
    // Update email and clear verification fields
    const updatedUser = await database_1.default.user.update({
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
exports.verifyEmailChange = verifyEmailChange;
//# sourceMappingURL=authService.js.map