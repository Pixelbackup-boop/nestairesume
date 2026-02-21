"use client";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Bug,
  Lightbulb,
  MessageSquare,
  X,
} from "lucide-react";
import api from "@/lib/api";

interface FeedbackUser {
  id: string;
  name: string;
  email: string;
}

interface FeedbackItem {
  id: string;
  templateId: string;
  type: string;
  message: string;
  status: string;
  adminNote: string | null;
  createdAt: string;
  user: FeedbackUser;
}

interface FeedbackResponse {
  feedback: FeedbackItem[];
  total: number;
  page: number;
  totalPages: number;
}

type StatusFilter = "all" | "pending" | "reviewed" | "resolved";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
};

const TYPE_CONFIG: Record<string, { icon: typeof MessageSquare; color: string }> = {
  feedback: { icon: MessageSquare, color: "bg-gray-100 text-gray-600" },
  bug: { icon: Bug, color: "bg-red-100 text-red-600" },
  suggestion: { icon: Lightbulb, color: "bg-purple-100 text-purple-600" },
};

export default function AdminFeedbackPage() {
  const [data, setData] = useState<FeedbackResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: "20" };
      if (statusFilter !== "all") params.status = statusFilter;

      const response = await api.get<FeedbackResponse>("/admin/template-feedback", { params });
      setData(response.data);
    } catch {
      setMessage({ type: "error", text: "Failed to load feedback" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [page, statusFilter]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/admin/template-feedback/${id}`, {
        status: newStatus,
        ...(adminNotes[id] ? { adminNote: adminNotes[id] } : {}),
      });
      setMessage({ type: "success", text: "Feedback updated" });
      fetchFeedback();
    } catch {
      setMessage({ type: "error", text: "Failed to update feedback" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this feedback? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/template-feedback/${id}`);
      setMessage({ type: "success", text: "Feedback deleted" });
      fetchFeedback();
    } catch {
      setMessage({ type: "error", text: "Failed to delete feedback" });
    }
  };

  const statusTabs: { value: StatusFilter; label: string; icon: typeof Clock }[] = [
    { value: "all", label: "All", icon: Eye },
    { value: "pending", label: "Pending", icon: Clock },
    { value: "reviewed", label: "Reviewed", icon: Eye },
    { value: "resolved", label: "Resolved", icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <MessageCircle className="text-accent-purple" />
          Template Feedback
        </h1>
        <p className="text-gray-500 mt-1">
          Review and manage user feedback on resume templates
        </p>
      </div>

      {/* Message banner */}
      {message && (
        <div
          className={`flex items-center justify-between p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-600"
              : "bg-red-50 border border-red-200 text-red-600"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
          <button onClick={() => setMessage(null)} className="p-1 hover:opacity-70">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Status filter tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-3">
        {statusTabs.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => { setStatusFilter(value); setPage(1); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              statusFilter === value
                ? "bg-accent-purple/10 text-accent-purple"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon size={16} />
            {label}
            {value !== "all" && data && (
              <span className="text-xs opacity-70">
                ({data.feedback.filter(f => f.status === value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : !data?.feedback.length ? (
        <div className="text-center py-16 text-gray-400">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No feedback yet</p>
          <p className="text-sm mt-1">User feedback on templates will appear here</p>
        </div>
      ) : (
        <>
          {/* Feedback list */}
          <div className="space-y-3">
            {data.feedback.map((item) => {
              const typeConf = TYPE_CONFIG[item.type] || TYPE_CONFIG.feedback;
              const TypeIcon = typeConf.icon;
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition"
                >
                  {/* Row summary */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  >
                    {/* Type badge */}
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeConf.color}`}>
                      <TypeIcon size={14} />
                      {item.type}
                    </span>

                    {/* Template ID */}
                    <span className="text-sm font-medium text-gray-900 min-w-[160px]">
                      {item.templateId}
                    </span>

                    {/* Message preview */}
                    <p className="text-sm text-gray-500 flex-1 truncate">
                      {item.message}
                    </p>

                    {/* User */}
                    <span className="text-xs text-gray-400 min-w-[120px] text-right">
                      {item.user.name}
                    </span>

                    {/* Status badge */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[item.status] || STATUS_COLORS.pending}`}>
                      {item.status}
                    </span>

                    {/* Date */}
                    <span className="text-xs text-gray-400 min-w-[80px] text-right">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
                      {/* Full message */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Message</label>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-3">
                          {item.message}
                        </p>
                      </div>

                      {/* User info */}
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-gray-400">User:</span>{" "}
                          <span className="text-gray-700">{item.user.name} ({item.user.email})</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Date:</span>{" "}
                          <span className="text-gray-700">{new Date(item.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Admin note */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Admin Note</label>
                        <textarea
                          value={adminNotes[item.id] ?? item.adminNote ?? ""}
                          onChange={(e) => setAdminNotes((prev) => ({ ...prev, [item.id]: e.target.value }))}
                          placeholder="Add an internal note..."
                          rows={2}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none resize-none"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {item.status !== "reviewed" && (
                          <button
                            onClick={() => handleStatusUpdate(item.id, "reviewed")}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                          >
                            <Eye size={14} />
                            Mark Reviewed
                          </button>
                        )}
                        {item.status !== "resolved" && (
                          <button
                            onClick={() => handleStatusUpdate(item.id, "resolved")}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition"
                          >
                            <CheckCircle size={14} />
                            Mark Resolved
                          </button>
                        )}
                        {item.status !== "pending" && (
                          <button
                            onClick={() => handleStatusUpdate(item.id, "pending")}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition"
                          >
                            <Clock size={14} />
                            Mark Pending
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition ml-auto"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-gray-500">
                Showing page {data.page} of {data.totalPages} ({data.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= (data?.totalPages || 1)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
