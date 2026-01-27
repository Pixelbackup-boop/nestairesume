"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Send,
  ArrowLeft,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

interface ScheduledPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string;
  scheduledFor: string;
  status: string;
  source: { name: string } | null;
  createdAt: string;
}

export default function PostQueuePage() {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const params: Record<string, string> = filter !== "all" ? { status: filter } : {};
      const response = await api.get("/admin/auto-blog/queue", { params });
      setPosts(response.data as ScheduledPost[]);
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await api.post(`/admin/auto-blog/queue/${id}/approve`);
      setSuccess("Post approved!");
      fetchPosts();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to approve");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePublish = async (id: string) => {
    setActionLoading(id);
    try {
      await api.post(`/admin/auto-blog/queue/${id}/publish`);
      setSuccess("Post published!");
      fetchPosts();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to publish");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    setActionLoading(id);
    try {
      await api.delete(`/admin/auto-blog/queue/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
      if (selectedPost?.id === id) setSelectedPost(null);
      setSuccess("Post deleted");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to delete");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
      pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: <Clock size={14} /> },
      approved: { bg: "bg-accent-green/20", text: "text-accent-green", icon: <CheckCircle size={14} /> },
      published: { bg: "bg-accent-blue/20", text: "text-accent-blue", icon: <FileText size={14} /> },
      failed: { bg: "bg-red-500/20", text: "text-red-400", icon: <XCircle size={14} /> },
    };
    const style = styles[status] || styles.pending;
    return (
      <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.text}`}>
        {style.icon}
        {status}
      </span>
    );
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/auto-blog" className="p-2 hover:bg-white/5 rounded-lg transition">
            <ArrowLeft size={20} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Post Queue</h1>
            <p className="text-gray-400 mt-1">Review and approve AI-generated posts</p>
          </div>
        </div>
        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-bg-card border border-white/10 text-white rounded-lg px-4 py-2"
        >
          <option value="all">All Posts</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="published">Published</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
          <p className="text-red-400">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">×</button>
        </div>
      )}

      {success && (
        <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="text-accent-green flex-shrink-0" size={20} />
          <p className="text-accent-green">{success}</p>
          <button onClick={() => setSuccess(null)} className="ml-auto text-accent-green">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts List */}
        <div className="bg-bg-card border border-white/5 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h2 className="font-semibold text-white">
              {posts.length} {filter === "all" ? "Total" : filter} Posts
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="animate-spin mx-auto text-accent-green" size={32} />
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No posts in queue. Generate some from your content library!
            </div>
          ) : (
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`p-4 cursor-pointer transition ${
                    selectedPost?.id === post.id ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{post.title}</h4>
                      <p className="text-sm text-gray-400 truncate">{post.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(post.status)}
                        <span className="text-xs text-gray-500">{post.category}</span>
                        {post.source && (
                          <span className="text-xs text-gray-500">• {post.source.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Post Preview */}
        <div className="bg-bg-card border border-white/5 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h2 className="font-semibold text-white">Preview</h2>
          </div>

          {selectedPost ? (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedPost.title}</h3>
                <p className="text-gray-400 text-sm">{selectedPost.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {getStatusBadge(selectedPost.status)}
                <span className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs">
                  {selectedPost.category}
                </span>
                {JSON.parse(selectedPost.tags || "[]").map((tag: string) => (
                  <span key={tag} className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="bg-black/20 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {selectedPost.content.substring(0, 2000)}
                  {selectedPost.content.length > 2000 && "..."}
                </pre>
              </div>

              <div className="text-xs text-gray-500">
                Scheduled for: {formatDate(selectedPost.scheduledFor)}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                {selectedPost.status === "pending" && (
                  <button
                    onClick={() => handleApprove(selectedPost.id)}
                    disabled={actionLoading === selectedPost.id}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-primary rounded-lg font-medium hover:bg-accent-teal transition disabled:opacity-50"
                  >
                    {actionLoading === selectedPost.id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <CheckCircle size={16} />
                    )}
                    Approve
                  </button>
                )}
                {(selectedPost.status === "pending" || selectedPost.status === "approved") && (
                  <button
                    onClick={() => handlePublish(selectedPost.id)}
                    disabled={actionLoading === selectedPost.id}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg font-medium hover:bg-accent-purple/30 transition disabled:opacity-50"
                  >
                    {actionLoading === selectedPost.id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Send size={16} />
                    )}
                    Publish Now
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedPost.id)}
                  disabled={actionLoading === selectedPost.id}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Select a post to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
