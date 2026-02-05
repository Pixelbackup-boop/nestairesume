"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayments = exports.getPaymentStats = exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPostById = exports.getAllBlogPosts = exports.deleteUser = exports.updateUser = exports.getUserWithResumes = exports.getAllUsers = exports.getDashboardStats = void 0;
const database_1 = __importDefault(require("../config/database"));
// Dashboard stats
const getDashboardStats = async () => {
    const [totalUsers, totalResumes, totalBlogPosts, publishedPosts, totalPayments, recentUsersList, recentPaymentsList, revenue,] = await Promise.all([
        database_1.default.user.count(),
        database_1.default.resume.count(),
        database_1.default.blogPost.count(),
        database_1.default.blogPost.count({ where: { published: true } }),
        database_1.default.payment.count(),
        database_1.default.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                subscriptionTier: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
        database_1.default.payment.findMany({
            include: {
                user: {
                    select: { email: true, name: true },
                },
            },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
        database_1.default.payment.aggregate({
            where: { status: "succeeded" },
            _sum: { amount: true },
        }),
    ]);
    return {
        totalUsers,
        totalResumes,
        totalBlogPosts,
        publishedPosts,
        totalPayments,
        totalRevenue: revenue._sum.amount || 0,
        recentUsers: recentUsersList,
        recentPayments: recentPaymentsList,
    };
};
exports.getDashboardStats = getDashboardStats;
// User management
const getAllUsers = async (skip = 0, limit = 20, search) => {
    const where = search
        ? {
            OR: [
                { email: { contains: search } },
                { name: { contains: search } },
            ],
        }
        : {};
    const [users, total] = await Promise.all([
        database_1.default.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                subscriptionTier: true,
                subscriptionStatus: true,
                creditsRemaining: true,
                isSuspended: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: { resumes: true },
                },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        database_1.default.user.count({ where }),
    ]);
    return {
        users: users.map(u => ({
            ...u,
            resumeCount: u._count.resumes,
            _count: undefined,
        })),
        total,
        pages: Math.ceil(total / limit),
    };
};
exports.getAllUsers = getAllUsers;
const getUserWithResumes = async (userId) => {
    return database_1.default.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            subscriptionTier: true,
            subscriptionStatus: true,
            stripeCustomerId: true,
            creditsRemaining: true,
            isSuspended: true,
            createdAt: true,
            updatedAt: true,
            resumes: {
                select: {
                    id: true,
                    title: true,
                    templateLayout: true,
                    templateTheme: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { createdAt: "desc" },
            },
            payments: {
                select: {
                    id: true,
                    amount: true,
                    status: true,
                    type: true,
                    plan: true,
                    createdAt: true,
                },
                orderBy: { createdAt: "desc" },
                take: 10,
            },
        },
    });
};
exports.getUserWithResumes = getUserWithResumes;
const updateUser = async (userId, data) => {
    return database_1.default.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            subscriptionTier: true,
            creditsRemaining: true,
            isSuspended: true,
        },
    });
};
exports.updateUser = updateUser;
const deleteUser = async (userId) => {
    // This will cascade delete all resumes due to onDelete: Cascade
    await database_1.default.user.delete({
        where: { id: userId },
    });
    return true;
};
exports.deleteUser = deleteUser;
// Blog management
const getAllBlogPosts = async (skip = 0, limit = 20, includeUnpublished = true) => {
    const where = includeUnpublished ? {} : { published: true };
    const [posts, total] = await Promise.all([
        database_1.default.blogPost.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        database_1.default.blogPost.count({ where }),
    ]);
    return {
        posts: posts.map(post => ({
            ...post,
            tags: JSON.parse(post.tags || "[]"),
        })),
        total,
        pages: Math.ceil(total / limit),
    };
};
exports.getAllBlogPosts = getAllBlogPosts;
const getBlogPostById = async (postId) => {
    const post = await database_1.default.blogPost.findUnique({
        where: { id: postId },
    });
    if (!post)
        return null;
    return {
        ...post,
        tags: JSON.parse(post.tags || "[]"),
    };
};
exports.getBlogPostById = getBlogPostById;
const createBlogPost = async (data) => {
    const post = await database_1.default.blogPost.create({
        data: {
            ...data,
            tags: JSON.stringify(data.tags),
            publishedAt: data.published ? new Date() : null,
        },
    });
    return {
        ...post,
        tags: JSON.parse(post.tags),
    };
};
exports.createBlogPost = createBlogPost;
const updateBlogPost = async (postId, data) => {
    const updateData = { ...data };
    if (data.tags) {
        updateData.tags = JSON.stringify(data.tags);
    }
    // Set publishedAt when publishing for the first time
    if (data.published) {
        const existing = await database_1.default.blogPost.findUnique({ where: { id: postId } });
        if (existing && !existing.published) {
            updateData.publishedAt = new Date();
        }
    }
    const post = await database_1.default.blogPost.update({
        where: { id: postId },
        data: updateData,
    });
    return {
        ...post,
        tags: JSON.parse(post.tags),
    };
};
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = async (postId) => {
    await database_1.default.blogPost.delete({
        where: { id: postId },
    });
    return true;
};
exports.deleteBlogPost = deleteBlogPost;
// Payment stats
const getPaymentStats = async () => {
    const [totalRevenueResult, monthlyRevenueResult, totalPaymentsCount,] = await Promise.all([
        database_1.default.payment.aggregate({
            where: { status: "succeeded" },
            _sum: { amount: true },
        }),
        database_1.default.payment.aggregate({
            where: {
                status: "succeeded",
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                },
            },
            _sum: { amount: true },
        }),
        database_1.default.payment.count({
            where: { status: "succeeded" },
        }),
    ]);
    const totalRevenue = totalRevenueResult._sum.amount || 0;
    const monthlyRevenue = monthlyRevenueResult._sum.amount || 0;
    const averageOrderValue = totalPaymentsCount > 0 ? totalRevenue / totalPaymentsCount : 0;
    return {
        totalRevenue,
        monthlyRevenue,
        totalPayments: totalPaymentsCount,
        averageOrderValue: Math.round(averageOrderValue),
    };
};
exports.getPaymentStats = getPaymentStats;
const getAllPayments = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const [payments, total] = await Promise.all([
        database_1.default.payment.findMany({
            include: {
                user: {
                    select: { id: true, email: true, name: true },
                },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        database_1.default.payment.count(),
    ]);
    return {
        payments,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};
exports.getAllPayments = getAllPayments;
//# sourceMappingURL=adminService.js.map