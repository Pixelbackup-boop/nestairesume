"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { X, FileText } from "lucide-react";

export default function ReturningUserBanner() {
  const t = useTranslations('Common');
  const [showBanner, setShowBanner] = useState(false);
  const [draftInfo, setDraftInfo] = useState<{ lastEdited?: string } | null>(null);

  useEffect(() => {
    // Check for returning user with draft
    const hasDraft = localStorage.getItem("resumeDraft");
    const hasVisited = localStorage.getItem("hasVisitedCreate");
    const bannerDismissed = sessionStorage.getItem("bannerDismissed");

    if ((hasDraft || hasVisited) && !bannerDismissed) {
      setShowBanner(true);

      // Get draft info if available
      if (hasDraft) {
        try {
          const draft = JSON.parse(hasDraft);
          setDraftInfo({
            lastEdited: draft.lastEdited || null,
          });
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, []);

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("bannerDismissed", "true");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="flex items-center gap-4 px-5 py-4 bg-bg-card/95 backdrop-blur-xl border border-accent-green/30 rounded-2xl shadow-2xl shadow-black/50">
        {/* Icon */}
        <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-accent-green" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm">Welcome back!</h4>
          <p className="text-xs text-gray-400">
            {draftInfo?.lastEdited
              ? `Last edited ${draftInfo.lastEdited}`
              : "You have an unsaved resume draft"}
          </p>
        </div>

        {/* Continue Button */}
        <Link
          href="/create"
          className="px-4 py-2 bg-accent-green text-bg-primary rounded-lg font-semibold text-sm hover:bg-accent-teal transition flex-shrink-0"
        >
          Continue Editing
        </Link>

        {/* Dismiss Button */}
        <button
          onClick={dismissBanner}
          className="p-1.5 text-gray-500 hover:text-white transition flex-shrink-0"
          aria-label={t('dismiss')}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
