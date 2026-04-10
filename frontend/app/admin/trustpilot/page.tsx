"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Save,
  AlertCircle,
  CheckCircle,
  Info,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import api from "@/lib/api";

interface TrustpilotSettings {
  enabled: boolean;
  businessUnitId: string;
  templateId: string;
  locale: string;
}

const defaultSettings: TrustpilotSettings = {
  enabled: true,
  businessUnitId: "",
  templateId: "56278e9abfbbba0bdcd568bc",
  locale: "en-US",
};

export default function AdminTrustpilotPage() {
  const [settings, setSettings] = useState<TrustpilotSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get("/admin/trustpilot/settings");
      setSettings({ ...defaultSettings, ...(response.data as TrustpilotSettings) });
    } catch {
      console.log("No existing trustpilot settings, using defaults");
    } finally {
      setLoading(false);
    }
  };

  // TODO: Implement handleSave — see placeholder below
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const settingsToSave = prepareSettingsForSave(settings);
      await api.post("/admin/trustpilot/settings", settingsToSave);
      setSettings(settingsToSave);
      setMessage({
        type: "success",
        text: settingsToSave.enabled
          ? "Trustpilot widget is now visible on your website."
          : "Trustpilot widget hidden from your website.",
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

  // Clean up settings before saving: trim whitespace, fall back to defaults
  // for cleared fields, and auto-disable if Business Unit ID is empty.
  const prepareSettingsForSave = (current: TrustpilotSettings): TrustpilotSettings => {
    const businessUnitId = current.businessUnitId.trim();
    const templateId = current.templateId.trim() || "56278e9abfbbba0bdcd568bc";
    const locale = current.locale.trim() || "en-US";
    return {
      enabled: current.enabled && businessUnitId !== "",
      businessUnitId,
      templateId,
      locale,
    };
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-100 rounded w-48" />
        <div className="h-64 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  const isActive = settings.enabled && settings.businessUnitId.trim() !== "";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Star className="text-accent-purple" />
            Trustpilot Reviews
          </h1>
          <p className="text-gray-500 mt-1">
            Show or hide the Trustpilot review widget in your site footer
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
      <div
        className={`border rounded-xl p-6 ${
          isActive ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isActive ? "bg-green-500 animate-pulse" : "bg-gray-300"
            }`}
          />
          <span className="text-lg font-semibold text-gray-900">
            {isActive ? "Trustpilot Widget Active" : "Trustpilot Widget Hidden"}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-2">
          {isActive
            ? "The review widget is visible in the footer on all pages."
            : "The widget is hidden. Toggle it on below to show reviews in your footer."}
        </p>
      </div>

      {/* Configuration */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Star size={20} className="text-green-500" />
          Widget Configuration
        </h2>

        {/* Enable toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="font-medium text-gray-900">Show Trustpilot Widget</label>
            <p className="text-sm text-gray-500 mt-1">
              When off, the widget is completely hidden from your footer site-wide.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSettings((prev) => ({ ...prev, enabled: !prev.enabled }))}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              settings.enabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                settings.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Business Unit ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Unit ID
          </label>
          <input
            type="text"
            value={settings.businessUnitId}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, businessUnitId: e.target.value }))
            }
            placeholder="e.g. 6996e90345c20b813450f36a"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Found in Trustpilot Business → Integrations → TrustBoxes. Copy the{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">data-businessunit-id</code>{" "}
            value.
          </p>
        </div>

        {/* Template ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Template ID
          </label>
          <input
            type="text"
            value={settings.templateId}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, templateId: e.target.value }))
            }
            placeholder="e.g. 56278e9abfbbba0bdcd568bc"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Determines the widget style (Micro Review Count, Slider, etc.). Default is Micro Review Count.
          </p>
        </div>

        {/* Locale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Locale</label>
          <input
            type="text"
            value={settings.locale}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, locale: e.target.value }))
            }
            placeholder="en-US"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-accent-purple focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Widget display language. Examples: en-US, en-GB, es-ES, fr-FR, de-DE.
          </p>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-blue-600 font-medium mb-2 flex items-center gap-2">
          <Info size={18} />
          Where to Find Your Business Unit ID
        </h3>
        <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
          <li>
            Log in to{" "}
            <a
              href="https://businessapp.b2b.trustpilot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              Trustpilot Business <ExternalLink size={12} />
            </a>
          </li>
          <li>
            Go to <strong>Integrations → TrustBoxes</strong>
          </li>
          <li>Pick any TrustBox (Micro Review Count is recommended for footers)</li>
          <li>
            In the generated code snippet, copy the value of{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">data-businessunit-id</code>
          </li>
          <li>Paste it above and click Save Settings</li>
        </ol>
      </div>
    </div>
  );
}
