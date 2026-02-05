'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { LimitType } from '@/hooks/useLimitCheck';

type BannerVariant = 'inline' | 'toast' | 'header';

interface LimitWarningBannerProps {
  limitType: LimitType;
  remaining: number;
  limit: number;
  variant?: BannerVariant;
  onDismiss?: () => void;
  className?: string;
}

// Type labels for display
const TYPE_LABELS: Record<LimitType, string> = {
  cv: 'CV creations',
  ai: 'AI generations',
  download: 'downloads',
  coverLetter: 'cover letters',
};

export default function LimitWarningBanner({
  limitType,
  remaining,
  limit,
  variant = 'inline',
  onDismiss,
  className = '',
}: LimitWarningBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  // Critical = 1 or less remaining, Warning = approaching limit
  const isCritical = remaining <= 1;
  const typeLabel = TYPE_LABELS[limitType];

  // Color scheme based on severity
  const colors = isCritical
    ? {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        icon: 'text-red-500',
        link: 'text-red-600 hover:text-red-700',
      }
    : {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-700',
        icon: 'text-amber-500',
        link: 'text-amber-600 hover:text-amber-700',
      };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  // Message based on remaining count
  const getMessage = () => {
    if (remaining === 0) {
      return `No ${typeLabel} remaining`;
    }
    if (remaining === 1) {
      return `Only 1 ${typeLabel.replace(/s$/, '')} remaining`;
    }
    return `${remaining} ${typeLabel} remaining`;
  };

  // Inline variant - compact banner within content
  if (variant === 'inline') {
    return (
      <div
        className={`flex items-center justify-between gap-3 px-4 py-2.5 ${colors.bg} ${colors.border} border rounded-lg ${className}`}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className={colors.icon} size={16} />
          <span className={`text-sm font-medium ${colors.text}`}>
            {getMessage()}
          </span>
        </div>
        <Link
          href="/pricing"
          className={`text-sm font-semibold ${colors.link} flex items-center gap-1 whitespace-nowrap`}
        >
          Upgrade
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // Toast variant - floating notification
  if (variant === 'toast') {
    return (
      <div
        className={`fixed bottom-4 right-4 z-40 flex items-center gap-3 px-4 py-3 ${colors.bg} ${colors.border} border rounded-xl shadow-lg max-w-sm animate-slideUp ${className}`}
      >
        <AlertTriangle className={colors.icon} size={20} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${colors.text}`}>
            {getMessage()}
          </p>
          <Link
            href="/pricing"
            className={`text-xs font-semibold ${colors.link}`}
          >
            Upgrade for more →
          </Link>
        </div>
        <button
          onClick={handleDismiss}
          className={`p-1 ${colors.text} hover:bg-white/50 rounded transition`}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>

        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Header variant - full-width banner at top
  if (variant === 'header') {
    return (
      <div
        className={`w-full flex items-center justify-center gap-3 px-4 py-2 ${colors.bg} ${colors.border} border-b ${className}`}
      >
        <AlertTriangle className={colors.icon} size={16} />
        <span className={`text-sm font-medium ${colors.text}`}>
          {getMessage()} this month
        </span>
        <Link
          href="/pricing"
          className={`text-sm font-semibold ${colors.link} flex items-center gap-1`}
        >
          Upgrade Now
          <ArrowRight size={14} />
        </Link>
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className={`ml-2 p-1 ${colors.text} hover:bg-white/50 rounded transition`}
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  }

  return null;
}

// Helper component for showing warning only when needed
export function ConditionalLimitWarning({
  limitType,
  remaining,
  limit,
  variant = 'inline',
  threshold = 0.2, // Show when 20% or less remaining
  className = '',
}: LimitWarningBannerProps & { threshold?: number }) {
  // Don't show for unlimited limits
  if (limit === -1) return null;

  // Calculate threshold based on limit
  const warningThreshold = limit <= 5 ? 2 : Math.ceil(limit * threshold);

  // Only show if remaining is at or below threshold
  if (remaining > warningThreshold) return null;

  return (
    <LimitWarningBanner
      limitType={limitType}
      remaining={remaining}
      limit={limit}
      variant={variant}
      className={className}
    />
  );
}
