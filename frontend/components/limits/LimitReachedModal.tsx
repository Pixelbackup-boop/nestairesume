'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  FileText,
  Sparkles,
  Download,
  Mail,
  AlertCircle,
  ArrowRight,
  Crown,
} from 'lucide-react';
import { LimitType, UPGRADE_PATH } from '@/hooks/useLimitCheck';
import { useDialogA11y } from '@/hooks/useDialogA11y';

interface LimitReachedModalProps {
  isOpen: boolean;
  onClose: () => void;
  limitType: LimitType | null;
  used: number;
  limit: number;
  currentTier: string;
  isTrialing?: boolean;
}

// Type-specific configuration
const LIMIT_CONFIG: Record<LimitType, {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = {
  cv: {
    icon: FileText,
    title: 'CV Creation Limit Reached',
    description: 'You\'ve used all your CV creations for this billing period.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20',
  },
  ai: {
    icon: Sparkles,
    title: 'AI Generation Limit Reached',
    description: 'You\'ve used all your AI generations for this billing period.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/20',
  },
  download: {
    icon: Download,
    title: 'Download Limit Reached',
    description: 'You\'ve used all your downloads for this billing period.',
    color: 'text-accent-green',
    bgColor: 'bg-accent-green/20',
  },
  coverLetter: {
    icon: Mail,
    title: 'Cover Letter Limit Reached',
    description: 'You\'ve used all your cover letter generations for this billing period.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/20',
  },
};

// Plan display names and features
const PLAN_BENEFITS: Record<string, { name: string; highlight: string }> = {
  starter: { name: 'Starter', highlight: '30 CVs, 50 AI, 3 downloads/month' },
  gold: { name: 'Gold', highlight: '150 CVs, 100 AI, 10 downloads/month' },
  diamond: { name: 'Diamond', highlight: '300 CVs, 200 AI, 25 downloads/month' },
  platinum: { name: 'Platinum', highlight: 'Unlimited CVs, 500 AI, 120 downloads/month' },
};

export default function LimitReachedModal({
  isOpen,
  onClose,
  limitType,
  used,
  limit,
  currentTier,
  isTrialing = false,
}: LimitReachedModalProps) {
  const router = useRouter();
  const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'limit-modal-title' });

  if (!isOpen || !limitType) return null;

  const config = LIMIT_CONFIG[limitType];
  const IconComponent = config.icon;

  // Determine upgrade target
  const nextTier = UPGRADE_PATH[currentTier] || 'gold';
  const nextPlanInfo = PLAN_BENEFITS[nextTier];

  // Calculate usage percentage for bar
  const usagePercentage = limit > 0 ? Math.min(100, (used / limit) * 100) : 100;

  const handleUpgrade = () => {
    router.push(`/checkout?plan=${nextTier}`);
    onClose();
  };

  const handleViewPlans = () => {
    router.push('/pricing');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div {...dialogProps} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <div className={`w-16 h-16 ${config.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <IconComponent className={config.color} size={32} />
          </div>
          <h2 id="limit-modal-title" className="text-xl font-bold text-gray-900 mb-2">
            {config.title}
          </h2>
          <p className="text-gray-500 text-sm">
            {config.description}
          </p>
        </div>

        {/* Usage Bar */}
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Usage this month</span>
              <span className="text-sm font-semibold text-gray-900">
                {used} / {limit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-red-500 transition-all duration-300"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Limits reset at the start of each billing period
            </p>
          </div>
        </div>

        {/* Trial Notice */}
        {isTrialing && (
          <div className="mx-6 mb-4 flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-amber-700">
              You're on a trial. Upgrade now to unlock higher limits and continue without interruption.
            </p>
          </div>
        )}

        {/* Upgrade CTA */}
        {nextTier && nextPlanInfo && (
          <div className="px-6 pb-4">
            <button
              onClick={handleUpgrade}
              className="w-full py-3.5 bg-gradient-to-r from-accent-green to-accent-teal text-gray-900 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-accent-green/25"
            >
              <Crown size={18} />
              Upgrade to {nextPlanInfo.name}
              <ArrowRight size={18} />
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              {nextPlanInfo.highlight}
            </p>
          </div>
        )}

        {/* View All Plans */}
        <div className="px-6 pb-6">
          <button
            onClick={handleViewPlans}
            className="w-full py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            View All Plans
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
