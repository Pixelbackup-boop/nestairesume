'use client';

import { useEffect } from 'react';
import { useUsageStore, formatUsage, formatRemaining } from '@/store/useUsageStore';

interface UsageBadgeProps {
  type: 'cv' | 'ai' | 'download' | 'coverLetter';
  showBar?: boolean;
  compact?: boolean;
  className?: string;
}

const typeLabels: Record<string, string> = {
  cv: 'CV Creations',
  ai: 'AI Generations',
  download: 'Downloads',
  coverLetter: 'Cover Letters',
};

const typeIcons: Record<string, React.ReactNode> = {
  cv: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  ai: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  download: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  coverLetter: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export default function UsageBadge({ type, showBar = true, compact = false, className = '' }: UsageBadgeProps) {
  const { usage, isLoading, fetchUsage, checkLimit, getUsagePercentage } = useUsageStore();

  useEffect(() => {
    if (!usage) {
      fetchUsage();
    }
  }, [usage, fetchUsage]);

  if (isLoading || !usage) {
    return (
      <div className={`animate-pulse bg-gray-100 rounded h-6 w-24 ${className}`} />
    );
  }

  const { canUse, remaining, limit } = checkLimit(type);
  const percentage = getUsagePercentage(type);
  const usageData = usage.usage[type];

  if (!usageData) return null;

  // Color based on usage percentage
  const getColor = () => {
    if (limit === -1) return 'text-accent-green';
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 70) return 'text-amber-500';
    return 'text-accent-green';
  };

  const getBarColor = () => {
    if (limit === -1) return 'bg-accent-green';
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-accent-green';
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 text-sm ${className}`}>
        <span className={getColor()}>{typeIcons[type]}</span>
        <span className="text-gray-600">
          {limit === -1 ? 'Unlimited' : `${remaining} left`}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={getColor()}>{typeIcons[type]}</span>
          <span className="text-sm font-medium text-gray-700">{typeLabels[type]}</span>
        </div>
        <span className={`text-sm font-semibold ${getColor()}`}>
          {formatUsage(usageData.used, usageData.limit)}
        </span>
      </div>

      {showBar && limit !== -1 && (
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getBarColor()}`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
      )}

      {!canUse && limit !== -1 && (
        <p className="mt-2 text-xs text-red-500">
          Limit reached. Upgrade your plan for more.
        </p>
      )}
    </div>
  );
}

// All usage badges in a grid
export function UsageOverview({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      <UsageBadge type="cv" />
      <UsageBadge type="ai" />
      <UsageBadge type="download" />
      <UsageBadge type="coverLetter" />
    </div>
  );
}

// Compact inline usage for headers/toolbars
export function UsageInline({ className = '' }: { className?: string }) {
  const { usage, fetchUsage } = useUsageStore();

  useEffect(() => {
    if (!usage) {
      fetchUsage();
    }
  }, [usage, fetchUsage]);

  if (!usage) return null;

  return (
    <div className={`flex items-center gap-4 text-sm ${className}`}>
      <UsageBadge type="cv" compact />
      <UsageBadge type="download" compact />
    </div>
  );
}
