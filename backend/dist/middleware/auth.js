"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    if (!token) {
        res.status(401).json({ detail: "Not authenticated" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.secretKey);
        req.user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role || "user", // Default to user for backward compatibility
        };
        next();
    }
    catch {
        res.status(401).json({ detail: "Invalid or expired token" });
    }
};
exports.authenticateToken = authenticateToken;
// Admin-only middleware - must be used after authenticateToken
const requireAdmin = (req, res, next) => {
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
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=auth.js.map