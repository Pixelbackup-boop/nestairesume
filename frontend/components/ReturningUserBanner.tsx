"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { X, FileText } from "lucide-react";

function hasDraftContent(state: Record<string, unknown>): boolean {
  const resumeData = state?.resumeData as Record<string, unknown> | undefined;
  if (!resumeData) return false;
  const pi = resumeData.personalInfo as Record<string, string> | undefined;
  if (pi?.fullName) return true;
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) return true;
  if (Array.isArray(resumeData.education) && resumeData.education.length > 0) return true;
  return false;
}

export default function ReturningUserBanner() {
  const t = useTranslations('Common');
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);
  const [lastEdited, setLastEdited] = useState<string | null>(null);

  useEffect(() => {
    // Clean up legacy key from old implementation
    localStorage.removeItem("resumeDraft");
    localStorage.removeItem("hasVisitedCreate");

    const bannerDismissed = sessionStorage.getItem("bannerDismissed");
    if (bannerDismissed) return;

    const raw = localStorage.getItem("resume-draft");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      const state = parsed?.state;
      if (!state || !hasDraftContent(state)) return;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowBanner(true);

      if (typeof state.lastEdited === "number") {
        setLastEdited(
          new Date(state.lastEdited).toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        );
      }
    } catch {
      // Invalid JSON, ignore
    }
  }, [locale]);

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
          <h4 className="font-semibold text-white text-sm">
            {t('returningBanner.welcomeBack')}
          </h4>
          <p className="text-xs text-gray-400">
            {lastEdited
              ? t('returningBanner.lastEdited', { date: lastEdited })
              : t('returningBanner.unsavedDraft')}
          </p>
        </div>

        {/* Continue Button */}
        <Link
          href={`/${locale}/builder`}
          className="px-4 py-2 bg-accent-green text-bg-primary rounded-lg font-semibold text-sm hover:bg-accent-teal transition flex-shrink-0"
        >
          {t('returningBanner.continueEditing')}
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
