"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Globe,
  EyeOff,
  Star,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  featured: boolean;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BlogResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function BlogPage() {
  const [data, setData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/blog", {
        params: { page: String(page), limit: "10", ...(search ? { search } : {}) },
      });
      setData(response.data as BlogResponse);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  const handleTogglePublish = async (postId: string, currentStatus: boolean) => {
    try {
      await api.put(`/admin/blog/${postId}`, {
        published: !currentStatus,
        publishedAt: !currentStatus ? new Date().toISOString() : null,
      });
      fetchPosts();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update post");
    }
    setActionMenu(null);
  };

  const handleToggleFeatured = async (postId: string, currentStatus: boolean) => {
    try {
      await api.put(`/admin/blog/${postId}`, {
        featured: !currentStatus,
      });
      fetchPosts();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update post");
    }
    setActionMenu(null);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }
    try {
      await api.delete(`/admin/blog/${postId}`);
      fetchPosts();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to delete post");
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

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex items-center gap-4">
        <AlertCircle className="text-red-400" size={24} />
        <div>
          <p className="text-red-400 font-medium">Error loading posts</p>
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
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">
            Create and manage blog content.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-accent-purple text-white rounded-lg font-medium hover:bg-accent-purple/90 transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
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
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Title</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Author</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Date</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-48" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/5 rounded w-24" />
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
              ) : data?.posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No posts found
                  </td>
                </tr>
              ) : (
                data?.posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {post.featured && (
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        )}
                        <div>
                          <p className="text-white font-medium">{post.title}</p>
                          <p className="text-gray-500 text-xs">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {post.author}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          post.published
                            ? "bg-accent-green/20 text-accent-green"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative flex justify-end">
                        <button
                          onClick={() => setActionMenu(actionMenu === post.id ? null : post.id)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {actionMenu === post.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-bg-card-light border border-white/10 rounded-lg shadow-xl z-10 py-1">
                            <a
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              <Eye size={16} />
                              View Post
                            </a>
                            <Link
                              href={`/admin/blog/${post.id}/edit`}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              <Edit size={16} />
                              Edit Post
                            </Link>
                            <button
                              onClick={() => handleTogglePublish(post.id, post.published)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              {post.published ? (
                                <>
                                  <EyeOff size={16} />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Globe size={16} />
                                  Publish
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleToggleFeatured(post.id, post.featured)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              <Star size={16} className={post.featured ? "fill-yellow-400 text-yellow-400" : ""} />
                              {post.featured ? "Unfeature" : "Feature"}
                            </button>
                            <hr className="my-1 border-white/5" />
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 size={16} />
                              Delete Post
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
              Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, data.total)} of {data.total} posts
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
