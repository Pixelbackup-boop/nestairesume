"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.errorResponse = exports.requireAdmin = exports.requireAuth = exports.asyncHandler = void 0;
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
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
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
const requireAuth = (req, res, next) => {
    const authReq = req;
    if (!authReq.user) {
        res.status(401).json({ detail: 'Not authenticated' });
        return;
    }
    next();
};
exports.requireAuth = requireAuth;
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
const requireAdmin = (req, res, next) => {
    const authReq = req;
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
exports.requireAdmin = requireAdmin;
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
const errorResponse = (message, code) => ({
    detail: message,
    ...(code && { code }),
});
exports.errorResponse = errorResponse;
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
const globalErrorHandler = (error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    console.error('Unhandled error:', error);
    // Prisma errors
    if (error.name === 'PrismaClientKnownRequestError') {
        const prismaError = error;
        if (prismaError.code === 'P2002') {
            res.status(409).json((0, exports.errorResponse)('Resource already exists'));
            return;
        }
        if (prismaError.code === 'P2025') {
            res.status(404).json((0, exports.errorResponse)('Resource not found'));
            return;
        }
    }
    // Validation errors
    if (error.name === 'ValidationError') {
        res.status(400).json((0, exports.errorResponse)(error.message));
        return;
    }
    // Default error
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message;
    res.status(500).json((0, exports.errorResponse)(message));
};
exports.globalErrorHandler = globalErrorHandler;
exports.default = {
    asyncHandler: exports.asyncHandler,
    requireAuth: exports.requireAuth,
    requireAdmin: exports.requireAdmin,
    errorResponse: exports.errorResponse,
    globalErrorHandler: exports.globalErrorHandler,
};
//# sourceMappingURL=asyncHandler.js.map