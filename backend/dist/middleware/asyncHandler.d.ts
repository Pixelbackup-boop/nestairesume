import { Request, Response, NextFunction, RequestHandler } from 'express';
/**
 * Type for async request handlers (works with both Request and AuthRequest)
 */
type AsyncRequestHandler<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => Promise<void>;
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
export declare const asyncHandler: <T extends Request = Request>(fn: AsyncRequestHandler<T>) => RequestHandler;
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
export declare const requireAuth: RequestHandler;
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
export declare const requireAdmin: RequestHandler;
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
export declare const errorResponse: (message: string, code?: string) => {
    code?: string | undefined;
    detail: string;
};
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
export declare const globalErrorHandler: (error: Error, req: Request, res: Response, _next: NextFunction) => void;
declare const _default: {
    asyncHandler: <T extends Request = Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>>(fn: AsyncRequestHandler<T>) => RequestHandler;
    requireAuth: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    requireAdmin: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    errorResponse: (message: string, code?: string) => {
        code?: string | undefined;
        detail: string;
    };
    globalErrorHandler: (error: Error, req: Request, res: Response, _next: NextFunction) => void;
};
export default _default;
//# sourceMappingURL=asyncHandler.d.ts.map