"use client";

import { useEffect, useState } from "react";
import {
  MonitorPlay,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  DollarSign,
  PlayCircle,
  Gift,
  Info,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import api from "@/lib/api";

interface AdSettings {
  // Master Controls
  adsEnabled: boolean;
  usePlaceholders: boolean;

  // Google AdSense
  adsensePublisherId: string;

  // Ad Slots
  slots: {
    blogInArticle: string;
    resumeInArticle: string;
    careerInArticle: string;
    toolsRewarded: string;
  };

  // Revenue Tracking
  estimatedMonthlyViews: {
    blog: number;
    resume: number;
    career: number;
    tools: number;
  };
}

const defaultSettings: AdSettings = {
  adsEnabled: false,
  usePlaceholders: true,
  adsensePublisherId: "",
  slots: {
    blogInArticle: "",
    resumeInArticle: "",
    careerInArticle: "",
    toolsRewarded: "",
  },
  estimatedMonthlyViews: {
    blog: 50000,
    resume: 200000,
    career: 20000,
    tools: 10000,
  },
};

export default function AdminAdsPage() {
  const [settings, setSettings] = useState<AdSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showPublisherId, setShowPublisherId] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get("/admin/ads/settings");
      setSettings({ ...defaultSettings, ...(response.data as typeof defaultSettings) });
    } catch (err) {
      // If no settings exist yet, use defaults
      console.log("No existing ad settings, using defaults");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await api.post("/admin/ads/settings", settings);
      setMessage({ type: "success", text: "Ad settings saved successfully!" });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.detail || "Failed to save settings",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSlot = (key: keyof AdSettings["slots"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      slots: { ...prev.slots, [key]: value },
    }));
  };

  const updateViews = (key: keyof AdSettings["estimatedMonthlyViews"], value: number) => {
    setSettings((prev) => ({
      ...prev,
      estimatedMonthlyViews: { ...prev.estimatedMonthlyViews, [key]: value },
    }));
  };

  // Calculate estimated revenue
  const cpmRates = {
    blog: 12,
    resume: 12,
    career: 12,
    tools: 25,
  };

  const calculateRevenue = () => {
    const { estimatedMonthlyViews } = settings;
    const blogRevenue = (estimatedMonthlyViews.blog / 1000) * cpmRates.blog;
    const resumeRevenue = (estimatedMonthlyViews.resume / 1000) * cpmRates.resume;
    const careerRevenue = (estimatedMonthlyViews.career / 1000) * cpmRates.career;
    const toolsRevenue = (estimatedMonthlyViews.tools / 1000) * cpmRates.tools;
    return {
      blog: blogRevenue,
      resume: resumeRevenue,
      career: careerRevenue,
      tools: toolsRevenue,
      total: blogRevenue + resumeRevenue + careerRevenue + toolsRevenue,
    };
  };

  const revenue = calculateRevenue();

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-100 rounded w-48" />
        <div className="h-64 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <MonitorPlay className="text-accent-purple" />
            Ads Manager
          </h1>
          <p className="text-gray-500 mt-1">
            Configure Google Ads for your content pages
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-accent-purple hover:bg-accent-purple/80 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-3 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-600"
              : "bg-red-50 border border-red-200 text-red-600"
          }`}
        >
          {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {message.text}
        </div>
      )}

      {/* Revenue Overview */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign size={20} className="text-green-600" />
          Estimated Monthly Revenue
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-500 text-sm">Blog Posts</p>
            <p className="text-2xl font-bold text-gray-900">${revenue.blog.toFixed(0)}</p>
            <p className="text-xs text-gray-500">{settings.estimatedMonthlyViews.blog.toLocaleString()} views</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-500 text-sm">Resume Examples</p>
            <p className="text-2xl font-bold text-gray-900">${revenue.resume.toFixed(0)}</p>
            <p className="text-xs text-gray-500">{settings.estimatedMonthlyViews.resume.toLocaleString()} views</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-500 text-sm">Career Tips</p>
            <p className="text-2xl font-bold text-gray-900">${revenue.career.toFixed(0)}</p>
            <p className="text-xs text-gray-500">{settings.estimatedMonthlyViews.career.toLocaleString()} views</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-500 text-sm">Tools (Rewarded)</p>
            <p className="text-2xl font-bold text-gray-900">${revenue.tools.toFixed(0)}</p>
            <p className="text-xs text-gray-500">{settings.estimatedMonthlyViews.tools.toLocaleString()} views</p>
          </div>
          <div className="bg-green-100 rounded-lg p-4 border border-green-200">
            <p className="text-green-600 text-sm font-medium">Total</p>
            <p className="text-3xl font-bold text-green-600">${revenue.total.toFixed(0)}</p>
            <p className="text-xs text-green-600/70">per month</p>
          </div>
        </div>
      </div>

      {/* Master Controls */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Master Controls</h2>
        <div className="space-y-4">
          {/* Ads Enabled Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              {settings.adsEnabled ? (
                <Eye className="text-green-400" size={20} />
              ) : (
                <EyeOff className="text-gray-400" size={20} />
              )}
              <div>
                <p className="text-gray-900 font-medium">Ads Enabled</p>
                <p className="text-gray-500 text-sm">Show ads on all content pages</p>
              </div>
            </div>
            <button
              onClick={() => setSettings((prev) => ({ ...prev, adsEnabled: !prev.adsEnabled }))}
              className={`relative w-14 h-7 rounded-full transition-colors border-none outline-none focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 cursor-pointer ${
                settings.adsEnabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-[4px] top-[4px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  settings.adsEnabled ? "translate-x-[28px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Placeholder Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <Info className="text-yellow-400" size={20} />
              <div>
                <p className="text-gray-900 font-medium">Placeholder Mode</p>
                <p className="text-gray-500 text-sm">
                  Show visual placeholders instead of real ads (for testing)
                </p>
              </div>
            </div>
            <button
              onClick={() => setSettings((prev) => ({ ...prev, usePlaceholders: !prev.usePlaceholders }))}
              className={`relative w-14 h-7 rounded-full transition-colors border-none outline-none focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 cursor-pointer ${
                settings.usePlaceholders ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-[4px] top-[4px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  settings.usePlaceholders ? "translate-x-[28px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Google AdSense Configuration */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
          </svg>
          Google AdSense
        </h2>

        <div className="space-y-4">
          {/* Publisher ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publisher ID
            </label>
            <div className="relative">
              <input
                type={showPublisherId ? "text" : "password"}
                value={settings.adsensePublisherId}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, adsensePublisherId: e.target.value }))
                }
                placeholder="ca-pub-xxxxxxxxxxxxxxxxxx"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPublisherId(!showPublisherId)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
              >
                {showPublisherId ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Find your Publisher ID in{" "}
              <a
                href="https://www.google.com/adsense"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-purple hover:underline inline-flex items-center gap-1"
              >
                Google AdSense <ExternalLink size={12} />
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Ad Slots Configuration */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <PlayCircle size={20} className="text-blue-400" />
          Ad Slot IDs
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Configure individual ad slots for each page type. Leave empty to use auto ads.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Blog Posts Slot */}
          <div className="bg-gray-100 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <PlayCircle size={16} className="text-blue-400" />
              Blog Posts (In-Article Video)
            </label>
            <input
              type="text"
              value={settings.slots.blogInArticle}
              onChange={(e) => updateSlot("blogInArticle", e.target.value)}
              placeholder="1234567890"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">46 pages - CPM: $10-15</p>
          </div>

          {/* Resume Examples Slot */}
          <div className="bg-gray-100 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <PlayCircle size={16} className="text-green-400" />
              Resume Examples (In-Article Video)
            </label>
            <input
              type="text"
              value={settings.slots.resumeInArticle}
              onChange={(e) => updateSlot("resumeInArticle", e.target.value)}
              placeholder="1234567891"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">306 pages - CPM: $12</p>
          </div>

          {/* Career Tips Slot */}
          <div className="bg-gray-100 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <PlayCircle size={16} className="text-purple-400" />
              Career Tips (In-Article Video)
            </label>
            <input
              type="text"
              value={settings.slots.careerInArticle}
              onChange={(e) => updateSlot("careerInArticle", e.target.value)}
              placeholder="1234567892"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">7 pages - CPM: $10-15</p>
          </div>

          {/* Tools Rewarded Slot */}
          <div className="bg-gray-100 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Gift size={16} className="text-yellow-400" />
              Tools (Rewarded Video)
            </label>
            <input
              type="text"
              value={settings.slots.toolsRewarded}
              onChange={(e) => updateSlot("toolsRewarded", e.target.value)}
              placeholder="1234567893"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">4 pages - CPM: $20-40</p>
          </div>
        </div>
      </div>

      {/* Traffic Estimates */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Traffic Estimates</h2>
        <p className="text-gray-500 text-sm mb-4">
          Adjust estimated monthly page views to calculate revenue projections.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Blog Posts</label>
            <input
              type="number"
              value={settings.estimatedMonthlyViews.blog}
              onChange={(e) => updateViews("blog", parseInt(e.target.value) || 0)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:border-accent-purple focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Resume Examples</label>
            <input
              type="number"
              value={settings.estimatedMonthlyViews.resume}
              onChange={(e) => updateViews("resume", parseInt(e.target.value) || 0)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:border-accent-purple focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Career Tips</label>
            <input
              type="number"
              value={settings.estimatedMonthlyViews.career}
              onChange={(e) => updateViews("career", parseInt(e.target.value) || 0)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:border-accent-purple focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Tools</label>
            <input
              type="number"
              value={settings.estimatedMonthlyViews.tools}
              onChange={(e) => updateViews("tools", parseInt(e.target.value) || 0)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:border-accent-purple focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
          <Info size={18} />
          How to Set Up Google AdSense
        </h3>
        <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
          <li>
            Go to{" "}
            <a
              href="https://www.google.com/adsense"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Google AdSense
            </a>{" "}
            and sign up or log in
          </li>
          <li>Add your website and wait for approval (usually 1-2 weeks)</li>
          <li>Once approved, copy your Publisher ID (starts with ca-pub-)</li>
          <li>Paste the Publisher ID above and click Save Settings</li>
          <li>Create ad units for each slot type and paste the slot IDs</li>
          <li>Turn off Placeholder Mode to show real ads</li>
        </ol>
      </div>
    </div>
  );
}
