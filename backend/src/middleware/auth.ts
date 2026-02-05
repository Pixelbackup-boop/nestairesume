import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { UserPayload } from "../types";

export interface AuthRequest extends Request {
  user?: UserPayload;
}

interface JWTPayload {
  sub: string;
  email: string;
  role: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ detail: "Not authenticated" });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.secretKey) as JWTPayload;
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role || "user", // Default to user for backward compatibility
    };
    next();
  } catch {
    res.status(401).json({ detail: "Invalid or expired token" });
  }
};

// Optional authentication - extracts user if token present, continues if not
export const optionalAuth = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, config.secretKey) as JWTPayload;
      req.user = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role || "user",
      };
    } catch {
      // Invalid token - continue without user
    }
  }

  next();
};

// Admin-only middleware - must be used after authenticateToken
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ detail: "Not authenticated" });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({ detail: "Admin access required" });
    return;
  }

  next();
};

