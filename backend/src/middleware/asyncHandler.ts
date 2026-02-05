import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from './auth';

/**
 * Type for async request handlers (works with both Request and AuthRequest)
 */
type AsyncRequestHandler<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Wraps an async route handler to automatically catch errors and forward them to Express error handling.
 *
 * This eliminates the need for try/catch blocks in every route handler.
 *
 * @example
 * ```ts
 * // Before (verbose):
 * router.get('/', async (req, res) => {
 *   try {
 *     const data = await prisma.user.findMany();
 *     res.json(data);
 *   } catch (error) {
 *     const message = error instanceof Error ? error.message : "Failed";
 *     res.status(500).json({ detail: message });
 *   }
 * });
 *
 * // After (clean):
 * router.get('/', asyncHandler(async (req, res) => {
 *   const data = await prisma.user.findMany();
 *   res.json(data);
 * }));
 * ```
 */
export const asyncHandler = <T extends Request = Request>(
  fn: AsyncRequestHandler<T>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as T, res, next)).catch(next);
  };
};

/**
 * Middleware to require authentication.
 * Returns 401 if no user is attached to the request.
 *
 * @example
 * ```ts
 * // Use as middleware before route handler:
 * router.get('/profile', requireAuth, asyncHandler(async (req, res) => {
 *   const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
 *   res.json(user);
 * }));
 *
 * // Or apply to all routes in a router:
 * router.use(requireAuth);
 * ```
 */
export const requireAuth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authReq = req as AuthRequest;
  if (!authReq.user) {
    res.status(401).json({ detail: 'Not authenticated' });
    return;
  }
  next();
};

/**
 * Middleware to require admin role.
 * Returns 401 if not authenticated, 403 if not admin.
 *
 * @example
 * ```ts
 * router.get('/admin/users', requireAdmin, asyncHandler(async (req, res) => {
 *   const users = await prisma.user.findMany();
 *   res.json(users);
 * }));
 * ```
 */
export const requireAdmin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authReq = req as AuthRequest;
  if (!authReq.user) {
    res.status(401).json({ detail: 'Not authenticated' });
    return;
  }
  if (authReq.user.role !== 'ADMIN') {
    res.status(403).json({ detail: 'Admin access required' });
    return;
  }
  next();
};

/**
 * Creates an error response with consistent structure.
 * Use this in error handlers and for manual error responses.
 *
 * @example
 * ```ts
 * if (!item) {
 *   return res.status(404).json(errorResponse('Item not found'));
 * }
 * ```
 */
export const errorResponse = (message: string, code?: string) => ({
  detail: message,
  ...(code && { code }),
});

/**
 * Global error handler for Express.
 * Add this as the last middleware in your app.
 *
 * @example
 * ```ts
 * // In your main app file:
 * app.use(globalErrorHandler);
 * ```
 */
export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.error('Unhandled error:', error);

  // Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as Error & { code?: string };
    if (prismaError.code === 'P2002') {
      res.status(409).json(errorResponse('Resource already exists'));
      return;
    }
    if (prismaError.code === 'P2025') {
      res.status(404).json(errorResponse('Resource not found'));
      return;
    }
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    res.status(400).json(errorResponse(error.message));
    return;
  }

  // Default error
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : error.message;

  res.status(500).json(errorResponse(message));
};

export default {
  asyncHandler,
  requireAuth,
  requireAdmin,
  errorResponse,
  globalErrorHandler,
};
