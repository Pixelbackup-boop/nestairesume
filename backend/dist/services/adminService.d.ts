export declare const getDashboardStats: () => Promise<{
    totalUsers: number;
    totalResumes: number;
    totalBlogPosts: number;
    publishedPosts: number;
    totalPayments: number;
    totalRevenue: number;
    recentUsers: {
        name: string;
        email: string;
        id: string;
        subscriptionTier: string;
        createdAt: Date;
    }[];
    recentPayments: ({
        user: {
            name: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        stripePaymentId: string;
        amount: number;
        currency: string;
        status: string;
        plan: string | null;
    })[];
}>;
export declare const getAllUsers: (skip?: number, limit?: number, search?: string) => Promise<{
    users: {
        resumeCount: number;
        _count: undefined;
        name: string;
        email: string;
        role: string;
        id: string;
        subscriptionTier: string;
        creditsRemaining: number;
        subscriptionStatus: string | null;
        isSuspended: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
    total: number;
    pages: number;
}>;
export declare const getUserWithResumes: (userId: string) => Promise<{
    name: string;
    email: string;
    role: string;
    id: string;
    subscriptionTier: string;
    creditsRemaining: number;
    stripeCustomerId: string | null;
    subscriptionStatus: string | null;
    isSuspended: boolean;
    createdAt: Date;
    updatedAt: Date;
    resumes: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        templateLayout: string;
        templateTheme: string;
    }[];
    payments: {
        id: string;
        createdAt: Date;
        type: string;
        amount: number;
        status: string;
        plan: string | null;
    }[];
} | null>;
export declare const updateUser: (userId: string, data: {
    name?: string;
    role?: string;
    subscriptionTier?: string;
    creditsRemaining?: number;
    isSuspended?: boolean;
}) => Promise<{
    name: string;
    email: string;
    role: string;
    id: string;
    subscriptionTier: string;
    creditsRemaining: number;
    isSuspended: boolean;
}>;
export declare const deleteUser: (userId: string) => Promise<boolean>;
export declare const getAllBlogPosts: (skip?: number, limit?: number, includeUnpublished?: boolean) => Promise<{
    posts: {
        tags: any;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        published: boolean;
        description: string;
        slug: string;
        content: string;
        imageAlt: string | null;
        category: string;
        author: string;
        featured: boolean;
        publishedAt: Date | null;
    }[];
    total: number;
    pages: number;
}>;
export declare const getBlogPostById: (postId: string) => Promise<{
    tags: any;
    id: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    published: boolean;
    description: string;
    slug: string;
    content: string;
    imageAlt: string | null;
    category: string;
    author: string;
    featured: boolean;
    publishedAt: Date | null;
} | null>;
export declare const createBlogPost: (data: {
    slug: string;
    title: string;
    description: string;
    content: string;
    image?: string;
    imageAlt?: string;
    category: string;
    tags: string[];
    author: string;
    featured?: boolean;
    published?: boolean;
}) => Promise<{
    tags: any;
    id: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    published: boolean;
    description: string;
    slug: string;
    content: string;
    imageAlt: string | null;
    category: string;
    author: string;
    featured: boolean;
    publishedAt: Date | null;
}>;
export declare const updateBlogPost: (postId: string, data: {
    slug?: string;
    title?: string;
    description?: string;
    content?: string;
    image?: string;
    imageAlt?: string;
    category?: string;
    tags?: string[];
    author?: string;
    featured?: boolean;
    published?: boolean;
}) => Promise<{
    tags: any;
    id: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    published: boolean;
    description: string;
    slug: string;
    content: string;
    imageAlt: string | null;
    category: string;
    author: string;
    featured: boolean;
    publishedAt: Date | null;
}>;
export declare const deleteBlogPost: (postId: string) => Promise<boolean>;
export declare const getPaymentStats: () => Promise<{
    totalRevenue: number;
    monthlyRevenue: number;
    totalPayments: number;
    averageOrderValue: number;
}>;
export declare const getAllPayments: (page?: number, limit?: number) => Promise<{
    payments: ({
        user: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        stripePaymentId: string;
        amount: number;
        currency: string;
        status: string;
        plan: string | null;
    })[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
//# sourceMappingURL=adminService.d.ts.map