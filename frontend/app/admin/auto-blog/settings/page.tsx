"use client";

import { useEffect, useState } from "react";
import {
  Save,
  ArrowLeft,
  Clock,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Loader2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

interface AutoBlogSettings {
  id: string;
  postsPerDay: number;
  startHour: number;
  endHour: number;
  enabled: boolean;
  authorName: string;
}

export default function AutoBlogSettingsPage() {
  const [settings, setSettings] = useState<AutoBlogSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [postsPerDay, setPostsPerDay] = useState(5);
  const [startHour, setStartHour] = useState(8);
  const [endHour, setEndHour] = useState(20);
  const [authorName, setAuthorName] = useState("Best AI Resume Team");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get("/admin/auto-blog/settings");
      const data = response.data as AutoBlogSettings;
      setSettings(data);
      setPostsPerDay(data.postsPerDay);
      setStartHour(data.startHour);
      setEndHour(data.endHour);
      setAuthorName(data.authorName);
      setEnabled(data.enabled);
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (startHour >= endHour) {
      setError("Start hour must be before end hour");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.put("/admin/auto-blog/settings", {
        postsPerDay,
        startHour,
        endHour,
        authorName,
      });
      setSettings(response.data as AutoBlogSettings);
      setSuccess("Settings saved successfully!");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/admin/auto-blog/toggle");
      setEnabled((response.data as { enabled: boolean }).enabled);
      setSuccess(
        (response.data as { enabled: boolean }).enabled
          ? "Auto-posting enabled!"
          : "Auto-posting disabled"
      );
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to toggle auto-posting");
    } finally {
      setSaving(false);
    }
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return "12:00 AM";
    if (hour === 12) return "12:00 PM";
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-accent-green" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/auto-blog"
          className="p-2 hover:bg-gray-50 rounded-lg transition"
        >
          <ArrowLeft size={20} className="text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Auto-Blog Settings</h1>
          <p className="text-gray-500 mt-1">
            Configure automatic blog post scheduling
          </p>
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
          <CheckCircle className="text-accent-green flex-shrink-0" size={20} />
          <p className="text-accent-green">{success}</p>
          <button
            onClick={() => setSuccess(null)}
            className="ml-auto text-accent-green"
          >
            ×
          </button>
        </div>
      )}

      {/* Enable/Disable Toggle */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Auto-Posting</h2>
            <p className="text-gray-500 text-sm mt-1">
              {enabled
                ? "Approved posts will be automatically published at scheduled times"
                : "Auto-posting is currently disabled"}
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={saving}
            className="flex items-center gap-2"
          >
            {enabled ? (
              <ToggleRight
                size={48}
                className="text-accent-green cursor-pointer"
              />
            ) : (
              <ToggleLeft size={48} className="text-gray-500 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Schedule Settings</h2>

        {/* Posts Per Day */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} />
            Posts Per Day
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={postsPerDay}
            onChange={(e) => setPostsPerDay(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-green"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>1</span>
            <span className="text-accent-green font-medium">
              {postsPerDay} posts/day
            </span>
            <span>10</span>
          </div>
        </div>

        {/* Active Hours */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock size={16} />
              Start Hour
            </label>
            <select
              value={startHour}
              onChange={(e) => setStartHour(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {formatHour(i)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock size={16} />
              End Hour
            </label>
            <select
              value={endHour}
              onChange={(e) => setEndHour(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {formatHour(i)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Posts will be published at random times between {formatHour(startHour)}{" "}
          and {formatHour(endHour)}
        </p>

        {/* Author Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <User size={16} />
            Author Name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter author name"
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 focus:border-accent-green/50 focus:outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            This name will appear as the author on all auto-posted articles
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-green text-bg-primary rounded-lg font-semibold hover:bg-accent-teal transition disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          Save Settings
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-4">
        <h3 className="font-medium text-accent-blue mb-2">How it works</h3>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>
            • Upload PDF content in the{" "}
            <Link
              href="/admin/auto-blog/content"
              className="text-accent-blue hover:underline"
            >
              Content Library
            </Link>
          </li>
          <li>• Generate blog posts from your content using AI</li>
          <li>
            • Review and approve posts in the{" "}
            <Link
              href="/admin/auto-blog/queue"
              className="text-accent-blue hover:underline"
            >
              Post Queue
            </Link>
          </li>
          <li>• Approved posts are automatically published at random times</li>
          <li>• Posts are spread evenly throughout your active hours</li>
        </ul>
      </div>
    </div>
  );
}
