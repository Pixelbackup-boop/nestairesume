import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { UserPayload } from "../types";

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ detail: "Not authenticated" });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.secretKey) as { sub: string; email: string };
    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };
    next();
  } catch {
    res.status(401).json({ detail: "Invalid or expired token" });
  }
};

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, config.secretKey) as { sub: string; email: string };
      req.user = {
        id: decoded.sub,
        email: decoded.email,
      };
    } catch {
      // Token invalid, continue without user
    }
  }
  next();
};
