import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";

const VALID_REQUEST_ID = /^[\w-]{1,64}$/;

// Express Request augmentation is in types/express.d.ts
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const incoming = req.headers["x-request-id"] as string | undefined;
  const requestId = incoming && VALID_REQUEST_ID.test(incoming) ? incoming : randomUUID();
  req.requestId = requestId;
  req.log = logger.child({ requestId });
  res.setHeader("x-request-id", requestId);
  next();
}
