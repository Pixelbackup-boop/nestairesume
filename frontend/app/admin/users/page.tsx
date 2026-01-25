"use client";

import { useEffect, useState } from "react";
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, Ban, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscriptionTier: string;
  subscriptionStatus: string | null;
  creditsRemaining: number;
  isSuspended: boolean;
  createdAt: string;
  _count: {
    resumes: number;
    payments: number;
  };
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function UsersPage() {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/users", {
        params: { page, limit: 10, search: search || undefined },
      });
      setData(response.data as UsersResponse);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleSuspend = async (userId: string, currentStatus: boolean) => {
    try {
      await api.put(`/admin/users/${userId}`, {
        isSuspended: !currentStatus,
      });
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update user");
    }
    setActionMenu(null);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to delete user");
    }
    setActionMenu(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTierBadge = (tier: string) => {
    const styles: Record<string, string> = {
      diamond: "bg-accent-pink/20 text-accent-pink",
      gold: "bg-yellow-500/20 text-yellow-400",
      starter: "bg-accent-blue/20 text-accent-blue",
      free: "bg-gray-500/20 text-gray-400",
    };
    return styles[tier] || styles.free;
  };

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex items-center gap-4">
        <AlertCircle className="text-red-400" size={24} />
        <div>
          <p className="text-red-400 font-medium">Error loading users</p>
          <p className="text-red-400/70 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-gray-400 mt-1">
            Manage user accounts, subscriptions, and permissions.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-bg-card border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-bg-card border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Plan</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Resumes</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Joined</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-32" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-16" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-8" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-16" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-8 ml-auto" />
                    </td>
                  </tr>
                ))
              ) : data?.users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                data?.users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-accent-purple/20 text-accent-purple"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTierBadge(user.subscriptionTier)}`}>
                        {user.subscriptionTier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {user._count.resumes}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.isSuspended
                            ? "bg-red-500/20 text-red-400"
                            : "bg-accent-green/20 text-accent-green"
                        }`}
                      >
                        {user.isSuspended ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative flex justify-end">
                        <button
                          onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {actionMenu === user.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-bg-card-light border border-white/10 rounded-lg shadow-xl z-10 py-1">
                            <Link
                              href={`/admin/users/${user.id}`}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              <Eye size={16} />
                              View Details
                            </Link>
                            <Link
                              href={`/admin/users/${user.id}/edit`}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              <Edit size={16} />
                              Edit User
                            </Link>
                            <button
                              onClick={() => handleSuspend(user.id, user.isSuspended)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              <Ban size={16} />
                              {user.isSuspended ? "Unsuspend" : "Suspend"}
                            </button>
                            <hr className="my-1 border-white/5" />
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 size={16} />
                              Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <p className="text-sm text-gray-400">
              Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, data.total)} of {data.total} users
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-300">
                Page {page} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === data.totalPages}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
