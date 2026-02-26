"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { getTawkSettings, TawkSettings } from "@/lib/tawkConfig";

declare global {
  interface Window {
    Tawk_API?: {
      visitor?: { name: string; email: string };
      setAttributes?: (attrs: Record<string, string>, callback?: (error: unknown) => void) => void;
      onLoad?: () => void;
    };
  }
}

export default function TawkTo() {
  const { user, isAuthenticated } = useAuthStore();
  const [settings, setSettings] = useState<TawkSettings | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Fetch settings from API on mount
  useEffect(() => {
    getTawkSettings().then(setSettings);
  }, []);

  // Load the tawk.to script once we have valid settings
  useEffect(() => {
    if (!settings?.enabled || !settings.propertyId || !settings.widgetId || scriptLoaded) return;

    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};

    // Pre-set visitor info if already authenticated
    if (isAuthenticated && user?.email) {
      window.Tawk_API.visitor = {
        name: user.name || "User",
        email: user.email,
      };
    }

    // Delay chat widget load until browser is idle (non-critical for initial experience)
    const loadScript = () => {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = `https://embed.tawk.to/${settings.propertyId}/${settings.widgetId}`;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      document.head.appendChild(s1);
      setScriptLoaded(true);
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadScript, { timeout: 10000 });
    } else {
      setTimeout(loadScript, 8000);
    }
  }, [settings, isAuthenticated, user, scriptLoaded]);

  // Update visitor attributes when auth state changes after script is loaded
  useEffect(() => {
    if (!scriptLoaded || !window.Tawk_API) return;

    if (isAuthenticated && user?.email) {
      window.Tawk_API.setAttributes?.({
        name: user.name || "User",
        email: user.email,
        id: user.id,
      });
    }
  }, [user, isAuthenticated, scriptLoaded]);

  return null;
}
