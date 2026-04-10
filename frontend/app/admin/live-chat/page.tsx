"use client";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import api from "@/lib/api";

interface TawkSettings {
  enabled: boolean;
  propertyId: string;
  widgetId: string;
}

const defaultSettings: TawkSettings = {
  enabled: false,
  propertyId: "",
  widgetId: "default",
};

export default function AdminLiveChatPage() {
  const [settings, setSettings] = useState<TawkSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showPropertyId, setShowPropertyId] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get("/admin/tawk/settings");
      setSettings({ ...defaultSettings, ...(response.data as TawkSettings) });
    } catch {
      console.log("No existing tawk settings, using defaults");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    // Save credentials only — enabled flag is controlled by the toggle
    const settingsToSave = {
      ...settings,
      widgetId: settings.widgetId.trim() || "default",
    };

    try {
      await api.post("/admin/tawk/settings", settingsToSave);
      setSettings(settingsToSave);
      setMessage({
        type: "success",
        text: "Credentials saved. Use the toggle above to show or hide the chat widget.",
      });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to save settings",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async () => {
    if (!settings.propertyId.trim()) {
      setMessage({ type: "error", text: "Add a Property ID first, then enable live chat." });
      return;
    }

    const next = !settings.enabled;
    setSettings((prev) => ({ ...prev, enabled: next }));
    setMessage(null);

    try {
      await api.post("/admin/tawk/settings", { enabled: next });
      setMessage({
        type: "success",
        text: next
          ? "Live chat enabled. Widget will appear on your site within a few minutes (cached)."
          : "Live chat disabled. Widget will be removed from your site within a few minutes (cached).",
      });
    } catch (err: unknown) {
      // Revert optimistic update on failure
      setSettings((prev) => ({ ...prev, enabled: !next }));
      const error = err as { response?: { data?: { detail?: string } } };
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to update live chat status",
      });
    }
  };

  const isActive = settings.enabled && settings.propertyId.trim() !== "";
  const canToggle = settings.propertyId.trim() !== "";

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
            <MessageCircle className="text-accent-purple" />
            Live Chat
          </h1>
          <p className="text-gray-500 mt-1">
            Configure tawk.to live chat widget for customer support
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

      {/* Status Card */}
      <div className={`border rounded-xl p-6 ${
        isActive
          ? "bg-green-50 border-green-200"
          : "bg-gray-50 border-gray-200"
      }`}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                isActive ? "bg-green-500 animate-pulse" : "bg-gray-300"
              }`} />
              <span className="text-lg font-semibold text-gray-900">
                {isActive ? "Live Chat Active" : "Live Chat Inactive"}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              {isActive
                ? "The chat widget is visible to all visitors on your site."
                : canToggle
                  ? "Credentials are saved. Flip the toggle to show the chat widget."
                  : "Add your tawk.to Property ID below and save to activate live chat."}
            </p>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={settings.enabled}
            aria-label="Show chat widget on website"
            onClick={handleToggle}
            disabled={!canToggle}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              settings.enabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                settings.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* tawk.to Configuration */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageCircle size={20} className="text-green-500" />
          tawk.to Configuration
        </h2>

        <div className="space-y-4">
          {/* Property ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property ID
            </label>
            <div className="relative">
              <input
                type={showPropertyId ? "text" : "password"}
                value={settings.propertyId}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, propertyId: e.target.value.trim() }))
                }
                placeholder="Paste your tawk.to Property ID here"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPropertyId(!showPropertyId)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
              >
                {showPropertyId ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Found in your tawk.to dashboard under Administration &rarr; Chat Widget. Paste the ID and click Save — live chat will activate automatically.
            </p>
          </div>

          {/* Advanced: Widget ID */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}>▶</span>
              Advanced Settings
            </button>
            {showAdvanced && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Widget ID
                </label>
                <input
                  type="text"
                  value={settings.widgetId}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, widgetId: e.target.value.trim() }))
                  }
                  placeholder="default"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Usually &quot;default&quot; unless you have multiple widgets. Check your Direct Chat Link URL format: tawk.to/chat/&#123;propertyId&#125;/&#123;widgetId&#125;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-blue-600 font-medium mb-2 flex items-center gap-2">
          <Info size={18} />
          How to Set Up tawk.to Live Chat
        </h3>
        <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
          <li>
            Go to{" "}
            <a
              href="https://www.tawk.to/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              tawk.to <ExternalLink size={12} />
            </a>{" "}
            and create a free account
          </li>
          <li>Create a property for your website</li>
          <li>
            Go to <strong>Administration &rarr; Chat Widget</strong> and find your Direct Chat Link
          </li>
          <li>
            Copy the Property ID and Widget ID from the URL: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">tawk.to/chat/&#123;propertyId&#125;/&#123;widgetId&#125;</code>
          </li>
          <li>Paste the Property ID above and click Save Settings — live chat activates automatically</li>
          <li>
            Enable the <strong>Pre-Chat Form</strong> in tawk.to dashboard so guests must enter their email before chatting
          </li>
          <li>
            Install the{" "}
            <a
              href="https://play.google.com/store/apps/details?id=to.tawk.android"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              tawk.to Android app <ExternalLink size={12} />
            </a>{" "}
            to reply to customers from your phone
          </li>
        </ol>
      </div>
    </div>
  );
}
