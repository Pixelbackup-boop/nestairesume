"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SeoSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        googleAnalyticsId: "",
        googleSiteVerification: "",
        bingSiteVerification: "",
        yandexSiteVerification: "",
        sitemapUrl: "",
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            if (!res.ok) throw new Error("Failed to fetch settings");
            const data = await res.json();
            setSettings({
                googleAnalyticsId: data.googleAnalyticsId || "",
                googleSiteVerification: data.googleSiteVerification || "",
                bingSiteVerification: data.bingSiteVerification || "",
                yandexSiteVerification: data.yandexSiteVerification || "",
                sitemapUrl: data.sitemapUrl || "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (!res.ok) throw new Error("Failed to update settings");
            toast.success("Settings saved successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">SEO & Analytics</h1>
                <p className="text-gray-500 mt-1">Manage tracking IDs and verification codes</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="grid gap-6 md:grid-cols-2">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Google Analytics ID (GA4)</label>
                        <input
                            type="text"
                            placeholder="G-XXXXXXXXXX"
                            value={settings.googleAnalyticsId}
                            onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple/20 focus:border-accent-purple outline-none transition"
                        />
                        <p className="text-xs text-gray-500">The Measurement ID from your Google Analytics 4 property.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Sitemap URL</label>
                        <input
                            type="text"
                            placeholder="https://example.com/sitemap.xml"
                            value={settings.sitemapUrl}
                            onChange={(e) => setSettings({ ...settings, sitemapUrl: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple/20 focus:border-accent-purple outline-none transition"
                        />
                        <p className="text-xs text-gray-500">Full URL to your sitemap (optional, for reference).</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Google Site Verification</label>
                        <input
                            type="text"
                            placeholder="Verification Code"
                            value={settings.googleSiteVerification}
                            onChange={(e) => setSettings({ ...settings, googleSiteVerification: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple/20 focus:border-accent-purple outline-none transition"
                        />
                        <p className="text-xs text-gray-500">The content value from the google-site-verification meta tag.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Bing Site Verification</label>
                        <input
                            type="text"
                            placeholder="Verification Code"
                            value={settings.bingSiteVerification}
                            onChange={(e) => setSettings({ ...settings, bingSiteVerification: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple/20 focus:border-accent-purple outline-none transition"
                        />
                        <p className="text-xs text-gray-500">The content value from the msvalidate.01 meta tag.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Yandex Site Verification</label>
                        <input
                            type="text"
                            placeholder="Verification Code"
                            value={settings.yandexSiteVerification}
                            onChange={(e) => setSettings({ ...settings, yandexSiteVerification: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple/20 focus:border-accent-purple outline-none transition"
                        />
                        <p className="text-xs text-gray-500">The content value from the yandex-verification meta tag.</p>
                    </div>

                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition disabled:opacity-70"
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
