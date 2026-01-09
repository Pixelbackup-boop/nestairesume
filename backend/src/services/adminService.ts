import prisma from "../config/database";

// Dashboard stats
export const getDashboardStats = async () => {
  const [
    totalUsers,
    totalResumes,
    totalBlogPosts,
    publishedPosts,
    totalPayments,
    recentUsersList,
    recentPaymentsList,
    revenue,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.payment.count(),
    prisma.user.findMany({
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
    prisma.payment.findMany({
      include: {
        user: {
          select: { email: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.payment.aggregate({
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

// User management
export const getAllUsers = async (skip = 0, limit = 20, search?: string) => {
  const where = search
    ? {
        OR: [
          { email: { contains: search } },
          { name: { contains: search } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
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
    prisma.user.count({ where }),
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

export const getUserWithResumes = async (userId: string) => {
  return prisma.user.findUnique({
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

export const updateUser = async (
  userId: string,
  data: {
    name?: string;
    role?: string;
    subscriptionTier?: string;
    creditsRemaining?: number;
    isSuspended?: boolean;
  }
) => {
  return prisma.user.update({
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

export const deleteUser = async (userId: string) => {
  // This will cascade delete all resumes due to onDelete: Cascade
  await prisma.user.delete({
    where: { id: userId },
  });
  return true;
};

// Blog management
export const getAllBlogPosts = async (skip = 0, limit = 20, includeUnpublished = true) => {
  const where = includeUnpublished ? {} : { published: true };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
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

export const getBlogPostById = async (postId: string) => {
  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) return null;

  return {
    ...post,
    tags: JSON.parse(post.tags || "[]"),
  };
};

export const createBlogPost = async (data: {
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
}) => {
  const post = await prisma.blogPost.create({
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

export const updateBlogPost = async (
  postId: string,
  data: {
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
  }
) => {
  const updateData: Record<string, unknown> = { ...data };

  if (data.tags) {
    updateData.tags = JSON.stringify(data.tags);
  }

  // Set publishedAt when publishing for the first time
  if (data.published) {
    const existing = await prisma.blogPost.findUnique({ where: { id: postId } });
    if (existing && !existing.published) {
      updateData.publishedAt = new Date();
    }
  }

  const post = await prisma.blogPost.update({
    where: { id: postId },
    data: updateData,
  });

  return {
    ...post,
    tags: JSON.parse(post.tags),
  };
};

export const deleteBlogPost = async (postId: string) => {
  await prisma.blogPost.delete({
    where: { id: postId },
  });
  return true;
};

// Payment stats
export const getPaymentStats = async () => {
  const [
    totalRevenueResult,
    monthlyRevenueResult,
    totalPaymentsCount,
  ] = await Promise.all([
    prisma.payment.aggregate({
      where: { status: "succeeded" },
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
      where: {
        status: "succeeded",
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: { amount: true },
    }),
    prisma.payment.count({
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

export const getAllPayments = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.payment.count(),
  ]);

  return {
    payments,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
