import { Router, Request, Response } from "express";
import logger from "../lib/logger";
import {
  registerUser,
  loginUser,
  getUserById,
  handleOAuthSignIn,
  registerUserWithVerification,
  verifyEmailCode,
  resendVerificationCode,
  requestPasswordReset,
  resetPassword,
  changePassword,
  setPassword,
  updateProfile,
  requestEmailChange,
  verifyEmailChange,
  refreshAccessToken,
} from "../services/authService";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { getCountryFromRequest } from "../lib/geoLocation";
import {
  validateBody,
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendCodeSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  setPasswordSchema,
  oauthSchema,
  updateProfileSchema,
  requestEmailChangeSchema,
  verifyEmailChangeSchema,
} from "../middleware/validation";

const router = Router();

// ==================== Registration ====================

// POST /api/v1/auth/register - Register with email verification
router.post("/register", validateBody(registerSchema), async (req: Request, res: Response) => {
  try {
    const { email, password, name, countryCode } = req.body;
    const geo = getCountryFromRequest(req, countryCode);
    const result = await registerUserWithVerification(email, password, name, geo);
    res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    if (message === "Email already registered") {
      res.status(400).json({ detail: message });
    } else {
      res.status(500).json({ detail: message });
    }
  }
});

// ==================== Email Verification ====================

// POST /api/v1/auth/verify-email
router.post("/verify-email", validateBody(verifyEmailSchema), async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const result = await verifyEmailCode(email, code);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Verification failed";
    res.status(400).json({ detail: message });
  }
});

// POST /api/v1/auth/resend-code
router.post("/resend-code", validateBody(resendCodeSchema), async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await resendVerificationCode(email);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to resend code";
    res.status(400).json({ detail: message });
  }
});

// ==================== Login ====================

// POST /api/v1/auth/token - Login
router.post("/token", validateBody(loginSchema), async (req: Request, res: Response) => {
  try {
    // Support both form-urlencoded (OAuth2) and JSON
    const email = req.body.username || req.body.email;
    const password = req.body.password;
    const geo = getCountryFromRequest(req, req.body.countryCode);

    const token = await loginUser(email, password, geo);
    res.json(token);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(401).json({ detail: message });
  }
});

// ==================== OAuth ====================

// POST /api/v1/auth/oauth - Handle OAuth sign-in from NextAuth
router.post("/oauth", validateBody(oauthSchema), async (req: Request, res: Response) => {
  try {
    const { provider, providerAccountId, email, name, image, accessToken, refreshToken, countryCode } = req.body;

    const geo = getCountryFromRequest(req, countryCode);

    const result = await handleOAuthSignIn({
      provider,
      providerAccountId,
      email,
      name: name || email.split("@")[0],
      image,
      accessToken,
      refreshToken,
      geo,
    });

    res.json(result);
  } catch (error) {
    logger.error({ err: error }, 'OAuth sign-in error');
    const message = error instanceof Error ? error.message : "OAuth sign-in failed";
    res.status(500).json({ detail: message });
  }
});

// ==================== Token Refresh ====================

// POST /api/v1/auth/refresh - Refresh an expired JWT
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ detail: "Token is required" });
      return;
    }

    const newToken = await refreshAccessToken(token);
    res.json({ access_token: newToken, token_type: "bearer" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Token refresh failed";
    res.status(401).json({ detail: message });
  }
});

// ==================== Password Reset ====================

// POST /api/v1/auth/forgot-password
router.post("/forgot-password", validateBody(forgotPasswordSchema), async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await requestPasswordReset(email);
    res.json(result);
  } catch (error) {
    // Always return success to prevent email enumeration
    res.json({ message: "If the email exists, a reset code has been sent" });
  }
});

// POST /api/v1/auth/reset-password
router.post("/reset-password", validateBody(resetPasswordSchema), async (req: Request, res: Response) => {
  try {
    const { email, code, newPassword } = req.body;
    const result = await resetPassword(email, code, newPassword);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Password reset failed";
    res.status(400).json({ detail: message });
  }
});

// ==================== Protected Routes ====================

// GET /api/v1/auth/me
router.get("/me", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const user = await getUserById(req.user.id);
    if (!user) {
      res.status(404).json({ detail: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ detail: "Failed to get user" });
  }
});

// PATCH /api/v1/auth/profile - Update user profile (name and avatar only)
router.patch("/profile", authenticateToken, validateBody(updateProfileSchema), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const { name, avatarId } = req.body;
    const user = await updateProfile(req.user.id, { name, avatarId });
    res.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Profile update failed";
    res.status(400).json({ detail: message });
  }
});

// POST /api/v1/auth/request-email-change - Request email change with verification
router.post("/request-email-change", authenticateToken, validateBody(requestEmailChangeSchema), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const { newEmail } = req.body;
    const result = await requestEmailChange(req.user.id, newEmail);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email change request failed";
    res.status(400).json({ detail: message });
  }
});

// POST /api/v1/auth/verify-email-change - Verify code and complete email change
router.post("/verify-email-change", authenticateToken, validateBody(verifyEmailChangeSchema), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const { newEmail, code } = req.body;
    const user = await verifyEmailChange(req.user.id, newEmail, code);
    res.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email verification failed";
    res.status(400).json({ detail: message });
  }
});

// POST /api/v1/auth/change-password
router.post("/change-password", authenticateToken, validateBody(changePasswordSchema), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const { currentPassword, newPassword } = req.body;
    const result = await changePassword(req.user.id, currentPassword, newPassword);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Password change failed";
    res.status(400).json({ detail: message });
  }
});

// POST /api/v1/auth/set-password - For OAuth users who want to add a password
router.post("/set-password", authenticateToken, validateBody(setPasswordSchema), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const { password } = req.body;
    const result = await setPassword(req.user.id, password);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to set password";
    res.status(400).json({ detail: message });
  }
});

export default router;
