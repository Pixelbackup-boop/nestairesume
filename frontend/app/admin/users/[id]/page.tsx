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
} from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

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
  resumes: Array<{
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  }>;
  payments: Array<{
    id: string;
    amount: number;
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
      gold: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      starter: "bg-accent-blue/20 text-accent-blue border-accent-blue/30",
      free: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    return styles[tier] || styles.free;
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-white/5 rounded w-48" />
        <div className="h-48 bg-white/5 rounded-xl" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-64 bg-white/5 rounded-xl" />
          <div className="h-64 bg-white/5 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Users
        </Link>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex items-center gap-4">
          <AlertCircle className="text-red-400" size={24} />
          <div>
            <p className="text-red-400 font-medium">Error loading user</p>
            <p className="text-red-400/70 text-sm">{error || "User not found"}</p>
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
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Users
      </Link>

      {/* User Header */}
      <div className="bg-bg-card border border-white/5 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-pink rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                {user.role === "admin" && (
                  <span className="px-2 py-1 bg-accent-purple/20 text-accent-purple rounded text-xs font-medium flex items-center gap-1">
                    <Crown size={12} />
                    Admin
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    user.isSuspended
                      ? "bg-red-500/20 text-red-400"
                      : "bg-accent-green/20 text-accent-green"
                  }`}
                >
                  {user.isSuspended ? "Suspended" : "Active"}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
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
              className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <Edit size={16} />
              Edit
            </Link>
            <button
              onClick={handleSuspend}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                user.isSuspended
                  ? "bg-accent-green/20 text-accent-green hover:bg-accent-green/30"
                  : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
              }`}
            >
              <Ban size={16} />
              {user.isSuspended ? "Unsuspend" : "Suspend"}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
          <div>
            <p className="text-gray-400 text-sm">Subscription</p>
            <p className={`mt-1 px-3 py-1.5 rounded-lg border text-sm font-medium inline-block ${getTierBadge(user.subscriptionTier)}`}>
              {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Credits Remaining</p>
            <p className="text-2xl font-bold text-white mt-1">{user.creditsRemaining}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Resumes</p>
            <p className="text-2xl font-bold text-white mt-1">{user.resumes.length}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Payments</p>
            <p className="text-2xl font-bold text-white mt-1">{user.payments.length}</p>
          </div>
        </div>
      </div>

      {/* Resumes & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumes */}
        <div className="bg-bg-card border border-white/5 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-2">
            <FileText className="text-accent-blue" size={20} />
            <h2 className="text-lg font-semibold text-white">Resumes</h2>
          </div>
          <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
            {user.resumes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No resumes created
              </div>
            ) : (
              user.resumes.map((resume) => (
                <div key={resume.id} className="p-4 hover:bg-white/5 transition-colors">
                  <p className="text-white font-medium">{resume.title}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Created {formatDate(resume.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payments */}
        <div className="bg-bg-card border border-white/5 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-2">
            <CreditCard className="text-accent-pink" size={20} />
            <h2 className="text-lg font-semibold text-white">Payment History</h2>
          </div>
          <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
            {user.payments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No payments yet
              </div>
            ) : (
              user.payments.map((payment) => (
                <div key={payment.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">
                        {formatCurrency(payment.amount)}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        {payment.plan || payment.type} &bull; {formatDate(payment.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        payment.status === "succeeded"
                          ? "bg-accent-green/20 text-accent-green"
                          : payment.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
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
