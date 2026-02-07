"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bot,
  FileText,
  Clock,
  CheckCircle,
  Upload,
  Sparkles,
  Settings,
  AlertCircle,
  Power,
} from "lucide-react";
import api from "@/lib/api";
import StatsCard from "@/components/admin/StatsCard";

interface Status {
  enabled: boolean;
  postsPerDay: number;
  startHour: number;
  endHour: number;
  authorName: string;
  pendingReview: number;
  approvedQueue: number;
  publishedToday: number;
  isRunning: boolean;
}

export default function AutoBlogDashboard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const response = await api.get("/admin/auto-blog/status");
      setStatus(response.data as Status);
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to load status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const toggleAutoBlog = async () => {
    if (!status) return;
    setToggling(true);
    try {
      const response = await api.post("/admin/auto-blog/toggle", {
        enabled: !status.enabled,
      });
      setStatus({ ...status, enabled: (response.data as { enabled: boolean }).enabled });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to toggle");
    } finally {
      setToggling(false);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <p className="text-red-600 font-medium">Error</p>
          <p className="text-red-600/70 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Bot className="text-accent-green" />
            Auto Blog
          </h1>
          <p className="text-gray-500 mt-1">
            AI-powered blog post generation from your content
          </p>
        </div>
        <button
          onClick={toggleAutoBlog}
          disabled={loading || toggling}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            status?.enabled
              ? "bg-accent-green/20 text-accent-green hover:bg-accent-green/30"
              : "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
          }`}
        >
          <Power size={18} />
          {toggling ? "..." : status?.enabled ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))
        ) : (
          <>
            <StatsCard
              title="Pending Review"
              value={status?.pendingReview || 0}
              icon={Clock}
              color="purple"
            />
            <StatsCard
              title="Approved Queue"
              value={status?.approvedQueue || 0}
              icon={CheckCircle}
              color="green"
            />
            <StatsCard
              title="Published Today"
              value={status?.publishedToday || 0}
              icon={FileText}
              color="blue"
            />
            <StatsCard
              title="Posts Per Day"
              value={status?.postsPerDay || 5}
              icon={Bot}
              color="pink"
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Content */}
        <Link href="/admin/auto-blog/content">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:border-accent-green/30 transition cursor-pointer group">
            <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Upload className="text-accent-green" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Content Library
            </h3>
            <p className="text-gray-500 text-sm">
              Upload PDFs and manage your source content
            </p>
          </div>
        </Link>

        {/* Post Queue */}
        <Link href="/admin/auto-blog/queue">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:border-accent-purple/30 transition cursor-pointer group">
            <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Sparkles className="text-accent-purple" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Post Queue</h3>
            <p className="text-gray-500 text-sm">
              Review and approve AI-generated posts
            </p>
          </div>
        </Link>

        {/* Settings */}
        <Link href="/admin/auto-blog/settings">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:border-accent-blue/30 transition cursor-pointer group">
            <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Settings className="text-accent-blue" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-500 text-sm">
              Configure posting schedule and preferences
            </p>
          </div>
        </Link>
      </div>

      {/* How It Works */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: 1,
              title: "Upload PDF",
              desc: "Upload books or guides as source content",
            },
            {
              step: 2,
              title: "Generate Posts",
              desc: "AI creates blog posts from your content",
            },
            {
              step: 3,
              title: "Review & Approve",
              desc: "Edit and approve posts before publishing",
            },
            {
              step: 4,
              title: "Auto Publish",
              desc: "Posts go live at random times daily",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-accent-green/20 text-accent-green rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                {item.step}
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
