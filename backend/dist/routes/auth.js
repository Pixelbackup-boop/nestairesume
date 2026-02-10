"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("../services/authService");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// ==================== Registration ====================
// POST /api/v1/auth/register - Register with email verification
router.post("/register", (0, validation_1.validateBody)(validation_1.registerSchema), async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const result = await (0, authService_1.registerUserWithVerification)(email, password, name);
        res.status(201).json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Registration failed";
        if (message === "Email already registered") {
            res.status(400).json({ detail: message });
        }
        else {
            res.status(500).json({ detail: message });
        }
    }
});
// ==================== Email Verification ====================
// POST /api/v1/auth/verify-email
router.post("/verify-email", (0, validation_1.validateBody)(validation_1.verifyEmailSchema), async (req, res) => {
    try {
        const { email, code } = req.body;
        const result = await (0, authService_1.verifyEmailCode)(email, code);
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Verification failed";
        res.status(400).json({ detail: message });
    }
});
// POST /api/v1/auth/resend-code
router.post("/resend-code", (0, validation_1.validateBody)(validation_1.resendCodeSchema), async (req, res) => {
    try {
        const { email } = req.body;
        const result = await (0, authService_1.resendVerificationCode)(email);
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to resend code";
        res.status(400).json({ detail: message });
    }
});
// ==================== Login ====================
// POST /api/v1/auth/token - Login
router.post("/token", (0, validation_1.validateBody)(validation_1.loginSchema), async (req, res) => {
    try {
        // Support both form-urlencoded (OAuth2) and JSON
        const email = req.body.username || req.body.email;
        const password = req.body.password;
        const token = await (0, authService_1.loginUser)(email, password);
        res.json(token);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Login failed";
        res.status(401).json({ detail: message });
    }
});
// ==================== OAuth ====================
// POST /api/v1/auth/oauth - Handle OAuth sign-in from NextAuth
router.post("/oauth", (0, validation_1.validateBody)(validation_1.oauthSchema), async (req, res) => {
    try {
        const { provider, providerAccountId, email, name, image, accessToken, refreshToken } = req.body;
        const result = await (0, authService_1.handleOAuthSignIn)({
            provider,
            providerAccountId,
            email,
            name: name || email.split("@")[0],
            image,
            accessToken,
            refreshToken,
        });
        res.json(result);
    }
    catch (error) {
        console.error("OAuth sign-in error:", error);
        const message = error instanceof Error ? error.message : "OAuth sign-in failed";
        res.status(500).json({ detail: message });
    }
});
// ==================== Password Reset ====================
// POST /api/v1/auth/forgot-password
router.post("/forgot-password", (0, validation_1.validateBody)(validation_1.forgotPasswordSchema), async (req, res) => {
    try {
        const { email } = req.body;
        const result = await (0, authService_1.requestPasswordReset)(email);
        res.json(result);
    }
    catch (error) {
        // Always return success to prevent email enumeration
        res.json({ message: "If the email exists, a reset code has been sent" });
    }
});
// POST /api/v1/auth/reset-password
router.post("/reset-password", (0, validation_1.validateBody)(validation_1.resetPasswordSchema), async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        const result = await (0, authService_1.resetPassword)(email, code, newPassword);
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Password reset failed";
        res.status(400).json({ detail: message });
    }
});
// ==================== Protected Routes ====================
// GET /api/v1/auth/me
router.get("/me", auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const user = await (0, authService_1.getUserById)(req.user.id);
        if (!user) {
            res.status(404).json({ detail: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ detail: "Failed to get user" });
    }
});
// PATCH /api/v1/auth/profile - Update user profile (name and avatar only)
router.patch("/profile", auth_1.authenticateToken, (0, validation_1.validateBody)(validation_1.updateProfileSchema), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const { name, avatarId } = req.body;
        const user = await (0, authService_1.updateProfile)(req.user.id, { name, avatarId });
        res.json(user);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Profile update failed";
        res.status(400).json({ detail: message });
    }
});
// POST /api/v1/auth/request-email-change - Request email change with verification
router.post("/request-email-change", auth_1.authenticateToken, (0, validation_1.validateBody)(validation_1.requestEmailChangeSchema), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const { newEmail } = req.body;
        const result = await (0, authService_1.requestEmailChange)(req.user.id, newEmail);
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Email change request failed";
        res.status(400).json({ detail: message });
    }
});
// POST /api/v1/auth/verify-email-change - Verify code and complete email change
router.post("/verify-email-change", auth_1.authenticateToken, (0, validation_1.validateBody)(validation_1.verifyEmailChangeSchema), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const { newEmail, code } = req.body;
        const user = await (0, authService_1.verifyEmailChange)(req.user.id, newEmail, code);
        res.json(user);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Email verification failed";
        res.status(400).json({ detail: message });
    }
});
// POST /api/v1/auth/change-password
router.post("/change-password", auth_1.authenticateToken, (0, validation_1.validateBody)(validation_1.changePasswordSchema), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const { currentPassword, newPassword } = req.body;
        const result = await (0, authService_1.changePassword)(req.user.id, currentPassword, newPassword);
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Password change failed";
        res.status(400).json({ detail: message });
    }
});
// POST /api/v1/auth/set-password - For OAuth users who want to add a password
router.post("/set-password", auth_1.authenticateToken, (0, validation_1.validateBody)(validation_1.setPasswordSchema), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const { password } = req.body;
        const result = await (0, authService_1.setPassword)(req.user.id, password);
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to set password";
        res.status(400).json({ detail: message });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map