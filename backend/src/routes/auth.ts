import { Router, Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "../services/authService";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// POST /api/v1/auth/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ detail: "Email, password, and name are required" });
      return;
    }

    const user = await registerUser(email, password, name);
    res.status(201).json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    if (message === "Email already registered") {
      res.status(400).json({ detail: message });
    } else {
      res.status(500).json({ detail: message });
    }
  }
});

// POST /api/v1/auth/token
router.post("/token", async (req: Request, res: Response) => {
  try {
    // Support both form-urlencoded (OAuth2) and JSON
    const email = req.body.username || req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(400).json({ detail: "Email and password are required" });
      return;
    }

    const token = await loginUser(email, password);
    res.json(token);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(401).json({ detail: message });
  }
});

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

export default router;
