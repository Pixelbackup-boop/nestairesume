"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Calendar,
  CreditCard,
  FileText,
  Edit,
  Ban,
  Trash2,
  AlertCircle,
  Crown,
  Activity,
  Download,
  Sparkles,
  FileCheck,
} from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

interface UsageItem {
  used: number;
  limit: number;
}

interface UsageStatus {
  tier: string;
  isTrialing: boolean;
  trialEndsAt: string | null;
  usage: {
    cv: UsageItem;
    ai: UsageItem;
    aiToday: UsageItem;
    download: UsageItem;
    coverLetter: UsageItem;
  };
}

interface UserDetail {
  id: string;
  email: string;
  name: string;
  role: string;
  subscriptionTier: string;
  subscriptionStatus: string | null;
  creditsRemaining: number;
  isSuspended: boolean;
  createdAt: string;
  updatedAt: string;
  cvCreatedCount: number;
  aiUsedCount: number;
  downloadCount: number;
  coverLetterCount: number;
  trialEndsAt: string | null;
  hasUsedTrial: boolean;
  usageStatus: UsageStatus | null;
  resumes: Array<{
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    type: string;
    plan: string | null;
    createdAt: string;
  }>;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/admin/users/${params.id}`);
        setUser(response.data as UserDetail);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSuspend = async () => {
    if (!user) return;
    try {
      await api.put(`/admin/users/${user.id}`, {
        isSuspended: !user.isSuspended,
      });
      setUser({ ...user, isSuspended: !user.isSuspended });
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update user");
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    try {
      await api.delete(`/admin/users/${user.id}`);
      router.push("/admin/users");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to delete user");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  const getTierBadge = (tier: string) => {
    const styles: Record<string, string> = {
      diamond: "bg-accent-pink/20 text-accent-pink border-accent-pink/30",
      gold: "bg-yellow-100 text-yellow-600 border-yellow-200",
      starter: "bg-accent-blue/20 text-accent-blue border-accent-blue/30",
      free: "bg-gray-100 text-gray-500 border-gray-200",
    };
    return styles[tier] || styles.free;
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-100 rounded w-48" />
        <div className="h-48 bg-gray-100 rounded-xl" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-64 bg-gray-100 rounded-xl" />
          <div className="h-64 bg-gray-100 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Users
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4">
          <AlertCircle className="text-red-600" size={24} />
          <div>
            <p className="text-red-600 font-medium">Error loading user</p>
            <p className="text-red-500 text-sm">{error || "User not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Users
      </Link>

      {/* User Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-pink rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                {user.role === "admin" && (
                  <span className="px-2 py-1 bg-accent-purple/20 text-accent-purple rounded text-xs font-medium flex items-center gap-1">
                    <Crown size={12} />
                    Admin
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    user.isSuspended
                      ? "bg-red-100 text-red-500"
                      : "bg-accent-green/20 text-accent-green"
                  }`}
                >
                  {user.isSuspended ? "Suspended" : "Active"}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Joined {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/users/${user.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <Edit size={16} />
              Edit
            </Link>
            <button
              onClick={handleSuspend}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                user.isSuspended
                  ? "bg-accent-green/20 text-accent-green hover:bg-accent-green/30"
                  : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
              }`}
            >
              <Ban size={16} />
              {user.isSuspended ? "Unsuspend" : "Suspend"}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div>
            <p className="text-gray-500 text-sm">Subscription</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-3 py-1.5 rounded-lg border text-sm font-medium inline-block ${getTierBadge(user.subscriptionTier)}`}>
                {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
              </span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span className={`mt-1 px-3 py-1.5 rounded-lg text-sm font-medium inline-block ${
              user.subscriptionStatus === "active" ? "bg-accent-green/20 text-accent-green" :
              user.subscriptionStatus === "trialing" ? "bg-accent-blue/20 text-accent-blue" :
              user.subscriptionStatus === "past_due" ? "bg-yellow-100 text-yellow-600" :
              user.subscriptionStatus === "canceled" ? "bg-red-100 text-red-500" :
              "bg-gray-100 text-gray-500"
            }`}>
              {user.subscriptionStatus || "Free"}
            </span>
            {user.trialEndsAt && (
              <p className="text-xs text-gray-400 mt-1">
                Trial ends {new Date(user.trialEndsAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Credits Remaining</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{user.creditsRemaining}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Resumes</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{user.resumes.length}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Payments</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{user.payments.length}</p>
          </div>
        </div>
      </div>

      {/* Usage This Period */}
      {user.usageStatus && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-accent-purple" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Usage This Period</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "CVs Created", icon: FileText, data: user.usageStatus.usage.cv, barColor: "bg-accent-blue" },
              { label: "Downloads", icon: Download, data: user.usageStatus.usage.download, barColor: "bg-accent-green" },
              { label: "AI Generations", icon: Sparkles, data: user.usageStatus.usage.ai, barColor: "bg-accent-purple" },
              { label: "Cover Letters", icon: FileCheck, data: user.usageStatus.usage.coverLetter, barColor: "bg-accent-pink" },
            ].map(({ label, icon: Icon, data, barColor }) => {
              const pct = data.limit > 0 ? Math.min((data.used / data.limit) * 100, 100) : 0;
              const isUnlimited = data.limit === -1;
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon size={14} />
                      {label}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {data.used} / {isUnlimited ? "\u221E" : data.limit}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-yellow-400" : barColor
                      }`}
                      style={{ width: isUnlimited ? "0%" : `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resumes & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumes */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center gap-2">
            <FileText className="text-accent-blue" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Resumes</h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
            {user.resumes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No resumes created
              </div>
            ) : (
              user.resumes.map((resume) => (
                <div key={resume.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <p className="text-gray-900 font-medium">{resume.title}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Created {formatDate(resume.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payments */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center gap-2">
            <CreditCard className="text-accent-pink" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {user.payments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No payments yet
              </div>
            ) : (
              user.payments.map((payment) => (
                <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 font-medium">
                        {formatCurrency(payment.amount)}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {payment.plan || payment.type} &bull; {formatDate(payment.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        payment.status === "succeeded"
                          ? "bg-accent-green/20 text-accent-green"
                          : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
