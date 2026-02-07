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
      cvCreatedCount: true,
      aiUsedCount: true,
      downloadCount: true,
      coverLetterCount: true,
      trialEndsAt: true,
      hasUsedTrial: true,
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
          currency: true,
          status: true,
          type: true,
          plan: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
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

// Payment analytics for charts
export const getPaymentAnalytics = async () => {
  const now = new Date();

  // Fetch all succeeded payments (admin-only, volume is manageable)
  const payments = await prisma.payment.findMany({
    where: { status: "succeeded" },
    select: { amount: true, plan: true, createdAt: true, userId: true },
    orderBy: { createdAt: "asc" },
  });

  // --- Daily revenue (last 30 days) ---
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyMap = new Map<string, { revenue: number; count: number }>();
  for (let i = 0; i < 30; i++) {
    const d = new Date(thirtyDaysAgo);
    d.setDate(d.getDate() + i);
    dailyMap.set(d.toISOString().slice(0, 10), { revenue: 0, count: 0 });
  }
  for (const p of payments) {
    const key = p.createdAt.toISOString().slice(0, 10);
    if (dailyMap.has(key)) {
      const entry = dailyMap.get(key)!;
      entry.revenue += p.amount;
      entry.count += 1;
    }
  }
  const dailyRevenue = Array.from(dailyMap.entries()).map(([date, data]) => ({
    date,
    revenue: data.revenue,
    count: data.count,
  }));

  // --- Monthly revenue (last 12 months) ---
  const monthlyMap = new Map<string, { revenue: number; count: number }>();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, { revenue: 0, count: 0 });
  }
  for (const p of payments) {
    const key = `${p.createdAt.getFullYear()}-${String(p.createdAt.getMonth() + 1).padStart(2, "0")}`;
    if (monthlyMap.has(key)) {
      const entry = monthlyMap.get(key)!;
      entry.revenue += p.amount;
      entry.count += 1;
    }
  }
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyRevenue = Array.from(monthlyMap.entries()).map(([key, data]) => ({
    month: monthNames[parseInt(key.split("-")[1]) - 1],
    revenue: data.revenue,
    count: data.count,
  }));

  // --- Revenue by plan ---
  const planMap: Record<string, { revenue: number; count: number }> = {};
  for (const p of payments) {
    const plan = p.plan || "other";
    if (!planMap[plan]) planMap[plan] = { revenue: 0, count: 0 };
    planMap[plan].revenue += p.amount;
    planMap[plan].count += 1;
  }
  const revenueByPlan = planMap;

  // --- Month-over-month growth ---
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  let currentMonthRevenue = 0;
  let previousMonthRevenue = 0;
  for (const p of payments) {
    if (p.createdAt >= currentMonthStart) {
      currentMonthRevenue += p.amount;
    } else if (p.createdAt >= previousMonthStart && p.createdAt < currentMonthStart) {
      previousMonthRevenue += p.amount;
    }
  }
  const percentChange = previousMonthRevenue > 0
    ? Math.round(((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100)
    : currentMonthRevenue > 0 ? 100 : 0;

  const growth = {
    currentMonth: currentMonthRevenue,
    previousMonth: previousMonthRevenue,
    percentChange,
  };

  // --- Top customers ---
  const customerMap = new Map<string, { totalSpent: number; count: number }>();
  for (const p of payments) {
    const entry = customerMap.get(p.userId) || { totalSpent: 0, count: 0 };
    entry.totalSpent += p.amount;
    entry.count += 1;
    customerMap.set(p.userId, entry);
  }
  const topUserIds = Array.from(customerMap.entries())
    .sort((a, b) => b[1].totalSpent - a[1].totalSpent)
    .slice(0, 5);

  const topUsers = topUserIds.length > 0
    ? await prisma.user.findMany({
        where: { id: { in: topUserIds.map(([id]) => id) } },
        select: { id: true, name: true, email: true },
      })
    : [];

  const topCustomers = topUserIds.map(([userId, data]) => {
    const user = topUsers.find(u => u.id === userId);
    return {
      name: user?.name || "Unknown",
      email: user?.email || "",
      totalSpent: data.totalSpent,
      count: data.count,
    };
  });

  return { dailyRevenue, monthlyRevenue, revenueByPlan, growth, topCustomers };
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
