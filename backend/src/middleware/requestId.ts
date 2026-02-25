import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";

// Express Request augmentation is in types/express.d.ts
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const requestId = (req.headers["x-request-id"] as string) || randomUUID();
  req.requestId = requestId;
  req.log = logger.child({ requestId });
  res.setHeader("x-request-id", requestId);
  next();
}
