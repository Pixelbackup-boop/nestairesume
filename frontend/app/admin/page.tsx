"use client";

import { useEffect, useState } from "react";
import { Users, FileText, CreditCard, TrendingUp, Clock, AlertCircle } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import api from "@/lib/api";
import Link from "next/link";

interface DashboardStats {
  totalUsers: number;
  totalResumes: number;
  totalBlogPosts: number;
  publishedPosts: number;
  totalPayments: number;
  totalRevenue: number;
  recentUsers: Array<{
    id: string;
    email: string;
    name: string;
    createdAt: string;
    subscriptionTier: string;
  }>;
  recentPayments: Array<{
    id: string;
    amount: number;
    status: string;
    type: string;
    plan: string | null;
    createdAt: string;
    user: { email: string; name: string };
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        setStats(response.data as DashboardStats);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-100 rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <p className="text-red-600 font-medium">Error loading dashboard</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="Total Resumes"
          value={stats?.totalResumes || 0}
          icon={FileText}
          color="blue"
        />
        <StatsCard
          title="Blog Posts"
          value={`${stats?.publishedPosts || 0} / ${stats?.totalBlogPosts || 0}`}
          subtitle="Published / Total"
          icon={FileText}
          color="green"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats?.totalRevenue || 0)}
          subtitle={`${stats?.totalPayments || 0} transactions`}
          icon={TrendingUp}
          color="pink"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
            <Link
              href="/admin/users"
              className="text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {stats?.recentUsers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No users yet
              </div>
            ) : (
              stats?.recentUsers.map((user) => (
                <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          user.subscriptionTier === "diamond"
                            ? "bg-accent-pink/20 text-accent-pink"
                            : user.subscriptionTier === "gold"
                            ? "bg-yellow-100 text-yellow-600"
                            : user.subscriptionTier === "starter"
                            ? "bg-accent-blue/20 text-accent-blue"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {user.subscriptionTier}
                      </span>
                      <p className="text-gray-500 text-xs mt-1 flex items-center justify-end gap-1">
                        <Clock size={12} />
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
            <Link
              href="/admin/payments"
              className="text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {stats?.recentPayments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No payments yet
              </div>
            ) : (
              stats?.recentPayments.map((payment) => (
                <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 font-medium">
                        {formatCurrency(payment.amount)}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {payment.user.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          payment.status === "succeeded"
                            ? "bg-accent-green/20 text-accent-green"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {payment.status}
                      </span>
                      <p className="text-gray-500 text-xs mt-1">
                        {payment.plan || payment.type}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 transition-colors text-sm font-medium"
          >
            New Blog Post
          </Link>
          <Link
            href="/admin/users"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Manage Users
          </Link>
          <Link
            href="/admin/payments"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            View Payments
          </Link>
        </div>
      </div>
    </div>
  );
}
