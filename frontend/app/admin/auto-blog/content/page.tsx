"use client";

import { useEffect, useState, useRef } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Sparkles,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

interface ContentSource {
  id: string;
  name: string;
  filename: string;
  type: string;
  pageCount: number | null;
  createdAt: string;
  _count: {
    scheduledPosts: number;
  };
}

export default function ContentLibraryPage() {
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSources = async () => {
    try {
      const response = await api.get("/admin/auto-blog/content");
      setSources(response.data as ContentSource[]);
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name.replace(".pdf", ""));

    try {
      await api.post("/admin/auto-blog/content/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("PDF uploaded successfully!");
      fetchSources();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this content source?")) return;

    try {
      await api.delete(`/admin/auto-blog/content/${id}`);
      setSources(sources.filter((s) => s.id !== id));
      setSuccess("Content deleted");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to delete");
    }
  };

  const handleGenerate = async (sourceId: string) => {
    setGenerating(sourceId);
    setError(null);

    try {
      const response = await api.post("/admin/auto-blog/generate", {
        sourceId,
        count: 5,
      });
      setSuccess(
        `Generated ${(response.data as { generated: number }).generated} posts! Check the queue to review.`
      );
      fetchSources();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to generate posts");
    } finally {
      setGenerating(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/auto-blog"
            className="p-2 hover:bg-gray-50 rounded-lg transition"
          >
            <ArrowLeft size={20} className="text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
            <p className="text-gray-500 mt-1">Upload PDFs to generate blog posts</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-600 hover:text-red-500"
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl p-4 flex items-center gap-3">
          <Sparkles className="text-accent-green flex-shrink-0" size={20} />
          <p className="text-accent-green">{success}</p>
          <button
            onClick={() => setSuccess(null)}
            className="ml-auto text-accent-green hover:text-accent-green/80"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload Card */}
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mb-4">
            {uploading ? (
              <Loader2 className="text-accent-green animate-spin" size={28} />
            ) : (
              <Upload className="text-accent-green" size={28} />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {uploading ? "Uploading..." : "Upload PDF"}
          </h3>
          <p className="text-gray-500 text-sm text-center max-w-md">
            Upload books, guides, or articles. AI will extract content and
            generate blog posts.
          </p>
          <p className="text-gray-500 text-xs mt-2">Max file size: 50MB</p>
        </label>
      </div>

      {/* Content List */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Uploaded Content</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Loader2
              className="animate-spin mx-auto text-accent-green"
              size={32}
            />
          </div>
        ) : sources.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No content uploaded yet. Upload a PDF to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sources.map((source) => (
              <div
                key={source.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="text-red-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{source.name}</h4>
                    <p className="text-sm text-gray-500">
                      {source.pageCount} pages • Uploaded {formatDate(source.createdAt)}
                      {source._count.scheduledPosts > 0 && (
                        <span className="ml-2 text-accent-green">
                          • {source._count.scheduledPosts} posts generated
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleGenerate(source.id)}
                    disabled={generating === source.id}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-green/20 text-accent-green rounded-lg hover:bg-accent-green/30 transition text-sm font-medium disabled:opacity-50"
                  >
                    {generating === source.id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Sparkles size={16} />
                    )}
                    {generating === source.id ? "Generating..." : "Generate Posts"}
                  </button>
                  <button
                    onClick={() => handleDelete(source.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
